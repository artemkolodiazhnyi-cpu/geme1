'use client'

import { useState, useEffect } from 'react'
import { useSupabase } from '@/contexts/SupabaseContext'
import AuthModal from './AuthModal'

interface Props {
  articleSlug: string
}

export default function ArticleLike({ articleSlug }: Props) {
  const { supabase, user } = useSupabase()
  const [likeCount, setLikeCount] = useState(0)
  const [liked, setLiked] = useState(false)
  const [burst, setBurst] = useState(false)
  const [showAuth, setShowAuth] = useState(false)

  useEffect(() => {
    async function fetchLikes() {
      const { data } = await supabase
        .from('blog_like')
        .select('user_id')
        .eq('article_slug', articleSlug)
        .is('comment_id', null)
      setLikeCount(data?.length ?? 0)
      if (user) {
        setLiked(data?.some(l => l.user_id === user.id) ?? false)
      }
    }
    fetchLikes()
  }, [supabase, articleSlug, user])

  async function handleToggle() {
    if (!user) { setShowAuth(true); return }

    const wasLiked = liked
    setLiked(!wasLiked)
    setLikeCount(c => wasLiked ? c - 1 : c + 1)
    setBurst(true)
    setTimeout(() => setBurst(false), 350)

    if (wasLiked) {
      await supabase
        .from('blog_like')
        .delete()
        .eq('article_slug', articleSlug)
        .eq('user_id', user.id)
        .is('comment_id', null)
    } else {
      await supabase.from('blog_like').insert({
        article_slug: articleSlug,
        user_id: user.id,
      })
    }
  }

  return (
    <>
      <button
        onClick={handleToggle}
        className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm transition-all ${
          liked
            ? 'border-[#e63946]/50 bg-[#e63946]/10 text-[#e63946]'
            : 'border-white/15 text-white/40 hover:border-white/30 hover:text-white/70'
        }`}
      >
        <span
          style={{
            display: 'inline-block',
            transform: burst ? 'scale(1.4)' : 'scale(1)',
            transition: 'transform 0.2s cubic-bezier(.17,.67,.46,1.5)',
          }}
        >
          {liked ? '❤️' : '♡'}
        </span>
        <span>{likeCount}</span>
      </button>

      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onSuccess={() => setShowAuth(false)}
        />
      )}
    </>
  )
}
