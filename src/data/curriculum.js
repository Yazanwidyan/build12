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
    missions: [
      // ── Mission 1 ─────────────────────────────────────────────────────────
      {
        id: 'mission-1',
        number: 1,
        act: 1,
        title: 'The Blueprint',
        subtitle: 'Every great website starts with an idea',
        concept: 'setup',
        xp: 80,
        badge: null,
        steps: [
          {
            id: 'blueprint-reveal',
            type: 'observation',
            teki: "Uh oh...",
            tekiMessages: [
              "Your website is empty! Let's build the 3 blocks every site needs: Header, Hero, and Footer. 🔨",
            ],
            showBlueprint: true,
            autoAdvance: true,
          },
        ],
      },

      // ── Mission 2 ─────────────────────────────────────────────────────────
      {
        id: 'mission-2',
        number: 2,
        act: 1,
        title: 'The Missing Entrance',
        subtitle: 'Build your header',
        concept: 'header',
        xp: 100,
        badge: { id: 'first-section', label: 'First Section', emoji: '🚪' },
        steps: [
          {
            id: 'header-intro',
            type: 'teki-message',
            mood: 'thinking',
            highlight: 'header',
            messages: [
              "Every website needs a HEADER — the sign that tells visitors where they are!",
            ],
            autoAdvance: true,
          },
          {
            id: 'header-explain',
            type: 'teki-message',
            mood: 'happy',
            highlight: 'header',
            messages: [
              "A header shows your site name and navigation links at the very top of every page.",
            ],
            autoAdvance: true,
          },
          {
            id: 'canvas-header-title',
            type: 'canvas-input',
            highlight: 'header',
            teki: "See that empty bar at the top? Click right on it and type your website name!",
            canvasInput: {
              fieldKey: 'header-title',
              section: 'header',
              storeKey: 'title',
              label: 'Site name',
              placeholder: 'My Awesome Website…',
            },
            action: "That's my name!",
          },
          {
            id: 'canvas-header-nav',
            type: 'canvas-input',
            highlight: 'header',
            teki: "Now add your navigation links — these help visitors move around your site. Type them separated by commas!",
            canvasInput: {
              fieldKey: 'header-nav',
              section: 'header',
              storeKey: 'navLinks',
              label: 'Nav links',
              placeholder: 'Home, About, Contact…',
              isArray: true,
            },
            buildSectionOnComplete: 'header',
            action: "Header is done!",
          },
          {
            id: 'header-built',
            type: 'observation',
            teki: "LOOK AT THAT!",
            tekiMessages: [
              "Your website has an entrance now! 🎉",
            ],
            highlightSection: 'header',
            autoAdvance: true,
          },
          {
            id: 'header-code-reveal',
            type: 'code-reveal',
            teki: "Want to see what builders write to create a header?",
            language: 'html',
            codeTemplate: `<header>
  <h1>{{name}}</h1>
  <nav>
    <a href="#">Home</a>
    <a href="#">About</a>
  </nav>
</header>`,
            explanations: {
              young: "<header> is like a magic label that says 'this is the top part'!",
              junior: "The <header> tag wraps your title and navigation. <h1> is for the most important heading.",
              senior: "<header> is a semantic HTML5 element. <h1> is the top-level heading — there should only be one per page.",
            },
            ageExposure: { young: 'read-only', junior: 'read-only', senior: 'read-only' },
            autoAdvance: true,
          },
        ],
      },

      // ── Mission 3 ─────────────────────────────────────────────────────────
      {
        id: 'mission-3',
        number: 3,
        act: 1,
        title: 'First Impressions Matter',
        subtitle: 'Build your hero section',
        concept: 'hero',
        xp: 120,
        badge: null,
        steps: [
          {
            id: 'hero-intro',
            type: 'teki-message',
            mood: 'excited',
            highlight: 'hero',
            messages: [
              "The HERO section is visitors' very first impression — let's make it unforgettable!",
            ],
            autoAdvance: true,
          },
          {
            id: 'canvas-hero-headline',
            type: 'canvas-input',
            highlight: 'hero',
            teki: "That big empty space in the middle is your hero section. Click on it and write your big bold headline — what's the first thing visitors should read?",
            canvasInput: {
              fieldKey: 'hero-headline',
              section: 'hero',
              storeKey: 'headline',
              label: 'Big headline',
              placeholder: 'Welcome to my world!',
            },
            action: "Love it!",
          },
          {
            id: 'canvas-hero-subtext',
            type: 'canvas-input',
            highlight: 'hero',
            teki: "Now add a short description below your headline — tell visitors what your site is about!",
            canvasInput: {
              fieldKey: 'hero-subtext',
              section: 'hero',
              storeKey: 'subtext',
              label: 'Description',
              placeholder: 'A short description…',
            },
            action: "Perfect!",
          },
          {
            id: 'canvas-hero-button',
            type: 'canvas-input',
            highlight: 'hero',
            teki: "Every hero needs a call-to-action button! What should it say? 'Explore', 'Let's go', or something unique?",
            canvasInput: {
              fieldKey: 'hero-button',
              section: 'hero',
              storeKey: 'buttonText',
              label: 'Button text',
              placeholder: 'Explore',
            },
            buildSectionOnComplete: 'hero',
            action: "Hero is ready!",
          },
          {
            id: 'hero-built',
            type: 'observation',
            teki: "Now THAT'S a first impression!",
            tekiMessages: [
              "Now THAT'S a first impression! ✨",
            ],
            highlightSection: 'hero',
            autoAdvance: true,
          },
          {
            id: 'hero-code-reveal',
            type: 'code-reveal',
            teki: "Curious what the code looks like?",
            language: 'html',
            codeTemplate: `<section class="hero">
  <h2>{{headline}}</h2>
  <p>{{subtext}}</p>
  <button>{{buttonText}}</button>
</section>`,
            explanations: {
              young: "<section> is like a room in your website. <h2> is a big title, and <p> is regular text!",
              junior: "<section> groups related content together. h2 is a secondary heading, and <button> creates a clickable button.",
              senior: "<section> is a semantic landmark. The button will need JavaScript later to do something when clicked.",
            },
            ageExposure: { young: 'read-only', junior: 'read-only', senior: 'read-only' },
            action: "Interesting!",
          },
        ],
      },

      // ── Mission 4 ─────────────────────────────────────────────────────────
      {
        id: 'mission-4',
        number: 4,
        act: 1,
        title: 'The Final Stop',
        subtitle: 'Build your footer',
        concept: 'footer',
        xp: 100,
        badge: { id: 'complete-website', label: 'Website Built', emoji: '🌐' },
        steps: [
          {
            id: 'footer-intro',
            type: 'teki-message',
            mood: 'happy',
            highlight: 'footer',
            messages: [
              "The FOOTER is the last thing visitors see — copyright info and useful links.",
            ],
            autoAdvance: true,
          },
          {
            id: 'canvas-footer-copyright',
            type: 'canvas-input',
            highlight: 'footer',
            teki: "See that dark bar at the bottom? Click on it and add your copyright text — usually your name and the year!",
            canvasInput: {
              fieldKey: 'footer-copyright',
              section: 'footer',
              storeKey: 'copyright',
              label: 'Copyright',
              placeholder: '© 2024 My Website',
            },
            action: "Done!",
          },
          {
            id: 'canvas-footer-links',
            type: 'canvas-input',
            highlight: 'footer',
            teki: "Now add some footer links — things like Privacy, Terms, or Contact. Separate them with commas!",
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
            teki: "YOU DID IT!",
            tekiMessages: [
              "YOU DID IT! 🏆 Header, Hero, Footer — a complete website structure!",
            ],
            highlightSection: null,
            autoAdvance: true,
          },
          {
            id: 'act1-complete',
            type: 'act-complete',
            actId: 'act1',
            title: 'ACT 1 Complete!',
            message: "You built your first website structure! Now let's make it beautiful.",
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
    missions: [
      // ── Mission 5 ─────────────────────────────────────────────────────────
      {
        id: 'mission-5',
        number: 5,
        act: 2,
        title: 'The Color Lab',
        subtitle: 'Colors tell a story',
        concept: 'colors',
        xp: 100,
        badge: null,
        steps: [
          {
            id: 'color-intro',
            type: 'teki-message',
            mood: 'excited',
            messages: [
              "Colors tell a story before visitors read a word — red feels urgent, blue feels calm. Pick yours!",
            ],
            autoAdvance: true,
          },
          {
            id: 'color-design',
            type: 'visual-builder',
            section: null,
            isStyleUpdate: true,
            teki: "Let's give your website a complete color identity!",
            fields: [
              { id: 'primaryColor', label: 'Primary Color', type: 'color', storeSubKey: 'primaryColor', hint: 'Your main brand color' },
              { id: 'secondaryColor', label: 'Accent Color', type: 'color', storeSubKey: 'secondaryColor', hint: 'Used for highlights and accents' },
              { id: 'backgroundColor', label: 'Background Color', type: 'color', storeSubKey: 'backgroundColor', hint: 'The page background' },
            ],
            action: "My colors are set!",
          },
          {
            id: 'color-observe',
            type: 'observation',
            teki: "See how the whole feeling changed?",
            tekiMessages: [
              "See how the whole feeling changed? That's the power of color! 🎨",
            ],
            autoAdvance: true,
          },
          {
            id: 'color-code-reveal',
            type: 'code-reveal',
            teki: "In code, colors are stored as special values. Want to see?",
            language: 'css',
            codeTemplate: `:root {
  --primary: {{primaryColor}};
  --background: {{backgroundColor}};
}

header {
  background: var(--primary);
}`,
            explanations: {
              young: "Colors in code are like their secret names! #6366f1 is actually purple.",
              junior: "CSS uses hex codes for colors. --primary is a 'variable' that stores your color so you can use it everywhere.",
              senior: "CSS custom properties (variables) centralize your color palette. Change --primary once and it updates everywhere.",
            },
            ageExposure: { young: 'read-only', junior: 'read-only', senior: 'editable' },
            action: "Got it!",
          },
        ],
      },

      // ── Mission 6 ─────────────────────────────────────────────────────────
      {
        id: 'mission-6',
        number: 6,
        act: 2,
        title: 'Typography Workshop',
        subtitle: 'The art of readable text',
        concept: 'typography',
        xp: 100,
        badge: null,
        steps: [
          {
            id: 'type-intro',
            type: 'teki-message',
            mood: 'thinking',
            messages: [
              "TYPOGRAPHY is the art of arranging text — big text = important, small text = details.",
            ],
            autoAdvance: true,
          },
          {
            id: 'type-design',
            type: 'visual-builder',
            section: null,
            isStyleUpdate: true,
            teki: "Let's style your text to create a clear hierarchy!",
            fields: [
              { id: 'headingSize', label: 'Heading Size', type: 'select', options: ['2xl', '3xl', '4xl', '5xl'], storeSubKey: 'headingSize', hint: 'How big are your main titles?' },
              { id: 'fontFamily', label: 'Text Style', type: 'select', options: ['sans-serif', 'serif', 'monospace'], labels: ['Modern', 'Classic', 'Code'], storeSubKey: 'fontFamily', hint: 'Overall text personality' },
            ],
            action: "Text is styled!",
          },
          {
            id: 'type-observe',
            type: 'observation',
            teki: "Notice how different fonts give different feelings?",
            tekiMessages: [
              "Different fonts, different feelings — modern feels clean, classic feels trustworthy.",
            ],
            autoAdvance: true,
          },
        ],
      },

      // ── Mission 7 ─────────────────────────────────────────────────────────
      {
        id: 'mission-7',
        number: 7,
        act: 2,
        title: 'Button Factory',
        subtitle: 'Buttons invite action',
        concept: 'buttons',
        xp: 120,
        badge: { id: 'designer', label: 'Designer', emoji: '🎨' },
        steps: [
          {
            id: 'button-intro',
            type: 'teki-message',
            mood: 'happy',
            messages: [
              "Buttons are INVITATIONS — their style affects whether visitors click!",
            ],
            autoAdvance: true,
          },
          {
            id: 'button-design',
            type: 'visual-builder',
            section: null,
            isStyleUpdate: true,
            teki: "Design your website's button style!",
            fields: [
              { id: 'buttonStyle', label: 'Button Shape', type: 'select', options: ['rounded', 'pill', 'square'], labels: ['Rounded', 'Pill', 'Square'], storeSubKey: 'buttonStyle' },
              { id: 'buttonColor', label: 'Button Color', type: 'color', storeSubKey: 'buttonColor' },
            ],
            action: "Buttons are ready!",
          },
          {
            id: 'button-observe',
            type: 'observation',
            teki: "Your website is looking SO good!",
            tekiMessages: [
              "Header, hero, footer — all styled! Your website looks great. ✨",
            ],
            autoAdvance: true,
          },
          {
            id: 'act2-complete',
            type: 'act-complete',
            actId: 'act2',
            title: 'ACT 2 Complete!',
            message: "Your website has personality now! Time to learn the language of the web.",
            power: { label: 'Designer', emoji: '🎨' },
            xpBonus: 200,
            action: "Teach me the language!",
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
    missions: [
      // ── Mission 8 ─────────────────────────────────────────────────────────
      {
        id: 'mission-8',
        number: 8,
        act: 3,
        title: 'Website Language',
        subtitle: 'Websites speak HTML',
        concept: 'html-basics',
        xp: 150,
        badge: null,
        steps: [
          {
            id: 'html-intro',
            type: 'teki-message',
            mood: 'excited',
            messages: [
              "Websites speak HTML — instructions wrapped in < > brackets. Let's learn it!",
            ],
            autoAdvance: true,
          },
          {
            id: 'html-h1',
            type: 'code-reveal',
            teki: "This is how you write the BIGGEST title on a page:",
            language: 'html',
            codeTemplate: `<h1>{{name}}</h1>`,
            explanations: {
              young: "Think of <h1> like a superhero cape for your text — it makes it the BIGGEST and most important!",
              junior: "<h1> means 'Heading level 1'. It's the most important title on a page. The browser makes it big and bold automatically.",
              senior: "<h1> is a semantic heading element. Search engines use it to understand your page's main topic. Only use one h1 per page.",
            },
            ageExposure: { young: 'read-only', junior: 'editable', senior: 'editable' },
            action: "I see it!",
          },
          {
            id: 'html-challenge-h1',
            type: 'code-challenge',
            teki: "Your turn! Fix this code to make the title appear:",
            language: 'html',
            code: `<___>{{name}}</___>`,
            answer: `<h1>{{name}}</h1>`,
            blanks: [{ position: 'open', answer: 'h1' }, { position: 'close', answer: 'h1' }],
            explanations: {
              young: "Fill in the blank with h1!",
              junior: "Type 'h1' in both blanks to complete the heading tag.",
              senior: "Use h1 as the tag name in both opening and closing tags.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "You just wrote HTML! 🎉",
            action: "Check my answer!",
          },
          {
            id: 'html-p',
            type: 'code-reveal',
            teki: "Now for regular text — called a paragraph:",
            language: 'html',
            codeTemplate: `<p>Welcome to {{name}}!</p>`,
            explanations: {
              young: "<p> is for regular writing — like sentences in a book!",
              junior: "<p> stands for paragraph. It's for body text — the regular writing under headings.",
              senior: "<p> creates a paragraph element. Browsers add default top and bottom margins to paragraphs.",
            },
            ageExposure: { young: 'read-only', junior: 'editable', senior: 'editable' },
            action: "Makes sense!",
          },
          {
            id: 'html-img-button',
            type: 'code-reveal',
            teki: "And two more important ones — images and buttons!",
            language: 'html',
            codeTemplate: `<img src="photo.jpg" alt="A cute pet" />
<button>Click me!</button>`,
            explanations: {
              young: "<img> shows a picture and <button> is something you can click!",
              junior: "<img> displays images. The 'src' says where the image is, 'alt' describes it for accessibility.",
              senior: "<img> is a void element (no closing tag). Always include alt text for accessibility and SEO.",
            },
            ageExposure: { young: 'read-only', junior: 'read-only', senior: 'read-only' },
            action: "I'm getting it!",
          },
        ],
      },

      // ── Mission 9 ─────────────────────────────────────────────────────────
      {
        id: 'mission-9',
        number: 9,
        act: 3,
        title: 'Organizing Content',
        subtitle: 'Boxes inside boxes',
        concept: 'div-section',
        xp: 120,
        badge: { id: 'html-coder', label: 'HTML Coder', emoji: '📝' },
        steps: [
          {
            id: 'org-intro',
            type: 'teki-message',
            mood: 'thinking',
            messages: [
              "HTML organizes content into boxes called div and section — like rooms in a house.",
            ],
            autoAdvance: true,
          },
          {
            id: 'org-code',
            type: 'code-reveal',
            teki: "A div is an invisible box that holds other things together:",
            language: 'html',
            codeTemplate: `<div class="card">
  <h2>My Pet</h2>
  <p>Fluffy is a golden retriever.</p>
  <img src="fluffy.jpg" alt="Fluffy" />
</div>`,
            explanations: {
              young: "A <div> is like a lunchbox — it holds everything together neatly!",
              junior: "<div> is a container — it groups related things. 'class' gives it a name so CSS can style it.",
              senior: "<div> is a generic block container. Use semantic elements (section, article, aside) when the content has meaning.",
            },
            ageExposure: { young: 'read-only', junior: 'read-only', senior: 'editable' },
            action: "Got it!",
          },
          {
            id: 'org-challenge',
            type: 'code-challenge',
            teki: "Wrap this content in a div with class 'card':",
            language: 'html',
            code: `<___  ___="card">
  <h2>Space Paws</h2>
  <p>Cats in space!</p>
</___ >`,
            answer: `<div class="card">
  <h2>Space Paws</h2>
  <p>Cats in space!</p>
</div>`,
            blanks: [
              { position: 0, answer: 'div' },
              { position: 1, answer: 'class' },
              { position: 2, answer: 'div' },
            ],
            explanations: {
              young: "Use 'div' for the tag and 'class' for the name!",
              junior: "The opening tag needs div and class='card'. Closing tag just needs /div.",
              senior: "div with a class attribute. Remember: attributes go in the opening tag only.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "You're organizing like a pro! 🗂️",
            action: "Check it!",
          },
          {
            id: 'act3-complete',
            type: 'act-complete',
            actId: 'act3',
            title: 'ACT 3 Complete!',
            message: "You can READ and WRITE HTML! Now let's give your website a memory.",
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
    missions: [
      {
        id: 'mission-10',
        number: 10,
        act: 4,
        title: 'Secret Boxes',
        subtitle: 'Variables store information',
        concept: 'variables',
        xp: 150,
        badge: null,
        steps: [
          {
            id: 'var-intro',
            type: 'teki-message',
            mood: 'thinking',
            messages: [
              "VARIABLES are secret boxes that store information your website can remember!",
            ],
            autoAdvance: true,
          },
          {
            id: 'var-code',
            type: 'code-reveal',
            teki: "Here's how you create a variable — a box with a name and a value:",
            language: 'javascript',
            codeTemplate: `let siteName = "{{name}}";
let topic = "{{topic}}";
let visitorCount = 0;`,
            explanations: {
              young: "let gives a box a name! siteName is the box, and '{{name}}' is what's inside it.",
              junior: "'let' creates a variable. The name before = is the label, and after = is what's stored inside.",
              senior: "'let' creates a block-scoped variable. Use 'const' for values that don't change, 'let' for values that will.",
            },
            ageExposure: { young: 'read-only', junior: 'editable', senior: 'editable' },
            action: "I see the boxes!",
          },
          {
            id: 'var-challenge',
            type: 'code-challenge',
            teki: "Create a variable to store your website's name:",
            language: 'javascript',
            code: `___ websiteName = "{{name}}";`,
            answer: `let websiteName = "{{name}}";`,
            blanks: [{ position: 0, answer: 'let' }],
            explanations: {
              young: "Type 'let' to create the box!",
              junior: "Use 'let' to declare a new variable.",
              senior: "Use 'let' or 'const' — 'const' if the value won't change.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "You created a variable! 📦",
            action: "Check it!",
          },
        ],
      },

      {
        id: 'mission-11',
        number: 11,
        act: 4,
        title: 'Dynamic Content',
        subtitle: 'Use variables to update your site',
        concept: 'using-variables',
        xp: 150,
        badge: { id: 'memory-master', label: 'Memory Master', emoji: '🧠' },
        steps: [
          {
            id: 'dynamic-intro',
            type: 'teki-message',
            mood: 'excited',
            messages: [
              "Now let's USE variables — change one and the whole website updates automatically!",
            ],
            autoAdvance: true,
          },
          {
            id: 'dynamic-code',
            type: 'code-reveal',
            teki: "Watch how the variable goes INTO the HTML:",
            language: 'javascript',
            codeTemplate: `let greeting = "Welcome to {{name}}!";

// Put the variable into the page
document.querySelector('h1').textContent = greeting;`,
            explanations: {
              young: "We put the box's contents INTO the title! Now if we change greeting, the title changes too!",
              junior: "querySelector finds an HTML element, and textContent sets its text. The variable is referenced by name.",
              senior: "textContent vs innerHTML: use textContent for plain text (safer, avoids XSS). querySelector uses CSS selector syntax.",
            },
            ageExposure: { young: 'read-only', junior: 'read-only', senior: 'editable' },
            action: "That's powerful!",
          },
          {
            id: 'act4-complete',
            type: 'act-complete',
            actId: 'act4',
            title: 'ACT 4 Complete!',
            message: "Your website can now remember things! Next: teach it to think.",
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
    missions: [
      {
        id: 'mission-12',
        number: 12,
        act: 5,
        title: 'Decision Tree',
        subtitle: 'If this, then that',
        concept: 'conditions',
        xp: 150,
        badge: null,
        steps: [
          {
            id: 'cond-intro',
            type: 'teki-message',
            mood: 'thinking',
            messages: [
              "What if your website could DECIDE what to show? IF statements make that happen!",
            ],
            autoAdvance: true,
          },
          {
            id: 'cond-code',
            type: 'code-reveal',
            teki: "Meet the IF statement — it checks a condition and decides:",
            language: 'javascript',
            codeTemplate: `let hour = new Date().getHours();

if (hour < 12) {
  greeting = "Good morning! ☀️";
} else {
  greeting = "Good evening! 🌙";
}`,
            explanations: {
              young: "IF is like asking a question! 'Is it before noon?' YES → show morning. NO → show evening!",
              junior: "if checks a condition. If it's true, runs the first block. 'else' is the fallback if it's false.",
              senior: "Comparison operators: < (less than), > (greater than), === (strict equality). The else block handles the false case.",
            },
            ageExposure: { young: 'read-only', junior: 'read-only', senior: 'editable' },
            action: "So smart!",
          },
          {
            id: 'cond-challenge',
            type: 'code-challenge',
            teki: "Finish this condition — show a special message for visitors named 'Alex':",
            language: 'javascript',
            code: `let visitorName = "Alex";

___ (visitorName === "Alex") {
  message = "Welcome back, Alex! 👋";
}`,
            answer: `let visitorName = "Alex";

if (visitorName === "Alex") {
  message = "Welcome back, Alex! 👋";
}`,
            blanks: [{ position: 0, answer: 'if' }],
            explanations: {
              young: "Type 'if' to start the decision!",
              junior: "Use 'if' to begin a conditional check.",
              senior: "The if keyword starts a conditional block. === checks strict equality (value AND type).",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: "The website can now make decisions! 🤔",
            action: "Check it!",
          },
        ],
      },

      {
        id: 'mission-13',
        number: 13,
        act: 5,
        title: 'Smart Greetings',
        subtitle: 'Use logic to personalize your site',
        concept: 'conditional-logic',
        xp: 150,
        badge: { id: 'logic-thinker', label: 'Logic Thinker', emoji: '🤔' },
        steps: [
          {
            id: 'smart-intro',
            type: 'teki-message',
            mood: 'excited',
            messages: [
              "Let's add a smart greeting that checks the time and greets visitors perfectly!",
            ],
            autoAdvance: true,
          },
          {
            id: 'smart-code',
            type: 'code-reveal',
            teki: "Here's the full smart greeting logic:",
            language: 'javascript',
            codeTemplate: `let hour = new Date().getHours();
let greeting;

if (hour < 12) {
  greeting = "Good morning! ☀️";
} else if (hour < 18) {
  greeting = "Good afternoon! 🌤️";
} else {
  greeting = "Good evening! 🌙";
}

document.querySelector('#greeting').textContent = greeting;`,
            explanations: {
              young: "We check THREE possibilities now: morning, afternoon, or evening. So smart!",
              junior: "'else if' lets you check multiple conditions in a chain. Only the first true one runs.",
              senior: "else-if chains handle multiple mutually exclusive conditions. Consider a lookup object for many cases.",
            },
            ageExposure: { young: 'read-only', junior: 'editable', senior: 'editable' },
            action: "Love it!",
          },
          {
            id: 'act5-complete',
            type: 'act-complete',
            actId: 'act5',
            title: 'ACT 5 Complete!',
            message: "Your website can think now! Time to make it respond to clicks.",
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
    missions: [
      {
        id: 'mission-14',
        number: 14,
        act: 6,
        title: 'Magic Button',
        subtitle: 'Buttons that actually do something',
        concept: 'events',
        xp: 150,
        badge: null,
        steps: [
          {
            id: 'event-intro',
            type: 'teki-message',
            mood: 'excited',
            messages: [
              "Let's give your button MAGIC — when clicked, something happens. That's an EVENT!",
            ],
            autoAdvance: true,
          },
          {
            id: 'event-code',
            type: 'code-reveal',
            teki: "Here's how you make a button DO something:",
            language: 'javascript',
            codeTemplate: `let btn = document.querySelector('button');

btn.addEventListener('click', function() {
  alert("Welcome to {{name}}! 🎉");
});`,
            explanations: {
              young: "addEventListener is like saying: 'Hey button, when someone CLICKS you, show this message!'",
              junior: "addEventListener attaches a 'listener' to an element. 'click' is the event type. The function runs when clicked.",
              senior: "addEventListener(eventType, callback). The callback receives an Event object. Use arrow functions: () => { ... }",
            },
            ageExposure: { young: 'read-only', junior: 'read-only', senior: 'editable' },
            action: "So that's how it works!",
          },
        ],
      },

      {
        id: 'mission-15',
        number: 15,
        act: 6,
        title: 'Talk To Visitors',
        subtitle: 'Get input from users',
        concept: 'inputs',
        xp: 150,
        badge: null,
        steps: [
          {
            id: 'input-intro',
            type: 'teki-message',
            mood: 'happy',
            messages: [
              "Websites can listen too — input fields let visitors type and your site responds!",
            ],
            autoAdvance: true,
          },
          {
            id: 'input-code',
            type: 'code-reveal',
            teki: "Here's a name input that greets visitors:",
            language: 'html',
            codeTemplate: `<!-- HTML -->
<input id="nameInput" placeholder="Your name..." />
<button id="greetBtn">Greet me!</button>
<p id="greeting"></p>

<!-- JavaScript -->
<script>
document.querySelector('#greetBtn').addEventListener('click', () => {
  let name = document.querySelector('#nameInput').value;
  document.querySelector('#greeting').textContent = "Hello, " + name + "!";
});
</script>`,
            explanations: {
              young: "The input box catches what they type. Then we grab it with .value and use it in a greeting!",
              junior: ".value gets what's typed in an input. We combine strings with + to build the greeting message.",
              senior: ".value returns a string. Consider .trim() to remove whitespace. Template literals are cleaner: `Hello, ${name}!`",
            },
            ageExposure: { young: 'read-only', junior: 'read-only', senior: 'editable' },
            action: "Cool!",
          },
        ],
      },

      {
        id: 'mission-16',
        number: 16,
        act: 6,
        title: 'Counter Challenge',
        subtitle: 'Build an interactive counter',
        concept: 'interactivity',
        xp: 180,
        badge: { id: 'action-creator', label: 'Action Creator', emoji: '⚡' },
        steps: [
          {
            id: 'counter-intro',
            type: 'teki-message',
            mood: 'excited',
            messages: [
              "Challenge! 🎯 Build a click counter using variables, events, and DOM updates.",
            ],
            autoAdvance: true,
          },
          {
            id: 'counter-code',
            type: 'code-reveal',
            teki: "Here's the full counter — read it carefully!",
            language: 'javascript',
            codeTemplate: `let count = 0;  // our variable

document.querySelector('#addBtn').addEventListener('click', () => {
  count = count + 1;  // update the variable
  document.querySelector('#display').textContent = count;  // show it
});`,
            explanations: {
              young: "count is our secret box. Every click adds 1 to it, then we show the new number!",
              junior: "count++ is shorthand for count = count + 1. We update the variable AND update the display each click.",
              senior: "This demonstrates the core UI pattern: state (count) → event → state update → DOM update. This is exactly what React formalizes.",
            },
            ageExposure: { young: 'read-only', junior: 'editable', senior: 'editable' },
            action: "I built it!",
          },
          {
            id: 'act6-complete',
            type: 'act-complete',
            actId: 'act6',
            title: 'ACT 6 Complete!',
            message: "Your website is ALIVE! It reacts, responds, and remembers. Next: collections!",
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
    missions: [
      {
        id: 'mission-17',
        number: 17,
        act: 7,
        title: 'Pet Gallery',
        subtitle: 'Arrays hold collections',
        concept: 'arrays',
        xp: 150,
        badge: null,
        steps: [
          {
            id: 'array-intro',
            type: 'teki-message',
            mood: 'thinking',
            messages: [
              "ARRAYS hold a list of items in one variable — perfect for a pet gallery!",
            ],
            autoAdvance: true,
          },
          {
            id: 'array-code',
            type: 'code-reveal',
            teki: "An array is a list. Each item has a position number:",
            language: 'javascript',
            codeTemplate: `let pets = ["Fluffy", "Max", "Luna", "Biscuit"];

// Get one pet
console.log(pets[0]);  // "Fluffy" (first = position 0!)
console.log(pets[2]);  // "Luna"

// How many pets?
console.log(pets.length);  // 4`,
            explanations: {
              young: "An array is like a shelf! pets[0] is the first shelf, pets[1] is the second... Counting starts at 0!",
              junior: "Arrays use [] brackets. Items are separated by commas. Index (position) starts at 0. .length tells how many items.",
              senior: "Arrays are zero-indexed. Access with [index]. .length returns item count. Arrays have many built-in methods: push, pop, slice, filter, map.",
            },
            ageExposure: { young: 'read-only', junior: 'read-only', senior: 'editable' },
            action: "Got it!",
          },
        ],
      },

      {
        id: 'mission-18',
        number: 18,
        act: 7,
        title: 'Infinite Builder',
        subtitle: 'Loops do repetitive work',
        concept: 'loops',
        xp: 180,
        badge: { id: 'data-collector', label: 'Data Collector', emoji: '📦' },
        steps: [
          {
            id: 'loop-intro',
            type: 'teki-message',
            mood: 'excited',
            messages: [
              "LOOPS do repetitive work for you — one instruction runs for every item in the list!",
            ],
            autoAdvance: true,
          },
          {
            id: 'loop-code',
            type: 'code-reveal',
            teki: "A forEach loop goes through every item in an array:",
            language: 'javascript',
            codeTemplate: `let pets = ["Fluffy", "Max", "Luna", "Biscuit"];

pets.forEach(function(pet) {
  let card = document.createElement('div');
  card.textContent = pet;
  document.querySelector('#gallery').appendChild(card);
});`,
            explanations: {
              young: "forEach is like saying 'for EACH pet in my list, do this thing!' One instruction, runs for all!",
              junior: "forEach loops through every array item. The function inside runs once per item, receiving the item as a parameter.",
              senior: "forEach vs map: forEach mutates for side effects, map returns a new array. For DOM rendering, prefer map with innerHTML or insertAdjacentHTML.",
            },
            ageExposure: { young: 'read-only', junior: 'read-only', senior: 'editable' },
            action: "That's amazing!",
          },
          {
            id: 'act7-complete',
            type: 'act-complete',
            actId: 'act7',
            title: 'ACT 7 Complete!',
            message: "Collections and loops mastered! Now let's teach your website SKILLS.",
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
    missions: [
      {
        id: 'mission-19',
        number: 19,
        act: 8,
        title: 'Builder Tools',
        subtitle: 'Functions are reusable skills',
        concept: 'functions',
        xp: 150,
        badge: null,
        steps: [
          {
            id: 'func-intro',
            type: 'teki-message',
            mood: 'thinking',
            messages: [
              "FUNCTIONS are saved tools — write once, use everywhere!",
            ],
            autoAdvance: true,
          },
          {
            id: 'func-code',
            type: 'code-reveal',
            teki: "Here's how to create and call a function:",
            language: 'javascript',
            codeTemplate: `// Define the tool once
function greetVisitor(name) {
  return "Welcome to {{name}}, " + name + "! 👋";
}

// Use it anywhere
greetVisitor("Alex");    // "Welcome to {{name}}, Alex! 👋"
greetVisitor("Jordan");  // "Welcome to {{name}}, Jordan! 👋"`,
            explanations: {
              young: "A function is like a recipe card! Write the recipe once, then cook it any time with different ingredients (parameters)!",
              junior: "function defines the tool. Parameters (like 'name') are the inputs. 'return' sends a result back.",
              senior: "Functions encapsulate logic. Parameters define the interface. return provides the output. Consider arrow functions: const greetVisitor = (name) => `Welcome, ${name}!`",
            },
            ageExposure: { young: 'read-only', junior: 'editable', senior: 'editable' },
            action: "I see it!",
          },
        ],
      },

      {
        id: 'mission-20',
        number: 20,
        act: 8,
        title: 'Name Generator',
        subtitle: 'Build a function that creates names',
        concept: 'function-use',
        xp: 180,
        badge: { id: 'function-engineer', label: 'Function Engineer', emoji: '🔧' },
        steps: [
          {
            id: 'namegen-intro',
            type: 'teki-message',
            mood: 'excited',
            messages: [
              "Challenge! Build a random pet name generator using an array, a function, and an event.",
            ],
            autoAdvance: true,
          },
          {
            id: 'namegen-code',
            type: 'code-reveal',
            teki: "The generator combines everything you've learned:",
            language: 'javascript',
            codeTemplate: `let adjectives = ["Fluffy", "Speedy", "Tiny", "Giant", "Cosmic"];
let nouns = ["Paws", "Tail", "Whisker", "Snout", "Claw"];

function generateName() {
  let adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  let noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adj + " " + noun;
}

document.querySelector('#genBtn').addEventListener('click', () => {
  document.querySelector('#result').textContent = generateName();
});`,
            explanations: {
              young: "Math.random() picks a surprise! We use it to grab a random word from each list and stick them together!",
              junior: "Math.random() gives 0–1. Multiplied by length, Math.floor() rounds down to get a valid index.",
              senior: "Math.floor(Math.random() * array.length) is the standard random-index pattern. Consider a utility function for reuse.",
            },
            ageExposure: { young: 'read-only', junior: 'read-only', senior: 'editable' },
            action: "Generator built!",
          },
          {
            id: 'act8-complete',
            type: 'act-complete',
            actId: 'act8',
            title: 'ACT 8 Complete!',
            message: "HTML, CSS, JavaScript — you know the fundamentals! Now: Modern Builder Tools.",
            power: { label: 'Function Engineer', emoji: '🔧' },
            xpBonus: 250,
            action: "Modern tools!",
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
          {
            id: 'api-code',
            type: 'code-reveal',
            teki: "Here's how you fetch data from the internet:",
            language: 'jsx',
            codeTemplate: `import { useEffect, useState } from 'react';

function CatFact() {
  const [fact, setFact] = useState('');

  useEffect(() => {
    fetch('https://catfact.ninja/fact')
      .then(res => res.json())
      .then(data => setFact(data.fact));
  }, []);

  return <p>{fact}</p>;
}`,
            explanations: {
              young: "fetch() goes out to the internet, grabs some data, and brings it back! Like ordering pizza online!",
              junior: "fetch() requests data. .then() handles the response after it arrives. useEffect runs code when the component first appears.",
              senior: "useEffect with [] runs once on mount. fetch returns a Promise. Chain .then() or use async/await. Always handle loading and error states.",
            },
            ageExposure: { young: 'read-only', junior: 'read-only', senior: 'editable' },
            action: "Data fetched!",
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
            id: 'live-code',
            type: 'code-reveal',
            teki: "A complete data-fetching component with loading state:",
            language: 'jsx',
            codeTemplate: `function PetGallery() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/pets')
      .then(res => res.json())
      .then(data => {
        setPets(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading pets... 🐾</p>;

  return (
    <div className="gallery">
      {pets.map(pet => (
        <PetCard key={pet.id} {...pet} />
      ))}
    </div>
  );
}`,
            explanations: {
              young: "We show 'Loading...' while we wait, then swap it for the real data when it arrives!",
              junior: "loading state prevents showing empty content. When data arrives, setLoading(false) and setPets(data) trigger a re-render.",
              senior: "This is the manual fetch pattern. In production use TanStack Query: useQuery handles caching, background refetch, error states, and deduplication.",
            },
            ageExposure: { young: 'read-only', junior: 'read-only', senior: 'editable' },
            action: "Connected!",
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
