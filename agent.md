Read `AGENTS.md` completely and follow its instructions. Inspect the existing project before modifying anything. Implement the BharatVerse frontend directly in the existing repository, preserving the supplied cinematic liquid-glass design. Build the two main sections first, then implement the interactive map, state details, virtual guide, and local chatbot. Do not stop at planning. Run the production build and fix any errors before finishing.
# AGENTS.md — BharatVerse Frontend Implementation Guide

## 1. Role and Objective

Act as a senior React frontend engineer, UI/UX designer, and animation specialist.

Build **BharatVerse**, an interactive Indian cultural heritage exploration website, using the exact visual direction described in this document.

The website must combine:
- A cinematic dark interface.
- Liquid-glass UI elements.
- Atmospheric background videos.
- Smooth blur, fade, and staggered animations.
- An interactive map of India.
- State-wise cultural discovery.
- An interactive virtual cultural guide.
- A functional frontend chatbot.

The existing visual specification is the primary design reference. Do not turn this into a conventional travel website, admin dashboard, or generic AI chatbot interface.

**Primary objective:** Deliver a polished, working frontend prototype with real navigation and functional interactions. Use local demo data where APIs are not yet connected.

Do not merely explain what needs to be built. Inspect the repository, create or modify the actual project files, and run the application build.

---

## 2. Mandatory Repository Instructions

Before writing code:

1. Inspect the existing project structure and package.json.
2. Identify the frontend entry point, existing components, stylesheets, and installed dependencies.
3. Preserve working project configuration wherever possible.
4. Do not overwrite existing work unnecessarily.
5. Create a concise implementation plan and then execute it.
6. Reuse existing components when appropriate.
7. Do not stop after generating a plan or a list of suggested files.

If this repository already contains a React + Vite + TypeScript project, continue from that project rather than creating another nested application.

Use the following stack:

- React
- Vite
- TypeScript
- Tailwind CSS
- Framer Motion
- React Router if multiple routes are needed
- Lucide React or small custom SVG icons
- Local TypeScript data for the initial prototype

Use compatible package versions and avoid unnecessary dependencies.

---

## 3. Project Identity

**Name:** BharatVerse

**Tagline:** One Map. Countless Stories.

**Main heading:** Discover the Soul of India.

**Product concept:**

BharatVerse helps users explore the cultural heritage of India through an interactive state map, regional food, traditional attire, folk art, festivals, customs, famous landmarks, and lesser-known destinations.

A virtual cultural guide introduces each state, while an interactive chatbot answers questions about its culture.

The interface should feel immersive, elegant, modern, and cinematic while respecting the diversity of Indian traditions.

---

## 4. Design System — Preserve the Supplied Reference

Use the provided agency landing-page design as the visual foundation, adapting only the content and layouts required for BharatVerse.

### Global visual rules

- Pure black background: #000000.
- White primary text.
- Subtle white/80 and white/90 secondary text.
- Minimal muted-gold and ivory accents for Indian cultural identity.
- Near-transparent liquid-glass surfaces.
- Gradient-stroke borders created with CSS masks.
- Atmospheric full-screen background videos.
- Elegant italic serif headlines.
- Lightweight sans-serif body text.
- Smooth motion and layered compositions.
- Strong negative space and cinematic imagery.

Do not introduce bright dashboard colors, excessive gradients, generic purple AI styling, or conventional white cards.

The interactive map and cultural content must remain readable against the dark background.

### Fonts

Load Google Fonts through index.html:

- Instrument Serif, italic, for headings.
- Barlow, weights 300, 400, 500, and 600, for body text.

Configure Tailwind font families:

- font-heading: Instrument Serif, serif.
- font-body: Barlow, sans-serif.

Base CSS:

html, body {
  background: #000;
  color: #fff;
  font-family: 'Barlow', sans-serif;
}

All major display headings should use font-heading and italic styling.

---

## 5. Liquid Glass CSS

Implement reusable CSS classes in index.css.

### `.liquid-glass`

Use these characteristics:

