// ─── Preview Engine ───────────────────────────────────────────────────────────
// Generates live HTML/CSS for the website preview iframe from the adventure state.
// `reactDemo` is the optional overlay state for Act 9 interactive chapters.
// ──────────────────────────────────────────────────────────────────────────────

export function generateWebsiteHTML(website, reactDemo = null) {
  const demo = reactDemo || {}
  const { name, color, topic, sections, styles } = website
  const { header, hero, footer } = sections

  // ── Effective styles (demo overrides take precedence) ───────────────────────
  const effectivePrimary    = demo.themeColor || styles.primaryColor || color || '#6366f1'
  const effectiveSecondary  = demo.darkMode   ? '#334155' : (styles.secondaryColor || '#a5b4fc')
  const effectiveBg         = demo.darkMode   ? '#0f172a' : (styles.backgroundColor || '#ffffff')
  const effectiveText       = demo.darkMode   ? '#f1f5f9' : (styles.textColor || '#111827')
  const headingSize         = styles.headingSize || '3xl'
  const buttonStyle         = styles.buttonStyle || 'rounded'
  const fontFamily          = styles.fontFamily || 'sans-serif'
  const buttonColor         = styles.buttonColor || effectivePrimary

  const btnRadius = buttonStyle === 'pill' ? '9999px' : buttonStyle === 'square' ? '4px' : '8px'
  const headingSizes = { '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.25rem', '5xl': '3rem' }
  const hsz = headingSizes[headingSize] || '1.875rem'

  // Hero button text: demo override > website content > default
  const heroBtnText = demo.heroBtnText ?? (hero.content.buttonText || 'Explore')

  // Connected nav routes
  const connectedRoutes = demo.connectedRoutes || []

  // ── Standard sections ───────────────────────────────────────────────────────
  const headerHTML = header.built ? `
    <header style="background:${effectivePrimary};padding:1rem 2rem;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:10;box-shadow:0 2px 8px rgba(0,0,0,0.2);">
      <h1 style="color:white;font-size:1.25rem;font-weight:800;letter-spacing:-0.02em;margin:0;">${header.content.title || name}</h1>
      <nav style="display:flex;gap:1.5rem;">
        ${(header.content.navLinks || ['Home']).map((link) => {
          const isConnected = demo.pagesConnected || connectedRoutes.includes(link)
          const href = isConnected ? `#section-${link.toLowerCase()}` : '#'
          return `<a href="${href}" style="color:rgba(255,255,255,0.85);text-decoration:none;font-size:0.875rem;font-weight:500;" onmouseover="this.style.color='white'" onmouseout="this.style.color='rgba(255,255,255,0.85)'">${link}</a>`
        }).join('')}
      </nav>
    </header>`
    : `<div style="border:2px dashed #d1d5db;background:#f9fafb;padding:1rem 2rem;display:flex;align-items:center;justify-content:space-between;min-height:62px;color:#c0c8d4;font-size:0.875rem;"><span>⬜ Site Name</span><span>Home · About · Contact</span></div>`

  // Hero button — with event demo support
  const heroBtn = hero.content.buttonText || heroBtnText ? buildHeroButton(heroBtnText, buttonColor, btnRadius, demo, name) : ''

  const heroHTML = hero.built ? `
    <section id="section-home" style="background:linear-gradient(135deg,${effectivePrimary}18 0%,${effectiveSecondary}22 100%);padding:5rem 2rem;text-align:center;min-height:320px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;">
      <h2 style="color:${effectiveText};font-size:${hsz};font-weight:800;line-height:1.2;margin:0;max-width:600px;">${hero.content.headline || 'Welcome!'}</h2>
      <p style="color:${effectiveText}99;font-size:1rem;margin:0;max-width:480px;line-height:1.6;">${hero.content.subtext || ''}</p>
      ${heroBtn}
    </section>`
    : `<div style="border:2px dashed #d1d5db;background:#f9fafb;min-height:320px;display:flex;align-items:center;justify-content:center;color:#c0c8d4;font-size:0.875rem;">⬜ Hero Section — Not Built Yet</div>`

  const footerHTML = footer.built ? `
    <footer style="background:${demo.darkMode ? '#020617' : effectiveText};color:white;padding:2rem;text-align:center;">
      <p style="margin:0 0 0.75rem;font-size:0.875rem;opacity:0.7;">${footer.content.copyright || `© ${new Date().getFullYear()} ${name}`}</p>
      <div style="display:flex;justify-content:center;gap:1.5rem;flex-wrap:wrap;">
        ${(footer.content.links || []).map((link) =>
          `<a href="#" style="color:rgba(255,255,255,0.6);text-decoration:none;font-size:0.8125rem;">${link}</a>`
        ).join('')}
      </div>
    </footer>`
    : `<div style="border:2px dashed #d1d5db;background:#f9fafb;padding:2.5rem 2rem;text-align:center;color:#9ca3af;font-size:0.875rem;">⬜ Footer — Not Built Yet</div>`

  // ── React demo extra sections ────────────────────────────────────────────────
  const demoSections = buildDemoSections(demo, effectivePrimary, effectiveBg, effectiveText, btnRadius, buttonColor, name, topic)

  // ── Extra CSS ────────────────────────────────────────────────────────────────
  const highlightCSS = demo.highlightButtons ? `
    @keyframes pulse-ring {
      0%   { box-shadow: 0 0 0 0 ${effectivePrimary}88; }
      70%  { box-shadow: 0 0 0 10px ${effectivePrimary}00; }
      100% { box-shadow: 0 0 0 0 ${effectivePrimary}00; }
    }
    button { animation: pulse-ring 1.8s ease-out infinite; }
  ` : ''

  const darkModeTransition = `
    body, header, section, footer, div { transition: background 0.4s ease, color 0.4s ease; }
  `

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${name || 'My Website'}</title>
  <style>
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth}
    body{
      font-family:${fontFamily === 'serif' ? 'Georgia,serif' : fontFamily === 'monospace' ? "'Courier New',monospace" : 'system-ui,sans-serif'};
      background:${effectiveBg};
      color:${effectiveText};
    }
    a{color:inherit}
    button{cursor:pointer}
    ${darkModeTransition}
    ${highlightCSS}
  </style>
</head>
<body>
  ${headerHTML}
  <main>
    ${heroHTML}
    ${demoSections}
  </main>
  ${footerHTML}
</body>
</html>`
}

