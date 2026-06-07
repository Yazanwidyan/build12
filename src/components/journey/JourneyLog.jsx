import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2 } from 'lucide-react'
import { useTekiStore } from '@/stores/tekiStore'
import TekiCharacter from '@/components/teki/TekiCharacter'

const LANG_LABEL = {
  html: { bg: '#7c3aed22', border: '#7c3aed55', text: '#c084fc', label: 'HTML' },
  css:  { bg: '#0ea5e922', border: '#0ea5e955', text: '#38bdf8', label: 'CSS'  },
  javascript: { bg: '#fbbf2422', border: '#fbbf2455', text: '#fcd34d', label: 'JS' },
  jsx:  { bg: '#3b82f622', border: '#3b82f655', text: '#93c5fd', label: 'JSX'  },
}

function MessageEntry({ entry }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-2 items-start"
    >
      <div className="shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px]"
        style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)' }}>
        <TekiCharacter size={14} mood="happy" />
      </div>
      <div className="flex-1 rounded-xl rounded-tl-none px-3 py-2 text-sm leading-relaxed"
        style={{ background: 'var(--app-raised)', border: '1px solid var(--app-border)', color: 'var(--ink-muted)' }}>
        {entry.text}
      </div>
    </motion.div>
  )
}

function CodeEntry({ entry }) {
  const lang = LANG_LABEL[entry.language] ?? LANG_LABEL.javascript

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-1.5"
    >
      {/* Language badge */}
      <div className="flex items-center gap-1.5">
        <div className="w-4 h-px" style={{ background: 'var(--app-border)' }} />
        <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full"
          style={{ background: lang.bg, border: `1px solid ${lang.border}`, color: lang.text }}>
          {lang.label}
        </span>
        <div className="flex-1 h-px" style={{ background: 'var(--app-border)' }} />
      </div>

      {/* Code block */}
      <pre className="rounded-xl p-3 text-xs leading-relaxed overflow-x-auto"
        style={{ background: '#0f172a', color: '#e2e8f0', border: '1px solid #1e293b' }}>
        <code>{entry.code}</code>
      </pre>

      {/* Explanation / hint */}
      {entry.explanation && (
        <div className="rounded-xl px-3 py-2 text-xs leading-relaxed"
          style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.25)', color: '#fcd34d' }}>
          💡 {entry.explanation}
        </div>
      )}
    </motion.div>
  )
}

function HintEntry({ entry }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl px-3 py-2 text-sm leading-relaxed"
      style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.25)', color: '#fcd34d' }}>
      💡 {entry.text}
    </motion.div>
  )
}

export default function JourneyLog() {
  const log          = useTekiStore((s) => s.log)
  const clearLog     = useTekiStore((s) => s.clearLog)
  const closeLogPanel = useTekiStore((s) => s.closeLogPanel)
  const bottomRef    = useRef(null)

  // Auto-scroll to newest entry
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [log.length])

  return (
    <div className="flex flex-col h-full"
      style={{ backgroundColor: 'var(--app-surface)', borderLeft: '1px solid var(--bubble-border)' }}>

      {/* Header */}
      <div className="shrink-0 flex items-center gap-2 px-4 h-9 border-b-2"
        style={{ borderColor: 'var(--app-border)' }}>
        <span className="text-xs font-black uppercase tracking-widest flex-1" style={{ color: '#3b82f6' }}>
          Journey Log
        </span>
        {log.length > 0 && (
          <button
            onClick={clearLog}
            className="p-1 rounded-lg opacity-50 hover:opacity-100 transition-opacity"
            style={{ color: 'var(--ink-muted)' }}
            title="Clear log"
          >
            <Trash2 size={12} />
          </button>
        )}
        <button
          onClick={closeLogPanel}
          className="p-1 rounded-lg opacity-60 hover:opacity-100 transition-opacity"
          style={{ color: 'var(--ink-muted)' }}
        >
          <X size={14} />
        </button>
      </div>

      {/* Entries */}
      <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-3">
        {log.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-4">
            <TekiCharacter size={48} mood="thinking" />
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--ink-faint)' }}>
              No messages yet
            </p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--ink-faint)' }}>
              TEKI's messages and code explanations will appear here as you progress.
            </p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {log.map((entry) => {
              if (entry.type === 'message') return <MessageEntry key={entry.id} entry={entry} />
              if (entry.type === 'code')    return <CodeEntry    key={entry.id} entry={entry} />
              if (entry.type === 'hint')    return <HintEntry    key={entry.id} entry={entry} />
              return null
            })}
          </AnimatePresence>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
