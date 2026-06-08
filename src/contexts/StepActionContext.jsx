import { createContext, useContext, useState, useCallback } from 'react'

const StepActionContext = createContext(null)

export function StepActionProvider({ children }) {
  const [action, setAction] = useState(null)

  const setStepAction = useCallback((config) => {
    setAction(config ?? null)
  }, [])

  return (
    <StepActionContext.Provider value={{ stepAction: action, setStepAction }}>
      {children}
    </StepActionContext.Provider>
  )
}

export function useStepAction() {
  const ctx = useContext(StepActionContext)
  if (!ctx) return { stepAction: null, setStepAction: () => {} }
  return ctx
}