// ── Hero button with optional event action ─────────────────────────────────────
function buildHeroButton(text, btnColor, btnRadius, demo, siteName) {
  const base = `style="background:${btnColor};color:white;border:none;padding:0.75rem 2rem;border-radius:${btnRadius};font-size:1rem;font-weight:600;cursor:pointer;margin-top:0.5rem;transition:opacity 0.2s;" onmouseover="this.style.opacity='0.85'" onmouseout="this.style.opacity='1'"`

  if (demo.mode === 'events' || demo.showDeadButton) {
    // Dead button (no action) — or button with a chosen action
    const action = demo.eventAction
    if (!action) {
      return `<button ${base} title="Try clicking me!">${text}</button>`
    }
    if (action === 'message') {
      return `<button ${base} onclick="alert('Welcome to ${siteName}! 🎉')">${text}</button>`
    }
    if (action === 'popup') {
      return `<button ${base} onclick="document.getElementById('demo-popup').style.display='flex'">${text}</button>
              <div id="demo-popup" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.5);align-items:center;justify-content:center;z-index:999;" onclick="this.style.display='none'">
                <div style="background:white;border-radius:16px;padding:2rem;text-align:center;max-width:280px;">
                  <p style="font-size:1.25rem;font-weight:700;margin-bottom:0.5rem;">🎉 You opened a popup!</p>
                  <p style="color:#6b7280;font-size:0.875rem;">This is what onClick can do!</p>
                  <button style="margin-top:1rem;background:#6366f1;color:white;border:none;padding:0.5rem 1.5rem;border-radius:8px;cursor:pointer;" onclick="document.getElementById('demo-popup').style.display='none'">Close</button>
                </div>
              </div>`
    }
    if (action === 'text-change') {
      return `<button ${base} onclick="this.textContent = this.textContent === '${text}' ? 'You clicked! ✅' : '${text}'">${text}</button>`
    }
  }

  return `<button ${base}>${text}</button>`
}

