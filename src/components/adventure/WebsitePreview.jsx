import { useState } from 'react'
import { motion } from 'framer-motion'
import { Monitor, Smartphone } from 'lucide-react'
import { useAdventureStore } from '@/stores/adventureStore'
import { generateWebsiteHTML } from '@/engines/previewEngine'

export default function WebsitePreview() {
  const website    = useAdventureStore((s) => s.website)
  const reactDemo  = useAdventureStore((s) => s.reactDemo)
  const [viewport, setViewport] = useState('desktop')

  const html = generateWebsiteHTML(website, reactDemo)
  const siteName = (website.name || 'mywebsite').toLowerCase().replace(/\s+/g, '')

  return (
    <div className="flex flex-col h-full bg-gray-100">
      {/* Browser chrome */}
      <div className="bg-gray-200 border-b border-gray-300 px-3 py-2 flex items-center gap-2 shrink-0">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-gray-500 font-mono flex items-center gap-1 truncate">
          <span className="text-green-600">🔒</span>
          <span className="truncate">{siteName}.mysite.com</span>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => setViewport('desktop')}
            className={`p-1 rounded transition-colors ${viewport === 'desktop' ? 'text-teki-600 bg-teki-100' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Monitor size={14} />
          </button>
          <button
            onClick={() => setViewport('mobile')}
            className={`p-1 rounded transition-colors ${viewport === 'mobile' ? 'text-teki-600 bg-teki-100' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Smartphone size={14} />
          </button>
        </div>
      </div>

      {/* Preview */}
      <div className="flex-1 overflow-hidden flex items-stretch justify-center bg-gray-300 p-2">
        <motion.div
          layout
          className="bg-white shadow-lg overflow-hidden rounded-sm flex flex-col"
          style={{ width: viewport === 'mobile' ? 375 : '100%', maxWidth: viewport === 'mobile' ? 375 : '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <iframe
            srcDoc={html}
            className="w-full flex-1 border-0 block"
            title="Website Preview"
            sandbox="allow-scripts"
          />
        </motion.div>
      </div>
    </div>
  )
}