- `background: rgba(255, 255, 255, 0.01)`
- `background-blend-mode: luminosity`
- `backdrop-filter: blur(4px)`
- `-webkit-backdrop-filter: blur(4px)`
- No ordinary solid border.
- Inset highlight: `0 1px 1px rgba(255,255,255,0.1)`
- `position: relative`
- `overflow: hidden`

Add a `::before` pseudo-element that creates a subtle gradient-stroke border.

Use:

- Absolute positioning with `inset: 0`.
- `border-radius: inherit`.
- `padding: 1.4px`.
- A vertical gradient that is brighter at the top and bottom edges and fades in the middle.
- CSS mask composition to display the gradient only around the border.
- `pointer-events: none`.

### `.liquid-glass-strong`

Create a stronger variant with:

- `backdrop-filter: blur(50px)`.
- `-webkit-backdrop-filter: blur(50px)`.
- `box-shadow: 4px 4px 4px rgba(0,0,0,0.05), inset 0 1px 1px rgba(255,255,255,0.15)`.
- The same masked gradient-border technique, with slightly brighter edge highlights.

Ensure pseudo-elements never block buttons, map interactions, links, or chatbot controls.

Provide a graceful fallback when backdrop filters are unavailable.

Apply these classes consistently to the navigation, floating controls, state cards, guide panel, chatbot, and capability cards.

---

## 6. Page Architecture — Exactly Two Main Full-Screen Sections

The landing page must have exactly two primary sections:

1. Hero.
2. Capabilities.

Both sections should follow the supplied visual reference, with cinematic videos and smooth animations.

Do not add extra full-screen landing-page sections.

Additional interactions should appear inside these two sections or through overlays, popovers, drawers, and state-detail views.

### SECTION 1 — HERO

Use a full-viewport section with:

- `min-height: 100svh` or an appropriate viewport-height layout.
- Black background.
- Hidden horizontal overflow.
- Atmospheric background video.
- Foreground content positioned above the video.
- Responsive layout.

Use the supplied first video as the default atmospheric background:

`https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260619_191346_9d19d66e-86a4-47f7-8dc6-712c1788c3b2.mp4`

Position it centered horizontally, covering the hero with `object-cover` and an appropriate crop.

If the video fails to load, display a beautiful dark cultural photograph or gradient fallback. Do not allow video failure to make the hero invisible.

### Navbar

Create a fixed navbar positioned near the top of the viewport.

Left:
- A circular liquid-glass logo.
- A stylized italic "B" or suitable BharatVerse symbol.

Center:
- A liquid-glass navigation pill.
- Links: Home, Explore India, Cultural Guide, Discover.
- A white or ivory CTA button: "Explore India".

Right:
- An appropriate spacer or compact mobile navigation control.

On mobile, replace the desktop navigation pill with a working mobile menu.

Navbar links must navigate or scroll to the correct destination.

### Hero content

Center the content vertically and horizontally.

Badge:

"India's heritage, one journey at a time"

Headline:

"Discover the Soul of India."

Use the BlurText component for the headline.

Supporting text:

"Explore India's extraordinary traditions, regional art, flavours, attire, festivals, and hidden cultural gems — all through one immersive experience."

Primary CTA:

"Explore the Map"

Secondary CTA:

"Meet Your Cultural Guide"

The first CTA should reveal or scroll to the interactive India map within the application. The second should open the virtual guide panel.

Add subtle motion to the badge, heading, description, and buttons using Framer Motion.

### Trust and discovery indicators

Replace the original agency statistics with meaningful project indicators.

Examples:
- "28 States to Explore"
- "A World of Living Traditions"

These are scope indicators, not claims of verified cultural coverage.

Do not invent user counts, impact metrics, or claims of official partnerships.

Add a subtle bottom indicator suggesting that users can continue scrolling to explore the capabilities section.

Keep the hero uncluttered and cinematic.

---

## 7. SECTION 2 — CAPABILITIES

Use a full-screen-height or content-driven section with:

- Black background.
- The supplied second atmospheric video.
- A foreground content layer.
- Responsive padding.
- Smooth entry animations.

Use this background video:

`https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_093722_ccfc7ebf-182f-419f-8a62-2dc02db7dd9d.mp4`

