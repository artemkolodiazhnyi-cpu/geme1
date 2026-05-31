import type { Metadata } from 'next'
import { Cormorant_Garamond, Syne } from 'next/font/google'
import './globals.css'
import { SupabaseProvider } from '@/contexts/SupabaseContext'
import { CartProvider } from '@/contexts/CartContext'
import Topbar from '@/components/Topbar'
import CartDrawer from '@/components/CartDrawer'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-syne',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'géme — outfit. inspired. yours.',
  description: 'Discover, swipe, and shop complete outfits. Editorial fashion inspiration meets instant checkout.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${syne.variable}`}>
      <body style={{ fontFamily: 'var(--font-syne), sans-serif' }}>
        <SupabaseProvider>
          <CartProvider>
            <Topbar />
            <CartDrawer />
            {children}
          </CartProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
