import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, Monitor, Smartphone, Code2 } from 'lucide-react'
import { useProgressStore } from '@/stores/progressStore'
import { useAdventureStore } from '@/stores/adventureStore'
import { generateWebsiteHTML } from '@/engines/previewEngine'
import WebsitePreview from '@/components/adventure/WebsitePreview'
import Teki from '@/components/teki/Teki'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

// A simplified free-form builder for users who completed the adventure
export default function BuilderPage() {
  const navigate = useNavigate()
  const isUnlocked = useProgressStore((s) => s.isBuilderUnlocked('website'))
  const adventure = useAdventureStore()

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
        <span className="text-6xl mb-4">🔒</span>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Builder Locked</h2>
        <p className="text-gray-500 mb-6 max-w-sm">
          Complete the Website Adventure first to unlock the free-form builder!
        </p>
        <Button variant="primary" onClick={() => navigate({ to: '/adventure' })}>
          Go to Website Adventure
        </Button>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-50">
      {/* Nav */}
      <header className="bg-white border-b border-gray-100 px-4 py-2 flex items-center gap-3 shrink-0">
        <button
          onClick={() => navigate({ to: '/dashboard' })}
          className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft size={14} />
          Dashboard
        </button>
        <span className="font-bold text-gray-800 text-sm">Website Builder</span>
        <span className="text-xs bg-green-100 text-green-700 rounded-full px-2 py-0.5 font-medium">Free Mode</span>
      </header>

      <div className="flex-1 flex min-h-0">
        {/* Preview */}
        <div className="flex-1 border-r border-gray-200">
          <WebsitePreview />
        </div>

        {/* Control panel */}
        <div className="w-72 bg-white overflow-y-auto p-4 flex flex-col gap-4">
          <h3 className="font-bold text-gray-800 text-sm">Site Settings</h3>

          <div className="flex flex-col gap-3">
            <Input
              label="Site Name"
              value={adventure.website.name}
              onChange={(e) => adventure.setWebsiteName(e.target.value)}
              placeholder="My Website"
            />

            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Primary Color</label>
              <input
                type="color"
                value={adventure.website.color}
                onChange={(e) => adventure.setWebsiteColor(e.target.value)}
                className="h-10 w-full rounded-xl border border-gray-200 cursor-pointer p-0.5"
              />
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Header */}
          <div>
            <h4 className="font-semibold text-xs text-gray-500 uppercase tracking-wider mb-2">Header</h4>
            <Input
              label="Title"
              value={adventure.website.sections.header.content.title}
              onChange={(e) => adventure.updateSection('header', { title: e.target.value })}
              placeholder="My Website"
            />
          </div>

          {/* Hero */}
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-xs text-gray-500 uppercase tracking-wider">Hero</h4>
            <Input
              label="Headline"
              value={adventure.website.sections.hero.content.headline}
              onChange={(e) => adventure.updateSection('hero', { headline: e.target.value })}
              placeholder="Welcome!"
            />
            <Input
              label="Subtext"
              value={adventure.website.sections.hero.content.subtext}
              onChange={(e) => adventure.updateSection('hero', { subtext: e.target.value })}
              placeholder="Short description"
            />
            <Input
              label="Button Text"
              value={adventure.website.sections.hero.content.buttonText}
              onChange={(e) => adventure.updateSection('hero', { buttonText: e.target.value })}
              placeholder="Explore"
            />
          </div>

          {/* Footer */}
          <div>
            <h4 className="font-semibold text-xs text-gray-500 uppercase tracking-wider mb-2">Footer</h4>
            <Input
              label="Copyright"
              value={adventure.website.sections.footer.content.copyright}
              onChange={(e) => adventure.updateSection('footer', { copyright: e.target.value })}
              placeholder="© 2024 My Website"
            />
          </div>
        </div>
      </div>

      <Teki />
    </div>
  )
}
