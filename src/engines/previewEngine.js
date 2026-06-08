// ─── Preview Engine ───────────────────────────────────────────────────────────
// Generates live HTML/CSS for the website preview iframe from the journey state.
// `reactDemo` is the optional overlay state for Act 9+ interactive chapters.
// ──────────────────────────────────────────────────────────────────────────────

// ── Per-topic content ─────────────────────────────────────────────────────────
const TOPIC_DATA = {
  pets: {
    emoji: "🐾",
    about: {
      heading: "About Our Rescue",
      text: "We connect animals with loving families every day. Every pet deserves a forever home and unconditional love.",
    },
    feats: [
      ["🐶", "Adopt a Pet", "Find your perfect four-legged companion"],
      ["🩺", "Vet Corner", "Expert health tips and care advice"],
      ["🦴", "Training Tips", "Help your pet learn and thrive every day"],
    ],
    gallery: {
      title: "Meet Our Animals",
      items: ["🐶 Buddy", "🐱 Luna", "🐰 Coco", "🐹 Pip", "🦎 Rex", "🐦 Sky"],
    },
    testimonials: [
      {
        name: "Sarah M.",
        text: "Adopted Buddy last year — best decision we ever made!",
      },
      {
        name: "Tom K.",
        text: "The training tips completely transformed our dog.",
      },
      {
        name: "Lisa P.",
        text: "Our rescue cat Luna is the sweetest thing ever.",
      },
    ],
    contact: {
      heading: "Want to Adopt?",
      subtext: "Reach out and we'll match you with your perfect companion.",
    },
  },
  space: {
    emoji: "🚀",
    about: {
      heading: "Our Space Mission",
      text: "We explore the cosmos and bring the wonders of the universe to curious minds everywhere.",
    },
    feats: [
      ["🌍", "Planet Facts", "Explore every world in our solar system"],
      ["⭐", "Star Guide", "Navigate the night sky like an expert"],
      ["🛸", "Latest Missions", "Follow the newest space exploration updates"],
    ],
    gallery: {
      title: "Explore the Universe",
      items: [
        "🌍 Earth",
        "🌙 Moon",
        "⭐ Stars",
        "🪐 Saturn",
        "☄️ Comet",
        "🌌 Galaxy",
      ],
    },
    testimonials: [
      {
        name: "Alex R.",
        text: "Finally understand black holes thanks to this site!",
      },
      {
        name: "Priya S.",
        text: "The star guide made my camping trip magical.",
      },
      { name: "Jordan L.", text: "Best space resource for curious minds." },
    ],
    contact: {
      heading: "Join the Mission",
      subtext: "Connect with our community of space explorers and stargazers.",
    },
  },
  music: {
    emoji: "🎵",
    about: {
      heading: "About This Station",
      text: "We celebrate music in all its forms — from beginner lessons to live performances and everything in between.",
    },
    feats: [
      ["🎸", "Learn to Play", "Step-by-step lessons for all skill levels"],
      ["🎤", "Open Mic Night", "Share your talent with the world"],
      ["🎧", "Playlists", "Curated music for every mood and moment"],
    ],
    gallery: {
      title: "Featured Tracks",
      items: [
        "🎸 Rock Classics",
        "🎵 Pop Hits",
        "🎻 Classical",
        "🎤 Vocal",
        "🎹 Piano",
        "🥁 Percussion",
      ],
    },
    testimonials: [
      {
        name: "Maya T.",
        text: "Learned guitar in 3 months with these lessons!",
      },
      {
        name: "Caleb D.",
        text: "The playlists are absolutely perfect for studying.",
      },
      {
        name: "Nina K.",
        text: "Open mic night changed my life. Incredible community.",
      },
    ],
    contact: {
      heading: "Get In Touch",
      subtext:
        "Questions about lessons, performances, or playlists? We'd love to hear from you.",
    },
  },
  sports: {
    emoji: "⚽",
    about: {
      heading: "About Our Club",
      text: "We bring athletes together and help everyone improve their game through training, community, and competition.",
    },
    feats: [
      ["🏆", "Leaderboard", "Track live scores and standings"],
      ["📅", "Schedule", "Never miss a game or big event"],
      ["💪", "Training Tips", "Level up your performance every day"],
    ],
    gallery: {
      title: "Hall of Fame",
      items: [
        "🏆 Season Champs",
        "⚽ Top Scorer",
        "🥇 MVP",
        "📅 Season Finals",
        "💪 Best Trainer",
        "🎽 Team Spirit",
      ],
    },
    testimonials: [
      {
        name: "Diego M.",
        text: "Training tips helped me score 12 goals this season!",
      },
      {
        name: "Emma W.",
        text: "Best sports community I've ever been part of.",
      },
      {
        name: "Kyle B.",
        text: "The schedule feature keeps our whole team organised.",
      },
    ],
    contact: {
      heading: "Join the Club",
      subtext:
        "Ready to train, compete, and win? Get in touch with our coaching team.",
    },
  },
  gaming: {
    emoji: "🎮",
    about: {
      heading: "About This Hub",
      text: "The ultimate destination for gamers — reviews, guides, top scores, and the latest news from the gaming world.",
    },
    feats: [
      ["🏅", "Top Scores", "See who's leading the leaderboard"],
      ["🎯", "Strategy Guides", "Master every level and challenge"],
      ["🕹️", "Game Reviews", "Honest takes on the latest releases"],
    ],
    gallery: {
      title: "Game Library",
      items: [
        "🎮 Action RPG",
        "🏎️ Racing",
        "🧩 Puzzle",
        "🌍 Open World",
        "⚔️ Strategy",
        "🎭 Adventure",
      ],
    },
    testimonials: [
      {
        name: "Zach P.",
        text: "The strategy guides helped me finally beat the final boss!",
      },
      {
        name: "Ava L.",
        text: "Best game reviews on the internet — always honest.",
      },
      {
        name: "Marco S.",
        text: "Top scores leaderboard keeps me coming back every day.",
      },
    ],
    contact: {
      heading: "Level Up Together",
      subtext:
        "Got a game tip or want to submit your top score? Reach out to the hub.",
    },
  },
  art: {
    emoji: "🎨",
    about: {
      heading: "About This Studio",
      text: "A creative space where artists of all levels share work, learn new techniques, and find inspiration.",
    },
    feats: [
      ["🖼️", "Gallery", "Explore stunning original artwork"],
      ["✏️", "Tutorials", "Learn new techniques step by step"],
      ["🌈", "Showcase", "Submit and share your own creations"],
    ],
    gallery: {
      title: "Art Gallery",
      items: [
        "🖼️ Abstract",
        "✏️ Sketches",
        "🌈 Watercolor",
        "🎭 Portraits",
        "🌿 Nature",
        "🏙️ Cityscapes",
      ],
    },
    testimonials: [
      {
        name: "Isla R.",
        text: "The watercolor tutorials took my art to the next level.",
      },
      {
        name: "Omar N.",
        text: "Submitting to the showcase was life-changing for my career.",
      },
      {
        name: "Jess T.",
        text: "This is where I go every day for creative inspiration.",
      },
    ],
    contact: {
      heading: "Let's Create Together",
      subtext:
        "Share your art, request a tutorial, or just say hello to our artist community.",
    },
  },
  science: {
    emoji: "🔬",
    about: {
      heading: "About This Lab",
      text: "We make science exciting and accessible for everyone — experiments, research, and discoveries that spark curiosity.",
    },
    feats: [
      ["🧪", "Experiments", "Safe and fun experiments to try at home"],
      ["📊", "Research Hub", "Dive into fascinating discoveries"],
      ["🔭", "Space Watch", "Astronomy tips for curious minds"],
    ],
    gallery: {
      title: "Lab Collection",
      items: [
        "🧪 Chemistry",
        "🔬 Biology",
        "⚡ Physics",
        "🌍 Earth Science",
        "🔭 Astronomy",
        "🧬 DNA",
      ],
    },
    testimonials: [
      {
        name: "Finn O.",
        text: "The home experiments section is brilliant for my kids.",
      },
      {
        name: "Rosa C.",
        text: "Finally a science site that explains things clearly!",
      },
      {
        name: "Sam H.",
        text: "Research hub helped me with my school project. 10/10.",
      },
    ],
    contact: {
      heading: "Ask the Lab",
      subtext:
        "Got a science question or experiment idea? Our team would love to hear it.",
    },
  },
  food: {
    emoji: "🍕",
    about: {
      heading: "About Our Kitchen",
      text: "From quick weeknight meals to weekend feasts — we share recipes, tips, and foodie adventures for everyone.",
    },
    feats: [
      ["🍳", "Recipes", "Easy, delicious meals anyone can make"],
      ["🛒", "Fresh Ingredients", "Handpicked picks for every dish"],
      ["⭐", "Best Spots", "Our favourite restaurants and cafés"],
    ],
    gallery: {
      title: "On the Menu",
      items: [
        "🍕 Pizza",
        "🍣 Sushi",
        "🍜 Ramen",
        "🥗 Salads",
        "🍰 Desserts",
        "🥤 Drinks",
      ],
    },
    testimonials: [
      {
        name: "Claire B.",
        text: "Made the ramen recipe for my whole family — they loved it!",
      },
      {
        name: "Yusuf A.",
        text: "Best spot recommendations in the city. Always accurate.",
      },
      {
        name: "Mia J.",
        text: "My cooking improved so much since I found this kitchen.",
      },
    ],
    contact: {
      heading: "Got a Recipe?",
      subtext:
        "Share your favourite dish or ask us anything about cooking and ingredients.",
    },
  },
  travel: {
    emoji: "✈️",
    about: {
      heading: "About This Journey",
      text: "We inspire travelers with destination guides, honest reviews, and photo diaries from around the globe.",
    },
    feats: [
      ["🗺️", "Destinations", "Beautiful places waiting to be explored"],
      ["🏨", "Where to Stay", "Handpicked hotels and cosy stays"],
      ["📸", "Photo Diaries", "Visual stories from the road"],
    ],
    gallery: {
      title: "Destinations",
      items: [
        "🗼 Paris",
        "🗽 New York",
        "🏯 Tokyo",
        "🌁 Sydney",
        "🏝️ Bali",
        "🏔️ Alps",
      ],
    },
    testimonials: [
      {
        name: "Ana S.",
        text: "The Tokyo guide made our trip absolutely perfect.",
      },
      {
        name: "Ben F.",
        text: "Every hotel recommendation was spot on. No duds!",
      },
      {
        name: "Lara M.",
        text: "Photo diaries inspire me to travel somewhere new every month.",
      },
    ],
    contact: {
      heading: "Plan Your Next Trip",
      subtext:
        "Tell us your dream destination and we'll help you make it happen.",
    },
  },
  fashion: {
    emoji: "👗",
    about: {
      heading: "About Our Style",
      text: "Trendsetting looks, DIY fashion guides, and curated shopping — your one-stop destination for personal style.",
    },
    feats: [
      ["✨", "Latest Trends", "What's hot and fresh this season"],
      ["✂️", "DIY Style", "Create your own signature look"],
      ["🛍️", "Shop the Look", "Find every outfit featured here"],
    ],
    gallery: {
      title: "Style Gallery",
      items: [
        "👗 Summer Looks",
        "🧥 Winter Coats",
        "👟 Sneakers",
        "👒 Accessories",
        "💍 Jewellery",
        "🕶️ Eyewear",
      ],
    },
    testimonials: [
      {
        name: "Cleo V.",
        text: "The DIY guides helped me create my signature look!",
      },
      { name: "Jake R.", text: "Shop the Look feature saves me so much time." },
      {
        name: "Nadia T.",
        text: "Best trend forecasting I've found anywhere online.",
      },
    ],
    contact: {
      heading: "Style Questions?",
      subtext:
        "Ask about trends, DIY tips, or submit your own look to be featured.",
    },
  },
};

