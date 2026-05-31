'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import type { OutfitWithRelations } from '@/types/database'

export interface FilterState {
  search: string
  styles: string[]
  brands: string[]
  priceMax: number | null
}

export function useOutfitFilter(outfits: OutfitWithRelations[]) {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [styles, setStyles] = useState<string[]>([])
  const [brands, setBrands] = useState<string[]>([])
  const [priceMax, setPriceMax] = useState<number | null>(null)

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setDebouncedSearch(search), 300)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [search])

  const allStyles = useMemo(() => {
    const set = new Set<string>()
    outfits.forEach(o => { if (o.style) set.add(o.style) })
    return Array.from(set).sort()
  }, [outfits])

  const allBrands = useMemo(() => {
    const set = new Set<string>()
    outfits.forEach(o => { if (o.brand?.name) set.add(o.brand.name) })
    return Array.from(set).sort()
  }, [outfits])

  const filtered = useMemo(() => {
    let result = outfits
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase()
      result = result.filter(o =>
        o.name.toLowerCase().includes(q) ||
        (o.description?.toLowerCase().includes(q) ?? false) ||
        (o.brand?.name.toLowerCase().includes(q) ?? false) ||
        (o.style?.toLowerCase().includes(q) ?? false)
      )
    }
    if (styles.length > 0) {
      result = result.filter(o => o.style && styles.includes(o.style))
    }
    if (brands.length > 0) {
      result = result.filter(o => o.brand?.name && brands.includes(o.brand.name))
    }
    if (priceMax !== null) {
      result = result.filter(o => o.price_min <= priceMax)
    }
    return result
  }, [outfits, debouncedSearch, styles, brands, priceMax])

  const hasActiveFilters = debouncedSearch.trim() !== '' || styles.length > 0 || brands.length > 0 || priceMax !== null

  function toggleStyle(s: string) {
    setStyles(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])
  }

  function toggleBrand(b: string) {
    setBrands(prev => prev.includes(b) ? prev.filter(x => x !== b) : [...prev, b])
  }

  function clearAll() {
    setSearch('')
    setStyles([])
    setBrands([])
    setPriceMax(null)
  }

  return {
    search, setSearch,
    styles, toggleStyle,
    brands, toggleBrand,
    priceMax, setPriceMax,
    allStyles, allBrands,
    filtered,
    hasActiveFilters,
    clearAll,
  }
}
