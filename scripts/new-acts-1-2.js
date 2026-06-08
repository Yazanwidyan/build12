  // ── ACT 1 ── Your Website Awakens ─────────────────────────────────────────────
  {
    id: 'act1',
    number: 1,
    title: 'Your Website Awakens',
    tagline: 'Build it section by section',
    color: '#3b82f6',
    emoji: '🏗️',
    quiz: [
      {
        question: 'What is a website made of?',
        options: ['Bricks and mortar', 'Pages you view in a browser with text, images, and links', 'Spreadsheets and databases only', 'Only videos'],
        correct: 1,
        explanation: 'A website is a page (or set of pages) that lives on the internet and contains content like text, images, and interactive elements.',
      },
      {
        question: 'What does the HEADER of a website typically show?',
        options: ['The checkout cart', 'The site name and navigation links', 'The privacy policy', 'Advertisements'],
        correct: 1,
        explanation: 'The header is the top bar — it has your site name and the links that let visitors navigate around.',
      },
      {
        question: 'What is the HERO section?',
        options: ['A character in a game', 'The big, bold welcome area at the top of a page', 'A type of database', 'The footer of a website'],
        correct: 1,
        explanation: 'The hero is the first big section visitors see — it grabs attention with a headline, description, and a call-to-action button.',
      },
    ],
    missions: [

      // ── Mission 1 — Your First Website ──────────────────────────────────────────
      {
        id: 'mission-1',
        number: 1,
        act: 1,
        title: 'Your First Website',
        subtitle: 'Pick a topic and give your site a name',
        concept: 'website-intro',
        xp: 100,
        badge: { id: 'first-website', label: 'First Website', emoji: '🌐' },
        steps: [
          {
            id: 'welcome-intro',
            type: 'teki-message',
            mood: 'excited',
            messages: [
              "Welcome! I'm TEKI — your coding companion! 👋",
              "Together we're going to build a REAL website from scratch.",
              "You don't need to know anything yet. I'll guide every step.",
              "Let's start with the most important question...",
            ],
            action: "I'm ready!",
          },
          {
            id: 'topic-pick',
            type: 'topic-picker',
            teki: "What is your website going to be about? Pick a topic or type your own!",
            options: ['Pets', 'Space', 'Music', 'Sports', 'Gaming', 'Art', 'Food', 'Travel'],
            action: "That's my topic!",
          },
          {
            id: 'canvas-site-name',
            type: 'canvas-input',
            highlight: 'header',
            teki: "Every website needs a name! See that empty bar at the top? Click it and type your website's name!",
            canvasInput: {
              fieldKey: 'header-title',
              section: 'header',
              storeKey: 'title',
              label: 'Website name',
              placeholder: 'My Awesome Website…',
            },
            action: "That's my name!",
          },
        ],
      },

      // ── Mission 2 — Build the Entrance ──────────────────────────────────────────
      {
        id: 'mission-2',
        number: 2,
        act: 1,
        title: 'Build the Entrance',
        subtitle: 'Every website starts with a header',
        concept: 'header',
        xp: 120,
        badge: null,
        steps: [
          {
            id: 'header-explain',
            type: 'teki-message',
            mood: 'thinking',
            messages: [
              "The HEADER is the first thing visitors see.",
              "Think of it like the sign above a shop door — it shows your name and what's inside.",
              "In HTML, we use the <header> tag to tell the browser: this is the top navigation bar.",
              "Now add your navigation links — the paths visitors can take!",
            ],
            action: "Got it!",
          },
          {
            id: 'canvas-header-nav',
            type: 'canvas-input',
            highlight: 'header',
            teki: "Add navigation links! These are the pages people can visit. Type 3–4 page names separated by commas.",
            canvasInput: {
              fieldKey: 'header-nav',
              section: 'header',
              storeKey: 'navLinks',
              label: 'Navigation links',
              placeholder: 'Home, About, Projects, Contact…',
              isArray: true,
            },
            action: "Links added!",
          },
          {
            id: 'header-build-challenge',
            type: 'code-challenge',
            teki: "Now write the HTML tag that tells the browser this is the header. Watch your website!",
            language: 'html',
            code: '<___>{{name}}</___>',
            answer: '<header>{{name}}</header>',
            blanks: [{ position: 0, answer: 'header' }, { position: 1, answer: 'header' }],
            completionEffect: { buildSection: 'header' },
            explanations: {
              young: "The <header> tag creates the top bar of your website! Fill both blanks with 'header'.",
              junior: "<header> is a semantic HTML element — it tells the browser this is the site's top navigation area. Opening and closing tags must match.",
              senior: "<header> is a semantic landmark element. It can appear at page level or inside <article>/<section>. Improves SEO and accessibility.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: 'Your header appeared on the website — wireframe style!',
            action: "Build the header!",
          },
          {
            id: 'header-wireframe-observe',
            type: 'observation',
            teki: "Your header appeared! It's in wireframe style — grey, no color yet. HTML builds the STRUCTURE. Act 2 will paint it with your color!",
            autoAdvance: true,
            autoAdvanceDelay: 3000,
          },
          {
            id: 'header-tag-challenge',
            type: 'code-challenge',
            teki: "Here's the code behind your header title. One tag is broken — fix the closing tag:",
            language: 'html',
            code: `<header>
  <h1>{{name}}</h___>
</header>`,
            answer: `<header>
  <h1>{{name}}</h1>
</header>`,
            blanks: [{ position: 0, answer: '1' }],
            explanations: {
              young: "HTML tags come in pairs — <h1> opens and </h1> closes. The number has to match!",
              junior: "Every opening tag needs a matching closing tag. <h1> is a heading level 1 — the most important heading on the page.",
              senior: "<h1> is a semantic heading. There should be exactly one <h1> per page for SEO. The closing tag must match the opening tag exactly.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Header code fixed! 🔧",
            action: "Check it!",
          },
        ],
      },

      // ── Mission 3 — First Impressions ────────────────────────────────────────────
      {
        id: 'mission-3',
        number: 3,
        act: 1,
        title: 'First Impressions',
        subtitle: 'Build the section that grabs attention',
        concept: 'hero',
        xp: 130,
        badge: null,
        steps: [
          {
            id: 'hero-explain',
            type: 'teki-message',
            mood: 'excited',
            messages: [
              "That big empty space below the header? That's the HERO section.",
              "It's the FIRST thing visitors read — so it has to be bold and clear.",
              "Studies show you have just 5 seconds to grab someone's attention!",
              "Let's fill it with something amazing.",
            ],
            action: "Let's do it!",
          },
          {
            id: 'canvas-hero-headline',
            type: 'canvas-input',
            highlight: 'hero',
            teki: "Type a big, bold headline — what is your website all about in one sentence?",
            canvasInput: {
              fieldKey: 'hero-headline',
              section: 'hero',
              storeKey: 'headline',
              label: 'Big headline',
              placeholder: 'Welcome to my world!',
            },
            action: "Bold and ready!",
          },
          {
            id: 'canvas-hero-subtext',
            type: 'canvas-input',
            highlight: 'hero',
            teki: "Now add one supporting line — tell visitors exactly what they'll find here!",
            canvasInput: {
              fieldKey: 'hero-subtext',
              section: 'hero',
              storeKey: 'subtext',
              label: 'Description',
              placeholder: 'A place for…',
            },
            action: "Perfect!",
          },
          {
            id: 'canvas-hero-button',
            type: 'canvas-input',
            highlight: 'hero',
            teki: "Every great hero needs a CALL TO ACTION — a button that invites visitors to do something. What should yours say?",
            canvasInput: {
              fieldKey: 'hero-button',
              section: 'hero',
              storeKey: 'buttonText',
              label: 'Button text',
              placeholder: 'Explore →',
            },
            action: "Button text set!",
          },
          {
            id: 'hero-build-challenge',
            type: 'code-challenge',
            teki: "Your button was made with ONE HTML tag. Fill in both blanks — and watch your hero section appear!",
            language: 'html',
            code: `<___>{{buttonText}}</___>`,
            answer: `<button>{{buttonText}}</button>`,
            blanks: [{ position: 0, answer: 'button' }, { position: 1, answer: 'button' }],
            completionEffect: { buildSection: 'hero' },
            explanations: {
              young: "The <button> tag makes something you can click. It needs both an opening <button> AND a closing </button>!",
              junior: "<button> creates a clickable element. Right now it looks plain because the hero is in wireframe mode — CSS will style it in Act 2!",
              senior: "Use <button type='button'> for JS-driven actions to avoid accidental form submissions inside forms.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Hero section appeared on your website — wireframe style!",
            action: "Build the hero!",
          },
          {
            id: 'hero-wireframe-observe',
            type: 'observation',
            teki: "Your hero appeared! Grey and plain right now — that's the HTML wireframe. Two sections built! Next: the footer.",
            autoAdvance: true,
            autoAdvanceDelay: 3000,
          },
        ],
      },

      // ── Mission 4 — Seal the Deal ─────────────────────────────────────────────────
      {
        id: 'mission-4',
        number: 4,
        act: 1,
        title: 'Seal the Deal',
        subtitle: 'Finish your website with a footer',
        concept: 'footer',
        xp: 100,
        badge: { id: 'website-built', label: 'Website Built', emoji: '🌐' },
        steps: [
          {
            id: 'footer-explain',
            type: 'teki-message',
            mood: 'happy',
            messages: [
              "Almost done! One more section: the FOOTER.",
              "It's the last thing at the bottom of every website.",
              "Footers show copyright info, legal links, and contact details.",
              "Visitors look here when they want to learn more or get in touch!",
            ],
            action: "Let's finish it!",
          },
          {
            id: 'canvas-footer-copyright',
            type: 'canvas-input',
            highlight: 'footer',
            teki: "Add your copyright line — like: © 2026 Your Name. The © symbol means you own this website!",
            canvasInput: {
              fieldKey: 'footer-copyright',
              section: 'footer',
              storeKey: 'copyright',
              label: 'Copyright',
              placeholder: '© 2026 My Website',
            },
            action: "Signed it!",
          },
          {
            id: 'canvas-footer-links',
            type: 'canvas-input',
            highlight: 'footer',
            teki: "Now add footer links. Visitors expect Privacy, Terms, and Contact at the bottom of every professional site!",
            canvasInput: {
              fieldKey: 'footer-links',
              section: 'footer',
              storeKey: 'links',
              label: 'Footer links',
              placeholder: 'Privacy, Terms, Contact…',
              isArray: true,
            },
            action: "Footer links added!",
          },
          {
            id: 'footer-tag-challenge',
            type: 'code-challenge',
            teki: "Complete the page structure — what tag surrounds the bottom content? This will build your footer!",
            language: 'html',
            code: `<header>...</header>
<main>...</main>
<___>© 2026 {{name}}</___>`,
            answer: `<header>...</header>
<main>...</main>
<footer>© 2026 {{name}}</footer>`,
            blanks: [{ position: 0, answer: 'footer' }, { position: 1, answer: 'footer' }],
            completionEffect: { buildSection: 'footer' },
            explanations: {
              young: "Just like a book has a first page AND a last page, websites have a <header> AND a <footer>!",
              junior: "<footer> is a semantic HTML element for page-bottom content — copyright, links, and contact info.",
              senior: "<footer> is a semantic landmark element. It can appear inside <article> or <section>, not just at the page level.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Footer appeared! Three wireframe sections — your website's skeleton is complete!",
            action: "Check it!",
          },
          {
            id: 'website-complete-observe',
            type: 'observation',
            teki: "Header. Hero. Footer. All three sections built — all in wireframe style! HTML gave your website STRUCTURE. Next act: CSS will paint every section with your color and font!",
            autoAdvance: true,
            autoAdvanceDelay: 3500,
          },
          {
            id: 'act1-complete',
            type: 'act-complete',
            actId: 'act1',
            title: 'ACT 1 Complete!',
            message: "You built a real website with a header, hero, and footer — in wireframe style. You wrote the HTML tags that made each section appear. Now let's make them look stunning with CSS!",
            power: { label: 'Website Builder', emoji: '🏗️' },
            xpBonus: 200,
            action: "Enter the Design Studio!",
          },
        ],
      },
    ],
  },

  // ── ACT 2 ── Design Studio ──────────────────────────────────────────────────────
  {
    id: 'act2',
    number: 2,
    title: 'Design Studio',
    tagline: 'Make it beautiful',
    color: '#ec4899',
    emoji: '🎨',
    quiz: [
      {
        question: 'What is a HEX color code like #3b82f6?',
        options: ['A cheat code for games', 'A secret name for a color used in code', 'A font family name', 'A website address'],
        correct: 1,
        explanation: 'Hex codes are how code names colors. #3b82f6 is a shade of blue — the # is followed by 6 characters that describe the exact color.',
      },
      {
        question: 'What does CSS stand for?',
        options: ['Computer Screen Style', 'Cascading Style Sheets', 'Colorful Site Settings', 'Custom Script System'],
        correct: 1,
        explanation: "CSS = Cascading Style Sheets. It's the language that controls how HTML elements look — colors, fonts, sizes, and layouts.",
      },
      {
        question: 'What does border-radius do in CSS?',
        options: ['Sets the text color', 'Adds a shadow behind an element', 'Rounds the corners of an element', 'Changes the font size'],
        correct: 2,
        explanation: 'border-radius rounds the corners of boxes! 0 = sharp square corners, 999px = a fully rounded pill shape.',
      },
    ],
    missions: [

      // ── Mission 5 — The Color Lab ─────────────────────────────────────────────────
      {
        id: 'mission-5',
        number: 5,
        act: 2,
        title: 'The Color Lab',
        subtitle: 'CSS paints your wireframe sections one by one',
        concept: 'colors',
        xp: 110,
        badge: null,
        steps: [
          {
            id: 'color-explain',
            type: 'teki-message',
            mood: 'thinking',
            messages: [
              "Your website has structure — now it needs STYLE!",
              "CSS is the painter. HTML was the architect. Look at your three wireframe sections — grey and plain.",
              "Every CSS rule you write will paint a section. The header will get your color. Then the hero. Then the footer.",
              "Here's a secret: colors trigger emotions INSTANTLY — before anyone reads a word. Blue = calm. Red = urgent. Green = fresh.",
            ],
            action: "Let me paint it!",
          },
          {
            id: 'color-design',
            type: 'visual-builder',
            section: null,
            isStyleUpdate: true,
            teki: "Choose your website's personality! Pick a primary color and a background color.",
            fields: [
              { id: 'primaryColor', label: 'Primary Color', type: 'color', storeSubKey: 'primaryColor', hint: 'Your brand color — used for buttons, links, and highlights' },
              { id: 'backgroundColor', label: 'Background Color', type: 'color', storeSubKey: 'backgroundColor', hint: 'The page background — light feels clean, dark feels bold' },
            ],
            action: "Colors are set!",
          },
          {
            id: 'color-observe',
            type: 'observation',
            teki: "Colors chosen! Now write the CSS to apply them — and watch your header transform from grey to COLORFUL!",
            autoAdvance: true,
            autoAdvanceDelay: 2500,
          },
          {
            id: 'color-css-challenge',
            type: 'code-challenge',
            teki: "This CSS applies your brand color to the header. Complete the selector — it means 'apply to the WHOLE page':",
            language: 'css',
            code: `___ {
  --primary: {{primaryColor}};
}`,
            answer: `:root {
  --primary: {{primaryColor}};
}`,
            blanks: [{ position: 0, answer: ':root' }],
            completionEffect: { styleSection: 'header' },
            explanations: {
              young: "Type :root — it means 'apply this to the WHOLE page'. Think of it as the master settings panel!",
              junior: ":root targets the topmost HTML element. CSS variables (--name) defined here are available everywhere in your stylesheet.",
              senior: ":root has higher specificity than the html selector. CSS custom properties defined here cascade to all child elements and can be overridden locally.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Header painted with your color! Grey → Beautiful! 🎨",
            action: "Paint the header!",
          },
          {
            id: 'header-styled-observe',
            type: 'observation',
            teki: "Your header transformed! One CSS rule — instant color. Now let's paint the hero section!",
            autoAdvance: true,
            autoAdvanceDelay: 2500,
          },
          {
            id: 'color-bg-challenge',
            type: 'code-challenge',
            teki: "background-color fills the hero section. Complete the property name:",
            language: 'css',
            code: `main {
  background-___: #f8fafc;
  padding: 2rem;
}`,
            answer: `main {
  background-color: #f8fafc;
  padding: 2rem;
}`,
            blanks: [{ position: 0, answer: 'color' }],
            completionEffect: { styleSection: 'hero' },
            explanations: {
              young: "background-color fills the background of a section with color!",
              junior: "background-color sets the background. Use background shorthand for gradients or images.",
              senior: "Prefer background-color for solid colors — it's explicit. background is shorthand for multiple properties.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Hero section styled! Two down, one to go!",
            action: "Style the hero!",
          },
          {
            id: 'hero-styled-observe',
            type: 'observation',
            teki: "Two sections styled! Header and hero are both colorful now. One more — the footer!",
            autoAdvance: true,
            autoAdvanceDelay: 2500,
          },
        ],
      },

      // ── Mission 6 — Fonts & Buttons ───────────────────────────────────────────────
      {
        id: 'mission-6',
        number: 6,
        act: 2,
        title: 'Fonts & Buttons',
        subtitle: 'Typography and shapes complete the design',
        concept: 'typography',
        xp: 130,
        badge: { id: 'designer', label: 'Designer', emoji: '🎨' },
        steps: [
          {
            id: 'font-explain',
            type: 'teki-message',
            mood: 'excited',
            messages: [
              "Design isn't just colors — FONTS have personality too!",
              "A modern sans-serif feels like technology. A classic serif feels like a newspaper.",
              "And BUTTON shapes send signals — pill buttons feel friendly, sharp buttons feel serious.",
              "Let's give your website its final look — and style the footer!",
            ],
            action: "Let's style it!",
          },
          {
            id: 'font-design',
            type: 'visual-builder',
            section: null,
            isStyleUpdate: true,
            teki: "Pick your font style and button shape — this is your website's personality!",
            fields: [
              { id: 'fontFamily', label: 'Font Style', type: 'select', options: ['sans-serif', 'serif', 'monospace'], labels: ['Modern', 'Classic', 'Code'], storeSubKey: 'fontFamily', hint: 'The overall text personality' },
              { id: 'buttonStyle', label: 'Button Shape', type: 'select', options: ['rounded', 'pill', 'square'], labels: ['Rounded', 'Pill', 'Square'], storeSubKey: 'buttonStyle', hint: 'How your buttons look' },
            ],
            action: "Styled!",
          },
          {
            id: 'font-observe',
            type: 'observation',
            teki: "Perfect choices! Now write the CSS to apply your font — and watch the footer get styled at the same time!",
            autoAdvance: true,
            autoAdvanceDelay: 2500,
          },
          {
            id: 'font-css-challenge',
            type: 'code-challenge',
            teki: "Here's the CSS that sets your font across the whole website. Fill in the property name:",
            language: 'css',
            code: `body {
  ___-family: 'Inter', sans-serif;
  font-size: 16px;
}`,
            answer: `body {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
}`,
            blanks: [{ position: 0, answer: 'font' }],
            completionEffect: { styleSection: 'footer' },
            explanations: {
              young: "font-family changes the STYLE of all text! 'Inter' is the name of the font.",
              junior: "font-family sets the typeface for all text inside <body>. Always include a fallback (like sans-serif) in case the named font doesn't load.",
              senior: "Font stacks: primary font → fallback → generic family. Use system-ui or Inter for performant UI. Self-host fonts or use font-display: swap.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Footer styled! All three sections now have your full design applied! 🎨",
            action: "Style the footer!",
          },
          {
            id: 'all-styled-observe',
            type: 'observation',
            teki: "LOOK at your website now! Header, hero, and footer — all with your colors and font. You went from grey wireframe to a designed website with CSS!",
            autoAdvance: true,
            autoAdvanceDelay: 3500,
          },
          {
            id: 'act2-complete',
            type: 'act-complete',
            actId: 'act2',
            title: 'ACT 2 Complete!',
            message: "Every section transformed from wireframe to designed! You wrote CSS that painted your header, hero, and footer. Colors + fonts + buttons all working together. Now let's add MORE sections with HTML!",
            power: { label: 'Designer', emoji: '🎨' },
            xpBonus: 200,
            action: "Build more sections!",
          },
        ],
      },
    ],
  },

