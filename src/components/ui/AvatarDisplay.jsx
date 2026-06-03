import { CharacterPixel, CharacterSpark } from './BuilderCharacters'

export default function AvatarDisplay({ avatarId, size = 36 }) {
  if (avatarId === 'pixel') return <CharacterPixel size={size} selected />
  if (avatarId === 'spark') return <CharacterSpark  size={size} selected />
  // Fallback: generic silhouette
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18" cy="18" r="18" fill="var(--app-raised)" />
      <circle cx="18" cy="14" r="6" fill="var(--ink-faint)" />
      <path d="M 6 30 Q 6 22 18 22 Q 30 22 30 30" fill="var(--ink-faint)" />
    </svg>
  )
}
