import Link from 'next/link'
import type { OutfitWithRelations } from '@/types/database'

export default function OutfitGrid({ outfits }: { outfits: OutfitWithRelations[] }) {
  if (outfits.length === 0) {
    return (
      <div className="text-center py-20 text-white/40 text-sm">
        No outfits found. Add data to your Supabase database.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {outfits.map(outfit => (
        <Link key={outfit.id} href={`/outfit/${outfit.id}`} className="block group">
          <article className="bg-[#111] rounded-3xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300 hover:-translate-y-1 shadow-xl">
            <div className="h-64 bg-gradient-to-br from-[#e63946]/20 to-[#c9a84c]/10 relative overflow-hidden flex items-center justify-center">
              {outfit.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={outfit.image_url}
                  alt={outfit.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <span className="text-7xl select-none">{outfit.emoji ?? '👗'}</span>
              )}
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-xs tracking-[0.28em] uppercase text-[#e63946]">
                  {outfit.style ?? outfit.category?.name}
                </span>
                {outfit.brand && (
                  <span className="text-xs text-white/30 uppercase tracking-wider">
                    · {outfit.brand.name}
                  </span>
                )}
              </div>
              <h3 className="font-[var(--font-cormorant)] text-2xl leading-tight mb-1">
                {outfit.name}
              </h3>
              {outfit.description && (
                <p className="text-white/40 text-sm leading-relaxed mb-3 line-clamp-2">
                  {outfit.description}
                </p>
              )}
              <div className="flex items-center justify-between mt-4">
                <span className="text-[#e63946] font-bold text-lg">
                  €{outfit.price_min}
                  {outfit.price_max !== outfit.price_min && (
                    <span className="text-white/30 font-normal text-sm">
                      {' '}– €{outfit.price_max}
                    </span>
                  )}
                </span>
                <span className="text-white/40 text-sm group-hover:text-white transition-colors">
                  View Look →
                </span>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  )
}