Use `object-cover` and a dark overlay if necessary to maintain text readability.

Section label:

`// Explore India's Diversity`

Heading:

"One land. Countless stories."

Supporting text:

"Every state carries its own identity, traditions, flavours, and stories waiting to be discovered."

### Capabilities cards

Create three primary cards inspired by the original reference.

All cards must use `.liquid-glass`, rounded corners, appropriate padding, and subtle hover animations.

#### Card 1 — Interactive India Map

Icon: Map or MapPinned.

Tags:
- 28 States
- Regional Discovery
- Cultural Map
- Hidden Gems

Description:

"Explore India state by state. Discover regional food, traditional attire, folk arts, festivals, heritage sites, and places beyond the usual tourist trail."

Action:
"Explore the Map"

On click, open the interactive map experience.

#### Card 2 — Virtual Cultural Guide

Icon: Compass, Sparkles, or an appropriate guide icon.

Tags:
- State Stories
- Audio Guide
- Cultural Facts
- Regional Discovery

Description:

"Meet your virtual cultural companion. Choose a state and discover its traditions, stories, landmarks, and unique cultural identity through guided exploration."

Action:
"Meet Your Guide"

On click, open the virtual guide interface.

#### Card 3 — AI Cultural Chatbot

Icon: MessageCircle or Bot.

Tags:
- Ask Questions
- Cultural Learning
- Smart Discovery
- Guided Answers

Description:

"Ask questions about Indian culture, food, attire, festivals, and art. Get relevant answers and continue exploring through linked state pages."

Action:
"Start Exploring"

On click, open the chatbot interface.

Use responsive grid behavior:

- One column on small screens.
- Three columns on desktop.

The cards should have balanced heights and meaningful hover feedback.

---

## 8. Interactive India Map

The map is the central functional feature of BharatVerse.

Implement it as a reusable component:

`src/components/IndiaMap.tsx`

Requirements:

- Display a genuine map of India with recognizable state boundaries.
- Make the supported state regions clickable.
- Highlight the selected state.
- Add hover states and accessible labels.
- Show the state name on hover or selection.
- Allow users to search by state name.
- Allow users to choose a state from a fallback selector.
- Provide a button to view the selected state's cultural details.
- Support keyboard navigation where practical.

Use a suitable licensed SVG map or state-boundary dataset. Preserve state boundaries and use accurate state names.

Do not fabricate map geometry or represent an ordinary grid of cards as a geographic map.

If a complete interactive state map cannot be implemented immediately, build the map component with a documented, replaceable geometry source and a working accessible state selector. Clearly identify any temporary map limitation.

### Selected-state experience

When a state is selected, display a liquid-glass detail panel with:

- State name.
- Region.
- Brief introduction.
- Representative image.
- Quick cultural category links.
- "Explore This State" button.
- "Ask the Guide" button.

Use a side panel or modal that adapts to mobile screens.

The selected state must drive the guide and chatbot context.

### State detail data

Create a central state data file.

Support the correct names and slugs for all 28 Indian states, and distinguish Union Territories separately if included.

Populate verified demo data for a representative set of states, including Uttar Pradesh, Rajasthan, Gujarat, Kerala, Assam, West Bengal, Maharashtra, and Nagaland.

Include fields for:

- State name.
- Region.
- Introduction.
- Representative image.
- Traditional food.
- Attire and textiles.
- Art and handicrafts.
- Festivals and customs.
- Dance and music.
- Famous destinations.
- Lesser-known destinations.
- Cultural facts.

Reuse one data-driven state detail component instead of duplicating JSX for every state.

Do not invent missing cultural facts. Label incomplete records clearly and expand them through verified sources later.

---

## 9. Virtual Cultural Guide

Implement:

`src/components/VirtualGuide.tsx`

The guide should open in a cinematic liquid-glass modal, drawer, or floating panel.

Use a visually attractive illustrated avatar or guide emblem. Do not require an external paid avatar service for the initial version.

The interface must contain:

- Greeting: "Namaste! Welcome to BharatVerse."
- A state selection control.
- A short state-specific introduction.
- Suggested topics.
- A "Discover More" action.
- A button to open the chatbot.
- Speech playback controls.

