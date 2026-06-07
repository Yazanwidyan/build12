export default function LogoHB({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Blueprint background */}
      <rect width="32" height="32" rx="6" fill="#040e1e"/>
      {/* Grid lines */}
      <line x1="0"  y1="8"  x2="32" y2="8"  stroke="rgba(59,130,246,0.12)" strokeWidth="0.5"/>
      <line x1="0"  y1="16" x2="32" y2="16" stroke="rgba(59,130,246,0.12)" strokeWidth="0.5"/>
      <line x1="0"  y1="24" x2="32" y2="24" stroke="rgba(59,130,246,0.12)" strokeWidth="0.5"/>
      <line x1="8"  y1="0"  x2="8"  y2="32" stroke="rgba(59,130,246,0.12)" strokeWidth="0.5"/>
      <line x1="16" y1="0"  x2="16" y2="32" stroke="rgba(59,130,246,0.12)" strokeWidth="0.5"/>
      <line x1="24" y1="0"  x2="24" y2="32" stroke="rgba(59,130,246,0.12)" strokeWidth="0.5"/>
      {/* H — left column */}
      <rect x="4"  y="5" width="4" height="22" fill="#3b82f6"/>
      {/* H — crossbar */}
      <rect x="4"  y="13.5" width="11" height="3" fill="#3b82f6"/>
      {/* Shared spine (H right col = B left spine) */}
      <rect x="15" y="5" width="4" height="22" fill="#3b82f6"/>
      {/* B — top room */}
      <rect x="15" y="5"  width="10" height="11" rx="1" fill="rgba(59,130,246,0.18)" stroke="#5acfef" strokeWidth="0.9"/>
      {/* B — bottom room (wider = classic B proportion) */}
      <rect x="15" y="16" width="12" height="11" rx="1" fill="rgba(59,130,246,0.12)" stroke="#5acfef" strokeWidth="0.9"/>
      {/* Blueprint corner markers */}
      <circle cx="4.5"  cy="5"  r="1.2" fill="#7ddcff"/>
      <circle cx="26.5" cy="27" r="1.2" fill="#7ddcff"/>
    </svg>
  );
}
