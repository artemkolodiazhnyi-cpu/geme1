import { createClient } from '@/utils/supabase/server'
import ProductGrid from './ProductGrid'

export const dynamic = 'force-dynamic'

export default async function ProductsPage() {
  const supabase = await createClient()

  const { data: products } = await supabase
    .from('outfit_item')
    .select('*, outfit(name, emoji, style, brand(name))')
    .eq('is_available', true)
    .order('price', { ascending: true })

  return (
    <main className="min-h-screen pt-24">
      <div className="px-6 md:px-8 py-12">
        <div className="mb-10">
          <span className="text-xs tracking-[0.35em] uppercase text-[#e63946] block mb-3">
            Individual Pieces
          </span>
          <h1
            className="font-[var(--font-cormorant)] leading-tight mb-3"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            Shop Individual Pieces
          </h1>
          <p className="text-white/40 text-base">Every item from every look.</p>
        </div>

        <ProductGrid products={(products as any[]) ?? []} />
      </div>
    </main>
  )
}
