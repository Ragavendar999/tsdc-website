'use client'

import { signInWithEmailAndPassword } from 'firebase/auth'
import { Sparkles } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { firebaseAuth, hasFirebaseClientEnv } from '@/lib/firebase/client'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      if (!hasFirebaseClientEnv || !firebaseAuth) {
        throw new Error('Firebase login is not configured on this deployment yet.')
      }

      const credential = await signInWithEmailAndPassword(firebaseAuth, email, password)
      const idToken = await credential.user.getIdToken()

      const response = await fetch('/api/admin/session-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      })

      const payload = (await response.json()) as { error?: string }
      if (!response.ok) {
        throw new Error(payload.error || 'Unable to create admin session')
      }

      router.replace('/admin/masterclasses')
      router.refresh()
    } catch (loginError) {
      const message = loginError instanceof Error ? loginError.message : 'Unable to sign in'
      setError(message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="flex min-h-screen items-stretch bg-[#0e1330]">
      <div className="hidden flex-col justify-between p-10 lg:flex lg:w-[42%]">
        <div>
          <div className="inline-flex rounded-full border-[3px] border-white/20 bg-white px-3.5 py-2">
            <Image src="/logo.png" alt="TSDC Logo" width={96} height={32} />
          </div>
        </div>

        <div>
          <span className="inline-flex items-center gap-2 rounded-full border-[3px] border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white/70">
            <Sparkles size={12} className="text-[#ffcb53]" />
            Secure admin access
          </span>
          <h1 className="mt-5 text-5xl font-black leading-[0.92] tracking-[-0.06em] text-white">
            Firebase-backed
            <span className="block text-[#ff9736]">admin auth</span>
          </h1>
          <p className="mt-6 max-w-sm text-sm font-semibold leading-7 text-white/60">
            Sign in with your allowed admin email. Access is checked with Firebase Auth and a secure server session cookie.
          </p>
        </div>

        <div className="rounded-[1.4rem] border-[3px] border-white/15 bg-white/8 p-4 text-sm font-semibold leading-7 text-white/70">
          Only emails listed in <code className="font-mono">ADMIN_EMAILS</code> can enter the admin panel.
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center bg-[#fffdf7] px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <Image src="/logo.png" alt="TSDC Logo" width={100} height={32} />
          </div>

          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#3244b5]">Admin panel</p>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.05em] text-[#10163a]">Welcome back</h2>
          <p className="mt-1 text-sm text-[#667085]">Sign in with your Firebase admin account.</p>

          {!hasFirebaseClientEnv && (
            <p className="mt-6 rounded-2xl border-[3px] border-[#b42318] bg-[#fff1f2] px-4 py-3 text-sm font-bold text-[#b42318] shadow-[4px_4px_0_#b42318]">
              Firebase public environment variables are missing on this deployment. Add the `NEXT_PUBLIC_FIREBASE_*` values in Vercel and redeploy.
            </p>
          )}

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <label className="block">
              <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#3244b5]">Admin email</span>
              <input
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@yourdomain.com"
                autoComplete="username"
                className="w-full rounded-2xl border-[3px] border-[#10163a] bg-white px-4 py-3.5 font-semibold text-[#10163a] outline-none shadow-[4px_4px_0_#10163a] transition focus:border-[#3244b5]"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#3244b5]">Password</span>
              <input
                name="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
                className="w-full rounded-2xl border-[3px] border-[#10163a] bg-white px-4 py-3.5 font-semibold text-[#10163a] outline-none shadow-[4px_4px_0_#10163a] transition focus:border-[#3244b5]"
              />
            </label>

            {error && (
              <p className="rounded-2xl border-[3px] border-[#b42318] bg-[#fff1f2] px-4 py-3 text-sm font-bold text-[#b42318] shadow-[4px_4px_0_#b42318]">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-2xl border-[3px] border-[#10163a] bg-[#3244b5] px-5 py-4 font-black text-white shadow-[5px_5px_0_#10163a] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
