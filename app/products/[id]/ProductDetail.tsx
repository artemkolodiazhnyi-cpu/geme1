'use client'

import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import type { OutfitItem } from '@/types/database'

interface ProductOutfit {
  id: number | string
  name: string
  emoji: string | null
  style: string | null
  image_url: string | null
  brand: { name: string; country: string | null }
}

interface ProductWithOutfit extends OutfitItem {
  outfit: ProductOutfit
}

interface Props {
  product: ProductWithOutfit
  completeItems: OutfitItem[]
}

export default function ProductDetail({ product, completeItems }: Props) {
  const { dispatch } = useCart()
  const [selected, setSelected] = useState<string | null>(null)
  const sizes = product.sizes.split(',').map(s => s.trim())

  function addToCart() {
    if (!selected) return
    dispatch({
      type: 'ADD_ITEM',
      item: {
        id: `item-${product.id}-${selected}`,
        name: `${product.name} (${selected})`,
        emoji: product.outfit?.emoji ?? '👗',
        price: Number(product.price),
        quantity: 1,
      },
    })
    dispatch({ type: 'OPEN_CART' })
  }

  return (
    <>
      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-24">

        {/* Left — product image */}
        <div className="flex flex-col gap-4">
          <div
            className="relative w-full rounded-2xl overflow-hidden bg-black border border-white/10"
            style={{ aspectRatio: '2/3' }}
          >
            {product.outfit?.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.outfit.image_url}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-8xl select-none">
                {product.outfit?.emoji ?? '👗'}
              </div>
            )}
          </div>
          <div className="text-center">
            <p className="text-xs text-white/30">
              Part of{' '}
              <a
                href={`/outfit/${product.outfit_id}`}
                className="text-white/50 hover:text-white transition-colors underline underline-offset-2"
              >
                {product.outfit?.name}
              </a>{' '}
              look
            </p>
            <a
              href={`/outfit/${product.outfit_id}`}
              className="text-xs text-[#e63946] hover:text-[#c42a35] transition-colors mt-1 inline-block"
            >
              View full look →
            </a>
          </div>
        </div>

        {/* Right — info + purchase */}
        <div className="flex flex-col gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-white/40 bg-white/5 px-3 py-1 rounded-full">
              {product.category}
            </span>
            <h1
              className="font-[var(--font-cormorant)] leading-tight mt-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              {product.name}
            </h1>
            <p className="text-white/40 text-sm uppercase tracking-wider mt-1">
              {product.outfit?.brand?.name}
              {product.outfit?.brand?.country && (
                <span className="text-white/25"> · {product.outfit.brand.country}</span>
              )}
            </p>
            {product.description && (
              <p className="text-white/60 text-sm leading-relaxed mt-4">{product.description}</p>
            )}
            <p className="text-[#e63946] font-bold text-3xl mt-4">
              €{Number(product.price).toLocaleString()}
            </p>
          </div>

          {/* Size selector */}
          <div>
            <p className="text-xs uppercase tracking-widest text-white/40 mb-3">Select Size</p>
            <div className="flex flex-wrap gap-2">
              {sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelected(size)}
                  className={`px-4 py-2 text-sm rounded-full border transition-all ${
                    selected === size
                      ? 'bg-white text-black border-white'
                      : 'border-white/20 text-white/60 hover:border-white/50'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-3">
            <button
              onClick={addToCart}
              disabled={!selected}
              className={`w-full py-4 rounded-full text-base font-medium transition-all ${
                selected
                  ? 'bg-[#e63946] hover:bg-[#c42a35] text-white'
                  : 'bg-white/5 text-white/20 cursor-not-allowed'
              }`}
            >
              {selected ? `Add to Bag — €${Number(product.price).toLocaleString()}` : 'Select a size'}
            </button>
            <p className="text-xs text-white/25 text-center">Free returns · Authentic guaranteed</p>
          </div>
        </div>
      </div>

      {/* Complete the look */}
      {completeItems.length > 0 && (
        <div className="border-t border-white/10 pt-16">
          <h2
            className="font-[var(--font-cormorant)] mb-8"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
          >
            Complete the look
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {completeItems.map(item => {
              const itemSizes = item.sizes.split(',').map(s => s.trim())
              return (
                <a
                  key={item.id}
                  href={`/products/${item.id}`}
                  className="border border-white/10 rounded-2xl p-5 flex flex-col gap-3 hover:border-white/30 transition-all bg-[#111]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <span className="text-xs uppercase tracking-wider text-white/30 bg-white/5 px-2 py-1 rounded-full">
                        {item.category}
                      </span>
                      <p className="font-medium mt-2 leading-snug">{item.name}</p>
                      {item.description && (
                        <p className="text-xs text-white/40 leading-relaxed mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <p className="text-[#e63946] font-bold flex-shrink-0">
                      €{Number(item.price).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {itemSizes.slice(0, 5).map(s => (
                      <span key={s} className="px-2 py-0.5 text-xs rounded-full border border-white/15 text-white/40">
                        {s}
                      </span>
                    ))}
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}