Example:

"Welcome to Rajasthan! Discover its colourful traditions, intricate crafts, traditional attire, folk music, and historic forts."

Changing the selected state must update the introduction and suggestions.

Use the Web Speech API for text-to-speech if available. Handle unsupported browsers gracefully.

Use curated local responses for the prototype.

Keep the guide logic separate from its presentation so a real AI service can be integrated later.

The guide must be functional, not just a decorative avatar.

---

## 10. Cultural Chatbot

Implement:

`src/components/CulturalChatbot.tsx`

Use a floating liquid-glass chat launcher, ideally in the bottom-right corner.

Clicking the launcher opens a polished chat panel.

The chatbot should include:

- Welcome message.
- Message bubbles for user and assistant.
- Input field.
- Send button.
- Enter-to-send support.
- Suggested question chips.
- Loading animation.
- Auto-scroll to the latest message.
- Close and minimize controls.
- Clear conversation action.
- Responsive mobile layout.

Suggested questions:

- "What is special about Rajasthan?"
- "Tell me about traditional food in Kerala."
- "Which art forms are famous in Uttar Pradesh?"
- "What makes Assam's traditions unique?"
- "Show me a lesser-known cultural destination."

### Prototype response engine

Implement a small local knowledge-based response handler.

The chatbot should:
- Recognize supported state names.
- Recognize common cultural categories.
- Use the selected state's context when available.
- Return relevant information from the shared cultural dataset.
- Offer navigation links to relevant state details.
- Handle unknown questions with a clear fallback.

Do not return random answers or pretend to call an AI model.

Keep the response engine isolated in:

`src/lib/chatbotEngine.ts`

Make it straightforward to replace the local engine with a backend API later.

Never expose secret API keys in frontend code.

---

## 11. FadingVideo Component

Implement a reusable component:

`src/components/FadingVideo.tsx`

Props:
- `src`: string or array of strings.
- `className`.
- `style`.

Required behavior:

1. Start with opacity zero.
2. Fade in over approximately 500 ms after `loadeddata`.
3. On `timeupdate`, if remaining playback time is 0.55 seconds or less, begin fading out over approximately 550 ms.
4. On `ended`, replay the same video or advance to the next video in the source array.
5. Cycle through array sources when provided.
6. Use `autoPlay`, `muted`, `playsInline`, and `preload="auto"`.

Important implementation details:

- Clean up animation frames and event listeners.
- Handle failed video sources.
- Avoid unnecessary React renders on every video time update.
- Respect reduced-motion preferences.
- Avoid visible black flashes when looping.
- Do not assume autoplay will always work on every browser.

---

## 12. BlurText Component

Implement:

`src/components/BlurText.tsx`

Props should include:
- `text`.
- `className`.
- Optional animation controls such as `staggerDelay`.

Requirements:

- Split the text into individual words.
- Wrap words in motion spans.
- Use an IntersectionObserver with a threshold near 0.1.
- Animate blur from 10px to 0px.
- Animate opacity from 0 to 1.
- Animate vertical position from 50px to 0.
- Use approximately 0.7 seconds per word.
- Use a default stagger delay of 0.1 seconds.
- Use a flex-wrapped container.
- Trigger the animation only when the text enters the viewport.
- Disconnect the observer when no longer needed.
- Support reduced-motion preferences.

Ensure the headline remains readable during and after the animation.

---

## 13. Animation Standards

Use Framer Motion for the main page transitions and interactive elements.

Shared entrance animation:

Initial:
- `filter: blur(10px)`
- `opacity: 0`
- `y: 20`

Animate:
- `filter: blur(0px)`
- `opacity: 1`
- `y: 0`

Use approximately 0.8 seconds with an ease-out curve.

Suggested delays:
- Badge: 0.4 seconds.
- Supporting content: 0.8 seconds.
- CTA buttons: 1.1 seconds.
- Discovery indicators: 1.3–1.4 seconds.

Use restrained hover motion on buttons and cards.

Avoid excessive continuous animations, distracting parallax, or animation that interferes with map interactions.

