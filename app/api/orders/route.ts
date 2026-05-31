import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient as createServerClient } from '@/utils/supabase/server'
import { createClient } from '@supabase/supabase-js'

const adminSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  // Authenticate the user via cookie session (anon client)
  const authClient = await createServerClient()
  const { data: { user } } = await authClient.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Use service role client to bypass RLS when reading orders
  const { data: orders, error: ordersError } = await adminSupabase
    .from('order')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (ordersError) console.error('orders fetch error:', ordersError.message)

  if (!orders || orders.length === 0) {
    return NextResponse.json({ orders: [] })
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

  const enriched = await Promise.all(
    orders.map(async order => {
      if (!order.stripe_session_id) return { ...order, items: [] }
      try {
        const session = await stripe.checkout.sessions.retrieve(
          order.stripe_session_id,
          { expand: ['line_items'] }
        )
        const items = session.line_items?.data.map(item => ({
          name: item.description ?? 'Item',
          quantity: item.quantity ?? 1,
          price: (item.amount_total ?? 0) / 100,
        })) ?? []
        return { ...order, items }
      } catch {
        return { ...order, items: [] }
      }
    })
  )

  return NextResponse.json({ orders: enriched })
}
