export default function LogoCube({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Top face */}
      <polygon points="16,2 6,8 16,14 26,8" fill="#7ddcff"/>
      {/* Left face */}
      <polygon points="6,8 6,22 16,28 16,14" fill="#2cbaff"/>
      {/* Right face */}
      <polygon points="16,14 16,28 26,22 26,8" fill="#0e8ec0"/>
      {/* Cube edge lines */}
      <line x1="16" y1="2"  x2="6"  y2="8"  stroke="rgba(255,255,255,0.25)" strokeWidth="0.7"/>
      <line x1="16" y1="2"  x2="26" y2="8"  stroke="rgba(255,255,255,0.25)" strokeWidth="0.7"/>
      <line x1="6"  y1="8"  x2="16" y2="14" stroke="rgba(255,255,255,0.25)" strokeWidth="0.7"/>
      <line x1="26" y1="8"  x2="16" y2="14" stroke="rgba(255,255,255,0.25)" strokeWidth="0.7"/>
      <line x1="16" y1="14" x2="16" y2="28" stroke="rgba(255,255,255,0.25)" strokeWidth="0.7"/>
      {/* < on left face */}
      <path d="M13,15 L9,18.5 L13,22" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.88"/>
      {/* / on right face */}
      <line x1="21" y1="14.5" x2="19" y2="22" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" strokeLinecap="round"/>
      {/* > on right face */}
      <path d="M19,15 L23,18.5 L19,22" stroke="rgba(255,255,255,0.72)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}
