'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSupabase } from '@/contexts/SupabaseContext'
import type { RecommendationItem } from '@/app/api/recommendations/route'

export default function RecommendationRow() {
  const { user, loading } = useSupabase()
  const [recs, setRecs] = useState<RecommendationItem[]>([])
  const [basedOn, setBasedOn] = useState<string | null>(null)
  const [fetched, setFetched] = useState(false)

  useEffect(() => {
    if (loading) return
    const url = user
      ? `/api/recommendations?userId=${encodeURIComponent(user.id)}`
      : '/api/recommendations'

    fetch(url)
      .then(r => r.json())
      .then(data => {
        setRecs(data.recommendations ?? [])
        setBasedOn(data.basedOn ?? null)
        setFetched(true)
      })
      .catch(() => setFetched(true))
  }, [user, loading])

  if (!fetched || recs.length === 0) return null

  const isPersonal = !!basedOn

  return (
    <section className="px-6 md:px-8 py-16 border-t border-white/5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 flex-wrap">
        {isPersonal ? (
          <>
            <span className="text-white/40 text-xs uppercase tracking-widest">Because you liked</span>
            <span className="text-white text-sm font-medium">{basedOn}</span>
            <span className="text-white/30">→</span>
          </>
        ) : (
          <>
            <span className="text-xs tracking-[0.35em] uppercase text-[#e63946]">Trending Now</span>
            <span className="text-white/40 text-sm">— Most loved looks</span>
          </>
        )}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {recs.map(outfit => (
          <Link
            key={outfit.id}
            href={`/outfit/${outfit.id}`}
            className="border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all group flex flex-col"
          >
            <div className="aspect-[3/4] bg-black relative overflow-hidden">
              {outfit.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={outfit.image_url}
                  alt={outfit.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl select-none">
                  {outfit.emoji ?? '👗'}
                </div>
              )}
            </div>
            <div className="p-3 flex flex-col gap-1 bg-[#111]">
              <p className="text-xs text-white/40 uppercase tracking-wider truncate">
                {(outfit.brand as any)?.name ?? ''}
              </p>
              <p className="text-sm font-medium truncate leading-snug">{outfit.name}</p>
              <p className="text-xs text-[#e63946]">€{outfit.price_min}+</p>
              <span className="mt-1 self-start px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/40 truncate max-w-full">
                {outfit.reason}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
