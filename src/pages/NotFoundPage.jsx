import { useNavigate } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import TekiCharacter from '@/components/teki/TekiCharacter'
import Button from '@/components/ui/Button'

export default function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-app flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-6xl mx-auto w-full flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-6 max-w-sm"
        >
          <motion.div animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 2, repeat: Infinity }}>
            <TekiCharacter size={100} mood="surprised" />
          </motion.div>
          <div>
            <h1 className="text-7xl font-black mb-2" style={{ color: 'var(--app-border)' }}>404</h1>
            <h2 className="text-2xl font-black text-ink mb-2">Lost in the code!</h2>
            <p className="text-muted text-base leading-relaxed">
              This page doesn't exist. Even the best builders get lost sometimes!
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" color="neutral" onClick={() => window.history.back()}>Go back</Button>
            <Button variant="solid" color="blue" onClick={() => navigate({ to: '/' })}>Home</Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
