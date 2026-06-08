const fs = require('fs');
let c = fs.readFileSync('src/data/curriculum.js', 'utf8');

// ── Act 10: Mission 29 — replace the placeholder steps with fetch challenge ──
const m29Old = `          {
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
        id: 'mission-30',`;

const m29New = `          {
            id: 'api-intro',
            type: 'teki-message',
            mood: 'excited',
            messages: [
              "Your website lives on the internet. The internet is FULL of data!",
              "Weather, news, facts, photos — all available via APIs.",
              "API = a door to someone else's data. fetch() is how JavaScript knocks on that door!",
              "Write the challenge below and a Contact section will appear on your website!",
            ],
            autoAdvance: true,
          },
          {
            id: 'fetch-challenge',
            type: 'code-challenge',
            teki: 'Use fetch() to request data from a URL:',
            language: 'javascript',
            code: "const response = await ___('/api/data')\nconst data = await response.json()",
            answer: "const response = await fetch('/api/data')\nconst data = await response.json()",
            blanks: [{ position: 0, answer: 'fetch' }],
            completionEffect: { buildSection: 'contact' },
            explanations: {
              young: 'fetch() sends a request to a URL — like asking a waiter for your order!',
              junior: 'fetch(url) returns a Promise that resolves with a Response object. Call .json() to parse the body.',
              senior: 'fetch() is a browser API returning a Promise<Response>. Always handle errors with .catch() or try/catch.',
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: 'fetch() mastered — and a Contact section appeared on your website!',
            action: 'Fetch the data!',
          },
          {
            id: 'contact-appear-observe',
            type: 'observation',
            teki: "A Contact section appeared — wireframe style! Your fetch() knowledge built a connection point on your website. Next: async/await will style it!",
            autoAdvance: true,
            autoAdvanceDelay: 3000,
          },
        ],
      },

      {
        id: 'mission-30',`;

// ── Act 10: Mission 30 — replace placeholder with async/await challenge ──────
const m30Old = `          {
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
            id: 'act10-complete',`;

const m30New = `          {
            id: 'live-intro',
            type: 'teki-message',
            mood: 'proud',
            messages: [
              "Getting data is one thing. DISPLAYING it beautifully is another!",
              "async/await makes fetch() feel like normal code — no confusing callbacks!",
            ],
            autoAdvance: true,
          },
          {
            id: 'async-challenge',
            type: 'code-challenge',
            teki: "Mark a function as async so it can use await inside it:",
            language: 'javascript',
            code: "___ function loadContent() {\n  const res = await fetch('/api/content')\n  return await res.json()\n}",
            answer: "async function loadContent() {\n  const res = await fetch('/api/content')\n  return await res.json()\n}",
            blanks: [{ position: 0, answer: 'async' }],
            completionEffect: { styleSection: 'contact' },
            explanations: {
              young: "'async' tells JavaScript: this function will wait for things. Like saying 'I'll be patient'!",
              junior: "'async' functions always return a Promise. Inside them, 'await' pauses execution until the Promise resolves.",
              senior: "async/await is syntactic sugar over Promises. async functions return Promise<T>. Errors need try/catch.",
            },
            ageExposure: { young: 'guided', junior: 'fill-blank', senior: 'fill-blank' },
            successMessage: 'async mastered — Contact section fully styled! Your website can connect to the world!',
            action: 'Make it async!',
          },
          {
            id: 'contact-styled-observe',
            type: 'observation',
            teki: "Contact section fully styled! Your website now has a beautiful email form — powered by your async/await knowledge. You built a site that can connect to the real world!",
            autoAdvance: true,
            autoAdvanceDelay: 3500,
          },
          {
            id: 'act10-complete',`;

if (!c.includes(m29Old.trim().substring(0, 60))) {
  console.error('M29 old pattern not found');
  process.exit(1);
}
if (!c.includes(m30Old.trim().substring(0, 60))) {
  console.error('M30 old pattern not found');
  process.exit(1);
}

c = c.replace(m29Old, m29New);
c = c.replace(m30Old, m30New);

fs.writeFileSync('src/data/curriculum.js', c, 'utf8');
console.log('Acts 10 patched. Length:', c.length);
