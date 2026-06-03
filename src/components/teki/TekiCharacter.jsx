export default function TekiCharacter({ size = 80, mood = 'happy', className = '' }) {
  const mouthPath =
    mood === 'sad'       ? 'M 30 54 Q 50 46 70 54' :
    mood === 'surprised' ? 'M 42 52 Q 50 58 58 52' :
    mood === 'thinking'  ? 'M 32 52 L 68 52' :
                           'M 30 50 Q 50 62 70 50'

  const eyeY = mood === 'thinking' ? 37 : 38

  return (
    <svg
      width={size}
      height={size * 1.2}
      viewBox="0 0 100 120"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="TEKI"
    >
      {/* Antenna */}
      <line x1="50" y1="14" x2="50" y2="4" stroke="#818cf8" strokeWidth="4" strokeLinecap="round"/>
      <circle cx="50" cy="3" r="4.5" fill="#c7d2fe"/>

      {/* Head */}
      <rect x="16" y="14" width="68" height="52" rx="16" fill="#6366f1"/>

      {/* Eye whites */}
      <circle cx="36" cy={eyeY} r="11" fill="white"/>
      <circle cx="64" cy={eyeY} r="11" fill="white"/>

      {/* Pupils */}
      <circle cx="37" cy={eyeY} r="5.5" fill="#1e1b4b"/>
      <circle cx="65" cy={eyeY} r="5.5" fill="#1e1b4b"/>

      {/* Eye shine */}
      <circle cx="39" cy={eyeY - 2} r="2" fill="white" opacity="0.9"/>
      <circle cx="67" cy={eyeY - 2} r="2" fill="white" opacity="0.9"/>

      {/* Mouth */}
      <path d={mouthPath} stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>

      {/* Ear buttons */}
      <rect x="8" y="29" width="8" height="18" rx="4" fill="#4f46e5"/>
      <rect x="84" y="29" width="8" height="18" rx="4" fill="#4f46e5"/>

      {/* Body */}
      <rect x="24" y="62" width="52" height="42" rx="14" fill="#6366f1"/>

      {/* Body panel */}
      <rect x="34" y="72" width="32" height="20" rx="6" fill="#4f46e5"/>
      <circle cx="50" cy="82" r="4" fill="#818cf8"/>

      {/* Feet */}
      <rect x="28" y="100" width="18" height="12" rx="6" fill="#4338ca"/>
      <rect x="54" y="100" width="18" height="12" rx="6" fill="#4338ca"/>
    </svg>
  )
}
