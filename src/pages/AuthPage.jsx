import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuthStore } from '@/stores/authStore'
import { useProfileStore } from '@/stores/profileStore'
import TekiCharacter from '@/components/teki/TekiCharacter'
import Button from '@/components/ui/Button'
import Header from '@/components/ui/Header'
import Input from '@/components/ui/Input'

const signupSchema = z.object({
  email:    z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})
const loginSchema = z.object({
  email:    z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
})

export default function AuthPage({ mode = 'signup' }) {
  const navigate = useNavigate()
  const { signup, login } = useAuthStore()
  const profile = useProfileStore()
  const [error, setError] = useState('')
  const isSignup = mode === 'signup'

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(isSignup ? signupSchema : loginSchema),
  })

  const onSubmit = (data) => {
    setError('')
    if (isSignup) {
      signup(data.email, data.password)
      navigate({ to: '/onboarding' })
    } else {
      const r = login(data.email, data.password)
      if (r.success) navigate({ to: profile.onboardingComplete ? '/dashboard' : '/onboarding' })
      else setError(r.error)
    }
  }

  return (
    <div className="min-h-screen bg-app flex flex-col">
      <Header />

      <div className="flex-1 flex flex-col items-center justify-center p-4">

      <div className="w-full max-w-sm">
        {/* TEKI */}
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <TekiCharacter size={80} mood="happy" />
          </motion.div>
        </div>

        {/* Card */}
        <div className="card p-8">
          <h1 className="text-2xl font-black text-ink mb-1 text-center">
            {isSignup ? 'Create your builder account' : 'Welcome back!'}
          </h1>
          <p className="text-base text-muted text-center mb-6">
            {isSignup ? 'Start your building adventure for free.' : 'Continue your adventure.'}
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Input label="Email" type="email" placeholder="you@example.com" error={errors.email?.message} {...register('email')} />
            <Input label="Password" type="password" placeholder="••••••••" error={errors.password?.message} {...register('password')} />
            {error && <p className="text-base text-red-400 text-center">{error}</p>}
            <Button variant="solid" color="blue" fullWidth type="submit" disabled={isSubmitting}>
              {isSignup ? 'Create account' : 'Log in'}
            </Button>
          </form>

          <p className="text-base text-muted text-center mt-4">
            {isSignup ? 'Already have an account? ' : "Don't have an account? "}
            <Button variant="link" color="blue" size="sm" onClick={() => navigate({ to: isSignup ? '/login' : '/signup' })}>
              {isSignup ? 'Log in' : 'Sign up free'}
            </Button>
          </p>
        </div>
      </div>
      </div>
    </div>
  )
}
