// ─── Preview Engine ───────────────────────────────────────────────────────────
// Generates live HTML/CSS for the website preview iframe from the adventure state.
// ──────────────────────────────────────────────────────────────────────────────

export function generateWebsiteHTML(website) {
  const { name, color, topic, sections, styles } = website
  const { header, hero, footer } = sections
  const {
    primaryColor = color || '#6366f1',
    secondaryColor = '#a5b4fc',
    backgroundColor = '#ffffff',
    textColor = '#111827',
    headingSize = '3xl',
    buttonStyle = 'rounded',
    buttonColor,
    fontFamily = 'sans-serif',
  } = styles

  const btnRadius = buttonStyle === 'pill' ? '9999px' : buttonStyle === 'square' ? '4px' : '8px'
  const headingSizes = { '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.25rem', '5xl': '3rem' }
  const hsz = headingSizes[headingSize] || '1.875rem'
  const finalBtnColor = buttonColor || primaryColor

  const headerHTML = header.built
    ? `
    <header style="background:${primaryColor};padding:1rem 2rem;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:10;box-shadow:0 2px 8px rgba(0,0,0,0.15);">
      <h1 style="color:white;font-size:1.25rem;font-weight:800;letter-spacing:-0.02em;margin:0;">${header.content.title || name}</h1>
      <nav style="display:flex;gap:1.5rem;">
        ${(header.content.navLinks || ['Home']).map((link) =>
          `<a href="#" style="color:rgba(255,255,255,0.85);text-decoration:none;font-size:0.875rem;font-weight:500;transition:color .2s;" onmouseover="this.style.color='white'" onmouseout="this.style.color='rgba(255,255,255,0.85)'">${link}</a>`
        ).join('')}
      </nav>
    </header>`
    : `<div style="border:2px dashed #d1d5db;background:#f9fafb;padding:3rem 2rem;text-align:center;color:#9ca3af;font-family:sans-serif;font-size:0.875rem;">⬜ Header — Not Built Yet</div>`

  const heroHTML = hero.built
    ? `
    <section style="background:linear-gradient(135deg,${primaryColor}18 0%,${secondaryColor}12 100%);padding:5rem 2rem;text-align:center;min-height:360px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;">
      <h2 style="color:${textColor};font-size:${hsz};font-weight:800;line-height:1.2;margin:0;max-width:600px;">${hero.content.headline || 'Welcome!'}</h2>
      <p style="color:${textColor}99;font-size:1rem;margin:0;max-width:480px;line-height:1.6;">${hero.content.subtext || ''}</p>
      ${hero.content.buttonText ? `<button style="background:${finalBtnColor};color:white;border:none;padding:0.75rem 2rem;border-radius:${btnRadius};font-size:1rem;font-weight:600;cursor:pointer;margin-top:0.5rem;">${hero.content.buttonText}</button>` : ''}
    </section>`
    : `<div style="border:2px dashed #d1d5db;background:#f9fafb;padding:5rem 2rem;text-align:center;color:#9ca3af;font-family:sans-serif;font-size:0.875rem;">⬜ Hero Section — Not Built Yet</div>`

  const footerHTML = footer.built
    ? `
    <footer style="background:${textColor};color:white;padding:2rem;text-align:center;margin-top:auto;">
      <p style="margin:0 0 0.75rem;font-size:0.875rem;opacity:0.7;">${footer.content.copyright || `© ${new Date().getFullYear()} ${name}`}</p>
      <div style="display:flex;justify-content:center;gap:1.5rem;flex-wrap:wrap;">
        ${(footer.content.links || []).map((link) =>
          `<a href="#" style="color:rgba(255,255,255,0.6);text-decoration:none;font-size:0.8125rem;">${link}</a>`
        ).join('')}
      </div>
    </footer>`
    : `<div style="border:2px dashed #d1d5db;background:#f9fafb;padding:2.5rem 2rem;text-align:center;color:#9ca3af;font-family:sans-serif;font-size:0.875rem;">⬜ Footer — Not Built Yet</div>`

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
      background:${backgroundColor};
      color:${textColor};
      min-height:100vh;
      display:flex;
      flex-direction:column;
    }
    main{flex:1}
    a{color:inherit}
    button{cursor:pointer}
  </style>
</head>
<body>
  ${headerHTML}
  <main>
    ${heroHTML}
  </main>
  ${footerHTML}
</body>
</html>`
}

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