// ── React demo extra sections injected into <main> ─────────────────────────────
function buildDemoSections(demo, primary, bg, text, btnRadius, btnColor, siteName, topic) {
  const sections = []

  // ── Chapter 1 & 2: CTA buttons section ──────────────────────────────────────
  if (demo.mode === 'components' || demo.highlightButtons || demo.propShowcase) {
    const labels = demo.propShowcase
      ? ['Adopt Now', 'Learn More', 'Contact Us']
      : ['Adopt Now', 'Learn More', 'Contact Us', 'Join Now']

    const subNote = demo.propShowcase
      ? `<p style="margin-top:1.5rem;font-size:0.8rem;color:${text}66;font-style:italic;">Same &lt;Button /&gt; component — different text each time</p>`
      : ''

    sections.push(`
      <section id="section-about" style="padding:3rem 2rem;text-align:center;background:${bg};border-top:1px solid ${text}11;">
        <h3 style="color:${text}88;font-size:0.75rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:1.5rem;">Call to Action</h3>
        <div style="display:flex;gap:1rem;flex-wrap:wrap;justify-content:center;">
          ${labels.map(label =>
            `<button style="background:${btnColor};color:white;border:none;padding:0.65rem 1.5rem;border-radius:${btnRadius};font-size:0.9rem;font-weight:600;cursor:pointer;">${label}</button>`
          ).join('')}
        </div>
        ${subNote}
      </section>`)
  }

  // ── Chapter 3: State — theme controls bar ───────────────────────────────────
  if (demo.showThemeBar || demo.mode === 'state') {
    const isDark = demo.darkMode
    sections.unshift(`
      <div id="theme-bar" style="background:${isDark ? '#1e293b' : '#f8fafc'};border-bottom:1px solid ${isDark ? '#334155' : '#e2e8f0'};padding:0.6rem 2rem;display:flex;align-items:center;gap:1rem;font-size:0.8rem;">
        <span style="color:${isDark ? '#94a3b8' : '#64748b'};font-weight:600;">⚙️ Theme Settings</span>
        <span style="color:${isDark ? '#f1f5f9' : '#111827'};font-weight:700;margin-left:auto;">
          ${isDark ? '🌙 Dark Mode is ON' : '☀️ Light Mode is ON'}
        </span>
        ${demo.activeSettingDemo === 'fontSize' ? `<span style="color:${primary};font-weight:600;">📏 Font Size: Large</span>` : ''}
        ${demo.activeSettingDemo === 'heroText' ? `<span style="color:${primary};font-weight:600;">✏️ Hero Text: Custom</span>` : ''}
      </div>`)
  }

  // ── Chapter 5: Map — pet gallery ─────────────────────────────────────────────
  if (demo.showPets && demo.pets?.length > 0) {
    const petEmojis = ['🐶', '🐱', '🐰', '🐹', '🐦', '🐠', '🦎', '🐢', '🐾']
    sections.push(`
      <section id="section-gallery" style="padding:3rem 2rem;background:${bg};border-top:1px solid ${text}11;">
        <h3 style="text-align:center;color:${text};font-size:1.25rem;font-weight:800;margin-bottom:0.5rem;">🐾 Our Pets</h3>
        <p style="text-align:center;color:${text}66;font-size:0.875rem;margin-bottom:2rem;">${demo.pets.length} wonderful friend${demo.pets.length === 1 ? '' : 's'}</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:1rem;max-width:600px;margin:0 auto;">
          ${demo.pets.map((pet, i) => `
            <div style="background:${primary}14;border:2px solid ${primary}22;border-radius:16px;padding:1.25rem 0.75rem;text-align:center;transition:transform 0.2s;" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='none'">
              <div style="font-size:2rem;margin-bottom:0.5rem;">${petEmojis[i % petEmojis.length]}</div>
              <p style="font-size:0.8rem;font-weight:700;color:${text};word-break:break-word;">${pet}</p>
            </div>`).join('')}
        </div>
      </section>`)
  }

  // ── Chapter 6: Conditional — welcome section ──────────────────────────────────
  if (demo.showConditional) {
    const messages = {
      kid:     { title: 'Hey there, future builder! 🎉', sub: 'Build something amazing today!', bg: '#fef3c7', border: '#f59e0b', color: '#92400e' },
      parent:  { title: 'Welcome, Parent! 👩‍👧',          sub: 'Explore coding resources for your child.', bg: '#dbeafe', border: '#3b82f6', color: '#1e3a8a' },
      teacher: { title: 'Welcome, Educator! 👩‍🏫',       sub: 'Access classroom tools and curriculum.', bg: '#d1fae5', border: '#10b981', color: '#064e3b' },
      null:    { title: 'Welcome, Visitor! 👋',           sub: 'Discover what we have to offer.',     bg: '#f3f4f6', border: '#d1d5db', color: text },
    }
    const m = messages[demo.userType] || messages[null]
    sections.push(`
      <section id="section-contact" style="padding:2.5rem 2rem;background:${bg};border-top:1px solid ${text}11;">
        <div style="max-width:480px;margin:0 auto;background:${m.bg};border:2px solid ${m.border};border-radius:16px;padding:1.5rem 2rem;text-align:center;">
          <h3 style="color:${m.color};font-size:1.25rem;font-weight:800;margin-bottom:0.5rem;">${m.title}</h3>
          <p style="color:${m.color}cc;font-size:0.9rem;">${m.sub}</p>
          ${demo.userType ? `<div style="margin-top:0.75rem;font-size:0.75rem;color:${m.color}88;font-style:italic;">Visitor type: ${demo.userType}</div>` : ''}
        </div>
      </section>`)
  }

  // ── Chapter 8: Theme selector ─────────────────────────────────────────────────
  if (demo.showThemeSelector) {
    const themes = [
      { label: 'Ocean',  color: '#0ea5e9', icon: '🌊' },
      { label: 'Forest', color: '#10b981', icon: '🌿' },
      { label: 'Sunset', color: '#f59e0b', icon: '🌅' },
      { label: 'Royal',  color: '#8b5cf6', icon: '👑' },
    ]
    sections.unshift(`
      <div style="background:${bg};border-bottom:2px solid ${text}11;padding:0.75rem 2rem;display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap;">
        <span style="font-size:0.75rem;font-weight:700;color:${text}88;text-transform:uppercase;letter-spacing:0.05em;">🎨 Theme Selector</span>
        ${themes.map(t => `
          <div style="display:flex;align-items:center;gap:0.4rem;padding:0.3rem 0.75rem;border-radius:20px;border:2px solid ${demo.themeColor === t.color ? t.color : '#e5e7eb'};background:${demo.themeColor === t.color ? t.color + '22' : 'transparent'};cursor:pointer;font-size:0.8rem;font-weight:600;color:${demo.themeColor === t.color ? t.color : text};">
            ${t.icon} ${t.label}
          </div>`).join('')}
      </div>`)
  }

  return sections.join('\n')
}

// ──────────────────────────────────────────────────────────────────────────────

export function interpolateCode(template, website) {
  if (!template) return ''
  return template
    .replace(/\{\{name\}\}/g, website.name || 'My Website')
    .replace(/\{\{topic\}\}/g, website.topic || 'pets')
    .replace(/\{\{primaryColor\}\}/g, website.styles.primaryColor || website.color || '#6366f1')
    .replace(/\{\{backgroundColor\}\}/g, website.styles.backgroundColor || '#ffffff')
    .replace(/\{\{headline\}\}/g, website.sections.hero.content.headline || 'Welcome!')
    .replace(/\{\{subtext\}\}/g, website.sections.hero.content.subtext || '')
    .replace(/\{\{buttonText\}\}/g, website.sections.hero.content.buttonText || 'Explore')
}
