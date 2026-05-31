import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function fetchUnsplashImage(query) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=portrait`
  const res = await fetch(url, {
    headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` },
  })
  if (!res.ok) {
    console.error(`  Unsplash error ${res.status} for query: ${query}`)
    return null
  }
  const data = await res.json()
  return data.results?.[0]?.urls?.regular ?? null
}

async function main() {
  const { data: outfits, error } = await supabase
    .from('outfit')
    .select('*, brand(name)')

  if (error) {
    console.error('Failed to fetch outfits:', error.message)
    process.exit(1)
  }

  // Only process outfits that have no image yet
  const missing = outfits.filter(o => !o.image_url)
  console.log(`Found ${outfits.length} outfits, ${missing.length} without images\n`)

  for (const outfit of missing) {
    const brandName = outfit.brand?.name ?? ''

    // Try progressively broader queries until we get a result
    const queries = [
      `${outfit.name} ${brandName} fashion editorial`,
      `${brandName} fashion editorial lookbook`,
      `avant-garde fashion editorial dark`,
    ]

    let imageUrl = null
    for (const query of queries) {
      imageUrl = await fetchUnsplashImage(query)
      await sleep(300)
      if (imageUrl) break
    }

    if (!imageUrl) {
      console.log(`✗ ${outfit.name} → no image found after fallback`)
    } else {
      const { error: updateError } = await supabase
        .from('outfit')
        .update({ image_url: imageUrl })
        .eq('id', outfit.id)

      if (updateError) {
        console.log(`✗ ${outfit.name} → update failed: ${updateError.message}`)
      } else {
        console.log(`✓ ${outfit.name} → ${imageUrl}`)
      }
    }
  }

  console.log('\nDone.')
}

main()
