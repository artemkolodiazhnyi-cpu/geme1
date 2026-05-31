'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSupabase } from '@/contexts/SupabaseContext'
import AuthModal from './AuthModal'

interface Comment {
  id: number
  article_slug: string
  user_id: string
  content: string
  created_at: string
  updated_at: string | null
  profile: {
    full_name: string | null
    avatar_url: string | null
  } | null
}

interface CommentLike {
  count: number
  liked: boolean
}

interface Props {
  articleSlug: string
}

export default function BlogComments({ articleSlug }: Props) {
  const { supabase, user } = useSupabase()
  const [comments, setComments] = useState<Comment[]>([])
  const [commentLikes, setCommentLikes] = useState<Record<number, CommentLike>>({})
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [toast, setToast] = useState('')

  const fetchComments = useCallback(async () => {
    const { data } = await supabase
      .from('blog_comment')
      .select('*, profile(full_name, avatar_url)')
      .eq('article_slug', articleSlug)
      .order('created_at', { ascending: false })
    const fetched = (data as Comment[]) ?? []
    setComments(fetched)

    if (fetched.length === 0) return

    // Fetch like counts for all comments in one query
    const ids = fetched.map(c => c.id)
    const { data: likesData } = await supabase
      .from('blog_like')
      .select('comment_id, user_id')
      .in('comment_id', ids)

    const likeMap: Record<number, CommentLike> = {}
    ids.forEach(id => {
      const rows = likesData?.filter(l => l.comment_id === id) ?? []
      likeMap[id] = {
        count: rows.length,
        liked: user ? rows.some(l => l.user_id === user.id) : false,
      }
    })
    setCommentLikes(likeMap)
  }, [supabase, articleSlug, user])

  useEffect(() => { fetchComments() }, [fetchComments])

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  async function handleSubmit() {
    if (newComment.trim().length < 3 || !user) return
    setIsSubmitting(true)

    // Ensure profile row exists — blog_comment FK references profile(id)
    await supabase.from('profile').upsert(
      { id: user.id, full_name: user.user_metadata?.full_name ?? null },
      { onConflict: 'id', ignoreDuplicates: true }
    )

    const { error } = await supabase.from('blog_comment').insert({
      article_slug: articleSlug,
      user_id: user.id,
      content: newComment.trim(),
    })
    console.log('comment insert result:', { error })
    if (!error) {
      setNewComment('')
      await fetchComments()
    } else {
      showToast(error.message ?? 'Could not post comment. Try again.')
    }
    setIsSubmitting(false)
  }

  async function handleDelete(id: number) {
    await supabase.from('blog_comment').delete().eq('id', id)
    await fetchComments()
  }

  async function handleCommentLike(commentId: number) {
    if (!user) { setShowAuth(true); return }

    const current = commentLikes[commentId] ?? { count: 0, liked: false }
    const wasLiked = current.liked

    // Optimistic update
    setCommentLikes(prev => ({
      ...prev,
      [commentId]: { count: wasLiked ? current.count - 1 : current.count + 1, liked: !wasLiked },
    }))

    if (wasLiked) {
      await supabase
        .from('blog_like')
        .delete()
        .eq('comment_id', commentId)
        .eq('user_id', user.id)
    } else {
      await supabase.from('blog_like').insert({
        comment_id: commentId,
        user_id: user.id,
      })
    }
  }

  return (
    <>
      <div className="mt-20 pt-10 border-t border-white/10">
        <h3 className="font-[var(--font-cormorant)] text-2xl mb-8">
          Discussion ({comments.length})
        </h3>

        {user ? (
          <div className="border border-white/10 rounded-2xl p-5 mb-8">
            <div className="flex gap-3 items-start">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-sm flex-shrink-0 font-medium">
                {user.user_metadata?.full_name?.[0]?.toUpperCase() ?? '?'}
              </div>
              <div className="flex-1 flex flex-col gap-3">
                <textarea
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  placeholder="Share your thoughts on this collection..."
                  maxLength={1000}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:border-white/30 placeholder-white/20 transition-colors"
                />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/20">{newComment.length}/1000</span>
                  <button
                    onClick={handleSubmit}
                    disabled={newComment.trim().length < 3 || isSubmitting}
                    className="px-5 py-2 bg-white text-black rounded-full text-sm font-medium disabled:opacity-30 hover:bg-white/90 transition-all"
                  >
                    {isSubmitting ? 'Posting...' : 'Post Comment'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="border border-white/10 rounded-2xl p-6 text-center mb-8">
            <p className="text-white/40 mb-3 text-sm">Join the conversation</p>
            <button
              onClick={() => setShowAuth(true)}
              className="px-6 py-2 border border-white/20 rounded-full text-sm hover:border-white/50 transition-all"
            >
              Sign in to comment
            </button>
          </div>
        )}

        {comments.length === 0 ? (
          <p className="text-white/25 text-sm text-center py-8">No comments yet. Be the first.</p>
        ) : (
          <div>
            {comments.map(comment => {
              const likes = commentLikes[comment.id] ?? { count: 0, liked: false }
              return (
                <div key={comment.id} className="flex gap-3 py-5 border-b border-white/5">
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-sm flex-shrink-0 font-medium">
                    {comment.profile?.full_name?.[0]?.toUpperCase() ?? '?'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">
                        {comment.profile?.full_name ?? 'Anonymous'}
                      </span>
                      <span className="text-xs text-white/25">
                        {new Date(comment.created_at).toLocaleDateString('en-GB', {
                          day: 'numeric', month: 'short', year: 'numeric',
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed">{comment.content}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <button
                        onClick={() => handleCommentLike(comment.id)}
                        className={`flex items-center gap-1.5 text-xs transition-colors ${
                          likes.liked ? 'text-[#e63946]' : 'text-white/25 hover:text-white/50'
                        }`}
                      >
                        <span style={{ fontSize: '13px' }}>{likes.liked ? '❤️' : '♡'}</span>
                        {likes.count > 0 && <span>{likes.count}</span>}
                      </button>
                      {user?.id === comment.user_id && (
                        <button
                          onClick={() => handleDelete(comment.id)}
                          className="text-xs text-white/20 hover:text-red-500 transition-colors"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onSuccess={msg => { setShowAuth(false); showToast(msg) }}
        />
      )}

      {toast && (
        <div className="fixed bottom-7 left-1/2 -translate-x-1/2 z-[100] bg-[#1a1a1a] text-white px-6 py-3 rounded-full text-sm shadow-2xl border border-white/10 pointer-events-none whitespace-nowrap">
          {toast}
        </div>
      )}
    </>
  )
}
