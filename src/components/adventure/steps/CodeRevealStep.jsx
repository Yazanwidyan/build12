import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code2 } from 'lucide-react'
import { useTekiStore } from '@/stores/tekiStore'
import { useAdventureStore } from '@/stores/adventureStore'
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
  const speak = useTekiStore((s) => s.speak)
  const website = useAdventureStore((s) => s.website)
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
        <Button variant="outline" color="blue" fullWidth icon={<Code2 size={16} />} onClick={() => setRevealed(true)}>
          Show me the code!
        </Button>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="flex flex-col gap-2"
          >
            <span className={`self-start text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded border ${langColor}`}>
              {step.language}
            </span>
            <pre className="bg-gray-900 text-gray-100 rounded-xl p-3 text-xs leading-relaxed overflow-x-auto">
              <code>{code}</code>
            </pre>
            {explanation && (
              <div className="rounded-xl p-2.5" style={{ backgroundColor: 'rgba(253,224,71,0.1)', border: '1px solid rgba(253,224,71,0.25)' }}>
                <p className="text-xs leading-relaxed" style={{ color: '#fde047' }}>💡 {explanation}</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      )}

      <Button variant="solid" color="blue" fullWidth onClick={onComplete}>
        {step.action || 'Continue'}
      </Button>
    </motion.div>
  )
}
