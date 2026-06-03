import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTekiStore } from '@/stores/tekiStore'
import { useAdventureStore } from '@/stores/adventureStore'
import Button from '@/components/ui/Button'

// Chapter "gateway" screen — shown at the start of each React chapter.
// Displays a chapter card (number + title) and TEKI speaks the intro messages.
export default function ReactGatewayStep({ step, onComplete }) {
  const speak        = useTekiStore((s) => s.speak)
  const resetReactDemo = useAdventureStore((s) => s.resetReactDemo)

  useEffect(() => {
    // Reset demo overlay when entering a new chapter
    resetReactDemo()
    if (step.messages?.length) {
      speak(step.messages, { mood: step.mood || 'excited' })
    }
  }, [step.id])

  const chapterColors = [
    'from-teki-500 to-teki-700',
    'from-teki-400 to-cyan-600',
    'from-teki-500 to-emerald-500',
    'from-gold-300 to-teki-500',
    'from-teki-600 to-teki-400',
    'from-gold-400 to-orange-500',
    'from-teki-500 to-teal-500',
    'from-gold-300 to-teki-600',
  ]
  const gradient = chapterColors[(step.chapterNumber - 1) % chapterColors.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-4"
    >
      {/* Chapter card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.08, type: 'spring', stiffness: 260, damping: 20 }}
        className={`bg-gradient-to-br ${gradient} rounded-2xl p-5 text-white shadow-lg`}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-black uppercase tracking-widest opacity-70 bg-white/20 px-2 py-0.5 rounded-full">
            Chapter {step.chapterNumber}
          </span>
          <span className="text-xs opacity-60">of 8</span>
        </div>
        <h2 className="text-xl font-black leading-tight">{step.chapterTitle}</h2>
        {step.chapterSubtitle && (
          <p className="text-sm opacity-75 mt-0.5 font-medium">({step.chapterSubtitle})</p>
        )}
      </motion.div>

      {/* Continue button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
      >
        <Button variant="action" size="lg" fullWidth onClick={onComplete}>
          {step.action || "Let's Go!"}
        </Button>
      </motion.div>
    </motion.div>
  )
}
