import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTekiStore } from '@/stores/tekiStore'
import { useAdventureStore } from '@/stores/adventureStore'
import { useAgeConfig } from '@/engines/ageEngine'
import Button from '@/components/ui/Button'

// ── Shared helpers ─────────────────────────────────────────────────────────────

const LANG_BADGE = {
  jsx:        'bg-teki-50 border-teki-200 text-teki-700',
  javascript: 'bg-yellow-50 border-yellow-200 text-yellow-700',
  html:       'bg-orange-50 border-orange-200 text-orange-700',
  css:        'bg-blue-50 border-blue-200 text-blue-700',
}

function CodePanel({ step, value, explanation }) {
  if (!step.codeReveal) return null
  const lang    = step.language || 'jsx'
  const badge   = LANG_BADGE[lang] || LANG_BADGE.jsx
  const display = step.codeReveal.replace(/\{\{value\}\}/g, value ?? '')

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-2"
    >
      <span className={`self-start text-[10px] font-black uppercase tracking-wide px-2 py-0.5 rounded border ${badge}`}>
        {lang}
      </span>
      <pre className="bg-gray-900 text-gray-100 rounded-xl p-3 text-xs leading-relaxed overflow-x-auto">
        <code>{display}</code>
      </pre>
      {explanation && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5">
          <p className="text-xs text-amber-800 leading-relaxed">💡 {explanation}</p>
        </div>
      )}
    </motion.div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function ReactLiveDemoStep({ step, onComplete }) {
  const speak        = useTekiStore((s) => s.speak)
  const setReactDemo = useAdventureStore((s) => s.setReactDemo)
  const reactDemo    = useAdventureStore((s) => s.reactDemo)
  const updateStyles = useAdventureStore((s) => s.updateStyles)
  const updateSection = useAdventureStore((s) => s.updateSection)
  const { ageGroup } = useAgeConfig()

  const [selected, setSelected]     = useState(null)
  const [textValue, setTextValue]    = useState(step.defaultValue || '')
  const [newPetName, setNewPetName]  = useState('')
  const [connectedRoutes, setConnectedRoutes] = useState([])
  const [showCode, setShowCode]      = useState(false)
  const [confirmed, setConfirmed]    = useState(false)

  const explanation = step.explanation?.[ageGroup] ?? step.explanation?.junior ?? ''

  useEffect(() => {
    speak(step.teki || '', { mood: step.mood || 'happy' })
    if (step.demoInit) setReactDemo(step.demoInit)
    // Reset interaction state on remount
    setSelected(null)
    setTextValue(step.defaultValue || '')
    setNewPetName('')
    setConnectedRoutes([])
    setShowCode(false)
    setConfirmed(false)
  }, [step.id])

  function confirm(value) {
    setConfirmed(true)
    if (step.successMessage) {
      setTimeout(() => speak([step.successMessage], { mood: 'excited' }), 500)
    }
    setTimeout(() => setShowCode(true), 700)
  }

  // ── button-style ─────────────────────────────────────────────────────────────
  if (step.demoType === 'button-style') {
    return (
      <Wrapper>
        <Label>Button Style:</Label>
        <div className="grid grid-cols-3 gap-2">
          {step.options.map((opt) => (
            <motion.button
              key={opt.value}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setSelected(opt.value)
                setReactDemo({ buttonStyle: opt.value })
                updateStyles({ buttonStyle: opt.value })
                confirm(opt.value)
              }}
              className={`py-3 border-2 rounded-xl text-sm font-semibold flex flex-col items-center gap-1.5 transition-all
                ${selected === opt.value
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-gray-200 text-gray-600 hover:border-indigo-300'}`}
            >
              <span className="text-xl">
                {opt.value === 'pill' ? '💊' : opt.value === 'square' ? '⬛' : '🔘'}
              </span>
              {opt.label}
              {selected === opt.value && <span className="text-indigo-500 text-xs">✓ Active</span>}
            </motion.button>
          ))}
        </div>
        <AnimatePresence>
          {showCode && (
            <motion.div key="code" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-2 mt-1">
              <CodePanel step={step} value={selected} explanation={explanation} />
              <Button variant="solid" color="blue" fullWidth onClick={onComplete}>{step.action || 'Next Chapter!'}</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </Wrapper>
    )
  }

  // ── text-editor ───────────────────────────────────────────────────────────────
  if (step.demoType === 'text-editor') {
    return (
      <Wrapper>
        <Label>Button text:</Label>
        <div className="flex gap-2">
          <input
            type="text"
            value={textValue}
            onChange={(e) => {
              setTextValue(e.target.value)
              setReactDemo({ heroBtnText: e.target.value || null })
            }}
            placeholder={step.placeholder || 'Type here…'}
            className="flex-1 border-2 border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-indigo-400 transition-colors"
            onKeyDown={(e) => e.key === 'Enter' && textValue.trim() && confirm(textValue)}
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => { if (textValue.trim()) confirm(textValue) }}
            disabled={!textValue.trim()}
            className="px-4 py-2 bg-indigo-500 text-white rounded-xl text-sm font-semibold disabled:opacity-40 transition-opacity"
          >
            Set
          </motion.button>
        </div>
        {textValue && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="bg-gray-900 rounded-xl px-3 py-2"
          >
            <code className="text-xs text-green-400 font-mono">{`<Button text="${textValue}" />`}</code>
          </motion.div>
        )}
        <AnimatePresence>
          {showCode && (
            <motion.div key="code" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-2">
              <CodePanel step={step} value={textValue} explanation={explanation} />
              <Button variant="solid" color="blue" fullWidth onClick={onComplete}>{step.action || 'Next Chapter!'}</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </Wrapper>
    )
  }

  // ── theme-toggle ──────────────────────────────────────────────────────────────
  if (step.demoType === 'theme-toggle') {
    return (
      <Wrapper>
        <Label>Website Theme:</Label>
        <div className="grid grid-cols-2 gap-2">
          {step.options.map((opt) => (
            <motion.button
              key={String(opt.value)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setSelected(opt.label)
                setReactDemo({ darkMode: opt.value, showThemeBar: true })
                confirm(opt.label)
              }}
              className={`py-4 px-4 border-2 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all
                ${selected === opt.label
                  ? opt.value
                    ? 'border-slate-600 bg-slate-800 text-white'
                    : 'border-amber-300 bg-amber-50 text-amber-800'
                  : 'border-gray-200 text-gray-600 hover:border-gray-400'}`}
            >
              {opt.value ? '🌙' : '☀️'} {opt.label}
            </motion.button>
          ))}
        </div>
        <AnimatePresence>
          {showCode && (
            <motion.div key="code" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-2">
              <CodePanel step={step} value={selected} explanation={explanation} />
              <Button variant="solid" color="blue" fullWidth onClick={onComplete}>{step.action || 'Interesting!'}</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </Wrapper>
    )
  }

  // ── add-setting ───────────────────────────────────────────────────────────────
  if (step.demoType === 'add-setting') {
    return (
      <Wrapper>
        <Label>Add a setting:</Label>
        <div className="flex flex-col gap-2">
          {step.options.map((opt) => (
            <motion.button
              key={opt.value}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelected(opt.value)
                setReactDemo({ activeSettingDemo: opt.value, mode: 'state' })
                confirm(opt.value)
              }}
              className={`py-3 px-4 border-2 rounded-xl text-sm font-semibold text-left flex items-center gap-3 transition-all
                ${selected === opt.value
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-gray-200 text-gray-700 hover:border-indigo-300'}`}
            >
              <span className="text-xl">{opt.icon}</span>
              <span className="flex-1">{opt.label}</span>
              {selected === opt.value && <span className="text-indigo-500 font-bold">✓</span>}
            </motion.button>
          ))}
        </div>
        <AnimatePresence>
          {showCode && (
            <motion.div key="code" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-2">
              <CodePanel step={step} value={selected} explanation={explanation} />
              <Button variant="solid" color="blue" fullWidth onClick={onComplete}>{step.action || 'Next Chapter!'}</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </Wrapper>
    )
  }

  // ── event-picker ──────────────────────────────────────────────────────────────
  if (step.demoType === 'event-picker') {
    return (
      <Wrapper>
        <Label>Button action:</Label>
        <div className="flex flex-col gap-2">
          {step.options.map((opt) => (
            <motion.button
              key={opt.value}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelected(opt.value)
                setReactDemo({ eventAction: opt.value, mode: 'events' })
                confirm(opt.value)
              }}
              className={`py-3 px-4 border-2 rounded-xl text-sm font-semibold text-left flex items-center gap-3 transition-all
                ${selected === opt.value
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-gray-200 text-gray-700 hover:border-indigo-300'}`}
            >
              <span className="text-xl">{opt.icon}</span>
              <span className="flex-1">{opt.label}</span>
              {selected === opt.value && <span className="text-green-500 font-bold">✓</span>}
            </motion.button>
          ))}
        </div>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-xs text-gray-500 text-center"
          >
            Try clicking the button in the preview →
          </motion.div>
        )}
        <AnimatePresence>
          {showCode && (
            <motion.div key="code" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-2">
              <CodePanel step={step} value={selected} explanation={explanation} />
              <Button variant="solid" color="blue" fullWidth onClick={onComplete}>{step.action || 'Next Chapter!'}</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </Wrapper>
    )
  }

  // ── add-pet ───────────────────────────────────────────────────────────────────
  if (step.demoType === 'add-pet') {
    const currentPets = reactDemo.pets?.length ? reactDemo.pets
      : ['Buddy 🐶', 'Whiskers 🐱', 'Hopscotch 🐰']

    return (
      <Wrapper>
        <div className="flex items-center justify-between">
          <Label className="mb-0">Add a pet to the gallery:</Label>
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
            {currentPets.length} pets
          </span>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newPetName}
            onChange={(e) => setNewPetName(e.target.value)}
            placeholder="e.g. Mochi 🐱"
            className="flex-1 border-2 border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-indigo-400 transition-colors"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && newPetName.trim()) {
                const updated = [...currentPets, newPetName.trim()]
                setReactDemo({ pets: updated, showPets: true, mode: 'map' })
                setNewPetName('')
                confirm(newPetName.trim())
              }
            }}
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            disabled={!newPetName.trim()}
            onClick={() => {
              if (!newPetName.trim()) return
              const updated = [...currentPets, newPetName.trim()]
              setReactDemo({ pets: updated, showPets: true, mode: 'map' })
              setNewPetName('')
              confirm(newPetName.trim())
            }}
            className="px-4 py-2 bg-indigo-500 text-white rounded-xl text-sm font-semibold disabled:opacity-40"
          >
            Add
          </motion.button>
        </div>
        <AnimatePresence>
          {showCode && (
            <motion.div key="code" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-2">
              <CodePanel step={step} value={null} explanation={explanation} />
              <Button variant="solid" color="blue" fullWidth onClick={onComplete}>{step.action || 'Next Chapter!'}</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </Wrapper>
    )
  }

  // ── user-type ─────────────────────────────────────────────────────────────────
  if (step.demoType === 'user-type') {
    return (
      <Wrapper>
        <Label>Who's visiting?</Label>
        <div className="flex gap-2">
          {step.options.map((opt) => (
            <motion.button
              key={opt.value}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setSelected(opt.value)
                setReactDemo({ userType: opt.value, showConditional: true, mode: 'conditional' })
                confirm(opt.value)
              }}
              className={`flex-1 py-3 border-2 rounded-xl text-sm font-semibold flex flex-col items-center gap-1.5 transition-all
                ${selected === opt.value
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-gray-200 text-gray-600 hover:border-indigo-300'}`}
            >
              <span className="text-2xl">{opt.icon}</span>
              {opt.label}
            </motion.button>
          ))}
        </div>
        <AnimatePresence>
          {showCode && (
            <motion.div key="code" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-2">
              <CodePanel step={step} value={selected} explanation={explanation} />
              <Button variant="solid" color="blue" fullWidth onClick={onComplete}>{step.action || 'Next Chapter!'}</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </Wrapper>
    )
  }

  // ── connect-routes ────────────────────────────────────────────────────────────
  if (step.demoType === 'connect-routes') {
    const pages = ['Home', 'About', 'Gallery', 'Contact']
    const allConnected = connectedRoutes.length === pages.length

    const toggleRoute = (page) => {
      const updated = connectedRoutes.includes(page)
        ? connectedRoutes.filter((r) => r !== page)
        : [...connectedRoutes, page]
      setConnectedRoutes(updated)
      setReactDemo({ pagesConnected: updated.length === pages.length, connectedRoutes: updated, mode: 'routing' })
      if (updated.length === pages.length) confirm(true)
    }

    return (
      <Wrapper>
        <Label>Connect your pages:</Label>
        <div className="flex flex-col gap-1.5">
          {pages.map((page) => {
            const connected = connectedRoutes.includes(page)
            return (
              <motion.button
                key={page}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleRoute(page)}
                className={`flex items-center justify-between px-4 py-2.5 border-2 rounded-xl text-sm font-semibold transition-all
                  ${connected
                    ? 'border-green-400 bg-green-50 text-green-700'
                    : 'border-gray-200 text-gray-600 hover:border-indigo-300'}`}
              >
                <span>{page}</span>
                <span className="text-xs">
                  {connected ? '🟢 Connected' : '⚪ Click to connect'}
                </span>
              </motion.button>
            )
          })}
        </div>
        {allConnected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-xs text-center text-green-600 font-semibold"
          >
            All pages connected! Try the nav links in the preview. ✅
          </motion.div>
        )}
        <AnimatePresence>
          {showCode && (
            <motion.div key="code" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-2">
              <CodePanel step={step} value={null} explanation={explanation} />
              <Button variant="solid" color="blue" fullWidth onClick={onComplete}>{step.action || 'Next Chapter!'}</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </Wrapper>
    )
  }

  // ── theme-selector ────────────────────────────────────────────────────────────
  if (step.demoType === 'theme-selector') {
    return (
      <Wrapper>
        <Label>Choose a theme:</Label>
        <div className="grid grid-cols-2 gap-2">
          {step.options.map((opt) => (
            <motion.button
              key={opt.value}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setSelected(opt.value)
                setReactDemo({ themeColor: opt.value, showThemeSelector: true, mode: 'theme-selector' })
                confirm(opt.value)
              }}
              className={`py-3 border-2 rounded-xl text-sm font-semibold flex flex-col items-center gap-1.5 transition-all
                ${selected === opt.value ? 'border-current' : 'border-gray-200 hover:border-gray-400'}`}
              style={selected === opt.value ? { background: opt.value + '22', borderColor: opt.value, color: opt.value } : {}}
            >
              <span className="text-2xl">{opt.icon}</span>
              {opt.label}
            </motion.button>
          ))}
        </div>
        <AnimatePresence>
          {showCode && (
            <motion.div key="code" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-2">
              <CodePanel step={step} value={null} explanation={explanation} />
              <Button variant="solid" color="blue" fullWidth onClick={onComplete}>{step.action || 'Amazing!'}</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </Wrapper>
    )
  }

  // ── fallback ──────────────────────────────────────────────────────────────────
  return (
    <Wrapper>
      <Button variant="solid" color="blue" fullWidth onClick={onComplete}>{step.action || 'Continue'}</Button>
    </Wrapper>
  )
}

// ── Tiny shared layout helpers ─────────────────────────────────────────────────
function Wrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-3"
    >
      {children}
    </motion.div>
  )
}

function Label({ children, className = '' }) {
  return (
    <p className={`text-sm font-semibold text-gray-600 mb-0.5 ${className}`}>{children}</p>
  )
}
