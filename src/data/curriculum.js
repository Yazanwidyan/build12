// ─── Curriculum — HelloBuildIt Website Journey ────────────────────────────────
// Each mission drives the journey engine. Steps are rendered by MissionRunner.
//
// Step types:
//   teki-message   — TEKI speaks, user taps action button to continue
//   input          — text input saved to journey store
//   color-picker   — color swatch picker
//   topic-picker   — grid of topic chips + custom input
//   visual-builder — form that live-updates the website preview
//   observation    — show updated preview, TEKI reacts
//   code-challenge — fill-in-the-blank or small editor challenge
//   act-complete   — celebration screen, then advance to next act
// ──────────────────────────────────────────────────────────────────────────────

export const ACTS = [
  // ── ACT 1 ── Your Website Awakens ─────────────────────────────────────────────
  {
    id: "act1",
    number: 1,
    title: "Your Website Awakens",
    tagline: "Build it section by section",
    color: "#3b82f6",
    emoji: "🏗️",
    quiz: [
      {
        question: "What is a website made of?",
        options: [
          "Bricks and mortar",
          "Pages you view in a browser with text, images, and links",
          "Spreadsheets and databases only",
          "Only videos",
        ],
        correct: 1,
        explanation:
          "A website is a page (or set of pages) that lives on the internet and contains content like text, images, and interactive elements.",
      },
      {
        question: "What does the HEADER of a website typically show?",
        options: [
          "The checkout cart",
          "The site name and navigation links",
          "The privacy policy",
          "Advertisements",
        ],
        correct: 1,
        explanation:
          "The header is the top bar — it has your site name and the links that let visitors navigate around.",
      },
      {
        question: "What is the HERO section?",
        options: [
          "A character in a game",
          "The big, bold welcome area at the top of a page",
          "A type of database",
          "The footer of a website",
        ],
        correct: 1,
        explanation:
          "The hero is the first big section visitors see — it grabs attention with a headline, description, and a call-to-action button.",
      },
    ],
    missions: [
      // ── Mission 1 — Your First Website ──────────────────────────────────────────
      // PLAN only — no canvas input before any section exists.
      // Every section gets content → code → appear in its own mission.
      {
        id: "mission-1",
        number: 1,
        act: 1,
        title: "Your First Website",
        subtitle: "Pick a topic and plan your build",
        concept: "website-intro",
        xp: 100,
        badge: { id: "first-website", label: "First Website", emoji: "🌐" },
        steps: [
          {
            id: "welcome-intro",
            type: "teki-message",
            mood: "excited",
            messages: [
              "Welcome! I'm TEKI — your coding companion! 👋",
              "Together we're going to build a REAL website from scratch.",
              "You don't need to know anything yet — I'll guide every single step.",
              "Every website is built from three sections: a HEADER, a HERO, and a FOOTER.",
            ],
            action: "I'm ready!",
          },
          {
            id: "topic-pick",
            type: "topic-picker",
            teki: "First — what is your website going to be about? Pick a topic that excites you!",
            options: [
              "Pets",
              "Space",
              "Music",
              "Sports",
              "Gaming",
              "Art",
              "Food",
              "Travel",
            ],
            action: "That's my topic!",
          },
          {
            id: "blueprint-preview",
            type: "teki-message",
            mood: "thinking",
            messages: [
              "Great choice! Here's the plan — we'll build your site one section at a time.",
              "First: the HEADER — your site name and navigation links at the top.",
              "Then: the HERO — the big bold welcome section visitors see first.",
              "Finally: the FOOTER — the bottom bar with your copyright and links.",
            ],
            action: "Let's start building!",
          },
        ],
      },

      // ── Mission 2 — Build the Entrance ──────────────────────────────────────────
      // Pattern: LEARN (teki explains) → BUILD (fill in content) → CODE (write tag → section appears) → SEE (observe)
      {
        id: "mission-2",
        number: 2,
        act: 1,
        title: "Build the Entrance",
        subtitle: "Every website starts with a header",
        concept: "header",
        xp: 120,
        badge: null,
        steps: [
          {
            id: "header-explain",
            type: "teki-message",
            mood: "thinking",
            messages: [
              "The HEADER is the first thing visitors see — like the sign above a shop.",
              "It shows your site name and the navigation links to every page.",
              "In HTML, the <header> tag tells the browser: this is the top navigation bar.",
            ],
            action: "Got it!",
          },
          {
            id: "header-build-challenge",
            type: "code-challenge",
            teki: "Here comes the magic! Write the HTML tag that makes the header APPEAR on your site — then we'll fill it with your content.",
            language: "html",
            code: "<___>My Website</___>",
            answer: "<header>My Website</header>",
            blanks: [
              { position: 0, answer: "header" },
              { position: 1, answer: "header" },
            ],
            completionEffect: { buildSection: "header" },
            explanations: {
              young:
                "The <header> tag creates the top bar of your website! Fill both blanks with 'header'.",
              junior:
                "<header> is a semantic HTML element — it tells the browser this is the site's top navigation area. Opening and closing tags must match.",
              senior:
                "<header> is a semantic landmark element. It can appear at page level or inside <article>/<section>. Improves SEO and accessibility.",
            },
            ageExposure: {
              young: "guided",
              junior: "fill-blank",
              senior: "fill-blank",
            },
            successMessage: "Your header appeared — wireframe style! Now let's fill it in! 🏗️",
            action: "Build the header!",
          },
          {
            id: "canvas-site-name",
            type: "canvas-input",
            highlight: "header",
            teki: "Your header is live! Now type your website name — watch it update right inside the header!",
            canvasInput: {
              fieldKey: "header-title",
              section: "header",
              storeKey: "title",
              label: "Website name",
              placeholder: "My Awesome Website…",
            },
            action: "That's my name!",
          },
          {
            id: "canvas-header-nav",
            type: "canvas-input",
            highlight: "header",
            teki: "Now add navigation links — watch them appear in the header as you type. Separate with commas.",
            canvasInput: {
              fieldKey: "header-nav",
              section: "header",
              storeKey: "navLinks",
              label: "Navigation links",
              placeholder: "Home, About, Projects, Contact…",
              isArray: true,
            },
            action: "Links added!",
          },
          {
            id: "header-wireframe-observe",
            type: "observation",
            teki: "Look at that! Your header is live with your name and links — grey wireframe style. HTML built the STRUCTURE. Act 2 will paint it with your color!",
            autoAdvance: true,
            autoAdvanceDelay: 3000,
          },
        ],
      },

      // ── Mission 3 — First Impressions ────────────────────────────────────────────
      {
        id: "mission-3",
        number: 3,
        act: 1,
        title: "First Impressions",
        subtitle: "Build the section that grabs attention",
        concept: "hero",
        xp: 130,
        badge: null,
        steps: [
          {
            id: "hero-explain",
            type: "teki-message",
            mood: "excited",
            messages: [
              "Header done! Now the most important section — the HERO.",
              "It's the BIG bold area visitors see the moment they land on your site.",
              "In HTML, the <main> tag wraps this main content — every page has exactly one!",
            ],
            action: "Let's do it!",
          },
          {
            id: "hero-build-challenge",
            type: "code-challenge",
            teki: "The hero lives inside a <main> tag — the single most important content area on any web page. Write it and watch the section appear!",
            language: "html",
            code: `<header>...</header>
<___>Hero content here</___>`,
            answer: `<header>...</header>
<main>Hero content here</main>`,
            blanks: [
              { position: 0, answer: "main" },
              { position: 1, answer: "main" },
            ],
            completionEffect: { buildSection: "hero" },
            explanations: {
              young:
                "The <main> tag holds the main content of your page — the big important stuff visitors come to see!",
              junior:
                "<main> is a semantic HTML element. Every page should have exactly one <main> — it wraps your primary content, separate from header and footer.",
              senior:
                "<main> is a landmark element that improves accessibility and SEO. Screen readers jump straight to it. Only one per page, and it must not be inside <header>, <footer>, or <nav>.",
            },
            ageExposure: {
              young: "guided",
              junior: "fill-blank",
              senior: "fill-blank",
            },
            successMessage: "Hero section appeared — now let's fill it with YOUR content! 🏆",
            action: "Build the hero!",
          },
          {
            id: "canvas-hero-headline",
            type: "canvas-input",
            highlight: "hero",
            teki: "Your hero is live! Type your big bold headline — watch it appear in the section right now!",
            canvasInput: {
              fieldKey: "hero-headline",
              section: "hero",
              storeKey: "headline",
              label: "Big headline",
              placeholder: "Welcome to my world!",
            },
            action: "Bold and ready!",
          },
          {
            id: "canvas-hero-subtext",
            type: "canvas-input",
            highlight: "hero",
            teki: "Add one supporting line — give visitors more detail. See it update live below your headline!",
            canvasInput: {
              fieldKey: "hero-subtext",
              section: "hero",
              storeKey: "subtext",
              label: "Description",
              placeholder: "A place for…",
            },
            action: "Perfect!",
          },
          {
            id: "canvas-hero-button",
            type: "canvas-input",
            highlight: "hero",
            teki: "Last piece — what should your call-to-action button say? Type it and watch the button update!",
            canvasInput: {
              fieldKey: "hero-button",
              section: "hero",
              storeKey: "buttonText",
              label: "Button text",
              placeholder: "Explore →",
            },
            action: "Button text set!",
          },
          {
            id: "hero-wireframe-observe",
            type: "observation",
            teki: "Header ✓ Hero ✓ — all YOUR content, live in the wireframe. One section left: the footer!",
            autoAdvance: true,
            autoAdvanceDelay: 3000,
          },
        ],
      },

      // ── Mission 4 — Seal the Deal ─────────────────────────────────────────────────
      {
        id: "mission-4",
        number: 4,
        act: 1,
        title: "Seal the Deal",
        subtitle: "Finish your website with a footer",
        concept: "footer",
        xp: 100,
        badge: { id: "website-built", label: "Website Built", emoji: "🌐" },
        steps: [
          {
            id: "footer-explain",
            type: "teki-message",
            mood: "happy",
            messages: [
              "Two sections down — just one left! The FOOTER goes at the very bottom.",
              "Footers show copyright info, legal links, and contact details.",
              "Visitors always check the footer when they want to learn more or get in touch.",
            ],
            action: "Let's finish it!",
          },
          {
            id: "footer-tag-challenge",
            type: "code-challenge",
            teki: "Complete the page structure — write the HTML tag that makes the footer appear. Then we'll fill it with your content!",
            language: "html",
            code: `<header>...</header>
<main>...</main>
<___>© 2026 My Website</___>`,
            answer: `<header>...</header>
<main>...</main>
<footer>© 2026 My Website</footer>`,
            blanks: [
              { position: 0, answer: "footer" },
              { position: 1, answer: "footer" },
            ],
            completionEffect: { buildSection: "footer" },
            explanations: {
              young:
                "Just like a book has a first AND a last page, websites have a <header> AND a <footer>!",
              junior:
                "<footer> is a semantic HTML element — perfect for page-bottom content like copyright and links.",
              senior:
                "<footer> is a semantic landmark element. It can also appear inside <article> or <section>, not just at the page level.",
            },
            ageExposure: {
              young: "guided",
              junior: "fill-blank",
              senior: "fill-blank",
            },
            successMessage: "Footer appeared — now let's fill it with your content! 🦴",
            action: "Check it!",
          },
          {
            id: "canvas-footer-copyright",
            type: "canvas-input",
            highlight: "footer",
            teki: "Your footer is live! Add your copyright line — watch it appear at the bottom of your site!",
            canvasInput: {
              fieldKey: "footer-copyright",
              section: "footer",
              storeKey: "copyright",
              label: "Copyright",
              placeholder: "© 2026 My Website",
            },
            action: "Signed it!",
          },
          {
            id: "canvas-footer-links",
            type: "canvas-input",
            highlight: "footer",
            teki: "Now add footer links — Privacy, Terms, Contact. See them appear in the footer as you type!",
            canvasInput: {
              fieldKey: "footer-links",
              section: "footer",
              storeKey: "links",
              label: "Footer links",
              placeholder: "Privacy, Terms, Contact…",
              isArray: true,
            },
            action: "Footer links added!",
          },
          {
            id: "website-complete-observe",
            type: "observation",
            teki: "Header ✓ Hero ✓ Footer ✓ — all three sections built with YOUR content! HTML gave your site STRUCTURE. Next: CSS will paint everything with your color!",
            autoAdvance: true,
            autoAdvanceDelay: 3500,
          },
          {
            id: "act1-complete",
            type: "act-complete",
            actId: "act1",
            title: "ACT 1 Complete!",
            message:
              "You built a real website with a header, hero, and footer — in wireframe style. You wrote the HTML tags that made each section appear. Now let's make them look stunning with CSS!",
            power: { label: "Website Builder", emoji: "🏗️" },
            xpBonus: 200,
            action: "Enter the Design Studio!",
          },
        ],
      },
    ],
  },

  // ── ACT 2 ── Design Studio ──────────────────────────────────────────────────────
  {
    id: "act2",
    number: 2,
    title: "Design Studio",
    tagline: "Make it beautiful",
    color: "#ec4899",
    emoji: "🎨",
    quiz: [
      {
        question: "What is a HEX color code like #3b82f6?",
        options: [
          "A cheat code for games",
          "A secret name for a color used in code",
          "A font family name",
          "A website address",
        ],
        correct: 1,
        explanation:
          "Hex codes are how code names colors. #3b82f6 is a shade of blue — the # is followed by 6 characters that describe the exact color.",
      },
      {
        question: "What does CSS stand for?",
        options: [
          "Computer Screen Style",
          "Cascading Style Sheets",
          "Colorful Site Settings",
          "Custom Script System",
        ],
        correct: 1,
        explanation:
          "CSS = Cascading Style Sheets. It's the language that controls how HTML elements look — colors, fonts, sizes, and layouts.",
      },
      {
        question: "What does border-radius do in CSS?",
        options: [
          "Sets the text color",
          "Adds a shadow behind an element",
          "Rounds the corners of an element",
          "Changes the font size",
        ],
        correct: 2,
        explanation:
          "border-radius rounds the corners of boxes! 0 = sharp square corners, 999px = a fully rounded pill shape.",
      },
    ],
    missions: [
      // ── Mission 5 — The Color Lab ─────────────────────────────────────────────────
      {
        id: "mission-5",
        number: 5,
        act: 2,
        title: "The Color Lab",
        subtitle: "CSS paints your wireframe sections one by one",
        concept: "colors",
        xp: 110,
        badge: null,
        steps: [
          {
            id: "color-explain",
            type: "teki-message",
            mood: "thinking",
            messages: [
              "Your website has structure — now it needs STYLE!",
              "CSS is the painter. HTML was the architect. Look at your three wireframe sections — grey and plain.",
              "CSS custom properties let you define a color ONCE and use it everywhere on the page.",
              "Here's a secret: colors trigger emotions INSTANTLY — before anyone reads a word. Blue = calm. Red = urgent. Green = fresh.",
            ],
            action: "Let me paint it!",
          },
          {
            id: "color-css-challenge",
            type: "code-challenge",
            teki: "Write the CSS selector that targets the ROOT of the entire page — this is where you define colors for everything:",
            language: "css",
            code: `___ {
  --primary: #6366f1;
}`,
            answer: `:root {
  --primary: #6366f1;
}`,
            blanks: [{ position: 0, answer: ":root" }],
            completionEffect: { styleSection: "header" },
            explanations: {
              young:
                "Type :root — it means 'apply this to the WHOLE page'. Think of it as the master settings panel!",
              junior:
                ":root targets the topmost HTML element. CSS variables (--name) defined here are available everywhere in your stylesheet.",
              senior:
                ":root has higher specificity than the html selector. CSS custom properties defined here cascade to all child elements and can be overridden locally.",
            },
            ageExposure: {
              young: "guided",
              junior: "fill-blank",
              senior: "fill-blank",
            },
            successMessage: "Header styled! Now make that color YOURS →",
            action: "Style the header!",
          },
          {
            id: "color-primary-pick",
            type: "visual-builder",
            section: null,
            isStyleUpdate: true,
            teki: "Now make it yours! Pick your primary color and watch the header update live as you choose.",
            fields: [
              {
                id: "primaryColor",
                label: "Primary Color",
                type: "color",
                storeSubKey: "primaryColor",
                hint: "Your brand color — used for buttons, links, and highlights",
              },
            ],
            action: "That's my color!",
          },
          {
            id: "header-styled-observe",
            type: "observation",
            teki: "Your header is now YOUR color! You wrote the CSS rule, then picked the value. That's exactly how every designer on earth works.",
            autoAdvance: true,
            autoAdvanceDelay: 3000,
          },
          {
            id: "color-bg-challenge",
            type: "code-challenge",
            teki: "Now the hero. `color` sets TEXT color. `background-color` fills the AREA behind the content. Complete the property name:",
            language: "css",
            code: `main {
  background-___: #f8fafc;
  padding: 2rem;
}`,
            answer: `main {
  background-color: #f8fafc;
  padding: 2rem;
}`,
            blanks: [{ position: 0, answer: "color" }],
            completionEffect: { styleSection: "hero" },
            explanations: {
              young:
                "background-color fills the BACKGROUND of a section — the area behind all the text!",
              junior:
                "background-color sets the fill behind content. The `color` property only sets TEXT color — they're separate.",
              senior:
                "Prefer background-color for solid fills — it's explicit. Use background shorthand only for gradients, images, or multiple values.",
            },
            ageExposure: {
              young: "guided",
              junior: "fill-blank",
              senior: "fill-blank",
            },
            successMessage: "Hero styled! Now pick your background color →",
            action: "Style the hero!",
          },
          {
            id: "color-bg-pick",
            type: "visual-builder",
            section: null,
            isStyleUpdate: true,
            teki: "Now your page background — light feels clean, dark feels bold. Pick it and watch the hero section fill with your color!",
            fields: [
              {
                id: "backgroundColor",
                label: "Background Color",
                type: "color",
                storeSubKey: "backgroundColor",
                hint: "The page background — light feels clean, dark feels bold",
              },
            ],
            action: "Background set!",
          },
          {
            id: "hero-styled-observe",
            type: "observation",
            teki: "Two sections styled with YOUR colors! Header has your brand color, hero has your background. One section left — the footer!",
            autoAdvance: true,
            autoAdvanceDelay: 3000,
          },
        ],
      },

      // ── Mission 6 — Fonts & Buttons ───────────────────────────────────────────────
      {
        id: "mission-6",
        number: 6,
        act: 2,
        title: "Fonts & Buttons",
        subtitle: "Typography and shapes complete the design",
        concept: "typography",
        xp: 130,
        badge: { id: "designer", label: "Designer", emoji: "🎨" },
        steps: [
          {
            id: "font-explain",
            type: "teki-message",
            mood: "excited",
            messages: [
              "Design isn't just colors — FONTS have personality too!",
              "A modern sans-serif feels like technology. A classic serif feels like a newspaper.",
              "And BUTTON shapes send signals — pill buttons feel friendly, sharp buttons feel serious.",
              "Write the CSS rule first, then pick your font and shape — and the footer gets styled at the same time!",
            ],
            action: "Write the CSS!",
          },
          {
            id: "font-css-challenge",
            type: "code-challenge",
            teki: "font-family sets the text style for the whole website. Fill in the property name:",
            language: "css",
            code: `body {
  ___-family: 'Inter', sans-serif;
  font-size: 16px;
}`,
            answer: `body {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
}`,
            blanks: [{ position: 0, answer: "font" }],
            completionEffect: { styleSection: "footer" },
            explanations: {
              young:
                "font-family changes the STYLE of all text! 'Inter' is the name of the font.",
              junior:
                "font-family sets the typeface for all text inside <body>. Always include a fallback (like sans-serif) in case the named font doesn't load.",
              senior:
                "Font stacks: primary font → fallback → generic family. Use system-ui or Inter for performant UI. Self-host fonts or use font-display: swap.",
            },
            ageExposure: {
              young: "guided",
              junior: "fill-blank",
              senior: "fill-blank",
            },
            successMessage: "Footer styled! Now pick your font style and button shape →",
            action: "Style the footer!",
          },
          {
            id: "font-design",
            type: "visual-builder",
            section: null,
            isStyleUpdate: true,
            teki: "Now make it yours! Pick your font style and button shape — watch the whole website update as you choose.",
            fields: [
              {
                id: "fontFamily",
                label: "Font Style",
                type: "select",
                options: ["sans-serif", "serif", "monospace"],
                labels: ["Modern", "Classic", "Code"],
                storeSubKey: "fontFamily",
                hint: "The overall text personality",
              },
              {
                id: "buttonStyle",
                label: "Button Shape",
                type: "select",
                options: ["rounded", "pill", "square"],
                labels: ["Rounded", "Pill", "Square"],
                storeSubKey: "buttonStyle",
                hint: "How your buttons look",
              },
            ],
            action: "That's my style!",
          },
          {
            id: "all-styled-observe",
            type: "observation",
            teki: "Your website is fully designed! Header, hero, and footer — all with your colors, font, and button style. You went from grey wireframe to a real designed website with CSS!",
            autoAdvance: true,
            autoAdvanceDelay: 3500,
          },
          {
            id: "act2-complete",
            type: "act-complete",
            actId: "act2",
            title: "ACT 2 Complete!",
            message:
              "Every section transformed from wireframe to designed! You wrote CSS that painted your header, hero, and footer. Colors + fonts + buttons all working together. Now let's add MORE sections with HTML!",
            power: { label: "Designer", emoji: "🎨" },
            xpBonus: 200,
            action: "Build more sections!",
          },
        ],
      },
    ],
  },

  // ── ACT 3 ── Building with HTML ─────────────────────────────────────────────
  {
    id: "act3",
    number: 3,
    title: "Building with HTML",
    tagline: "Every website starts with structure",
    color: "#f59e0b",
    emoji: "🏗️",
    quiz: [
      {
        question: "What does HTML stand for?",
        options: [
          "High Tech Markup Layout",
          "HyperText Markup Language",
          "Home Template Making Language",
          "How To Make Links",
        ],
        correct: 1,
        explanation:
          "HTML = HyperText Markup Language. Every single website on the internet uses it.",
      },
      {
        question: "What is an HTML TAG?",
        options: [
          "A type of password",
          "A color value",
          "A label wrapped in < > that gives content meaning",
          "A file extension",
        ],
        correct: 2,
        explanation:
          "Tags like <h2> or <p> wrap content and tell the browser WHAT that content is.",
      },
      {
        question: "What is the difference between HTML and CSS?",
        options: [
          "They do the same thing",
          "HTML gives structure, CSS gives style and color",
          "CSS gives structure, HTML gives color",
          "Both handle interactivity",
        ],
        correct: 1,
        explanation:
          "HTML builds the skeleton — structure and content. CSS paints it — colors, fonts, and spacing.",
      },
    ],
    missions: [
      // ── Mission 7 — Your About Section ───────────────────────────────────────
      {
        id: "mission-7",
        number: 7,
        act: 3,
        title: "Your About Section",
        subtitle: "Write HTML and watch it appear on your website",
        concept: "html-headings",
        xp: 120,
        badge: null,
        steps: [
          {
            id: "html-intro-1",
            type: "teki-message",
            mood: "excited",
            messages: [
              "HTML is the language of the web. It gives your page its STRUCTURE — like the skeleton of a body.",
              "Every element you see is made with tags. Tags look like this: <section>content</section>",
              "The tag opens, content goes in, the tag closes. Write the right tag — something APPEARS on your website!",
            ],
            action: "Let me try!",
          },
          {
            id: "html-section-intro",
            type: "teki-message",
            mood: "thinking",
            messages: [
              "Every section of a website — About, Features, Gallery — is wrapped in a <section> tag.",
              "It's like a labeled box: it groups related content and tells the browser 'everything in here belongs together'.",
            ],
            action: "Show me!",
          },
          {
            id: "html-section-challenge",
            type: "code-challenge",
            teki: "Write the <section> tag to make your About section appear on the website:",
            language: "html",
            code: "<___>\n  <h2>About Us</h2>\n  <p>Content here...</p>\n</___>",
            answer: "<section>\n  <h2>About Us</h2>\n  <p>Content here...</p>\n</section>",
            blanks: [
              { position: 0, answer: "section" },
              { position: 1, answer: "section" },
            ],
            completionEffect: { buildSection: "about" },
            explanations: {
              young:
                "A section is like a labeled box that holds a chunk of your website!",
              junior:
                "<section> groups related content semantically — it tells the browser this chunk belongs together. Great for SEO.",
              senior:
                "<section> is a semantic landmark element. Each should ideally contain a heading. Use <div> when you need grouping with no semantic meaning.",
            },
            ageExposure: {
              young: "guided",
              junior: "fill-blank",
              senior: "fill-blank",
            },
            successMessage: "Your About section appeared on the website! 📦",
            action: "Add the About section!",
          },
          {
            id: "about-appear-observe",
            type: "observation",
            teki: "Your About section appeared — wireframe style! The <section> tag created the container. No colors yet — that's HTML: pure structure. CSS will paint it later!",
            autoAdvance: true,
            autoAdvanceDelay: 3000,
          },
          {
            id: "html-h2-intro",
            type: "teki-message",
            mood: "thinking",
            messages: [
              "Inside every section lives a HEADING — the title that labels the whole section.",
              "<h2> is a second-level heading. <h1> is the hero headline at the top. <h2> goes on every section title below it.",
            ],
            action: "Got it!",
          },
          {
            id: "html-h2-challenge",
            type: "code-challenge",
            teki: "Fill in both blanks to complete the heading tag that labels a section:",
            language: "html",
            code: "<h___>About {{name}}</h___>",
            answer: "<h2>About {{name}}</h2>",
            blanks: [
              { position: 0, answer: "2" },
              { position: 1, answer: "2" },
            ],
            explanations: {
              young:
                "h2 stands for Heading Level 2! A big bold title that labels your section.",
              junior:
                "<h2> is a second-level heading. <h1> is for the page title, <h2> for section headings. Always close your tags!",
              senior:
                "Heading hierarchy matters for SEO and accessibility — one <h1> per page, then h2–h6 for section titles. Screen readers navigate by headings.",
            },
            ageExposure: {
              young: "guided",
              junior: "fill-blank",
              senior: "fill-blank",
            },
            successMessage: "Heading tag mastered! Every section title uses <h2>.",
            action: "Add the heading!",
          },
          {
            id: "html-h2-observe",
            type: "observation",
            teki: "See that 'About' heading in your section? Every section title you see on any website is a <h2> tag — and you just wrote it!",
            autoAdvance: true,
            autoAdvanceDelay: 3000,
          },
          {
            id: "html-section-wrap",
            type: "teki-message",
            mood: "proud",
            messages: [
              "<section> creates the box. <h2> labels it. These two tags always go together.",
              "Next mission: fill sections with paragraph text and bullet lists — and build the Features section!",
            ],
            action: "Keep building!",
          },
        ],
      },

      // ── Mission 8 — Your Features Section ────────────────────────────────────
      {
        id: "mission-8",
        number: 8,
        act: 3,
        title: "Your Features Section",
        subtitle: "Paragraphs and lists bring your content to life",
        concept: "html-content",
        xp: 130,
        badge: null,
        steps: [
          {
            id: "html-p-teki",
            type: "teki-message",
            mood: "thinking",
            messages: [
              "The <p> tag holds paragraph text — the most common tag on any website. Every sentence of content you read online is usually inside a <p>!",
            ],
            action: "Got it!",
          },
          {
            id: "html-p-challenge",
            type: "code-challenge",
            teki: "Complete the paragraph tag — the most common tag on any website:",
            language: "html",
            code: "<___>{{subtext}}</___>",
            answer: "<p>{{subtext}}</p>",
            blanks: [
              { position: 0, answer: "p" },
              { position: 1, answer: "p" },
            ],
            explanations: {
              young:
                "<p> means paragraph! It wraps a block of text on your page.",
              junior:
                "<p> renders as a block-level element with default top/bottom margin. Use it for any block of body text.",
              senior:
                "<p> is block-level. Never nest block-level elements inside inline elements — it's invalid HTML.",
            },
            ageExposure: {
              young: "guided",
              junior: "fill-blank",
              senior: "fill-blank",
            },
            successMessage: "Paragraph tag mastered! ✅",
            action: "Check it!",
          },
          {
            id: "about-p-observe",
            type: "observation",
            teki: "See the paragraph text in your About section? Every sentence of body text on every website lives inside a <p> tag — that's exactly what you just wrote!",
            autoAdvance: true,
            autoAdvanceDelay: 3000,
          },
          {
            id: "html-list-teki",
            type: "teki-message",
            mood: "excited",
            messages: [
              "Lists are everywhere on websites! <ul> creates a bullet-point list. Each item inside it goes in an <li> tag.",
              "Solve the next challenge and a Features section will appear on your website!",
            ],
            action: "Add it!",
          },
          {
            id: "html-li-challenge",
            type: "code-challenge",
            teki: "What tag goes inside a <ul> list?",
            language: "html",
            code: "<ul>\n  <___>First Feature</___>\n  <li>Second Feature</li>\n  <li>Third Feature</li>\n</ul>",
            answer:
              "<ul>\n  <li>First Feature</li>\n  <li>Second Feature</li>\n  <li>Third Feature</li>\n</ul>",
            blanks: [
              { position: 0, answer: "li" },
              { position: 1, answer: "li" },
            ],
            completionEffect: { buildSection: "features" },
            explanations: {
              young:
                "<li> means List Item! It's the bullet point inside your list.",
              junior:
                "<li> items go inside <ul> (unordered) or <ol> (ordered). Each item holds inline or block content.",
              senior:
                "<ul>/<ol> with <li> is the semantic way to mark up lists — important for screen readers and SEO.",
            },
            ageExposure: {
              young: "guided",
              junior: "fill-blank",
              senior: "fill-blank",
            },
            successMessage: "Features section appeared on your website!",
            action: "Add features to my site!",
          },
          {
            id: "features-appear-observe",
            type: "observation",
            teki: "Features section appeared on your website! Bullet lists are everywhere online — navigation menus, product features, recipe steps. All built with <ul> and <li> exactly like you just wrote.",
            autoAdvance: true,
            autoAdvanceDelay: 3500,
          },
        ],
      },

      // ── Mission 9 — Links & Act Complete ──────────────────────────────────────
      {
        id: "mission-9",
        number: 9,
        act: 3,
        title: "Linking It All",
        subtitle: "Links connect the entire web together",
        concept: "html-links",
        xp: 100,
        badge: { id: "html-builder", label: "HTML Builder", emoji: "🏗️" },
        steps: [
          {
            id: "html-link-teki",
            type: "teki-message",
            mood: "thinking",
            messages: [
              "Links are the backbone of the internet — they connect every page to every other page.",
              "The <a> tag creates a clickable link. The href attribute tells it WHERE to go.",
            ],
            action: "Got it!",
          },
          {
            id: "html-href-challenge",
            type: "code-challenge",
            teki: "Every link needs this attribute — without it, the link goes nowhere:",
            language: "html",
            code: '<a ___="https://example.com">Visit Us</a>',
            answer: '<a href="https://example.com">Visit Us</a>',
            blanks: [{ position: 0, answer: "href" }],
            explanations: {
              young:
                "href stands for Hypertext REFerence — it's the address the link sends you to!",
              junior:
                "href is the URL the browser navigates to when clicked. Use href='#section-id' for same-page anchor jumps.",
              senior:
                "For external links add rel='noopener noreferrer' for security. Always use target='_blank' with rel='noopener' to prevent tab-napping.",
            },
            ageExposure: {
              young: "guided",
              junior: "fill-blank",
              senior: "fill-blank",
            },
            successMessage: "Link connected! 🔗",
            action: "Check it!",
          },
          {
            id: "html-link-observe",
            type: "observation",
            teki: "See the navigation links in your header? Each one is an <a href='...'> tag. Every single link ever clicked on the internet uses this exact tag — and you just wrote it.",
            autoAdvance: true,
            autoAdvanceDelay: 3000,
          },
          {
            id: "html-review-teki",
            type: "teki-message",
            mood: "proud",
            messages: [
              "You've written 6 core HTML tags: <section>, <h2>, <p>, <ul>, <li>, <a>.",
              "These 6 tags build the structure of 90% of every website on the internet — and you now know all of them!",
              "About and Features sections grew from your code. Structure is done. Next: CSS makes it beautiful!",
            ],
            action: "Let's paint it!",
          },
          {
            id: "act3-complete",
            type: "act-complete",
            actId: "act3",
            title: "ACT 3 Complete!",
            message:
              "You wrote real HTML and your website grew! About + Features sections appeared — built by your code. They look plain right now because HTML gives structure. Next act: CSS paints them beautiful.",
            power: { label: "HTML Builder", emoji: "🏗️" },
            xpBonus: 200,
            action: "Time to paint it!",
          },
        ],
      },
    ],
  },

  // ── ACT 4 ── CSS: Paint Your Website ─────────────────────────────────────────
  {
    id: "act4",
    number: 4,
    title: "CSS: Paint Your Website",
    tagline: "Turn your wireframe into something beautiful",
    color: "#ec4899",
    emoji: "🎨",
    quiz: [
      {
        question: "What does CSS stand for?",
        options: [
          "Computer Screen Style",
          "Cascading Style Sheets",
          "Colorful Site Settings",
          "Custom Script System",
        ],
        correct: 1,
        explanation:
          "CSS = Cascading Style Sheets. The cascading part means styles inherit and override each other.",
      },
      {
        question: "How do you target an HTML element in CSS?",
        options: [
          "Using the href attribute",
          "Using a selector like h2 {} or .card {}",
          "By writing its tag name in HTML",
          "Through JavaScript",
        ],
        correct: 1,
        explanation:
          'CSS selectors target elements. h2 {} targets all <h2> elements. .card {} targets elements with class="card".',
      },
      {
        question: 'What does the CSS "color" property affect?',
        options: [
          "The background color",
          "The border color only",
          "The text color of an element",
          "All colors at once",
        ],
        correct: 2,
        explanation:
          'The CSS "color" property sets the text color. For background use "background-color".',
      },
    ],
    missions: [
      // ── Mission 10 — CSS Colors ────────────────────────────────────────────────
      {
        id: "mission-10",
        number: 10,
        act: 4,
        title: "Coloring Your Sections",
        subtitle: "CSS brings color and personality to your wireframe",
        concept: "css-colors",
        xp: 130,
        badge: null,
        steps: [
          {
            id: "css-intro-1",
            type: "teki-message",
            mood: "excited",
            messages: [
              "Your website has structure — now it needs STYLE! CSS is the language that adds colors, fonts, and spacing.",
              "CSS works like this: target an element, then set rules for it. h2 { color: blue; } — every h2 turns blue!",
              "Solve the challenge and watch the About section transform from grey to COLORFUL!",
            ],
            action: "Let's paint it!",
          },
          {
            id: "css-color-challenge",
            type: "code-challenge",
            teki: "Apply your brand color to the About section heading. What property sets text color?",
            language: "css",
            code: "h2 {\n  ___: {{primaryColor}};\n}",
            answer: "h2 {\n  color: {{primaryColor}};\n}",
            blanks: [{ position: 0, answer: "color" }],
            completionEffect: { styleSection: "about" },
            explanations: {
              young:
                "'color' is the CSS property for text color! Your primary color will paint your headings.",
              junior:
                "The 'color' property sets text color. This targets ALL h2 elements on the page.",
              senior:
                "CSS specificity: element (0,0,1) < class (0,1,0) < ID (1,0,0). Use var(--primary) for design systems.",
            },
            ageExposure: {
              young: "guided",
              junior: "fill-blank",
              senior: "fill-blank",
            },
            successMessage:
              "About section styled! Your color is now on the website!",
            action: "Apply the color!",
          },
          {
            id: "about-styled-observe",
            type: "observation",
            teki: "The About section transformed! Your primary color appeared on the heading. That's CSS magic — one rule changed the whole look!",
            autoAdvance: true,
            autoAdvanceDelay: 3000,
          },
          {
            id: "css-bg-challenge",
            type: "code-challenge",
            teki: "Background color fills an element with a color. What's the property?",
            language: "css",
            code: "section {\n  background-___: #f8fafc;\n  padding: 2rem;\n}",
            answer:
              "section {\n  background-color: #f8fafc;\n  padding: 2rem;\n}",
            blanks: [{ position: 0, answer: "color" }],
            explanations: {
              young:
                "background-color fills the background of a section with color!",
              junior:
                "background-color sets the background. Use background shorthand for gradients or images.",
              senior:
                "Prefer background-color for solid colors — it's explicit. background is shorthand for multiple properties.",
            },
            ageExposure: {
              young: "guided",
              junior: "fill-blank",
              senior: "fill-blank",
            },
            successMessage: "Background colored! ✅",
            action: "Check it!",
          },
          {
            id: "css-colors-wrap",
            type: "teki-message",
            mood: "proud",
            messages: [
              "color + background-color — just two CSS properties that completely transform a section.",
              "Every website you've ever visited uses exactly these same rules. Next: spacing and fonts!",
            ],
            action: "Next mission!",
          },
        ],
      },

      // ── Mission 11 — Spacing & Typography ─────────────────────────────────────
      {
        id: "mission-11",
        number: 11,
        act: 4,
        title: "Space & Type",
        subtitle: "Spacing and fonts complete your design",
        concept: "css-layout",
        xp: 150,
        badge: { id: "css-painter", label: "CSS Painter", emoji: "🎨" },
        steps: [
          {
            id: "css-padding-teki",
            type: "teki-message",
            mood: "thinking",
            messages: [
              "'padding' adds space INSIDE an element. 'margin' adds space OUTSIDE. Without spacing, everything feels cramped!",
              "Let's style the Features section cards!",
            ],
            action: "Add some breathing room!",
          },
          {
            id: "css-padding-challenge",
            type: "code-challenge",
            teki: "Add space inside the feature cards so the text isn't cramped:",
            language: "css",
            code: ".card {\n  ___: 1.5rem;\n  border-radius: 12px;\n}",
            answer: ".card {\n  padding: 1.5rem;\n  border-radius: 12px;\n}",
            blanks: [{ position: 0, answer: "padding" }],
            completionEffect: { styleSection: "features" },
            explanations: {
              young:
                "padding is breathing room INSIDE a box! More padding = more space around the text.",
              junior:
                "padding: 1.5rem adds equal space on all 4 sides. Use padding: top right bottom left for individual sides.",
              senior:
                "padding shorthand: 1 value = all sides; 2 = top/bottom + left/right; 4 = clockwise. rem scales with root font-size.",
            },
            ageExposure: {
              young: "guided",
              junior: "fill-blank",
              senior: "fill-blank",
            },
            successMessage:
              "Features section fully styled! Your website looks professional!",
            action: "Style the cards!",
          },
          {
            id: "features-styled-observe",
            type: "observation",
            teki: "Your Features section transformed! From a plain wireframe to polished cards. HTML builds it. CSS makes it beautiful!",
            autoAdvance: true,
            autoAdvanceDelay: 3500,
          },
          {
            id: "css-fontsize-challenge",
            type: "code-challenge",
            teki: "Font size controls how big text appears. What property sets it?",
            language: "css",
            code: "h1 {\n  ___-size: 2rem;\n  font-weight: 800;\n}",
            answer: "h1 {\n  font-size: 2rem;\n  font-weight: 800;\n}",
            blanks: [{ position: 0, answer: "font" }],
            explanations: {
              young:
                "font-size makes text bigger or smaller! 2rem is twice the normal size.",
              junior:
                "font-size sets text size. rem is relative to the root element (16px by default). 2rem = 32px.",
              senior:
                "Prefer rem over px to respect user browser settings. Use clamp() for fluid responsive typography.",
            },
            ageExposure: {
              young: "guided",
              junior: "fill-blank",
              senior: "fill-blank",
            },
            successMessage: "Typography styled! 📝",
            action: "Check it!",
          },
          {
            id: "act4-complete",
            type: "act-complete",
            actId: "act4",
            title: "ACT 4 Complete!",
            message:
              "You took a plain HTML wireframe and painted it with CSS. Colors, spacing, and fonts — all working together. Your website went from skeleton to stunning! Next: JavaScript gives it a brain.",
            power: { label: "CSS Painter", emoji: "🎨" },
            xpBonus: 200,
            action: "Give it a brain!",
          },
        ],
      },
    ],
  },

  // ── ACT 5 ── JavaScript: Variables & DOM ─────────────────────────────────────
  {
    id: "act5",
    number: 5,
    title: "JavaScript: Variables & DOM",
    tagline: "Give your website a memory",
    color: "#8b5cf6",
    emoji: "🧠",
    quiz: [
      {
        question: "What is a variable in JavaScript?",
        options: [
          "A type of HTML tag",
          "A named container that stores a value",
          "A CSS property",
          "A link to another page",
        ],
        correct: 1,
        explanation:
          "A variable is a labelled box that stores information — a number, a word, or anything your code needs to remember.",
      },
      {
        question: "What is the difference between let and const?",
        options: [
          "They do the same thing",
          "let can be reassigned, const cannot",
          "const is faster",
          "let is older and should be avoided",
        ],
        correct: 1,
        explanation:
          "let allows reassignment. const is a fixed binding — use const by default, let when you need to change it.",
      },
      {
        question: "What does document.querySelector() do?",
        options: [
          "Creates a new HTML element",
          "Sends data to a server",
          "Finds an element in the page and returns it",
          "Removes an element",
        ],
        correct: 2,
        explanation:
          "querySelector() searches the DOM for the first matching element. document.querySelector('#title') finds the element with id=\"title\".",
      },
    ],
    missions: [
      // ── Mission 12 — Variables ─────────────────────────────────────────────────
      {
        id: "mission-12",
        number: 12,
        act: 5,
        title: "Website Memory",
        subtitle: "Variables store information your website needs",
        concept: "js-variables",
        xp: 140,
        badge: null,
        steps: [
          {
            id: "js-intro-1",
            type: "teki-message",
            mood: "excited",
            messages: [
              "HTML = structure. CSS = style. JavaScript = BEHAVIOUR! JS makes your website respond, think, and remember.",
              "First lesson: variables. A variable stores a value — like a labelled box. let score = 0 — the box is called 'score' and holds 0.",
            ],
            action: "I get it!",
          },
          {
            id: "js-let-challenge",
            type: "code-challenge",
            teki: "Use 'let' for values that can change:",
            language: "javascript",
            code: '___ visitorName = "{{name}} Fan"\nconsole.log(visitorName)',
            answer:
              'let visitorName = "{{name}} Fan"\nconsole.log(visitorName)',
            blanks: [{ position: 0, answer: "let" }],
            explanations: {
              young:
                "let creates a variable you can change later! Like a rewritable sticky note.",
              junior:
                "'let' declares a block-scoped variable that can be reassigned. Introduced in ES6 to replace 'var'.",
              senior:
                "'let' is block-scoped (inside {}). Avoid 'var' — it's function-scoped and has hoisting quirks.",
            },
            ageExposure: {
              young: "guided",
              junior: "fill-blank",
              senior: "fill-blank",
            },
            successMessage: "Variable created with let! ✅",
            action: "Check it!",
          },
          {
            id: "js-const-challenge",
            type: "code-challenge",
            teki: "Use 'const' for values that NEVER change:",
            language: "javascript",
            code: '___ siteName = "{{name}}"\nconsole.log(siteName)',
            answer: 'const siteName = "{{name}}"\nconsole.log(siteName)',
            blanks: [{ position: 0, answer: "const" }],
            explanations: {
              young:
                "const creates a locked variable — you cannot change it once set!",
              junior:
                "'const' declares a block-scoped variable that CANNOT be reassigned. Use it for values that shouldn't change.",
              senior:
                "'const' prevents reassignment but not mutation. const arr = [] can still have push/pop.",
            },
            ageExposure: {
              young: "guided",
              junior: "fill-blank",
              senior: "fill-blank",
            },
            successMessage: "Constant locked in! 🔒",
            action: "Check it!",
          },
          {
            id: "js-variables-wrap",
            type: "teki-message",
            mood: "happy",
            messages: [
              "let and const — the two containers of JavaScript. Use let when a value can change, const when it never should.",
              "Your code now has MEMORY. Next up: use variables to grab and control parts of your website!",
            ],
            action: "Control the website!",
          },
        ],
      },

      // ── Mission 13 — The DOM ───────────────────────────────────────────────────
      {
        id: "mission-13",
        number: 13,
        act: 5,
        title: "Control Your Website",
        subtitle: "JavaScript can find and change any element on your page",
        concept: "js-dom",
        xp: 160,
        badge: { id: "js-thinker", label: "JS Thinker", emoji: "🧠" },
        steps: [
          {
            id: "dom-intro-teki",
            type: "teki-message",
            mood: "thinking",
            messages: [
              "JavaScript can see EVERY element on your page through the DOM — Document Object Model.",
              "Use document.querySelector('#id') to grab any element. Then change it with .textContent!",
              "Solve the next challenge and a Gallery section appears on your website — placed there by JavaScript!",
            ],
            action: "Let's grab things!",
          },
          {
            id: "js-querySelector-challenge",
            type: "code-challenge",
            teki: "Grab the hero headline element from the page:",
            language: "javascript",
            code: "const title = document.___('#hero-title')",
            answer: "const title = document.querySelector('#hero-title')",
            blanks: [{ position: 0, answer: "querySelector" }],
            explanations: {
              young:
                "querySelector finds the first element that matches — like a treasure hunter!",
              junior:
                "querySelector('#hero-title') finds the element with id='hero-title'. Use '#' for IDs, '.' for classes.",
              senior:
                "querySelector returns the first match or null. Use querySelectorAll for all matches. Optional chain: el?.textContent to avoid null errors.",
            },
            ageExposure: {
              young: "guided",
              junior: "fill-blank",
              senior: "fill-blank",
            },
            successMessage: "Element grabbed! 🎯",
            action: "Check it!",
          },
          {
            id: "js-textContent-challenge",
            type: "code-challenge",
            teki: "Change the element's text with .textContent:",
            language: "javascript",
            code: 'title.___ = "Welcome to {{name}}!"',
            answer: 'title.textContent = "Welcome to {{name}}!"',
            blanks: [{ position: 0, answer: "textContent" }],
            completionEffect: { buildSection: "gallery" },
            explanations: {
              young:
                "textContent is the text inside the element! Setting it changes what you see on the page.",
              junior:
                ".textContent reads or sets the plain text inside an element. Use .innerHTML if you need to insert HTML tags.",
              senior:
                "textContent is safer than innerHTML — it does not parse HTML and avoids XSS. Use innerHTML only when explicitly needed.",
            },
            ageExposure: {
              young: "guided",
              junior: "fill-blank",
              senior: "fill-blank",
            },
            successMessage:
              "Text updated AND a gallery appeared — JavaScript building your website live!",
            action: "Check it!",
          },
          {
            id: "dom-gallery-observe",
            type: "observation",
            teki: "Your gallery section just appeared — added by JavaScript! Your DOM code ran and built something real on your website. That's developer power!",
            autoAdvance: true,
            autoAdvanceDelay: 3000,
          },
          {
            id: "act5-complete",
            type: "act-complete",
            actId: "act5",
            title: "ACT 5 Complete!",
            message:
              "You gave your website a brain! Variables store information, and querySelector + textContent let you grab and change anything on the page. Three sections grew on your website through code!",
            power: { label: "JS Thinker", emoji: "🧠" },
            xpBonus: 200,
            action: "Add logic!",
          },
        ],
      },
    ],
  },

  // ── ACT 6 ── JavaScript: Logic & Events ──────────────────────────────────────
  {
    id: "act6",
    number: 6,
    title: "JavaScript: Logic & Events",
    tagline: "Decisions, clicks, and counters",
    color: "#06b6d4",
    emoji: "⚡",
    quiz: [
      {
        question: "What does an if statement do?",
        options: [
          "Loops through an array",
          "Runs code ONLY when a condition is true",
          "Declares a variable",
          "Styles an element",
        ],
        correct: 1,
        explanation:
          "An if statement runs a block of code only when its condition is true. If false, the code is skipped.",
      },
      {
        question: "What does addEventListener do?",
        options: [
          "Adds a new HTML element",
          "Listens for a user action and runs code when it happens",
          "Sets a CSS style",
          "Creates a variable",
        ],
        correct: 1,
        explanation:
          "addEventListener attaches a function to an element. When the event fires, the function runs.",
      },
      {
        question: "What does the ++ operator do?",
        options: [
          "Multiplies a number by 2",
          "Joins two strings together",
          "Adds 1 to a variable",
          "Subtracts 1 from a variable",
        ],
        correct: 2,
        explanation:
          "count++ is shorthand for count = count + 1. Very common for counters and loops.",
      },
    ],
    missions: [
      // ── Mission 14 — If Statements ─────────────────────────────────────────────
      {
        id: "mission-14",
        number: 14,
        act: 6,
        title: "Website Decisions",
        subtitle: "if statements let your website choose what to do",
        concept: "js-conditionals",
        xp: 140,
        badge: null,
        steps: [
          {
            id: "if-intro-teki",
            type: "teki-message",
            mood: "thinking",
            messages: [
              "Every smart website makes DECISIONS. Show this to logged-in users. Hide that from guests. Display a sale banner on Fridays.",
              "In JavaScript, decisions use if statements: IF this is true, do this. OTHERWISE, do that.",
            ],
            action: "Let's decide things!",
          },
          {
            id: "js-if-challenge",
            type: "code-challenge",
            teki: "Start an if statement that checks if a visitor is new:",
            language: "javascript",
            code: "__ (isNewVisitor) {\n  showWelcomeBanner()\n}",
            answer: "if (isNewVisitor) {\n  showWelcomeBanner()\n}",
            blanks: [{ position: 0, answer: "if" }],
            explanations: {
              young:
                "'if' is the magic word that says 'only do this when something is true'!",
              junior:
                "'if (condition)' runs the block only when condition is truthy.",
              senior:
                "JavaScript uses truthy/falsy values. null, undefined, 0, empty string, NaN, false are falsy — everything else is truthy.",
            },
            ageExposure: {
              young: "guided",
              junior: "fill-blank",
              senior: "fill-blank",
            },
            successMessage: "If statement written! ✅",
            action: "Check it!",
          },
          {
            id: "js-else-challenge",
            type: "code-challenge",
            teki: "The else block runs when the if condition is false — the 'otherwise' plan:",
            language: "javascript",
            code: "if (isLoggedIn) {\n  showDashboard()\n} ___ {\n  showLoginPage()\n}",
            answer:
              "if (isLoggedIn) {\n  showDashboard()\n} else {\n  showLoginPage()\n}",
            blanks: [{ position: 0, answer: "else" }],
            explanations: {
              young:
                "'else' is the backup plan! If the first condition fails, else runs instead.",
              junior:
                "'else' provides a fallback that runs when the if condition is false. if/else covers both outcomes.",
              senior:
                "Prefer early returns over nested if/else in functions. For multiple conditions, if/else if/else is clearer.",
            },
            ageExposure: {
              young: "guided",
              junior: "fill-blank",
              senior: "fill-blank",
            },
            successMessage: "Decision logic complete! 🧩",
            action: "Check it!",
          },
          {
            id: "js-if-wrap",
            type: "teki-message",
            mood: "proud",
            messages: [
              "if/else — every smart website decision starts here. Show a sale banner. Hide a button. Change a message.",
              "You've got the logic! Next: make your website RESPOND to clicks and user input.",
            ],
            action: "Let's respond!",
          },
        ],
      },

      // ── Mission 15 — Events ────────────────────────────────────────────────────
      {
        id: "mission-15",
        number: 15,
        act: 6,
        title: "Click Magic",
        subtitle: "Make your website respond to what users do",
        concept: "js-events",
        xp: 160,
        badge: null,
        steps: [
          {
            id: "events-intro-teki",
            type: "teki-message",
            mood: "excited",
            messages: [
              "Your website can LISTEN for what users do — clicks, key presses, typing.",
              "addEventListener connects a function to a user action. When the action happens, your function runs!",
              "Solve the challenge and your hero button will actually DO something when clicked!",
            ],
            action: "Make it click!",
          },
          {
            id: "js-addEventListener-challenge",
            type: "code-challenge",
            teki: "Make the hero button listen for clicks:",
            language: "javascript",
            code: "button.___('click', function() {\n  alert('Welcome to {{name}}! 🎉')\n})",
            answer:
              "button.addEventListener('click', function() {\n  alert('Welcome to {{name}}! 🎉')\n})",
            blanks: [{ position: 0, answer: "addEventListener" }],
            completionEffect: { enableInteractivity: true },
            explanations: {
              young:
                "addEventListener makes the button LISTEN! When clicked, it runs your instructions.",
              junior:
                "addEventListener(event, handler) attaches a listener. Common events: 'click', 'keydown', 'input', 'submit'.",
              senior:
                "addEventListener is preferred over inline handlers (onclick=). It supports multiple listeners and can be removed with removeEventListener.",
            },
            ageExposure: {
              young: "guided",
              junior: "fill-blank",
              senior: "fill-blank",
            },
            successMessage:
              "Your hero button is now interactive — try clicking it on the website!",
            action: "Make it listen!",
          },
          {
            id: "button-interactive-observe",
            type: "observation",
            teki: "Try clicking the button on your website — it responds now! That's an event listener in action. This is how EVERY interactive website works!",
            autoAdvance: true,
            autoAdvanceDelay: 3500,
          },
          {
            id: "js-value-challenge",
            type: "code-challenge",
            teki: "To read what a user typed in an input field, use .value:",
            language: "javascript",
            code: "const searchBox = document.querySelector('#search')\nconst userTyped = searchBox.___",
            answer:
              "const searchBox = document.querySelector('#search')\nconst userTyped = searchBox.value",
            blanks: [{ position: 0, answer: "value" }],
            explanations: {
              young:
                ".value reads what's typed inside an input box! Like peeking inside a text field.",
              junior:
                ".value works on <input>, <textarea>, and <select> elements. It returns the current content as a string.",
              senior:
                ".value is a live DOM property — it reflects current state, not the initial HTML attribute. Use the 'input' event for reactive updates.",
            },
            ageExposure: {
              young: "guided",
              junior: "fill-blank",
              senior: "fill-blank",
            },
            successMessage: "Input value read! ✅",
            action: "Check it!",
          },
          {
            id: "js-events-wrap",
            type: "teki-message",
            mood: "proud",
            messages: [
              "addEventListener + .value — your website can now listen for what users DO and read what they TYPE.",
              "This is how every search box, every login form, every like button works. Next: put it all together into a live counter!",
            ],
            action: "Build the counter!",
          },
        ],
      },

      // ── Mission 16 — Counters ──────────────────────────────────────────────────
      {
        id: "mission-16",
        number: 16,
        act: 6,
        title: "Live Counter",
        subtitle: "Variables + events = a real feature",
        concept: "js-counter",
        xp: 180,
        badge: { id: "event-master", label: "Event Master", emoji: "⚡" },
        steps: [
          {
            id: "counter-intro-teki",
            type: "teki-message",
            mood: "excited",
            messages: [
              "Time to build something REAL — a live counter! Think likes, views, or votes.",
              "A variable holds the count. A click event increments it. The DOM shows the new value. Simple!",
            ],
            action: "Build the counter!",
          },
          {
            id: "js-increment-challenge",
            type: "code-challenge",
            teki: "The ++ operator adds 1 to a variable — perfect for counting:",
            language: "javascript",
            code: "let likes = 0\n\nbutton.addEventListener('click', function() {\n  likes___\n  countDisplay.textContent = likes\n})",
            answer:
              "let likes = 0\n\nbutton.addEventListener('click', function() {\n  likes++\n  countDisplay.textContent = likes\n})",
            blanks: [{ position: 0, answer: "++" }],
            explanations: {
              young:
                "++ adds 1 to your counter every click! likes++ is the same as likes = likes + 1.",
              junior:
                "count++ is a post-increment operator. Equivalent to count = count + 1. Common in click handlers.",
              senior:
                "count++ returns the OLD value, ++count returns the NEW value. For simple counters the distinction rarely matters.",
            },
            ageExposure: {
              young: "guided",
              junior: "fill-blank",
              senior: "fill-blank",
            },
            successMessage: "Counter built! Every click adds 1. ✅",
            action: "Check it!",
          },
          {
            id: "counter-teki-followup",
            type: "teki-message",
            mood: "proud",
            messages: [
              "You just combined a variable (likes), an event (click), and the DOM (textContent) into one working feature. That is real programming!",
            ],
            action: "That's wild!",
          },
          {
            id: "act6-complete",
            type: "act-complete",
            actId: "act6",
            title: "ACT 6 Complete!",
            message:
              "Your website can make decisions, respond to clicks, and count interactions. Variables + Events + DOM = any interactive feature you can imagine. One more act: arrays and functions!",
            power: { label: "Event Master", emoji: "⚡" },
            xpBonus: 200,
            action: "Final toolkit!",
          },
        ],
      },
    ],
  },

  // ── ACT 7 ── JavaScript: Power Tools ─────────────────────────────────────────
  {
    id: "act7",
    number: 7,
    title: "JavaScript: Power Tools",
    tagline: "Arrays and functions — the professional toolkit",
    color: "#f97316",
    emoji: "🛠️",
    quiz: [
      {
        question: "What is an array in JavaScript?",
        options: [
          "A type of CSS property",
          "A container that holds multiple values in order",
          "A way to style elements",
          "A database connection",
        ],
        correct: 1,
        explanation:
          'An array is a list — a single variable that holds multiple values: const fruits = ["apple", "banana", "cherry"].',
      },
      {
        question: "What does forEach do?",
        options: [
          "Creates a new array",
          "Reverses an array",
          "Runs a function once for each item in the array",
          "Sorts the array alphabetically",
        ],
        correct: 2,
        explanation:
          "forEach loops through every item in an array and runs your function once per item.",
      },
      {
        question: "What does the return keyword do inside a function?",
        options: [
          "Starts a new loop",
          "Exits the function and sends a value back",
          "Creates a variable",
          "Styles an element",
        ],
        correct: 1,
        explanation:
          "return exits the function and sends a value back to wherever it was called.",
      },
    ],
    missions: [
      // ── Mission 17 — Arrays & forEach ─────────────────────────────────────────
      {
        id: "mission-17",
        number: 17,
        act: 7,
        title: "Dynamic Gallery",
        subtitle: "Arrays + forEach power your content gallery",
        concept: "js-arrays",
        xp: 160,
        badge: null,
        steps: [
          {
            id: "arrays-intro-teki",
            type: "teki-message",
            mood: "excited",
            messages: [
              "Imagine showing 50 items on a page. Would you write 50 separate lines of HTML? Arrays save you!",
              "An array is a list: const items = ['Item 1', 'Item 2', 'Item 3']. One variable, many values.",
            ],
            action: "One variable for all!",
          },
          {
            id: "js-array-challenge",
            type: "code-challenge",
            teki: "Create an array of topics for your gallery. Arrays use square brackets:",
            language: "javascript",
            code: 'const topics = ___"{{topic}}", "Community", "News"___',
            answer: 'const topics = ["{{topic}}", "Community", "News"]',
            blanks: [
              { position: 0, answer: "[" },
              { position: 1, answer: "]" },
            ],
            completionEffect: { styleSection: "gallery" },
            explanations: {
              young:
                "Square brackets [ ] make an array! Everything inside is your list.",
              junior:
                "Arrays use square bracket notation. Access items with topics[0] (first), topics[1] (second), etc.",
              senior:
                "Arrays are objects in JS. Use Array.isArray() to check. Prefer const for array declarations since the reference does not change.",
            },
            ageExposure: {
              young: "guided",
              junior: "fill-blank",
              senior: "fill-blank",
            },
            successMessage:
              "Array created — your gallery is now fully styled with topic data!",
            action: "Check it!",
          },
          {
            id: "gallery-styled-observe",
            type: "observation",
            teki: "Your Gallery section just got fully styled with your topic data — powered by the array you just wrote! One variable, six cards. That's the power of arrays doing the heavy lifting!",
            autoAdvance: true,
            autoAdvanceDelay: 3000,
          },
          {
            id: "forEach-teki",
            type: "teki-message",
            mood: "thinking",
            messages: [
              "forEach lets you loop through every item and do something with each one. Like visiting every house in a street!",
            ],
            action: "Loop through it!",
          },
          {
            id: "js-forEach-challenge",
            type: "code-challenge",
            teki: "Loop through the topics array:",
            language: "javascript",
            code: "topics.___(function(topic) {\n  console.log(topic)\n})",
            answer:
              "topics.forEach(function(topic) {\n  console.log(topic)\n})",
            blanks: [{ position: 0, answer: "forEach" }],
            explanations: {
              young:
                "forEach visits each item in the list and does something with it!",
              junior:
                "forEach(callback) runs the callback once for each array element. Great for rendering lists to the DOM.",
              senior:
                "forEach does not return a value — use map() when you need a transformed array. forEach is for side effects only.",
            },
            ageExposure: {
              young: "guided",
              junior: "fill-blank",
              senior: "fill-blank",
            },
            successMessage: "forEach looping! ✅",
            action: "Check it!",
          },
        ],
      },

      // ── Mission 18 — Functions ─────────────────────────────────────────────────
      {
        id: "mission-18",
        number: 18,
        act: 7,
        title: "Reusable Tools",
        subtitle: "Functions are the most powerful tool in programming",
        concept: "js-functions",
        xp: 200,
        badge: { id: "junior-creator", label: "Junior Creator", emoji: "🛠️" },
        steps: [
          {
            id: "functions-intro-teki",
            type: "teki-message",
            mood: "proud",
            messages: [
              "Functions are the most important concept in programming. Write code ONCE, give it a name, use it anywhere.",
              "Think of it like a machine: give it inputs (parameters), it does something, gives back an output (return).",
            ],
            action: "Build a function!",
          },
          {
            id: "functions-syntax-teki",
            type: "teki-message",
            mood: "thinking",
            messages: [
              "Syntax: function myName(param) { ... return value; }. The 'function' keyword starts it, the name labels it, 'return' sends the result back!",
            ],
            action: "Got the syntax!",
          },
          {
            id: "js-function-challenge",
            type: "code-challenge",
            teki: "Define a function that formats a page title:",
            language: "javascript",
            code: '___ formatTitle(title) {\n  return "✨ " + title\n}',
            answer: 'function formatTitle(title) {\n  return "✨ " + title\n}',
            blanks: [{ position: 0, answer: "function" }],
            explanations: {
              young:
                "'function' is the magic word to start making a reusable tool!",
              junior:
                "'function' declares a named function. The name after it is how you call it: formatTitle('Hello').",
              senior:
                "Function declarations are hoisted — they can be called before they are defined. Arrow functions are not hoisted.",
            },
            ageExposure: {
              young: "guided",
              junior: "fill-blank",
              senior: "fill-blank",
            },
            successMessage: "Function defined! 🛠️",
            action: "Check it!",
          },
          {
            id: "js-return-challenge",
            type: "code-challenge",
            teki: "The 'return' keyword sends the result OUT of the function:",
            language: "javascript",
            code: "function double(number) {\n  ___ number * 2\n}\n\nlet result = double(5)  // result = 10",
            answer:
              "function double(number) {\n  return number * 2\n}\n\nlet result = double(5)  // result = 10",
            blanks: [{ position: 0, answer: "return" }],
            explanations: {
              young:
                "return hands the answer OUT of the function — like the kitchen handing you your finished meal!",
              junior:
                "'return' exits the function and sends a value back to the caller. Without return, the function returns undefined.",
              senior:
                "'return' exits immediately. Early returns are great for guard clauses. A function without return returns undefined.",
            },
            ageExposure: {
              young: "guided",
              junior: "fill-blank",
              senior: "fill-blank",
            },
            successMessage: "Value returned! 🎯",
            action: "Check it!",
          },
          {
            id: "act7-complete",
            type: "act-complete",
            actId: "act7",
            title: "ACT 7 Complete!",
            message:
              "You have the FULL toolkit! Variables, DOM, conditionals, events, arrays, loops, and functions — AND your website grew with every concept: About, Features, and Gallery sections all appeared through YOUR code. You are a Junior Creator!",
            power: { label: "Junior Creator", emoji: "🛠️" },
            xpBonus: 200,
            action: "I'm a Junior Creator!",
          },
        ],
      },
    ],
  },

  // ── ACT 8 ── Teaching The Website Skills ────────────────────────────────────
  {
    id: "act8",
    number: 8,
    title: "Teaching The Website Skills",
    tagline: "Functions — reusable tools",
    color: "#f97316",
    emoji: "🔧",
    quiz: [
      {
        question: "What is a FUNCTION in code?",
        options: [
          "A type of error message",
          "A reusable block of code with a name",
          "A color value",
          "A database table",
        ],
        correct: 1,
        explanation:
          "A function is a named recipe — write it once, call it as many times as you need.",
      },
      {
        question: "What does it mean to CALL a function?",
        options: [
          "Give it a name",
          "Delete it from memory",
          "Run / execute it",
          "Copy it to another file",
        ],
        correct: 2,
        explanation:
          "Calling a function means running the code inside it: greet() calls the greet function.",
      },
      {
        question: "What do PARAMETERS let you do?",
        options: [
          "Style text on the page",
          "Pass different values INTO a function each time it runs",
          "Create loops",
          "Connect to a server",
        ],
        correct: 1,
        explanation:
          "Parameters are like blank boxes in a recipe — you fill them in differently each time you call the function.",
      },
    ],
    missions: [
      // ── Mission 19 — Write Once, Use Everywhere ──────────────────────────────
      {
        id: "mission-19",
        number: 19,
        act: 8,
        title: "Write Once, Use Everywhere",
        subtitle: "Functions are reusable named tools",
        concept: "functions",
        xp: 170,
        badge: null,
        steps: [
          {
            id: "functions-on-website-intro",
            type: "teki-message",
            mood: "excited",
            messages: [
              "You built HTML structure. Added CSS style. Wired JavaScript events. Now — FUNCTIONS.",
              "Functions are reusable named tools. Write code once, call it as many times as you need.",
              "Here's the best part: every function you write below will unlock a new section on your website!",
            ],
            action: "Let's build!",
          },
          {
            id: "function-define-challenge",
            type: "code-challenge",
            teki: "Define a function called 'double' that takes a number and returns it times 2. Watch your website grow!",
            language: "javascript",
            code: `___ double(number) {
  return number * 2;
}`,
            answer: `function double(number) {
  return number * 2;
}`,
            blanks: [{ position: 0, answer: "function" }],
            explanations: {
              young:
                "Type 'function' to start defining it — like writing the title of your recipe card!",
              junior:
                "'function' is the keyword that creates a reusable block. The name after it is how you call it.",
              senior:
                "'function' creates a named function declaration which is hoisted. Arrow functions const f = () => {} are not hoisted.",
            },
            completionEffect: { buildSection: "testimonials" },
            ageExposure: {
              young: "guided",
              junior: "fill-blank",
              senior: "fill-blank",
            },
            successMessage:
              "Function defined — and a Testimonials section appeared on your website!",
            action: "Check it!",
          },
          {
            id: "testimonials-appear-observe",
            type: "observation",
            teki: "A Testimonials section appeared — built by your function knowledge! Wireframe for now — the next challenge styles it!",
            autoAdvance: true,
            autoAdvanceDelay: 3000,
          },
          {
            id: "return-challenge",
            type: "code-challenge",
            teki: "A function that doesn't return anything is useless. Make this one return the greeting:",
            language: "javascript",
            code: `function greet(name) {
  ___ "Hello, " + name + "!";
}

let msg = greet("Alex");  // msg should be "Hello, Alex!"`,
            answer: `function greet(name) {
  return "Hello, " + name + "!";
}

let msg = greet("Alex");  // msg should be "Hello, Alex!"`,
            blanks: [{ position: 0, answer: "return" }],
            explanations: {
              young:
                "return sends the result OUT of the function — like the kitchen handing you your cooked meal!",
              junior:
                "'return' exits the function and sends a value back to whoever called it. Without return, the function returns undefined.",
              senior:
                "Functions without return return undefined. Use return early for guard clauses. Avoid multiple returns for complex logic — prefer a result variable.",
            },
            ageExposure: {
              young: "guided",
              junior: "fill-blank",
              senior: "fill-blank",
            },
            successMessage: "Value returned! ✅",
            action: "Check it!",
          },
          {
            id: "call-function-challenge",
            type: "code-challenge",
            teki: "Now CALL the function with a visitor's name:",
            language: "javascript",
            code: `function greet(name) {
  return "Hello, " + name + "!";
}

let message = ___("{{name}}");
console.log(message); // "Hello, {{name}}!"`,
            answer: `function greet(name) {
  return "Hello, " + name + "!";
}

let message = greet("{{name}}");
console.log(message); // "Hello, {{name}}!"`,
            blanks: [{ position: 0, answer: "greet" }],
            explanations: {
              young:
                "Call it by its name followed by () — like calling a friend to come over!",
              junior:
                "functionName(argument) calls the function and passes the argument as the parameter. The return value can be stored in a variable.",
              senior:
                "Function calls are expressions — they evaluate to the return value. Can be used inline: console.log(greet('Alex')) or in other expressions.",
            },
            ageExposure: {
              young: "guided",
              junior: "fill-blank",
              senior: "fill-blank",
            },
            successMessage: "Function called! 📞",
            action: "Check it!",
          },
        ],
      },

      // ── Mission 20 — The Name Generator ─────────────────────────────────────
      {
        id: "mission-20",
        number: 20,
        act: 8,
        title: "Random Name Generator",
        subtitle: "Arrays + functions + events — all together",
        concept: "function-project",
        xp: 220,
        badge: {
          id: "function-engineer",
          label: "Function Engineer",
          emoji: "🔧",
        },
        steps: [
          {
            id: "generator-project-intro",
            type: "teki-message",
            mood: "excited",
            messages: [
              "Final mission of the fundamentals — combining arrays, functions, AND Math to build something REAL.",
              "We're building a random name generator. Every challenge unlocks a piece of the machine.",
              "Finish them all and your Testimonials section gets fully styled with the data you power!",
            ],
            action: "Build it!",
          },
          {
            id: "math-floor-challenge",
            type: "code-challenge",
            teki: "Math.floor() rounds down to a whole number. Use it to get a random index:",
            language: "javascript",
            code: `let words = ["cat", "dog", "bird"];

let randomIndex = Math.___(Math.random() * words.length);
let randomWord = words[randomIndex];`,
            answer: `let words = ["cat", "dog", "bird"];

let randomIndex = Math.floor(Math.random() * words.length);
let randomWord = words[randomIndex];`,
            blanks: [{ position: 0, answer: "floor" }],
            explanations: {
              young:
                "Math.floor rounds DOWN to the nearest whole number. 2.9 → 2. 1.1 → 1. This prevents going past the end of the array!",
              junior:
                "Math.floor(n) returns the largest integer ≤ n. Math.random() * length gives 0 to (length-1.0001), so floor gives 0 to length-1.",
              senior:
                "Math.floor vs Math.round vs Math.trunc: floor always goes down, round goes to nearest, trunc truncates toward zero. For positive numbers, floor and trunc are equivalent.",
            },
            ageExposure: {
              young: "guided",
              junior: "fill-blank",
              senior: "fill-blank",
            },
            successMessage: "Random index! 🎲",
            action: "Check it!",
          },
          {
            id: "generator-function-challenge",
            type: "code-challenge",
            teki: "Complete the generateName function to return a random combined name:",
            language: "javascript",
            code: `let adjs  = ["Fluffy", "Speedy", "Cosmic"];
let nouns = ["Paws", "Whisker", "Rocket"];

function generateName() {
  let adj  = adjs[Math.floor(Math.random() * adjs.length)];
  let noun = nouns[Math.floor(Math.random() * nouns.length)];
  ___ adj + " " + noun;
}`,
            answer: `let adjs  = ["Fluffy", "Speedy", "Cosmic"];
let nouns = ["Paws", "Whisker", "Rocket"];

function generateName() {
  let adj  = adjs[Math.floor(Math.random() * adjs.length)];
  let noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adj + " " + noun;
}`,
            blanks: [{ position: 0, answer: "return" }],
            explanations: {
              young:
                "return sends the combined name OUT of the function so we can use it!",
              junior:
                "return adj + ' ' + noun sends the combined string back to whoever called generateName().",
              senior:
                "Could also write as: return `${adj} ${noun}` using template literals for cleaner string building.",
            },
            completionEffect: { styleSection: "testimonials" },
            ageExposure: {
              young: "guided",
              junior: "fill-blank",
              senior: "fill-blank",
            },
            successMessage:
              "Generator complete — Testimonials section fully styled! 🎰",
            action: "Check it!",
          },
          {
            id: "testimonials-styled-observe",
            type: "observation",
            teki: "Testimonials section fully styled! Your website now shows real reviews for your topic — powered by your function knowledge!",
            autoAdvance: true,
            autoAdvanceDelay: 3000,
          },
          {
            id: "act8-complete",
            type: "act-complete",
            actId: "act8",
            title: "ACT 8 Complete!",
            message:
              "Variables, conditionals, events, arrays, loops, functions — you know ALL the fundamentals of programming! Now meet the tools professionals actually use.",
            power: { label: "Function Engineer", emoji: "🔧" },
            xpBonus: 250,
            action: "Show me modern tools!",
          },
        ],
      },
    ],
  },

  // ── ACT 9 ── Modern Builder Tools (React) ────────────────────────────────────
  // 8 chapters, each taught ON the student's auto-generated website.
  // Uses react-gateway / react-spotlight / react-concept / react-live-demo steps.
  {
    id: "act9",
    number: 9,
    title: "Modern Builder Tools",
    tagline: "React — the way professionals build",
    color: "#0ea5e9",
    emoji: "⚛️",
    quiz: [
      {
        question: "What is a React COMPONENT?",
        options: [
          "A database row",
          "A CSS file",
          "A reusable piece of UI built with JavaScript",
          "A type of loop",
        ],
        correct: 2,
        explanation:
          "Components are the building blocks of React apps — each one is a self-contained UI piece.",
      },
      {
        question: "What is React STATE?",
        options: [
          "The location of the server",
          "Data stored inside a component that can change over time",
          "A special HTML attribute",
          "A routing library",
        ],
        correct: 1,
        explanation:
          "State is a component's memory — when state changes, React automatically re-renders the UI.",
      },
      {
        question: "How do you pass data INTO a React component?",
        options: [
          "Using useState",
          "Using a for loop",
          "Using props",
          "Using a database",
        ],
        correct: 2,
        explanation:
          "Props (properties) let parent components send data down to child components.",
      },
    ],
    missions: [
      // ── Mission 21 ─ Chapter 1: Components ───────────────────────────────────
      {
        id: "mission-21",
        number: 21,
        act: 9,
        title: "The Developer's Secret",
        subtitle: "React Components — build once, use everywhere",
        concept: "components",
        xp: 200,
        badge: null,
        steps: [
          {
            id: "m21-gateway",
            type: "react-gateway",
            chapterNumber: 1,
            chapterTitle: "Reusable Pieces",
            chapterSubtitle: "React Components",
            messages: [
              "Nice.",
              "We have a real website.",
              "But here's something interesting...",
              "Professional developers don't build websites one piece at a time.",
              "They use special tools.",
              "Want to see them?",
            ],
            mood: "excited",
            action: "Show Me",
          },
          {
            id: "m21-spotlight",
            type: "react-spotlight",
            demoState: { mode: "components", highlightButtons: true },
            teki: "Look around your website.",
            question: "Do you think developers built each button separately?",
            options: [
              { id: "yes", label: "Yes" },
              { id: "no", label: "No" },
            ],
            tekiReaction: {
              yes: {
                messages: ["Actually... nope. Let me show you the secret."],
                mood: "thinking",
              },
              no: {
                messages: ["Exactly! Let me show you how."],
                mood: "excited",
              },
            },
            action: "Show Me How",
          },
          {
            id: "m21-concept",
            type: "react-concept",
            conceptType: "blueprint-to-components",
            teki: "They built ONE blueprint. Then copied it everywhere.",
            codeReveal: "<Button />",
            language: "jsx",
            explanation: {
              young:
                "A Component is like a LEGO piece! Make one, snap it in 100 times!",
              junior:
                "Components are reusable. Define once in code — use as many times as you want.",
              senior:
                "React components are pure functions of their props. Define once, compose freely.",
            },
            action: "I love it!",
          },
          {
            id: "m21-demo",
            type: "react-live-demo",
            demoType: "button-style",
            teki: "Try it. Change every button style at once.",
            demoInit: { mode: "components", highlightButtons: false },
            options: [
              { label: "Rounded", value: "rounded" },
              { label: "Pill", value: "pill" },
              { label: "Square", value: "square" },
            ],
            codeReveal: `function Button({ text }) {
  return <button className="btn">{text}</button>;
}

// Every button on the site uses this one component.`,
            language: "jsx",
            successMessage: "See? ONE change. EVERY button updated.",
            explanation: {
              young: "One blueprint changed everything at once!",
              junior:
                "Changing the Button component updates every button instantly — no manual edits.",
              senior:
                "Centralising UI in a component means one change propagates everywhere. This is the core benefit of component-based architecture.",
            },
            action: "Next Chapter!",
          },
        ],
      },

      // ── Mission 22 ─ Chapter 2: Props ─────────────────────────────────────────
      {
        id: "mission-22",
        number: 22,
        act: 9,
        title: "Shape Shifters",
        subtitle: "Props — customize each piece",
        concept: "props",
        xp: 200,
        badge: null,
        steps: [
          {
            id: "m22-gateway",
            type: "react-gateway",
            chapterNumber: 2,
            chapterTitle: "Shape Shifters",
            chapterSubtitle: "Props",
            messages: ["What if the same blueprint could look different?"],
            mood: "thinking",
            action: "Show Me",
          },
          {
            id: "m22-spotlight",
            type: "react-spotlight",
            demoState: {
              mode: "components",
              propShowcase: true,
              highlightButtons: false,
            },
            teki: "Same Button component — three different labels.",
            highlightLabels: ["Adopt Now", "Learn More", "Contact Us"],
            action: "Interesting!",
          },
          {
            id: "m22-demo",
            type: "react-live-demo",
            demoType: "text-editor",
            teki: "Your turn. Change the button text.",
            demoInit: { mode: "props", propShowcase: false },
            placeholder: "e.g. Join The Mission",
            defaultValue: "Join The Mission",
            codeReveal: `<Button text="{{value}}" />`,
            language: "jsx",
            successMessage: "Same blueprint. Different information.",
            explanation: {
              young:
                "Props are like instructions you give each piece! Same toy, different label.",
              junior:
                "Props let you pass data into a component. Each instance can display different content.",
              senior:
                "Props are immutable from the child's perspective. The parent owns the data — the child just renders it.",
            },
            action: "Next Chapter!",
          },
        ],
      },

      // ── Mission 23 ─ Chapter 3: State ─────────────────────────────────────────
      {
        id: "mission-23",
        number: 23,
        act: 9,
        title: "Website Memory",
        subtitle: "State — the site remembers your choices",
        concept: "state",
        xp: 220,
        badge: null,
        steps: [
          {
            id: "m23-gateway",
            type: "react-gateway",
            chapterNumber: 3,
            chapterTitle: "Website Memory",
            chapterSubtitle: "State",
            messages: [
              "Your website has a theme switcher now.",
              "Click Dark Mode and watch what happens.",
            ],
            mood: "thinking",
            action: "Okay",
          },
          {
            id: "m23-state-demo",
            type: "react-live-demo",
            demoType: "theme-toggle",
            demoInit: { mode: "state", showThemeBar: true },
            teki: "Click Dark Mode!",
            options: [
              { label: "Light Mode", value: false },
              { label: "Dark Mode", value: true },
            ],
            action: "Interesting!",
          },
          {
            id: "m23-teki",
            type: "teki-message",
            mood: "amazed",
            messages: ["Interesting...", "The website remembered your choice."],
            autoAdvance: true,
          },
          {
            id: "m23-setting-demo",
            type: "react-live-demo",
            demoType: "add-setting",
            demoInit: { mode: "state" },
            teki: "Mission: Add another setting to your website.",
            options: [
              { label: "Theme", value: "theme", icon: "🎨" },
              { label: "Font Size", value: "fontSize", icon: "📏" },
              { label: "Hero Text", value: "heroText", icon: "✏️" },
            ],
            codeReveal: `const [theme, setTheme] = useState('light');

// When user clicks:
setTheme('dark');  // ← triggers re-render automatically`,
            language: "jsx",
            successMessage: "This is website memory. Developers call it State.",
            explanation: {
              young:
                "useState is a memory crystal! It remembers things and updates the screen when changed!",
              junior:
                "useState(initial) returns [value, setter]. Calling the setter triggers a re-render with the new value.",
              senior:
                "useState is a React Hook. State updates are batched and asynchronous. Avoid duplicating state that can be derived.",
            },
            action: "Next Chapter!",
          },
        ],
      },

      // ── Mission 24 ─ Chapter 4: Events ────────────────────────────────────────
      {
        id: "mission-24",
        number: 24,
        act: 9,
        title: "Teaching Actions",
        subtitle: "Events — buttons that actually do things",
        concept: "react-events",
        xp: 180,
        badge: null,
        steps: [
          {
            id: "m24-gateway",
            type: "react-gateway",
            chapterNumber: 4,
            chapterTitle: "Teaching Actions",
            chapterSubtitle: "Events",
            messages: [],
            mood: "happy",
            action: "Let's See",
          },
          {
            id: "m24-dead-button",
            type: "react-spotlight",
            demoState: {
              mode: "events",
              showDeadButton: true,
              eventAction: null,
            },
            teki: 'The hero button says "Explore". Click it in the preview. Nothing happens.',
            action: "Nothing happened...",
          },
          {
            id: "m24-teki",
            type: "teki-message",
            mood: "thinking",
            messages: ["Let's teach it what to do."],
            autoAdvance: true,
          },
          {
            id: "m24-event-demo",
            type: "react-live-demo",
            demoType: "event-picker",
            teki: "Choose what the button should do:",
            demoInit: { mode: "events" },
            options: [
              { label: "Show Message", value: "message", icon: "💬" },
              { label: "Open Popup", value: "popup", icon: "📋" },
              { label: "Change Text", value: "text-change", icon: "✏️" },
            ],
            codeReveal: `<button onClick={handleClick}>
  Explore
</button>

// onClick fires every time the button is clicked.`,
            language: "jsx",
            successMessage: "The button knows what to do now!",
            explanation: {
              young:
                "onClick is like a tiny sensor! When clicked, it runs your instructions!",
              junior:
                "onClick={handler} attaches a click listener. Pass the function name — don't call it with ().",
              senior:
                "React synthetic events wrap native DOM events. Use onClick, onChange, onSubmit. Pass references, not invocations.",
            },
            action: "Next Chapter!",
          },
        ],
      },

      // ── Mission 25 ─ Chapter 5: map() ─────────────────────────────────────────
      {
        id: "mission-25",
        number: 25,
        act: 9,
        title: "Automatic Factories",
        subtitle: "map() — one instruction, many results",
        concept: "list-rendering",
        xp: 200,
        badge: null,
        steps: [
          {
            id: "m25-gateway",
            type: "react-gateway",
            chapterNumber: 5,
            chapterTitle: "Automatic Factories",
            chapterSubtitle: "map()",
            messages: [],
            mood: "excited",
            action: "Show Me",
          },
          {
            id: "m25-gallery-show",
            type: "react-spotlight",
            demoState: {
              mode: "map",
              showPets: true,
              pets: ["Buddy 🐶", "Whiskers 🐱", "Hopscotch 🐰"],
            },
            teki: "Look — a pet gallery just appeared on your website!",
            action: "Cool!",
          },
          {
            id: "m25-teki",
            type: "teki-message",
            mood: "thinking",
            messages: [
              "Imagine adding 100 pets manually.",
              "That's 100 separate blocks of code.",
              "Nightmare, right?",
            ],
            autoAdvance: true,
          },
          {
            id: "m25-add-pet",
            type: "react-live-demo",
            demoType: "add-pet",
            teki: "Add a new pet. Watch the gallery update automatically.",
            demoInit: {
              mode: "map",
              showPets: true,
              pets: ["Buddy 🐶", "Whiskers 🐱", "Hopscotch 🐰"],
            },
            codeReveal: `const pets = ["Buddy", "Whiskers", "Hopscotch", /* new pet */];

// ONE instruction creates ALL the cards:
pets.map((pet) => (
  <PetCard key={pet} name={pet} />
))`,
            language: "jsx",
            successMessage: "One instruction. Many cards.",
            explanation: {
              young:
                "map() is a magic factory! Give it a list, it makes a card for EACH one!",
              junior:
                "map() transforms every array item. Add one pet to the array — one new card appears instantly.",
              senior:
                "map() in JSX returns a list of elements. Each needs a stable key prop for efficient reconciliation.",
            },
            action: "Next Chapter!",
          },
        ],
      },

      // ── Mission 26 ─ Chapter 6: Conditional Rendering ────────────────────────
      {
        id: "mission-26",
        number: 26,
        act: 9,
        title: "Smart Decisions",
        subtitle: "Conditional Rendering — show the right thing",
        concept: "conditional-rendering",
        xp: 200,
        badge: null,
        steps: [
          {
            id: "m26-gateway",
            type: "react-gateway",
            chapterNumber: 6,
            chapterTitle: "Smart Decisions",
            chapterSubtitle: "Conditional Rendering",
            messages: [],
            mood: "thinking",
            action: "Got it",
          },
          {
            id: "m26-spotlight",
            type: "react-spotlight",
            demoState: {
              mode: "conditional",
              showConditional: true,
              userType: null,
            },
            teki: 'Your website shows "Welcome, Visitor!" to everyone. But what if it could be smarter?',
            action: "What if...?",
          },
          {
            id: "m26-demo",
            type: "react-live-demo",
            demoType: "user-type",
            teki: "Choose who's visiting. Watch the message change.",
            demoInit: { mode: "conditional", showConditional: true },
            options: [
              { label: "Kid", value: "kid", icon: "🧒" },
              { label: "Parent", value: "parent", icon: "👩" },
              { label: "Teacher", value: "teacher", icon: "👩‍🏫" },
            ],
            codeReveal: `{isKid
  ? <p>Hey future builder! 🎉</p>
  : isParent
  ? <p>Explore our resources! 👩‍👧</p>
  : <p>Welcome, Educator! 👩‍🏫</p>
}`,
            language: "jsx",
            successMessage: "Different visitors, different experience!",
            explanation: {
              young:
                "IF kid → this message. IF parent → that message. The website chooses!",
              junior:
                "The ternary operator condition ? A : B renders different JSX based on a condition.",
              senior:
                "Conditional rendering in JSX uses &&, ternary, or extracted variables. Prefer early returns for complex branching.",
            },
            action: "Next Chapter!",
          },
        ],
      },

      // ── Mission 27 ─ Chapter 7: Routing ───────────────────────────────────────
      {
        id: "mission-27",
        number: 27,
        act: 9,
        title: "Multiple Rooms",
        subtitle: "Routing — connect your pages",
        concept: "routing",
        xp: 220,
        badge: { id: "react-builder", label: "React Builder", emoji: "🧩" },
        steps: [
          {
            id: "m27-gateway",
            type: "react-gateway",
            chapterNumber: 7,
            chapterTitle: "Multiple Rooms",
            chapterSubtitle: "Routing",
            messages: [
              "Your website has rooms.",
              "Home, About, Gallery, Contact.",
              "But they need doors.",
            ],
            mood: "thinking",
            action: "Connect Them!",
          },
          {
            id: "m27-demo",
            type: "react-live-demo",
            demoType: "connect-routes",
            teki: "Connect your pages — click each nav link to activate it.",
            demoInit: {
              mode: "routing",
              pagesConnected: false,
              connectedRoutes: [],
            },
            codeReveal: `import { Link, Route } from '@tanstack/react-router';

// Navigation link
<Link to="/about">About</Link>

// Page definition
<Route path="/about" component={AboutPage} />`,
            language: "jsx",
            successMessage: "Your pages are connected!",
            explanation: {
              young:
                "Links are like doors between rooms! Click one and you're in a new room instantly!",
              junior:
                "React Router's <Link> navigates without reloading. <Route> defines which component to show for each URL.",
              senior:
                "Client-side routing intercepts navigation. TanStack Router offers type-safe routes with loaders and search params.",
            },
            action: "Next Chapter!",
          },
        ],
      },

      // ── Mission 28 ─ Chapter 8: Props + State Together ────────────────────────
      {
        id: "mission-28",
        number: 28,
        act: 9,
        title: "Sharing Information",
        subtitle: "Props + State — the full picture",
        concept: "props-state",
        xp: 250,
        badge: { id: "react-master", label: "React Master", emoji: "⚛️" },
        steps: [
          {
            id: "m28-gateway",
            type: "react-gateway",
            chapterNumber: 8,
            chapterTitle: "Sharing Information",
            chapterSubtitle: "Props + State Together",
            messages: [
              "Final chapter.",
              "Everything comes together now.",
              "Build a Theme Selector that updates your ENTIRE website.",
            ],
            mood: "excited",
            action: "Build It",
          },
          {
            id: "m28-demo",
            type: "react-live-demo",
            demoType: "theme-selector",
            teki: "Pick a theme. Watch the entire website update.",
            demoInit: { mode: "theme-selector", showThemeSelector: true },
            options: [
              { label: "Ocean", value: "#0ea5e9", icon: "🌊" },
              { label: "Forest", value: "#10b981", icon: "🌿" },
              { label: "Sunset", value: "#f59e0b", icon: "🌅" },
              { label: "Royal", value: "#8b5cf6", icon: "👑" },
            ],
            codeReveal: `// Parent holds the state
const [theme, setTheme] = useState('ocean');

// Props flow down to every child
<Header theme={theme} />
<Hero   theme={theme} />
<Footer theme={theme} />`,
            language: "jsx",
            successMessage: "Props + State working together!",
            explanation: {
              young:
                "The parent remembers the theme and tells ALL its children what to use!",
              junior:
                "Parent component holds state. That state is passed to children as props — any change flows instantly.",
              senior:
                "Unidirectional data flow: state lives in the nearest common ancestor and propagates downward via props. For deeper sharing, use Context or a state manager.",
            },
            autoAdvance: true,
          },
          {
            id: "m28-concept",
            type: "react-concept",
            conceptType: "props-state-flow",
            teki: "Here's how Parent and Child components share information:",
            action: "I understand it all!",
          },
          {
            id: "act9-complete",
            type: "act-complete",
            actId: "act9",
            title: "ACT 9 Complete!",
            message:
              "You know React! Components, props, state, events, map, conditional rendering, routing, and data flow. You build like a pro.",
            power: { label: "React Master", emoji: "⚛️" },
            xpBonus: 400,
            action: "Connect to the world!",
          },
        ],
      },
    ],
  },

  // ── ACT 10 ── Connecting To The World ────────────────────────────────────────
  {
    id: "act10",
    number: 10,
    title: "Connecting To The World",
    tagline: "APIs — live data from anywhere",
    color: "#14b8a6",
    emoji: "🌎",
    quiz: [
      {
        question: "What does an API do?",
        options: [
          "Styles the page with colors",
          "Lets your app talk to other services and get live data",
          "Renders HTML templates",
          "Manages local variables",
        ],
        correct: 1,
        explanation:
          "API = Application Programming Interface — it's a door that lets two apps exchange data.",
      },
      {
        question: "What does fetch() do in JavaScript?",
        options: [
          "Creates a new React component",
          "Changes text styling",
          "Makes a network request to get data from a URL",
          "Stores data in localStorage",
        ],
        correct: 2,
        explanation:
          "fetch() sends a request to a URL and returns the response — like asking a waiter for your order.",
      },
      {
        question: "What does async/await help with?",
        options: [
          "Making fonts bigger",
          "Waiting for slow operations (like fetching data) without freezing the app",
          "Looping through arrays",
          "Creating CSS animations",
        ],
        correct: 1,
        explanation:
          "async/await lets you write asynchronous code that reads top-to-bottom, just like normal code.",
      },
    ],
    missions: [
      {
        id: "mission-29",
        number: 29,
        act: 10,
        title: "Data Portal",
        subtitle: "APIs bring live data in",
        concept: "apis",
        xp: 250,
        badge: null,
        steps: [
          {
            id: "api-intro",
            type: "teki-message",
            mood: "excited",
            messages: [
              "Your website lives on the internet. The internet is FULL of data!",
              "Weather, news, facts, photos — all available via APIs.",
              "API = a door to someone else's data. fetch() is how JavaScript knocks on that door!",
              "Write the challenge below and a Contact section will appear on your website!",
            ],
            autoAdvance: true,
          },
          {
            id: "fetch-challenge",
            type: "code-challenge",
            teki: "Use fetch() to request data from a URL:",
            language: "javascript",
            code: "const response = await ___('/api/data')\nconst data = await response.json()",
            answer:
              "const response = await fetch('/api/data')\nconst data = await response.json()",
            blanks: [{ position: 0, answer: "fetch" }],
            completionEffect: { buildSection: "contact" },
            explanations: {
              young:
                "fetch() sends a request to a URL — like asking a waiter for your order!",
              junior:
                "fetch(url) returns a Promise that resolves with a Response object. Call .json() to parse the body.",
              senior:
                "fetch() is a browser API returning a Promise<Response>. Always handle errors with .catch() or try/catch.",
            },
            ageExposure: {
              young: "guided",
              junior: "fill-blank",
              senior: "fill-blank",
            },
            successMessage:
              "fetch() mastered — and a Contact section appeared on your website!",
            action: "Fetch the data!",
          },
          {
            id: "contact-appear-observe",
            type: "observation",
            teki: "A Contact section appeared — wireframe style! Your fetch() knowledge built a connection point on your website. Next: async/await will style it!",
            autoAdvance: true,
            autoAdvanceDelay: 3000,
          },
        ],
      },

      {
        id: "mission-30",
        number: 30,
        act: 10,
        title: "Live Content",
        subtitle: "Display real data beautifully",
        concept: "data-display",
        xp: 250,
        badge: { id: "data-connector", label: "Data Connector", emoji: "🌎" },
        steps: [
          {
            id: "live-intro",
            type: "teki-message",
            mood: "proud",
            messages: [
              "Getting data is one thing. DISPLAYING it beautifully is another!",
              "async/await makes fetch() feel like normal code — no confusing callbacks!",
            ],
            autoAdvance: true,
          },
          {
            id: "async-challenge",
            type: "code-challenge",
            teki: "Mark a function as async so it can use await inside it:",
            language: "javascript",
            code: "___ function loadContent() {\n  const res = await fetch('/api/content')\n  return await res.json()\n}",
            answer:
              "async function loadContent() {\n  const res = await fetch('/api/content')\n  return await res.json()\n}",
            blanks: [{ position: 0, answer: "async" }],
            completionEffect: { styleSection: "contact" },
            explanations: {
              young:
                "'async' tells JavaScript: this function will wait for things. Like saying 'I'll be patient'!",
              junior:
                "'async' functions always return a Promise. Inside them, 'await' pauses execution until the Promise resolves.",
              senior:
                "async/await is syntactic sugar over Promises. async functions return Promise<T>. Errors need try/catch.",
            },
            ageExposure: {
              young: "guided",
              junior: "fill-blank",
              senior: "fill-blank",
            },
            successMessage:
              "async mastered — Contact section fully styled! Your website can connect to the world!",
            action: "Make it async!",
          },
          {
            id: "contact-styled-observe",
            type: "observation",
            teki: "Contact section fully styled! Your website now has a beautiful email form — powered by your async/await knowledge. You built a site that can connect to the real world!",
            autoAdvance: true,
            autoAdvanceDelay: 3500,
          },
          {
            id: "act10-complete",
            type: "act-complete",
            actId: "act10",
            title: "ACT 10 Complete!",
            message:
              "You can fetch and display live data! One final act: create your own thing.",
            power: { label: "Data Connector", emoji: "🌎" },
            xpBonus: 300,
            action: "Final challenge!",
          },
        ],
      },
    ],
  },

  // ── ACT 11 ── Creator Challenges ─────────────────────────────────────────────
  {
    id: "act11",
    number: 11,
    title: "Creator Challenges",
    tagline: "Build anything you imagine",
    color: "#a855f7",
    emoji: "🏆",
    quiz: [
      {
        question:
          "Which of these is the best description of a full-stack developer?",
        options: [
          "Someone who only does design",
          "Someone who only writes databases",
          "Someone who builds both the frontend (UI) and backend (server/data)",
          "Someone who manages the office",
        ],
        correct: 2,
        explanation:
          "Full-stack means you can handle the whole product — what users see AND the server logic behind it.",
      },
      {
        question: "What is a good first step when starting any new project?",
        options: [
          "Write as much code as possible without planning",
          "Deploy it immediately",
          "Break the problem into smaller parts and plan your approach",
          "Copy another project completely",
        ],
        correct: 2,
        explanation:
          "Great builders always plan first — breaking big problems into small steps makes them manageable.",
      },
      {
        question: "What does it mean to DEPLOY a website?",
        options: [
          "Delete the code",
          "Publish it so real people on the internet can visit it",
          "Make a backup copy",
          "Run tests on your computer",
        ],
        correct: 1,
        explanation:
          "Deployment puts your code on a server so anyone with a URL can visit your site.",
      },
    ],
    missions: [
      {
        id: "challenge-1",
        number: 31,
        act: 11,
        title: "Pet Website",
        subtitle: "Build a pet-themed website",
        concept: "challenge",
        xp: 300,
        badge: { id: "creator-1", label: "Pet Creator", emoji: "🐾" },
        isChallenge: true,
        steps: [
          {
            id: "challenge-1-intro",
            type: "teki-message",
            mood: "excited",
            messages: [
              "Challenge time! 🎯",
              "Build a complete pet website using everything you've learned.",
              "Use React components, state, and maybe even an API for pet facts!",
            ],
            action: "Accept the challenge!",
          },
        ],
      },
      {
        id: "challenge-2",
        number: 32,
        act: 11,
        title: "School Website",
        subtitle: "Design a school website",
        concept: "challenge",
        xp: 300,
        badge: { id: "creator-2", label: "School Builder", emoji: "🏫" },
        isChallenge: true,
        steps: [
          {
            id: "challenge-2-intro",
            type: "teki-message",
            mood: "excited",
            messages: [
              "Challenge 2! 🎯",
              "Build a school website with a homepage, about page, and class schedule.",
            ],
            action: "Accept the challenge!",
          },
        ],
      },
      {
        id: "challenge-3",
        number: 33,
        act: 11,
        title: "Space Explorer Website",
        subtitle: "Build an out-of-this-world site",
        concept: "challenge",
        xp: 350,
        badge: { id: "creator-3", label: "Space Explorer", emoji: "🚀" },
        isChallenge: true,
        steps: [
          {
            id: "challenge-3-intro",
            type: "teki-message",
            mood: "excited",
            messages: [
              "Challenge 3! 🚀",
              "Build a space exploration website. Fetch real data from a space API!",
            ],
            action: "Blast off!",
          },
        ],
      },
      {
        id: "challenge-4",
        number: 34,
        act: 11,
        title: "Portfolio Website",
        subtitle: "Showcase your work to the world",
        concept: "challenge",
        xp: 400,
        badge: { id: "creator-4", label: "Portfolio Builder", emoji: "💼" },
        isChallenge: true,
        steps: [
          {
            id: "challenge-4-intro",
            type: "teki-message",
            mood: "excited",
            messages: [
              "Challenge 4! 💼",
              "Build YOUR portfolio website. Show the world what you can do!",
            ],
            action: "Build my portfolio!",
          },
        ],
      },
      {
        id: "challenge-5",
        number: 35,
        act: 11,
        title: "Open Creation Challenge",
        subtitle: "Build anything you can imagine",
        concept: "challenge",
        xp: 500,
        badge: { id: "creator-5", label: "Full Creator", emoji: "🏆" },
        isChallenge: true,
        steps: [
          {
            id: "challenge-5-intro",
            type: "teki-message",
            mood: "excited",
            messages: [
              "The FINAL challenge! 🏆",
              "No instructions. No template.",
              "Just you, your skills, and your imagination.",
              "What would you like to build?",
            ],
            action: "I have an idea!",
          },
        ],
      },
    ],
  },
];

