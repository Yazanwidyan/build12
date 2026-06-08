// ─── Preview Engine ───────────────────────────────────────────────────────────
// Generates live HTML/CSS for the website preview iframe from the journey state.
// `reactDemo` is the optional overlay state for Act 9+ interactive chapters.
// ──────────────────────────────────────────────────────────────────────────────

// ── Per-topic content (used for about / features / gallery sections) ──────────
const TOPIC_DATA = {
  pets: {
    emoji: '🐾',
    about: {
      heading: 'About Our Rescue',
      text: 'We connect animals with loving families every day. Every pet deserves a forever home and unconditional love.',
    },
    feats: [
      ['🐶', 'Adopt a Pet',   'Find your perfect four-legged companion'],
      ['🩺', 'Vet Corner',    'Expert health tips and care advice'],
      ['🦴', 'Training Tips', 'Help your pet learn and thrive every day'],
    ],
    gallery: { title: 'Meet Our Animals', items: ['🐶 Buddy', '🐱 Luna', '🐰 Coco', '🐹 Pip', '🦎 Rex', '🐦 Sky'] },
  },
  space: {
    emoji: '🚀',
    about: {
      heading: 'Our Space Mission',
      text: 'We explore the cosmos and bring the wonders of the universe to curious minds everywhere.',
    },
    feats: [
      ['🌍', 'Planet Facts',    'Explore every world in our solar system'],
      ['⭐', 'Star Guide',      'Navigate the night sky like an expert'],
      ['🛸', 'Latest Missions', 'Follow the newest space exploration updates'],
    ],
    gallery: { title: 'Explore the Universe', items: ['🌍 Earth', '🌙 Moon', '⭐ Stars', '🪐 Saturn', '☄️ Comet', '🌌 Galaxy'] },
  },
  music: {
    emoji: '🎵',
    about: {
      heading: 'About This Station',
      text: 'We celebrate music in all its forms — from beginner lessons to live performances and everything in between.',
    },
    feats: [
      ['🎸', 'Learn to Play',  'Step-by-step lessons for all skill levels'],
      ['🎤', 'Open Mic Night', 'Share your talent with the world'],
      ['🎧', 'Playlists',      'Curated music for every mood and moment'],
    ],
    gallery: { title: 'Featured Tracks', items: ['🎸 Rock Classics', '🎵 Pop Hits', '🎻 Classical', '🎤 Vocal', '🎹 Piano', '🥁 Percussion'] },
  },
  sports: {
    emoji: '⚽',
    about: {
      heading: 'About Our Club',
      text: 'We bring athletes together and help everyone improve their game through training, community, and competition.',
    },
    feats: [
      ['🏆', 'Leaderboard',   'Track live scores and standings'],
      ['📅', 'Schedule',      'Never miss a game or big event'],
      ['💪', 'Training Tips', 'Level up your performance every day'],
    ],
    gallery: { title: 'Hall of Fame', items: ['🏆 Season Champs', '⚽ Top Scorer', '🥇 MVP', '📅 Season Finals', '💪 Best Trainer', '🎽 Team Spirit'] },
  },
  gaming: {
    emoji: '🎮',
    about: {
      heading: 'About This Hub',
      text: 'The ultimate destination for gamers — reviews, guides, top scores, and the latest news from the gaming world.',
    },
    feats: [
      ['🏅', 'Top Scores',      'See who\'s leading the leaderboard'],
      ['🎯', 'Strategy Guides', 'Master every level and challenge'],
      ['🕹️', 'Game Reviews',   'Honest takes on the latest releases'],
    ],
    gallery: { title: 'Game Library', items: ['🎮 Action RPG', '🏎️ Racing', '🧩 Puzzle', '🌍 Open World', '⚔️ Strategy', '🎭 Adventure'] },
  },
  art: {
    emoji: '🎨',
    about: {
      heading: 'About This Studio',
      text: 'A creative space where artists of all levels share work, learn new techniques, and find inspiration.',
    },
    feats: [
      ['🖼️', 'Gallery',   'Explore stunning original artwork'],
      ['✏️', 'Tutorials', 'Learn new techniques step by step'],
      ['🌈', 'Showcase',  'Submit and share your own creations'],
    ],
    gallery: { title: 'Art Gallery', items: ['🖼️ Abstract', '✏️ Sketches', '🌈 Watercolor', '🎭 Portraits', '🌿 Nature', '🏙️ Cityscapes'] },
  },
  science: {
    emoji: '🔬',
    about: {
      heading: 'About This Lab',
      text: 'We make science exciting and accessible for everyone — experiments, research, and discoveries that spark curiosity.',
    },
    feats: [
      ['🧪', 'Experiments', 'Safe and fun experiments to try at home'],
      ['📊', 'Research Hub', 'Dive into fascinating discoveries'],
      ['🔭', 'Space Watch', 'Astronomy tips for curious minds'],
    ],
    gallery: { title: 'Lab Collection', items: ['🧪 Chemistry', '🔬 Biology', '⚡ Physics', '🌍 Earth Science', '🔭 Astronomy', '🧬 DNA'] },
  },
  food: {
    emoji: '🍕',
    about: {
      heading: 'About Our Kitchen',
      text: 'From quick weeknight meals to weekend feasts — we share recipes, tips, and foodie adventures for everyone.',
    },
    feats: [
      ['🍳', 'Recipes',           'Easy, delicious meals anyone can make'],
      ['🛒', 'Fresh Ingredients', 'Handpicked picks for every dish'],
      ['⭐', 'Best Spots',        'Our favourite restaurants and cafés'],
    ],
    gallery: { title: 'On the Menu', items: ['🍕 Pizza', '🍣 Sushi', '🍜 Ramen', '🥗 Salads', '🍰 Desserts', '🥤 Drinks'] },
  },
  travel: {
    emoji: '✈️',
    about: {
      heading: 'About This Journey',
      text: 'We inspire travelers with destination guides, honest reviews, and photo diaries from around the globe.',
    },
    feats: [
      ['🗺️', 'Destinations',  'Beautiful places waiting to be explored'],
      ['🏨', 'Where to Stay', 'Handpicked hotels and cosy stays'],
      ['📸', 'Photo Diaries', 'Visual stories from the road'],
    ],
    gallery: { title: 'Destinations', items: ['🗼 Paris', '🗽 New York', '🏯 Tokyo', '🌁 Sydney', '🏝️ Bali', '🏔️ Alps'] },
  },
  fashion: {
    emoji: '👗',
    about: {
      heading: 'About Our Style',
      text: 'Trendsetting looks, DIY fashion guides, and curated shopping — your one-stop destination for personal style.',
    },
    feats: [
      ['✨', 'Latest Trends',   'What\'s hot and fresh this season'],
      ['✂️', 'DIY Style',      'Create your own signature look'],
      ['🛍️', 'Shop the Look', 'Find every outfit featured here'],
    ],
    gallery: { title: 'Style Gallery', items: ['👗 Summer Looks', '🧥 Winter Coats', '👟 Sneakers', '👒 Accessories', '💍 Jewellery', '🕶️ Eyewear'] },
  },
}

