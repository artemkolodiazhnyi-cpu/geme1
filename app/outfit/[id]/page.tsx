import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { OutfitWithRelations, OutfitItem } from '@/types/database'
import ShopTheLook from './ShopTheLook'

export const dynamic = 'force-dynamic'

export default async function OutfitPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: outfitData } = await supabase
    .from('outfit')
    .select('*, brand(name, country), category(name)')
    .eq('id', id)
    .single()

  if (!outfitData) notFound()

  const outfit = outfitData as OutfitWithRelations

  const { data: itemsData, error: itemsError } = await supabase
    .from('outfit_item')
    .select('*')
    .eq('outfit_id', Number(id))

  if (itemsError) console.error('[outfit page] items error:', itemsError.message)

  const items = (itemsData as OutfitItem[]) ?? []

  const relatedOrFilter = outfit.style
    ? `style.eq.${outfit.style},brand_id.eq.${outfit.brand_id}`
    : `brand_id.eq.${outfit.brand_id}`

  const { data: relatedData } = await supabase
    .from('outfit')
    .select('*, brand(name, country), category(name)')
    .or(relatedOrFilter)
    .eq('is_active', true)
    .neq('id', id)
    .limit(3)

  const related = (relatedData as OutfitWithRelations[]) ?? []

  return (
    <main className="min-h-screen">
      {/* Top nav — back + brand · name */}
      <div className="px-6 md:px-8 py-4 border-b border-white/10 flex items-center gap-4">
        <Link
          href="/"
          className="text-white/40 text-sm hover:text-white transition-colors flex-shrink-0"
        >
          ← Back
        </Link>
        <div className="flex items-center gap-2 min-w-0 overflow-hidden">
          {outfit.brand && (
            <>
              <span className="text-white/40 text-xs uppercase tracking-widest flex-shrink-0">
                {outfit.brand.name}
              </span>
              <span className="text-white/20 flex-shrink-0">·</span>
            </>
          )}
          <span className="font-[var(--font-cormorant)] text-xl truncate">
            {outfit.name}
          </span>
        </div>
      </div>

      {/* 2-column: photo + info/items */}
      <ShopTheLook outfit={outfit} items={items} />

      {/* More like this */}
      {related.length > 0 && (
        <section className="px-6 md:px-8 py-16 border-t border-white/10">
          <h2
            className="font-[var(--font-cormorant)] mb-8"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
          >
            More like this
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {related.map(r => {
              const reason = r.brand_id === outfit.brand_id
                ? `Also by ${r.brand?.name ?? outfit.brand?.name}`
                : r.style === outfit.style && r.style
                  ? `Same style: ${r.style}`
                  : 'Similar look'
              return (
                <Link key={r.id} href={`/outfit/${r.id}`} className="block group">
                  <div className="border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all flex flex-col">
                    <div className="aspect-[3/4] bg-black relative overflow-hidden">
                      {r.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={r.image_url}
                          alt={r.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-5xl select-none">
                          {r.emoji ?? '👗'}
                        </div>
                      )}
                    </div>
                    <div className="p-3 bg-[#111] flex flex-col gap-1">
                      <p className="text-xs text-white/40 uppercase tracking-wider">{r.brand?.name}</p>
                      <p className="text-sm font-medium truncate">{r.name}</p>
                      <p className="text-xs text-[#e63946]">€{r.price_min}+</p>
                      <span className="mt-1 self-start px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/40">
                        {reason}
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}
    </main>
  )
}
