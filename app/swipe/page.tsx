'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { useSupabase } from '@/contexts/SupabaseContext'
import { useCart } from '@/contexts/CartContext'
import type { OutfitWithRelations } from '@/types/database'

// ─── Swipe Card ───────────────────────────────────────────────────────────────

interface CardProps {
  outfit: OutfitWithRelations
  stackPos: number
  isTop: boolean
  onSwipe: (outfit: OutfitWithRelations, liked: boolean) => void
}

function SwipeCard({ outfit, stackPos, isTop, onSwipe }: CardProps) {
  const [dx, setDx] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [flyDir, setFlyDir] = useState<'left' | 'right' | null>(null)
  const startX = useRef(0)

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isTop || flyDir) return
    e.currentTarget.setPointerCapture(e.pointerId)
    startX.current = e.clientX
    setIsDragging(true)
  }, [isTop, flyDir])

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return
    setDx(e.clientX - startX.current)
  }, [isDragging])

  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return
    setIsDragging(false)
    const finalDx = e.clientX - startX.current
    if (Math.abs(finalDx) > 80) {
      const liked = finalDx > 0
      setFlyDir(liked ? 'right' : 'left')
      setTimeout(() => onSwipe(outfit, liked), 350)
    } else {
      setDx(0)
    }
  }, [isDragging, outfit, onSwipe])

  const handlePointerCancel = useCallback(() => {
    setIsDragging(false)
    setDx(0)
  }, [])

  useEffect(() => {
    if (!isTop) return
    function onKey(e: KeyboardEvent) {
      if (flyDir) return
      if (e.key === 'ArrowRight') { setFlyDir('right'); setTimeout(() => onSwipe(outfit, true), 350) }
      if (e.key === 'ArrowLeft')  { setFlyDir('left');  setTimeout(() => onSwipe(outfit, false), 350) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isTop, flyDir, outfit, onSwipe])

  const baseY  = stackPos * 10
  const baseScale = 1 - stackPos * 0.03

  let transform: string
  if (flyDir === 'right') {
    transform = 'translateX(160vw) rotate(20deg)'
  } else if (flyDir === 'left') {
    transform = 'translateX(-160vw) rotate(-20deg)'
  } else if (isTop) {
    transform = `translateX(${dx}px) rotate(${dx * 0.08}deg)`
  } else {
    transform = `translateY(${baseY}px) scale(${baseScale})`
  }

  const transition = isDragging ? 'none' : 'transform 0.35s ease'

  const likeOpacity  = Math.min(Math.max(dx / 80, 0), 1)
  const nopeOpacity  = Math.min(Math.max(-dx / 80, 0), 1)

  return (
    <div
      className="absolute inset-0 rounded-3xl overflow-hidden border border-white/10 bg-[#111] shadow-2xl select-none touch-none flex flex-col"
      style={{ transform, transition, zIndex: 10 - stackPos, cursor: isTop ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
    >
      {/* LIKE indicator */}
      <div
        className="absolute top-6 left-5 z-20 border-2 border-green-500 text-green-500 px-3 py-1 rounded-xl text-base font-bold uppercase tracking-wider pointer-events-none"
        style={{ opacity: likeOpacity, transform: 'rotate(-15deg)' }}
      >
        LIKE
      </div>
      {/* NOPE indicator */}
      <div
        className="absolute top-6 right-5 z-20 border-2 border-[#e63946] text-[#e63946] px-3 py-1 rounded-xl text-base font-bold uppercase tracking-wider pointer-events-none"
        style={{ opacity: nopeOpacity, transform: 'rotate(15deg)' }}
      >
        NOPE
      </div>

      {/* Visual */}
      <div className="flex-1 relative min-h-0 overflow-hidden">
        {outfit.image_url ? (
          <div className="relative w-full h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={outfit.image_url}
              alt={outfit.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-black">
            <span className="text-8xl">{outfit.emoji}</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5 flex-shrink-0 bg-[#111]">
        <span className="text-xs tracking-[0.28em] uppercase text-[#e63946] block mb-1">
          {outfit.style ?? outfit.category?.name}
        </span>
        <h3 className="font-[var(--font-cormorant)] text-2xl leading-tight mb-0.5">{outfit.name}</h3>
        <p className="text-white/40 text-xs uppercase tracking-widest mb-1">{outfit.brand?.name}</p>
        {outfit.description && (
          <p className="text-white/40 text-sm leading-snug line-clamp-2 mb-2">{outfit.description}</p>
        )}
        <p className="text-[#e63946] font-bold text-lg">
          €{outfit.price_min}
          {outfit.price_max !== outfit.price_min && (
            <span className="text-white/30 font-normal text-sm"> – €{outfit.price_max}</span>
          )}
        </p>
        <Link
          href={`/outfit/${outfit.id}`}
          onPointerDown={e => e.stopPropagation()}
          className="text-xs text-white/40 hover:text-white transition-colors mt-1 self-start"
        >
          View Details →
        </Link>
      </div>
    </div>
  )
}

// ─── Action Button ────────────────────────────────────────────────────────────

function ActionBtn({
  onClick, children, large, label, color,
}: {
  onClick: () => void
  children: React.ReactNode
  large?: boolean
  label: string
  color: string
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className="rounded-full border-2 border-white/10 bg-[#111] flex items-center justify-center shadow-xl transition-transform hover:scale-110 active:scale-95"
      style={{
        width: large ? 64 : 52,
        height: large ? 64 : 52,
        fontSize: large ? '1.4rem' : '1.1rem',
        color,
      }}
    >
      {children}
    </button>
  )
}

// ─── Liked Modal ──────────────────────────────────────────────────────────────

function LikedModal({
  outfits, onClose, onAddToCart,
}: {
  outfits: OutfitWithRelations[]
  onClose: () => void
  onAddToCart: (o: OutfitWithRelations) => void
}) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="relative w-[min(500px,calc(100vw-32px))] bg-[#111] rounded-3xl border border-white/10 p-6 shadow-2xl max-h-[80vh] flex flex-col">
        <button onClick={onClose} className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors">✕</button>
        <h3 className="font-[var(--font-cormorant)] text-2xl mb-5">Liked Outfits ❤️</h3>
        <div className="overflow-y-auto flex-1 flex flex-col gap-3">
          {outfits.length === 0 ? (
            <p className="text-white/40 text-center py-8 text-sm">No liked outfits yet</p>
          ) : (
            outfits.map(o => (
              <div key={o.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/10">
                <span className="text-2xl flex-shrink-0">{o.emoji ?? '👗'}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{o.name}</p>
                  <p className="text-xs text-white/40 uppercase tracking-wider">{o.brand?.name}</p>
                  <p className="text-xs text-[#e63946] font-bold mt-0.5">€{o.price_min}</p>
                </div>
                <button
                  onClick={() => { onAddToCart(o); onClose() }}
                  className="flex-shrink-0 px-4 py-2 rounded-full bg-[#e63946] text-white text-xs font-semibold hover:bg-[#c42a35] transition-colors"
                >
                  Shop
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState({ likedCount, onViewLiked, onRestart }: { likedCount: number; onViewLiked: () => void; onRestart: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 text-center max-w-xs px-4">
      <div className="text-6xl">🎉</div>
      <h2 className="font-[var(--font-cormorant)] text-4xl">You&apos;ve seen it all!</h2>
      <p className="text-white/50 leading-relaxed">
        You liked <strong className="text-white">{likedCount}</strong> outfit{likedCount !== 1 ? 's' : ''}.<br />Check them out or start fresh.
      </p>
      <div className="flex gap-3 flex-wrap justify-center">
        <button onClick={onViewLiked} className="px-6 py-3 rounded-full bg-[#e63946] text-white text-sm font-semibold hover:bg-[#c42a35] transition-colors">
          View Liked ❤️
        </button>
        <button onClick={onRestart} className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-sm font-semibold hover:bg-white/10 transition-colors">
          Start Over ↺
        </button>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SwipePage() {
  const supabase = createClient()
  const { user } = useSupabase()
  const { dispatch: cartDispatch } = useCart()

  const [allOutfits, setAllOutfits] = useState<OutfitWithRelations[]>([])
  const [queue, setQueue] = useState<OutfitWithRelations[]>([])
  const [history, setHistory] = useState<{ outfit: OutfitWithRelations; liked: boolean }[]>([])
  const [liked, setLiked] = useState<OutfitWithRelations[]>([])
  const [likedOpen, setLikedOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('outfit')
      .select('*, brand(name, country), category(name)')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        const items = (data as OutfitWithRelations[]) ?? []
        setAllOutfits(items)
        setQueue(items)
        setLoading(false)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const executeSwipe = useCallback(async (outfit: OutfitWithRelations, isLiked: boolean) => {
    setQueue(q => q.slice(1))
    setHistory(h => [...h, { outfit, liked: isLiked }])
    if (isLiked) setLiked(l => [...l, outfit])

    if (user) {
      await supabase.from('swipe_history').upsert(
        { user_id: user.id, outfit_id: outfit.id, is_liked: isLiked },
        { onConflict: 'user_id,outfit_id' }
      )
    }
  }, [user, supabase])

  function handleUndo() {
    if (history.length === 0) return
    const last = history[history.length - 1]
    setHistory(h => h.slice(0, -1))
    setQueue(q => [last.outfit, ...q])
    if (last.liked) setLiked(l => l.filter(o => o.id !== last.outfit.id))
  }

  function addCurrentToCart() {
    if (queue.length === 0) return
    const o = queue[0]
    cartDispatch({ type: 'ADD_ITEM', item: { id: o.id, name: o.name, emoji: o.emoji ?? '👗', price: o.price_min, quantity: 1 } })
    cartDispatch({ type: 'OPEN_CART' })
  }

  function restart() {
    setQueue(allOutfits)
    setHistory([])
    setLiked([])
  }

  const visibleCards = queue.slice(0, 3)
  const total = allOutfits.length
  const seen  = total - queue.length

  return (
    <div className="fixed inset-0 flex flex-col bg-[#0a0a0a] overflow-hidden">
      {/* Compact nav */}
      <nav className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 flex-shrink-0 z-10">
        <Link href="/" className="font-[var(--font-cormorant)] text-xl tracking-widest lowercase">géme</Link>
        <div className="flex items-center gap-2">
          <Link href="/#feed" className="hidden sm:block text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors px-3 py-1.5 rounded-full border border-white/10">
            Explore
          </Link>
          <button
            onClick={() => setLikedOpen(true)}
            className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-colors"
          >
            ❤️ {liked.length}
          </button>
          <button
            onClick={() => cartDispatch({ type: 'OPEN_CART' })}
            className="px-3 py-1.5 rounded-full bg-[#e63946] text-white text-sm hover:bg-[#c42a35] transition-colors"
          >
            Cart
          </button>
        </div>
      </nav>

      {/* Main area */}
      <main className="flex-1 flex flex-col items-center justify-center gap-4 px-4 py-4 min-h-0 overflow-hidden">
        {loading ? (
          <p className="text-white/40 text-sm">Loading outfits…</p>
        ) : queue.length === 0 ? (
          <EmptyState likedCount={liked.length} onViewLiked={() => setLikedOpen(true)} onRestart={restart} />
        ) : (
          <>
            {/* Deck */}
            <div className="relative w-full max-w-[360px] flex-shrink-0" style={{ height: 'min(480px, calc(100dvh - 240px))' }}>
              {visibleCards.map((outfit, idx) => (
                <SwipeCard
                  key={outfit.id}
                  outfit={outfit}
                  stackPos={idx}
                  isTop={idx === 0}
                  onSwipe={executeSwipe}
                />
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <ActionBtn onClick={() => queue[0] && executeSwipe(queue[0], false)} large label="Dislike (←)" color="#e63946">✕</ActionBtn>
              <ActionBtn onClick={handleUndo} label="Undo (Z)" color="#888">↶</ActionBtn>
              <ActionBtn onClick={addCurrentToCart} label="Add to cart" color="#c9a84c">🛒</ActionBtn>
              <ActionBtn onClick={() => queue[0] && executeSwipe(queue[0], true)} large label="Like (→)" color="#4caf50">♡</ActionBtn>
            </div>

            {/* Counter */}
            <p className="text-xs tracking-[0.2em] uppercase text-white/30 flex-shrink-0">
              {seen + 1} of {total}
            </p>
          </>
        )}
      </main>

      {/* Liked modal */}
      {likedOpen && (
        <LikedModal
          outfits={liked}
          onClose={() => setLikedOpen(false)}
          onAddToCart={o => {
            cartDispatch({ type: 'ADD_ITEM', item: { id: o.id, name: o.name, emoji: o.emoji ?? '👗', price: o.price_min, quantity: 1 } })
            cartDispatch({ type: 'OPEN_CART' })
          }}
        />
      )}
    </div>
  )
}
