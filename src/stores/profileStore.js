import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const AGE_GROUPS = [
  { id: 'young',  label: 'Beginner',     range: 'Start here',  codeExposure: 'visual'               },
  { id: 'junior', label: 'Intermediate', range: 'Coming soon', codeExposure: 'guided',  locked: true },
  { id: 'senior', label: 'Advanced',     range: 'Coming soon', codeExposure: 'full',    locked: true },
]

const defaultProfile = {
  builderName: '',
  avatar: null,
  ageGroup: null,
  onboardingComplete: false,
}

export const useProfileStore = create(
  persist(
    (set) => ({
      ...defaultProfile,

      setBuilderName: (name) => set({ builderName: name }),
      setAgeGroup: (groupId) => set({ ageGroup: groupId }),
      completeOnboarding: () => set({ onboardingComplete: true }),
      reset: () => set(defaultProfile),
    }),
    { name: 'hbi-profile' }
  )
)
