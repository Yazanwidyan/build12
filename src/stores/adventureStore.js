import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const DEFAULT_WEBSITE = {
  name: '',
  color: '#6366f1',
  topic: '',
  sections: {
    header: {
      built: false,
      content: {
        title: '',
        navLinks: ['Home', 'About', 'Contact'],
      },
    },
    hero: {
      built: false,
      content: {
        headline: '',
        subtext: '',
        buttonText: 'Explore',
      },
    },
    footer: {
      built: false,
      content: {
        copyright: '',
        links: ['Privacy', 'Terms'],
      },
    },
  },
  styles: {
    primaryColor: '#6366f1',
    secondaryColor: '#a5b4fc',
    backgroundColor: '#ffffff',
    textColor: '#111827',
    headingSize: '3xl',
    buttonStyle: 'rounded',
  },
  variables: {},
  hasInteractivity: false,
  hasComponents: false,
  hasRouting: false,
  hasAPI: false,
}

export const useAdventureStore = create(
  persist(
    (set, get) => ({
      currentAdventure: null,
      currentMissionNumber: 1,
      currentStepIndex: 0,
      website: { ...DEFAULT_WEBSITE },
      actCelebrating: null,
      levelComplete: false,

      // startMissionNumber lets senior users begin at mission 21 (first React mission)
      startAdventure: (adventureId, startMissionNumber = 1) => set({
        currentAdventure: adventureId,
        currentMissionNumber: startMissionNumber,
        currentStepIndex: 0,
        levelComplete: false,
      }),

      setLevelComplete: () => set({ levelComplete: true }),

      // Builds the full website from scratch — used for senior users so they
      // arrive at the adventure with a complete site ready to learn React on.
      autoGenerateWebsite: (name, color, topic) => set((s) => ({
        website: {
          ...s.website,
          name,
          color,
          topic,
          styles: { ...s.website.styles, primaryColor: color },
          sections: {
            header: {
              built: true,
              content: {
                title: name,
                navLinks: ['Home', 'About', 'Gallery', 'Contact'],
              },
            },
            hero: {
              built: true,
              content: {
                headline: `Welcome to ${name}!`,
                subtext: `Your go-to place for everything about ${topic}.`,
                buttonText: 'Explore',
              },
            },
            footer: {
              built: true,
              content: {
                copyright: `© ${new Date().getFullYear()} ${name}`,
                links: ['Privacy', 'Terms', 'Contact'],
              },
            },
          },
        },
      })),

      setMission: (missionNumber) => set({
        currentMissionNumber: missionNumber,
        currentStepIndex: 0,
      }),

      setStep: (index) => set({ currentStepIndex: index }),

      advanceStep: () => set((s) => ({ currentStepIndex: s.currentStepIndex + 1 })),

      // Website mutations
      setWebsiteName: (name) => set((s) => ({
        website: { ...s.website, name },
      })),

      setWebsiteColor: (color) => set((s) => ({
        website: {
          ...s.website,
          color,
          styles: { ...s.website.styles, primaryColor: color },
        },
      })),

      setWebsiteTopic: (topic) => set((s) => ({
        website: { ...s.website, topic },
      })),

      buildSection: (sectionKey, content) => set((s) => ({
        website: {
          ...s.website,
          sections: {
            ...s.website.sections,
            [sectionKey]: { built: true, content },
          },
        },
      })),

      updateSection: (sectionKey, content) => set((s) => ({
        website: {
          ...s.website,
          sections: {
            ...s.website.sections,
            [sectionKey]: {
              ...s.website.sections[sectionKey],
              content: { ...s.website.sections[sectionKey].content, ...content },
            },
          },
        },
      })),

      updateStyles: (styles) => set((s) => ({
        website: {
          ...s.website,
          styles: { ...s.website.styles, ...styles },
        },
      })),

      setVariable: (key, value) => set((s) => ({
        website: {
          ...s.website,
          variables: { ...s.website.variables, [key]: value },
        },
      })),

      setCelebrating: (actId) => set({ actCelebrating: actId }),
      clearCelebrating: () => set({ actCelebrating: null }),

      reset: () => set({
        currentAdventure: null,
        currentMissionNumber: 1,
        currentStepIndex: 0,
        website: { ...DEFAULT_WEBSITE },
        actCelebrating: null,
      }),
    }),
    { name: 'hbi-adventure' }
  )
)
