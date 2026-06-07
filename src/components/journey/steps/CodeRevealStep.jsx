import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code2 } from 'lucide-react'
import { useTekiStore } from '@/stores/tekiStore'
import { useJourneyStore } from '@/stores/journeyStore'
import { useAgeConfig, getExplanation, getCodeExposure } from '@/engines/ageEngine'
import { interpolateCode } from '@/engines/previewEngine'
import Button from '@/components/ui/Button'

const LANG_COLORS = {
  html: 'bg-orange-50 border-orange-200 text-orange-700',
  css:  'bg-blue-50 border-blue-200 text-blue-700',
  javascript: 'bg-yellow-50 border-yellow-200 text-yellow-700',
  jsx:  'bg-teki-50 border-teki-200 text-teki-700',
}

export default function CodeRevealStep({ step, onComplete }) {
  const speak      = useTekiStore((s) => s.speak)
  const logCode    = useTekiStore((s) => s.logCode)
  const openLogPanel = useTekiStore((s) => s.openLogPanel)
  const website    = useJourneyStore((s) => s.website)
  const { ageGroup } = useAgeConfig()
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    speak(step.teki || 'Want to see the code?', { mood: 'thinking' })
  }, [step.id])

  const explanation = getExplanation(step, ageGroup)
  const code = interpolateCode(step.codeTemplate, website)
  const langColor = LANG_COLORS[step.language] ?? LANG_COLORS.javascript

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-3"
    >
      {!revealed ? (
        <Button
          variant="outline" color="blue" fullWidth icon={<Code2 size={16} />}
          onClick={() => {
            setRevealed(true)
            logCode({ language: step.language, code, explanation, label: step.language })
            openLogPanel()
          }}
        >
          Show me the code!
        </Button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold"
          style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', color: '#3b82f6' }}
        >
          <Code2 size={12} />
          Code added to Journey Log ←
        </motion.div>
      )}

      <Button variant="solid" color="blue" fullWidth onClick={onComplete}>
        {step.action || 'Continue'}
      </Button>
    </motion.div>
  )
}
