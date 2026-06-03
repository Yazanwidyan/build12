import { motion } from 'framer-motion'
import { useAdventureStore } from '@/stores/adventureStore'

const SECTIONS = [
  { key: 'header', label: 'Header', icon: '🔝', hint: 'Site title + navigation' },
  { key: 'hero',   label: 'Hero Section', icon: '⭐', hint: 'Big headline + button' },
  { key: 'footer', label: 'Footer', icon: '🔚', hint: 'Copyright + links' },
]

export default function Blueprint() {
  const website = useAdventureStore((s) => s.website)
  const built = SECTIONS.filter((s) => website.sections[s.key]?.built).length

  return (
    <div className="flex flex-col gap-2 w-full">
      <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider text-center">
        {website.name || 'My Website'} — Blueprint
      </p>

      {SECTIONS.map((s, i) => {
        const isBuilt = website.sections[s.key]?.built
        return (
          <motion.div
            key={s.key}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`flex items-center gap-3 rounded-xl border-2 px-3 py-2 transition-all duration-300 ${
              isBuilt ? 'border-teki-300 bg-teki-50' : 'border-dashed border-gray-300 bg-gray-50'
            }`}
          >
            <span className="text-lg">{s.icon}</span>
            <div className="flex-1">
              <p className={`text-sm font-semibold ${isBuilt ? 'text-teki-700' : 'text-gray-500'}`}>{s.label}</p>
              <p className="text-sm text-gray-400">{s.hint}</p>
            </div>
            <span className="text-base">{isBuilt ? '✅' : '⬜'}</span>
          </motion.div>
        )
      })}

      <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden mt-1">
        <motion.div
          className="h-full bg-teki-500 rounded-full"
          animate={{ width: `${(built / 3) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  )
}
