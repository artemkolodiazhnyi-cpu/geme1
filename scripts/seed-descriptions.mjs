import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const env = Object.fromEntries(
  readFileSync('.env.local', 'utf8').split('\n')
    .filter(l => l.includes('='))
    .map(l => [l.split('=')[0], l.slice(l.indexOf('=') + 1).trim()])
)

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)

// Check if column exists
const { error: checkError } = await supabase.from('outfit_item').select('description').limit(1)
if (checkError && checkError.message.includes('does not exist')) {
  console.error('Column "description" does not exist.')
  console.error('Run this in Supabase Dashboard SQL Editor:')
  console.error('  alter table outfit_item add column if not exists description text;')
  console.error('Then re-run this script.')
  process.exit(1)
}

const descriptions = {
  'Geobasket Sneakers': 'The iconic Rick Owens basketball sneaker with exaggerated platform sole. Hand-stitched leather upper, asymmetric lacing, signature elongated toe. A design icon since 2014.',
  'Geobasket Pearl': 'Geobasket in off-white pearl leather. The rarest colorway — clean, sculptural, impossible to ignore. Platform sole adds 5cm height.',
  'Geobasket Black': 'Geobasket in full black leather. The most versatile colorway — pairs with any dark look. Platform sole, hand-stitched, made in Italy.',
  'Geobasket Milk': 'Geobasket in milk white with contrasting black sole. The definitive light colorway of the most iconic dark luxury sneaker.',
  'DRKSHDW Mega T-Shirt': 'Oversized cotton jersey tee with dropped shoulders and raw-edge hem. The foundation of any DRKSHDW look — wear alone or layered under an open shirt.',
  'Pod Shorts': 'Rick Owens signature pod silhouette in heavy cotton. Balloon shape, elasticated waist, falls below the knee. Pairs with everything in the dark wardrobe.',
  'Leather Biker Jacket': 'Rick Owens asymmetric zip biker in lamb leather. Buttery soft, structured shoulders, signature dark hardware. The jacket that started a thousand imitations.',
  'Tecuatl Cargo Pods': 'Named after the Aztec god of war — cargo trousers with exaggerated pod pockets and dropped crotch. Heavy cotton, elasticated waist, Rick Owens at his most architectural.',
  'Ramones Low Sneakers': 'Rick Owens punk-influenced low sneaker. Named after the band. Crepe sole, leather upper, minimal branding. The entry point to the Rick footwear universe.',
  'White Draped Tunic': 'Rick Owens white draped tunic — rare and pure. The dark lord in white. Oversized, draped, floor-length. Architectural simplicity.',
  'White Pod Trousers': 'Rick Owens white pod trousers. The pod silhouette in white — maximum visual impact, zero compromise.',
  'White Geobasket Sneakers': 'Geobasket in full white leather. The holy grail colorway. Almost impossible to keep clean — that is part of the appeal.',
  'Elongated Dropped Shoulder Coat': 'Rick Owens Creatch silhouette coat — dropped shoulders create an inhuman width, length hits mid-calf. The most architectural coat in dark luxury.',
  'Creatch Trousers': 'Rick Owens Creatch trousers with extreme dropped crotch and tapered leg. Named after the creature-like silhouette they create.',
  'Dunks Collab Sneakers': 'Rick Owens x Nike Dunk collab — classic basketball silhouette filtered through the Rick Owens lens. Dark colorways, premium leather, instant classic.',
  'Tabi Split-Toe Boots': 'Maison Margiela most iconic piece — the split-toe boot inspired by Japanese tabi socks. Leather upper, block heel, invisible back zip. Been in continuous production since 1988.',
  'Deconstructed Blazer': 'Margiela blazer with exposed lining, raw edges and visible construction. Anti-fashion at its finest — a blazer that shows you exactly how it was made.',
  'Straight Trousers': 'Margiela clean-cut straight leg trousers. No branding, no excess. Worn with the Tabi boot they create the definitive Margiela silhouette.',
  'MM6 Replica Sneakers': 'Maison Margiela Replica — exact recreation of a 1970s German Army trainer. Canvas upper, gum sole, vintage feel. The most wearable Margiela shoe.',
  'Layered Hoodie': 'MM6 deconstructed hoodie with asymmetric hem and raw edges. Looks like two hoodies — is actually one. That is the Margiela way.',
  'Destroyed Denim': 'Margiela selvedge denim with deliberate distressing and fading. Each pair unique. Worn slim, cuffed above the Replica sneaker.',
  'Raw-Edge Overcoat': 'Margiela Number 0 overcoat — raw edges, exposed seams, stitched number label on the back. The Margiela manifesto in coat form.',
  'Grey Tailored Trousers': 'Margiela grey tailored trousers. No label visible. Just perfect tailoring — the anonymous luxury.',
  'Tabi Low Boots': 'Margiela Tabi in low boot form. The split toe in its most wearable format — easier to style than the heel but just as iconic.',
  'MM6 Future Zip Hoodie': 'MM6 Maison Margiela future zip hoodie with off-center zip and structured shoulders. Deconstructed sportswear from the Margiela diffusion line.',
  'Cargo Trousers External Pockets': 'MM6 cargo trousers with external pocket construction. The pockets sit on the outside — Margiela showing you exactly how clothes are made.',
  'Japanese Collab Sneakers': 'MM6 x Japanese brand collab sneaker. Limited run, clean design, collector piece.',
  'Triple S Sneakers': 'Balenciaga Triple S — three soles stacked for maximum height and maximum statement. Dad shoe taken to its logical extreme. Still the most recognisable chunky sneaker ever made.',
  'Oversized Hoodie': 'Balenciaga political hoodie in heavyweight fleece. Fits three sizes up by design. Pull the sleeves down, let it drop — that is the Demna silhouette.',
  'Track Pants': 'Balenciaga technical track pants with side stripe and tapered leg. Pairs with Triple S for the complete luxury athleisure look.',
  'Knife Boots': 'Balenciaga Knife boots with extreme pointed toe — so sharp they look dangerous. Cuban heel, leather upper, the most dramatic boot in luxury fashion.',
  'Technical Coat': 'Balenciaga technical coat in structured fabric. Demna architecture — sharp shoulders, precise cut, impossible volume.',
  'Slim Trousers': 'Balenciaga slim trousers in technical fabric. Clean line from waist to ankle. Worn with Knife boots for the complete Demna look.',
  'Speed Sock Boot Sneaker': 'Balenciaga Speed — the sock sneaker that changed footwear. No laces, no tongue, just a sock with a sole. Instant icon from 2017.',
  'Destroyed Balenciaga Hoodie': 'Balenciaga destroyed hoodie — intentional distressing, political commentary, luxury decay. Demna making a point about fast fashion by destroying slow fashion.',
  'Ripped Jeans': 'Balenciaga ripped jeans — extreme distressing, luxury denim. Costs more destroyed than most jeans cost intact. That is the point.',
  'Slim Black Denim': 'Saint Laurent skinny jeans in raw black denim. The Hedi Slimane cut — impossibly slim, sits low on the hip. Rock and roll in denim form.',
  'Chelsea Boots': 'Saint Laurent Cuban heel chelsea boot in black leather. The essential rock shoe — worn by everyone from the Rolling Stones to Hedi models.',
  'Destroyed Skinny Jeans': 'Saint Laurent destroyed skinny jeans — Hedi Slimane vision of rock and roll. Extremely slim, extremely destroyed, extremely Saint Laurent.',
  'Band Tee': 'Saint Laurent band tee in vintage wash cotton. Worn slim, tucked into the skinny jeans. Rock and roll luxury at its most distilled.',
  'Saint Laurent Ankle Boots': 'Saint Laurent ankle boots with Cuban heel and pointed toe. The rock boot — worn by every SLP devotee since the Hedi era.',
  'Oversized Black Coat': 'Yohji Yamamoto oversized wool coat with dropped shoulders and floor-grazing length. Wabi-sabi in coat form — imperfect, poetic, entirely black.',
  'Wide Trousers': 'Yohji Yamamoto wide-leg trousers in heavy crepe. The volume balances the oversized coat above. Worn with flat shoes for maximum architectural effect.',
  'Crepe Shirt': 'Yohji Yamamoto asymmetric crepe shirt with one longer panel. Worn untucked, partially tucked, or tied at the waist. No wrong way.',
  'Kimono Jacket': 'Yohji Yamamoto kimono-influenced jacket in heavy black wool. East meets West in the most poetic way — structured shoulders, flowing body.',
  'Asymmetric Shirt': 'Yohji Yamamoto asymmetric shirt with one longer panel and off-center placket. Poetry in cotton.',
  'Y-3 Technical Jacket': 'Y-3 (Yohji Yamamoto x Adidas) technical jacket. Where Japanese fashion philosophy meets German sportswear engineering. The best of both worlds.',
  'Y-3 Cargo Trousers': 'Y-3 cargo trousers with Adidas stripe and Yohji volume. Sport and poetry in one trouser.',
  'Y-3 Qasa Sneakers': 'Y-3 Qasa high — the sock-like sneaker that launched a thousand imitations. Elasticated ankle, minimal branding, Japanese precision.',
  'Padded Distortion Jacket': 'Comme des Garcons Homme Plus jacket with padded inserts that distort the body shape. Rei Kawakubo war on conventional beauty — lumps and bumps as design.',
  'Wide Structured Trousers': 'CDG structured wide trousers that hold their shape without a body inside. Architecture you wear.',
  'CDG Salomon Collab': 'Comme des Garcons x Salomon XT-6. Trail running shoe meets Tokyo conceptualism. One of the best collab sneakers ever made.',
  'CDG Play Heart Tee': 'The most recognisable Comme des Garcons piece — white tee with Filip Pagowski hand-drawn heart. Simple, iconic, endlessly wearable.',
  'Slim Black Trousers': 'CDG Play slim trousers in black cotton. The foundation for the heart tee. Clean, minimal, Japanese.',
  'Converse CDG Chuck Taylor': 'Comme des Garcons x Converse Chuck Taylor with the Play heart on the ankle. The most accessible CDG piece and the most worn.',
  'Mesh Architectural Knit': 'Noir Kei Ninomiya mesh knit with architectural structure — 3D construction that holds its form off the body. Dark tech meets Japanese craft.',
  'Black Structured Trousers': 'Noir Kei Ninomiya structured trousers in heavy black fabric. The structure is internal — no visible boning, just perfect engineering.',
  'Salomon XT-6 CDG': 'Comme des Garcons x Salomon XT-6 trail runner. The best trail shoe meets the most conceptual fashion house. Instant classic.',
  'Draped Linen Shirt': 'Ann Demeulemeester draped linen shirt with asymmetric hem. Belgian romanticism in fabric form — looks effortless, takes years to design.',
  'Lace-Up Leather Boots': 'Ann Demeulemeester lace-up boots with stacked heel. The definitive Belgian boot — worn by artists, musicians, and anyone who understands dark romanticism.',
  'Heeled Ankle Boots': 'Ann Demeulemeester heeled ankle boots with pointed toe and Cuban heel. The essential dark romantic shoe.',
  'Poet Shirt': 'Ann Demeulemeester romantic poet shirt in white cotton with lace details. Dark romanticism meets 18th century — worn with black everything.',
  'Bondage Strap Jacket': 'Helmut Lang archive reissue jacket with bondage straps across the torso. New York 1998 — industrial minimalism at its peak.',
  'Slim Tailored Trousers': 'Helmut Lang slim tailored trousers. Clean, precise, minimal. The antidote to excess — just good tailoring.',
  'Industrial Boots': 'Helmut Lang industrial lace-up boots with thick rubber sole. Utilitarian but luxurious — the Lang paradox in shoe form.',
  'Minimal Cotton Shirt': 'Helmut Lang minimal cotton shirt with precise cut and no excess. Just a perfect shirt. That is the Lang way.',
  'Tailored Trousers': 'Helmut Lang tailored trousers in grey wool. Quiet luxury before quiet luxury was a trend.',
  'Classic Derby Shoes': 'Clean leather derby shoes. Minimal, precise, Helmut Lang.',
  'Oversized Parka with Patches': 'Raf Simons archive parka covered in embroidered patches referencing youth culture, music, and Belgian art. Every patch tells a story.',
  'Slim Jeans': 'Raf Simons slim jeans in raw selvedge denim. Belgian youth culture in denim form — worn with the parka for the full Antwerp look.',
  'Adidas Raf Simons Sneakers': 'Raf Simons x Adidas — the collab that changed sneaker culture. Oversized tongue, archive colorways, Belgian precision meets German engineering.',
  'Archive Bomber Jacket': 'Raf Simons archive bomber with youth culture references and precise tailoring. The jacket that made Antwerp fashion school famous.',
  'Adidas Raf Simons Ozweego': 'Raf Simons x Adidas Ozweego — chunky silhouette, multi-material upper, futuristic sole. The blueprint for every dad shoe that followed.',
  'Layered Technical Jacket': 'Julius post-apocalyptic technical jacket with multiple zips, pockets and attachment points. Designed for a world after collapse — or just Tokyo.',
  'Drop Crotch Trousers': 'Julius drop-crotch trousers in technical fabric. The silhouette is exaggerated, the construction precise. Dark luxury from Japan most extreme brand.',
  'Platform Creeper Boots': 'Julius platform creeper boots with extreme sole height. Post-apocalyptic footwear for the fashion forward. Not for the faint-hearted.',
  'Pleated Top': 'Issey Miyake Pleats Please top in permanent pleats. Machine washable, wrinkle-free, packs into nothing. Technology as fashion.',
  'Pleated Trousers': 'Issey Miyake Pleats Please wide-leg trousers. The pleats expand and contract with movement — geometry in motion. Available in 30+ colorways.',
  'Flat Mules': 'Clean leather mules to complete the Pleats Please look. Minimal, functional, Japanese.',
  'Undercover Archival Graphic Tee': 'Undercover archival graphic tee from Jun Takahashi most referenced collections. Punk imagery, Japanese precision, hand-screen printed graphics.',
  'Nike Undercover Collab Sneakers': 'Nike x Undercover collab — Jun Takahashi punk sensibility applied to Nike running. One of the most coveted Nike collabs ever.',
  'Raw Edge Wool Coat': 'Undercover raw edge wool coat from the AW collection. Unfinished hems, asymmetric panels, dark academic energy. Tokyo meets London punk.',
  'Layered Knit': 'Undercover layered knit that looks like two sweaters in one. Heavy wool, dropped shoulders, slightly cropped. Chaos and balance.',
  'Military Deconstructed Jacket': 'Undercover military jacket with deconstructed details — exposed lining, raw edges, recontextualised insignia. Anti-militarism as fashion.',
  'Slim Technical Trousers': 'Undercover slim technical trousers with zip details and articulated knees. Function meets Tokyo street style.',
  'Gyakusou Collab Runners': 'Nike x Undercover Gyakusou running shoe — designed for actual running but worn everywhere. The most technical collab in Undercover history.',
}

console.log('Column exists. Seeding descriptions...')

const { data: items, error: fetchError } = await supabase.from('outfit_item').select('id, name')
if (fetchError) { console.error('fetch error:', fetchError.message); process.exit(1) }

let updated = 0
let skipped = 0
for (const item of items) {
  const desc = descriptions[item.name]
  if (!desc) { console.log('  skip (no match):', item.name); skipped++; continue }
  const { error } = await supabase
    .from('outfit_item')
    .update({ description: desc })
    .eq('id', item.id)
  if (error) console.error('  error:', item.name, error.message)
  else { console.log('  ✓', item.name); updated++ }
}
console.log(`\nDone! Updated: ${updated}, skipped: ${skipped}`)
