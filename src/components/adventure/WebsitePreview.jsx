import { useState } from 'react'
import { motion } from 'framer-motion'
import { Monitor, Smartphone } from 'lucide-react'
import { useAdventureStore } from '@/stores/adventureStore'
import { generateWebsiteHTML } from '@/engines/previewEngine'
import Button from '@/components/ui/Button'

export default function WebsitePreview() {
  const website   = useAdventureStore((s) => s.website)
  const reactDemo = useAdventureStore((s) => s.reactDemo)
  const [viewport, setViewport] = useState('desktop')

  const html     = generateWebsiteHTML(website, reactDemo)
  const siteName = (website.name || 'mywebsite').toLowerCase().replace(/\s+/g, '')

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: 'var(--app-bg)' }}>

      {/* Browser chrome */}
      <div
        className="px-3 py-2 flex items-center gap-2 shrink-0"
        style={{
          backgroundColor: 'var(--app-surface)',
          borderBottom: '2px solid var(--app-border)',
        }}
      >
        {/* Traffic lights */}
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>

        {/* URL bar */}
        <div
          className="flex-1 rounded-md px-3 py-1 text-sm font-mono flex items-center gap-1 truncate"
          style={{ backgroundColor: 'var(--app-raised)', border: '2px solid var(--app-border)', color: 'var(--ink-faint)' }}
        >
          <span style={{ color: '#4ade80' }}>🔒</span>
          <span className="truncate">{siteName}.mysite.com</span>
        </div>

        {/* Viewport toggles */}
        <div className="flex gap-1">
          {[
            { id: 'desktop', Icon: Monitor },
            { id: 'mobile',  Icon: Smartphone },
          ].map(({ id, Icon }) => (
            <Button
              key={id}
              size="xs"
              variant={viewport === id ? 'soft' : 'ghost'}
              color={viewport === id ? 'blue' : 'neutral'}
              onClick={() => setViewport(id)}
            >
              <Icon size={14} />
            </Button>
          ))}
        </div>
      </div>

      {/* Preview area */}
      <div
        className="flex-1 overflow-hidden flex items-stretch justify-center p-2"
        style={{ backgroundColor: 'var(--app-line)' }}
      >
        <motion.div
          layout
          className="overflow-hidden rounded-sm flex flex-col"
          style={{
            width:    viewport === 'mobile' ? 375 : '100%',
            maxWidth: viewport === 'mobile' ? 375 : '100%',
            boxShadow: '0 2px 20px rgba(0,0,0,0.3)',
            backgroundColor: '#ffffff',
          }}
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
