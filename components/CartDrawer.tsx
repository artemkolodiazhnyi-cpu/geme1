'use client'

import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { useSupabase } from '@/contexts/SupabaseContext'

export default function CartDrawer() {
  const { state, dispatch, totalItems, totalPrice } = useCart()
  const { user } = useSupabase()
  const [loading, setLoading] = useState(false)

  async function handleCheckout() {
    if (state.items.length === 0) return
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: state.items.map(i => ({
            name: i.name,
            price: i.price,
            emoji: i.emoji,
            quantity: i.quantity,
          })),
          userId: user?.id ?? null,
        }),
      })
      const data = await res.json()
      if (data.url) {
        dispatch({ type: 'CLOSE_CART' })
        window.location.href = data.url
      }
    } catch (err) {
      console.error('Checkout error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {state.isOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
          onClick={() => dispatch({ type: 'CLOSE_CART' })}
        />
      )}

      <aside
        className={`fixed right-0 top-0 bottom-0 z-[70] w-[min(400px,100vw)] bg-[#111] border-l border-white/10 shadow-2xl flex flex-col transition-transform duration-300 ${
          state.isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 flex-shrink-0">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#e63946] mb-0.5">Your Cart</p>
            <h3 className="font-[var(--font-cormorant)] text-xl">
              {totalItems === 0 ? 'Empty' : `${totalItems} item${totalItems > 1 ? 's' : ''}`}
            </h3>
          </div>
          <button
            onClick={() => dispatch({ type: 'CLOSE_CART' })}
            className="w-11 h-11 flex items-center justify-center rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {state.items.length === 0 ? (
            <p className="text-white/40 text-center mt-16 text-sm">Your cart is empty</p>
          ) : (
            state.items.map(item => (
              <div key={item.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/10">
                <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.name}</p>
                  <p className="text-xs text-[#e63946] font-bold mt-0.5">€{item.price}</p>
                </div>
                <div className="flex items-center border border-white/10 rounded-xl overflow-hidden flex-shrink-0">
                  <button
                    onClick={() => dispatch({ type: 'UPDATE_QUANTITY', id: item.id, quantity: item.quantity - 1 })}
                    className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  >−</button>
                  <span className="w-6 text-center text-sm">{item.quantity}</span>
                  <button
                    onClick={() => dispatch({ type: 'UPDATE_QUANTITY', id: item.id, quantity: item.quantity + 1 })}
                    className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  >+</button>
                </div>
                <button
                  onClick={() => dispatch({ type: 'REMOVE_ITEM', id: item.id })}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-white/30 hover:text-[#e63946] hover:bg-[#e63946]/10 transition-colors flex-shrink-0"
                  aria-label="Remove item"
                >×</button>
              </div>
            ))
          )}
        </div>

        <div className="px-6 py-5 border-t border-white/10 flex-shrink-0">
          <div className="flex justify-between items-center mb-4">
            <span className="text-white/60 text-sm">Total</span>
            <strong className="text-[#e63946] text-xl">€{totalPrice.toFixed(2)}</strong>
          </div>
          <button
            onClick={handleCheckout}
            disabled={state.items.length === 0 || loading}
            className="w-full py-3.5 rounded-full bg-[#e63946] text-white font-semibold uppercase tracking-widest text-sm hover:bg-[#c42a35] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? 'Redirecting…' : 'Checkout'}
          </button>
        </div>
      </aside>
    </>
  )
}
