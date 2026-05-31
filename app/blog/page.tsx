import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'

export const dynamic = 'force-dynamic'

const articles = [
  {
    slug: 'demna-gucci-primavera',
    title: 'Demna at Gucci: When Balenciaga\'s Chaos Met Italian Heritage',
    excerpt: 'The most anticipated debut of the decade — and what it means for fashion. Demna Gvasalia\'s first Gucci collection redefines what a luxury house can be in the post-irony era.',
    category: 'COLLECTIONS',
    date: 'May 2025',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
  },
  {
    slug: 'rick-owens-fogachine',
    title: 'Rick Owens and the Architecture of Darkness',
    excerpt: 'From a Los Angeles fabric district cutting table to the most uncompromising design studio in Paris — the story of the man who made brutalism beautiful.',
    category: 'DESIGNER PROFILE',
    date: 'May 2025',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
  },
  {
    slug: 'margiela-anonymity',
    title: 'The Man Behind the White Label: Margiela\'s Gift of Anonymity',
    excerpt: 'Before the Tabi boot became an icon and deconstruction became a trend, there was a Belgian designer who refused to be seen — and in doing so, made the clothes speak louder than any face ever could.',
    category: 'ARCHIVE',
    date: 'April 2025',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800',
  },
  {
    slug: 'japanese-avant-garde',
    title: 'The Big Bang: How Three Japanese Designers Changed Fashion Forever',
    excerpt: 'In October 1981, Comme des Garçons and Yohji Yamamoto walked onto the Paris runway and detonated a charge that is still reverberating through fashion today.',
    category: 'HISTORY',
    date: 'March 2025',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800',
  },
]

export default async function BlogPage() {
  const supabase = await createClient()

  const { data: likesData } = await supabase
    .from('blog_like')
    .select('article_slug')
    .is('comment_id', null)
    .in('article_slug', articles.map(a => a.slug))

  const likeCounts: Record<string, number> = {}
  articles.forEach(a => { likeCounts[a.slug] = 0 })
  likesData?.forEach(l => {
    if (l.article_slug) likeCounts[l.article_slug] = (likeCounts[l.article_slug] ?? 0) + 1
  })

  return (
    <main className="min-h-screen pt-24">
      <div className="px-6 md:px-8 py-12">
        <div className="mb-14">
          <span className="text-xs tracking-[0.35em] uppercase text-[#e63946] block mb-3">
            Editorial
          </span>
          <h1
            className="font-[var(--font-cormorant)] leading-tight mb-3"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            The Edit
          </h1>
          <p className="text-white/40 text-base">Notes on niche fashion, culture, and the avant-garde.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map(article => (
            <Link key={article.slug} href={`/blog/${article.slug}`} className="block group">
              <article className="bg-[#111] rounded-3xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
                <div className="h-56 overflow-hidden bg-black">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs tracking-[0.28em] uppercase text-[#e63946]">
                      {article.category}
                    </span>
                    <span className="text-xs text-white/30">{article.readTime}</span>
                  </div>
                  <h2 className="font-[var(--font-cormorant)] text-2xl leading-tight mb-3">
                    {article.title}
                  </h2>
                  <p className="text-white/50 text-sm leading-relaxed line-clamp-3 mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-white/30">{article.date}</span>
                      {likeCounts[article.slug] > 0 && (
                        <span className="text-xs text-white/30 flex items-center gap-1">
                          ❤️ {likeCounts[article.slug]}
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-white/40 group-hover:text-white transition-colors">
                      Read →
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
