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
//   code-reveal    — slide-in code snippet with age-adapted explanation
//   code-challenge — fill-in-the-blank or small editor challenge
//   act-complete   — celebration screen, then advance to next act
// ──────────────────────────────────────────────────────────────────────────────

export const ACTS = [
  // ── ACT 1 ── Bringing The Website To Life ───────────────────────────────────
  {
    id: 'act1',
    number: 1,
    title: 'Bringing The Website To Life',
    tagline: 'From blueprint to reality',
    color: '#3b82f6',
    emoji: '🏗️',
    quiz: [
      {
        question: 'What does the HEADER section of a website show?',
        options: ['Product prices and discounts', 'Site name and navigation links', 'Social media posts', 'Hidden code files'],
        correct: 1,
        explanation: 'A header shows your site\'s name and navigation — it\'s the sign at the top that tells visitors where they are.',
      },
      {
        question: 'What is the HERO section of a website?',
        options: ['A security firewall', 'The big welcome/intro area at the top of the page', 'The footer menu at the bottom', 'A database table'],
        correct: 1,
        explanation: 'The hero is the big, bold welcome area that grabs attention right when you arrive.',
      },
      {
        question: 'What does a FOOTER usually contain?',
        options: ['The main site title', 'Hero images', 'Privacy links and contact info', 'Product catalog'],
        correct: 2,
        explanation: 'Footers sit at the bottom and hold useful links like Privacy, Terms, and Contact info.',
      },
    ],
    missions: [

      // ── Mission 1 — Build the Entrance ──────────────────────────────────────
      {
        id: 'mission-1',
        number: 1,
        act: 1,
        title: 'The Missing Entrance',
        subtitle: 'Build your header',
        concept: 'header',
        xp: 120,
        badge: { id: 'first-section', label: 'First Section', emoji: '🚪' },
        steps: [
          {
            id: 'canvas-header-title',
            type: 'canvas-input',
            highlight: 'header',
            teki: "Your website exists — but it has no name! See that empty bar at the top? Click it and type your website's name!",
            canvasInput: {
              fieldKey: 'header-title',
              section: 'header',
              storeKey: 'title',
              label: 'Website name',
              placeholder: 'My Awesome Website…',
            },
            action: "That's my name!",
          },
          {
            id: 'canvas-header-nav',
            type: 'canvas-input',
            highlight: 'header',
            teki: "Now add navigation links — where can visitors explore? Type 3–4 pages separated by commas!",
            canvasInput: {
              fieldKey: 'header-nav',
              section: 'header',
              storeKey: 'navLinks',
              label: 'Nav links',
              placeholder: 'Home, About, Projects, Contact…',
              isArray: true,
            },
            buildSectionOnComplete: 'header',
            action: "Header is live!",
          },
          {
            id: 'header-reveal',
            type: 'observation',
            teki: "Your entrance is open!",
            tekiMessages: ["Your website finally has an entrance! 🚪 Now let's look at the code that made it..."],
            highlightSection: 'header',
            autoAdvance: true,
          },
          {
            id: 'header-fix-challenge',
            type: 'code-challenge',
            teki: "Quick challenge! Someone forgot the closing tag. Fix it:",
            language: 'html',
            code: `<header>
  <h1>{{name}}</h___>
</header>`,
            answer: `<header>
  <h1>{{name}}</h1>
</header>`,
            blanks: [{ position: 0, answer: '1' }],
            explanations: {
              young: "Every tag needs a matching closing tag! If it opens with <h1> it closes with </h1>.",
              junior: "HTML tags come in pairs: <tag> opens, </tag> closes. The closing tag always has a forward slash.",
              senior: "Unclosed tags cause browser parsing errors. Use a linter or prettier to catch these automatically.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Header repaired! 🔧",
            action: "Check it!",
          },
        ],
      },

      // ── Mission 2 — First Impressions ────────────────────────────────────────
      {
        id: 'mission-2',
        number: 2,
        act: 1,
        title: 'First Impressions',
        subtitle: 'Build the section visitors see first',
        concept: 'hero',
        xp: 130,
        badge: null,
        steps: [
          {
            id: 'canvas-hero-headline',
            type: 'canvas-input',
            highlight: 'hero',
            teki: "That big empty space is your HERO — visitors see it first. Click it and write something bold and memorable!",
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
            teki: "Now write one line below — tell visitors exactly what this website is about!",
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
            teki: "Every hero needs a CALL TO ACTION — a button that says 'do something'. What should yours say?",
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
            id: 'button-tag-challenge',
            type: 'code-challenge',
            teki: "Your button was made with one HTML tag. Write it:",
            language: 'html',
            code: `<______>{{buttonText}}</______ >`,
            answer: `<button>{{buttonText}}</button>`,
            blanks: [{ position: 0, answer: 'button' }, { position: 1, answer: 'button' }],
            explanations: {
              young: "The <button> tag creates something you can click! It needs an opening AND closing tag.",
              junior: "<button> creates a clickable element. Right now it does nothing — JavaScript will give it superpowers later!",
              senior: "Use <button type='button'> for JS-driven actions to prevent accidental form submission.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Button coded! 🎯",
            action: "Check it!",
          },
        ],
      },

      // ── Mission 3 — The Final Stop ────────────────────────────────────────────
      {
        id: 'mission-3',
        number: 3,
        act: 1,
        title: 'Seal the Deal',
        subtitle: 'Build your footer',
        concept: 'footer',
        xp: 100,
        badge: { id: 'complete-website', label: 'Website Built', emoji: '🌐' },
        steps: [
          {
            id: 'canvas-footer-copyright',
            type: 'canvas-input',
            highlight: 'footer',
            teki: "The FOOTER is the last thing visitors see. Click the dark bar at the bottom and add your copyright — like: © 2024 Your Name",
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
            teki: "Now add footer links — Privacy, Terms, Contact. Visitors expect these at the bottom of every site!",
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
            id: 'website-complete',
            type: 'observation',
            teki: "HEADER. HERO. FOOTER.",
            tekiMessages: [
              "Look at that! 🏆 Every website in the world has these exact 3 sections — and you just built them all from scratch!",
            ],
            autoAdvance: true,
          },
          {
            id: 'structure-challenge',
            type: 'code-challenge',
            teki: "Last challenge! Complete the page structure — what tag goes at the bottom?",
            language: 'html',
            code: `<header>...</header>
<main>...</main>
<______>© 2024 {{name}}</______ >`,
            answer: `<header>...</header>
<main>...</main>
<footer>© 2024 {{name}}</footer>`,
            blanks: [{ position: 0, answer: 'footer' }, { position: 1, answer: 'footer' }],
            explanations: {
              young: "Just like a book has a first page AND a last page, websites have a <header> AND a <footer>!",
              junior: "<footer> is a semantic element for page-bottom content — copyright, links, contact info.",
              senior: "<footer> is a semantic landmark. It can also appear inside <article> or <section> — not just at the page bottom.",
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
            message: "You built a real website! Header, hero, footer — the 3 sections every site on the internet has. Now let's make it look stunning.",
            power: { label: 'Builder', emoji: '🏗️' },
            xpBonus: 200,
            action: "Enter the Design Studio!",
          },
        ],
      },
    ],
  },

  // ── ACT 2 ── Design Studio ───────────────────────────────────────────────────
  {
    id: 'act2',
    number: 2,
    title: 'Design Studio',
    tagline: 'Make it beautiful',
    color: '#ec4899',
    emoji: '🎨',
    quiz: [
      {
        question: 'What is a HEX color code like #6366f1?',
        options: ['A cheat code for games', 'A secret name for a color used in code', 'A font family name', 'A website address'],
        correct: 1,
        explanation: '#6366f1 is actually indigo/purple — hex codes are the secret names colors use in code.',
      },
      {
        question: 'What does "typography" mean in web design?',
        options: ['The speed of a website', 'How text is styled — fonts, sizes, and weights', 'The color palette', 'The database structure'],
        correct: 1,
        explanation: 'Typography is all about how text looks: font family, size, weight, and line spacing.',
      },
      {
        question: 'Why are BUTTONS important on a website?',
        options: ['They make pages load faster', 'They store data on the server', 'They invite users to take action', 'They display images'],
        correct: 2,
        explanation: 'Buttons are calls to action — they guide users toward doing something like signing up or learning more.',
      },
    ],
    missions: [

      // ── Mission 4 — Color Story ──────────────────────────────────────────────
      {
        id: 'mission-4',
        number: 4,
        act: 2,
        title: 'The Color Lab',
        subtitle: 'Colors speak before visitors read a word',
        concept: 'colors',
        xp: 110,
        badge: null,
        steps: [
          {
            id: 'color-design',
            type: 'visual-builder',
            section: null,
            isStyleUpdate: true,
            teki: "Colors trigger emotions instantly — blue = calm, red = urgent, green = growth. Pick your website's personality!",
            fields: [
              { id: 'primaryColor', label: 'Primary Color', type: 'color', storeSubKey: 'primaryColor', hint: 'Your brand color — buttons, links, highlights' },
              { id: 'backgroundColor', label: 'Background Color', type: 'color', storeSubKey: 'backgroundColor', hint: 'The page background — light or dark?' },
            ],
            action: "Colors are set!",
          },
          {
            id: 'color-observe',
            type: 'observation',
            teki: "Same website. Completely different feeling.",
            tekiMessages: ["The SAME layout — totally different personality. That's the power of color! 🎨"],
            autoAdvance: true,
          },
          {
            id: 'color-challenge',
            type: 'code-challenge',
            teki: "Complete the CSS rule that sets your brand color across the whole site:",
            language: 'css',
            code: `___ {
  --primary: #3b82f6;
}`,
            answer: `:root {
  --primary: #3b82f6;
}`,
            blanks: [{ position: 0, answer: ':root' }],
            explanations: {
              young: "Type :root — it means 'apply this to the WHOLE page'!",
              junior: ":root targets the topmost HTML element. Variables defined here are available everywhere in your CSS.",
              senior: ":root has higher specificity than html selector. CSS custom properties defined here cascade down to all elements.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Your color is coded! 🎨",
            action: "Check it!",
          },
        ],
      },

      // ── Mission 5 — Typography ───────────────────────────────────────────────
      {
        id: 'mission-5',
        number: 5,
        act: 2,
        title: 'Typography Workshop',
        subtitle: 'Fonts have personality',
        concept: 'typography',
        xp: 100,
        badge: null,
        steps: [
          {
            id: 'type-design',
            type: 'visual-builder',
            section: null,
            isStyleUpdate: true,
            teki: "FONTS have personality — Modern = tech & clean, Classic = trust & tradition, Code = geeky & precise. Which fits your brand?",
            fields: [
              { id: 'fontFamily', label: 'Font Style', type: 'select', options: ['sans-serif', 'serif', 'monospace'], labels: ['Modern', 'Classic', 'Code'], storeSubKey: 'fontFamily', hint: 'The overall text personality' },
              { id: 'headingSize', label: 'Heading Size', type: 'select', options: ['2xl', '3xl', '4xl', '5xl'], labels: ['Small', 'Medium', 'Large', 'Huge'], storeSubKey: 'headingSize', hint: 'How bold are your titles?' },
            ],
            action: "Typography done!",
          },
          {
            id: 'type-observe',
            type: 'observation',
            teki: "Feel the difference?",
            tekiMessages: ["Same words — totally different personality. Typography shapes how people FEEL about your content!"],
            autoAdvance: true,
          },
          {
            id: 'type-challenge',
            type: 'code-challenge',
            teki: "Complete the CSS rule that changes the font:",
            language: 'css',
            code: `body {
  ____-family: 'Inter', sans-serif;
  font-____: 16px;
}`,
            answer: `body {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
}`,
            blanks: [{ position: 0, answer: 'font' }, { position: 1, answer: 'size' }],
            explanations: {
              young: "font-family changes the style of text. font-size changes how BIG it is!",
              junior: "font-family sets the typeface. Always include a fallback (like sans-serif) in case the main font doesn't load.",
              senior: "Font stacks: primary font → fallback → generic family. Use system-ui or Inter for modern UI. Load web fonts from Google Fonts or self-host for performance.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Text styled! 📝",
            action: "Check it!",
          },
        ],
      },

      // ── Mission 6 — Button Lab ───────────────────────────────────────────────
      {
        id: 'mission-6',
        number: 6,
        act: 2,
        title: 'Button Lab',
        subtitle: 'Buttons are invitations — design them right',
        concept: 'buttons',
        xp: 120,
        badge: { id: 'designer', label: 'Designer', emoji: '🎨' },
        steps: [
          {
            id: 'button-design',
            type: 'visual-builder',
            section: null,
            isStyleUpdate: true,
            teki: "Pill buttons feel friendly. Sharp corners feel serious. Rounded is in-between. Design your website's button style!",
            fields: [
              { id: 'buttonStyle', label: 'Button Shape', type: 'select', options: ['rounded', 'pill', 'square'], labels: ['Rounded', 'Pill ●', 'Square □'], storeSubKey: 'buttonStyle' },
              { id: 'buttonColor', label: 'Button Color', type: 'color', storeSubKey: 'buttonColor' },
            ],
            action: "Buttons look great!",
          },
          {
            id: 'button-challenge',
            type: 'code-challenge',
            teki: "To make a pill-shaped button, you need border-radius: 999px. Complete it:",
            language: 'css',
            code: `button {
  background: #3b82f6;
  color: white;
  border-______: 999px;
  padding: 12px 24px;
}`,
            answer: `button {
  background: #3b82f6;
  color: white;
  border-radius: 999px;
  padding: 12px 24px;
}`,
            blanks: [{ position: 0, answer: 'radius' }],
            explanations: {
              young: "border-radius rounds the corners! 999px makes it a perfect pill shape.",
              junior: "border-radius controls corner rounding. 0 = sharp corners, 50% = circle/pill, 8px = subtly rounded.",
              senior: "border-radius: 999px is a hack to ensure pill shape regardless of button height. More explicit: border-radius: 9999px or use 50vh.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Buttons polished! ✨",
            action: "Check it!",
          },
          {
            id: 'design-complete',
            type: 'observation',
            teki: "Now THAT is a designed website!",
            tekiMessages: ["Colors, fonts, buttons — all working together. Your website has a real identity now! ✨"],
            autoAdvance: true,
          },
          {
            id: 'act2-complete',
            type: 'act-complete',
            actId: 'act2',
            title: 'ACT 2 Complete!',
            message: "Your website has a real personality now! Time to learn what's actually powering it under the hood.",
            power: { label: 'Designer', emoji: '🎨' },
            xpBonus: 200,
            action: "Show me the language!",
          },
        ],
      },
    ],
  },

  // ── ACT 3 ── Teaching The Website Words ─────────────────────────────────────
  {
    id: 'act3',
    number: 3,
    title: 'Teaching The Website Words',
    tagline: 'Learn HTML — the language of the web',
    color: '#f59e0b',
    emoji: '📝',
    quiz: [
      {
        question: 'What does HTML stand for?',
        options: ['High Tech Markup Layout', 'HyperText Markup Language', 'Home Template Making Language', 'How To Make Links'],
        correct: 1,
        explanation: 'HTML = HyperText Markup Language — the code that gives every webpage its structure.',
      },
      {
        question: 'What is an HTML TAG?',
        options: ['A type of password', 'A color code', 'A label that wraps content to give it meaning', 'A file extension'],
        correct: 2,
        explanation: 'Tags like <h1> or <p> wrap content and tell the browser what that content is.',
      },
      {
        question: 'What does the <h1> tag create?',
        options: ['A button', 'The largest heading on the page', 'A clickable link', 'An image'],
        correct: 1,
        explanation: '<h1> makes the biggest, most important heading — search engines pay special attention to it.',
      },
    ],
    missions: [

      // ── Mission 7 — Decode Your Website ────────────────────────────────────
      {
        id: 'mission-7',
        number: 7,
        act: 3,
        title: 'Decode Your Website',
        subtitle: 'Your website is made of just text',
        concept: 'html-basics',
        xp: 150,
        badge: null,
        steps: [
          {
            id: 'html-intro',
            type: 'teki-message',
            mood: 'excited',
            messages: [
              "Secret revealed: your beautiful website is made entirely of text in angle brackets. It's called HTML — and you're about to read it!",
            ],
            autoAdvance: true,
          },
          {
            id: 'html-h1-challenge',
            type: 'code-challenge',
            teki: "Write an h1 heading with your site name:",
            language: 'html',
            code: `<___>{{name}}</___>`,
            answer: `<h1>{{name}}</h1>`,
            blanks: [{ position: 0, answer: 'h1' }, { position: 1, answer: 'h1' }],
            explanations: {
              young: "Type h1 in both blanks — opening <h1> and closing </h1>!",
              junior: "HTML tags wrap content: <h1> opens, </h1> closes. The / in the closing tag is important!",
              senior: "Heading tags h1–h6 create a semantic document outline. Use them for structure, not just visual sizing.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "You wrote HTML! 🎉",
            action: "Check it!",
          },
          {
            id: 'html-p-challenge',
            type: 'code-challenge',
            teki: "Paragraphs use a <p> tag. Write a short description:",
            language: 'html',
            code: `<___>Welcome to {{name}} — a site about {{topic}}!</___>`,
            answer: `<p>Welcome to {{name}} — a site about {{topic}}!</p>`,
            blanks: [{ position: 0, answer: 'p' }, { position: 1, answer: 'p' }],
            explanations: {
              young: "<p> is for paragraphs — regular text like sentences in a book!",
              junior: "<p> creates a paragraph with automatic spacing above and below. It's the go-to tag for body text.",
              senior: "<p> is a block-level element. Browsers apply default margins. Use CSS to control spacing explicitly.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Paragraph perfect! ✅",
            action: "Check it!",
          },
          {
            id: 'html-link-challenge',
            type: 'code-challenge',
            teki: "Links use a special tag. Write a link to your homepage:",
            language: 'html',
            code: `<_ href="/">Go Home</_>`,
            answer: `<a href="/">Go Home</a>`,
            blanks: [{ position: 0, answer: 'a' }, { position: 1, answer: 'a' }],
            explanations: {
              young: "The <a> tag is the LINK tag! 'a' stands for anchor — like dropping an anchor on a page you want to find again.",
              junior: "<a href='url'> creates a hyperlink. href is the address it goes to. / means the homepage.",
              senior: "<a> is an inline element. href can be absolute (https://...) or relative (/path). Use target='_blank' with rel='noopener' for external links.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Link built! 🔗",
            action: "Check it!",
          },
        ],
      },

      // ── Mission 8 — Nesting & Structure ─────────────────────────────────────
      {
        id: 'mission-8',
        number: 8,
        act: 3,
        title: 'Boxes Inside Boxes',
        subtitle: 'HTML is organized like Russian dolls',
        concept: 'nesting',
        xp: 130,
        badge: null,
        steps: [
          {
            id: 'div-challenge',
            type: 'code-challenge',
            teki: "Wrap this content in a div with class 'card':",
            language: 'html',
            code: `<___ class="____">
  <h2>Space Paws</h2>
  <p>Cats in space!</p>
</___>`,
            answer: `<div class="card">
  <h2>Space Paws</h2>
  <p>Cats in space!</p>
</div>`,
            blanks: [{ position: 0, answer: 'div' }, { position: 1, answer: 'card' }, { position: 2, answer: 'div' }],
            explanations: {
              young: "Tag = div, class name = card. The closing tag </div> matches the opening <div>!",
              junior: "class='card' names this div so CSS can target it with .card. The value in the class attribute is up to you.",
              senior: "class values are case-sensitive and space-separated for multiple classes. Use BEM naming for large projects.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Structured like a pro! 🗂️",
            action: "Check it!",
          },
          {
            id: 'img-challenge',
            type: 'code-challenge',
            teki: "Images are tricky — they're self-closing. Complete this image tag:",
            language: 'html',
            code: `<___ src="fluffy.jpg" ___="A golden retriever" />`,
            answer: `<img src="fluffy.jpg" alt="A golden retriever" />`,
            blanks: [{ position: 0, answer: 'img' }, { position: 1, answer: 'alt' }],
            explanations: {
              young: "img shows pictures! The alt text is a description for people who can't see images.",
              junior: "<img> is a void element — no closing tag. src is the image path, alt is accessibility text for screen readers.",
              senior: "Always include descriptive alt text for WCAG compliance. Empty alt='' for decorative images tells screen readers to skip them.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Image tagged! 🖼️",
            action: "Check it!",
          },
        ],
      },

      // ── Mission 9 — Page Architecture ───────────────────────────────────────
      {
        id: 'mission-9',
        number: 9,
        act: 3,
        title: 'The Full Picture',
        subtitle: 'How a complete HTML page is structured',
        concept: 'page-structure',
        xp: 140,
        badge: { id: 'html-coder', label: 'HTML Coder', emoji: '📝' },
        steps: [
          {
            id: 'head-challenge',
            type: 'code-challenge',
            teki: "Where does the page TITLE go? In <head> or <body>?",
            language: 'html',
            code: `<html>
  <____>
    <title>{{name}}</title>
  </____>
  <body>...</body>
</html>`,
            answer: `<html>
  <head>
    <title>{{name}}</title>
  </head>
  <body>...</body>
</html>`,
            blanks: [{ position: 0, answer: 'head' }, { position: 1, answer: 'head' }],
            explanations: {
              young: "<head> holds the title — it shows in the browser tab but not on the page itself!",
              junior: "<title> goes inside <head>. It appears in the browser tab, bookmarks, and search engine results.",
              senior: "<title> is a critical SEO element. Keep it under 60 characters, include the primary keyword, avoid duplicates across pages.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Architecture understood! 🏛️",
            action: "Check it!",
          },
          {
            id: 'semantic-challenge',
            type: 'code-challenge',
            teki: "The main content of your page goes inside which tag?",
            language: 'html',
            code: `<body>
  <header>Nav goes here</header>
  <____>Page content goes here</____>
  <footer>Copyright goes here</footer>
</body>`,
            answer: `<body>
  <header>Nav goes here</header>
  <main>Page content goes here</main>
  <footer>Copyright goes here</footer>
</body>`,
            blanks: [{ position: 0, answer: 'main' }, { position: 1, answer: 'main' }],
            explanations: {
              young: "<main> is where the real stuff goes — the main content that visitors came to see!",
              junior: "<main> wraps the primary content of the page. There should only be one <main> per page.",
              senior: "<main> is a semantic landmark that assistive technologies use to jump to primary content. Skip navigation links often target it.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Full page structured! 🎯",
            action: "Check it!",
          },
          {
            id: 'act3-complete',
            type: 'act-complete',
            actId: 'act3',
            title: 'ACT 3 Complete!',
            message: "You can read AND write HTML! You understand tags, nesting, attributes, and page structure. Now let's give your website a memory.",
            power: { label: 'HTML Coder', emoji: '📝' },
            xpBonus: 200,
            action: "Give it memory!",
          },
        ],
      },
    ],
  },

  // ── ACT 4 ── Giving The Website Memory ──────────────────────────────────────
  {
    id: 'act4',
    number: 4,
    title: 'Giving The Website Memory',
    tagline: 'Variables — secret boxes for data',
    color: '#10b981',
    emoji: '🧠',
    quiz: [
      {
        question: 'What is a VARIABLE in code?',
        options: ['A type of error message', 'A named box that stores a value', 'A website color code', 'A kind of button'],
        correct: 1,
        explanation: 'A variable is like a labeled box — you give it a name and store a value inside it.',
      },
      {
        question: 'Which is the correct way to create a variable in JavaScript?',
        options: ['create color = "blue"', 'variable color: "blue"', 'let color = "blue"', 'set color = "blue"'],
        correct: 2,
        explanation: 'In JavaScript you declare variables with let (or const/var). The syntax is: let name = value.',
      },
      {
        question: 'What happens when you change a variable\'s value?',
        options: ['The code crashes', 'Nothing changes on the page', 'All places that use it update automatically', 'It creates a brand-new file'],
        correct: 2,
        explanation: 'That\'s the power of variables — change the value once and everywhere it\'s used reflects the new value.',
      },
    ],
    missions: [

      // ── Mission 10 — Secret Boxes ────────────────────────────────────────────
      {
        id: 'mission-10',
        number: 10,
        act: 4,
        title: 'Secret Boxes',
        subtitle: 'Variables are named containers for data',
        concept: 'variables',
        xp: 160,
        badge: null,
        steps: [
          {
            id: 'var-declare-challenge',
            type: 'code-challenge',
            teki: "Create a variable to track how many visitors your site has:",
            language: 'javascript',
            code: `___ visitorCount = 0;`,
            answer: `let visitorCount = 0;`,
            blanks: [{ position: 0, answer: 'let' }],
            explanations: {
              young: "Type 'let' to open a new box! Then give it the name 'visitorCount' and start at 0.",
              junior: "'let' declares a variable. The = sign assigns the starting value. Starting at 0 makes sense for a counter.",
              senior: "Use 'const' if you'd use 'let' to store an object or array that you mutate without reassigning. Reserve 'let' for primitives that get reassigned.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Variable created! 📦",
            action: "Check it!",
          },
          {
            id: 'var-update-challenge',
            type: 'code-challenge',
            teki: "A visitor arrived! Add 1 to the count:",
            language: 'javascript',
            code: `let visitorCount = 0;

// A visitor arrived!
visitorCount = visitorCount ___ 1;

console.log(visitorCount); // should show 1`,
            answer: `let visitorCount = 0;

// A visitor arrived!
visitorCount = visitorCount + 1;

console.log(visitorCount); // should show 1`,
            blanks: [{ position: 0, answer: '+' }],
            explanations: {
              young: "Use + to add! visitorCount = visitorCount + 1 means 'take the old count and add 1 to it'.",
              junior: "Reassigning a variable: the right side is evaluated first, then stored. visitorCount += 1 is shorthand.",
              senior: "visitorCount++ is idiomatic. ++visitorCount and visitorCount++ differ in when the increment happens — be careful in expressions.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Counter works! 🧮",
            action: "Check it!",
          },
          {
            id: 'var-types-challenge',
            type: 'code-challenge',
            teki: "Variables can hold different types of data. Complete this:",
            language: 'javascript',
            code: `let name    = "{{name}}";    // ___ (in quotes)
let count   = 42;              // ___ (no quotes)
let isLive  = true;            // ___ (true or false)`,
            answer: `let name    = "{{name}}";    // string (in quotes)
let count   = 42;              // number (no quotes)
let isLive  = true;            // boolean (true or false)`,
            blanks: [{ position: 0, answer: 'string' }, { position: 1, answer: 'number' }, { position: 2, answer: 'boolean' }],
            explanations: {
              young: "Text = string (has quotes). Numbers = number. Yes/No = boolean (true or false)!",
              junior: "JavaScript has 3 primitive types you'll use most: string (text), number (any number), boolean (true/false).",
              senior: "Primitives: string, number, bigint, boolean, undefined, null, symbol. Objects and arrays are reference types. typeof operator reveals the type.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Types mastered! 🧠",
            action: "Check it!",
          },
        ],
      },

      // ── Mission 11 — Dynamic Website ─────────────────────────────────────────
      {
        id: 'mission-11',
        number: 11,
        act: 4,
        title: 'Wiring Variables to Your Website',
        subtitle: 'Change a variable — the website updates',
        concept: 'dom-variables',
        xp: 160,
        badge: { id: 'memory-master', label: 'Memory Master', emoji: '🧠' },
        steps: [
          {
            id: 'queryselector-challenge',
            type: 'code-challenge',
            teki: "Find the hero heading (h1) and update its text:",
            language: 'javascript',
            code: `let headline = "{{headline}}";

document.____________('h1').textContent = headline;`,
            answer: `let headline = "{{headline}}";

document.querySelector('h1').textContent = headline;`,
            blanks: [{ position: 0, answer: 'querySelector' }],
            explanations: {
              young: "querySelector is the 'finder' — it searches your page for a specific element!",
              junior: "querySelector('h1') finds the first h1 element. You can use any CSS selector: '#id', '.class', 'tag'.",
              senior: "querySelector returns null if not found — always check or use optional chaining: document.querySelector('h1')?.textContent",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Element found! 🔍",
            action: "Check it!",
          },
          {
            id: 'textcontent-challenge',
            type: 'code-challenge',
            teki: "Now put the site description into the <p> tag under your headline:",
            language: 'javascript',
            code: `let description = "{{subtext}}";

document.querySelector('p').___________ = description;`,
            answer: `let description = "{{subtext}}";

document.querySelector('p').textContent = description;`,
            blanks: [{ position: 0, answer: 'textContent' }],
            explanations: {
              young: "textContent puts your text INTO the element — like filling a container!",
              junior: ".textContent is a property you can read (get the current text) or write (change the text).",
              senior: "Alternatively: .innerText (respects CSS visibility), .innerHTML (parses HTML). textContent is fastest and safest for plain text.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Website is dynamic! ⚡",
            action: "Check it!",
          },
          {
            id: 'act4-complete',
            type: 'act-complete',
            actId: 'act4',
            title: 'ACT 4 Complete!',
            message: "Your website now has memory — it stores and displays data. Next: teach it to THINK and make decisions!",
            power: { label: 'Memory Master', emoji: '🧠' },
            xpBonus: 200,
            action: "Teach it to think!",
          },
        ],
      },
    ],
  },

  // ── ACT 5 ── Teaching The Website To Think ──────────────────────────────────
  {
    id: 'act5',
    number: 5,
    title: 'Teaching The Website To Think',
    tagline: 'Conditions — the power of decision making',
    color: '#8b5cf6',
    emoji: '🤔',
    quiz: [
      {
        question: 'What does an IF statement do?',
        options: ['Loops through a list of items', 'Runs code ONLY when a condition is true', 'Stores data in a variable', 'Defines a reusable function'],
        correct: 1,
        explanation: 'An if statement checks a condition — if it\'s true, the code inside runs; otherwise it\'s skipped.',
      },
      {
        question: 'Which keyword handles the "otherwise" case in an if statement?',
        options: ['else', 'unless', 'when', 'other'],
        correct: 0,
        explanation: 'else runs when the if condition is false — it\'s the fallback plan.',
      },
      {
        question: 'Which expression is TRUE in JavaScript?',
        options: ['"cat" === "dog"', '5 > 10', '3 < 7', '1 === 2'],
        correct: 2,
        explanation: '3 is less than 7, so 3 < 7 evaluates to true.',
      },
    ],
    missions: [

      // ── Mission 12 — If This, Then That ─────────────────────────────────────
      {
        id: 'mission-12',
        number: 12,
        act: 5,
        title: 'If This, Then That',
        subtitle: 'Make your website make decisions',
        concept: 'conditionals',
        xp: 160,
        badge: null,
        steps: [
          {
            id: 'if-keyword-challenge',
            type: 'code-challenge',
            teki: "Start the decision. What keyword begins an if statement?",
            language: 'javascript',
            code: `let score = 95;

___ (score >= 90) {
  grade = "A+";
}`,
            answer: `let score = 95;

if (score >= 90) {
  grade = "A+";
}`,
            blanks: [{ position: 0, answer: 'if' }],
            explanations: {
              young: "Type 'if' — it starts every decision in JavaScript!",
              junior: "if (condition) { ... } — the condition is inside parentheses, the code to run is inside curly braces.",
              senior: "if evaluates the expression to a truthy/falsy value. Any non-zero, non-empty, non-null, non-undefined value is truthy.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Decision started! ✅",
            action: "Check it!",
          },
          {
            id: 'else-challenge',
            type: 'code-challenge',
            teki: "Now add the fallback — what runs when the condition is FALSE?",
            language: 'javascript',
            code: `let score = 72;

if (score >= 90) {
  grade = "A+";
} ____ {
  grade = "Keep trying!";
}`,
            answer: `let score = 72;

if (score >= 90) {
  grade = "A+";
} else {
  grade = "Keep trying!";
}`,
            blanks: [{ position: 0, answer: 'else' }],
            explanations: {
              young: "Type 'else' — it means 'otherwise do THIS'!",
              junior: "else is the fallback block. If the if condition is false, else runs instead.",
              senior: "Avoid deep if/else nesting. Consider early returns, guard clauses, or lookup tables for complex branching.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Fallback added! 🔀",
            action: "Check it!",
          },
          {
            id: 'comparison-challenge',
            type: 'code-challenge',
            teki: "Use STRICT equality to check if the visitor's name matches:",
            language: 'javascript',
            code: `let visitor = "Alex";

if (visitor ___ "Alex") {
  message = "Welcome back, Alex! 👋";
}`,
            answer: `let visitor = "Alex";

if (visitor === "Alex") {
  message = "Welcome back, Alex! 👋";
}`,
            blanks: [{ position: 0, answer: '===' }],
            explanations: {
              young: "=== means 'exactly equal'. Three equals signs checks both the value AND the type!",
              junior: "=== is strict equality — checks value AND type. == does type coercion (dangerous!). Always use ===.",
              senior: "=== is referentially equal for primitives. For objects/arrays, === checks same reference in memory, not deep equality.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Comparison nailed! 🎯",
            action: "Check it!",
          },
        ],
      },

      // ── Mission 13 — Smart Homepage ──────────────────────────────────────────
      {
        id: 'mission-13',
        number: 13,
        act: 5,
        title: 'Smart Homepage',
        subtitle: 'Build a time-aware greeting for your site',
        concept: 'conditional-logic',
        xp: 160,
        badge: { id: 'logic-thinker', label: 'Logic Thinker', emoji: '🤔' },
        steps: [
          {
            id: 'elseif-challenge',
            type: 'code-challenge',
            teki: "Add the middle case — afternoon — between morning and evening:",
            language: 'javascript',
            code: `if (hour < 12) {
  greeting = "Good morning! ☀️";
} ____ __  (hour < 18) {
  greeting = "Good afternoon! 🌤️";
} else {
  greeting = "Good evening! 🌙";
}`,
            answer: `if (hour < 12) {
  greeting = "Good morning! ☀️";
} else if (hour < 18) {
  greeting = "Good afternoon! 🌤️";
} else {
  greeting = "Good evening! 🌙";
}`,
            blanks: [{ position: 0, answer: 'else' }, { position: 1, answer: 'if' }],
            explanations: {
              young: "Type 'else' then 'if' — it's like saying 'otherwise, IF it's before 6pm, show afternoon!'",
              junior: "'else if' creates a chained condition. The space between 'else' and 'if' matters!",
              senior: "Chains of else-if evaluate sequentially. Since we already checked hour < 12 above, hour < 18 here implicitly means 12 ≤ hour < 18.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Smart greeting built! 🕐",
            action: "Check it!",
          },
          {
            id: 'dom-update-challenge',
            type: 'code-challenge',
            teki: "Now put the greeting onto the page — find the #greeting element and update it:",
            language: 'javascript',
            code: `let greeting = "Good morning! ☀️";

document.querySelector('___________').textContent = greeting;`,
            answer: `let greeting = "Good morning! ☀️";

document.querySelector('#greeting').textContent = greeting;`,
            blanks: [{ position: 0, answer: '#greeting' }],
            explanations: {
              young: "Use #greeting to find the element with id='greeting'. The # means 'look for an ID'!",
              junior: "# targets an ID in CSS selectors. querySelector('#greeting') finds the element with id='greeting'.",
              senior: "IDs should be unique per page. getElementById('greeting') is slightly faster but querySelector is more flexible. Use class selectors for reusable patterns.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Page updated dynamically! 🏠",
            action: "Check it!",
          },
          {
            id: 'act5-complete',
            type: 'act-complete',
            actId: 'act5',
            title: 'ACT 5 Complete!',
            message: "Your website can now THINK — it reads the situation and decides what to show. Next: make it respond to the people clicking it!",
            power: { label: 'Logic Thinker', emoji: '🤔' },
            xpBonus: 200,
            action: "Make it react!",
          },
        ],
      },
    ],
  },

  // ── ACT 6 ── Bringing It To Life ─────────────────────────────────────────────
  {
    id: 'act6',
    number: 6,
    title: 'Bringing It To Life',
    tagline: 'Events — make it respond',
    color: '#ef4444',
    emoji: '⚡',
    quiz: [
      {
        question: 'What is a DOM EVENT?',
        options: ['A database entry', 'Something that happens when the user interacts — click, type, hover', 'A CSS property', 'A special file type'],
        correct: 1,
        explanation: 'DOM events fire when users interact with the page — every click, keypress, and scroll is an event.',
      },
      {
        question: 'Which event fires when a user CLICKS a button?',
        options: ['onHover', 'onType', 'onClick', 'onLoad'],
        correct: 2,
        explanation: 'onClick is the most common event — it fires every time the element is clicked.',
      },
      {
        question: 'What does addEventListener do?',
        options: ['Adds a new HTML element to the page', 'Removes a CSS style', 'Connects a function to run when a specific event happens', 'Creates a new variable'],
        correct: 2,
        explanation: 'addEventListener wires an element to a function so your code reacts when that event fires.',
      },
    ],
    missions: [

      // ── Mission 14 — Wake Up That Button ────────────────────────────────────
      {
        id: 'mission-14',
        number: 14,
        act: 6,
        title: 'Wake Up That Button',
        subtitle: 'Make the hero button actually do something',
        concept: 'click-events',
        xp: 160,
        badge: null,
        steps: [
          {
            id: 'dead-button',
            type: 'teki-message',
            mood: 'thinking',
            messages: [
              "Try clicking your hero button in the preview right now. Go on... it does absolutely nothing. Let's fix that!",
            ],
            autoAdvance: true,
          },
          {
            id: 'addeventlistener-challenge',
            type: 'code-challenge',
            teki: "Complete the code to make the button listen for clicks:",
            language: 'javascript',
            code: `let btn = document.querySelector('button');

btn._____________('click', function() {
  alert("Hello from {{name}}!");
});`,
            answer: `let btn = document.querySelector('button');

btn.addEventListener('click', function() {
  alert("Hello from {{name}}!");
});`,
            blanks: [{ position: 0, answer: 'addEventListener' }],
            explanations: {
              young: "Type addEventListener — it's the magic that says 'listen for a click!'",
              junior: "addEventListener is a method on DOM elements. It attaches an event listener that fires the callback when the event occurs.",
              senior: "addEventListener is non-destructive — you can attach multiple listeners to the same event. onclick = fn only allows one listener.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Button is awake! ⚡",
            action: "Check it!",
          },
          {
            id: 'event-type-challenge',
            type: 'code-challenge',
            teki: "The first argument to addEventListener is the event TYPE. Complete it:",
            language: 'javascript',
            code: `btn.addEventListener('_____', function() {
  btn.textContent = "Clicked! 🎉";
});`,
            answer: `btn.addEventListener('click', function() {
  btn.textContent = "Clicked! 🎉";
});`,
            blanks: [{ position: 0, answer: 'click' }],
            explanations: {
              young: "Type 'click' — it means 'run this when someone clicks'!",
              junior: "'click' fires on mouse click. Other events: 'mouseover' (hover), 'keydown' (key press), 'submit' (form submit).",
              senior: "Event types are strings. Common: 'click', 'input', 'change', 'submit', 'keydown', 'keyup', 'mouseenter', 'mouseleave', 'focus', 'blur'.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Event type set! 🖱️",
            action: "Check it!",
          },
        ],
      },

      // ── Mission 15 — Talk to Visitors ────────────────────────────────────────
      {
        id: 'mission-15',
        number: 15,
        act: 6,
        title: 'Talk to Visitors',
        subtitle: 'Read what users type with .value',
        concept: 'inputs',
        xp: 160,
        badge: null,
        steps: [
          {
            id: 'value-challenge',
            type: 'code-challenge',
            teki: "Grab what the user typed in the input field:",
            language: 'javascript',
            code: `let name = document.querySelector('#nameInput')._____;`,
            answer: `let name = document.querySelector('#nameInput').value;`,
            blanks: [{ position: 0, answer: 'value' }],
            explanations: {
              young: "Type .value — it's like reading what's inside the input box!",
              junior: ".value is a property on input elements. It returns the current text the user typed.",
              senior: ".value returns a string for text inputs. For checkboxes, use .checked. For select, use .value (the selected option's value attribute).",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Input read! 📥",
            action: "Check it!",
          },
          {
            id: 'concatenation-challenge',
            type: 'code-challenge',
            teki: "Now build the greeting by joining strings together with +:",
            language: 'javascript',
            code: `let name = "Alex";
let greeting = "Hello, " ___ name ___ "! Welcome to {{name}}.";`,
            answer: `let name = "Alex";
let greeting = "Hello, " + name + "! Welcome to {{name}}.";`,
            blanks: [{ position: 0, answer: '+' }, { position: 1, answer: '+' }],
            explanations: {
              young: "The + between text pieces glues them together like puzzle pieces! 'Hello, ' + 'Alex' = 'Hello, Alex'.",
              junior: "String concatenation with +. Alternatively, template literals are cleaner: `Hello, ${name}! Welcome to {{name}}.`",
              senior: "Template literals (backtick strings) are preferred over + concatenation. They're more readable and handle newlines naturally.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Strings joined! 🔗",
            action: "Check it!",
          },
        ],
      },

      // ── Mission 16 — The Like Counter ────────────────────────────────────────
      {
        id: 'mission-16',
        number: 16,
        act: 6,
        title: 'The Like Counter',
        subtitle: 'Variables + events + DOM updates — all together',
        concept: 'state-pattern',
        xp: 200,
        badge: { id: 'action-creator', label: 'Action Creator', emoji: '⚡' },
        steps: [
          {
            id: 'increment-challenge',
            type: 'code-challenge',
            teki: "A user liked your post! Add 1 to the likes count:",
            language: 'javascript',
            code: `let likes = 0;

// User clicked the like button!
likes = likes ___ 1;`,
            answer: `let likes = 0;

// User clicked the like button!
likes = likes + 1;`,
            blanks: [{ position: 0, answer: '+' }],
            explanations: {
              young: "Use + to add 1! likes + 1 means 'take the current likes and add one more'.",
              junior: "likes = likes + 1 reads likes, adds 1, stores the result back in likes. Shorthand: likes += 1 or likes++.",
              senior: "likes++ is most idiomatic. In React you'd use setLikes(prev => prev + 1) to avoid stale closure issues.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Like counted! ❤️",
            action: "Check it!",
          },
          {
            id: 'full-counter-challenge',
            type: 'code-challenge',
            teki: "Put it all together! Complete the full like button:",
            language: 'javascript',
            code: `let likes = 0;

document.querySelector('#likeBtn').___________('click', () => {
  likes = likes + 1;
  document.querySelector('#count').__________ = likes;
});`,
            answer: `let likes = 0;

document.querySelector('#likeBtn').addEventListener('click', () => {
  likes = likes + 1;
  document.querySelector('#count').textContent = likes;
});`,
            blanks: [{ position: 0, answer: 'addEventListener' }, { position: 1, answer: 'textContent' }],
            explanations: {
              young: "addEventListener listens for the click, textContent shows the result!",
              junior: "addEventListener wires the event. textContent sets the visible text. Together they make the button interactive.",
              senior: "Consider using a dedicated render function instead of inline DOM updates — makes the pattern clearer and easier to extend.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Like button is LIVE! ⚡",
            action: "Check it!",
          },
          {
            id: 'act6-complete',
            type: 'act-complete',
            actId: 'act6',
            title: 'ACT 6 Complete!',
            message: "Your website reacts, responds, and remembers user actions! That's interactive programming. Next: work with collections of data!",
            power: { label: 'Action Creator', emoji: '⚡' },
            xpBonus: 200,
            action: "Show me collections!",
          },
        ],
      },
    ],
  },

  // ── ACT 7 ── Working With Collections ───────────────────────────────────────
  {
    id: 'act7',
    number: 7,
    title: 'Working With Collections',
    tagline: 'Arrays and loops',
    color: '#06b6d4',
    emoji: '📦',
    quiz: [
      {
        question: 'What is an ARRAY?',
        options: ['A single number', 'A type of image', 'An ordered list of values stored in one variable', 'A website link'],
        correct: 2,
        explanation: 'An array is a list — like [1, 2, 3] or ["red", "blue", "green"] — stored under one name.',
      },
      {
        question: 'How do you access the FIRST item in an array?',
        options: ['array[1]', 'array.first', 'array[0]', 'array.get(1)'],
        correct: 2,
        explanation: 'Arrays start counting from 0, so the first item is always at index [0].',
      },
      {
        question: 'What does array.push() do?',
        options: ['Removes the first item', 'Adds a new item to the end of the array', 'Sorts the array alphabetically', 'Counts how many items there are'],
        correct: 1,
        explanation: 'push() appends a new value to the end — making the array one item longer.',
      },
    ],
    missions: [

      // ── Mission 17 — Your Collection ────────────────────────────────────────
      {
        id: 'mission-17',
        number: 17,
        act: 7,
        title: 'Your Collection',
        subtitle: 'Arrays hold ordered lists of data',
        concept: 'arrays',
        xp: 160,
        badge: null,
        steps: [
          {
            id: 'array-design',
            type: 'visual-builder',
            section: 'features',
            isStyleUpdate: false,
            teki: "What are 4 things about your website or topic? Add them — they'll become a gallery of cards!",
            fields: [
              {
                id: 'featureList',
                label: 'Your items',
                type: 'tags',
                storeSubKey: 'featureList',
                suggestions: ['Design', 'Code', 'Create', 'Learn', 'Build', 'Share', 'Explore', 'Inspire'],
                hint: 'Type and press Enter for each item',
              },
            ],
            action: "Items added!",
          },
          {
            id: 'array-index-challenge',
            type: 'code-challenge',
            teki: "Get the SECOND item from the array (remember: counting starts at 0!):",
            language: 'javascript',
            code: `let skills = ["design", "code", "create", "share"];

let second = skills[_];  // should be "code"`,
            answer: `let skills = ["design", "code", "create", "share"];

let second = skills[1];  // should be "code"`,
            blanks: [{ position: 0, answer: '1' }],
            explanations: {
              young: "The SECOND item is at position 1, because counting starts at 0! skills[0]=design, skills[1]=code.",
              junior: "Index 1 = second item. Zero-indexing is universal in programming — the first index is always 0.",
              senior: "Zero-indexing comes from C where arrays were implemented as pointer arithmetic. The index is the offset from the start.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Index mastered! 🎯",
            action: "Check it!",
          },
          {
            id: 'push-challenge',
            type: 'code-challenge',
            teki: "Add a new item to the END of the array:",
            language: 'javascript',
            code: `let skills = ["design", "code", "create"];

skills.____("inspire");

console.log(skills.length); // should show 4`,
            answer: `let skills = ["design", "code", "create"];

skills.push("inspire");

console.log(skills.length); // should show 4`,
            blanks: [{ position: 0, answer: 'push' }],
            explanations: {
              young: "push() adds a new item to the END of the list — like pushing a new book onto a shelf!",
              junior: "array.push(item) appends to the end and returns the new length. Its opposite is pop() which removes the last item.",
              senior: "push() mutates the original array. For immutable patterns (React state, Redux), use spread: [...skills, 'inspire'] instead.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Item added! ➕",
            action: "Check it!",
          },
        ],
      },

      // ── Mission 18 — Automatic Gallery ──────────────────────────────────────
      {
        id: 'mission-18',
        number: 18,
        act: 7,
        title: 'Automatic Gallery',
        subtitle: 'Loops do repetitive work automatically',
        concept: 'loops',
        xp: 180,
        badge: { id: 'data-collector', label: 'Data Collector', emoji: '📦' },
        steps: [
          {
            id: 'foreach-challenge',
            type: 'code-challenge',
            teki: "Call forEach to loop through every item in the array:",
            language: 'javascript',
            code: `let skills = ["design", "code", "create"];

skills._______(function(skill) {
  console.log(skill);
});`,
            answer: `let skills = ["design", "code", "create"];

skills.forEach(function(skill) {
  console.log(skill);
});`,
            blanks: [{ position: 0, answer: 'forEach' }],
            explanations: {
              young: "Type forEach — it means 'for EACH item, do this'!",
              junior: "array.forEach(fn) calls fn once for each item. The item is passed automatically as the first argument.",
              senior: "forEach receives (currentValue, index, array) in the callback. The index is useful for showing numbered lists.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Loop running! 🔄",
            action: "Check it!",
          },
          {
            id: 'createElement-challenge',
            type: 'code-challenge',
            teki: "Inside the loop, create a new div for each skill:",
            language: 'javascript',
            code: `skills.forEach(function(skill) {
  let card = document.____________('div');
  card.textContent = skill;
  document.querySelector('#gallery').appendChild(card);
});`,
            answer: `skills.forEach(function(skill) {
  let card = document.createElement('div');
  card.textContent = skill;
  document.querySelector('#gallery').appendChild(card);
});`,
            blanks: [{ position: 0, answer: 'createElement' }],
            explanations: {
              young: "createElement makes a brand-new HTML element! 'div' is the type — you can make any HTML tag.",
              junior: "document.createElement(tag) creates a new DOM node in memory. Use appendChild to add it to the page.",
              senior: "createElement + appendChild triggers layout — avoid inside large loops. Use document fragment or innerHTML for batch DOM updates.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "Gallery builds itself! 🎴",
            action: "Check it!",
          },
          {
            id: 'act7-complete',
            type: 'act-complete',
            actId: 'act7',
            title: 'ACT 7 Complete!',
            message: "Arrays + loops = automatic content generation! Add one item to an array, one more card appears. That's the power of data-driven web development.",
            power: { label: 'Data Collector', emoji: '📦' },
            xpBonus: 200,
            action: "Teach it skills!",
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
            code: `________ double(number) {
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
  ______ "Hello, " + name + "!";
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

let message = _____("{{name}}");
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

let randomIndex = Math._____(Math.random() * words.length);
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
  ______ adj + " " + noun;
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
