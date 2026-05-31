import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const { data: outfits, error: outfitsError } = await supabase
  .from('outfit')
  .select('id, name')

if (outfitsError) {
  console.error('Failed to fetch outfits:', outfitsError.message)
  process.exit(1)
}

const items = [
  { outfit: 'Bauhaus Drkshdw', name: 'DRKSHDW Mega T-Shirt',   category: 'Top',       price: 280,  sizes: 'XS,S,M,L,XL' },
  { outfit: 'Bauhaus Drkshdw', name: 'Pod Shorts',              category: 'Bottom',    price: 340,  sizes: 'XS,S,M,L,XL' },
  { outfit: 'Bauhaus Drkshdw', name: 'Geobasket Sneakers',      category: 'Footwear',  price: 750,  sizes: '38,39,40,41,42,43,44,45' },
  { outfit: 'Owens Eternal',   name: 'Leather Biker Jacket',    category: 'Outerwear', price: 2800, sizes: 'XS,S,M,L,XL' },
  { outfit: 'Owens Eternal',   name: 'Tecuatl Cargo Pods',      category: 'Bottom',    price: 980,  sizes: 'XS,S,M,L,XL' },
  { outfit: 'Owens Eternal',   name: 'Ramones Low Sneakers',    category: 'Footwear',  price: 620,  sizes: '38,39,40,41,42,43,44,45' },
  { outfit: 'Tabi Classic',    name: 'Tabi Split-Toe Boots',    category: 'Footwear',  price: 1200, sizes: '36,37,38,39,40,41,42,43' },
  { outfit: 'Tabi Classic',    name: 'Deconstructed Blazer',    category: 'Outerwear', price: 1800, sizes: 'XS,S,M,L,XL' },
  { outfit: 'Tabi Classic',    name: 'Straight Trousers',       category: 'Bottom',    price: 680,  sizes: 'XS,S,M,L,XL' },
  { outfit: 'Triple S Stack',  name: 'Triple S Sneakers',       category: 'Footwear',  price: 950,  sizes: '38,39,40,41,42,43,44,45' },
  { outfit: 'Triple S Stack',  name: 'Oversized Hoodie',        category: 'Top',       price: 680,  sizes: 'XS,S,M,L,XL' },
  { outfit: 'Triple S Stack',  name: 'Track Pants',             category: 'Bottom',    price: 520,  sizes: 'XS,S,M,L,XL' },
  { outfit: 'Replica Runner',  name: 'Replica Sneakers',        category: 'Footwear',  price: 480,  sizes: '38,39,40,41,42,43,44,45' },
  { outfit: 'Replica Runner',  name: 'Layered Hoodie',          category: 'Top',       price: 560,  sizes: 'XS,S,M,L,XL' },
  { outfit: 'Replica Runner',  name: 'Destroyed Denim',         category: 'Bottom',    price: 420,  sizes: '28,30,32,34,36' },
  { outfit: 'Hedi Era',        name: 'Slim Black Denim',        category: 'Bottom',    price: 680,  sizes: '28,30,32,34,36' },
  { outfit: 'Hedi Era',        name: 'Leather Biker Jacket',    category: 'Outerwear', price: 3200, sizes: 'XS,S,M,L,XL' },
  { outfit: 'Hedi Era',        name: 'Chelsea Boots',           category: 'Footwear',  price: 890,  sizes: '38,39,40,41,42,43,44,45' },
  { outfit: 'Pleats Please',   name: 'Pleated Top',             category: 'Top',       price: 380,  sizes: 'XS,S,M,L,XL' },
  { outfit: 'Pleats Please',   name: 'Pleated Trousers',        category: 'Bottom',    price: 420,  sizes: 'XS,S,M,L,XL' },
  { outfit: 'Pleats Please',   name: 'Flat Mules',              category: 'Footwear',  price: 280,  sizes: '36,37,38,39,40,41,42' },
  { outfit: 'Poet of Black',   name: 'Oversized Black Coat',    category: 'Outerwear', price: 3200, sizes: 'XS,S,M,L,XL' },
  { outfit: 'Poet of Black',   name: 'Wide Trousers',           category: 'Bottom',    price: 980,  sizes: 'XS,S,M,L,XL' },
  { outfit: 'Poet of Black',   name: 'Crepe Shirt',             category: 'Top',       price: 680,  sizes: 'XS,S,M,L,XL' },
  { outfit: 'Knife Edge',      name: 'Technical Coat',          category: 'Outerwear', price: 3800, sizes: 'XS,S,M,L,XL' },
  { outfit: 'Knife Edge',      name: 'Slim Trousers',           category: 'Bottom',    price: 890,  sizes: 'XS,S,M,L,XL' },
  { outfit: 'Knife Edge',      name: 'Knife Boots',             category: 'Footwear',  price: 1200, sizes: '36,37,38,39,40,41,42,43,44,45' },
]

for (const item of items) {
  const outfit = outfits.find(o => o.name === item.outfit)
  if (!outfit) {
    console.log('  not found:', item.outfit)
    continue
  }

  const { error } = await supabase
    .from('outfit_item')
    .upsert(
      { outfit_id: outfit.id, name: item.name, category: item.category, price: item.price, sizes: item.sizes },
      { onConflict: 'outfit_id,name', ignoreDuplicates: true }
    )

  if (error) console.error('✗', item.name, '—', error.message)
  else console.log('✓', item.name)
}

console.log('\nDone.')
