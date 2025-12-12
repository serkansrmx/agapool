'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('') // Only for signup
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()
  const supabase = createClient()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (isSignUp) {
      // Sign Up Logic
      const res = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username }, // Saves to meta_data, triggered to profiles table
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      console.log('signUp result', res)
      if (res.error) {
        setError(res.error.message)
      } else {
        // After signup, automatically try to sign in (for convenience)
        const signInRes = await supabase.auth.signInWithPassword({ email, password })
        console.log('signIn after signUp result', signInRes)
        if (signInRes.error) {
          setError('Account created. Please check your email (if required) and try logging in.')
        } else {
          router.push('/')
        }
      }
    } else {
      // Sign In Logic
      const res = await supabase.auth.signInWithPassword({ email, password })
      console.log('signIn result', res)
      if (res.error) {
        // Show more detailed error in UI for debugging
        if (res.error.message.includes('Invalid login credentials')) {
          setError('Invalid email or password. PLEASE CHECK: Did you confirm your email?')
        } else {
          setError(res.error.message)
        }
      } else {
        router.push('/') // Redirect to dashboard
      }
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-dark px-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-gold/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-lightGold/10 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-sm space-y-6 border border-brand-gold/20 bg-brand-dark/50 p-8 rounded-xl backdrop-blur-md shadow-[0_0_40px_rgba(237,152,95,0.1)] relative z-10">

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-gold to-brand-lightGold">
            TCK AGALAR
          </h1>
          <p className="text-brand-gray/60 text-sm">Kısıtlı Erişim Havuzu</p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          {isSignUp && (
            <Input
              placeholder="Kullanıcı Adı (ör. Ahmet)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-black/20 border-brand-gold/20 text-brand-gray placeholder:text-brand-gray/30 focus-visible:ring-brand-gold/50"
              required
            />
          )}
          <Input
            type="email"
            placeholder="E-posta"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-black/20 border-brand-gold/20 text-brand-gray placeholder:text-brand-gray/30 focus-visible:ring-brand-gold/50"
            required
          />
          <Input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-black/20 border-brand-gold/20 text-brand-gray placeholder:text-brand-gray/30 focus-visible:ring-brand-gold/50"
            required
          />

          {error && <p className="text-red-400 text-xs text-center">{error}</p>}

          <Button type="submit" className="w-full bg-gradient-to-r from-brand-gold to-brand-lightGold text-brand-dark font-bold hover:opacity-90 transition-opacity" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : (isSignUp ? 'Başvuru Yap' : 'Havuz Girişi')}
          </Button>
        </form>

        <div className="text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs text-brand-gray/60 hover:text-brand-lightGold underline transition-colors"
          >
            {isSignUp ? "Zaten hesabın var mı? Giriş Yap" : "Yeni Aga mısın? Buradan Başvur"}
          </button>
        </div>
      </div>
    </div>
  )
}
