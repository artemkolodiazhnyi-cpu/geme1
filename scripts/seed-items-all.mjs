import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const { data: outfits } = await supabase
  .from('outfit')
  .select('id, name')
  .eq('is_active', true)

const byName = Object.fromEntries(outfits.map(o => [o.name, o.id]))

const items = [
  // Rei's Lumps — CDG
  { outfit: "Rei's Lumps",       name: 'Padded Distortion Jacket',   category: 'Outerwear', price: 3800, sizes: 'XS,S,M,L,XL' },
  { outfit: "Rei's Lumps",       name: 'Wide Structured Trousers',   category: 'Bottom',    price: 1600, sizes: 'XS,S,M,L,XL' },
  { outfit: "Rei's Lumps",       name: 'CDG Salomon Collab',         category: 'Footwear',  price: 580,  sizes: '38,39,40,41,42,43,44,45' },
  // Speed Destroyed — Balenciaga
  { outfit: 'Speed Destroyed',   name: 'Hourglass Jacket',           category: 'Outerwear', price: 4200, sizes: 'XS,S,M,L,XL' },
  { outfit: 'Speed Destroyed',   name: 'Stretch Track Trousers',     category: 'Bottom',    price: 1200, sizes: 'XS,S,M,L,XL' },
  { outfit: 'Speed Destroyed',   name: 'Speed Trainer Sneakers',     category: 'Footwear',  price: 750,  sizes: '38,39,40,41,42,43,44,45' },
  // Future Décortiqué — Margiela
  { outfit: 'Future Décortiqué', name: 'Decortiqué Blazer',          category: 'Outerwear', price: 2800, sizes: 'XS,S,M,L,XL' },
  { outfit: 'Future Décortiqué', name: 'Raw-Hem Jeans',              category: 'Bottom',    price: 680,  sizes: '28,30,32,34,36' },
  { outfit: 'Future Décortiqué', name: 'Tabi Derby Shoes',           category: 'Footwear',  price: 980,  sizes: '36,37,38,39,40,41,42,43' },
  // Pillar of Light — Rick Owens
  { outfit: 'Pillar of Light',   name: 'Coat of Arms Overcoat',      category: 'Outerwear', price: 3600, sizes: 'XS,S,M,L,XL' },
  { outfit: 'Pillar of Light',   name: 'Cargo Belas Trousers',       category: 'Bottom',    price: 1100, sizes: 'XS,S,M,L,XL' },
  { outfit: 'Pillar of Light',   name: 'Megalace Boots',             category: 'Footwear',  price: 1400, sizes: '38,39,40,41,42,43,44,45' },
  // Post-Apocalypse — Julius
  { outfit: 'Post-Apocalypse',   name: 'Bonded Biker Jacket',        category: 'Outerwear', price: 2600, sizes: 'XS,S,M,L,XL' },
  { outfit: 'Post-Apocalypse',   name: 'Distressed Cargo Trousers',  category: 'Bottom',    price: 980,  sizes: 'XS,S,M,L,XL' },
  { outfit: 'Post-Apocalypse',   name: 'Lace-Up Destroy Boots',      category: 'Footwear',  price: 820,  sizes: '38,39,40,41,42,43,44,45' },
  // Ann's Melancholy — Ann Demeulemeester
  { outfit: "Ann's Melancholy",  name: 'Draped Linen Shirt',         category: 'Top',       price: 680,  sizes: 'XS,S,M,L,XL' },
  { outfit: "Ann's Melancholy",  name: 'Wide Black Trousers',        category: 'Bottom',    price: 780,  sizes: 'XS,S,M,L,XL' },
  { outfit: "Ann's Melancholy",  name: 'Lace-Up Leather Boots',      category: 'Footwear',  price: 980,  sizes: '36,37,38,39,40,41,42,43' },
  // Noir Kei Ninomiya — CDG
  { outfit: 'Noir Kei Ninomiya', name: 'Mesh Architectural Knit',    category: 'Top',       price: 1800, sizes: 'XS,S,M,L,XL' },
  { outfit: 'Noir Kei Ninomiya', name: 'Black Structured Trousers',  category: 'Bottom',    price: 980,  sizes: 'XS,S,M,L,XL' },
  { outfit: 'Noir Kei Ninomiya', name: 'Salomon XT-6 CDG',          category: 'Footwear',  price: 620,  sizes: '38,39,40,41,42,43,44,45' },
  // Lang Archive — Helmut Lang
  { outfit: 'Lang Archive',      name: 'Bondage Strap Jacket',       category: 'Outerwear', price: 1200, sizes: 'XS,S,M,L,XL' },
  { outfit: 'Lang Archive',      name: 'Slim Tailored Trousers',     category: 'Bottom',    price: 480,  sizes: 'XS,S,M,L,XL' },
  { outfit: 'Lang Archive',      name: 'Industrial Boots',           category: 'Footwear',  price: 520,  sizes: '38,39,40,41,42,43,44,45' },
  // Number 0 Coat — Maison Margiela
  { outfit: 'Number 0 Coat',     name: 'Artisanal Overcoat',         category: 'Outerwear', price: 5200, sizes: 'XS,S,M,L,XL' },
  { outfit: 'Number 0 Coat',     name: 'Deconstructed Trousers',     category: 'Bottom',    price: 1100, sizes: 'XS,S,M,L,XL' },
  { outfit: 'Number 0 Coat',     name: 'Future Ankle Boot',          category: 'Footwear',  price: 1380, sizes: '36,37,38,39,40,41,42,43' },
  // Raf Sterling Ruby — Raf Simons
  { outfit: 'Raf Sterling Ruby', name: 'Oversized Parka with Patches',category: 'Outerwear',price: 2200, sizes: 'XS,S,M,L,XL' },
  { outfit: 'Raf Sterling Ruby', name: 'Slim Jeans',                 category: 'Bottom',    price: 480,  sizes: '28,30,32,34,36' },
  { outfit: 'Raf Sterling Ruby', name: 'Adidas Raf Simons Sneakers', category: 'Footwear',  price: 580,  sizes: '38,39,40,41,42,43,44,45' },
  // Chaos Balance — Undercover
  { outfit: 'Chaos Balance',     name: 'Chaos Print Bomber',         category: 'Outerwear', price: 1600, sizes: 'XS,S,M,L,XL' },
  { outfit: 'Chaos Balance',     name: 'Graphic Tee',                category: 'Top',       price: 380,  sizes: 'XS,S,M,L,XL' },
  { outfit: 'Chaos Balance',     name: 'Wide Cargo Trousers',        category: 'Bottom',    price: 780,  sizes: 'XS,S,M,L,XL' },
  // Creatch Silhouette — Rick Owens
  { outfit: 'Creatch Silhouette',name: 'Creatch Jacket',             category: 'Outerwear', price: 3200, sizes: 'XS,S,M,L,XL' },
  { outfit: 'Creatch Silhouette',name: 'Astaire Cropped Trousers',   category: 'Bottom',    price: 980,  sizes: 'XS,S,M,L,XL' },
  { outfit: 'Creatch Silhouette',name: 'Stivali Boots',              category: 'Footwear',  price: 1600, sizes: '38,39,40,41,42,43,44,45' },
  // Romantic Void — Ann Demeulemeester
  { outfit: 'Romantic Void',     name: 'Raw-Edge Overcoat',          category: 'Outerwear', price: 2400, sizes: 'XS,S,M,L,XL' },
  { outfit: 'Romantic Void',     name: 'Poet Shirt',                 category: 'Top',       price: 680,  sizes: 'XS,S,M,L,XL' },
  { outfit: 'Romantic Void',     name: 'Heeled Ankle Boots',         category: 'Footwear',  price: 1100, sizes: '36,37,38,39,40,41,42,43' },
  // Yohji Volume — Yohji Yamamoto
  { outfit: 'Yohji Volume',      name: 'Voluminous Wool Coat',       category: 'Outerwear', price: 3400, sizes: 'XS,S,M,L,XL' },
  { outfit: 'Yohji Volume',      name: 'Wide Pleated Trousers',      category: 'Bottom',    price: 980,  sizes: 'XS,S,M,L,XL' },
  { outfit: 'Yohji Volume',      name: 'Lace Platform Boots',        category: 'Footwear',  price: 1200, sizes: '36,37,38,39,40,41,42,43' },
  // Undercoverism AW — Undercover
  { outfit: 'Undercoverism AW',  name: 'Archive Print Hoodie',       category: 'Top',       price: 820,  sizes: 'XS,S,M,L,XL' },
  { outfit: 'Undercoverism AW',  name: 'Deconstructed Trousers',     category: 'Bottom',    price: 680,  sizes: 'XS,S,M,L,XL' },
  { outfit: 'Undercoverism AW',  name: 'Platform Combat Boots',      category: 'Footwear',  price: 780,  sizes: '38,39,40,41,42,43,44,45' },
  // Antwerp Youth — Raf Simons
  { outfit: 'Antwerp Youth',     name: 'Archive Bomber Jacket',      category: 'Outerwear', price: 1800, sizes: 'XS,S,M,L,XL' },
  { outfit: 'Antwerp Youth',     name: 'Slim Tailored Trousers',     category: 'Bottom',    price: 580,  sizes: 'XS,S,M,L,XL' },
  { outfit: 'Antwerp Youth',     name: 'Raf x Adidas Detroit Runner',category: 'Footwear',  price: 480,  sizes: '38,39,40,41,42,43,44,45' },
  // Latex Minimal — Helmut Lang
  { outfit: 'Latex Minimal',     name: 'Minimal Cotton Shirt',       category: 'Top',       price: 380,  sizes: 'XS,S,M,L,XL' },
  { outfit: 'Latex Minimal',     name: 'Tailored Trousers',          category: 'Bottom',    price: 420,  sizes: 'XS,S,M,L,XL' },
  { outfit: 'Latex Minimal',     name: 'Classic Derby Shoes',        category: 'Footwear',  price: 380,  sizes: '38,39,40,41,42,43,44,45' },
  // Play Classic — CDG Play
  { outfit: 'Play Classic',      name: 'CDG Play Heart Tee',         category: 'Top',       price: 180,  sizes: 'XS,S,M,L,XL' },
  { outfit: 'Play Classic',      name: 'Slim Black Trousers',        category: 'Bottom',    price: 320,  sizes: 'XS,S,M,L,XL' },
  { outfit: 'Play Classic',      name: 'Converse CDG Chuck Taylor',  category: 'Footwear',  price: 150,  sizes: '38,39,40,41,42,43,44,45' },
  // Y-3 Field — Y-3
  { outfit: 'Y-3 Field',         name: 'Y-3 Field Jacket',           category: 'Outerwear', price: 980,  sizes: 'XS,S,M,L,XL' },
  { outfit: 'Y-3 Field',         name: 'Y-3 Knit Shorts',            category: 'Bottom',    price: 380,  sizes: 'XS,S,M,L,XL' },
  { outfit: 'Y-3 Field',         name: 'Y-3 Qasa High',              category: 'Footwear',  price: 420,  sizes: '38,39,40,41,42,43,44,45' },
  // Rivington Rocker — Saint Laurent
  { outfit: 'Rivington Rocker',  name: 'Leather Moto Jacket',        category: 'Outerwear', price: 4800, sizes: 'XS,S,M,L,XL' },
  { outfit: 'Rivington Rocker',  name: 'Skinny Rock Jeans',          category: 'Bottom',    price: 680,  sizes: '28,30,32,34,36' },
  { outfit: 'Rivington Rocker',  name: 'Wyatt Ankle Boot',           category: 'Footwear',  price: 1100, sizes: '38,39,40,41,42,43,44,45' },
  // Jun's Scab — Undercover
  { outfit: "Jun's Scab",        name: 'Scab Print Jacket',          category: 'Outerwear', price: 2200, sizes: 'XS,S,M,L,XL' },
  { outfit: "Jun's Scab",        name: 'Distressed Denim',           category: 'Bottom',    price: 580,  sizes: '28,30,32,34,36' },
  { outfit: "Jun's Scab",        name: 'Undercover Leather Sneakers',category: 'Footwear',  price: 680,  sizes: '38,39,40,41,42,43,44,45' },
]