function getTopicData(topic) {
  const t = (topic || '').toLowerCase()
  for (const [key, data] of Object.entries(TOPIC_DATA)) {
    if (t.includes(key) || key.includes(t.split(' ')[0])) return data
  }
  return {
    emoji: '✨',
    about: {
      heading: `About ${topic || 'Us'}`,
      text: `We\'re passionate about ${topic || 'what we do'} and love sharing it with the world.`,
    },
    feats: [
      ['⭐', 'Our Mission',   'What we stand for and why it matters'],
      ['💡', 'What We Offer', 'Unique value you won\'t find anywhere else'],
      ['🚀', 'Get Started',   'Jump in and explore everything we have'],
    ],
    gallery: {
      title: 'Our Collection',
      items: ['✨ Feature 1', '⭐ Feature 2', '💡 Feature 3', '🚀 Feature 4', '🎯 Feature 5', '🌟 Feature 6'],
    },
  }
}

// ─────────────────────────────────────────────────────────────────────────────

export function generateWebsiteHTML(website, reactDemo = null) {
  const demo = reactDemo || {}
  const { name, color, topic, sections, styles } = website
  const { header, hero, footer } = sections
  const about    = sections.about    || { built: false, styled: false }
  const features = sections.features || { built: false, styled: false }
  const gallery  = sections.gallery  || { built: false, styled: false }

  // ── Effective styles ──────────────────────────────────────────────────────────
  const effectivePrimary = demo.themeColor || styles.primaryColor || color || '#6366f1'
  const effectiveBg      = demo.darkMode   ? '#0f172a' : (styles.backgroundColor || '#ffffff')
  const effectiveText    = demo.darkMode   ? '#f1f5f9' : (styles.textColor || '#111827')
  const headingSize      = styles.headingSize || '3xl'
  const buttonStyle      = styles.buttonStyle || 'rounded'
  const fontFamily       = styles.fontFamily  || 'sans-serif'
  const buttonColor      = styles.buttonColor || effectivePrimary

  const btnRadius    = buttonStyle === 'pill' ? '9999px' : buttonStyle === 'square' ? '4px' : '10px'
  const headingSizes = { '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.25rem', '5xl': '3rem' }
  const hsz          = headingSizes[headingSize] || '1.875rem'

  const surfaceBg     = demo.darkMode ? '#1e293b' : 'white'
  const surfaceBorder = demo.darkMode ? 'rgba(255,255,255,0.07)' : `${effectivePrimary}18`
  const navTextColor  = demo.darkMode ? 'rgba(255,255,255,0.7)' : '#374151'

  const heroBtnText     = demo.heroBtnText ?? (hero.content?.buttonText || 'Explore')
  const connectedRoutes = demo.connectedRoutes || []
  const td              = getTopicData(topic)

  // ── Header (62px) ─────────────────────────────────────────────────────────────
  const headerHTML = header.built
    ? `<header style="background:${surfaceBg};border-bottom:1.5px solid ${surfaceBorder};padding:0 2rem;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:10;height:62px;box-shadow:0 1px 12px rgba(0,0,0,0.05);">
        <div style="display:flex;align-items:center;gap:0.5rem;">
          <span style="width:9px;height:9px;border-radius:50%;background:${effectivePrimary};display:inline-block;flex-shrink:0;"></span>
          <span style="color:${effectivePrimary};font-size:1.125rem;font-weight:800;letter-spacing:-0.02em;">${header.content.title || name}</span>
        </div>
        <nav style="display:flex;gap:1.5rem;">
          ${(header.content.navLinks || ['Home']).map((link) => {
            const href = (demo.pagesConnected || connectedRoutes.includes(link)) ? `#section-${link.toLowerCase()}` : '#'
            return `<a href="${href}" style="color:${navTextColor};text-decoration:none;font-size:0.875rem;font-weight:500;padding-bottom:2px;border-bottom:2px solid transparent;" onmouseover="this.style.color='${effectivePrimary}';this.style.borderBottomColor='${effectivePrimary}'" onmouseout="this.style.color='${navTextColor}';this.style.borderBottomColor='transparent'">${link}</a>`
          }).join('')}
        </nav>
      </header>`
    : `<div style="background:${surfaceBg};border-bottom:1.5px solid #f1f5f9;padding:0 2rem;display:flex;align-items:center;justify-content:space-between;height:62px;">
        <div style="display:flex;align-items:center;gap:0.5rem;">
          <span style="width:9px;height:9px;border-radius:50%;background:#e2e8f0;display:inline-block;"></span>
          <span style="color:#cbd5e1;font-size:1.1rem;font-weight:800;letter-spacing:-0.02em;">Your Website Name</span>
        </div>
        <div style="display:flex;gap:1.25rem;">
          ${['Page 1','Page 2','Page 3'].map(p => `<span style="color:#e2e8f0;font-size:0.875rem;font-weight:500;">${p}</span>`).join('')}
        </div>
      </div>`

  // ── Hero (320px) ──────────────────────────────────────────────────────────────
  const heroBtn = (hero.content?.buttonText || heroBtnText)
    ? buildHeroButton(heroBtnText, buttonColor, btnRadius, demo, name, website.hasInteractivity)
    : ''

  const heroHTML = hero.built
    ? `<section id="section-home" style="position:relative;background:${effectiveBg};height:320px;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;padding:0 2rem;">
        <div style="position:absolute;top:-70px;right:-70px;width:240px;height:240px;border-radius:50%;background:${effectivePrimary}0c;pointer-events:none;"></div>
        <div style="position:absolute;bottom:-40px;left:-40px;width:160px;height:160px;border-radius:50%;background:${effectivePrimary}07;pointer-events:none;"></div>
        <div style="position:absolute;top:16px;display:inline-flex;align-items:center;gap:0.35rem;padding:0.22rem 0.75rem;border-radius:9999px;background:${effectivePrimary}14;border:1px solid ${effectivePrimary}2a;color:${effectivePrimary};font-size:0.7rem;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;white-space:nowrap;">
          ${td.emoji} ${topic || 'My Website'}
        </div>
        <h2 id="hero-title" style="color:${effectiveText};font-size:${hsz};font-weight:800;line-height:1.2;margin:0;max-width:520px;text-align:center;letter-spacing:-0.025em;">${hero.content?.headline || 'Welcome!'}</h2>
        <p style="color:${effectiveText}7a;font-size:1rem;margin:0;max-width:440px;line-height:1.65;text-align:center;">${hero.content?.subtext || ''}</p>
        ${heroBtn}
      </section>`
    : `<div style="position:relative;height:320px;overflow:hidden;background:${effectiveBg};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;padding:0 2rem;">
        <div style="position:absolute;top:-70px;right:-70px;width:240px;height:240px;border-radius:50%;background:#f1f5f920;pointer-events:none;"></div>
        <div style="position:absolute;bottom:-40px;left:-40px;width:160px;height:160px;border-radius:50%;background:#f8fafc20;pointer-events:none;"></div>
        <div style="width:72px;height:18px;border-radius:9999px;background:#e2e8f0;position:absolute;top:20px;"></div>
        <div style="width:58%;height:32px;border-radius:8px;background:#f1f5f9;animation:shimmer 1.8s ease-in-out infinite;"></div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:7px;width:100%;">
          <div style="width:46%;height:14px;border-radius:5px;background:#f1f5f9;animation:shimmer 1.8s ease-in-out infinite 0.15s;"></div>
          <div style="width:36%;height:14px;border-radius:5px;background:#f1f5f9;animation:shimmer 1.8s ease-in-out infinite 0.3s;"></div>
        </div>
        <div style="width:112px;height:38px;border-radius:${btnRadius};background:#e2e8f0;animation:shimmer 1.8s ease-in-out infinite 0.45s;"></div>
      </div>`

  // ── About section: wireframe (html built) → styled (css challenge done) ───────
  const aboutHTML = about.built
    ? about.styled
      ? `<section style="padding:2.5rem 2rem;background:${effectiveBg};border-top:1px solid ${effectivePrimary}10;animation:fadeIn 0.5s ease-out;">
          <div style="max-width:580px;margin:0 auto;display:flex;gap:2rem;align-items:center;">
            <div style="font-size:3.5rem;flex-shrink:0;">${td.emoji}</div>
            <div>
              <h2 style="color:${effectivePrimary};font-size:1.5rem;font-weight:800;margin:0 0 0.6rem;letter-spacing:-0.02em;">${td.about.heading}</h2>
              <p style="color:${effectiveText};opacity:0.72;font-size:0.9375rem;line-height:1.7;margin:0;">${td.about.text}</p>
            </div>
          </div>
        </section>`
      : `<section style="padding:2.5rem 2rem;background:${effectiveBg};border-top:1px solid #e5e7eb;animation:fadeIn 0.5s ease-out;">
          <div style="max-width:580px;margin:0 auto;">
            <div style="display:inline-block;padding:0.15rem 0.5rem;background:#f1f5f9;border-radius:4px;font-family:monospace;font-size:0.68rem;color:#94a3b8;margin-bottom:0.75rem;">&lt;section&gt;</div>
            <h2 style="color:#374151;font-size:1.5rem;font-weight:800;margin:0 0 0.75rem;line-height:1.3;">${td.about.heading}</h2>
            <p style="color:#6b7280;font-size:0.9375rem;line-height:1.7;margin:0;">${td.about.text}</p>
            <div style="display:inline-block;padding:0.15rem 0.5rem;background:#f1f5f9;border-radius:4px;font-family:monospace;font-size:0.68rem;color:#94a3b8;margin-top:0.75rem;">&lt;/section&gt;</div>
          </div>
        </section>`
    : ''

  // ── Features section: wireframe → styled ──────────────────────────────────────
  const featuresHTML = features.built
    ? features.styled
      ? `<section style="padding:2.5rem 2rem;background:${effectiveBg};border-top:1px solid ${effectiveText}0c;animation:fadeIn 0.5s ease-out;">
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;max-width:640px;margin:0 auto;">
            ${td.feats.map(([emoji, title, desc]) => `
              <div onmouseover="this.style.transform='translateY(-4px)';this.style.boxShadow='0 8px 24px ${effectivePrimary}22'" onmouseout="this.style.transform='none';this.style.boxShadow='none'" style="background:${effectivePrimary}0a;border:1.5px solid ${effectivePrimary}1a;border-radius:16px;padding:1.375rem 1rem;text-align:center;transition:transform 0.18s,box-shadow 0.18s;">
                <div style="font-size:1.75rem;margin-bottom:0.5rem;">${emoji}</div>
                <div style="font-size:0.8rem;font-weight:700;color:${effectiveText};margin-bottom:0.3rem;">${title}</div>
                <div style="font-size:0.72rem;color:${effectiveText}60;line-height:1.5;">${desc}</div>
              </div>`).join('')}
          </div>
        </section>`
      : `<section style="padding:2rem;background:${effectiveBg};border-top:1px solid #e5e7eb;animation:fadeIn 0.5s ease-out;">
          <div style="max-width:640px;margin:0 auto;">
            <div style="display:inline-block;padding:0.15rem 0.5rem;background:#f1f5f9;border-radius:4px;font-family:monospace;font-size:0.68rem;color:#94a3b8;margin-bottom:0.75rem;">&lt;ul&gt;</div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:0.75rem;">
              ${td.feats.map(([emoji, title]) => `
                <div style="background:#f8fafc;border:1.5px solid #e5e7eb;border-radius:10px;padding:1rem;text-align:center;">
                  <div style="font-size:1.5rem;margin-bottom:0.4rem;">${emoji}</div>
                  <div style="font-size:0.8rem;font-weight:600;color:#374151;">${title}</div>
                </div>`).join('')}
            </div>
            <div style="display:inline-block;padding:0.15rem 0.5rem;background:#f1f5f9;border-radius:4px;font-family:monospace;font-size:0.68rem;color:#94a3b8;margin-top:0.75rem;">&lt;/ul&gt;</div>
          </div>
        </section>`
    : ''

  // ── Gallery section: wireframe → styled ───────────────────────────────────────
  const galleryHTML = gallery.built
    ? gallery.styled
      ? `<section id="section-gallery" style="padding:2.5rem 2rem;background:${effectiveBg};border-top:1px solid ${effectiveText}0c;animation:fadeIn 0.5s ease-out;">
          <h3 style="text-align:center;color:${effectiveText};font-size:1.125rem;font-weight:800;margin:0 0 1.5rem;letter-spacing:-0.01em;">${td.gallery.title}</h3>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:0.75rem;max-width:520px;margin:0 auto;">
            ${td.gallery.items.map(item => `
              <div onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='none'" style="background:${effectivePrimary}0d;border:1.5px solid ${effectivePrimary}1a;border-radius:12px;padding:1rem 0.5rem;text-align:center;font-size:0.8rem;font-weight:600;color:${effectiveText};transition:transform 0.2s;">
                ${item}
              </div>`).join('')}
          </div>
        </section>`
      : `<section style="padding:2rem;background:${effectiveBg};border-top:1px solid #e5e7eb;animation:fadeIn 0.5s ease-out;">
          <div style="max-width:520px;margin:0 auto;">
            <div style="display:inline-block;padding:0.15rem 0.5rem;background:#f1f5f9;border-radius:4px;font-family:monospace;font-size:0.68rem;color:#94a3b8;margin-bottom:0.75rem;">document.querySelector()</div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:0.6rem;">
              ${td.gallery.items.map(item => `
                <div style="background:#f8fafc;border:1.5px solid #e5e7eb;border-radius:8px;padding:0.75rem 0.5rem;text-align:center;font-size:0.78rem;font-weight:500;color:#6b7280;">
                  ${item}
                </div>`).join('')}
            </div>
          </div>
        </section>`
    : ''

  // ── Footer (110px built / 100px unbuilt) ──────────────────────────────────────
  const footerBg   = demo.darkMode ? '#020617' : '#1e293b'
  const footerHTML = footer.built
    ? `<footer style="background:${footerBg};color:white;padding:0 2rem;height:110px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.625rem;">
        <p style="margin:0;font-size:0.875rem;opacity:0.55;font-weight:500;">${footer.content?.copyright || `© ${new Date().getFullYear()} ${name}`}</p>
        <div style="display:flex;justify-content:center;gap:1.5rem;flex-wrap:wrap;">
          ${(footer.content?.links || []).map(link =>
            `<a href="#" style="color:rgba(255,255,255,0.38);text-decoration:none;font-size:0.8125rem;font-weight:500;" onmouseover="this.style.color='rgba(255,255,255,0.85)'" onmouseout="this.style.color='rgba(255,255,255,0.38)'">${link}</a>`
          ).join('')}
        </div>
      </footer>`
    : `<div style="background:${footerBg};height:100px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.625rem;padding:0 2rem;">
        <div style="width:150px;height:13px;border-radius:5px;background:rgba(255,255,255,0.1);"></div>
        <div style="display:flex;gap:1.25rem;">
          ${[72, 54, 64].map(w => `<div style="width:${w}px;height:11px;border-radius:4px;background:rgba(255,255,255,0.07);"></div>`).join('')}
        </div>
      </div>`

  // ── React demo sections (Acts 9+) ─────────────────────────────────────────────
  const demoSections = buildDemoSections(demo, effectivePrimary, effectiveBg, effectiveText, btnRadius, buttonColor, name, topic)

  const highlightCSS = demo.highlightButtons ? `
    @keyframes pulse-ring {
      0%   { box-shadow: 0 0 0 0 ${effectivePrimary}88; }
      70%  { box-shadow: 0 0 0 10px ${effectivePrimary}00; }
      100% { box-shadow: 0 0 0 0 ${effectivePrimary}00; }
    }
    button { animation: pulse-ring 1.8s ease-out infinite; }
  ` : ''

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
    button{cursor:pointer;border:none}
    @keyframes shimmer{0%{opacity:1}50%{opacity:0.5}100%{opacity:1}}
    @keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
    ${highlightCSS}
  </style>
</head>
<body>
  ${headerHTML}
  <main>
    ${heroHTML}
    ${aboutHTML}
    ${featuresHTML}
    ${galleryHTML}
    ${demoSections}
  </main>
  ${footerHTML}
</body>
</html>`
}