// ── Base helpers ───────────────────────────────────────────────────────────────

export const getAllMissions = () => ACTS.flatMap((act) => act.missions);
export const getMissionById = (id) => getAllMissions().find((m) => m.id === id);
export const getMissionByNumber = (n) =>
  getAllMissions().find((m) => m.number === n);
export const getActById = (id) => ACTS.find((a) => a.id === id);
export const getMissionsForAct = (actId) =>
  ACTS.find((a) => a.id === actId)?.missions ?? [];
export const TOTAL_MISSIONS = getAllMissions().length;
export const TOTAL_ACTS = ACTS.length;

// ── Level scoping ──────────────────────────────────────────────────────────────
// Each level is a distinct journey through a subset of acts.
// Code depth within each act is controlled by ageExposure per step.
//
//  Young Builder  (under 11) → Acts 1–3  : visual building + HTML basics
//  Junior Creator (11–14)    → Acts 1–7  : fundamentals through loops & functions
//  Future Developer (15+)    → Acts 1–11 : full curriculum + React + APIs

export const LEVEL_ACT_NUMBERS = {
  young: [1, 2, 3],
  junior: [1, 2, 3, 4, 5, 6, 7],
  // Seniors skip the visual-building acts — website is auto-generated.
  // They jump straight into React, APIs, and Creator Challenges.
  senior: [9, 10, 11],
};

