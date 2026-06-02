'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import type { OutfitItem, OutfitWithRelations } from '@/types/database'

interface Props {
  outfit: OutfitWithRelations
  items: OutfitItem[]
}

export default function ShopTheLook({ outfit, items }: Props) {
  const { dispatch } = useCart()
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({})

  const totalPrice = items.reduce((sum, item) => sum + Number(item.price), 0)

  function handleSizeSelect(itemId: number, size: string) {
    setSelectedSizes(prev => ({ ...prev, [String(itemId)]: size }))
  }

  function addToCart(item: OutfitItem) {
    const size = selectedSizes[String(item.id)]
    if (!size) return
    dispatch({
      type: 'ADD_ITEM',
      item: {
        id: `item-${item.id}-${size}`,
        name: `${item.name} (${size})`,
        emoji: outfit.emoji ?? '👗',
        price: Number(item.price),
        quantity: 1,
      },
    })
    dispatch({ type: 'OPEN_CART' })
  }

  function handleAddFullLook() {
    items.forEach(item => {
      const size = selectedSizes[String(item.id)] ?? item.sizes.split(',')[0].trim()
      dispatch({
        type: 'ADD_ITEM',
        item: {
          id: `item-${item.id}-${size}`,
          name: `${item.name} (${size})`,
          emoji: outfit.emoji ?? '👗',
          price: Number(item.price),
          quantity: 1,
        },
      })
    })
    dispatch({ type: 'OPEN_CART' })
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

      {/* Left — full vertical outfit photo */}
      <div className="flex flex-col gap-4">
        <p className="text-xs uppercase tracking-widest text-white/40">Full Look</p>
        <div
          className="relative w-full rounded-2xl overflow-hidden bg-black border border-white/10"
          style={{ aspectRatio: '2/3' }}
        >
          {outfit.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={outfit.image_url}
              alt={`${outfit.name} full look`}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-8xl select-none">
              {outfit.emoji ?? '👗'}
            </div>
          )}
        </div>
        <p className="text-sm text-white/40 text-center italic">
          {outfit.name} — {outfit.brand?.name}
        </p>
      </div>

      {/* Right — outfit info + items */}
      <div className="flex flex-col gap-6">

        {/* Outfit info */}
        <div>
          {outfit.style && (
            <span className="text-xs uppercase tracking-widest text-[#e63946]">{outfit.style}</span>
          )}
          <h1
            className="font-[var(--font-cormorant)] leading-tight mt-1"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            {outfit.name}
          </h1>
          <p className="text-white/50 text-sm uppercase tracking-wider mt-1">{outfit.brand?.name}</p>
          {outfit.description && (
            <p className="text-white/60 mt-3 leading-relaxed text-sm">{outfit.description}</p>
          )}
          <p className="text-[#e63946] font-bold text-xl mt-3">
            €{outfit.price_min}
            {outfit.price_max !== outfit.price_min && (
              <span className="text-white/30 font-normal text-base"> – €{outfit.price_max}</span>
            )}
          </p>
        </div>

        {/* Shop the Look items */}
        {items.length > 0 ? (
          <>
            <div>
              <p className="text-xs uppercase tracking-widest text-white/40 mb-4">Shop the Look</p>
              <div className="flex flex-col gap-4">
                {items.map(item => {
                  const key = String(item.id)
                  const selected = selectedSizes[key]
                  const sizes = item.sizes.split(',').map(s => s.trim())
                  return (
                    <div
                      key={item.id}
                      className="border border-white/10 rounded-2xl p-4 flex flex-col gap-3"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <span className="text-xs uppercase tracking-wider text-white/40 bg-white/5 px-2 py-1 rounded-full">
                            {item.category}
                          </span>
                          <p className="font-medium mt-2 leading-snug">{item.name}</p>
                          {item.description && (
                            <p className="text-xs text-white/40 leading-relaxed mt-1">{item.description}</p>
                          )}
                        </div>
                        <p className="text-[#e63946] font-bold flex-shrink-0">
                          €{Number(item.price).toLocaleString()}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {sizes.map(size => (
                          <button
                            key={size}
                            onClick={() => handleSizeSelect(item.id, size)}
                            className={`px-3 py-1 text-xs rounded-full border transition-all ${
                              selected === size
                                ? 'bg-white text-black border-white'
                                : 'border-white/20 text-white/60 hover:border-white/50'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => addToCart(item)}
                        disabled={!selected}
                        className={`w-full py-2 rounded-full text-sm font-medium transition-all ${
                          selected
                            ? 'bg-white text-black hover:bg-white/90'
                            : 'bg-white/10 text-white/30 cursor-not-allowed'
                        }`}
                      >
                        {selected ? 'Add to Bag' : 'Select a size'}
                      </button>
                      <Link
                        href={`/products/${item.id}`}
                        className="text-xs text-white/30 hover:text-white/60 transition-colors text-center"
                      >
                        View details →
                      </Link>
                    </div>
                  )
                })}
              </div>
            </div>

            <button
              onClick={handleAddFullLook}
              className="w-full py-4 bg-[#e63946] hover:bg-[#c42a35] text-white rounded-full font-medium text-lg transition-all"
            >
              Add Full Look — €{totalPrice.toLocaleString()}
            </button>
          </>
        ) : (
          <p className="text-white/30 text-sm">No items available for this outfit.</p>
        )}
      </div>
    </section>
  )
}
