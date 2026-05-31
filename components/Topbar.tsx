'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSupabase } from '@/contexts/SupabaseContext'
import { useCart } from '@/contexts/CartContext'
import AuthModal from './AuthModal'

export default function Topbar() {
  const { user } = useSupabase()
  const { totalItems, dispatch } = useCart()
  const [showAuth, setShowAuth] = useState(false)
  const [toast, setToast] = useState('')

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const firstName =
    user?.user_metadata?.full_name?.split(' ')[0] ??
    user?.email?.split('@')[0] ??
    ''

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 py-4 md:py-5 backdrop-blur-md bg-[#0a0a0a]/80 border-b border-white/10">
        <Link
          href="/"
          className="font-[var(--font-cormorant)] text-2xl tracking-widest lowercase hover:text-white/80 transition-colors"
        >
          géme
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/#feed" className="text-xs tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors">
            Explore
          </Link>
          <Link href="/swipe" className="text-xs tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors">
            Swipe Looks
          </Link>
          <Link href="/products" className="text-xs tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors">
            Shop
          </Link>
          <Link href="/blog" className="text-xs tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors">
            The Edit
          </Link>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={() => dispatch({ type: 'OPEN_CART' })}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-colors"
          >
            Cart
            {totalItems > 0 && (
              <span className="bg-[#e63946] text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center leading-none">
                {totalItems}
              </span>
            )}
          </button>

          {user ? (
            <Link
              href="/profile"
              className="px-4 py-2 rounded-full bg-[#e63946]/15 border border-[#e63946]/40 text-sm hover:bg-[#e63946]/25 transition-colors"
            >
              {firstName} ▾
            </Link>
          ) : (
            <button
              onClick={() => setShowAuth(true)}
              className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-colors"
            >
              Join géme
            </button>
          )}
        </div>
      </nav>

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