function getTopicData(topic) {
  const t = (topic || "").toLowerCase();
  for (const [key, data] of Object.entries(TOPIC_DATA)) {
    if (t.includes(key) || key.includes(t.split(" ")[0])) return data;
  }
  return {
    emoji: "✨",
    about: {
      heading: `About ${topic || "Us"}`,
      text: `We're passionate about ${topic || "what we do"} and love sharing it with the world.`,
    },
    feats: [
      ["⭐", "Our Mission", "What we stand for and why it matters"],
      ["💡", "What We Offer", "Unique value you won't find anywhere else"],
      ["🚀", "Get Started", "Jump in and explore everything we have"],
    ],
    gallery: {
      title: "Our Collection",
      items: [
        "✨ Feature 1",
        "⭐ Feature 2",
        "💡 Feature 3",
        "🚀 Feature 4",
        "🎯 Feature 5",
        "🌟 Feature 6",
      ],
    },
    testimonials: [
      {
        name: "Alex R.",
        text: "This site completely changed how I think about the topic.",
      },
      {
        name: "Sam T.",
        text: "Highly recommended to everyone I know. Amazing resource.",
      },
      {
        name: "Jamie L.",
        text: "I come back every week. Best content anywhere online.",
      },
    ],
    contact: {
      heading: "Get In Touch",
      subtext: "We'd love to hear from you. Drop us a message anytime.",
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────

export function generateWebsiteHTML(website, reactDemo = null) {
  const demo = reactDemo || {};
  const { name, color, topic, sections, styles } = website;
  const header = sections.header || {
    built: false,
    styled: false,
    content: {},
  };
  const hero = sections.hero || { built: false, styled: false, content: {} };
  const about = sections.about || { built: false, styled: false };
  const features = sections.features || { built: false, styled: false };
  const gallery = sections.gallery || { built: false, styled: false };
  const testimonials = sections.testimonials || { built: false, styled: false };
  const contact = sections.contact || { built: false, styled: false };
  const footer = sections.footer || {
    built: false,
    styled: false,
    content: {},
  };

  // ── Effective styles ──────────────────────────────────────────────────────────
  const effectivePrimary =
    demo.themeColor || styles.primaryColor || color || "#6366f1";
  const effectiveBg = demo.darkMode
    ? "#0f172a"
    : styles.backgroundColor || "#ffffff";
  const effectiveText = demo.darkMode
    ? "#f1f5f9"
    : styles.textColor || "#111827";
  const headingSize = styles.headingSize || "3xl";
  const buttonStyle = styles.buttonStyle || "rounded";
  const fontFamily = styles.fontFamily || "sans-serif";
  const buttonColor = styles.buttonColor || effectivePrimary;

  const btnRadius =
    buttonStyle === "pill"
      ? "9999px"
      : buttonStyle === "square"
        ? "4px"
        : "10px";
  const headingSizes = {
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
  };
  const hsz = headingSizes[headingSize] || "1.875rem";

  const surfaceBg = demo.darkMode ? "#1e293b" : "white";
  const surfaceBorder = demo.darkMode
    ? "rgba(255,255,255,0.07)"
    : `${effectivePrimary}18`;
  const navTextColor = demo.darkMode ? "rgba(255,255,255,0.7)" : "#374151";

  const heroBtnText =
    demo.heroBtnText ?? (hero.content?.buttonText || "Explore");
  const connectedRoutes = demo.connectedRoutes || [];
  const td = getTopicData(topic);

  // ── Header ────────────────────────────────────────────────────────────────────
  const headerHTML = !header.built
    ? `<div style="height:62px;border-bottom:1.5px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;padding:0 2rem;">
        <div style="width:110px;height:2px;border-top:2px dashed #e2e8f0;border-radius:2px;"></div>
        <div style="display:flex;gap:1rem;">
          <div style="width:44px;height:2px;border-top:2px dashed #e2e8f0;"></div>
          <div style="width:44px;height:2px;border-top:2px dashed #e2e8f0;"></div>
          <div style="width:44px;height:2px;border-top:2px dashed #e2e8f0;"></div>
        </div>
      </div>`
    : header.styled
      ? `<header style="background:${surfaceBg};border-bottom:1.5px solid ${surfaceBorder};padding:0 2rem;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:10;height:62px;box-shadow:0 1px 12px rgba(0,0,0,0.05);animation:fadeIn 0.4s ease-out;">
        <div style="display:flex;align-items:center;gap:0.5rem;">
          <span style="width:9px;height:9px;border-radius:50%;background:${effectivePrimary};display:inline-block;flex-shrink:0;"></span>
          <span style="color:${effectivePrimary};font-size:1.125rem;font-weight:800;letter-spacing:-0.02em;">${header.content?.title || name}</span>
        </div>
        <nav style="display:flex;gap:1.5rem;">
          ${(header.content?.navLinks || ["Home"])
            .map((link) => {
              const href =
                demo.pagesConnected || connectedRoutes.includes(link)
                  ? `#section-${link.toLowerCase()}`
                  : "#";
              return `<a href="${href}" style="color:${navTextColor};text-decoration:none;font-size:0.875rem;font-weight:500;padding-bottom:2px;border-bottom:2px solid transparent;" onmouseover="this.style.color='${effectivePrimary}';this.style.borderBottomColor='${effectivePrimary}'" onmouseout="this.style.color='${navTextColor}';this.style.borderBottomColor='transparent'">${link}</a>`;
            })
            .join("")}
        </nav>
      </header>`
      : `<header style="background:#f8fafc;border-bottom:1.5px solid #e5e7eb;padding:0 2rem;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:10;height:62px;animation:fadeIn 0.4s ease-out;">
        <div style="display:flex;align-items:center;gap:0.5rem;">
          <span style="width:9px;height:9px;border-radius:50%;background:#cbd5e1;display:inline-block;flex-shrink:0;"></span>
          <span style="color:#374151;font-size:1.125rem;font-weight:800;letter-spacing:-0.02em;">${header.content?.title || name}</span>
          <span style="font-family:monospace;font-size:0.62rem;color:#94a3b8;padding:0.1rem 0.4rem;background:#f1f5f9;border-radius:3px;margin-left:0.3rem;">&lt;header&gt;</span>
        </div>
        <nav style="display:flex;gap:1.5rem;">
          ${(header.content?.navLinks || ["Home", "About", "Contact"])
            .map(
              (link) =>
                `<a href="#" style="color:#9ca3af;text-decoration:none;font-size:0.875rem;font-weight:500;">${link}</a>`,
            )
            .join("")}
        </nav>
      </header>`;

  // ── Hero ──────────────────────────────────────────────────────────────────────
  const heroBtn =
    hero.content?.buttonText || heroBtnText
      ? buildHeroButton(
          heroBtnText,
          buttonColor,
          btnRadius,
          demo,
          name,
          website.hasInteractivity,
          hero.styled,
        )
      : "";

  const heroHTML = !hero.built
    ? `<div style="min-height:360px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;padding:2rem;">
        <div style="width:200px;height:2px;border-top:2px dashed #e2e8f0;"></div>
        <div style="width:300px;height:2px;border-top:2px dashed #e2e8f0;"></div>
        <div style="width:240px;height:2px;border-top:2px dashed #e2e8f0;"></div>
        <div style="width:96px;height:2px;border-top:2px dashed #e2e8f0;margin-top:8px;"></div>
      </div>`
    : hero.styled
      ? `<section id="section-home" style="position:relative;background:${effectiveBg};height:320px;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;padding:0 2rem;animation:fadeIn 0.4s ease-out;">
        <div style="position:absolute;top:-70px;right:-70px;width:240px;height:240px;border-radius:50%;background:${effectivePrimary}0c;pointer-events:none;"></div>
        <div style="position:absolute;bottom:-40px;left:-40px;width:160px;height:160px;border-radius:50%;background:${effectivePrimary}07;pointer-events:none;"></div>
        <div style="position:absolute;top:16px;display:inline-flex;align-items:center;gap:0.35rem;padding:0.22rem 0.75rem;border-radius:9999px;background:${effectivePrimary}14;border:1px solid ${effectivePrimary}2a;color:${effectivePrimary};font-size:0.7rem;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;white-space:nowrap;">
          ${td.emoji} ${topic || "My Website"}
        </div>
        <h2 id="hero-title" style="color:${effectiveText};font-size:${hsz};font-weight:800;line-height:1.2;margin:0;max-width:520px;text-align:center;letter-spacing:-0.025em;">${hero.content?.headline || "Welcome!"}</h2>
        <p style="color:${effectiveText}7a;font-size:1rem;margin:0;max-width:440px;line-height:1.65;text-align:center;">${hero.content?.subtext || ""}</p>
        ${heroBtn}
      </section>`
      : `<section style="position:relative;background:#f9fafb;height:320px;overflow:hidden;display:flex;flex-direction:column;flex:1;align-items:center;justify-content:center;gap:1rem;padding:0 2rem;border-bottom:1px solid #e5e7eb;animation:fadeIn 0.4s ease-out;">
        <div style="position:absolute;top:-70px;right:-70px;width:240px;height:240px;border-radius:50%;background:#e5e7eb20;pointer-events:none;"></div>
        <div style="position:absolute;top:12px;font-family:monospace;font-size:0.62rem;color:#94a3b8;background:#f1f5f9;padding:0.1rem 0.45rem;border-radius:3px;">&lt;main&gt;</div>
        <h2 id="hero-title" style="color:#374151;font-size:${hsz};font-weight:800;line-height:1.2;margin:0;max-width:520px;text-align:center;">${hero.content?.headline || "Your Headline Here"}</h2>
        <p style="color:#9ca3af;font-size:1rem;margin:0;max-width:440px;line-height:1.65;text-align:center;">${hero.content?.subtext || ""}</p>
        <button style="background:#e5e7eb;color:#6b7280;border:none;padding:0.75rem 2rem;border-radius:${btnRadius};font-size:0.9375rem;font-weight:700;cursor:default;margin-top:0.25rem;">${hero.content?.buttonText || "Explore"}</button>
      </section>`;

  // ── About: wireframe → styled ─────────────────────────────────────────────────
  const aboutHTML = about.built
    ? about.styled
      ? `<section style="padding:2.5rem 2rem;background:${effectiveBg};border-top:1px solid ${effectivePrimary}10;animation:fadeIn 0.5s ease-out;">
          <div style="max-width:860px;margin:0 auto;display:flex;gap:2.5rem;align-items:center;">
            <div style="font-size:3.5rem;flex-shrink:0;">${td.emoji}</div>
            <div>
              <h2 style="color:${effectivePrimary};font-size:1.5rem;font-weight:800;margin:0 0 0.6rem;letter-spacing:-0.02em;">${td.about.heading}</h2>
              <p style="color:${effectiveText};opacity:0.72;font-size:0.9375rem;line-height:1.7;margin:0;">${td.about.text}</p>
            </div>
          </div>
        </section>`
      : `<section style="padding:2.5rem 2rem;background:${effectiveBg};border-top:1px solid #e5e7eb;animation:fadeIn 0.5s ease-out;">
          <div style="max-width:860px;margin:0 auto;">
            <div style="display:inline-block;padding:0.15rem 0.5rem;background:#f1f5f9;border-radius:4px;font-family:monospace;font-size:0.68rem;color:#94a3b8;margin-bottom:0.75rem;">&lt;section&gt;</div>
            <h2 style="color:#374151;font-size:1.5rem;font-weight:800;margin:0 0 0.75rem;line-height:1.3;">${td.about.heading}</h2>
            <p style="color:#6b7280;font-size:0.9375rem;line-height:1.7;margin:0;">${td.about.text}</p>
            <div style="display:inline-block;padding:0.15rem 0.5rem;background:#f1f5f9;border-radius:4px;font-family:monospace;font-size:0.68rem;color:#94a3b8;margin-top:0.75rem;">&lt;/section&gt;</div>
          </div>
        </section>`
    : "";

  // ── Features: wireframe → styled ──────────────────────────────────────────────
  const featuresHTML = features.built
    ? features.styled
      ? `<section style="padding:2.5rem 2rem;background:${effectiveBg};border-top:1px solid ${effectiveText}0c;animation:fadeIn 0.5s ease-out;">
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;max-width:900px;margin:0 auto;">
            ${td.feats
              .map(
                ([emoji, title, desc]) => `
              <div onmouseover="this.style.transform='translateY(-4px)';this.style.boxShadow='0 8px 24px ${effectivePrimary}22'" onmouseout="this.style.transform='none';this.style.boxShadow='none'" style="background:${effectivePrimary}0a;border:1.5px solid ${effectivePrimary}1a;border-radius:16px;padding:1.375rem 1rem;text-align:center;transition:transform 0.18s,box-shadow 0.18s;">
                <div style="font-size:1.75rem;margin-bottom:0.5rem;">${emoji}</div>
                <div style="font-size:0.8rem;font-weight:700;color:${effectiveText};margin-bottom:0.3rem;">${title}</div>
                <div style="font-size:0.72rem;color:${effectiveText}60;line-height:1.5;">${desc}</div>
              </div>`,
              )
              .join("")}
          </div>
        </section>`
      : `<section style="padding:2rem;background:${effectiveBg};border-top:1px solid #e5e7eb;animation:fadeIn 0.5s ease-out;">
          <div style="max-width:900px;margin:0 auto;">
            <div style="display:inline-block;padding:0.15rem 0.5rem;background:#f1f5f9;border-radius:4px;font-family:monospace;font-size:0.68rem;color:#94a3b8;margin-bottom:0.75rem;">&lt;ul&gt;</div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:0.75rem;">
              ${td.feats
                .map(
                  ([emoji, title]) => `
                <div style="background:#f8fafc;border:1.5px solid #e5e7eb;border-radius:10px;padding:1rem;text-align:center;">
                  <div style="font-size:1.5rem;margin-bottom:0.4rem;">${emoji}</div>
                  <div style="font-size:0.8rem;font-weight:600;color:#374151;">${title}</div>
                </div>`,
                )
                .join("")}
            </div>
            <div style="display:inline-block;padding:0.15rem 0.5rem;background:#f1f5f9;border-radius:4px;font-family:monospace;font-size:0.68rem;color:#94a3b8;margin-top:0.75rem;">&lt;/ul&gt;</div>
          </div>
        </section>`
    : "";

  // ── Gallery: wireframe → styled ───────────────────────────────────────────────
  const galleryHTML = gallery.built
    ? gallery.styled
      ? `<section id="section-gallery" style="padding:2.5rem 2rem;background:${effectiveBg};border-top:1px solid ${effectiveText}0c;animation:fadeIn 0.5s ease-out;">
          <h3 style="text-align:center;color:${effectiveText};font-size:1.125rem;font-weight:800;margin:0 0 1.5rem;letter-spacing:-0.01em;">${td.gallery.title}</h3>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;max-width:900px;margin:0 auto;">
            ${td.gallery.items
              .map(
                (item) => `
              <div onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='none'" style="background:${effectivePrimary}0d;border:1.5px solid ${effectivePrimary}1a;border-radius:12px;padding:1rem 0.5rem;text-align:center;font-size:0.8rem;font-weight:600;color:${effectiveText};transition:transform 0.2s;">
                ${item}
              </div>`,
              )
              .join("")}
          </div>
        </section>`
      : `<section style="padding:2rem;background:${effectiveBg};border-top:1px solid #e5e7eb;animation:fadeIn 0.5s ease-out;">
          <div style="max-width:900px;margin:0 auto;">
            <div style="display:inline-block;padding:0.15rem 0.5rem;background:#f1f5f9;border-radius:4px;font-family:monospace;font-size:0.68rem;color:#94a3b8;margin-bottom:0.75rem;">document.querySelector()</div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:0.6rem;">
              ${td.gallery.items
                .map(
                  (item) => `
                <div style="background:#f8fafc;border:1.5px solid #e5e7eb;border-radius:8px;padding:0.75rem 0.5rem;text-align:center;font-size:0.78rem;font-weight:500;color:#6b7280;">
                  ${item}
                </div>`,
                )
                .join("")}
            </div>
          </div>
        </section>`
    : "";

  // ── Testimonials: wireframe → styled ──────────────────────────────────────────
  const testimonialHTML = testimonials.built
    ? testimonials.styled
      ? `<section style="padding:2.5rem 2rem;background:${effectiveBg};border-top:1px solid ${effectivePrimary}10;animation:fadeIn 0.5s ease-out;">
          <h3 style="text-align:center;color:${effectivePrimary};font-size:1.125rem;font-weight:800;margin:0 0 1.5rem;">What People Say</h3>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;max-width:900px;margin:0 auto;">
            ${td.testimonials
              .map(
                (item) => `
              <div style="background:${effectivePrimary}0a;border:1.5px solid ${effectivePrimary}1a;border-radius:16px;padding:1.25rem 1rem;text-align:center;">
                <div style="font-size:1.25rem;margin-bottom:0.6rem;">⭐</div>
                <p style="color:${effectiveText};font-size:0.82rem;line-height:1.6;margin:0 0 0.75rem;font-style:italic;">"${item.text}"</p>
                <div style="font-size:0.75rem;font-weight:700;color:${effectivePrimary};">— ${item.name}</div>
              </div>`,
              )
              .join("")}
          </div>
        </section>`
      : `<section style="padding:2.5rem 2rem;background:${effectiveBg};border-top:1px solid #e5e7eb;animation:fadeIn 0.5s ease-out;">
          <div style="max-width:900px;margin:0 auto;">
            <div style="display:inline-block;padding:0.15rem 0.5rem;background:#f1f5f9;border-radius:4px;font-family:monospace;font-size:0.68rem;color:#94a3b8;margin-bottom:1rem;">function()</div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:0.75rem;">
              ${td.testimonials
                .map(
                  (item) => `
                <div style="background:#f8fafc;border:1.5px solid #e5e7eb;border-radius:12px;padding:1rem;text-align:center;">
                  <div style="font-size:1.25rem;margin-bottom:0.5rem;">⭐</div>
                  <p style="color:#9ca3af;font-size:0.8rem;line-height:1.5;margin:0 0 0.5rem;font-style:italic;">"${item.text}"</p>
                  <div style="font-size:0.72rem;font-weight:600;color:#6b7280;">— ${item.name}</div>
                </div>`,
                )
                .join("")}
            </div>
          </div>
        </section>`
    : "";

  // ── Contact: wireframe → styled ───────────────────────────────────────────────
  const contactHTML = contact.built
    ? contact.styled
      ? `<section style="padding:2.5rem 2rem;background:${effectiveBg};border-top:1px solid ${effectivePrimary}10;animation:fadeIn 0.5s ease-out;">
          <div style="max-width:560px;margin:0 auto;text-align:center;">
            <h3 style="color:${effectivePrimary};font-size:1.25rem;font-weight:800;margin:0 0 0.5rem;">${td.contact.heading}</h3>
            <p style="color:${effectiveText};opacity:0.6;font-size:0.875rem;margin:0 0 1.5rem;">${td.contact.subtext}</p>
            <div style="background:${effectivePrimary}08;border:1.5px solid ${effectivePrimary}18;border-radius:16px;padding:1.5rem;">
              <input disabled style="width:100%;padding:0.6rem 0.875rem;border-radius:8px;border:1.5px solid ${effectivePrimary}22;background:${effectiveBg};color:${effectiveText};font-size:0.875rem;margin-bottom:0.625rem;display:block;box-sizing:border-box;" placeholder="Your email address" />
              <button style="width:100%;background:${effectivePrimary};color:white;border:none;padding:0.65rem;border-radius:8px;font-weight:700;cursor:pointer;font-size:0.875rem;">Send Message</button>
            </div>
          </div>
        </section>`
      : `<section style="padding:2.5rem 2rem;background:${effectiveBg};border-top:1px solid #e5e7eb;animation:fadeIn 0.5s ease-out;">
          <div style="max-width:560px;margin:0 auto;">
            <div style="display:inline-block;padding:0.15rem 0.5rem;background:#f1f5f9;border-radius:4px;font-family:monospace;font-size:0.68rem;color:#94a3b8;margin-bottom:1rem;">fetch('/api/contact')</div>
            <div style="background:#f8fafc;border:1.5px solid #e5e7eb;border-radius:12px;padding:1.5rem;">
              <div style="height:14px;background:#e5e7eb;border-radius:4px;margin-bottom:0.875rem;width:55%;"></div>
              <div style="height:36px;background:#e5e7eb;border-radius:6px;margin-bottom:0.625rem;"></div>
              <div style="height:72px;background:#e5e7eb;border-radius:6px;margin-bottom:0.625rem;"></div>
              <div style="height:36px;background:#e5e7eb;border-radius:6px;width:45%;"></div>
            </div>
          </div>
        </section>`
    : "";

  // ── Footer ────────────────────────────────────────────────────────────────────
  const footerBg = demo.darkMode ? "#020617" : "#1e293b";
  const footerHTML = !footer.built
    ? `<div style="height:100px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;border-top:1px solid #f1f5f9;">
        <div style="width:150px;height:2px;border-top:2px dashed #e2e8f0;"></div>
        <div style="display:flex;gap:1.5rem;">
          <div style="width:56px;height:2px;border-top:2px dashed #e2e8f0;"></div>
          <div style="width:48px;height:2px;border-top:2px dashed #e2e8f0;"></div>
          <div style="width:52px;height:2px;border-top:2px dashed #e2e8f0;"></div>
        </div>
      </div>`
    : footer.styled
      ? `<footer style="background:${footerBg};color:white;padding:0 2rem;height:110px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.625rem;animation:fadeIn 0.4s ease-out;">
        <p style="margin:0;font-size:0.875rem;opacity:0.55;font-weight:500;">${footer.content?.copyright || `© ${new Date().getFullYear()} ${name}`}</p>
        <div style="display:flex;justify-content:center;gap:1.5rem;flex-wrap:wrap;">
          ${(footer.content?.links || [])
            .map(
              (link) =>
                `<a href="#" style="color:rgba(255,255,255,0.38);text-decoration:none;font-size:0.8125rem;font-weight:500;" onmouseover="this.style.color='rgba(255,255,255,0.85)'" onmouseout="this.style.color='rgba(255,255,255,0.38)'">${link}</a>`,
            )
            .join("")}
        </div>
      </footer>`
      : `<footer style="background:#f1f5f9;height:110px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.625rem;padding:0 2rem;border-top:1px solid #e5e7eb;animation:fadeIn 0.4s ease-out;">
        <span style="font-family:monospace;font-size:0.62rem;color:#94a3b8;background:#e2e8f0;padding:0.1rem 0.45rem;border-radius:3px;margin-bottom:0.1rem;">&lt;footer&gt;</span>
        <p style="color:#6b7280;font-size:0.875rem;opacity:0.8;margin:0;">${footer.content?.copyright || `© ${new Date().getFullYear()} ${name}`}</p>
        <div style="display:flex;gap:1.5rem;">
          ${(footer.content?.links || []).map((l) => `<a href="#" style="color:#94a3b8;text-decoration:none;font-size:0.8125rem;">${l}</a>`).join("")}
        </div>
      </footer>`;

  // ── React demo sections (Acts 9+) ─────────────────────────────────────────────
  const demoSections = buildDemoSections(
    demo,
    effectivePrimary,
    effectiveBg,
    effectiveText,
    btnRadius,
    buttonColor,
    name,
    topic,
  );

  const highlightCSS = demo.highlightButtons
    ? `
    @keyframes pulse-ring {
      0%   { box-shadow: 0 0 0 0 ${effectivePrimary}88; }
      70%  { box-shadow: 0 0 0 10px ${effectivePrimary}00; }
      100% { box-shadow: 0 0 0 0 ${effectivePrimary}00; }
    }
    button { animation: pulse-ring 1.8s ease-out infinite; }
  `
    : "";

  const measureScript = `<script>
(function(){
  function post(){
    var header=document.body.firstElementChild;
    var main=document.querySelector('main');
    var hero=main&&main.firstElementChild;
    var els=document.body.children;var footer=null;for(var i=els.length-1;i>=0;i--){if(els[i].tagName!=='SCRIPT'){footer=els[i];break;}}
    if(!header||!hero||!footer)return;
    var h=header.getBoundingClientRect();
    var r=hero.getBoundingClientRect();
    var f=footer.getBoundingClientRect();
    window.parent.postMessage({type:'section-bounds',
      header:{top:h.top,height:h.height},
      hero:{top:r.top,height:r.height},
      footer:{top:f.top,height:f.height}
    },'*');
  }
  function postAfterLayout(){requestAnimationFrame(function(){setTimeout(post,60)});}
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',postAfterLayout);}
  else{postAfterLayout();}
  window.addEventListener('resize',post);
  document.addEventListener('DOMContentLoaded',function(){
    new MutationObserver(post).observe(document.body,{childList:true,subtree:true});
  });
})();
<\/script>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${name || "My Website"}</title>
  <style>
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html,body{height:100%}
    html{scroll-behavior:smooth}
    body{
      font-family:${fontFamily === "serif" ? "Georgia,serif" : fontFamily === "monospace" ? "'Courier New',monospace" : "system-ui,sans-serif"};
      background:${effectiveBg};
      color:${effectiveText};
      min-height:100vh;
      display:flex;
      flex-direction:column;
    }
    main{flex:1;display:flex;flex-direction:column}
    a{color:inherit}
    button{cursor:pointer;border:none}
    section,div[id^="section-"]{width:100%}
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
    ${testimonialHTML}
    ${contactHTML}
    ${demoSections}
  </main>
  ${footerHTML}
  ${measureScript}
</body>
</html>`;
}

// ── Hero button ───────────────────────────────────────────────────────────────
function buildHeroButton(
  text,
  btnColor,
  btnRadius,
  demo,
  siteName,
  hasInteractivity,
  heroStyled,
) {
  // Wireframe button — grey, no interactivity yet
  if (!heroStyled) {
    return `<button style="background:#e5e7eb;color:#6b7280;border:none;padding:0.75rem 2rem;border-radius:${btnRadius};font-size:0.9375rem;font-weight:700;cursor:default;margin-top:0.25rem;">${text}</button>`;
  }

  const base = `background:${btnColor};color:white;border:none;padding:0.75rem 2rem;border-radius:${btnRadius};font-size:0.9375rem;font-weight:700;cursor:pointer;margin-top:0.25rem;letter-spacing:0.01em;box-shadow:0 4px 14px ${btnColor}44;transition:opacity 0.2s,transform 0.15s;`;
  const hover = `onmouseover="this.style.opacity='0.9';this.style.transform='translateY(-1px)'" onmouseout="this.style.opacity='1';this.style.transform='none'"`;

  if (hasInteractivity && !demo.mode) {
    return `<button style="${base}" ${hover} onclick="alert('Welcome to ${siteName}! 🎉')">${text}</button>`;
  }

  if (demo.mode === "events" || demo.showDeadButton) {
    const action = demo.eventAction;
    if (!action) return `<button style="${base}" ${hover}>${text}</button>`;
    if (action === "message")
      return `<button style="${base}" ${hover} onclick="alert('Welcome to ${siteName}! 🎉')">${text}</button>`;
    if (action === "popup")
      return `<button style="${base}" ${hover} onclick="document.getElementById('demo-popup').style.display='flex'">${text}</button>
              <div id="demo-popup" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.5);align-items:center;justify-content:center;z-index:999;" onclick="this.style.display='none'">
                <div style="background:white;border-radius:16px;padding:2rem;text-align:center;max-width:280px;">
                  <p style="font-size:1.25rem;font-weight:700;margin-bottom:0.5rem;">🎉 You opened a popup!</p>
                  <p style="color:#6b7280;font-size:0.875rem;">This is what onClick can do!</p>
                  <button style="margin-top:1rem;background:#6366f1;color:white;border:none;padding:0.5rem 1.5rem;border-radius:8px;cursor:pointer;" onclick="document.getElementById('demo-popup').style.display='none'">Close</button>
                </div>
              </div>`;
    if (action === "text-change")
      return `<button style="${base}" ${hover} onclick="this.textContent = this.textContent === '${text}' ? 'You clicked! ✅' : '${text}'">${text}</button>`;
  }

  return `<button style="${base}" ${hover}>${text}</button>`;
}

// ── React demo extra sections (Acts 9+) ───────────────────────────────────────
function buildDemoSections(
  demo,
  primary,
  bg,
  text,
  btnRadius,
  btnColor,
  siteName,
  topic,
) {
  const sections = [];

  if (
    demo.mode === "components" ||
    demo.highlightButtons ||
    demo.propShowcase
  ) {
    const labels = demo.propShowcase
      ? ["Adopt Now", "Learn More", "Contact Us"]
      : ["Adopt Now", "Learn More", "Contact Us", "Join Now"];
    const subNote = demo.propShowcase
      ? `<p style="margin-top:1.5rem;font-size:0.8rem;color:${text}66;font-style:italic;">Same &lt;Button /&gt; component — different text each time</p>`
      : "";
    sections.push(`
      <section id="section-about" style="padding:3rem 2rem;text-align:center;background:${bg};border-top:1px solid ${text}11;">
        <h3 style="color:${text}88;font-size:0.75rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:1.5rem;">Call to Action</h3>
        <div style="display:flex;gap:1rem;flex-wrap:wrap;justify-content:center;">
          ${labels
            .map(
              (label) =>
                `<button style="background:${btnColor};color:white;border:none;padding:0.65rem 1.5rem;border-radius:${btnRadius};font-size:0.9rem;font-weight:600;cursor:pointer;">${label}</button>`,
            )
            .join("")}
        </div>
        ${subNote}
      </section>`);
  }

  if (demo.showThemeBar || demo.mode === "state") {
    const isDark = demo.darkMode;
    sections.unshift(`
      <div id="theme-bar" style="background:${isDark ? "#1e293b" : "#f8fafc"};border-bottom:1px solid ${isDark ? "#334155" : "#e2e8f0"};padding:0.6rem 2rem;display:flex;align-items:center;gap:1rem;font-size:0.8rem;">
        <span style="color:${isDark ? "#94a3b8" : "#64748b"};font-weight:600;">⚙️ Theme Settings</span>
        <span style="color:${isDark ? "#f1f5f9" : "#111827"};font-weight:700;margin-left:auto;">${isDark ? "🌙 Dark Mode is ON" : "☀️ Light Mode is ON"}</span>
        ${demo.activeSettingDemo === "fontSize" ? `<span style="color:${primary};font-weight:600;">📏 Font Size: Large</span>` : ""}
        ${demo.activeSettingDemo === "heroText" ? `<span style="color:${primary};font-weight:600;">✏️ Hero Text: Custom</span>` : ""}
      </div>`);
  }

  if (demo.showPets && demo.pets?.length > 0) {
    const petEmojis = ["🐶", "🐱", "🐰", "🐹", "🐦", "🐠", "🦎", "🐢", "🐾"];
    sections.push(`
      <section id="section-gallery" style="padding:3rem 2rem;background:${bg};border-top:1px solid ${text}11;">
        <h3 style="text-align:center;color:${text};font-size:1.25rem;font-weight:800;margin-bottom:0.5rem;">🐾 Our Pets</h3>
        <p style="text-align:center;color:${text}66;font-size:0.875rem;margin-bottom:2rem;">${demo.pets.length} wonderful friend${demo.pets.length === 1 ? "" : "s"}</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:1rem;max-width:900px;margin:0 auto;">
          ${demo.pets
            .map(
              (pet, i) => `
            <div onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='none'" style="background:${primary}14;border:2px solid ${primary}22;border-radius:16px;padding:1.25rem 0.75rem;text-align:center;transition:transform 0.2s;">
              <div style="font-size:2rem;margin-bottom:0.5rem;">${petEmojis[i % petEmojis.length]}</div>
              <p style="font-size:0.8rem;font-weight:700;color:${text};word-break:break-word;">${pet}</p>
            </div>`,
            )
            .join("")}
        </div>
      </section>`);
  }

  if (demo.showConditional) {
    const messages = {
      kid: {
        title: "Hey there, future builder! 🎉",
        sub: "Build something amazing today!",
        bg: "#fef3c7",
        border: "#f59e0b",
        color: "#92400e",
      },
      parent: {
        title: "Welcome, Parent! 👩‍👧",
        sub: "Explore coding resources for your child.",
        bg: "#dbeafe",
        border: "#3b82f6",
        color: "#1e3a8a",
      },
      teacher: {
        title: "Welcome, Educator! 👩‍🏫",
        sub: "Access classroom tools and curriculum.",
        bg: "#d1fae5",
        border: "#10b981",
        color: "#064e3b",
      },
      null: {
        title: "Welcome, Visitor! 👋",
        sub: "Discover what we have to offer.",
        bg: "#f3f4f6",
        border: "#d1d5db",
        color: text,
      },
    };
    const m = messages[demo.userType] || messages[null];
    sections.push(`
      <section id="section-contact" style="padding:2.5rem 2rem;background:${bg};border-top:1px solid ${text}11;">
        <div style="max-width:480px;margin:0 auto;background:${m.bg};border:2px solid ${m.border};border-radius:16px;padding:1.5rem 2rem;text-align:center;">
          <h3 style="color:${m.color};font-size:1.25rem;font-weight:800;margin-bottom:0.5rem;">${m.title}</h3>
          <p style="color:${m.color}cc;font-size:0.9rem;">${m.sub}</p>
          ${demo.userType ? `<div style="margin-top:0.75rem;font-size:0.75rem;color:${m.color}88;font-style:italic;">Visitor type: ${demo.userType}</div>` : ""}
        </div>
      </section>`);
  }

  if (demo.showThemeSelector) {
    const themes = [
      { label: "Ocean", color: "#0ea5e9", icon: "🌊" },
      { label: "Forest", color: "#10b981", icon: "🌿" },
      { label: "Sunset", color: "#f59e0b", icon: "🌅" },
      { label: "Royal", color: "#8b5cf6", icon: "👑" },
    ];
    sections.unshift(`
      <div style="background:${bg};border-bottom:2px solid ${text}11;padding:0.75rem 2rem;display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap;">
        <span style="font-size:0.75rem;font-weight:700;color:${text}88;text-transform:uppercase;letter-spacing:0.05em;">🎨 Theme Selector</span>
        ${themes
          .map(
            (t) => `
          <div style="display:flex;align-items:center;gap:0.4rem;padding:0.3rem 0.75rem;border-radius:20px;border:2px solid ${demo.themeColor === t.color ? t.color : "#e5e7eb"};background:${demo.themeColor === t.color ? t.color + "22" : "transparent"};cursor:pointer;font-size:0.8rem;font-weight:600;color:${demo.themeColor === t.color ? t.color : text};">
            ${t.icon} ${t.label}
          </div>`,
          )
          .join("")}
      </div>`);
  }

  return sections.join("\n");
}

// ─────────────────────────────────────────────────────────────────────────────

export function interpolateCode(template, website) {
  if (!template) return "";
  return template
    .replace(/\{\{name\}\}/g, website.name || "My Website")
    .replace(/\{\{topic\}\}/g, website.topic || "my topic")
    .replace(
      /\{\{primaryColor\}\}/g,
      website.styles.primaryColor || website.color || "#6366f1",
    )
    .replace(
      /\{\{backgroundColor\}\}/g,
      website.styles.backgroundColor || "#ffffff",
    )
    .replace(
      /\{\{headline\}\}/g,
      website.sections.hero?.content?.headline || "Welcome!",
    )
    .replace(/\{\{subtext\}\}/g, website.sections.hero?.content?.subtext || "")
    .replace(
      /\{\{buttonText\}\}/g,
      website.sections.hero?.content?.buttonText || "Explore",
    );
}
