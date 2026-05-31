import Link from 'next/link'
import ArticleLike from '@/components/ArticleLike'
import BlogComments from '@/components/BlogComments'

export const dynamic = 'force-dynamic'

const IMAGES = {
  hero:   'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=1200',
  second: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200',
}

export default function JapaneseAvantGardeArticle() {
  return (
    <main className="min-h-screen pt-20">
      <div className="w-full h-[60vh] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={IMAGES.hero} alt="Japanese avant-garde fashion" className="w-full h-full object-cover" />
      </div>

      <div className="max-w-[720px] mx-auto px-6 py-16">

        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-4">
            <span className="text-xs tracking-[0.35em] uppercase text-[#e63946]">HISTORY</span>
            <span className="text-xs text-white/30">March 2025</span>
            <span className="text-xs text-white/30">8 min read</span>
          </div>
          <ArticleLike articleSlug="japanese-avant-garde" />
        </div>

        <h1
          className="font-[var(--font-cormorant)] leading-[1.05] mb-4"
          style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}
        >
          The Big Bang: How Three Japanese Designers Changed Fashion Forever
        </h1>

        <p className="text-white/50 text-xl leading-relaxed mb-12 border-b border-white/10 pb-10">
          In October 1981, Comme des Garçons and Yohji Yamamoto walked onto the Paris runway and detonated a charge that is still reverberating through fashion today.
        </p>

        <div style={{ fontSize: '18px', lineHeight: '1.8', color: 'rgba(255,255,255,0.8)' }}>

          <p className="mb-6">
            Fashion has a handful of moments that genuinely divide time into before and after. The New Look in 1947. Punk in 1977. The grunge collections of the early 1990s. And then, in October 1981, something that the Paris press did not have words for — so they reached for the most extreme vocabulary available to them: destruction, catastrophe, the bomb.
          </p>
          <p className="mb-6">
            The shows were by Comme des Garçons and Yohji Yamamoto, two Japanese labels presenting in Paris for the first time. Buyers and editors expecting structured tailoring and luxury surface finish arrived to find asymmetric silhouettes, clothes that appeared to be disintegrating at the hem, garments in which holes were not defects but decisions, and a palette that consisted almost entirely of black. One French journalist described it as &ldquo;Hiroshima chic.&rdquo; Another called it &ldquo;post-atomic.&rdquo; The language was offensive and the critics quickly disavowed it — but the impact it acknowledged was real. Something had arrived that European fashion did not have a category for.
          </p>
          <p className="mb-12">
            To understand what Comme des Garçons and Yohji Yamamoto brought to Paris in 1981, and why it mattered so completely, you need to go back to three people and the culture that formed them.
          </p>

          <h2 className="font-[var(--font-cormorant)] mt-14 mb-5" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
            Rei Kawakubo: Fashion as Philosophy
          </h2>
          <p className="mb-6">
            Rei Kawakubo was born in Tokyo in 1942. She studied philosophy and literature at Keio University — not fashion, never fashion. She had no formal design training. In the late 1960s she began styling shoots for an acrylic company as a side job, found she had strong visual instincts, and began making clothes because she could not find what she wanted to buy. In 1969, she founded Comme des Garçons — &ldquo;like boys,&rdquo; in French — in Tokyo.
          </p>
          <p className="mb-6">
            The name is a statement. The clothes are statements. Kawakubo has never made a piece that did not have a position. Her early Tokyo work was severe, intellectual, and nothing like what Japanese fashion (then highly influenced by European tailoring) looked like. By the time she arrived in Paris, she had been working for over a decade on a vision that was entirely internal — not referential to European fashion, not responsive to Paris trends, formed in isolation and therefore formally alien to everything the Paris runway considered normal.
          </p>
          <p className="mb-12">
            The 1981 Paris debut caused shock because it looked like nothing anyone had seen. But it looked like exactly what Kawakubo had been making for years in Tokyo: clothes that prioritised concept over surface, that refused the female silhouette conventions of European fashion, that treated black not as a colour of elegance (which it was, in Paris) but as a material choice with philosophical content — the colour of protest, of mourning, of the refusal to decorate.
          </p>

          <blockquote className="my-12 pl-6 py-2" style={{ borderLeft: '3px solid #e63946' }}>
            <p className="font-[var(--font-cormorant)] text-3xl italic leading-tight text-white">
              &ldquo;Something had arrived that European fashion did not have a category for. So they reached for the most extreme vocabulary available: the bomb.&rdquo;
            </p>
          </blockquote>

          <h2 className="font-[var(--font-cormorant)] mt-14 mb-5" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
            Yohji Yamamoto: Against Beauty
          </h2>
          <p className="mb-6">
            Yohji Yamamoto was born in 1943 in Tokyo. His father was killed in the Second World War before Yamamoto was born; his mother, a seamstress, raised him alone in post-war poverty. He studied law at Keio University — also not fashion, not initially — before transferring to the Bunka Fashion College, where he graduated in 1969. After a period in Paris in the early 1970s (he received a grant to study there), he returned to Tokyo and founded his company in 1972, showing the Y&apos;s line in Tokyo before debuting in Paris in 1981.
          </p>
          <p className="mb-6">
            Yamamoto has spoken in interviews about his philosophical opposition to beauty as fashion defines it. &ldquo;Perfect is boring,&rdquo; he has said. His clothes for women — large, wrapped, swathed in black — were explicitly designed to resist the male gaze, to prioritise the wearer&apos;s comfort and movement over visual desirability as measured by European standards. The silhouette was not designed to flatter. It was designed to give the woman inside it authority, space, and the freedom to move without being watched.
          </p>
          <p className="mb-12">
            This was a political position in 1981, when the Paris collections were largely about fitted waists, structured shoulders, and the body as display surface. Yamamoto&apos;s clothes did not display the body. They surrounded it, enclosed it, made it a presence without making it an object. The press did not understand this immediately. The buyers did. Within a few seasons, Yamamoto was selling out in every major market.
          </p>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMAGES.second} alt="Avant-garde Japanese fashion editorial" className="w-full rounded-2xl mb-3" />
          <p className="text-sm text-white/40 text-center italic mb-14">
            The Japanese designers brought to Paris a visual language formed in complete isolation from European tradition.
          </p>

          <h2 className="font-[var(--font-cormorant)] mt-10 mb-5" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
            Issey Miyake: Technology as Poetry
          </h2>
          <p className="mb-6">
            Issey Miyake is the third figure in this constellation, and in some ways the most complex. Born in Hiroshima in 1938, he was seven years old when the atomic bomb fell on his city. His mother died of radiation exposure three years later. He has spoken about this carefully and rarely, but the shadow it casts over his life&apos;s work is real: a man from Hiroshima who spent fifty years making objects of extraordinary beauty seems to be continuously engaged with the question of what it means to make beautiful things in a world that has demonstrated its capacity for annihilation.
          </p>
          <p className="mb-6">
            Miyake studied graphic design at Tama Art University in Tokyo before moving to Paris to work under Guy Laroche and Givenchy, and then to New York. He founded Issey Miyake in 1970. His early work explored the relationship between traditional Japanese textile techniques (dyeing, folding, pleating) and contemporary Western construction — a dialogue between cultures that was unusual at the time and remains foundational to his legacy.
          </p>
          <p className="mb-6">
            In 1993, he launched Pleats Please: garments made from heat-set polyester pleating that are wrinkle-resistant, lightweight, and machine-washable. The line was a technological innovation dressed as a philosophical statement — clothing that did not require maintenance, that responded to the body instead of constraining it, that could be rolled into a ball and unrolled without crease. Pleats Please democratised the Issey Miyake aesthetic while extending its argument: that clothing and the body should be partners, not adversaries.
          </p>
          <p className="mb-12">
            In 1998, he launched A-POC (A Piece of Cloth): garments that emerged from a single tube of knitted fabric, cut to shape by the wearer. The technology used industrial knitting machines to produce continuous tubes containing the pattern for multiple garments — coats, trousers, skirts — that could be extracted by the buyer with scissors. It was clothing as collaboration between maker and wearer, and it was almost twenty years ahead of the fashion industry&apos;s current interest in customisation and zero-waste production.
          </p>

          <h2 className="font-[var(--font-cormorant)] mt-10 mb-5" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
            The Legacy: Permission to Mean Something
          </h2>
          <p className="mb-6">
            What Kawakubo, Yamamoto, and Miyake gave to fashion collectively is difficult to overstate, because it operates at the level of permission rather than aesthetics. They did not just change what clothes looked like. They changed what clothes were allowed to be.
          </p>
          <p className="mb-6">
            Before 1981, it was broadly accepted that fashion existed to make the wearer attractive — to present the body in a culturally legible way, to participate in the social contract of dress. The Japanese designers arrived with a different premise entirely: that a garment could be a cultural argument, an ethical position, a response to history. That clothing could be the medium through which a designer asked questions that had nothing to do with trend cycles or seasonal colour palettes. That fashion could be, in the fullest sense, a form of thought.
          </p>
          <p className="mb-6">
            This permission was the inheritance that Martin Margiela took up when he showed his first collection in a Paris back street in 1988. It is what allowed Raf Simons, studying furniture design in Antwerp in the early 1990s, to approach fashion as a field of cultural and political ideas rather than a trade. It is what allowed Rick Owens to make clothes that look like architectural ruins and present them as luxury objects. It is what allowed Helmut Lang to strip clothing to its structural minimum and present that minimum as a statement.
          </p>
          <p className="mb-12">
            None of these designers are Japanese. None of them work directly in the tradition of Kawakubo, Yamamoto, and Miyake. But all of them work in the space those three opened — a space in which fashion is understood to be capable of more than decoration, in which the designer is understood to have a point of view that extends beyond trend prediction, in which a collection can be simultaneously a garment and an argument about the culture that produced it.
          </p>

          <blockquote className="my-12 pl-6 py-2" style={{ borderLeft: '3px solid #e63946' }}>
            <p className="font-[var(--font-cormorant)] text-3xl italic leading-tight text-white">
              &ldquo;They did not just change what clothes looked like. They changed what clothes were allowed to be.&rdquo;
            </p>
          </blockquote>

          <p className="mb-6">
            In 2022, Issey Miyake died at the age of 84. He worked until nearly the end. In interviews late in his life, he deflected questions about Hiroshima, about the bomb, about what it meant that a man from that city had spent his life making things of beauty. He preferred to talk about the future of textile technology, about what fabric could still do that it had not done yet. The deflection was, in its own way, an answer.
          </p>
          <p className="mb-6">
            Rei Kawakubo continues to show Comme des Garçons in Paris, now into her eighties. Each collection remains a provocation. Yohji Yamamoto continues to design, continues to drape women in black, continues to ask what beauty is and whether it is worth having. The conversation they started in 1981 — the one that rewired fashion&apos;s understanding of itself — is still ongoing.
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
            Channel the avant-garde
          </h3>
          <p className="text-white/50 mb-6 text-sm">Volume, asymmetry, black as philosophy.</p>
          <Link
            href="/outfit/130"
            className="inline-block bg-[#e63946] hover:bg-[#c42a35] text-white px-8 py-4 rounded-full font-medium transition-all"
          >
            Shop the Look →
          </Link>
        </div>

        <BlogComments articleSlug="japanese-avant-garde" />
      </div>
    </main>
  )
}
