import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Map outfit name → items to insert
const ITEMS_BY_OUTFIT = {
  'Bauhaus Drkshdw': [
    { name: 'DRKSHDW Mega T-Shirt', category: 'Top',      price: 280.00, sizes: 'XS,S,M,L,XL' },
    { name: 'Pod Shorts',           category: 'Bottom',   price: 340.00, sizes: 'XS,S,M,L,XL' },
    { name: 'Geobasket Sneakers',   category: 'Footwear', price: 750.00, sizes: '38,39,40,41,42,43,44,45' },
  ],
  'Owens Eternal': [
    { name: 'Leather Biker Jacket', category: 'Outerwear', price: 2800.00, sizes: 'XS,S,M,L,XL' },
    { name: 'Tecuatl Cargo Pods',   category: 'Bottom',    price: 980.00,  sizes: 'XS,S,M,L,XL' },
    { name: 'Ramones Low Sneakers', category: 'Footwear',  price: 620.00,  sizes: '38,39,40,41,42,43,44,45' },
  ],
  'Tabi Classic': [
    { name: 'Tabi Split-Toe Boots', category: 'Footwear',  price: 1200.00, sizes: '36,37,38,39,40,41,42,43' },
    { name: 'Deconstructed Blazer', category: 'Outerwear', price: 1800.00, sizes: 'XS,S,M,L,XL' },
    { name: 'Straight Trousers',    category: 'Bottom',    price: 680.00,  sizes: 'XS,S,M,L,XL' },
  ],
  'Triple S Stack': [
    { name: 'Triple S Sneakers', category: 'Footwear', price: 950.00, sizes: '38,39,40,41,42,43,44,45' },
    { name: 'Oversized Hoodie',  category: 'Top',      price: 680.00, sizes: 'XS,S,M,L,XL' },
    { name: 'Track Pants',       category: 'Bottom',   price: 520.00, sizes: 'XS,S,M,L,XL' },
  ],
  'Replica Runner': [
    { name: 'Replica Sneakers', category: 'Footwear', price: 480.00, sizes: '38,39,40,41,42,43,44,45' },
    { name: 'Layered Hoodie',   category: 'Top',      price: 560.00, sizes: 'XS,S,M,L,XL' },
    { name: 'Destroyed Denim',  category: 'Bottom',   price: 420.00, sizes: '28,30,32,34,36' },
  ],
  'Hedi Era': [
    { name: 'Slim Black Denim',    category: 'Bottom',    price: 680.00,  sizes: '28,30,32,34,36' },
    { name: 'Leather Biker Jacket',category: 'Outerwear', price: 3200.00, sizes: 'XS,S,M,L,XL' },
    { name: 'Chelsea Boots',       category: 'Footwear',  price: 890.00,  sizes: '38,39,40,41,42,43,44,45' },
  ],
  'Pleats Please': [
    { name: 'Pleated Top',      category: 'Top',      price: 380.00, sizes: 'XS,S,M,L,XL' },
    { name: 'Pleated Trousers', category: 'Bottom',   price: 420.00, sizes: 'XS,S,M,L,XL' },
    { name: 'Flat Mules',       category: 'Footwear', price: 280.00, sizes: '36,37,38,39,40,41' },
  ],
}

async function main() {
  // Check table exists
  const { error: tableCheck } = await supabase
    .from('outfit_item')
    .select('id')
    .limit(1)

  if (tableCheck) {
    console.error('\n❌ outfit_item table not found:', tableCheck.message)
    console.error('\n👉 Run this SQL in Supabase Dashboard first:')
    console.error('   https://supabase.com/dashboard/project/qxhqoczzdnijlairmueq/editor\n')
    console.error('   See: scripts/outfit-items-migration.sql\n')
    process.exit(1)
  }

  // Fetch outfits we need
  const outfitNames = Object.keys(ITEMS_BY_OUTFIT)
  const { data: outfits, error: outfitsError } = await supabase
    .from('outfit')
    .select('id, name')
    .in('name', outfitNames)

  if (outfitsError) {
    console.error('Failed to fetch outfits:', outfitsError.message)
    process.exit(1)
  }

  const byName = Object.fromEntries(outfits.map(o => [o.name, o.id]))
  const missing = outfitNames.filter(n => !byName[n])
  if (missing.length) console.warn('⚠️  Outfits not found in DB:', missing.join(', '))

  let inserted = 0
  let skipped = 0

  for (const [outfitName, items] of Object.entries(ITEMS_BY_OUTFIT)) {
    const outfitId = byName[outfitName]
    if (!outfitId) { skipped += items.length; continue }

    // Check existing items for this outfit to avoid duplicates
    const { data: existing } = await supabase
      .from('outfit_item')
      .select('name')
      .eq('outfit_id', outfitId)

    const existingNames = new Set((existing ?? []).map(e => e.name))

    const toInsert = items
      .filter(item => !existingNames.has(item.name))
      .map(item => ({ ...item, outfit_id: outfitId }))

    if (toInsert.length === 0) {
      console.log(`  (skipped ${outfitName} — items already exist)`)
      skipped += items.length
      continue
    }

    const { error: insertError } = await supabase
      .from('outfit_item')
      .insert(toInsert)

    if (insertError) {
      console.error(`✗ ${outfitName}:`, insertError.message)
    } else {
      console.log(`✓ ${outfitName} → inserted ${toInsert.length} items`)
      inserted += toInsert.length
    }
  }

  console.log(`\nDone. Inserted: ${inserted}, Skipped: ${skipped}`)
}

main()
