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
              "Now let's add navigation links — the paths visitors can take!",
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
            buildSectionOnComplete: 'header',
            action: "Header is live!",
          },
          {
            id: 'header-observe',
            type: 'observation',
            teki: "Your header is alive!",
            tekiMessages: ["Look at the top of your website — a real header! Every website on the internet has one just like this. 🚪"],
            highlightSection: 'header',
            autoAdvance: true,
          },
          {
            id: 'header-tag-challenge',
            type: 'code-challenge',
            teki: "Here's the code behind your header. One tag is broken — fix the closing tag:",
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
            buildSectionOnComplete: 'hero',
            action: "Hero is ready!",
          },
          {
            id: 'hero-observe',
            type: 'observation',
            teki: "Look at that!",
            tekiMessages: ["Your hero section is live! That's exactly what visitors see on every professional website. 🌟"],
            highlightSection: 'hero',
            autoAdvance: true,
          },
          {
            id: 'button-tag-challenge',
            type: 'code-challenge',
            teki: "Your button was made with ONE HTML tag. Fill in both blanks with the right tag name:",
            language: 'html',
            code: `<___>{{buttonText}}</___>`,
            answer: `<button>{{buttonText}}</button>`,
            blanks: [{ position: 0, answer: 'button' }, { position: 1, answer: 'button' }],
            explanations: {
              young: "The <button> tag makes something you can click. It needs both an opening <button> AND a closing </button>!",
              junior: "<button> creates a clickable element. Right now it looks good but doesn't DO anything — JavaScript will give it superpowers in Act 6!",
              senior: "Use <button type='button'> for JS-driven actions to avoid accidental form submissions in forms.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Button tag nailed! 🎯",
            action: "Check it!",
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
            teki: "Add your copyright line — like: © 2024 Your Name. The © symbol means you own this website!",
            canvasInput: {
              fieldKey: 'footer-copyright',
              section: 'footer',
              storeKey: 'copyright',
              label: 'Copyright',
              placeholder: '© 2024 My Website',
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
            buildSectionOnComplete: 'footer',
            action: "Footer complete!",
          },
          {
            id: 'website-complete-observe',
            type: 'observation',
            teki: "Header. Hero. Footer.",
            tekiMessages: [
              "You built a REAL website! 🏆 Header, hero, and footer — the exact structure that billions of websites use.",
            ],
            autoAdvance: true,
          },
          {
            id: 'footer-tag-challenge',
            type: 'code-challenge',
            teki: "Complete the page structure — what tag surrounds the bottom content?",
            language: 'html',
            code: `<header>...</header>
<main>...</main>
<___>© 2024 {{name}}</___>`,
            answer: `<header>...</header>
<main>...</main>
<footer>© 2024 {{name}}</footer>`,
            blanks: [{ position: 0, answer: 'footer' }, { position: 1, answer: 'footer' }],
            explanations: {
              young: "Just like a book has a first page AND a last page, websites have a <header> AND a <footer>!",
              junior: "<footer> is a semantic HTML element for page-bottom content — copyright, links, and contact info.",
              senior: "<footer> is a semantic landmark element. It can appear inside <article> or <section>, not just at the page level.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Website structure complete! 🌐",
            action: "Check it!",
          },
          {
            id: 'act1-complete',
            type: 'act-complete',
            actId: 'act1',
            title: 'ACT 1 Complete!',
            message: "You built a real website with a header, hero, and footer — the exact structure every website on the internet uses. Now let's make it look stunning!",
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
        explanation: 'CSS = Cascading Style Sheets. It\'s the language that controls how HTML elements look — colors, fonts, sizes, and layouts.',
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
        subtitle: 'Colors speak before visitors read a single word',
        concept: 'colors',
        xp: 110,
        badge: null,
        steps: [
          {
            id: 'color-explain',
            type: 'teki-message',
            mood: 'thinking',
            messages: [
              "Here's a secret most people don't know...",
              "Colors trigger emotions INSTANTLY — before anyone reads a word.",
              "Blue = calm and trustworthy. Red = urgent and exciting. Green = natural and fresh.",
              "Your color choices tell visitors what KIND of website this is!",
            ],
            action: "Let me choose!",
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
            teki: "Same website. Completely different personality!",
            tekiMessages: ["Feel the difference? The same layout looks totally different with new colors. That's the POWER of design! 🎨"],
            autoAdvance: true,
          },
          {
            id: 'color-css-challenge',
            type: 'code-challenge',
            teki: "This CSS applies your brand color across the whole page. Complete the selector:",
            language: 'css',
            code: `___ {
  --primary: {{primaryColor}};
}`,
            answer: `:root {
  --primary: {{primaryColor}};
}`,
            blanks: [{ position: 0, answer: ':root' }],
            explanations: {
              young: "Type :root — it means 'apply this to the WHOLE page'. Think of it as the master settings panel!",
              junior: ":root targets the topmost HTML element. CSS variables (--name) defined here are available everywhere in your stylesheet.",
              senior: ":root has higher specificity than the html selector. CSS custom properties defined here cascade to all child elements and can be overridden locally.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Your color is in the code! 🎨",
            action: "Check it!",
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
              "Let's give your website its final look!",
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
            teki: "Now THAT is a designed website!",
            tekiMessages: ["Colors + fonts + buttons — all working together. Your website has a real identity now! ✨"],
            autoAdvance: true,
          },
          {
            id: 'font-css-challenge',
            type: 'code-challenge',
            teki: "Here's the CSS that sets your font. Fill in the property name:",
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
            explanations: {
              young: "font-family changes the STYLE of all text! 'Inter' is the name of the font.",
              junior: "font-family sets the typeface for all text inside <body>. Always include a fallback (like sans-serif) in case the named font doesn't load.",
              senior: "Font stacks: primary font → fallback → generic family. Use system-ui or Inter for performant UI. Self-host fonts or use font-display: swap.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Font styled! 📝",
            action: "Check it!",
          },
          {
            id: 'act2-complete',
            type: 'act-complete',
            actId: 'act2',
            title: 'ACT 2 Complete!',
            message: "Your website now has a real personality — colors, fonts, and buttons all working together. Time to peek under the hood and learn the language that powers it all!",
            power: { label: 'Designer', emoji: '🎨' },
            xpBonus: 200,
            action: "Show me the language!",
          },
        ],
      },
    ],
  },

  // ── ACT 3 ── The Language of the Web ─────────────────────────────────────────────
  {
    id: 'act3',
    number: 3,
    title: 'The Language of the Web',
    tagline: 'HTML — how every website is written',
    color: '#f59e0b',
    emoji: '📝',
    quiz: [
      {
        question: 'What does HTML stand for?',
        options: ['High Tech Markup Layout', 'HyperText Markup Language', 'Home Template Making Language', 'How To Make Links'],
        correct: 1,
        explanation: 'HTML = HyperText Markup Language. It\'s the standard language for creating web pages. Every single website uses it.',
      },
      {
        question: 'What is an HTML TAG?',
        options: ['A type of password', 'A color value', 'A label wrapped in < > that gives content meaning', 'A file extension'],
        correct: 2,
        explanation: 'Tags like <h1> or <p> wrap content and tell the browser WHAT that content is — a heading, a paragraph, a button, etc.',
      },
      {
        question: 'What goes inside the <body> tag?',
        options: ['CSS styles and colors only', 'All the visible content of the page', 'The page title only', 'JavaScript code only'],
        correct: 1,
        explanation: 'The <body> contains everything visitors can SEE on the page — headings, text, images, buttons, and sections.',
      },
    ],
    missions: [

      // ── Mission 7 — Meet HTML ─────────────────────────────────────────────────────
      {
        id: 'mission-7',
        number: 7,
        act: 3,
        title: 'Meet HTML',
        subtitle: 'The language every webpage is written in',
        concept: 'html-intro',
        xp: 120,
        badge: null,
        steps: [
          {
            id: 'html-intro-msg',
            type: 'teki-message',
            mood: 'excited',
            messages: [
              "You built a website without writing a single line of code!",
              "But here's the truth — everything you built has CODE behind it.",
              "That code is called HTML — HyperText Markup Language.",
              "It's the language every single website is written in. And it's simple!",
            ],
            action: "Teach me HTML!",
          },
          {
            id: 'html-tags-msg',
            type: 'teki-message',
            mood: 'thinking',
            messages: [
              "HTML works with TAGS — little labels wrapped in angle brackets < >.",
              "A tag has two parts: an OPENING tag and a CLOSING tag.",
              "<h1> opens a heading. </h1> closes it. The slash / means closing.",
              "Everything between the tags is the content!",
            ],
            action: "Got it!",
          },
          {
            id: 'h1-challenge',
            type: 'code-challenge',
            teki: "Write the heading tag that wraps your website name:",
            language: 'html',
            code: `<___>{{name}}</___>`,
            answer: `<h1>{{name}}</h1>`,
            blanks: [{ position: 0, answer: 'h1' }, { position: 1, answer: 'h1' }],
            explanations: {
              young: "<h1> is the biggest, most important heading! Think of it as the TITLE of your website.",
              junior: "<h1> is heading level 1 — the most important heading on the page. Browsers display it large and bold by default.",
              senior: "<h1> is a semantic heading. Use exactly one per page for SEO. Heading levels (h1–h6) create a document outline.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Your first HTML tag! 🎉",
            action: "Check it!",
          },
        ],
      },

      // ── Mission 8 — The Blueprint ─────────────────────────────────────────────────
      {
        id: 'mission-8',
        number: 8,
        act: 3,
        title: 'The Blueprint',
        subtitle: 'Every HTML page has the same skeleton',
        concept: 'html-structure',
        xp: 130,
        badge: null,
        steps: [
          {
            id: 'structure-msg',
            type: 'teki-message',
            mood: 'thinking',
            messages: [
              "Here's something interesting — every HTML page on the ENTIRE internet has the same basic skeleton.",
              "It starts with <html>, has a <head> for settings (invisible), and a <body> for content (visible).",
              "Think of it like a book: the title page (<head>) vs the actual chapters (<body>).",
            ],
            action: "Makes sense!",
          },
          {
            id: 'html-structure-challenge',
            type: 'code-challenge',
            teki: "Complete the HTML skeleton — where does all the visible content go?",
            language: 'html',
            code: `<html>
  <head>
    <title>{{name}}</title>
  </head>
  <___>
    <h1>Welcome!</h1>
  </___>
</html>`,
            answer: `<html>
  <head>
    <title>{{name}}</title>
  </head>
  <body>
    <h1>Welcome!</h1>
  </body>
</html>`,
            blanks: [{ position: 0, answer: 'body' }, { position: 1, answer: 'body' }],
            explanations: {
              young: "The <body> is like the STAGE — all the content visitors can see goes inside it!",
              junior: "<body> contains everything rendered on screen. <head> contains metadata like <title> and CSS links — invisible to visitors.",
              senior: "The document structure: <!DOCTYPE html> → <html lang> → <head> with meta charset/viewport → <body>. The <head> content is parsed but not rendered.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "HTML structure complete! 🏗️",
            action: "Check it!",
          },
          {
            id: 'paragraph-msg',
            type: 'teki-message',
            mood: 'happy',
            messages: [
              "You know the skeleton. Now let's add more tags!",
              "<p> creates a paragraph — regular text that visitors read.",
              "Every sentence block on a webpage is wrapped in <p>...</p>.",
            ],
            action: "Got it!",
          },
          {
            id: 'paragraph-challenge',
            type: 'code-challenge',
            teki: "Add a paragraph below the heading:",
            language: 'html',
            code: `<h1>{{headline}}</h1>
<___>{{subtext}}</___>`,
            answer: `<h1>{{headline}}</h1>
<p>{{subtext}}</p>`,
            blanks: [{ position: 0, answer: 'p' }, { position: 1, answer: 'p' }],
            explanations: {
              young: "<p> makes a paragraph — it's for regular text, like the description below a big heading!",
              junior: "<p> is a block-level element. Each <p> starts on a new line with top/bottom margin by default.",
              senior: "<p> is a block container for flow content. Nesting block elements inside a <p> is invalid HTML.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Paragraph tag added! 📄",
            action: "Check it!",
          },
        ],
      },

      // ── Mission 9 — Link It Up ────────────────────────────────────────────────────
      {
        id: 'mission-9',
        number: 9,
        act: 3,
        title: 'Link It Up',
        subtitle: 'Links connect the entire web together',
        concept: 'links',
        xp: 140,
        badge: { id: 'html-coder', label: 'HTML Coder', emoji: '📝' },
        steps: [
          {
            id: 'link-explain',
            type: 'teki-message',
            mood: 'excited',
            messages: [
              "Here's a BIG concept — the web is called the 'web' because pages are LINKED together!",
              "Every link you've ever clicked is made with one tag: <a>.",
              "The <a> tag needs an href attribute that says WHERE to go.",
              "href = Hypertext REFerence — the web address of the destination.",
            ],
            action: "Show me!",
          },
          {
            id: 'link-challenge',
            type: 'code-challenge',
            teki: "Create a link to another page. Fill in the attribute that sets the destination:",
            language: 'html',
            code: `<a ___="https://example.com">Visit Example</a>`,
            answer: `<a href="https://example.com">Visit Example</a>`,
            blanks: [{ position: 0, answer: 'href' }],
            explanations: {
              young: "href is the address of the page you want to go to — like the destination on a road sign!",
              junior: "href sets the hyperlink reference. Without it, <a> renders as text but goes nowhere. Always include descriptive link text for accessibility.",
              senior: "Use href='#id' for same-page links, href='/' for root. Add target='_blank' rel='noopener noreferrer' for external links in new tabs.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Link created! 🔗",
            action: "Check it!",
          },
          {
            id: 'html-review-msg',
            type: 'teki-message',
            mood: 'proud',
            messages: [
              "You now speak HTML! Let's recap what you know:",
              "<h1> = big heading, <p> = paragraph, <a href> = link, <button> = clickable button.",
              "<header>, <main>, <footer> = the three sections of every website.",
              "These 7 tags power MOST of what you see on websites every day!",
            ],
            action: "I know HTML!",
          },
          {
            id: 'act3-complete',
            type: 'act-complete',
            actId: 'act3',
            title: 'ACT 3 Complete!',
            message: "You speak HTML! Tags, structure, headings, paragraphs, links — you understand the language every website is written in. Next: making it smart with JavaScript!",
            power: { label: 'HTML Coder', emoji: '📝' },
            xpBonus: 200,
            action: "Make it smart!",
          },
        ],
      },
    ],
  },

  // ── ACT 4 ── Memory Machine ───────────────────────────────────────────────────────
  {
    id: 'act4',
    number: 4,
    title: 'Memory Machine',
    tagline: 'JavaScript — teach your website to remember',
    color: '#8b5cf6',
    emoji: '🧠',
    quiz: [
      {
        question: 'What is a VARIABLE in programming?',
        options: ['A type of HTML tag', 'A named container that stores a value', 'A CSS color setting', 'An error in the code'],
        correct: 1,
        explanation: 'A variable is like a labeled box — you give it a name and put a value inside. You can read and change that value later.',
      },
      {
        question: 'What is the difference between let and const?',
        options: ['const can change, let cannot', 'let can change, const cannot be reassigned', 'They are exactly the same', 'const is for HTML, let is for CSS'],
        correct: 1,
        explanation: 'let declares a variable that CAN be changed. const declares one that CANNOT be reassigned after its first value.',
      },
      {
        question: 'What does document.querySelector() do?',
        options: ['Writes new HTML to the page', 'Deletes an element', 'Finds an HTML element by its CSS selector', 'Creates a new variable'],
        correct: 2,
        explanation: 'querySelector finds an existing HTML element (like a <h1> or a div with a specific id) so JavaScript can change it.',
      },
    ],
    missions: [

      // ── Mission 10 — Store Information ─────────────────────────────────────────────
      {
        id: 'mission-10',
        number: 10,
        act: 4,
        title: 'Store Information',
        subtitle: "Variables are JavaScript's memory",
        concept: 'variables',
        xp: 140,
        badge: null,
        steps: [
          {
            id: 'js-intro-msg',
            type: 'teki-message',
            mood: 'excited',
            messages: [
              "Your website looks great. But it doesn't DO anything yet.",
              "That's about to change. Meet JAVASCRIPT — the brain of your website.",
              "If HTML is the skeleton and CSS is the skin, JavaScript is the BRAIN.",
              "It makes websites remember, react, calculate, and interact!",
            ],
            action: "Teach me JavaScript!",
          },
          {
            id: 'variables-msg',
            type: 'teki-message',
            mood: 'thinking',
            messages: [
              "The most fundamental thing in all of programming: VARIABLES.",
              "A variable is like a labeled box — put a value in, give it a name, use it later.",
              "In JavaScript we use 'let' to create a variable that can change.",
              "We use 'const' for a value that stays the same forever.",
            ],
            action: "Got it!",
          },
          {
            id: 'let-challenge',
            type: 'code-challenge',
            teki: "Create a variable called 'greeting' and store a welcome message in it:",
            language: 'javascript',
            code: `___ greeting = "Welcome to {{name}}!";
console.log(greeting);`,
            answer: `let greeting = "Welcome to {{name}}!";
console.log(greeting);`,
            blanks: [{ position: 0, answer: 'let' }],
            explanations: {
              young: "Use 'let' to create a box and put something in it! The = sign means 'store this value'.",
              junior: "'let' declares a variable that can be reassigned. The = is assignment, not 'equals'. console.log() prints the value to the browser console.",
              senior: "'let' is block-scoped. Prefer const by default — use let only when you need to reassign. Avoid var (function-scoped, legacy).",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Variable created! 📦",
            action: "Check it!",
          },
          {
            id: 'const-challenge',
            type: 'code-challenge',
            teki: "Use 'const' for your site name — it never changes:",
            language: 'javascript',
            code: `___ siteName = "{{name}}";
let visitors = 0;
visitors = visitors + 1;`,
            answer: `const siteName = "{{name}}";
let visitors = 0;
visitors = visitors + 1;`,
            blanks: [{ position: 0, answer: 'const' }],
            explanations: {
              young: "'const' means CONSTANT — this box is locked! The value can never be changed.",
              junior: "'const' prevents reassignment. Use it for values that should never change — site name, config values, fixed data.",
              senior: "const prevents reassignment but not mutation. const obj = {} still lets you do obj.key = 'val'. Use Object.freeze() for deep immutability.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "const vs let — nailed it! 🔒",
            action: "Check it!",
          },
        ],
      },

      // ── Mission 11 — Find & Change ────────────────────────────────────────────────
      {
        id: 'mission-11',
        number: 11,
        act: 4,
        title: 'Find & Change',
        subtitle: 'JavaScript can reach into HTML and change anything',
        concept: 'dom',
        xp: 160,
        badge: { id: 'js-starter', label: 'JS Starter', emoji: '🧠' },
        steps: [
          {
            id: 'dom-msg',
            type: 'teki-message',
            mood: 'excited',
            messages: [
              "Here's where JavaScript gets POWERFUL.",
              "JavaScript can find ANY element on your page and change it!",
              "It uses something called the DOM — Document Object Model.",
              "Think of the DOM as a family tree of your HTML. JS can grab any branch and modify it.",
            ],
            action: "How?",
          },
          {
            id: 'queryselector-msg',
            type: 'teki-message',
            mood: 'thinking',
            messages: [
              "The tool: document.querySelector()",
              "Inside the () you put a CSS selector — like '#hero-title' for an element with id='hero-title'.",
              "Once you have the element, you can change its text with .textContent",
              "Example: element.textContent = 'New text here'",
            ],
            action: "Let me try it!",
          },
          {
            id: 'queryselector-challenge',
            type: 'code-challenge',
            teki: "Find the headline element by its id and update its text:",
            language: 'javascript',
            code: `let title = document.___('#hero-title');
title.textContent = "{{headline}}";`,
            answer: `let title = document.querySelector('#hero-title');
title.textContent = "{{headline}}";`,
            blanks: [{ position: 0, answer: 'querySelector' }],
            explanations: {
              young: "querySelector finds the element you want — like using a search box to find one specific thing on the page!",
              junior: "querySelector('#id') finds the element with that id. The # means 'by id'. You can also use '.' for class names.",
              senior: "querySelector returns the first matching element or null. Use querySelectorAll for multiple elements. Cache results to avoid repeated DOM queries.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Element found and updated! ✨",
            action: "Check it!",
          },
          {
            id: 'textcontent-challenge',
            type: 'code-challenge',
            teki: "Now update the paragraph text — fill in the property that changes text content:",
            language: 'javascript',
            code: `let desc = document.querySelector('#hero-desc');
desc.___ = "{{subtext}}";`,
            answer: `let desc = document.querySelector('#hero-desc');
desc.textContent = "{{subtext}}";`,
            blanks: [{ position: 0, answer: 'textContent' }],
            explanations: {
              young: "textContent is the text inside the element. Setting it changes what visitors see — like editing a sticky note!",
              junior: "textContent sets the text inside an element, replacing all existing content. It's safe — no HTML injection possible.",
              senior: "Prefer textContent over innerHTML for plain text — it's safer (prevents XSS) and faster. Use innerHTML only when inserting real HTML structure.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Text updated with JavaScript! 🔄",
            action: "Check it!",
          },
          {
            id: 'act4-complete',
            type: 'act-complete',
            actId: 'act4',
            title: 'ACT 4 Complete!',
            message: "JavaScript is now in your toolkit! Variables store data, querySelector finds elements, and textContent changes what visitors see. Now let's teach your website to THINK!",
            power: { label: 'JS Starter', emoji: '🧠' },
            xpBonus: 200,
            action: "Make it think!",
          },
        ],
      },
    ],
  },

  // ── ACT 5 ── Website Thinks ────────────────────────────────────────────────────────
  {
    id: 'act5',
    number: 5,
    title: 'Website Thinks',
    tagline: 'Make decisions with if/else',
    color: '#06b6d4',
    emoji: '💭',
    quiz: [
      {
        question: 'What does an IF statement do?',
        options: ['Repeats code a set number of times', 'Runs code only when a condition is true', 'Stores a value in a variable', 'Creates an HTML element'],
        correct: 1,
        explanation: 'An if statement checks a condition — if it\'s true, it runs the code inside. If it\'s false, it skips it.',
      },
      {
        question: 'What does === mean in JavaScript?',
        options: ['Assigns a value to a variable', 'Strict equality — checks if two values are exactly equal', 'Greater than or equal to', 'Not equal to'],
        correct: 1,
        explanation: '=== is strict equality. It checks that two values are the same type AND same value. Use it instead of == which does loose comparison.',
      },
      {
        question: 'What does ELSE do in an if/else statement?',
        options: ['Runs when the if condition is TRUE', 'Always runs no matter what', 'Runs when the if condition is FALSE', 'Stops the program'],
        correct: 2,
        explanation: 'else is the fallback — it only runs when the if condition is false. Together if/else covers ALL possible outcomes.',
      },
    ],
    missions: [

      // ── Mission 12 — Making Decisions ──────────────────────────────────────────────
      {
        id: 'mission-12',
        number: 12,
        act: 5,
        title: 'Making Decisions',
        subtitle: 'If this, do that — the core of all logic',
        concept: 'if-else',
        xp: 150,
        badge: null,
        steps: [
          {
            id: 'if-intro-msg',
            type: 'teki-message',
            mood: 'thinking',
            messages: [
              "Websites that show the SAME thing to everyone are boring.",
              "A smart website adapts — it shows different content based on who is visiting, what time it is, what the user clicked!",
              "The tool for this is the IF statement — one of the most important things in all of programming.",
            ],
            action: "Teach me if!",
          },
          {
            id: 'if-syntax-msg',
            type: 'teki-message',
            mood: 'thinking',
            messages: [
              "if (condition) { do this }",
              "The condition is a question that's either TRUE or FALSE.",
              "If true → run the code in { }. If false → skip it.",
              "Example: if (age >= 18) { showAdultContent() }",
            ],
            action: "I see it!",
          },
          {
            id: 'if-challenge',
            type: 'code-challenge',
            teki: "Complete the if statement that checks if a visitor is new:",
            language: 'javascript',
            code: `let isNewVisitor = true;

__ (isNewVisitor) {
  document.querySelector('#greeting').textContent = "Welcome! First time here?";
}`,
            answer: `let isNewVisitor = true;

if (isNewVisitor) {
  document.querySelector('#greeting').textContent = "Welcome! First time here?";
}`,
            blanks: [{ position: 0, answer: 'if' }],
            explanations: {
              young: "'if' means: CHECK if this is true, THEN do it. Like asking a question before doing something!",
              junior: "if (condition) { code } — if the condition evaluates to true (or truthy), the code block runs. true/false values are called booleans.",
              senior: "JavaScript uses truthy/falsy. Be explicit in conditions — if (count > 0) not if (count). Use strict equality (===) to avoid coercion surprises.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Your website can make decisions! 🧠",
            action: "Check it!",
          },
          {
            id: 'else-challenge',
            type: 'code-challenge',
            teki: "Add an ELSE to handle returning visitors:",
            language: 'javascript',
            code: `let isNewVisitor = false;

if (isNewVisitor) {
  document.querySelector('#greeting').textContent = "Welcome! First time here?";
} ___ {
  document.querySelector('#greeting').textContent = "Welcome back! 👋";
}`,
            answer: `let isNewVisitor = false;

if (isNewVisitor) {
  document.querySelector('#greeting').textContent = "Welcome! First time here?";
} else {
  document.querySelector('#greeting').textContent = "Welcome back! 👋";
}`,
            blanks: [{ position: 0, answer: 'else' }],
            explanations: {
              young: "'else' is the backup plan! If the first thing isn't true, run THIS instead.",
              junior: "else runs when the if condition is false. Every possible outcome is covered: new visitor OR returning visitor.",
              senior: "if/else covers two branches. For simple ternary: const msg = isNew ? 'Welcome!' : 'Welcome back!' For more branches, use else if or switch.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Both cases handled! ✅",
            action: "Check it!",
          },
        ],
      },

      // ── Mission 13 — More Choices ─────────────────────────────────────────────────
      {
        id: 'mission-13',
        number: 13,
        act: 5,
        title: 'More Choices',
        subtitle: 'else if handles multiple conditions',
        concept: 'else-if',
        xp: 160,
        badge: { id: 'logic-thinker', label: 'Logic Thinker', emoji: '💭' },
        steps: [
          {
            id: 'elseif-msg',
            type: 'teki-message',
            mood: 'thinking',
            messages: [
              "if/else is great for TWO choices. But what about three? Four?",
              "That's where ELSE IF comes in.",
              "You can chain multiple conditions: if → else if → else if → else.",
              "Only ONE block runs — the first condition that's true wins!",
            ],
            action: "Show me!",
          },
          {
            id: 'comparison-msg',
            type: 'teki-message',
            mood: 'thinking',
            messages: [
              "Quick tip — the comparison operators you'll use in conditions:",
              "=== means 'exactly equal to'",
              "> means 'greater than',  < means 'less than'",
              ">= means 'greater than OR equal to'",
            ],
            action: "Got them all!",
          },
          {
            id: 'elseif-challenge',
            type: 'code-challenge',
            teki: "Create a time-aware greeting! Fill in the missing keyword:",
            language: 'javascript',
            code: `let hour = new Date().getHours();
let greeting;

if (hour < 12) {
  greeting = "Good morning! ☀️";
} ___ if (hour < 18) {
  greeting = "Good afternoon! 🌤️";
} else {
  greeting = "Good evening! 🌙";
}

document.querySelector('#greeting').textContent = greeting;`,
            answer: `let hour = new Date().getHours();
let greeting;

if (hour < 12) {
  greeting = "Good morning! ☀️";
} else if (hour < 18) {
  greeting = "Good afternoon! 🌤️";
} else {
  greeting = "Good evening! 🌙";
}

document.querySelector('#greeting').textContent = greeting;`,
            blanks: [{ position: 0, answer: 'else' }],
            explanations: {
              young: "'else if' adds another question! Is it morning? Afternoon? If neither, it must be evening!",
              junior: "else if chains additional conditions. Only the first true condition runs. new Date().getHours() returns the current hour (0–23).",
              senior: "new Date().getHours() returns 0–23. For timezone-aware code use Intl.DateTimeFormat. This pattern is better as a switch for many cases.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Time-aware website! ⏰",
            action: "Check it!",
          },
          {
            id: 'act5-complete',
            type: 'act-complete',
            actId: 'act5',
            title: 'ACT 5 Complete!',
            message: "Your website now THINKS! It can check conditions, make decisions, and show different content based on real data. Next: making it respond to users in real time!",
            power: { label: 'Logic Thinker', emoji: '💭' },
            xpBonus: 200,
            action: "Make it interactive!",
          },
        ],
      },
    ],
  },

  // ── ACT 6 ── Alive & Interactive ──────────────────────────────────────────────────
  {
    id: 'act6',
    number: 6,
    title: 'Alive & Interactive',
    tagline: 'Respond to users with events',
    color: '#10b981',
    emoji: '⚡',
    quiz: [
      {
        question: 'What is an EVENT in JavaScript?',
        options: ['A type of variable', 'Something that happens — like a click, keypress, or scroll', 'An HTML tag', 'A CSS property'],
        correct: 1,
        explanation: 'Events are things that happen in the browser — a user clicks, types, scrolls, or hovers. JavaScript listens for these and runs code in response.',
      },
      {
        question: 'What does addEventListener() do?',
        options: ['Removes a button from the page', 'Waits for a specific event and runs a function when it fires', 'Creates a new HTML element', 'Changes a CSS style'],
        correct: 1,
        explanation: 'addEventListener attaches a listener to an element. When the event fires, the function you provided runs automatically.',
      },
      {
        question: 'How do you read what a user typed in an <input> field?',
        options: ['input.innerHTML', 'input.textContent', 'input.value', 'input.text'],
        correct: 2,
        explanation: '.value is the property that holds whatever the user typed into an input field. textContent doesn\'t work for input values.',
      },
    ],
    missions: [

      // ── Mission 14 — Click Magic ──────────────────────────────────────────────────
      {
        id: 'mission-14',
        number: 14,
        act: 6,
        title: 'Click Magic',
        subtitle: 'Make your website respond to clicks',
        concept: 'events',
        xp: 160,
        badge: null,
        steps: [
          {
            id: 'events-intro-msg',
            type: 'teki-message',
            mood: 'excited',
            messages: [
              "Here's where it gets REALLY exciting.",
              "So far your website just sits there. It doesn't respond to anything.",
              "But websites are interactive — they react when you click, type, scroll!",
              "The mechanism behind this: EVENTS.",
            ],
            action: "Teach me events!",
          },
          {
            id: 'addeventlistener-msg',
            type: 'teki-message',
            mood: 'thinking',
            messages: [
              "addEventListener is your tool for listening to events.",
              "You give it TWO things: the event name (like 'click') and a function to run.",
              "Syntax: element.addEventListener('click', function() { ... })",
              "When the user clicks that element, your function runs instantly!",
            ],
            action: "Let me try it!",
          },
          {
            id: 'addeventlistener-challenge',
            type: 'code-challenge',
            teki: "Make the hero button show an alert when clicked! Fill in the event listener method:",
            language: 'javascript',
            code: `let heroBtn = document.querySelector('#hero-btn');

heroBtn.___('click', function() {
  alert("Thanks for clicking!");
});`,
            answer: `let heroBtn = document.querySelector('#hero-btn');

heroBtn.addEventListener('click', function() {
  alert("Thanks for clicking!");
});`,
            blanks: [{ position: 0, answer: 'addEventListener' }],
            explanations: {
              young: "addEventListener is like a guard that waits and listens — when the click happens, it runs your code!",
              junior: "addEventListener(event, handler) attaches a function to an element. 'click' is the event type. The handler function runs every time the event fires.",
              senior: "Prefer named functions over anonymous for addEventListener so you can call removeEventListener later. Consider event delegation for dynamic elements.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Button is alive! ⚡",
            action: "Check it!",
          },
        ],
      },

      // ── Mission 15 — Read the User ────────────────────────────────────────────────
      {
        id: 'mission-15',
        number: 15,
        act: 6,
        title: 'Read the User',
        subtitle: 'Get what the user types from an input',
        concept: 'input-value',
        xp: 160,
        badge: null,
        steps: [
          {
            id: 'input-value-msg',
            type: 'teki-message',
            mood: 'thinking',
            messages: [
              "Websites don't just wait for clicks — they also read what you TYPE.",
              "An <input> field lets users enter text.",
              "JavaScript can grab what's in the input at any moment using the .value property.",
              "input.value gives you the text the user typed as a string.",
            ],
            action: "Got it!",
          },
          {
            id: 'input-value-challenge',
            type: 'code-challenge',
            teki: "When the button is clicked, read the input and greet the user by name:",
            language: 'javascript',
            code: `let nameInput = document.querySelector('#name-input');
let greetEl   = document.querySelector('#greeting');

document.querySelector('#submit-btn').addEventListener('click', function() {
  let name = nameInput.___;
  greetEl.textContent = "Hello, " + name + "!";
});`,
            answer: `let nameInput = document.querySelector('#name-input');
let greetEl   = document.querySelector('#greeting');

document.querySelector('#submit-btn').addEventListener('click', function() {
  let name = nameInput.value;
  greetEl.textContent = "Hello, " + name + "!";
});`,
            blanks: [{ position: 0, answer: 'value' }],
            explanations: {
              young: ".value reads what the user typed — like peeking inside the input box!",
              junior: ".value is a property on <input> elements that holds the current text. It updates live as the user types.",
              senior: ".value returns a string. For number inputs use parseFloat(input.value) or input.valueAsNumber. Always validate input before using it.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Reading user input! 📩",
            action: "Check it!",
          },
        ],
      },

      // ── Mission 16 — Like Counter ─────────────────────────────────────────────────
      {
        id: 'mission-16',
        number: 16,
        act: 6,
        title: 'Like Counter',
        subtitle: 'Combine variables + events to build a real feature',
        concept: 'counter',
        xp: 200,
        badge: { id: 'interactive-builder', label: 'Interactive Builder', emoji: '⚡' },
        steps: [
          {
            id: 'counter-intro-msg',
            type: 'teki-message',
            mood: 'excited',
            messages: [
              "You know variables. You know events.",
              "Let's combine them to build something REAL — a like counter!",
              "Every time the user clicks the like button, a number goes up.",
              "This is how Instagram, YouTube, and Twitter all work at their core!",
            ],
            action: "Build it!",
          },
          {
            id: 'increment-msg',
            type: 'teki-message',
            mood: 'thinking',
            messages: [
              "The ++ operator adds 1 to a variable.",
              "count++ is exactly the same as count = count + 1.",
              "Combined with textContent, you can show the updated number instantly!",
            ],
            action: "Got it!",
          },
          {
            id: 'counter-challenge',
            type: 'code-challenge',
            teki: "Complete the like counter — add ++ to increment count each time the button is clicked:",
            language: 'javascript',
            code: `let count = 0;
let likeBtn   = document.querySelector('#like-btn');
let likeCount = document.querySelector('#like-count');

likeBtn.addEventListener('click', function() {
  count___;
  likeCount.textContent = count + " likes";
});`,
            answer: `let count = 0;
let likeBtn   = document.querySelector('#like-btn');
let likeCount = document.querySelector('#like-count');

likeBtn.addEventListener('click', function() {
  count++;
  likeCount.textContent = count + " likes";
});`,
            blanks: [{ position: 0, answer: '++' }],
            explanations: {
              young: "count++ adds 1 to count every time the button is clicked. Then we show the new count on the page!",
              junior: "++ is the increment operator. count++ adds 1 to count each time the function runs — every click = +1 like.",
              senior: "++ modifies count in place via closure. State lives in memory and resets on page reload — for persistence use localStorage.setItem().",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Like counter works! ❤️",
            action: "Check it!",
          },
          {
            id: 'act6-complete',
            type: 'act-complete',
            actId: 'act6',
            title: 'ACT 6 Complete!',
            message: "Your website is ALIVE! Events, input values, counters — you can now make websites that respond, react, and remember user actions. One act left: the full toolkit!",
            power: { label: 'Interactive Builder', emoji: '⚡' },
            xpBonus: 200,
            action: "Get the full toolkit!",
          },
        ],
      },
    ],
  },

  // ── ACT 7 ── The Full Toolkit ──────────────────────────────────────────────────────
  {
    id: 'act7',
    number: 7,
    title: 'The Full Toolkit',
    tagline: 'Arrays, loops, and functions — the power trio',
    color: '#f97316',
    emoji: '🛠️',
    quiz: [
      {
        question: 'What is an ARRAY in JavaScript?',
        options: ['A single variable with one value', 'A list of multiple values stored in one variable', 'A CSS styling rule', 'A type of HTML tag'],
        correct: 1,
        explanation: 'An array is a list! Instead of creating 100 separate variables, you put them all in one array: ["item1", "item2", "item3"].',
      },
      {
        question: 'What does forEach() do?',
        options: ['Creates a new array', 'Removes the last item from an array', 'Runs a function once for each item in an array', 'Sorts an array alphabetically'],
        correct: 2,
        explanation: 'forEach loops through every item in an array and runs your function on each one. Add one item to the array — forEach handles it automatically.',
      },
      {
        question: 'What is a FUNCTION in JavaScript?',
        options: ['A CSS color value', 'A reusable named block of code', 'An HTML attribute', 'A type of variable'],
        correct: 1,
        explanation: 'A function is a reusable named block of code. Define it once, call it as many times as you need — from anywhere!',
      },
    ],
    missions: [

      // ── Mission 17 — Lists of Things ──────────────────────────────────────────────
      {
        id: 'mission-17',
        number: 17,
        act: 7,
        title: 'Lists of Things',
        subtitle: 'Arrays store multiple values. forEach loops through them.',
        concept: 'arrays',
        xp: 180,
        badge: null,
        steps: [
          {
            id: 'arrays-intro-msg',
            type: 'teki-message',
            mood: 'excited',
            messages: [
              "What if you needed to store 50 products? 100 names? 1000 posts?",
              "Creating 100 separate variables would be madness!",
              "That's why ARRAYS exist — one variable that holds a whole list.",
              "Arrays are surrounded by square brackets: [ item1, item2, item3 ]",
            ],
            action: "Show me arrays!",
          },
          {
            id: 'array-challenge',
            type: 'code-challenge',
            teki: "Create an array of 3 topics your website covers:",
            language: 'javascript',
            code: `const topics = ___"Travel", "Music", "Food"___;

console.log(topics[0]); // "Travel"
console.log(topics.length); // 3`,
            answer: `const topics = ["Travel", "Music", "Food"];

console.log(topics[0]); // "Travel"
console.log(topics.length); // 3`,
            blanks: [{ position: 0, answer: '[' }, { position: 1, answer: ']' }],
            explanations: {
              young: "Square brackets [ ] create an array — like a shopping list! Items are separated by commas.",
              junior: "Arrays use [] with comma-separated values. topics[0] accesses the first item (arrays start at index 0). .length returns the count.",
              senior: "Arrays are objects in JS. Use const for arrays — it prevents reassignment, not mutation. Push/pop/splice can still modify the contents.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Array created! 📋",
            action: "Check it!",
          },
          {
            id: 'foreach-msg',
            type: 'teki-message',
            mood: 'thinking',
            messages: [
              "Arrays are great for storing data. But how do you USE all those items?",
              "With forEach — it loops through every item in the array automatically.",
              "topics.forEach(function(topic) { ... })",
              "The function runs once for EACH item. 3 topics = runs 3 times!",
            ],
            action: "Got it!",
          },
          {
            id: 'foreach-challenge',
            type: 'code-challenge',
            teki: "Use forEach to add each topic as a list item on the page:",
            language: 'javascript',
            code: `const topics = ["Travel", "Music", "Food"];
const list = document.querySelector('#topic-list');

topics.___(function(topic) {
  list.innerHTML += "<li>" + topic + "</li>";
});`,
            answer: `const topics = ["Travel", "Music", "Food"];
const list = document.querySelector('#topic-list');

topics.forEach(function(topic) {
  list.innerHTML += "<li>" + topic + "</li>";
});`,
            blanks: [{ position: 0, answer: 'forEach' }],
            explanations: {
              young: "forEach visits each item in the list and runs your function on it — like going through each item on a checklist!",
              junior: "forEach(callback) calls callback(item) for each element. Add 1 item to topics → 1 new <li> appears automatically.",
              senior: "forEach is fine for simple side effects. Prefer map() to transform items into new values. For large lists, use DocumentFragment instead of += on innerHTML.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "forEach loop working! 🔄",
            action: "Check it!",
          },
        ],
      },

      // ── Mission 18 — Make a Tool ──────────────────────────────────────────────────
      {
        id: 'mission-18',
        number: 18,
        act: 7,
        title: 'Make a Tool',
        subtitle: 'Functions let you write code once and use it anywhere',
        concept: 'functions',
        xp: 200,
        badge: { id: 'toolkit-complete', label: 'Full Toolkit', emoji: '🛠️' },
        steps: [
          {
            id: 'functions-intro-msg',
            type: 'teki-message',
            mood: 'excited',
            messages: [
              "Final piece of the toolkit: FUNCTIONS.",
              "A function is a named, reusable block of code.",
              "Imagine writing the same 5 lines of code 10 different times. Painful!",
              "With a function: write it once, give it a name, call it 10 times from anywhere!",
            ],
            action: "Teach me functions!",
          },
          {
            id: 'functions-syntax-msg',
            type: 'teki-message',
            mood: 'thinking',
            messages: [
              "function greet(name) { return 'Hello, ' + name; }",
              "function → the keyword that creates it",
              "greet → the name you give it (how you call it later)",
              "(name) → the input it receives (called a parameter)",
              "return → sends the result back out",
            ],
            action: "Got it!",
          },
          {
            id: 'function-define-challenge',
            type: 'code-challenge',
            teki: "Define a function called 'formatTitle' that adds an emoji to any title:",
            language: 'javascript',
            code: `___ formatTitle(title) {
  return "🌟 " + title;
}

let result = formatTitle("{{name}}");
console.log(result); // "🌟 {{name}}"`,
            answer: `function formatTitle(title) {
  return "🌟 " + title;
}

let result = formatTitle("{{name}}");
console.log(result); // "🌟 {{name}}"`,
            blanks: [{ position: 0, answer: 'function' }],
            explanations: {
              young: "Type 'function' to start — it's the magic keyword that creates a reusable tool!",
              junior: "'function' keyword declares a named function. The name after it is how you call it. Parameters in () receive values from the caller.",
              senior: "Function declarations are hoisted — you can call them before they appear in code. Arrow functions (const f = () => {}) are not hoisted and have lexical 'this'.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Function built! 🛠️",
            action: "Check it!",
          },
          {
            id: 'return-challenge',
            type: 'code-challenge',
            teki: "Make this function send its result back — add the keyword that returns a value:",
            language: 'javascript',
            code: `function double(number) {
  ___ number * 2;
}

let result = double(5);
console.log(result); // 10`,
            answer: `function double(number) {
  return number * 2;
}

let result = double(5);
console.log(result); // 10`,
            blanks: [{ position: 0, answer: 'return' }],
            explanations: {
              young: "'return' sends the answer OUT of the function — like the kitchen handing you your finished meal!",
              junior: "'return' exits the function and sends a value back to wherever it was called. Without return, the function returns undefined.",
              senior: "return exits the function immediately. Use early returns for guard clauses. A function without a return statement implicitly returns undefined.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Value returned! ✅",
            action: "Check it!",
          },
          {
            id: 'act7-complete',
            type: 'act-complete',
            actId: 'act7',
            title: 'ACT 7 Complete!',
            message: "You have the FULL toolkit! Variables, DOM manipulation, conditionals, events, arrays, loops, and functions — you can now build any interactive website. You're a Junior Creator!",
            power: { label: 'Full Toolkit', emoji: '🛠️' },
            xpBonus: 200,
            action: "I'm a Junior Creator!",
          },
        ],
      },
    ],
  },

  // ── ACT 8 ── Teaching The Website Skills ────────────────────────────────────
  {
    id: 'act8',
    number: 8,
    title: 'Teaching The Website Skills',
    tagline: 'Functions — reusable tools',
    color: '#f97316',
    emoji: '🔧',
    quiz: [
      {
        question: 'What is a FUNCTION in code?',
        options: ['A type of error message', 'A reusable block of code with a name', 'A color value', 'A database table'],
        correct: 1,
        explanation: 'A function is a named recipe — write it once, call it as many times as you need.',
      },
      {
        question: 'What does it mean to CALL a function?',
        options: ['Give it a name', 'Delete it from memory', 'Run / execute it', 'Copy it to another file'],
        correct: 2,
        explanation: 'Calling a function means running the code inside it: greet() calls the greet function.',
      },
      {
        question: 'What do PARAMETERS let you do?',
        options: ['Style text on the page', 'Pass different values INTO a function each time it runs', 'Create loops', 'Connect to a server'],
        correct: 1,
        explanation: 'Parameters are like blank boxes in a recipe — you fill them in differently each time you call the function.',
      },
    ],
    missions: [

      // ── Mission 19 — Write Once, Use Everywhere ──────────────────────────────
      {
        id: 'mission-19',
        number: 19,
        act: 8,
        title: 'Write Once, Use Everywhere',
        subtitle: 'Functions are reusable named tools',
        concept: 'functions',
        xp: 170,
        badge: null,
        steps: [
          {
            id: 'function-define-challenge',
            type: 'code-challenge',
            teki: "Define a function called 'double' that takes a number and returns it times 2:",
            language: 'javascript',
            code: `___ double(number) {
  return number * 2;
}`,
            answer: `function double(number) {
  return number * 2;
}`,
            blanks: [{ position: 0, answer: 'function' }],
            explanations: {
              young: "Type 'function' to start defining it — like writing the title of your recipe card!",
              junior: "'function' is the keyword that creates a reusable block. The name after it is how you call it.",
              senior: "'function' creates a named function declaration which is hoisted. Arrow functions const f = () => {} are not hoisted.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Function defined! 📋",
            action: "Check it!",
          },
          {
            id: 'return-challenge',
            type: 'code-challenge',
            teki: "A function that doesn't return anything is useless. Make this one return the greeting:",
            language: 'javascript',
            code: `function greet(name) {
  ___ "Hello, " + name + "!";
}

let msg = greet("Alex");  // msg should be "Hello, Alex!"`,
            answer: `function greet(name) {
  return "Hello, " + name + "!";
}

let msg = greet("Alex");  // msg should be "Hello, Alex!"`,
            blanks: [{ position: 0, answer: 'return' }],
            explanations: {
              young: "return sends the result OUT of the function — like the kitchen handing you your cooked meal!",
              junior: "'return' exits the function and sends a value back to whoever called it. Without return, the function returns undefined.",
              senior: "Functions without return return undefined. Use return early for guard clauses. Avoid multiple returns for complex logic — prefer a result variable.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Value returned! ✅",
            action: "Check it!",
          },
          {
            id: 'call-function-challenge',
            type: 'code-challenge',
            teki: "Now CALL the function with a visitor's name:",
            language: 'javascript',
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
            blanks: [{ position: 0, answer: 'greet' }],
            explanations: {
              young: "Call it by its name followed by () — like calling a friend to come over!",
              junior: "functionName(argument) calls the function and passes the argument as the parameter. The return value can be stored in a variable.",
              senior: "Function calls are expressions — they evaluate to the return value. Can be used inline: console.log(greet('Alex')) or in other expressions.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Function called! 📞",
            action: "Check it!",
          },
        ],
      },

      // ── Mission 20 — The Name Generator ─────────────────────────────────────
      {
        id: 'mission-20',
        number: 20,
        act: 8,
        title: 'Random Name Generator',
        subtitle: 'Arrays + functions + events — all together',
        concept: 'function-project',
        xp: 220,
        badge: { id: 'function-engineer', label: 'Function Engineer', emoji: '🔧' },
        steps: [
          {
            id: 'math-floor-challenge',
            type: 'code-challenge',
            teki: "Math.floor() rounds down to a whole number. Use it to get a random index:",
            language: 'javascript',
            code: `let words = ["cat", "dog", "bird"];

let randomIndex = Math.___(Math.random() * words.length);
let randomWord = words[randomIndex];`,
            answer: `let words = ["cat", "dog", "bird"];

let randomIndex = Math.floor(Math.random() * words.length);
let randomWord = words[randomIndex];`,
            blanks: [{ position: 0, answer: 'floor' }],
            explanations: {
              young: "Math.floor rounds DOWN to the nearest whole number. 2.9 → 2. 1.1 → 1. This prevents going past the end of the array!",
              junior: "Math.floor(n) returns the largest integer ≤ n. Math.random() * length gives 0 to (length-1.0001), so floor gives 0 to length-1.",
              senior: "Math.floor vs Math.round vs Math.trunc: floor always goes down, round goes to nearest, trunc truncates toward zero. For positive numbers, floor and trunc are equivalent.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Random index! 🎲",
            action: "Check it!",
          },
          {
            id: 'generator-function-challenge',
            type: 'code-challenge',
            teki: "Complete the generateName function to return a random combined name:",
            language: 'javascript',
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
            blanks: [{ position: 0, answer: 'return' }],
            explanations: {
              young: "return sends the combined name OUT of the function so we can use it!",
              junior: "return adj + ' ' + noun sends the combined string back to whoever called generateName().",
              senior: "Could also write as: return `${adj} ${noun}` using template literals for cleaner string building.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Generator complete! 🎰",
            action: "Check it!",
          },
          {
            id: 'act8-complete',
            type: 'act-complete',
            actId: 'act8',
            title: 'ACT 8 Complete!',
            message: "Variables, conditionals, events, arrays, loops, functions — you know ALL the fundamentals of programming! Now meet the tools professionals actually use.",
            power: { label: 'Function Engineer', emoji: '🔧' },
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
    id: 'act9',
    number: 9,
    title: 'Modern Builder Tools',
    tagline: 'React — the way professionals build',
    color: '#0ea5e9',
    emoji: '⚛️',
    quiz: [
      {
        question: 'What is a React COMPONENT?',
        options: ['A database row', 'A CSS file', 'A reusable piece of UI built with JavaScript', 'A type of loop'],
        correct: 2,
        explanation: 'Components are the building blocks of React apps — each one is a self-contained UI piece.',
      },
      {
        question: 'What is React STATE?',
        options: ['The location of the server', 'Data stored inside a component that can change over time', 'A special HTML attribute', 'A routing library'],
        correct: 1,
        explanation: 'State is a component\'s memory — when state changes, React automatically re-renders the UI.',
      },
      {
        question: 'How do you pass data INTO a React component?',
        options: ['Using useState', 'Using a for loop', 'Using props', 'Using a database'],
        correct: 2,
        explanation: 'Props (properties) let parent components send data down to child components.',
      },
    ],
    missions: [

      // ── Mission 21 ─ Chapter 1: Components ───────────────────────────────────
      {
        id: 'mission-21',
        number: 21,
        act: 9,
        title: "The Developer's Secret",
        subtitle: 'React Components — build once, use everywhere',
        concept: 'components',
        xp: 200,
        badge: null,
        steps: [
          {
            id: 'm21-gateway',
            type: 'react-gateway',
            chapterNumber: 1,
            chapterTitle: 'Reusable Pieces',
            chapterSubtitle: 'React Components',
            messages: [
              "Nice.",
              "We have a real website.",
              "But here's something interesting...",
              "Professional developers don't build websites one piece at a time.",
              "They use special tools.",
              "Want to see them?",
            ],
            mood: 'excited',
            action: "Show Me",
          },
          {
            id: 'm21-spotlight',
            type: 'react-spotlight',
            demoState: { mode: 'components', highlightButtons: true },
            teki: "Look around your website.",
            question: "Do you think developers built each button separately?",
            options: [
              { id: 'yes', label: 'Yes' },
              { id: 'no',  label: 'No'  },
            ],
            tekiReaction: {
              yes: { messages: ["Actually... nope. Let me show you the secret."], mood: 'thinking' },
              no:  { messages: ["Exactly! Let me show you how."], mood: 'excited' },
            },
            action: "Show Me How",
          },
          {
            id: 'm21-concept',
            type: 'react-concept',
            conceptType: 'blueprint-to-components',
            teki: "They built ONE blueprint. Then copied it everywhere.",
            codeReveal: '<Button />',
            language: 'jsx',
            explanation: {
              young: "A Component is like a LEGO piece! Make one, snap it in 100 times!",
              junior: "Components are reusable. Define once in code — use as many times as you want.",
              senior: "React components are pure functions of their props. Define once, compose freely.",
            },
            action: "I love it!",
          },
          {
            id: 'm21-demo',
            type: 'react-live-demo',
            demoType: 'button-style',
            teki: "Try it. Change every button style at once.",
            demoInit: { mode: 'components', highlightButtons: false },
            options: [
              { label: 'Rounded', value: 'rounded' },
              { label: 'Pill',    value: 'pill'    },
              { label: 'Square',  value: 'square'  },
            ],
            codeReveal: `function Button({ text }) {
  return <button className="btn">{text}</button>;
}

// Every button on the site uses this one component.`,
            language: 'jsx',
            successMessage: "See? ONE change. EVERY button updated.",
            explanation: {
              young: "One blueprint changed everything at once!",
              junior: "Changing the Button component updates every button instantly — no manual edits.",
              senior: "Centralising UI in a component means one change propagates everywhere. This is the core benefit of component-based architecture.",
            },
            action: "Next Chapter!",
          },
        ],
      },

      // ── Mission 22 ─ Chapter 2: Props ─────────────────────────────────────────
      {
        id: 'mission-22',
        number: 22,
        act: 9,
        title: 'Shape Shifters',
        subtitle: 'Props — customize each piece',
        concept: 'props',
        xp: 200,
        badge: null,
        steps: [
          {
            id: 'm22-gateway',
            type: 'react-gateway',
            chapterNumber: 2,
            chapterTitle: 'Shape Shifters',
            chapterSubtitle: 'Props',
            messages: [
              "What if the same blueprint could look different?",
            ],
            mood: 'thinking',
            action: "Show Me",
          },
          {
            id: 'm22-spotlight',
            type: 'react-spotlight',
            demoState: { mode: 'components', propShowcase: true, highlightButtons: false },
            teki: "Same Button component — three different labels.",
            highlightLabels: ['Adopt Now', 'Learn More', 'Contact Us'],
            action: "Interesting!",
          },
          {
            id: 'm22-demo',
            type: 'react-live-demo',
            demoType: 'text-editor',
            teki: "Your turn. Change the button text.",
            demoInit: { mode: 'props', propShowcase: false },
            placeholder: "e.g. Join The Mission",
            defaultValue: "Join The Mission",
            codeReveal: `<Button text="{{value}}" />`,
            language: 'jsx',
            successMessage: "Same blueprint. Different information.",
            explanation: {
              young: "Props are like instructions you give each piece! Same toy, different label.",
              junior: "Props let you pass data into a component. Each instance can display different content.",
              senior: "Props are immutable from the child's perspective. The parent owns the data — the child just renders it.",
            },
            action: "Next Chapter!",
          },
        ],
      },

      // ── Mission 23 ─ Chapter 3: State ─────────────────────────────────────────
      {
        id: 'mission-23',
        number: 23,
        act: 9,
        title: 'Website Memory',
        subtitle: 'State — the site remembers your choices',
        concept: 'state',
        xp: 220,
        badge: null,
        steps: [
          {
            id: 'm23-gateway',
            type: 'react-gateway',
            chapterNumber: 3,
            chapterTitle: 'Website Memory',
            chapterSubtitle: 'State',
            messages: [
              "Your website has a theme switcher now.",
              "Click Dark Mode and watch what happens.",
            ],
            mood: 'thinking',
            action: "Okay",
          },
          {
            id: 'm23-state-demo',
            type: 'react-live-demo',
            demoType: 'theme-toggle',
            demoInit: { mode: 'state', showThemeBar: true },
            teki: "Click Dark Mode!",
            options: [
              { label: 'Light Mode', value: false },
              { label: 'Dark Mode',  value: true  },
            ],
            action: "Interesting!",
          },
          {
            id: 'm23-teki',
            type: 'teki-message',
            mood: 'amazed',
            messages: [
              "Interesting...",
              "The website remembered your choice.",
            ],
            autoAdvance: true,
          },
          {
            id: 'm23-setting-demo',
            type: 'react-live-demo',
            demoType: 'add-setting',
            demoInit: { mode: 'state' },
            teki: "Mission: Add another setting to your website.",
            options: [
              { label: 'Theme',     value: 'theme',    icon: '🎨' },
              { label: 'Font Size', value: 'fontSize',  icon: '📏' },
              { label: 'Hero Text', value: 'heroText',  icon: '✏️' },
            ],
            codeReveal: `const [theme, setTheme] = useState('light');

// When user clicks:
setTheme('dark');  // ← triggers re-render automatically`,
            language: 'jsx',
            successMessage: "This is website memory. Developers call it State.",
            explanation: {
              young: "useState is a memory crystal! It remembers things and updates the screen when changed!",
              junior: "useState(initial) returns [value, setter]. Calling the setter triggers a re-render with the new value.",
              senior: "useState is a React Hook. State updates are batched and asynchronous. Avoid duplicating state that can be derived.",
            },
            action: "Next Chapter!",
          },
        ],
      },

      // ── Mission 24 ─ Chapter 4: Events ────────────────────────────────────────
      {
        id: 'mission-24',
        number: 24,
        act: 9,
        title: 'Teaching Actions',
        subtitle: 'Events — buttons that actually do things',
        concept: 'react-events',
        xp: 180,
        badge: null,
        steps: [
          {
            id: 'm24-gateway',
            type: 'react-gateway',
            chapterNumber: 4,
            chapterTitle: 'Teaching Actions',
            chapterSubtitle: 'Events',
            messages: [],
            mood: 'happy',
            action: "Let's See",
          },
          {
            id: 'm24-dead-button',
            type: 'react-spotlight',
            demoState: { mode: 'events', showDeadButton: true, eventAction: null },
            teki: 'The hero button says "Explore". Click it in the preview. Nothing happens.',
            action: "Nothing happened...",
          },
          {
            id: 'm24-teki',
            type: 'teki-message',
            mood: 'thinking',
            messages: [
              "Let's teach it what to do.",
            ],
            autoAdvance: true,
          },
          {
            id: 'm24-event-demo',
            type: 'react-live-demo',
            demoType: 'event-picker',
            teki: "Choose what the button should do:",
            demoInit: { mode: 'events' },
            options: [
              { label: 'Show Message', value: 'message',     icon: '💬' },
              { label: 'Open Popup',   value: 'popup',       icon: '📋' },
              { label: 'Change Text',  value: 'text-change', icon: '✏️' },
            ],
            codeReveal: `<button onClick={handleClick}>
  Explore
</button>

// onClick fires every time the button is clicked.`,
            language: 'jsx',
            successMessage: "The button knows what to do now!",
            explanation: {
              young: "onClick is like a tiny sensor! When clicked, it runs your instructions!",
              junior: "onClick={handler} attaches a click listener. Pass the function name — don't call it with ().",
              senior: "React synthetic events wrap native DOM events. Use onClick, onChange, onSubmit. Pass references, not invocations.",
            },
            action: "Next Chapter!",
          },
        ],
      },

      // ── Mission 25 ─ Chapter 5: map() ─────────────────────────────────────────
      {
        id: 'mission-25',
        number: 25,
        act: 9,
        title: 'Automatic Factories',
        subtitle: 'map() — one instruction, many results',
        concept: 'list-rendering',
        xp: 200,
        badge: null,
        steps: [
          {
            id: 'm25-gateway',
            type: 'react-gateway',
            chapterNumber: 5,
            chapterTitle: 'Automatic Factories',
            chapterSubtitle: 'map()',
            messages: [],
            mood: 'excited',
            action: "Show Me",
          },
          {
            id: 'm25-gallery-show',
            type: 'react-spotlight',
            demoState: {
              mode: 'map',
              showPets: true,
              pets: ['Buddy 🐶', 'Whiskers 🐱', 'Hopscotch 🐰'],
            },
            teki: "Look — a pet gallery just appeared on your website!",
            action: "Cool!",
          },
          {
            id: 'm25-teki',
            type: 'teki-message',
            mood: 'thinking',
            messages: [
              "Imagine adding 100 pets manually.",
              "That's 100 separate blocks of code.",
              "Nightmare, right?",
            ],
            autoAdvance: true,
          },
          {
            id: 'm25-add-pet',
            type: 'react-live-demo',
            demoType: 'add-pet',
            teki: "Add a new pet. Watch the gallery update automatically.",
            demoInit: { mode: 'map', showPets: true, pets: ['Buddy 🐶', 'Whiskers 🐱', 'Hopscotch 🐰'] },
            codeReveal: `const pets = ["Buddy", "Whiskers", "Hopscotch", /* new pet */];

// ONE instruction creates ALL the cards:
pets.map((pet) => (
  <PetCard key={pet} name={pet} />
))`,
            language: 'jsx',
            successMessage: "One instruction. Many cards.",
            explanation: {
              young: "map() is a magic factory! Give it a list, it makes a card for EACH one!",
              junior: "map() transforms every array item. Add one pet to the array — one new card appears instantly.",
              senior: "map() in JSX returns a list of elements. Each needs a stable key prop for efficient reconciliation.",
            },
            action: "Next Chapter!",
          },
        ],
      },

      // ── Mission 26 ─ Chapter 6: Conditional Rendering ────────────────────────
      {
        id: 'mission-26',
        number: 26,
        act: 9,
        title: 'Smart Decisions',
        subtitle: 'Conditional Rendering — show the right thing',
        concept: 'conditional-rendering',
        xp: 200,
        badge: null,
        steps: [
          {
            id: 'm26-gateway',
            type: 'react-gateway',
            chapterNumber: 6,
            chapterTitle: 'Smart Decisions',
            chapterSubtitle: 'Conditional Rendering',
            messages: [],
            mood: 'thinking',
            action: "Got it",
          },
          {
            id: 'm26-spotlight',
            type: 'react-spotlight',
            demoState: { mode: 'conditional', showConditional: true, userType: null },
            teki: 'Your website shows "Welcome, Visitor!" to everyone. But what if it could be smarter?',
            action: "What if...?",
          },
          {
            id: 'm26-demo',
            type: 'react-live-demo',
            demoType: 'user-type',
            teki: "Choose who's visiting. Watch the message change.",
            demoInit: { mode: 'conditional', showConditional: true },
            options: [
              { label: 'Kid',     value: 'kid',     icon: '🧒' },
              { label: 'Parent',  value: 'parent',  icon: '👩' },
              { label: 'Teacher', value: 'teacher', icon: '👩‍🏫' },
            ],
            codeReveal: `{isKid
  ? <p>Hey future builder! 🎉</p>
  : isParent
  ? <p>Explore our resources! 👩‍👧</p>
  : <p>Welcome, Educator! 👩‍🏫</p>
}`,
            language: 'jsx',
            successMessage: "Different visitors, different experience!",
            explanation: {
              young: "IF kid → this message. IF parent → that message. The website chooses!",
              junior: "The ternary operator condition ? A : B renders different JSX based on a condition.",
              senior: "Conditional rendering in JSX uses &&, ternary, or extracted variables. Prefer early returns for complex branching.",
            },
            action: "Next Chapter!",
          },
        ],
      },

      // ── Mission 27 ─ Chapter 7: Routing ───────────────────────────────────────
      {
        id: 'mission-27',
        number: 27,
        act: 9,
        title: 'Multiple Rooms',
        subtitle: 'Routing — connect your pages',
        concept: 'routing',
        xp: 220,
        badge: { id: 'react-builder', label: 'React Builder', emoji: '🧩' },
        steps: [
          {
            id: 'm27-gateway',
            type: 'react-gateway',
            chapterNumber: 7,
            chapterTitle: 'Multiple Rooms',
            chapterSubtitle: 'Routing',
            messages: [
              "Your website has rooms.",
              "Home, About, Gallery, Contact.",
              "But they need doors.",
            ],
            mood: 'thinking',
            action: "Connect Them!",
          },
          {
            id: 'm27-demo',
            type: 'react-live-demo',
            demoType: 'connect-routes',
            teki: "Connect your pages — click each nav link to activate it.",
            demoInit: { mode: 'routing', pagesConnected: false, connectedRoutes: [] },
            codeReveal: `import { Link, Route } from '@tanstack/react-router';

// Navigation link
<Link to="/about">About</Link>

// Page definition
<Route path="/about" component={AboutPage} />`,
            language: 'jsx',
            successMessage: "Your pages are connected!",
            explanation: {
              young: "Links are like doors between rooms! Click one and you're in a new room instantly!",
              junior: "React Router's <Link> navigates without reloading. <Route> defines which component to show for each URL.",
              senior: "Client-side routing intercepts navigation. TanStack Router offers type-safe routes with loaders and search params.",
            },
            action: "Next Chapter!",
          },
        ],
      },

      // ── Mission 28 ─ Chapter 8: Props + State Together ────────────────────────
      {
        id: 'mission-28',
        number: 28,
        act: 9,
        title: 'Sharing Information',
        subtitle: 'Props + State — the full picture',
        concept: 'props-state',
        xp: 250,
        badge: { id: 'react-master', label: 'React Master', emoji: '⚛️' },
        steps: [
          {
            id: 'm28-gateway',
            type: 'react-gateway',
            chapterNumber: 8,
            chapterTitle: 'Sharing Information',
            chapterSubtitle: 'Props + State Together',
            messages: [
              "Final chapter.",
              "Everything comes together now.",
              "Build a Theme Selector that updates your ENTIRE website.",
            ],
            mood: 'excited',
            action: "Build It",
          },
          {
            id: 'm28-demo',
            type: 'react-live-demo',
            demoType: 'theme-selector',
            teki: "Pick a theme. Watch the entire website update.",
            demoInit: { mode: 'theme-selector', showThemeSelector: true },
            options: [
              { label: 'Ocean',  value: '#0ea5e9', icon: '🌊' },
              { label: 'Forest', value: '#10b981', icon: '🌿' },
              { label: 'Sunset', value: '#f59e0b', icon: '🌅' },
              { label: 'Royal',  value: '#8b5cf6', icon: '👑' },
            ],
            codeReveal: `// Parent holds the state
const [theme, setTheme] = useState('ocean');

// Props flow down to every child
<Header theme={theme} />
<Hero   theme={theme} />
<Footer theme={theme} />`,
            language: 'jsx',
            successMessage: "Props + State working together!",
            explanation: {
              young: "The parent remembers the theme and tells ALL its children what to use!",
              junior: "Parent component holds state. That state is passed to children as props — any change flows instantly.",
              senior: "Unidirectional data flow: state lives in the nearest common ancestor and propagates downward via props. For deeper sharing, use Context or a state manager.",
            },
            autoAdvance: true,
          },
          {
            id: 'm28-concept',
            type: 'react-concept',
            conceptType: 'props-state-flow',
            teki: "Here's how Parent and Child components share information:",
            action: "I understand it all!",
          },
          {
            id: 'act9-complete',
            type: 'act-complete',
            actId: 'act9',
            title: 'ACT 9 Complete!',
            message: "You know React! Components, props, state, events, map, conditional rendering, routing, and data flow. You build like a pro.",
            power: { label: 'React Master', emoji: '⚛️' },
            xpBonus: 400,
            action: "Connect to the world!",
          },
        ],
      },

    ],
  },

  // ── ACT 10 ── Connecting To The World ────────────────────────────────────────
  {
    id: 'act10',
    number: 10,
    title: 'Connecting To The World',
    tagline: 'APIs — live data from anywhere',
    color: '#14b8a6',
    emoji: '🌎',
    quiz: [
      {
        question: 'What does an API do?',
        options: ['Styles the page with colors', 'Lets your app talk to other services and get live data', 'Renders HTML templates', 'Manages local variables'],
        correct: 1,
        explanation: 'API = Application Programming Interface — it\'s a door that lets two apps exchange data.',
      },
      {
        question: 'What does fetch() do in JavaScript?',
        options: ['Creates a new React component', 'Changes text styling', 'Makes a network request to get data from a URL', 'Stores data in localStorage'],
        correct: 2,
        explanation: 'fetch() sends a request to a URL and returns the response — like asking a waiter for your order.',
      },
      {
        question: 'What does async/await help with?',
        options: ['Making fonts bigger', 'Waiting for slow operations (like fetching data) without freezing the app', 'Looping through arrays', 'Creating CSS animations'],
        correct: 1,
        explanation: 'async/await lets you write asynchronous code that reads top-to-bottom, just like normal code.',
      },
    ],
    missions: [
      {
        id: 'mission-29',
        number: 29,
        act: 10,
        title: 'Data Portal',
        subtitle: 'APIs bring live data in',
        concept: 'apis',
        xp: 250,
        badge: null,
        steps: [
          {
            id: 'api-intro',
            type: 'teki-message',
            mood: 'excited',
            messages: [
              "Your website lives on the internet. The internet is FULL of data!",
              "Weather, news, cat facts, dog photos — all available via APIs.",
              "API = a door to someone else's data!",
            ],
            autoAdvance: true,
          },
        ],
      },

      {
        id: 'mission-30',
        number: 30,
        act: 10,
        title: 'Live Content',
        subtitle: 'Display real data beautifully',
        concept: 'data-display',
        xp: 250,
        badge: { id: 'data-connector', label: 'Data Connector', emoji: '🌎' },
        steps: [
          {
            id: 'live-intro',
            type: 'teki-message',
            mood: 'proud',
            messages: [
              "Getting data is one thing. DISPLAYING it beautifully is another!",
              "Let's show live data from an API in your website.",
            ],
            autoAdvance: true,
          },
          {
            id: 'act10-complete',
            type: 'act-complete',
            actId: 'act10',
            title: 'ACT 10 Complete!',
            message: "You can fetch and display live data! One final act: create your own thing.",
            power: { label: 'Data Connector', emoji: '🌎' },
            xpBonus: 300,
            action: "Final challenge!",
          },
        ],
      },
    ],
  },

  // ── ACT 11 ── Creator Challenges ─────────────────────────────────────────────
  {
    id: 'act11',
    number: 11,
    title: 'Creator Challenges',
    tagline: 'Build anything you imagine',
    color: '#a855f7',
    emoji: '🏆',
    quiz: [
      {
        question: 'Which of these is the best description of a full-stack developer?',
        options: ['Someone who only does design', 'Someone who only writes databases', 'Someone who builds both the frontend (UI) and backend (server/data)', 'Someone who manages the office'],
        correct: 2,
        explanation: 'Full-stack means you can handle the whole product — what users see AND the server logic behind it.',
      },
      {
        question: 'What is a good first step when starting any new project?',
        options: ['Write as much code as possible without planning', 'Deploy it immediately', 'Break the problem into smaller parts and plan your approach', 'Copy another project completely'],
        correct: 2,
        explanation: 'Great builders always plan first — breaking big problems into small steps makes them manageable.',
      },
      {
        question: 'What does it mean to DEPLOY a website?',
        options: ['Delete the code', 'Publish it so real people on the internet can visit it', 'Make a backup copy', 'Run tests on your computer'],
        correct: 1,
        explanation: 'Deployment puts your code on a server so anyone with a URL can visit your site.',
      },
    ],
    missions: [
      {
        id: 'challenge-1',
        number: 31,
        act: 11,
        title: 'Pet Website',
        subtitle: 'Build a pet-themed website',
        concept: 'challenge',
        xp: 300,
        badge: { id: 'creator-1', label: 'Pet Creator', emoji: '🐾' },
        isChallenge: true,
        steps: [
          {
            id: 'challenge-1-intro',
            type: 'teki-message',
            mood: 'excited',
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
        id: 'challenge-2',
        number: 32,
        act: 11,
        title: 'School Website',
        subtitle: 'Design a school website',
        concept: 'challenge',
        xp: 300,
        badge: { id: 'creator-2', label: 'School Builder', emoji: '🏫' },
        isChallenge: true,
        steps: [
          {
            id: 'challenge-2-intro',
            type: 'teki-message',
            mood: 'excited',
            messages: [
              "Challenge 2! 🎯",
              "Build a school website with a homepage, about page, and class schedule.",
            ],
            action: "Accept the challenge!",
          },
        ],
      },
      {
        id: 'challenge-3',
        number: 33,
        act: 11,
        title: 'Space Explorer Website',
        subtitle: 'Build an out-of-this-world site',
        concept: 'challenge',
        xp: 350,
        badge: { id: 'creator-3', label: 'Space Explorer', emoji: '🚀' },
        isChallenge: true,
        steps: [
          {
            id: 'challenge-3-intro',
            type: 'teki-message',
            mood: 'excited',
            messages: [
              "Challenge 3! 🚀",
              "Build a space exploration website. Fetch real data from a space API!",
            ],
            action: "Blast off!",
          },
        ],
      },
      {
        id: 'challenge-4',
        number: 34,
        act: 11,
        title: 'Portfolio Website',
        subtitle: 'Showcase your work to the world',
        concept: 'challenge',
        xp: 400,
        badge: { id: 'creator-4', label: 'Portfolio Builder', emoji: '💼' },
        isChallenge: true,
        steps: [
          {
            id: 'challenge-4-intro',
            type: 'teki-message',
            mood: 'excited',
            messages: [
              "Challenge 4! 💼",
              "Build YOUR portfolio website. Show the world what you can do!",
            ],
            action: "Build my portfolio!",
          },
        ],
      },
      {
        id: 'challenge-5',
        number: 35,
        act: 11,
        title: 'Open Creation Challenge',
        subtitle: 'Build anything you can imagine',
        concept: 'challenge',
        xp: 500,
        badge: { id: 'creator-5', label: 'Full Creator', emoji: '🏆' },
        isChallenge: true,
        steps: [
          {
            id: 'challenge-5-intro',
            type: 'teki-message',
            mood: 'excited',
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
]

// ── Base helpers ───────────────────────────────────────────────────────────────

export const getAllMissions = () => ACTS.flatMap((act) => act.missions)
export const getMissionById = (id) => getAllMissions().find((m) => m.id === id)
export const getMissionByNumber = (n) => getAllMissions().find((m) => m.number === n)
export const getActById = (id) => ACTS.find((a) => a.id === id)
export const getMissionsForAct = (actId) => ACTS.find((a) => a.id === actId)?.missions ?? []
export const TOTAL_MISSIONS = getAllMissions().length
export const TOTAL_ACTS = ACTS.length

// ── Level scoping ──────────────────────────────────────────────────────────────
// Each level is a distinct journey through a subset of acts.
// Code depth within each act is controlled by ageExposure per step.
//
//  Young Builder  (under 11) → Acts 1–3  : visual building + HTML basics
//  Junior Creator (11–14)    → Acts 1–7  : fundamentals through loops & functions
//  Future Developer (15+)    → Acts 1–11 : full curriculum + React + APIs

export const LEVEL_ACT_NUMBERS = {
  young:  [1, 2, 3],
  junior: [1, 2, 3, 4, 5, 6, 7],
  // Seniors skip the visual-building acts — website is auto-generated.
  // They jump straight into React, APIs, and Creator Challenges.
  senior: [9, 10, 11],
}

export const LEVEL_INFO = {
  young:  { label: 'Young Builder',    emoji: '🌱', color: '#10b981', totalActs: 3 },
  junior: { label: 'Junior Creator',   emoji: '🚀', color: '#3b82f6', totalActs: 7 },
  senior: { label: 'Future Developer', emoji: '💻', color: '#f59e0b', totalActs: 3 },
}

// All missions a level goes through, in order
export const getMissionsForLevel = (ageGroup) => {
  const actNums = LEVEL_ACT_NUMBERS[ageGroup] ?? LEVEL_ACT_NUMBERS.young
  return getAllMissions().filter((m) => actNums.includes(m.act))
}

// All acts a level contains
export const getActsForLevel = (ageGroup) => {
  const actNums = LEVEL_ACT_NUMBERS[ageGroup] ?? LEVEL_ACT_NUMBERS.young
  return ACTS.filter((a) => actNums.includes(a.number))
}

// The final act number for a level (completing this act = level complete)
export const getLastActNumberForLevel = (ageGroup) => {
  const actNums = LEVEL_ACT_NUMBERS[ageGroup] ?? LEVEL_ACT_NUMBERS.young
  return actNums[actNums.length - 1]
}

export const isLastActForLevel = (actNumber, ageGroup) =>
  actNumber === getLastActNumberForLevel(ageGroup)
