// Two simple SVG builder characters for the onboarding avatar picker.

// ── Character A: "Pixel" — the techy builder ───────────────────────────────────
export function CharacterPixel({ size = 96, selected = false }) {
  const accent = selected ? '#3b82f6' : '#64748b'
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Pixel"
    >
      {/* Body */}
      <rect x="22" y="46" width="36" height="26" rx="8" fill={selected ? '#0a3a5c' : '#1e2640'} />

      {/* Shirt stripe */}
      <rect x="22" y="54" width="36" height="4" fill={selected ? '#3b82f6' : '#2a3347'} />

      {/* Neck */}
      <rect x="33" y="42" width="14" height="6" rx="2" fill={selected ? '#f9d5a7' : '#f5c7a9'} />

      {/* Head */}
      <rect x="16" y="12" width="48" height="34" rx="12" fill={selected ? '#fde8c8' : '#fad9b5'} />

      {/* Hair — flat top */}
      <rect x="16" y="12" width="48" height="10" rx="8" fill={selected ? '#1e293b' : '#0f172a'} />
      <rect x="16" y="16" width="48" height="6" fill={selected ? '#1e293b' : '#0f172a'} />

      {/* Glasses frame */}
      <rect x="20" y="28" width="16" height="10" rx="3" stroke={accent} strokeWidth="2" fill="none" />
      <rect x="44" y="28" width="16" height="10" rx="3" stroke={accent} strokeWidth="2" fill="none" />
      {/* Bridge */}
      <line x1="36" y1="33" x2="44" y2="33" stroke={accent} strokeWidth="2" />
      {/* Side arms */}
      <line x1="20" y1="33" x2="16" y2="33" stroke={accent} strokeWidth="2" />
      <line x1="60" y1="33" x2="64" y2="33" stroke={accent} strokeWidth="2" />

      {/* Eyes behind glasses */}
      <circle cx="28" cy="33" r="2.5" fill="#1e293b" />
      <circle cx="52" cy="33" r="2.5" fill="#1e293b" />

      {/* Mouth */}
      <path d="M 34 40 Q 40 44 46 40" stroke="#92400e" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* Left arm */}
      <rect x="10" y="48" width="12" height="6" rx="3" fill={selected ? '#0a3a5c' : '#1e2640'} />
      {/* Right arm */}
      <rect x="58" y="48" width="12" height="6" rx="3" fill={selected ? '#0a3a5c' : '#1e2640'} />

      {/* Hands */}
      <circle cx="10" cy="51" r="4" fill={selected ? '#fde8c8' : '#fad9b5'} />
      <circle cx="70" cy="51" r="4" fill={selected ? '#fde8c8' : '#fad9b5'} />
    </svg>
  )
}

// ── Character B: "Spark" — the creative builder ────────────────────────────────
export function CharacterSpark({ size = 96, selected = false }) {
  const accent = selected ? '#fde047' : '#64748b'
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Spark"
    >
      {/* Body */}
      <rect x="22" y="46" width="36" height="26" rx="8" fill={selected ? '#2a1200' : '#1e2640'} />

      {/* Shirt detail */}
      <rect x="22" y="54" width="36" height="4" fill={selected ? '#fde047' : '#2a3347'} />

      {/* Neck */}
      <rect x="33" y="42" width="14" height="6" rx="2" fill={selected ? '#f9d5a7' : '#f5c7a9'} />

      {/* Head — slightly rounder */}
      <ellipse cx="40" cy="29" rx="24" ry="18" fill={selected ? '#fde8c8' : '#fad9b5'} />

      {/* Wild hair — curly top */}
      <ellipse cx="40" cy="13" rx="22" ry="10" fill={selected ? '#92400e' : '#78350f'} />
      {/* Hair tufts */}
      <circle cx="22" cy="16" r="7" fill={selected ? '#92400e' : '#78350f'} />
      <circle cx="58" cy="16" r="7" fill={selected ? '#92400e' : '#78350f'} />
      <circle cx="32" cy="10" r="6" fill={selected ? '#92400e' : '#78350f'} />
      <circle cx="48" cy="10" r="6" fill={selected ? '#92400e' : '#78350f'} />
      <circle cx="40" cy="8"  r="5" fill={selected ? '#92400e' : '#78350f'} />

      {/* Eyes — expressive, slightly wide */}
      <ellipse cx="32" cy="28" rx="4" ry="4.5" fill="white" />
      <ellipse cx="48" cy="28" rx="4" ry="4.5" fill="white" />
      <circle cx="33" cy="29" r="2.5" fill="#1e293b" />
      <circle cx="49" cy="29" r="2.5" fill="#1e293b" />
      {/* Shine */}
      <circle cx="34" cy="27.5" r="1" fill="white" />
      <circle cx="50" cy="27.5" r="1" fill="white" />

      {/* Eyebrows — raised, excited */}
      <path d="M 28 22 Q 32 20 36 22" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M 44 22 Q 48 20 52 22" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* Big smile */}
      <path d="M 30 36 Q 40 44 50 36" stroke="#92400e" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Cheeks */}
      <circle cx="24" cy="34" r="4" fill="#fca5a5" opacity="0.5" />
      <circle cx="56" cy="34" r="4" fill="#fca5a5" opacity="0.5" />

      {/* Arms */}
      <rect x="10" y="48" width="12" height="6" rx="3" fill={selected ? '#2a1200' : '#1e2640'} />
      <rect x="58" y="48" width="12" height="6" rx="3" fill={selected ? '#2a1200' : '#1e2640'} />

      {/* Hands */}
      <circle cx="10" cy="51" r="4" fill={selected ? '#fde8c8' : '#fad9b5'} />
      <circle cx="70" cy="51" r="4" fill={selected ? '#fde8c8' : '#fad9b5'} />

      {/* Star accent */}
      <text x="60" y="14" fontSize="10" fill={accent}>✦</text>
    </svg>
  )
}
