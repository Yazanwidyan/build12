import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const AGE_GROUPS = [
  { id: 'young',  label: 'Young Builder',    range: 'Under 11',  codeExposure: 'visual'  },
  { id: 'junior', label: 'Junior Creator',   range: '11 – 14',   codeExposure: 'guided'  },
  { id: 'senior', label: 'Future Developer', range: '15+',       codeExposure: 'full'    },
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
