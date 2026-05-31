import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import type { OutfitWithRelations } from '@/types/database'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export interface RecommendationItem extends OutfitWithRelations {
  reason: string
}

// Trending fallback: most-liked outfits globally
async function getTrending(excludeIds: string[] = []): Promise<RecommendationItem[]> {
  const { data: swipes } = await supabase
    .from('swipe_history')
    .select('outfit_id')
    .eq('is_liked', true)

  const counts: Record<string, number> = {}
  swipes?.forEach(s => { counts[String(s.outfit_id)] = (counts[String(s.outfit_id)] ?? 0) + 1 })

  const topIds = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .filter(([id]) => !excludeIds.includes(id))
    .slice(0, 6)
    .map(([id]) => id)

  const query = supabase
    .from('outfit')
    .select('*, brand(name, country), category(name)')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(6)

  const { data } = topIds.length > 0
    ? await supabase.from('outfit').select('*, brand(name, country), category(name)').in('id', topIds).eq('is_active', true)
    : await query

  return ((data as OutfitWithRelations[]) ?? []).map(o => ({ ...o, reason: 'Trending this week' }))
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    const recs = await getTrending()
    return NextResponse.json({ recommendations: recs, basedOn: null })
  }

  // Get user's liked outfit IDs (most recent first for basedOn label)
  const { data: likedSwipes } = await supabase
    .from('swipe_history')
    .select('outfit_id')
    .eq('user_id', userId)
    .eq('is_liked', true)
    .order('swiped_at', { ascending: false })

  const likedIds = (likedSwipes?.map(s => String(s.outfit_id)) ?? [])

  if (likedIds.length === 0) {
    const recs = await getTrending()
    return NextResponse.json({ recommendations: recs, basedOn: null })
  }

  // All seen outfit IDs (liked + disliked)
  const { data: seenSwipes } = await supabase
    .from('swipe_history')
    .select('outfit_id')
    .eq('user_id', userId)

  const seenIds = seenSwipes?.map(s => String(s.outfit_id)) ?? []

  // Liked outfit details for style/brand matching + basedOn name
  const { data: likedDetails } = await supabase
    .from('outfit')
    .select('id, name, style, brand_id, brand(name)')
    .in('id', likedIds)

  const basedOn: string = (likedDetails?.[0] as any)?.name ?? null
  const likedStyles = [...new Set(likedDetails?.map(o => o.style).filter(Boolean) ?? [])] as string[]
  const likedBrandIds = [...new Set(likedDetails?.map(o => o.brand_id) ?? [])] as string[]
  const brandNameById: Record<string, string> = {}
  likedDetails?.forEach(o => {
    if (o.brand_id) brandNameById[o.brand_id] = (o.brand as any)?.name ?? ''
  })

  // ── Tag-based matching (if outfit_tag table has data) ──────────────────────
  let candidates: OutfitWithRelations[] = []

  const { data: tagRows } = await supabase
    .from('outfit_tag')
    .select('tag_id')
    .in('outfit_id', likedIds)

  const tagIds = [...new Set(tagRows?.map(t => t.tag_id) ?? [])]

  if (tagIds.length > 0) {
    const tagMatchQuery = supabase
      .from('outfit_tag')
      .select('outfit_id')
      .in('tag_id', tagIds)

    const { data: tagMatches } = seenIds.length > 0
      ? await tagMatchQuery.not('outfit_id', 'in', `(${seenIds.join(',')})`)
      : await tagMatchQuery

    const matchCounts: Record<string, number> = {}
    tagMatches?.forEach(t => {
      const oid = String(t.outfit_id)
      if (!likedIds.includes(oid)) {
        matchCounts[oid] = (matchCounts[oid] ?? 0) + 1
      }
    })

    const topTagOutfitIds = Object.entries(matchCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([id]) => id)

    if (topTagOutfitIds.length > 0) {
      const { data } = await supabase
        .from('outfit')
        .select('*, brand(name, country), category(name)')
        .in('id', topTagOutfitIds)
        .eq('is_active', true)
      candidates = (data as OutfitWithRelations[]) ?? []
    }
  }

  // ── Style / brand fallback ─────────────────────────────────────────────────
  if (candidates.length === 0 && (likedStyles.length > 0 || likedBrandIds.length > 0)) {
    const orParts: string[] = [
      ...likedStyles.map(s => `style.eq.${s}`),
      ...likedBrandIds.map(b => `brand_id.eq.${b}`),
    ]

    let q = supabase
      .from('outfit')
      .select('*, brand(name, country), category(name)')
      .eq('is_active', true)
      .or(orParts.join(','))
      .limit(6)

    if (seenIds.length > 0) {
      q = q.not('id', 'in', `(${seenIds.join(',')})`)
    }

    const { data } = await q
    candidates = (data as OutfitWithRelations[]) ?? []
  }

  // ── Trending fallback ──────────────────────────────────────────────────────
  if (candidates.length === 0) {
    const recs = await getTrending(seenIds)
    return NextResponse.json({ recommendations: recs, basedOn })
  }

  // Attach reason to each candidate
  const recommendations: RecommendationItem[] = candidates.map(outfit => {
    let reason = 'Trending this week'
    const brandId = outfit.brand_id
    const brandName = (outfit.brand as any)?.name ?? ''

    if (brandId && likedBrandIds.includes(brandId) && brandName) {
      reason = `Also by ${brandName}`
    } else if (outfit.style && likedStyles.includes(outfit.style)) {
      reason = `Same style: ${outfit.style}`
    }
    return { ...outfit, reason }
  })

  return NextResponse.json({ recommendations, basedOn })
}
