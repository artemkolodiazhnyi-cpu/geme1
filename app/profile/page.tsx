'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useSupabase } from '@/contexts/SupabaseContext'

type Tab = 'overview' | 'orders' | 'liked' | 'collections'

interface OrderItem {
  name: string
  quantity: number
  price: number
}

interface Order {
  id: number
  stripe_session_id: string | null
  status: string
  total_amount: number
  created_at: string
  items: OrderItem[]
}

const TABS: { key: Tab; label: string }[] = [
  { key: 'overview',     label: 'Overview' },
  { key: 'orders',       label: 'My Orders' },
  { key: 'liked',        label: 'Liked Looks' },
  { key: 'collections',  label: 'Collections' },
]

export default function ProfilePage() {
  const router = useRouter()
  const { user, loading, supabase } = useSupabase()
  const [tab, setTab] = useState<Tab>('orders')
  const [orders, setOrders] = useState<Order[]>([])
  const [ordersLoading, setOrdersLoading] = useState(false)

  useEffect(() => {
    if (!loading && !user) router.push('/')
  }, [user, loading, router])

  useEffect(() => {
    if (!user) return
    setOrdersLoading(true)
    fetch('/api/orders')
      .then(r => r.json())
      .then(data => { setOrders(data.orders ?? []); setOrdersLoading(false) })
      .catch(() => setOrdersLoading(false))
  }, [user])

  if (loading || !user) {
    return (
      <main className="min-h-screen pt-24 flex items-center justify-center">
        <p className="text-white/30 text-sm">Loading…</p>
      </main>
    )
  }

  const firstName = user.user_metadata?.full_name?.split(' ')[0] ?? user.email?.split('@')[0] ?? ''

  return (
    <main className="min-h-screen pt-24">
      <div className="max-w-3xl mx-auto px-6 md:px-8 py-12">

        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-12 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-2xl font-medium flex-shrink-0">
              {user.user_metadata?.full_name?.[0]?.toUpperCase() ?? '?'}
            </div>
            <div>
              <h1
                className="font-[var(--font-cormorant)] leading-tight"
                style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}
              >
                {user.user_metadata?.full_name ?? firstName}
              </h1>
              <p className="text-white/40 text-sm">{user.email}</p>
            </div>
          </div>
          <button
            onClick={() => supabase.auth.signOut().then(() => router.push('/'))}
            className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/50 hover:text-white hover:border-white/30 transition-all"
          >
            Sign out
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10 mb-10 gap-0 overflow-x-auto scrollbar-hide">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-5 py-3 text-xs uppercase tracking-[0.18em] border-b-2 transition-colors whitespace-nowrap ${
                tab === t.key
                  ? 'border-[#e63946] text-white'
                  : 'border-transparent text-white/40 hover:text-white/70'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {tab === 'overview' && (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: 'Orders', value: orders.length },
                { label: 'Member since', value: new Date(user.created_at).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }) },
                { label: 'Total spent', value: `€${orders.reduce((s, o) => s + o.total_amount, 0).toLocaleString()}` },
              ].map(stat => (
                <div key={stat.label} className="bg-[#111] border border-white/10 rounded-2xl p-5">
                  <p className="text-xs uppercase tracking-widest text-white/30 mb-2">{stat.label}</p>
                  <p className="font-[var(--font-cormorant)] text-3xl">{stat.value}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-4 flex-wrap">
              <Link href="/" className="px-5 py-2.5 rounded-full bg-[#e63946] text-white text-sm font-medium hover:bg-[#c42a35] transition-colors">
                Continue Shopping
              </Link>
              <button onClick={() => setTab('orders')} className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-colors">
                View Orders
              </button>
            </div>
          </div>
        )}

        {/* My Orders */}
        {tab === 'orders' && (
          <div>
            {ordersLoading ? (
              <p className="text-white/30 text-sm text-center py-12">Loading orders…</p>
            ) : orders.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-4xl mb-4">🛍️</p>
                <p className="text-white/40">No orders yet.</p>
                <Link href="/" className="text-[#e63946] text-sm mt-2 inline-block hover:underline">
                  Start shopping →
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {orders.map(order => (
                  <div key={order.id} className="border border-white/10 rounded-2xl p-6 flex flex-col gap-4 bg-[#111]">
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div>
                        <p className="text-xs text-white/30 uppercase tracking-wider">Order #{order.id}</p>
                        <p className="text-sm text-white/50 mt-1">
                          {new Date(order.created_at).toLocaleDateString('en-GB', {
                            day: 'numeric', month: 'long', year: 'numeric',
                          })}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        order.status === 'paid'
                          ? 'bg-green-500/20 text-green-400 border-green-500/30'
                          : 'bg-white/10 text-white/50 border-white/10'
                      }`}>
                        {order.status === 'paid' ? '✓ Paid' : order.status}
                      </span>
                    </div>

                    {order.items && order.items.length > 0 && (
                      <div className="flex flex-col gap-1.5 border-t border-white/5 pt-4">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex items-center justify-between text-sm">
                            <span className="text-white/60 truncate mr-4">{item.name} {item.quantity > 1 && `×${item.quantity}`}</span>
                            <span className="text-white/40 flex-shrink-0">€{item.price.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between border-t border-white/5 pt-4">
                      <p className="text-white/40 text-sm">Total</p>
                      <p className="font-bold text-lg">€{Number(order.total_amount).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Liked Looks */}
        {tab === 'liked' && (
          <div className="text-center py-16">
            <p className="text-4xl mb-4">❤️</p>
            <p className="text-white/40 mb-2">Your liked looks live in the swipe session.</p>
            <p className="text-white/25 text-sm mb-6">Persistent saved looks coming soon.</p>
            <Link href="/swipe" className="px-5 py-2.5 rounded-full bg-[#e63946] text-white text-sm font-medium hover:bg-[#c42a35] transition-colors">
              Go to Swipe →
            </Link>
          </div>
        )}

        {/* Collections */}
        {tab === 'collections' && (
          <div className="text-center py-16">
            <p className="text-4xl mb-4">🗂️</p>
            <p className="text-white/40 mb-2">Collections coming soon.</p>
            <p className="text-white/25 text-sm">Save and organise your favourite looks into custom collections.</p>
          </div>
        )}
      </div>
    </main>
  )
}
