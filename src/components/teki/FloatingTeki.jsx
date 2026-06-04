import { useState, useRef, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Minus } from 'lucide-react'
import { useTekiStore } from '@/stores/tekiStore'
import { useAdventureStore } from '@/stores/adventureStore'
import { useMissionEngine } from '@/engines/missionEngine'
import { useProgressStore } from '@/stores/progressStore'
import { ACTS, LEVEL_INFO, getActsForLevel } from '@/data/curriculum'
import TekiCharacter from './TekiCharacter'
import MissionRunner from '@/components/adventure/MissionRunner'
import Button from '@/components/ui/Button'

const SECTION_H = { header:{built:62,unbuilt:116}, hero:{built:360,unbuilt:180}, footer:{built:80,unbuilt:100} }
const IFRAME_TOP = 90

function getSectionCenter(key, sections) {
  let top = IFRAME_TOP
  if (key !== 'header') top += sections.header.built ? 62 : 116
  if (key === 'footer')  top += sections.hero.built   ? 360 : 180
  const h = SECTION_H[key]
  return top + (sections[key].built ? h.built : h.unbuilt) / 2
}

// Shared TEKI float animation
const FLOAT = { animate: { y: [0, -7, 0] }, transition: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' } }

export default function FloatingTeki() {
  const { currentMessage, displayedText, isTyping, mood,
          setDisplayedText, messageTyped, highlightSection } = useTekiStore()
  const headerBuilt = useAdventureStore((s) => s.website.sections.header.built)
  const heroBuilt   = useAdventureStore((s) => s.website.sections.hero.built)
  const footerBuilt = useAdventureStore((s) => s.website.sections.footer.built)
  const { currentMission, currentStep, currentStepIndex, advanceStep, ageGroup } = useMissionEngine()
  const xp          = useProgressStore((s) => s.xp)
  const completedActs = useProgressStore((s) => s.completedActs)
  const [minimized, setMinimized] = useState(false)
  const constraintsRef = useRef(null)

  const isTraveling = !!highlightSection
  const shownText   = displayedText || currentMessage || ''
  const act         = ACTS.find((a) => a.number === currentMission?.act)
  const levelInfo   = LEVEL_INFO[ageGroup]
  const levelActs   = getActsForLevel(ageGroup)
  const doneActs    = completedActs.filter((id) => levelActs.some((a) => a.id === id)).length
  const levelPct    = levelActs.length > 0 ? Math.round((doneActs / levelActs.length) * 100) : 0

  // Top pixel position for traveling TEKI (aligned to section center)
  const travelTop = useMemo(() => {
    if (!highlightSection) return null
    const sections = {
      header: { built: headerBuilt },
      hero:   { built: heroBuilt },
      footer: { built: footerBuilt },
    }
    return Math.max(44, getSectionCenter(highlightSection, sections) - 36)
  }, [highlightSection, headerBuilt, heroBuilt, footerBuilt])

  // Typewriter
  useEffect(() => {
    if (!isTyping || !currentMessage) return
    let i = 0
    setDisplayedText('')
    const iv = setInterval(() => {
      i++
      setDisplayedText(currentMessage.slice(0, i))
      if (i >= currentMessage.length) { clearInterval(iv); setTimeout(messageTyped, 900) }
    }, 22)
    return () => clearInterval(iv)
  }, [currentMessage, isTyping])

  // Auto-expand when TEKI starts traveling
  useEffect(() => { if (isTraveling) setMinimized(false) }, [isTraveling])

  return (
    <>
      <div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-40" />

      <AnimatePresence mode="wait">

        {/* ── TRAVELING mode: side bubble + TEKI at section height ── */}
        {isTraveling && (
          <motion.div
            key="traveling"
            className="fixed z-50 flex items-center gap-2 select-none"
            style={{ right: 20 }}
            initial={{ opacity: 0, x: 30, top: travelTop }}
            animate={{ opacity: 1, x: 0, top: travelTop }}
            exit={{ opacity: 0, x: 30 }}
            transition={{
              opacity: { duration: 0.2 },
              x: { type: 'spring', stiffness: 260, damping: 34 },
              top: { type: 'spring', stiffness: 200, damping: 30 },
            }}
          >
            {/* Left panel: bubble + step action */}
            <div className="flex flex-col gap-2" style={{ width: 260 }}>
              {/* Bubble */}
              {shownText && (
                <div className="relative pointer-events-auto">
                  {/* Border tail (right-pointing) */}
                  <div className="absolute -right-[13px] top-1/2 -translate-y-1/2 w-0 h-0"
                    style={{ borderTop:'11px solid transparent', borderBottom:'11px solid transparent', borderLeft:'12px solid var(--app-border)' }} />
                  {/* Fill tail */}
                  <div className="absolute -right-[11px] top-1/2 -translate-y-1/2 w-0 h-0"
                    style={{ borderTop:'10px solid transparent', borderBottom:'10px solid transparent', borderLeft:'11px solid var(--bubble-bg)' }} />
                  <div className="rounded-2xl px-4 py-3 text-sm leading-relaxed font-mono"
                    style={{ backgroundColor:'var(--bubble-bg)', border:'2px solid var(--app-border)', color:'var(--bubble-text)' }}>
                    {shownText}
                    {isTyping && <span className="inline-block w-0.5 h-3.5 ml-0.5 align-middle animate-pulse" style={{ background:'#2cbaff' }} />}
                  </div>
                </div>
              )}
              {/* Step interaction (action buttons, forms, etc.) */}
              <div className="pointer-events-auto overflow-y-auto" style={{ maxHeight:'40vh' }}
                onPointerDown={(e) => e.stopPropagation()}>
                <MissionRunner step={currentStep} stepIndex={currentStepIndex} onComplete={advanceStep} />
              </div>
            </div>

            {/* TEKI */}
            <motion.div {...FLOAT}>
              <TekiCharacter size={72} mood={mood} />
            </motion.div>
          </motion.div>
        )}

        {/* ── DEFAULT mode: draggable full panel ── */}
        {!isTraveling && (
          <motion.div
            key="default"
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.06}
            dragMomentum={false}
            className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2 select-none"
            style={{ touchAction:'none', cursor:'grab' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            whileDrag={{ cursor:'grabbing' }}
          >
            {/* Panel */}
            <AnimatePresence>
              {!minimized && (
                <motion.div
                  initial={{ opacity:0, scale:0.88, y:16 }}
                  animate={{ opacity:1, scale:1, y:0 }}
                  exit={{ opacity:0, scale:0.88, y:12 }}
                  transition={{ type:'spring', stiffness:380, damping:28 }}
                  className="rounded-2xl shadow-2xl overflow-hidden"
                  style={{ backgroundColor:'var(--app-surface)', border:'2px solid var(--app-border)', width:380 }}
                >
                  {/* Title bar */}
                  <div className="flex items-center justify-between px-3 py-2 border-b-2 border-app-border"
                    style={{ background: levelInfo?.color ?? act?.color ?? '#2cbaff' }}>
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[10px] font-bold text-white/70 uppercase tracking-wider shrink-0">
                        {levelInfo?.emoji} {levelInfo?.label}
                      </span>
                      <span className="text-[11px] font-semibold text-white truncate">{currentMission?.title}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-sm text-yellow-300 font-semibold">⭐{xp}</span>
                      <Button variant="ghost" color="neutral" size="xs"
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={() => setMinimized(true)}
                        style={{ color:'rgba(255,255,255,0.6)' }}>
                        <Minus size={13} />
                      </Button>
                    </div>
                  </div>

                  {/* Level progress */}
                  <div className="px-3 pt-2 pb-1">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background:'var(--app-raised)' }}>
                        <motion.div className="h-full rounded-full"
                          style={{ background: levelInfo?.color ?? '#4f46e5' }}
                          animate={{ width:`${levelPct}%` }}
                          transition={{ duration:0.5 }} />
                      </div>
                      <span className="text-[10px] shrink-0" style={{ color:'var(--ink-faint)' }}>
                        {doneActs}/{levelActs.length} acts
                      </span>
                    </div>
                  </div>

                  {/* Bubble */}
                  <AnimatePresence mode="wait">
                    {shownText && (
                      <motion.div key={currentMessage}
                        initial={{ opacity:0, y:-4 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                        className="mx-3 mt-1 mb-2 rounded-xl px-4 py-3"
                        style={{ backgroundColor:'var(--bubble-bg)', border:'2px solid var(--app-border)' }}>
                        <p className="text-base leading-relaxed" style={{ color:'var(--bubble-text)' }}>
                          {shownText}
                          {isTyping && <span className="inline-block w-0.5 h-3.5 ml-0.5 align-middle animate-pulse" style={{ background:'#2cbaff' }} />}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Step interaction */}
                  <div className="px-3 pb-3 overflow-y-auto" style={{ maxHeight:'48vh' }}
                    onPointerDown={(e) => e.stopPropagation()}>
                    <MissionRunner step={currentStep} stepIndex={currentStepIndex} onComplete={advanceStep} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* TEKI character */}
            <motion.div {...FLOAT} className="self-end"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => setMinimized((m) => !m)}
              style={{ cursor:'pointer' }}>
              <div className="relative">
                <TekiCharacter size={72} mood={mood} />
                {minimized && currentMessage && (
                  <motion.span
                    initial={{ scale:0 }} animate={{ scale:[1,1.3,1] }} transition={{ repeat:Infinity, duration:1 }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-white text-[8px] font-bold">
                    !
                  </motion.span>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>
    </>
  )
}
