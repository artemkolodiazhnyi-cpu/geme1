'use client'

import { useState } from 'react'
import { useSupabase } from '@/contexts/SupabaseContext'

type Tab = 'signup' | 'login'

interface Props {
  onClose: () => void
  onSuccess: (msg: string) => void
}

export default function AuthModal({ onClose, onSuccess }: Props) {
  const { supabase } = useSupabase()
  const [tab, setTab] = useState<Tab>('signup')

  const [suName, setSuName] = useState('')
  const [suEmail, setSuEmail] = useState('')
  const [suPass, setSuPass] = useState('')
  const [suErrors, setSuErrors] = useState<{ name?: string; email?: string; pass?: string }>({})
  const [suLoading, setSuLoading] = useState(false)

  const [liEmail, setLiEmail] = useState('')
  const [liPass, setLiPass] = useState('')
  const [liErrors, setLiErrors] = useState<{ email?: string; pass?: string; general?: string }>({})
  const [liLoading, setLiLoading] = useState(false)

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)

  async function handleSignup() {
    const errs: typeof suErrors = {}
    if (!suName.trim()) errs.name = 'Enter your name'
    if (!isValidEmail(suEmail)) errs.email = 'Enter a valid email'
    if (suPass.length < 6) errs.pass = 'Minimum 6 characters'
    if (Object.keys(errs).length) { setSuErrors(errs); return }

    setSuLoading(true)
    setSuErrors({})
    const { error } = await supabase.auth.signUp({
      email: suEmail,
      password: suPass,
      options: { data: { full_name: suName.trim() } },
    })
    setSuLoading(false)
    if (error) { setSuErrors({ email: error.message }); return }
    onSuccess(`Welcome to géme, ${suName.split(' ')[0]}! 🎉`)
  }

  async function handleLogin() {
    const errs: typeof liErrors = {}
    if (!isValidEmail(liEmail)) errs.email = 'Enter a valid email'
    if (!liPass) errs.pass = 'Enter your password'
    if (Object.keys(errs).length) { setLiErrors(errs); return }

    setLiLoading(true)
    setLiErrors({})
    const { data, error } = await supabase.auth.signInWithPassword({ email: liEmail, password: liPass })
    setLiLoading(false)
    if (error) { setLiErrors({ general: 'Invalid email or password' }); return }
    const name = data.user.user_metadata?.full_name?.split(' ')[0] ?? ''
    onSuccess(`Welcome back${name ? `, ${name}` : ''}!`)
  }

  const inputCls = 'w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-base focus:outline-none focus:border-[#e63946] transition-colors'

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="relative w-[min(420px,calc(100vw-32px))] bg-[#111] rounded-3xl border border-white/10 p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-11 h-11 flex items-center justify-center rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="font-[var(--font-cormorant)] text-3xl tracking-widest lowercase mb-6">géme</div>

        <div className="flex border-b border-white/10 mb-6">
          {(['signup', 'login'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-3 text-xs uppercase tracking-[0.18em] border-b-2 transition-colors ${
                tab === t ? 'border-[#e63946] text-white' : 'border-transparent text-white/40 hover:text-white/70'
              }`}
            >
              {t === 'signup' ? 'Sign Up' : 'Log In'}
            </button>
          ))}
        </div>

        {tab === 'signup' && (
          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="su-name" className="sr-only">Full name</label>
              <input id="su-name" type="text" placeholder="Full name" autoComplete="name" value={suName}
                onChange={e => { setSuName(e.target.value); setSuErrors(p => ({ ...p, name: undefined })) }}
                className={inputCls} />
              {suErrors.name && <p className="text-[#e63946] text-xs mt-1 pl-1">{suErrors.name}</p>}
            </div>
            <div>
              <label htmlFor="su-email" className="sr-only">Email address</label>
              <input id="su-email" type="email" placeholder="Email address" autoComplete="email" value={suEmail}
                onChange={e => { setSuEmail(e.target.value); setSuErrors(p => ({ ...p, email: undefined })) }}
                className={inputCls} />
              {suErrors.email && <p className="text-[#e63946] text-xs mt-1 pl-1">{suErrors.email}</p>}
            </div>
            <div>
              <label htmlFor="su-pass" className="sr-only">Password</label>
              <input id="su-pass" type="password" placeholder="Password (min 6 chars)" autoComplete="new-password" value={suPass}
                onChange={e => { setSuPass(e.target.value); setSuErrors(p => ({ ...p, pass: undefined })) }}
                className={inputCls} />
              {suErrors.pass && <p className="text-[#e63946] text-xs mt-1 pl-1">{suErrors.pass}</p>}
            </div>
            <button onClick={handleSignup} disabled={suLoading}
              className="w-full py-3.5 rounded-full bg-[#e63946] text-white font-semibold uppercase tracking-widest text-sm hover:bg-[#c42a35] transition-colors disabled:opacity-50 mt-1">
              {suLoading ? 'Creating…' : 'Create Account'}
            </button>
          </div>
        )}

        {tab === 'login' && (
          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="li-email" className="sr-only">Email address</label>
              <input id="li-email" type="email" placeholder="Email address" autoComplete="email" value={liEmail}
                onChange={e => { setLiEmail(e.target.value); setLiErrors(p => ({ ...p, email: undefined, general: undefined })) }}
                className={inputCls} />
              {liErrors.email && <p className="text-[#e63946] text-xs mt-1 pl-1">{liErrors.email}</p>}
            </div>
            <div>
              <label htmlFor="li-pass" className="sr-only">Password</label>
              <input id="li-pass" type="password" placeholder="Password" autoComplete="current-password" value={liPass}
                onChange={e => { setLiPass(e.target.value); setLiErrors(p => ({ ...p, pass: undefined, general: undefined })) }}
                className={inputCls} />
              {liErrors.pass && <p className="text-[#e63946] text-xs mt-1 pl-1">{liErrors.pass}</p>}
            </div>
            {liErrors.general && <p className="text-[#e63946] text-xs pl-1">{liErrors.general}</p>}
            <button onClick={handleLogin} disabled={liLoading}
              className="w-full py-3.5 rounded-full bg-[#e63946] text-white font-semibold uppercase tracking-widest text-sm hover:bg-[#c42a35] transition-colors disabled:opacity-50 mt-1">
              {liLoading ? 'Logging in…' : 'Log In'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
