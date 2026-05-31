import Link from 'next/link'
import BlogComments from '@/components/BlogComments'
import ArticleLike from '@/components/ArticleLike'

export const dynamic = 'force-dynamic'

const IMAGES = {
  hero:    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200',
  second:  'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200',
  third:   'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200',
  fourth:  'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200',
}

export default function DemnaGucciArticle() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero image — full width */}
      <div className="w-full h-[60vh] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMAGES.hero}
          alt="Demna at Gucci — Primavera collection"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article wrapper */}
      <div className="max-w-[720px] mx-auto px-6 py-16">

        {/* Meta */}
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-4">
            <span className="text-xs tracking-[0.35em] uppercase text-[#e63946]">COLLECTIONS</span>
            <span className="text-xs text-white/30">May 2025</span>
            <span className="text-xs text-white/30">6 min read</span>
          </div>
          <ArticleLike articleSlug="demna-gucci-primavera" />
        </div>

        {/* Title */}
        <h1
          className="font-[var(--font-cormorant)] leading-[1.05] mb-4"
          style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}
        >
          Demna at Gucci: When Balenciaga&apos;s Chaos Met Italian Heritage
        </h1>

        {/* Subtitle */}
        <p className="text-white/50 text-xl leading-relaxed mb-12 border-b border-white/10 pb-10">
          The most anticipated debut of the decade — and what it means for fashion
        </p>

        {/* Body */}
        <div className="prose-content" style={{ fontSize: '18px', lineHeight: '1.8', color: 'rgba(255,255,255,0.8)' }}>

          {/* Introduction */}
          <p className="mb-6">
            When Kering announced in late 2024 that Demna Gvasalia would be leaving Balenciaga after a decade of cultural dominance — and taking the creative director role at Gucci — the fashion world briefly held its breath. Some called it the appointment of the era. Others called it a catastrophe. Everyone agreed it was inevitable. Demna had done everything he could do at Balenciaga. He had turned a dormant couture house into the most talked-about brand on the planet. He had broken every rule, then remade those rules in his own image. What could possibly be left?
          </p>
          <p className="mb-12">
            Florence answered that question in April 2025 with a single word sewn in double-G monogram across a deconstructed trench coat: <em>Primavera</em>. Spring. New beginnings. The show was a declaration, not a debut.
          </p>

          {/* Pull quote */}
          <blockquote
            className="my-12 pl-6 py-2"
            style={{ borderLeft: '3px solid #e63946' }}
          >
            <p className="font-[var(--font-cormorant)] text-3xl italic leading-tight text-white">
              &ldquo;He had turned a dormant couture house into the most talked-about brand on the planet. What could possibly be left?&rdquo;
            </p>
          </blockquote>

          {/* Section 1 */}
          <h2
            className="font-[var(--font-cormorant)] mt-14 mb-5"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}
          >
            The Weight of the House
          </h2>
          <p className="mb-6">
            Gucci is a house that lives under the weight of its own mythology. Founded in 1921 in Florence, it spent a century cycling through identities — equestrian saddlery heritage, Tom Ford&apos;s maximalist sexuality, Frida Giannini&apos;s restrained classicism, and finally the technicolor neo-romanticism of Alessandro Michele, whose tenure from 2015 to 2022 redefined what maximalism could mean in the age of Instagram.
          </p>
          <p className="mb-6">
            Michele&apos;s departure left a wound that interim creative director Sabato De Sarno struggled to heal. De Sarno&apos;s &ldquo;Ancora&rdquo; vision — red-saturated, sleek, deliberately quiet — earned praise from industry insiders while leaving the brand&apos;s core audience confused. The cultural conversation moved elsewhere. Gucci, once inescapable, became a brand people talked <em>about</em> rather than a brand they talked <em>with</em>.
          </p>
          <p className="mb-12">
            Into that silence, Kering placed one of fashion&apos;s most polarising minds.
          </p>

          {/* Image 2 */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={IMAGES.second}
            alt="Fashion show runway"
            className="w-full rounded-2xl mb-3"
          />
          <p className="text-sm text-white/40 text-center italic mb-14">
            The Palazzo Vecchio — backdrop to Demna&apos;s first Gucci statement. Florence, Spring 2025.
          </p>

          {/* Section 2 */}
          <h2
            className="font-[var(--font-cormorant)] mt-10 mb-5"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}
          >
            Primavera
          </h2>
          <p className="mb-6">
            I arrived at the Palazzo Pitti on a warm April evening as the Boboli Gardens turned gold. The invitation had come wrapped in tobacco-coloured paper, sealed with a double-G wax stamp that was slightly — deliberately — off-centre. The message was clear before the first look even walked: precision is for people who haven&apos;t earned their imprecision yet.
          </p>
          <p className="mb-6">
            The collection opened in silence. A single model in a floor-length black overcoat, lapels reversed to expose the lining — a silk brocade in Gucci&apos;s signature flora pattern, but enlarged to near-abstraction. The silhouette was pure Demna: sculptural shoulders, a cinched waist that felt architectural rather than anatomical, trousers that broke exactly one centimetre too long on the cobblestones.
          </p>
          <p className="mb-6">
            What followed was 52 looks that felt simultaneously like a love letter and a hostile takeover. The colour palette was restrained in a way Balenciaga never was — smoke, ivory, deep olive, with bursts of Gucci&apos;s signature horse-bit gold appearing not on accessories but woven directly into the fabric. A trouser suit came in raw-edge wool with gold thread running through it like fault lines. A trench coat bore a GG logo so enormous it read as camouflage rather than branding.
          </p>
          <p className="mb-12">
            Key looks: a draped evening gown constructed from deadstock Gucci archive fabric that appeared to be actively falling apart, held together by jewelled pins. Leather bomber jackets with the Gucci crest replaced by what appeared to be a hand-drawn approximation of the crest — crayon-rough, child-like, somehow more authoritative for its imperfection. Footwear was heavily influenced by Horsebit loafers, but deconstructed into something that looked like three separate shoes stitched together by a very determined conceptualist.
          </p>

          {/* Pull quote 2 */}
          <blockquote
            className="my-12 pl-6 py-2"
            style={{ borderLeft: '3px solid #e63946' }}
          >
            <p className="font-[var(--font-cormorant)] text-3xl italic leading-tight text-white">
              &ldquo;A love letter and a hostile takeover. Simultaneously.&rdquo;
            </p>
          </blockquote>

          {/* Image 3 */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={IMAGES.third}
            alt="Fashion editorial"
            className="w-full rounded-2xl mb-3"
          />
          <p className="text-sm text-white/40 text-center italic mb-14">
            The new Gucci silhouette: structured chaos, heritage deconstructed.
          </p>

          {/* Section 3 */}
          <h2
            className="font-[var(--font-cormorant)] mt-10 mb-5"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}
          >
            The Gvasalia Effect
          </h2>
          <p className="mb-6">
            Demna&apos;s signature has always been the weaponisation of familiarity. At Vetements, it was the cultural detritus of the 1990s and 2000s — DHL shirts, Juicy Couture tracksuits, tourist-shop iconography — transformed into objects of desire through sheer force of context. At Balenciaga, it became political: the tape-bound garbage bags at $1,700, the destroyed sneakers, the Supreme Court document bags. The message was always the same: what we agree to call value is an act of collective fiction, and fashion is its most honest expression.
          </p>
          <p className="mb-6">
            At Gucci, that instinct collides with a house that <em>is itself</em> an act of collected mythology. The double-G logo is not merely a brand mark — it is a semiotic object with 100 years of accumulation. Demna does not ignore this. He performs it. The oversized GG monogram on the Primavera collection is not logomania in the Alessandro Michele sense (joyful, baroque, maximalist). It is logomania as interrogation: <em>why does this symbol still hold power, and who gave it permission?</em>
          </p>
          <p className="mb-12">
            The deconstruction is technically precise. Demna has said in interviews that he spent six months in Gucci&apos;s Florence archives before touching a sketch pad. The brocade linings are authentic archival fabrics, digitised and enlarged to destabilise recognition. The Horsebit appears in contexts that make it feel quotidian — hardware on a work bag, a detail on a utilitarian cargo trouser — before being recontextualised on a couture gown where it becomes alien. This is not pastiche. This is scholarship with scissors.
          </p>

          {/* Image 4 */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={IMAGES.fourth}
            alt="Luxury fashion detail"
            className="w-full rounded-2xl mb-3"
          />
          <p className="text-sm text-white/40 text-center italic mb-14">
            Detail-work from the Primavera collection: archive fabric meets deconstruction.
          </p>

          {/* Section 4 */}
          <h2
            className="font-[var(--font-cormorant)] mt-10 mb-5"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}
          >
            What It Means
          </h2>
          <p className="mb-6">
            The reaction from the fashion world was, characteristically, bifurcated. Buyers from Selfridges and Le Bon Marché were photographed leaving the Pitti still holding their invitations, expressions unreadable. Anna Wintour described it as &ldquo;significant.&rdquo; Lou Stoppard called it &ldquo;the most important thing to happen to a legacy house since Hedi at Saint Laurent.&rdquo; The r/malefashionadvice subreddit declared it unintelligible and spent 400 comments explaining why.
          </p>
          <p className="mb-6">
            What Demna has done — and what will take two or three more collections to fully understand — is refuse to choose between reverence and critique. He loves Gucci the way a surgeon loves a body: with intimate, unflinching attention, and the willingness to cut. The Primavera collection does not answer the question of what Gucci is now. It makes that question louder, more urgent, more alive.
          </p>
          <p className="mb-12">
            In a fashion landscape increasingly defined by brand-safe nostalgia and algorithmic dressing, that refusal to resolve feels like the most radical act available. Not chaos for its own sake. Chaos as a form of faithfulness — to the house, to fashion, to the idea that clothes can still mean something complicated.
          </p>

          {/* Closing */}
          <h2
            className="font-[var(--font-cormorant)] mt-10 mb-5"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}
          >
            The Verdict
          </h2>
          <p className="mb-6">
            I have been covering collections for twelve years. I have seen debuts that reorient a house and debuts that merely occupy it. Demna&apos;s Primavera is something rarer: a debut that genuinely does not know what it will become yet. There is uncertainty in it — productive, generative uncertainty that a craftsman with absolute technical control has chosen to embrace rather than resolve.
          </p>
          <p className="mb-6">
            The trench coat with the reversed lapels is probably the single most interesting garment I have seen this decade. Not because it is technically complex — it is relatively simple — but because it is exactly the kind of object that changes how you look at everything around it. That is what the best fashion does.
          </p>
          <p className="mb-6">
            Come autumn, when the second collection arrives, we will know more. For now: <em>Primavera</em> is a provocation, a promise, and — under those gold Florentine lights — something close to a manifesto.
          </p>

          {/* Back to blog */}
          <div className="pt-10 border-t border-white/10 mt-10">
            <Link href="/blog" className="text-sm text-white/40 hover:text-white transition-colors">
              ← Back to The Edit
            </Link>
          </div>
        </div>

        {/* Shop CTA */}
        <div className="border border-white/10 rounded-2xl p-8 text-center mt-16">
          <p className="text-white/40 text-sm uppercase tracking-widest mb-2">Shop the Aesthetic</p>
          <h3
            className="font-[var(--font-cormorant)] mb-4"
            style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}
          >
            Get the Demna-inspired look
          </h3>
          <p className="text-white/50 mb-6 text-sm">Dark tailoring, deconstructed silhouettes, luxury chaos.</p>
          <Link
            href="/outfit/121"
            className="inline-block bg-[#e63946] hover:bg-[#c42a35] text-white px-8 py-4 rounded-full font-medium transition-all"
          >
            Shop the Look →
          </Link>
        </div>

        <BlogComments articleSlug="demna-gucci-primavera" />
      </div>
    </main>
  )
}
