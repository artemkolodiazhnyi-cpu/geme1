'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { OutfitWithRelations } from '@/types/database'
import { useOutfitFilter } from '@/hooks/useOutfitFilter'

const PRICE_BUCKETS = [
  { label: 'Under €500',  value: 500 },
  { label: 'Under €1k',   value: 1000 },
  { label: 'Under €3k',   value: 3000 },
  { label: 'Under €5k',   value: 5000 },
]

export default function OutfitFeed({ outfits }: { outfits: OutfitWithRelations[] }) {
  const {
    search, setSearch,
    styles, toggleStyle,
    brands, toggleBrand,
    priceMax, setPriceMax,
    allStyles, allBrands,
    filtered,
    hasActiveFilters,
    clearAll,
  } = useOutfitFilter(outfits)

  const [filterKey, setFilterKey] = useState(0)

  function handleClearAll() {
    clearAll()
    setFilterKey(k => k + 1)
  }

  function handleToggleStyle(s: string) {
    toggleStyle(s)
    setFilterKey(k => k + 1)
  }

  function handleToggleBrand(b: string) {
    toggleBrand(b)
    setFilterKey(k => k + 1)
  }

  function handleSetPrice(v: number | null) {
    setPriceMax(v)
    setFilterKey(k => k + 1)
  }

  return (
    <div>
      {/* Search + filter bar */}
      <div className="mb-8 flex flex-col gap-4">
        {/* Search input */}
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none"
            fill="none" stroke="currentColor" strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search outfits, brands, styles…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-full pl-11 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter pills */}
        <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-1">
          {/* Styles */}
          {allStyles.length > 0 && (
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs uppercase tracking-widest text-white/30 flex-shrink-0">Style</span>
              <div className="flex gap-2 flex-wrap">
                {allStyles.map(s => (
                  <button
                    key={s}
                    onClick={() => handleToggleStyle(s)}
                    className={`px-3 py-1 rounded-full text-xs border transition-all whitespace-nowrap ${
                      styles.includes(s)
                        ? 'bg-[#e63946] border-[#e63946] text-white'
                        : 'border-white/15 text-white/50 hover:border-white/30'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Brands */}
          {allBrands.length > 0 && (
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs uppercase tracking-widest text-white/30 flex-shrink-0">Brand</span>
              <div className="flex gap-2 flex-wrap">
                {allBrands.map(b => (
                  <button
                    key={b}
                    onClick={() => handleToggleBrand(b)}
                    className={`px-3 py-1 rounded-full text-xs border transition-all whitespace-nowrap ${
                      brands.includes(b)
                        ? 'bg-[#e63946] border-[#e63946] text-white'
                        : 'border-white/15 text-white/50 hover:border-white/30'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xs uppercase tracking-widest text-white/30 flex-shrink-0">Price</span>
            <div className="flex gap-2">
              {PRICE_BUCKETS.map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => handleSetPrice(priceMax === value ? null : value)}
                  className={`px-3 py-1 rounded-full text-xs border transition-all whitespace-nowrap ${
                    priceMax === value
                      ? 'bg-[#e63946] border-[#e63946] text-white'
                      : 'border-white/15 text-white/50 hover:border-white/30'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results row */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/40">
            {filtered.length === outfits.length
              ? `${outfits.length} looks`
              : `${filtered.length} of ${outfits.length} looks`}
          </span>
          {hasActiveFilters && (
            <button
              onClick={handleClearAll}
              className="text-xs text-white/40 hover:text-white transition-colors underline underline-offset-2"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-24 flex flex-col items-center gap-4">
          <span className="text-5xl">🔍</span>
          <p className="text-white/40 text-sm">No outfits match your filters.</p>
          <button
            onClick={handleClearAll}
            className="px-5 py-2 rounded-full border border-white/15 text-sm text-white/60 hover:border-white/30 transition-colors"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div key={filterKey} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-grid-fade-in">
          {filtered.map(outfit => (
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
      )}
    </div>
  )
}