export const LEVEL_INFO = {
  young: {
    label: "Beginner",
    emoji: "🌱",
    color: "#10b981",
    totalActs: 3,
  },
  junior: {
    label: "Intermediate",
    emoji: "🚀",
    color: "#3b82f6",
    totalActs: 7,
  },
  senior: {
    label: "Advanced",
    emoji: "💻",
    color: "#f59e0b",
    totalActs: 3,
  },
};

// All missions a level goes through, in order
export const getMissionsForLevel = (ageGroup) => {
  const actNums = LEVEL_ACT_NUMBERS[ageGroup] ?? LEVEL_ACT_NUMBERS.young;
  return getAllMissions().filter((m) => actNums.includes(m.act));
};

// All acts a level contains
export const getActsForLevel = (ageGroup) => {
  const actNums = LEVEL_ACT_NUMBERS[ageGroup] ?? LEVEL_ACT_NUMBERS.young;
  return ACTS.filter((a) => actNums.includes(a.number));
};

// The final act number for a level (completing this act = level complete)
export const getLastActNumberForLevel = (ageGroup) => {
  const actNums = LEVEL_ACT_NUMBERS[ageGroup] ?? LEVEL_ACT_NUMBERS.young;
  return actNums[actNums.length - 1];
};

export const isLastActForLevel = (actNumber, ageGroup) =>
  actNumber === getLastActNumberForLevel(ageGroup);
