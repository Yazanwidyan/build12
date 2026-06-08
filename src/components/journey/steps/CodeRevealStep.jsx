import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code2 } from 'lucide-react'
import { useTekiStore } from '@/stores/tekiStore'
import { useJourneyStore } from '@/stores/journeyStore'
import { useAgeConfig, getExplanation } from '@/engines/ageEngine'
import { interpolateCode } from '@/engines/previewEngine'
import Button from '@/components/ui/Button'

const LANG_LABEL = {
  html: { label: 'HTML', color: '#f97316' },
  css:  { label: 'CSS',  color: '#3b82f6' },
  javascript: { label: 'JS', color: '#fde047' },
  jsx:  { label: 'JSX',  color: '#8b5cf6' },
}

export default function CodeRevealStep({ step, onComplete }) {
  const speak   = useTekiStore((s) => s.speak)
  const website = useJourneyStore((s) => s.website)
  const { ageGroup } = useAgeConfig()
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    speak(step.teki || 'Want to see the code?', { mood: 'thinking' })
  }, [step.id])

  const explanation = getExplanation(step, ageGroup)
  const code = interpolateCode(step.codeTemplate, website)
  const lang = LANG_LABEL[step.language] ?? { label: step.language?.toUpperCase() ?? 'CODE', color: '#94a3b8' }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-3"
    >
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-2 overflow-hidden"
          >
            {/* Language badge */}
            <div className="flex items-center gap-1.5">
              <Code2 size={13} style={{ color: lang.color }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: lang.color }}>
                {lang.label}
              </span>
            </div>

            {/* Code block */}
            <pre
              className="rounded-xl p-3 text-sm leading-relaxed overflow-x-auto"
              style={{
                backgroundColor: '#0f172a',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#e2e8f0',
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {code}
            </pre>

            {/* Explanation */}
            {explanation && (
              <div
                className="rounded-xl p-2.5 text-sm leading-relaxed"
                style={{
                  backgroundColor: 'rgba(253,224,71,0.08)',
                  border: '1px solid rgba(253,224,71,0.2)',
                  color: '#fde047',
                }}
              >
                💡 {explanation}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!revealed && (
        <Button
          variant="outline" color="blue" fullWidth icon={<Code2 size={16} />}
          onClick={() => setRevealed(true)}
        >
          Show me the code!
        </Button>
      )}

      <Button variant="solid" color="blue" fullWidth onClick={onComplete}>
        {step.action || 'Continue'}
      </Button>
    </motion.div>
  )
}