Support `prefers-reduced-motion`.

---

## 14. Suggested Project Structure

Adapt to the existing repository, but aim for a maintainable structure:

`src/`
- `components/`
  - `Navbar.tsx`
  - `FadingVideo.tsx`
  - `BlurText.tsx`
  - `IndiaMap.tsx`
  - `StateDetailPanel.tsx`
  - `VirtualGuide.tsx`
  - `CulturalChatbot.tsx`
  - `CapabilityCard.tsx`
- `sections/`
  - `HeroSection.tsx`
  - `CapabilitiesSection.tsx`
- `data/`
  - `states.ts`
  - `culturalContent.ts`
- `lib/`
  - `chatbotEngine.ts`
  - `speech.ts`
- `types/`
  - `culture.ts`
- `App.tsx`
- `main.tsx`
- `index.css`

Keep the two main page sections clearly separated.

Modals and floating panels may be separate components but should not become additional full-screen landing-page sections.

---

## 15. Responsive Design

Desktop:
- Large cinematic typography.
- Centered hero content.
- Full navigation pill.
- Three-column capabilities grid.
- Wide map with an adjacent detail panel where appropriate.

Tablet:
- Adjust heading sizes.
- Reduce card gaps.
- Keep all primary interactions accessible.

Mobile:
- Use responsive heading sizes.
- Replace desktop navigation with a working menu.
- Stack capability cards.
- Make map controls touch-friendly.
- Use full-width or bottom-sheet style panels for state details and chatbot.
- Ensure buttons are easy to tap.
- Prevent horizontal overflow.
- Keep text readable over background videos.

---

## 16. Accessibility, Performance, and Reliability

- Use semantic HTML.
- Provide accessible labels for icon-only buttons.
- Ensure keyboard-accessible controls.
- Use appropriate image alt text.
- Maintain sufficient contrast.
- Add loading and error states.
- Lazy-load noncritical images.
- Avoid loading multiple heavy background videos unnecessarily.
- Provide static image fallbacks.
- Clean up effects, observers, event listeners, and animation frames.
- Avoid React key warnings and TypeScript errors.
- Do not break video, modal, or chatbot behavior when the selected state changes.
- Keep all interactive overlays above background layers.
- Prevent pseudo-elements from intercepting pointer events.

---

## 17. Functional Acceptance Criteria

The implementation is not complete until all of the following work:

1. The application starts successfully.
2. The hero and capabilities sections are present.
3. The supplied background videos fade in and loop when available.
4. The headline uses the word-by-word BlurText animation.
5. Navbar navigation works.
6. The map supports state selection and search.
7. Selecting a state updates its detail panel.
8. The state detail content changes with the selected state.
9. The virtual guide changes its introduction when the selected state changes.
10. Speech playback works where supported.
11. The chatbot accepts typed questions and returns relevant local demo answers.
12. Chatbot responses can link to state details.
13. Capability cards open their corresponding experiences.
14. The mobile navigation works.
15. The layout works on mobile and desktop.
16. Failed video or image loads do not destroy the layout.
17. No visible primary button is inert.
18. The production build completes without TypeScript or import errors.

---

## 18. Execution Instructions

Work in this order:

1. Inspect the existing repository.
2. Confirm the available dependencies and entry point.
3. Implement the design system and liquid-glass styles.
4. Build the FadingVideo and BlurText components.
5. Build the fixed navbar and Hero section.
6. Build the Capabilities section.
7. Add the state dataset and interactive India map.
8. Add the selected-state detail panel.
9. Add the virtual cultural guide.
10. Add the local chatbot engine and chat UI.
11. Add responsive behavior and fallbacks.
12. Test the core user flows.
13. Run the production build and resolve errors.
14. Summarize the implementation and the exact commands to run it.

Do not replace the requested design with a simpler generic layout.

Do not fabricate an official partnership, real user metrics, verified data, or successful AI integration.

Do not stop at a static mockup.

**Final objective:** Deliver a beautiful, cinematic, liquid-glass BharatVerse frontend that retains the supplied agency landing-page aesthetic while making Indian cultural exploration genuinely interactive.
