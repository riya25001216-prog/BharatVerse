# About BharatVerse

BharatVerse is a cinematic, liquid-glass digital atlas of India — a journey across all 28 states and 8 union territories through 3D terrain, 360° panoramas, curated stories, a virtual cultural guide, and a multilingual chatbot.

## What it is

A premium cultural heritage and travel platform built with:

- **React 19 + TypeScript + Vite**
- **Tailwind CSS** with a dark liquid-glass design system
- **Three.js / @react-three-fiber / @react-three/drei** for the extruded 3D map and 360° panorama viewer
- **framer-motion** for entrance and scroll animations
- **react-router-dom** for client-side routing
- **d3-geo** for conic equal-area projection of Indian state boundaries
- **lucide-react** for icons

## Features

- **Interactive 3D map** — every state extruded with depth, hover lift, camera fly-to, and point-in-polygon geolocation search
- **360° panoramas** — drag-to-look equirectangular and wide panoramas of monuments and landscapes across India
- **Virtual guide** — animated 3D journeys with narration, route markers, and stop-by-stop stories
- **Ask Tara chatbot** — fully offline knowledge base with optional Ollama local LLM bridge; supports English, Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Punjabi, Kannada, Malayalam, Assamese, Odia, and Urdu
- **Cultural discoveries** — five categories per state: Traditional Attire, Famous Food, Art & Craft, Traditions & Festivals, Hidden Place
- **Trip planner** — curated itineraries with official external booking links
- **Stories** — mood-filtered editorial pieces about the animals, artisans, weather, and arguments that shaped each place

## Project structure

```
src/
  components/   # Hero, Navbar, RevealLayer, India3D, Guide3D, Chatbot, Stories, TripPlanner, etc.
  pages/        # Home, Explore, State, Panorama, Guide, Stories
  data/         # states, journeys, panoramas, curated stories, image credits
  lib/          # geo, chat engine, Ollama bridge, markdown renderer
  index.css     # fonts, animations, liquid-glass components
```

## Running the project

```bash
npm run dev      # dev server (http://localhost:5173)
npm run build    # production build
npm run preview  # preview production build (http://localhost:4173)
npm run typecheck
```

## Credits

Photographs and panoramas are sourced from Wikimedia Commons and official tourism sources with attribution retained in the footer and image credits. No API keys are stored in the frontend; any LLM integration runs through an optional local Ollama instance.
