import Link from 'next/link'
import ArticleLike from '@/components/ArticleLike'
import BlogComments from '@/components/BlogComments'

export const dynamic = 'force-dynamic'

const IMAGES = {
  hero:   'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200',
  second: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200',
}

export default function RickOwensArticle() {
  return (
    <main className="min-h-screen pt-20">
      <div className="w-full h-[60vh] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={IMAGES.hero} alt="Rick Owens — Architecture of Darkness" className="w-full h-full object-cover" />
      </div>

      <div className="max-w-[720px] mx-auto px-6 py-16">

        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-4">
            <span className="text-xs tracking-[0.35em] uppercase text-[#e63946]">DESIGNER PROFILE</span>
            <span className="text-xs text-white/30">May 2025</span>
            <span className="text-xs text-white/30">7 min read</span>
          </div>
          <ArticleLike articleSlug="rick-owens-fogachine" />
        </div>

        <h1
          className="font-[var(--font-cormorant)] leading-[1.05] mb-4"
          style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}
        >
          Rick Owens and the Architecture of Darkness
        </h1>

        <p className="text-white/50 text-xl leading-relaxed mb-12 border-b border-white/10 pb-10">
          From a Los Angeles fabric district cutting table to the most uncompromising design studio in Paris — the story of the man who made brutalism beautiful.
        </p>

        <div style={{ fontSize: '18px', lineHeight: '1.8', color: 'rgba(255,255,255,0.8)' }}>

          <p className="mb-6">
            There is a building in Venice, California that looks like it is slowly eating itself. Heavy concrete overhangs press down on raw plaster walls. The furniture inside is monumental — beds the size of altars, chairs that look carved from a single block of stone. The windows frame the Pacific like an aperture adjusting to find the right exposure. This is where Rick Owens worked for a decade before Paris, and the building is an accidental self-portrait: massive, quiet, obsessed with weight.
          </p>
          <p className="mb-12">
            To understand Rick Owens — the designer, the silhouette, the cult — you have to understand that he is not a fashion person in the conventional sense. He is a sculptor who chose fabric as his medium, a Californian who found his visual language in Roman ruins and medieval armour, a man raised in the Central Valley town of Porterville who spent his twenties in Los Angeles cutting knockoff designer clothes in the downtown fabric district, learning construction from the inside out.
          </p>

          <h2 className="font-[var(--font-cormorant)] mt-14 mb-5" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
            Porterville to the Fabric District
          </h2>
          <p className="mb-6">
            Rick Owens was born in 1962 in Porterville, a small city in California&apos;s San Joaquin Valley — a flat, agricultural place, far from both the glamour of Los Angeles and the culture of San Francisco. He studied at Otis College of Art and Design in LA but left without a degree, drawn instead to the practical education of the garment district, where he spent years making copies of designer clothes for resale. This is not a romantic origin story in the fashion sense, but it is in another sense entirely: he learned how to make clothes by dismantling the clothes of others.
          </p>
          <p className="mb-6">
            In 1994, from his Los Angeles apartment, Owens started his own label. The aesthetic arrived fully formed: pale knit columns, long lean jackets, trousers that pooled at the floor. The palette was ash, bone, ivory, and the darkest possible black. He showed initially in LA, drawing a local cult following of architects, musicians, and people who had grown tired of colour.
          </p>
          <p className="mb-12">
            The turning point was 2001, when Barneys New York picked up the line. By 2003, Owens had moved to Paris, drawn by the city&apos;s infrastructure for production and its tolerance for the kind of scale he was beginning to imagine. He set up studio in the 1st arrondissement, and Paris received him — cautiously at first, then completely.
          </p>

          <blockquote className="my-12 pl-6 py-2" style={{ borderLeft: '3px solid #e63946' }}>
            <p className="font-[var(--font-cormorant)] text-3xl italic leading-tight text-white">
              &ldquo;He is a sculptor who chose fabric as his medium, a Californian who found his visual language in Roman ruins and medieval armour.&rdquo;
            </p>
          </blockquote>

          <h2 className="font-[var(--font-cormorant)] mt-14 mb-5" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
            Brutalism as Beauty
          </h2>
          <p className="mb-6">
            The aesthetic language of Rick Owens is precise and consistent across three decades: extended proportions, dropped crotches, asymmetrical hems, exposed seaming. He works in washed linen, distressed leather, heavy jersey, and his signature Fog — a greyish, almost-white that reads as neither clean nor dirty, as neither bright nor dark. The silhouette typically runs long, with volume concentrated at the shoulders and the hem, creating a sense of downward gravity.
          </p>
          <p className="mb-6">
            He has described his work as &ldquo;glamour wearing brutalist armour.&rdquo; The phrase illuminates a central tension in the work: everything he makes is, at its core, a garment meant to make the person wearing it feel powerful. The runway looks can be extreme — sculpted to the point of architecture — but the underlying pieces (the tunics, the drawstring trousers, the leather jackets with their dropped lapels) are among the most wearable in luxury fashion. This is the sleight of hand Owens performs with every collection: make something that looks like a provocation, then make it comfortable enough that people wear it every day.
          </p>
          <p className="mb-12">
            The DRKSHDW diffusion line, launched in 2005, extended this logic to denim and sportswear. DRKSHDW made the sensibility accessible at lower price points without diluting it — dark washed jeans with the same dropped crotch, the same pooling hem, the same washed-out palette. It introduced his aesthetic to a generation of younger customers and connected his work to streetwear culture in ways the mainline never had.
          </p>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMAGES.second} alt="Dark avant-garde fashion" className="w-full rounded-2xl mb-3" />
          <p className="text-sm text-white/40 text-center italic mb-14">
            The Rick Owens silhouette: extended proportions, brutalist weight, total authority.
          </p>

          <h2 className="font-[var(--font-cormorant)] mt-10 mb-5" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
            The Runway as Theatre
          </h2>
          <p className="mb-6">
            Rick Owens shows are not fashion shows in the conventional sense. They are performances, and sometimes they are things closer to ceremonies. His presentations have included male models who carried each other across the runway (the Slave collection, Spring 2012), women who wore headpieces that completely obscured their faces (Cyclops, Fall 2015), towering platform boots that made models move like wading figures in a flooded landscape (Gorgon, Spring 2016), and mass tableaux where dozens of models stood in geometric formations, moving in slow unison.
          </p>
          <p className="mb-6">
            The Walrus collection (Fall 2016) remains one of the most discussed: models in extreme padding that distorted the human silhouette beyond recognition, suggesting something primordial and enormous. The clothes beneath the padding were, as always, exquisitely made. The show raised questions about the body, about fashion&apos;s relationship to physical form, about what clothing is for. These are not questions that most luxury houses choose to ask at runway presentations, but they are the questions that have defined Owens&apos;s thirty-year project.
          </p>
          <p className="mb-12">
            The shows take place in the Palais de Tokyo, a brutalist monument on the Seine that suits the work perfectly. Owens has described the venue as &ldquo;a ruin that has been reclaimed.&rdquo; The same description applies to most of his garments.
          </p>

          <blockquote className="my-12 pl-6 py-2" style={{ borderLeft: '3px solid #e63946' }}>
            <p className="font-[var(--font-cormorant)] text-3xl italic leading-tight text-white">
              &ldquo;Make something that looks like a provocation. Then make it comfortable enough that people wear it every day.&rdquo;
            </p>
          </blockquote>

          <h2 className="font-[var(--font-cormorant)] mt-10 mb-5" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
            Cultural Gravity
          </h2>
          <p className="mb-6">
            The cultural footprint of Rick Owens extends well beyond fashion. Kanye West wore Rick Owens extensively in the early 2010s, bringing the aesthetic into contact with hip-hop culture in ways that reconfigured both. West&apos;s adoption of the dropped-crotch trouser — borrowed directly from Owens — changed how a generation dressed and opened a conversation between luxury avant-garde fashion and urban streetwear that continues to reverberate.
          </p>
          <p className="mb-6">
            Owens has also influenced a generation of designers directly: the post-apocalyptic silhouette that appears in collections from Julius, Boris Bidjan Saberi, and Visions of the Future traces a line back to his proportional choices of the mid-2000s. The willingness to make an extreme garment and stand behind it without explanation — a stance Owens has always maintained — gave those designers permission.
          </p>
          <p className="mb-6">
            He has said in interviews that his work is about &ldquo;a kind of authority that isn&apos;t borrowed.&rdquo; Thirty years in, the collection bears out the claim. Rick Owens does not reference trends. He creates a gravitational field and everything around him orients toward it.
          </p>

          <div className="pt-10 border-t border-white/10 mt-10">
            <Link href="/blog" className="text-sm text-white/40 hover:text-white transition-colors">
              ← Back to The Edit
            </Link>
          </div>
        </div>

        <div className="border border-white/10 rounded-2xl p-8 text-center mt-16">
          <p className="text-white/40 text-sm uppercase tracking-widest mb-2">Shop the Aesthetic</p>
          <h3 className="font-[var(--font-cormorant)] mb-4" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}>
            Get the Rick Owens-inspired look
          </h3>
          <p className="text-white/50 mb-6 text-sm">Extended silhouettes, dark palette, brutalist weight.</p>
          <Link
            href="/outfit/122"
            className="inline-block bg-[#e63946] hover:bg-[#c42a35] text-white px-8 py-4 rounded-full font-medium transition-all"
          >
            Shop the Look →
          </Link>
        </div>

        <BlogComments articleSlug="rick-owens-fogachine" />
      </div>
    </main>
  )
}