// ── Hero button with optional interactivity ───────────────────────────────────
function buildHeroButton(text, btnColor, btnRadius, demo, siteName, hasInteractivity) {
  const base  = `background:${btnColor};color:white;border:none;padding:0.75rem 2rem;border-radius:${btnRadius};font-size:0.9375rem;font-weight:700;cursor:pointer;margin-top:0.25rem;letter-spacing:0.01em;box-shadow:0 4px 14px ${btnColor}44;transition:opacity 0.2s,transform 0.15s;`
  const hover = `onmouseover="this.style.opacity='0.9';this.style.transform='translateY(-1px)'" onmouseout="this.style.opacity='1';this.style.transform='none'"`

  // Student completed JS event listener challenge
  if (hasInteractivity && !demo.mode) {
    return `<button style="${base}" ${hover} onclick="alert('Welcome to ${siteName}! 🎉')">${text}</button>`
  }

  // React demo modes
  if (demo.mode === 'events' || demo.showDeadButton) {
    const action = demo.eventAction
    if (!action) return `<button style="${base}" ${hover}>${text}</button>`
    if (action === 'message')
      return `<button style="${base}" ${hover} onclick="alert('Welcome to ${siteName}! 🎉')">${text}</button>`
    if (action === 'popup')
      return `<button style="${base}" ${hover} onclick="document.getElementById('demo-popup').style.display='flex'">${text}</button>
              <div id="demo-popup" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.5);align-items:center;justify-content:center;z-index:999;" onclick="this.style.display='none'">
                <div style="background:white;border-radius:16px;padding:2rem;text-align:center;max-width:280px;">
                  <p style="font-size:1.25rem;font-weight:700;margin-bottom:0.5rem;">🎉 You opened a popup!</p>
                  <p style="color:#6b7280;font-size:0.875rem;">This is what onClick can do!</p>
                  <button style="margin-top:1rem;background:#6366f1;color:white;border:none;padding:0.5rem 1.5rem;border-radius:8px;cursor:pointer;" onclick="document.getElementById('demo-popup').style.display='none'">Close</button>
                </div>
              </div>`
    if (action === 'text-change')
      return `<button style="${base}" ${hover} onclick="this.textContent = this.textContent === '${text}' ? 'You clicked! ✅' : '${text}'">${text}</button>`
  }

  return `<button style="${base}" ${hover}>${text}</button>`
}

