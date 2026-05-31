import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'

export const dynamic = 'force-dynamic'
import type { OutfitWithRelations } from '@/types/database'
import OutfitFeed from '@/components/OutfitFeed'
import RecommendationRow from '@/components/RecommendationRow'

export default async function Home() {
  const supabase = await createClient()

  const { data: outfits } = await supabase
    .from('outfit')
    .select('*, brand(name, country), category(name)')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  return (
    <main>
      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 md:px-8 text-center pt-24 pb-16">
        <p className="text-xs tracking-[0.35em] uppercase text-[#e63946] mb-8">
          discover the look. feel the vibe. own it in one click.
        </p>
        <h1
          className="font-[var(--font-cormorant)] leading-[0.92] tracking-tight mb-8"
          style={{ fontSize: 'clamp(4rem, 8vw, 7rem)' }}
        >
          Outfit.<br />
          <em className="text-[#e63946] not-italic">Inspired.</em><br />
          Yours.
        </h1>
        <p className="max-w-lg text-white/50 text-lg leading-relaxed mb-10">
          See it. Love it. Buy the whole look — in one click.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="#feed"
            className="px-8 py-3.5 rounded-full bg-[#e63946] text-white font-semibold uppercase tracking-widest text-sm hover:bg-[#c42a35] transition-colors"
          >
            Explore Looks
          </Link>
          <Link
            href="/swipe"
            className="px-8 py-3.5 rounded-full bg-white/5 border border-white/10 text-white font-semibold uppercase tracking-widest text-sm hover:bg-white/10 transition-colors"
          >
            Swipe Looks
          </Link>
        </div>
      </section>

      {/* Outfit Feed */}
      <section id="feed" className="px-6 md:px-8 py-24">
        <div className="mb-12">
          <span className="text-xs tracking-[0.35em] uppercase text-[#e63946] block mb-3">
            Shoppable outfit feed
          </span>
          <h2
            className="font-[var(--font-cormorant)] leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            Choose a look and shop every detail.
          </h2>
        </div>
        <OutfitFeed outfits={(outfits as OutfitWithRelations[]) ?? []} />
      </section>

      {/* Personalised recommendations */}
      <RecommendationRow />

      {/* How it works */}
      <section id="how" className="px-6 md:px-8 py-24 bg-[#0d0d0d]">
        <div className="mb-12">
          <span className="text-xs tracking-[0.35em] uppercase text-[#e63946] block mb-3">
            How it works
          </span>
          <h2
            className="font-[var(--font-cormorant)] leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            Three simple steps from inspiration to checkout.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { n: '01', title: 'Browse curated ideas', desc: 'Swipe through looks made for your mood, aesthetic, and energy.' },
            { n: '02', title: 'Tap for details', desc: 'Reveal product tags and instantly compare the pieces you love.' },
            { n: '03', title: 'Buy the whole look', desc: 'Add every item to your cart with one smooth checkout step.' },
          ].map(s => (
            <div key={s.n} className="bg-[#111] rounded-3xl border border-white/10 p-8 min-h-[220px] flex flex-col justify-between">
              <div className="font-[var(--font-cormorant)] text-[3rem]" style={{ color: 'rgba(230,57,70,0.2)' }}>
                {s.n}
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">{s.title}</h3>
                <p className="text-white/50 leading-relaxed text-sm">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-8 py-12 border-t border-white/10 flex flex-wrap gap-8 justify-between items-start">
        <div>
          <div className="font-[var(--font-cormorant)] text-3xl tracking-widest lowercase mb-2">géme</div>
          <p className="text-white/40 text-sm">See outfit. Love it. Buy it.</p>
        </div>
        <div className="flex gap-12 flex-wrap">
          <div className="flex flex-col gap-3 text-sm text-white/40">
            <Link href="#feed" className="hover:text-white transition-colors">Explore</Link>
            <Link href="#how" className="hover:text-white transition-colors">About</Link>
            <Link href="/swipe" className="hover:text-white transition-colors">Swipe</Link>
          </div>
          <div className="flex flex-col gap-3 text-sm text-white/40">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">TikTok</a>
            <a href="#" className="hover:text-white transition-colors">Pinterest</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
