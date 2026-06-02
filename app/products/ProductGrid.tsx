'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'

interface ProductWithOutfit {
  id: number
  outfit_id: number
  name: string
  category: string
  price: number
  image_url: string | null
  sizes: string
  is_available: boolean
  outfit: {
    name: string
    emoji: string | null
    style: string | null
    brand: { name: string }
  }
}

const CATEGORIES = ['All', 'Top', 'Bottom', 'Outerwear', 'Footwear']

const fashionImages = [
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400',
  'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400',
  'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=400',
  'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400',
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400',
]

export default function ProductGrid({ products }: { products: ProductWithOutfit[] }) {
  const { dispatch } = useCart()
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>({})

  const filtered = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory)

  function handleSizeSelect(productId: number, size: string) {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }))
  }

  function addToCart(product: ProductWithOutfit) {
    const size = selectedSizes[product.id]
    if (!size) return
    dispatch({
      type: 'ADD_ITEM',
      item: {
        id: `item-${product.id}-${size}`,
        name: `${product.name} (${size})`,
        emoji: product.outfit?.emoji ?? '👗',
        price: Number(product.price),
        quantity: 1,
      },
    })
    dispatch({ type: 'OPEN_CART' })
  }

  return (
    <div>
      {/* Category filter */}
      <div className="flex gap-2 flex-wrap mb-8">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs border transition-all ${
              activeCategory === cat
                ? 'bg-[#e63946] border-[#e63946] text-white'
                : 'border-white/15 text-white/50 hover:border-white/30'
            }`}
          >
            {cat}
          </button>
        ))}
        <span className="self-center ml-2 text-xs text-white/30">
          {filtered.length} piece{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-24 text-white/30 text-sm">No products in this category.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((product, index) => {
            const sizes = product.sizes.split(',').map(s => s.trim())
            const selected = selectedSizes[product.id]
            return (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="border border-white/10 rounded-2xl p-5 flex flex-col gap-4 hover:border-white/30 transition-all bg-[#111] group"
              >
                {/* Visual */}
                <div className="aspect-square rounded-xl overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={fashionImages[index % fashionImages.length]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-widest text-white/30">
                    {product.category}
                  </span>
                  <h3 className="font-medium text-sm leading-snug">{product.name}</h3>
                  <p className="text-xs text-white/40">
                    from {product.outfit?.name} · {product.outfit?.brand?.name}
                  </p>
                  <p className="text-[#e63946] font-bold mt-1">€{Number(product.price).toLocaleString()}</p>
                </div>

                {/* Sizes */}
                <div className="flex flex-wrap gap-1" onClick={e => e.preventDefault()}>
                  {sizes.map(size => (
                    <button
                      key={size}
                      onClick={e => { e.preventDefault(); handleSizeSelect(product.id, size) }}
                      className={`px-2 py-1 text-xs rounded-full border transition-all ${
                        selected === size
                          ? 'bg-white text-black border-white'
                          : 'border-white/15 text-white/50 hover:border-white/40'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                {/* Add to bag */}
                <button
                  onClick={e => { e.preventDefault(); addToCart(product) }}
                  disabled={!selected}
                  className={`w-full py-2 rounded-full text-sm font-medium transition-all ${
                    selected
                      ? 'bg-white text-black hover:bg-white/90'
                      : 'bg-white/5 text-white/20 cursor-not-allowed'
                  }`}
                >
                  {selected ? 'Add to Bag' : 'Select size'}
                </button>

                {/* View full outfit link */}
                <span
                  onClick={e => { e.preventDefault(); window.location.href = `/outfit/${product.outfit_id}` }}
                  className="text-xs text-center text-white/30 hover:text-white/60 transition-colors cursor-pointer"
                >
                  View full look →
                </span>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