// Get outfit IDs that already have items — skip them
const { data: existing } = await supabase.from('outfit_item').select('outfit_id')
const alreadySeeded = new Set(existing?.map(r => r.outfit_id) ?? [])

let inserted = 0
let skipped = 0

// Group items by outfit, insert in batches
const grouped = {}
for (const item of items) {
  const outfitId = byName[item.outfit]
  if (!outfitId) { console.log('  outfit not found in DB:', item.outfit); continue }
  if (alreadySeeded.has(outfitId)) { skipped++; continue }
  ;(grouped[outfitId] ??= []).push({
    outfit_id: outfitId,
    name: item.name,
    category: item.category,
    price: item.price,
    sizes: item.sizes,
  })
}

for (const [outfitId, rows] of Object.entries(grouped)) {
  const outfitName = outfits.find(o => o.id === Number(outfitId))?.name ?? outfitId
  const { error } = await supabase.from('outfit_item').insert(rows)
  if (error) {
    console.error('✗', outfitName, '—', error.message)
  } else {
    console.log(`✓ ${outfitName} (${rows.length} items)`)
    inserted += rows.length
  }
}

if (skipped) console.log(`\n(skipped ${skipped} items — outfits already had items)`)

// Final count
const { data: total } = await supabase.from('outfit_item').select('id')
console.log(`\nDone. Inserted ${inserted} new items. Total outfit_item rows: ${total?.length}`)