// ── React demo extra sections (Acts 9+) ───────────────────────────────────────
function buildDemoSections(demo, primary, bg, text, btnRadius, btnColor, siteName, topic) {
  const sections = []

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

  if (demo.showThemeBar || demo.mode === 'state') {
    const isDark = demo.darkMode
    sections.unshift(`
      <div id="theme-bar" style="background:${isDark ? '#1e293b' : '#f8fafc'};border-bottom:1px solid ${isDark ? '#334155' : '#e2e8f0'};padding:0.6rem 2rem;display:flex;align-items:center;gap:1rem;font-size:0.8rem;">
        <span style="color:${isDark ? '#94a3b8' : '#64748b'};font-weight:600;">⚙️ Theme Settings</span>
        <span style="color:${isDark ? '#f1f5f9' : '#111827'};font-weight:700;margin-left:auto;">${isDark ? '🌙 Dark Mode is ON' : '☀️ Light Mode is ON'}</span>
        ${demo.activeSettingDemo === 'fontSize' ? `<span style="color:${primary};font-weight:600;">📏 Font Size: Large</span>` : ''}
        ${demo.activeSettingDemo === 'heroText'  ? `<span style="color:${primary};font-weight:600;">✏️ Hero Text: Custom</span>` : ''}
      </div>`)
  }

  if (demo.showPets && demo.pets?.length > 0) {
    const petEmojis = ['🐶', '🐱', '🐰', '🐹', '🐦', '🐠', '🦎', '🐢', '🐾']
    sections.push(`
      <section id="section-gallery" style="padding:3rem 2rem;background:${bg};border-top:1px solid ${text}11;">
        <h3 style="text-align:center;color:${text};font-size:1.25rem;font-weight:800;margin-bottom:0.5rem;">🐾 Our Pets</h3>
        <p style="text-align:center;color:${text}66;font-size:0.875rem;margin-bottom:2rem;">${demo.pets.length} wonderful friend${demo.pets.length === 1 ? '' : 's'}</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:1rem;max-width:600px;margin:0 auto;">
          ${demo.pets.map((pet, i) => `
            <div onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='none'" style="background:${primary}14;border:2px solid ${primary}22;border-radius:16px;padding:1.25rem 0.75rem;text-align:center;transition:transform 0.2s;">
              <div style="font-size:2rem;margin-bottom:0.5rem;">${petEmojis[i % petEmojis.length]}</div>
              <p style="font-size:0.8rem;font-weight:700;color:${text};word-break:break-word;">${pet}</p>
            </div>`).join('')}
        </div>
      </section>`)
  }

  if (demo.showConditional) {
    const messages = {
      kid:     { title: 'Hey there, future builder! 🎉', sub: 'Build something amazing today!',          bg: '#fef3c7', border: '#f59e0b', color: '#92400e' },
      parent:  { title: 'Welcome, Parent! 👩‍👧',          sub: 'Explore coding resources for your child.', bg: '#dbeafe', border: '#3b82f6', color: '#1e3a8a' },
      teacher: { title: 'Welcome, Educator! 👩‍🏫',       sub: 'Access classroom tools and curriculum.',    bg: '#d1fae5', border: '#10b981', color: '#064e3b' },
      null:    { title: 'Welcome, Visitor! 👋',           sub: 'Discover what we have to offer.',           bg: '#f3f4f6', border: '#d1d5db', color: text },
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

// ─────────────────────────────────────────────────────────────────────────────

export function interpolateCode(template, website) {
  if (!template) return ''
  return template
    .replace(/\{\{name\}\}/g,            website.name || 'My Website')
    .replace(/\{\{topic\}\}/g,           website.topic || 'my topic')
    .replace(/\{\{primaryColor\}\}/g,    website.styles.primaryColor || website.color || '#6366f1')
    .replace(/\{\{backgroundColor\}\}/g, website.styles.backgroundColor || '#ffffff')
    .replace(/\{\{headline\}\}/g,        website.sections.hero?.content?.headline || 'Welcome!')
    .replace(/\{\{subtext\}\}/g,         website.sections.hero?.content?.subtext  || '')
    .replace(/\{\{buttonText\}\}/g,      website.sections.hero?.content?.buttonText || 'Explore')
}
