import Link from 'next/link'
import ArticleLike from '@/components/ArticleLike'
import BlogComments from '@/components/BlogComments'

export const dynamic = 'force-dynamic'

const IMAGES = {
  hero:   'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200',
  second: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200',
}

export default function MargielaAnonymityArticle() {
  return (
    <main className="min-h-screen pt-20">
      <div className="w-full h-[60vh] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={IMAGES.hero} alt="Maison Margiela — The White Label" className="w-full h-full object-cover" />
      </div>

      <div className="max-w-[720px] mx-auto px-6 py-16">

        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-4">
            <span className="text-xs tracking-[0.35em] uppercase text-[#e63946]">ARCHIVE</span>
            <span className="text-xs text-white/30">April 2025</span>
            <span className="text-xs text-white/30">5 min read</span>
          </div>
          <ArticleLike articleSlug="margiela-anonymity" />
        </div>

        <h1
          className="font-[var(--font-cormorant)] leading-[1.05] mb-4"
          style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}
        >
          The Man Behind the White Label: Margiela&apos;s Gift of Anonymity
        </h1>

        <p className="text-white/50 text-xl leading-relaxed mb-12 border-b border-white/10 pb-10">
          Before the Tabi boot became an icon and deconstruction became a trend, there was a Belgian designer who refused to be seen — and in doing so, made the clothes speak louder than any face ever could.
        </p>

        <div style={{ fontSize: '18px', lineHeight: '1.8', color: 'rgba(255,255,255,0.8)' }}>

          <p className="mb-6">
            There are no confirmed photographs of Martin Margiela. Not one that he has authorised, not one taken in the context of his work. For more than twenty years at the helm of one of fashion&apos;s most discussed houses, he gave no interviews, attended no after-parties, appeared in no campaign imagery, and allowed no documentation of his face. The creative director of Maison Martin Margiela was, by deliberate design, invisible.
          </p>
          <p className="mb-12">
            This was not shyness. It was a philosophical position. If the clothes were the work, then the person who made them was irrelevant to the experience of wearing them. Margiela believed that celebrity-designer culture — the conflation of the garment with the personality of its creator — was a form of noise. He removed himself to turn down the volume, and what was left was extraordinary.
          </p>

          <h2 className="font-[var(--font-cormorant)] mt-14 mb-5" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
            Antwerp and the Gaultier Years
          </h2>
          <p className="mb-6">
            Martin Margiela was born in 1957 in Hasselt, a small city in the Belgian province of Limburg. He studied fashion at the Royal Academy of Fine Arts in Antwerp — graduating in 1979, one year before the class that would produce the legendary Antwerp Six (Walter Van Beirendonck, Dries Van Noten, Ann Demeulemeester, and others who would collectively redefine European fashion in the 1980s). Margiela was therefore part of the generation just before the cultural explosion, which suited his preference for operating in the margins.
          </p>
          <p className="mb-6">
            From 1984 to 1987, he worked as an assistant to Jean Paul Gaultier in Paris. The Gaultier period is formative but rarely discussed in terms of direct aesthetic influence — Margiela&apos;s work would eventually be almost the inverse of Gaultier&apos;s theatricality. What Gaultier gave him was not a visual language but an operating model: the understanding that fashion could have a strong point of view, that it could be provocative in the context of the runway without being unwearable, that the show itself could be a medium.
          </p>
          <p className="mb-12">
            In 1988, Margiela founded Maison Martin Margiela with his business partner Jenny Meirens. The first collection showed in Paris in September 1988 for Spring/Summer 1989. The venue was not a hall or a hotel ballroom but a back street in the 20th arrondissement — a working-class neighbourhood with no fashion infrastructure, no press facilities, no runway. The guests sat on the kerb. Local children handed out invitations. Red paint on the cobblestones marked a path the models walked. The fashion press did not know what to make of it, which was precisely the point.
          </p>

          <blockquote className="my-12 pl-6 py-2" style={{ borderLeft: '3px solid #e63946' }}>
            <p className="font-[var(--font-cormorant)] text-3xl italic leading-tight text-white">
              &ldquo;He removed himself to turn down the volume, and what was left was extraordinary.&rdquo;
            </p>
          </blockquote>

          <h2 className="font-[var(--font-cormorant)] mt-14 mb-5" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
            Four White Stitches
          </h2>
          <p className="mb-6">
            The white label sewn with four hand stitches is the most recognisable anonymous object in fashion history. Where other houses put their name in large text on the label, Margiela put a blank white rectangle and let the stitching speak — four stitches at the corners, always in white, always by hand. The label did not name the garment, did not list a season, did not make any claim. It simply was.
          </p>
          <p className="mb-6">
            This extended to the house&apos;s entire communication strategy. Press releases were sent in the first person plural — &ldquo;We at Maison Martin Margiela&rdquo; — never naming a creative director. Phone interviews were given but not print ones, and the voice on the phone was not always Martin&apos;s; sometimes it was a collective of staff members answering as one. The house was the author. The house wore white lab coats — all staff, in every photograph, in every context. The coat was a uniform and an erasure simultaneously.
          </p>
          <p className="mb-12">
            This anonymity created a paradox that is still discussed in fashion theory: by refusing to brand himself, Margiela created one of fashion&apos;s most recognisable brands. The blank white label is more immediately identifiable than most designer signatures. The absence became a presence. The refusal to speak became a very loud statement.
          </p>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMAGES.second} alt="Fashion deconstruction" className="w-full rounded-2xl mb-3" />
          <p className="text-sm text-white/40 text-center italic mb-14">
            Deconstruction as method: what the garment is made of, and how, becomes the garment itself.
          </p>

          <h2 className="font-[var(--font-cormorant)] mt-10 mb-5" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
            The Tabi Boot and the Deconstruction Method
          </h2>
          <p className="mb-6">
            The Tabi boot appeared in the first collection and has never left. It is a split-toe shoe — the toe divided in two, like a hoof, like the Japanese tabi sock from which it takes its name. Traditional tabi are white cotton socks worn with sandals in Japanese dress; the split toe allows the sandal&apos;s thong to pass through. Margiela translated this into a high-heeled boot in black leather, and the effect was simultaneously elegant and deeply strange. The foot became other than itself. The shoe drew attention to the act of walking.
          </p>
          <p className="mb-6">
            Deconstruction, at Margiela, was not an aesthetic so much as an epistemology. To deconstruct a garment was to ask what it was made of, how it held together, what assumptions it relied on. Linings were reversed to face outward. Tailors&apos; basting threads — temporary stitches used during construction that are normally removed — were left in place. Flat pattern pieces were sewn directly onto the body, as if the garment had not yet been assembled. Vintage blazers were cut apart and reconfigured on a larger scale. The point was always: look at what this thing is. Look at how it is made. Ask why it has always been made this way.
          </p>
          <p className="mb-12">
            This methodological rigour made Margiela&apos;s work almost academic in nature. The collections functioned as arguments. Each season posed a question about the conventions of clothing — about what a jacket is, about what a body is, about what luxury means — and answered it sideways, in three dimensions, in wool and leather and muslin.
          </p>

          <h2 className="font-[var(--font-cormorant)] mt-10 mb-5" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
            The Departure and the After
          </h2>
          <p className="mb-6">
            In 2002, the Italian holding company OTB (which owns Diesel, among other brands) acquired a controlling stake in Maison Martin Margiela. The creative work continued unchanged for several years — the anonymity remained intact, the white lab coats remained mandatory, the shows remained conceptually rigorous. But the institutional infrastructure had changed, and the tension between commercial pressures and the house&apos;s radical interiority was visible, at least to close observers.
          </p>
          <p className="mb-6">
            Margiela left the house in 2009. There was no announcement, no farewell collection, no statement. He simply stopped. The absence that had always defined his public presence became permanent. The house continued under the name Maison Margiela (the &apos;Martin&apos; was quietly dropped), and in 2014 John Galliano was appointed creative director.
          </p>
          <p className="mb-6">
            Galliano&apos;s Margiela is a different entity — more theatrical, more referential, more visible in the conventional sense — but it has engaged seriously with the archive and earned substantial respect from the fashion community. The Artisanal line in particular has continued the couture-level deconstruction practice that defined the house under its founder.
          </p>
          <p className="mb-6">
            Martin Margiela himself has not spoken publicly about any of this. He has not attended shows. He has not commented on the direction of the house. He has maintained, with absolute consistency, the position he always held: that the work speaks, and the person who made it does not need to.
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
            Get the Margiela-inspired look
          </h3>
          <p className="text-white/50 mb-6 text-sm">Deconstruction, raw edges, the beauty of the unfinished.</p>
          <Link
            href="/outfit/124"
            className="inline-block bg-[#e63946] hover:bg-[#c42a35] text-white px-8 py-4 rounded-full font-medium transition-all"
          >
            Shop the Look →
          </Link>
        </div>

        <BlogComments articleSlug="margiela-anonymity" />
      </div>
    </main>
  )
}
