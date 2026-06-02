import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { OutfitItem } from '@/types/database'
import ProductDetail from './ProductDetail'

export const dynamic = 'force-dynamic'

interface ProductOutfit {
  id: number | string
  name: string
  emoji: string | null
  style: string | null
  image_url: string | null
  brand: { name: string; country: string | null }
}

interface ProductWithOutfit extends OutfitItem {
  outfit: ProductOutfit
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: productData } = await supabase
    .from('outfit_item')
    .select('*, outfit(id, name, emoji, style, image_url, brand(name, country))')
    .eq('id', Number(id))
    .single()

  if (!productData) notFound()

  const product = productData as ProductWithOutfit

  const { data: completeData } = await supabase
    .from('outfit_item')
    .select('*')
    .eq('outfit_id', product.outfit_id)
    .neq('id', Number(id))
    .eq('is_available', true)

  const completeItems = (completeData as OutfitItem[]) ?? []

  return (
    <main className="min-h-screen">
      {/* Breadcrumb */}
      <div className="px-6 md:px-8 py-4 border-b border-white/10 flex items-center gap-2 text-sm text-white/40 flex-wrap">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-white transition-colors">Shop</Link>
        <span>/</span>
        <Link
          href={`/outfit/${product.outfit_id}`}
          className="hover:text-white transition-colors"
        >
          {product.outfit?.name}
        </Link>
        <span>/</span>
        <span className="text-white/70 truncate max-w-[200px]">{product.name}</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-12">
        <ProductDetail product={product} completeItems={completeItems} />
      </div>
    </main>
  )
}
