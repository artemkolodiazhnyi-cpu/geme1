import Link from 'next/link'

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="text-7xl mb-8">🎉</div>
      <h1 className="font-[var(--font-cormorant)] text-5xl mb-4">
        Order Confirmed!
      </h1>
      <p className="text-white/50 text-lg max-w-md leading-relaxed mb-10">
        Your order is on its way. Thank you for shopping with géme.
      </p>
      <Link
        href="/"
        className="px-8 py-3.5 rounded-full bg-[#e63946] text-white font-semibold uppercase tracking-widest text-sm hover:bg-[#c42a35] transition-colors"
      >
        Back to Home
      </Link>
    </main>
  )
}
