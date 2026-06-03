export default function Logo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Top face — brightest, light source above-left */}
      <polygon points="16,2 6,8 16,14 26,8" fill="#7ddcff" />
      {/* Left face — mid tone */}
      <polygon points="6,8 6,22 16,28 16,14" fill="#2cbaff" />
      {/* Right face — shadow */}
      <polygon points="16,14 16,28 26,22 26,8" fill="#0e8ec0" />
      {/* Edge highlights — crisp face separation */}
      <line x1="16" y1="2"  x2="6"  y2="8"  stroke="rgba(255,255,255,0.22)" strokeWidth="0.7" strokeLinecap="round" />
      <line x1="16" y1="2"  x2="26" y2="8"  stroke="rgba(255,255,255,0.22)" strokeWidth="0.7" strokeLinecap="round" />
      <line x1="6"  y1="8"  x2="16" y2="14" stroke="rgba(255,255,255,0.22)" strokeWidth="0.7" strokeLinecap="round" />
      <line x1="26" y1="8"  x2="16" y2="14" stroke="rgba(255,255,255,0.22)" strokeWidth="0.7" strokeLinecap="round" />
      <line x1="16" y1="14" x2="16" y2="28" stroke="rgba(255,255,255,0.22)" strokeWidth="0.7" strokeLinecap="round" />
      {/* Subtle glow shadow beneath */}
      <ellipse cx="16" cy="30" rx="7" ry="1.5" fill="rgba(44,186,255,0.18)" />
    </svg>
  );
}
