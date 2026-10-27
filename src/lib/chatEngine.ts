import { STATE_STORIES, STATE_BY_ID } from '../data/states';
import { JOURNEYS } from '../data/journeys';
import type { StateStory } from '../data/types';
import type { LanguageCode } from './i18n';
import { buildMultilingualStateResponse } from './multilingualReplies';

export interface ChatReply {
  text: string;
  chips: string[];
  stateId?: string;
  image?: string;
}

export interface ChatContext {
  /** State currently open in the app, used to answer "what about here?". */
  activeStateId?: string | null;
}

const ALIASES: Record<string, string> = {
  up: 'uttar-pradesh',
  'uttar pradesh': 'uttar-pradesh',
  'utter pradesh': 'uttar-pradesh',
  bengal: 'west-bengal',
  'west bengal': 'west-bengal',
  bombay: 'maharashtra',
  mumbai: 'maharashtra',
  bangalore: 'karnataka',
  bengaluru: 'karnataka',
  mysore: 'karnataka',
  mysuru: 'karnataka',
  trivandrum: 'kerala',
  cochin: 'kerala',
  kochi: 'kerala',
  alleppey: 'kerala',
  madras: 'tamil-nadu',
  chennai: 'tamil-nadu',
  madurai: 'tamil-nadu',
  hyderabad: 'telangana',
  telangana: 'telangana',
  punjab: 'punjab',
  rajasthan: 'rajasthan',
  gujarat: 'gujarat',
  goa: 'goa',
  kerala: 'kerala',
  bihar: 'bihar',
  assam: 'assam',
  'himachal pradesh': 'himachal-pradesh',
  'himachal': 'himachal-pradesh',
  manali: 'himachal-pradesh',
  shimla: 'himachal-pradesh',
  ladakh: 'ladakh',
  'jammu and kashmir': 'jammu-and-kashmir',
  jammu: 'jammu-and-kashmir',
  kashmir: 'jammu-and-kashmir',
  srinagar: 'jammu-and-kashmir',
  'andaman and nicobar': 'andaman-and-nicobar-islands',
  andaman: 'andaman-and-nicobar-islands',
  nicobar: 'andaman-and-nicobar-islands',
  'northeast india': 'assam',
  'north east': 'assam',
  'tamil nadu': 'tamil-nadu',
  'madhya pradesh': 'madhya-pradesh',
  'uttarakhand': 'uttarakhand',
  delhi: 'delhi',
  'new delhi': 'delhi',
  'chandigarh': 'chandigarh',
  'lakshadweep': 'lakshadweep',
  puducherry: 'puducherry',
  pondicherry: 'puducherry',
  'dadra and Nagar haveli': 'dnh-and-dd',
  daman: 'dnh-and-dd',
  diu: 'dnh-and-dd',
  tripura: 'tripura',
  meghalaya: 'meghalaya',
  shillong: 'meghalaya',
  manipur: 'manipur',
  imphal: 'manipur',
  mizoram: 'mizoram',
  aizawl: 'mizoram',
  nagaland: 'nagaland',
  'arunachal pradesh': 'arunachal-pradesh',
  'arunachal': 'arunachal-pradesh',
  sikkim: 'sikkim',
  gangtok: 'sikkim',
  odisha: 'odisha',
  orissa: 'odisha',
  'chhattisgarh': 'chhattisgarh',
  jharkhand: 'jharkhand',
  'andhra pradesh': 'andhra-pradesh',
};

const STOP_WORDS = new Set([
  'the', 'a', 'an', 'is', 'are', 'was', 'about', 'tell', 'me', 'of', 'in', 'on', 'for', 'and',
  'to', 'please', 'can', 'you', 'what', 'where', 'when', 'which', 'how', 'do', 'i', 'my',
  'best', 'good', 'nice', 'know', 'like', 'want', 'would', 'give', 'some', 'any', 'there',
]);

const tokenize = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP_WORDS.has(t));

export function findState(text: string): StateStory | null {
  const lower = text.toLowerCase();
  let best: StateStory | null = null;
  let bestLen = 0;

  for (const state of STATE_STORIES) {
    const name = state.name.toLowerCase();
    if (lower.includes(name) && name.length > bestLen) {
      best = state;
      bestLen = name.length;
    }
  }
  if (best) return best;

  for (const [alias, id] of Object.entries(ALIASES)) {
    if (alias.length < 3) continue;
    if (new RegExp(`\\b${alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(lower)) {
      const state = STATE_BY_ID[id];
      if (state && alias.length > bestLen) {
        best = state;
        bestLen = alias.length;
      }
    }
  }
  return best;
}

const has = (text: string, ...words: string[]) => words.some((w) => text.includes(w));

const fmt = (n: number) => n.toLocaleString('en-IN');

export const stateSummary = (s: StateStory): string => {
  const top = s.festivals[0];
  return [
    `**${s.name}** — ${s.tagline}`,
    ``,
    `• **Capital** ${s.capital}  •  **Area** ${fmt(s.areaKm2)} km²  •  **Population** ~${s.populationCrore} crore`,
    `• **Languages** ${s.languages.join(', ')}`,
    `• **Best time** ${s.bestMonths}`,
    `• **Signature dishes** ${s.cuisine.slice(0, 3).join(', ')}`,
    `• **Don\'t miss** ${s.landmarks[0].name} — ${s.landmarks[0].note.toLowerCase()}`,
    top ? `• **Festival** ${top.name} (${top.when}) — ${top.note}` : '',
    ``,
    s.vibe,
  ]
    .filter(Boolean)
    .join('\n');
};

export const stateFood = (s: StateStory): string =>
  [
    `**Eat this in ${s.name}**`,
    ``,
    ...s.cuisine.map((c) => `• ${c}`),
    ``,
    `Pair it with ${s.artForms[0].toLowerCase()} in the background — ${s.name} is as much about its craft as its plate.`,
  ].join('\n');

export const stateFestivals = (s: StateStory): string =>
  [
    `**Festivals of ${s.name}**`,
    ``,
    ...s.festivals.map((f) => `• **${f.name}** (${f.when}) — ${f.note}`),
    ``,
    `Best window for most of them: ${s.bestMonths}.`,
  ].join('\n');

export const statePlaces = (s: StateStory): string =>
  [
    `**Landmarks in ${s.name}**`,
    ``,
    ...s.landmarks.map((l) => `• **${l.name}** — ${l.note}`),
    ``,
    `Nature here: ${s.nature.toLowerCase()}.`,
    ``,
    `Local tip: ${s.guideTip}`,
  ].join('\n');

const stateWildlife = (s: StateStory): string =>
  [
    `**Wildlife of ${s.name}**`,
    ``,
    `• **State animal** ${s.stateAnimal}`,
    `• **State bird** ${s.stateBird}`,
    `• **Landscape** ${s.nature}`,
    ``,
    `Go in ${s.bestMonths} — that is when most sanctuaries open and the forest is easiest to track.`,
  ].join('\n');

const INDIA_FACTS = [
  `**India in one screen**`,
  ``,
  `• **28 states and 8 union territories**, each with its own script, spice and rhythm`,
  `• **1.4 billion people** across seven major linguistic zones`,
  `• **6,000+ years** of continuous civilisation, from Indus Valley cities to the space age`,
  `• Seasons run from Himalayan snow to the equatorial backwaters, all within 3,000 km`,
  ``,
  `Ask me about a specific state, a festival, food, an itinerary, or a budget.`,
].join('\n');

const BEST_TIME = [
  `**When to travel India**`,
  ``,
  `• **October – March** — the mainstream window. Pleasant everywhere, best in the north and the desert.`,
  `• **April – June** — the Himalaya opens up, and it is the best time for tigers in the reserves.`,
  `• **June – September** — the monsoon. Kerala, Goa and Konkan turn green and dramatic; the plains clear of heat.`,
  `• **November – February** — the festivals: Diwali, Durga Puja, Hornbill, Pushkar, Rann Utsav.`,
  ``,
  `Tell me the state and I will narrow it down.`,
].join('\n');

const FOOD_INTRO = [
  `**A short tour of Indian food**`,
  ``,
  `• **North** — tandoori breads, dal makhani, Mughlai kebabs and chole bhature`,
  `• **South** — dosa, sambar, Malabar biryani, Chettinad spice and filter coffee`,
  `• **East** — mustard-fish, sweets such as rosogolla and kheer, and milk sweets`,
  `• **West** — Gujarati thali, dhokla, laal maas, Goan vindaloo and Portuguese plates`,
  `• **North East** — smoked pork, bamboo shoot, axone and sticky rice`,
  ``,
  `Name a state and I will send you its five signature dishes.`,
].join('\n');

const FESTIVAL_INTRO = [
  `**The festivals that move the country**`,
  ``,
  `• **Durga Puja** (West Bengal, September) — five nights of pandals`,
  `• **Onam** (Kerala, August) — flower carpets and a twenty-course sadya`,
  `• **Diwali** (all India, October) — lamps, sweets and family`,
  `• **Holi** (north India, March) — the festival of colour`,
  `• **Hornbill** (Nagaland, December) — ten days of state dance`,
  `• **Pushkar Fair** (Rajasthan, October) — camels, crafts and the desert`,
  `• **Baisakhi** (Punjab, April) — harvest, kite-flying and the Khalsa`,
  `• **Chhath Puja** (Bihar, November) — four days of dawn and dusk offerings`,
  ``,
  `Ask me “festivals in Kerala” for the local calendar.`,
].join('\n');

const BUDGET = [
  `**A realistic budget**`,
  ``,
  `• **Backpacker** ₹1,500 – ₹2,500 a day (hostels, trains, street food)`,
  `• **Comfort** ₹4,000 – ₹7,000 a day (budget hotels, AC trains, good food)`,
  `• **Premium** ₹9,000+ a day (heritage stays, private cars, fine dining)`,
  ``,
  `**Cost-saving moves** — travel by night train, eat where the locals eat, and book heritage` +
    ` properties directly; many state tourism sites offer better rates than OTAs.`,
  ``,
  `The curated routes on this page carry per-person estimates — ask me for any of them.`,
].join('\n');

const CULTURE = [
  `**The many faces of Indian culture**`,
  ``,
  `• **Classical dance** — Bharatanatyam, Kathak, Odissi, Kathakali, Manipuri, Sattriya, Kuchipudi`,
  `• **Music** — Carnatic and Hindustani traditions, Sufi qawwali, Baul, folk and tribal drums`,
  `• **Craft** — Banarasi and Kanjeevaram silk, Pochampally ikat, Kalamkari, Pattachitra, Bidri`,
  `• **Cuisine** — one of the world\'s great food cultures, changed by every invasion, coast and harvest`,
  `• **Faith** — Hindu, Sikh, Jain, Buddhist, Christian, Islamic and tribal traditions, often side by side`,
  ``,
  `Ask “art of Assam” or “craft of Gujarat” for the detail.`,
].join('\n');

const WILDLIFE = [
  `**Wildlife across India**`,
  ``,
  `• **Tigers** — Madhya Pradesh has the best chance of any state; also Maharashtra, Assam, West Bengal, Karnataka`,
  `• **Asiatic lions** — Gir, Gujarat: the only place on earth`,
  `• **Snow leopard** — Ladakh, Himachal Pradesh, Uttarakhand, Sikkim`,
  `• **Rhino** — Kaziranga and Manas in Assam`,
  `• **Elephants** — Nagarhole, Bandipur, Periyar, and the herds of the Nilgiris`,
  `• **One-horned rhino** — Assam\'s riverine grasslands`,
  `• **Birds** — the Rann, the Keoladeo Ghana sanctuary and the mangrove creeks of the Sundarbans`,
  ``,
  `The best safari months are **February – June**, when forest cover thins and water holes shrink.`,
].join('\n');

const ITINERARY = [
  `**How to plan a trip with me**`,
  ``,
  `1. Tell me the **mood** — temples, tigers, mountains, food, beach, festivals, or a slow road trip.`,
  `2. Tell me the **days** you have and roughly the **budget**.`,
  `3. I will assemble a route from the curated journeys on this page and flag the best months.`,
  ``,
  `For example: “5 days, food and temples, budget ₹20,000”.`,
].join('\n');

const HELP = [
  `**I am your offline guide** — everything I know is already inside this page, so I work without a network.`,
  ``,
  `Try asking me:`,
  `• “Tell me about Kerala”`,
  `• “Best time to visit Rajasthan”`,
  `• “Food in Punjab”`,
  `• “Festivals in Assam”`,
  `• “Plan me 5 days in the north”`,
  `• “Wildlife in Madhya Pradesh”`,
  `• “Surprise me”`,
].join('\n');

const COMPARISON = (a: StateStory, b: StateStory): string =>
  [
    `**${a.name} vs ${b.name}**`,
    ``,
    `| | ${a.name} | ${b.name} |`,
    `| --- | --- | --- |`,
    `| Region | ${a.region} | ${b.region} |`,
    `| Capital | ${a.capital} | ${b.capital} |`,
    `| Area | ${fmt(a.areaKm2)} km² | ${fmt(b.areaKm2)} km² |`,
    `| Best months | ${a.bestMonths} | ${b.bestMonths} |`,
    `| Must-eat | ${a.cuisine[0]} | ${b.cuisine[0]} |`,
    `| Festival | ${a.festivals[0]?.name ?? '—'} | ${b.festivals[0]?.name ?? '—'} |`,
    `| Vibe | ${a.vibe} | ${b.vibe} |`,
    ``,
    `If you had to pick one: go for **${a.name}** if you want ${a.nature.split(',')[0].toLowerCase()}; ` +
      `go for **${b.name}** if you want ${b.nature.split(',')[0].toLowerCase()}.`,
  ].join('\n');

const SURPRISE = (): string => {
  const state = STATE_STORIES[Math.floor(Math.random() * STATE_STORIES.length)];
  const journey = JOURNEYS[Math.floor(Math.random() * JOURNEYS.length)];
  return [
    `**Surprise: ${state.name}** — ${state.tagline}`,
    ``,
    `${state.vibe}`,
    ``,
    `Three places to start: ${state.landmarks.map((l) => l.name).join(', ')}.`,
    `Eat: ${state.cuisine.slice(0, 2).join(' and ')}.`,
    `Go: ${state.bestMonths}.`,
    ``,
    `And if you want a bigger trip: the **${journey.name}** route (${journey.duration}, ${journey.budget}).`,
  ].join('\n');
};

const CHIPS_GENERAL = [
  'Tell me about Kerala',
  'Best time to visit India',
  'Festivals in Assam',
  'Plan me a 5-day trip',
  'Budget for 7 days',
  'Surprise me',
];

const chipsForState = (s: StateStory): string[] => [
  `Food in ${s.name}`,
  `Festivals in ${s.name}`,
  `Places in ${s.name}`,
  `Wildlife in ${s.name}`,
  `Best time for ${s.name}`,
];

const chipsForJourney = (j: (typeof JOURNEYS)[number]): string[] => [
  `Tell me about ${j.name}`,
  `Budget for ${j.name}`,
  `Best time for ${j.name}`,
  'Plan me a 5-day trip',
];

/** Detect a "compare A and B" question. */
function findComparison(text: string): [StateStory, StateStory] | null {
  const lower = text.toLowerCase();
  if (!/\b(vs|versus|compare|compared)\b/.test(lower)) return null;
  const found: StateStory[] = [];
  for (const state of STATE_STORIES) {
    if (lower.includes(state.name.toLowerCase())) found.push(state);
  }
  if (found.length >= 2) return [found[0], found[1]];
  for (const [alias, id] of Object.entries(ALIASES)) {
    if (alias.length < 4) continue;
    if (new RegExp(`\\b${alias}\\b`).test(lower)) {
      const state = STATE_BY_ID[id];
      if (state && !found.includes(state)) found.push(state);
    }
    if (found.length >= 2) break;
  }
  return found.length >= 2 ? [found[0], found[1]] : null;
}

const JOURNEY_WORDS = JOURNEYS.map((j) => j.name.toLowerCase());

/**
 * Fully local, retrieval-based conversational engine.
 * No network calls — everything is answered from the bundled dataset.
 */
export function localReply(input: string, context: ChatContext = {}, lang: LanguageCode = 'en'): ChatReply {
  const text = input.trim();
  const lower = text.toLowerCase();
  const tokens = tokenize(text);
  const state = findState(text) ?? (context.activeStateId ? STATE_BY_ID[context.activeStateId] ?? null : null);

  if (!text) {
    return { text: 'Ask me anything about India — a state, a festival, food or a route.', chips: CHIPS_GENERAL };
  }

  // greetings
  if (
    tokens.some((t) => ['hi', 'hello', 'hey', 'namaste', 'hola', 'assalam', 'vanakkam', 'namaskara'].includes(t)) ||
    has(lower, 'नमस्ते', 'नमस्कार', 'নমস্কার', 'வணக்கம்', 'నమస్కారం', 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ')
  ) {
    return {
      text: `Namaste! I am Tara, your BharatVerse cultural guide. I run seamlessly across all pages.\n\nAsk me about any of the 28 states, 8 union territories, traditional attire, famous cuisine, arts, festivals, or hidden gems!`,
      chips: CHIPS_GENERAL,
    };
  }

  if (has(lower, 'thank', 'thanks', 'shukriya', 'dhanyawad', 'धन्यवाद')) {
    return { text: 'Happy to help! Ask me about any state, festival, attire, dish or route across India.', chips: CHIPS_GENERAL };
  }

  if (has(lower, 'bye', 'goodbye', 'see you', 'alvida')) {
    return { text: 'Namaste! Safe travels and keep exploring the rich cultural heritage of Bharat.', chips: CHIPS_GENERAL };
  }

  // identity
  if (has(lower, 'who are you', 'what are you', 'your name', 'about you', 'bharatverse', 'who is tara')) {
    return {
      text: [
        '**BharatVerse** is an interactive liquid-glass digital atlas of India — 28 states and 8 union territories, each with rich cultural pillars.',
        '',
        'I am **Tara**, your cultural virtual guide. I can speak and understand queries in 10 Indian languages (English, Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, and Punjabi). Everything I share comes from verified cultural archives, working both offline and online.',
        '',
        'Click any state on the map or select a monument to explore in 360°.',
      ].join('\n'),
      chips: CHIPS_GENERAL,
    };
  }

  if (has(lower, 'help', 'what can you do', 'commands', 'how do i use')) {
    return { text: HELP, chips: CHIPS_GENERAL };
  }

  // comparison
  const comparison = findComparison(text);
  if (comparison) {
    return {
      text: COMPARISON(comparison[0], comparison[1]),
      chips: [`Food in ${comparison[0].name}`, `Food in ${comparison[1].name}`, 'Plan me a 5-day trip'],
      stateId: comparison[0].id,
    };
  }

  // journey-specific questions
  const journey = JOURNEYS.find((j) => lower.includes(j.name.toLowerCase()));
  if (journey) {
    if (has(lower, 'budget', 'cost', 'price', 'expensive')) {
      return {
        text: `**${journey.name}** costs about **${journey.budget}** for ${journey.days} days.\n\nDifficulty: ${journey.difficulty}. Best window: ${journey.bestTime}.\n\nRoute: ${journey.subtitle} — ${journey.distance}.`,
        chips: chipsForJourney(journey),
      };
    }
    if (has(lower, 'plan', 'itinerary', 'day', 'days', 'schedule', 'route')) {
      return {
        text: [
          `**${journey.name}** — ${journey.subtitle}`,
          `*${journey.tagline}*`,
          '',
          ...journey.plan.map((p) => `• **${p.day} · ${p.title}** — ${p.detail}`),
          '',
          `Pack: ${journey.kit.slice(0, 3).join(', ')}.`,
        ].join('\n'),
        chips: chipsForJourney(journey),
      };
    }
    return {
      text: [
        `**${journey.name}**`,
        `*${journey.tagline}*`,
        '',
        `• **Duration** ${journey.duration}  •  **Distance** ${journey.distance}`,
        `• **Budget** ${journey.budget}  •  **Difficulty** ${journey.difficulty}`,
        `• **Best time** ${journey.bestTime}`,
        '',
        '**Stops**',
        ...journey.stops.map((s, i) => `${i + 1}. **${s.title}** — ${s.place}. ${s.description}`),
        '',
        'Open the Virtual Guide section to walk through it in 3D.',
      ].join('\n'),
      chips: chipsForJourney(journey),
    };
  }

  // state specific queries (5 cultural pillars and travel)
  if (state) {
    // 1. Traditional Attire
    if (has(lower, 'attire', 'clothes', 'dress', 'saree', 'dhoti', 'wear', 'costume', 'कपड़ा', 'पोशाक', 'वेशभूषा', 'পোশাক', 'உடை', 'దుస్తులు')) {
      return {
        text: buildMultilingualStateResponse(state, lang, 'attire'),
        chips: chipsForState(state),
        stateId: state.id,
        image: state.image,
      };
    }

    // 2. Famous Food
    if (has(lower, 'food', 'eat', 'cuisine', 'dish', 'dishes', 'restaurant', 'veg', 'non veg', 'खाना', 'व्यंजन', 'খাবার', 'உணவு', 'వంటకాలు', 'खाद्य')) {
      return {
        text: buildMultilingualStateResponse(state, lang, 'food'),
        chips: chipsForState(state),
        stateId: state.id,
        image: state.image,
      };
    }

    // 3. Art and Craft
    if (has(lower, 'craft', 'art', 'handloom', 'dance', 'music', 'painting', 'कला', 'हस्तशिल्प', 'কারুশিল্প', 'கைவினை', 'చేతిపనులు')) {
      return {
        text: buildMultilingualStateResponse(state, lang, 'craft'),
        chips: chipsForState(state),
        stateId: state.id,
        image: state.image,
      };
    }

    // 4. Traditions and Festivals
    if (has(lower, 'festival', 'festivals', 'celebration', 'fair', 'mela', 'utsav', 'त्यौहार', 'उत्सव', 'पर्व', 'উৎসব', 'திருவிழா', 'పండుగ')) {
      return {
        text: buildMultilingualStateResponse(state, lang, 'festivals'),
        chips: chipsForState(state),
        stateId: state.id,
        image: state.image,
      };
    }

    // 5. Hidden Gem
    if (has(lower, 'hidden gem', 'gem', 'secret', 'offbeat', 'unexplored', 'mystery', 'रहस्य', 'अन्वेषित', 'লুকানো রত্ন', 'பொக்கிஷம்')) {
      return {
        text: buildMultilingualStateResponse(state, lang, 'hiddenGem'),
        chips: chipsForState(state),
        stateId: state.id,
        image: state.image,
      };
    }

    // Wildlife
    if (has(lower, 'wildlife', 'animal', 'bird', 'tiger', 'sanctuary', 'national park', 'forest', 'nature')) {
      return { text: stateWildlife(state), chips: chipsForState(state), stateId: state.id, image: state.image };
    }

    // Travel / How to reach
    if (has(lower, 'how to reach', 'reach', 'transport', 'train', 'bus', 'flight', 'airport', 'travel to')) {
      return {
        text: [
          `**Reaching ${state.name}**`,
          '',
          `• **Gateway** — ${state.capital} is the prime hub connecting flights and high-speed rail.`,
          `• **Best window to travel** ${state.bestMonths}, when weather is ideal.`,
          '',
          `Local Tip: ${state.guideTip}`,
        ].join('\n'),
        chips: chipsForState(state),
        stateId: state.id,
      };
    }

    // Default state response (comprehensive 5 pillars)
    return {
      text: buildMultilingualStateResponse(state, lang),
      chips: chipsForState(state),
      stateId: state.id,
      image: state.image,
    };
  }

  // general intents
  if (has(lower, 'best time', 'when to visit', 'best season', 'when should i visit', 'best month')) {
    return { text: BEST_TIME, chips: CHIPS_GENERAL };
  }
  if (has(lower, 'food', 'eat', 'cuisine', 'dish', 'dishes', 'restaurant', 'taste', 'delicacy')) {
    return { text: FOOD_INTRO, chips: CHIPS_GENERAL };
  }
  if (has(lower, 'festival', 'festivals', 'celebration', 'mela', 'utsav', 'fair')) {
    return { text: FESTIVAL_INTRO, chips: CHIPS_GENERAL };
  }
  if (has(lower, 'budget', 'cost', 'cheap', 'expensive', 'money', 'spend')) {
    return { text: BUDGET, chips: CHIPS_GENERAL };
  }
  if (has(lower, 'culture', 'art', 'craft', 'dance', 'music', 'tradition', 'heritage')) {
    return { text: CULTURE, chips: CHIPS_GENERAL };
  }
  if (has(lower, 'wildlife', 'tiger', 'animal', 'bird', 'sanctuary', 'national park', 'jungle', 'forest')) {
    return { text: WILDLIFE, chips: CHIPS_GENERAL };
  }
  if (has(lower, 'itinerary', 'plan', 'route', 'trip', 'days', 'holiday', 'vacation')) {
    return { text: ITINERARY, chips: CHIPS_GENERAL };
  }
  if (has(lower, 'surprise', 'random', 'anywhere', 'shock me')) {
    return { text: SURPRISE(), chips: CHIPS_GENERAL };
  }
  if (has(lower, 'india', 'bharat', 'country', 'how many states', 'states')) {
    return { text: INDIA_FACTS, chips: CHIPS_GENERAL };
  }

  // journey keyword without the full name
  if (JOURNEY_WORDS.some((w) => lower.includes(w.split(' ')[0]) && w.split(' ').length > 1)) {
    const j = JOURNEYS.find((x) => lower.includes(x.name.toLowerCase().split(' ')[0]));
    if (j) {
      return {
        text: `**${j.name}** — ${j.subtitle}\n\n${j.tagline}\n\n${j.duration} · ${j.budget} · best in ${j.bestTime}.`,
        chips: chipsForJourney(j),
      };
    }
  }

  // fallback — try to be useful
  const close = STATE_STORIES.filter((s) =>
    s.name.toLowerCase().includes(tokens[0] ?? '___') ||
    tokens.some((t) => s.name.toLowerCase().includes(t))
  ).slice(0, 3);

  if (close.length) {
    return {
      text: `Did you mean one of these?\n\n${close.map((s) => `• **${s.name}** — ${s.tagline}`).join('\n')}\n\nOr type a state name directly.`,
      chips: close.map((s) => `Tell me about ${s.name}`),
    };
  }

  return {
    text: [
      'I did not quite catch that — I only know about India in this page.',
      '',
      'Try:',
      '• a state name — “Tell me about Sikkim”',
      '• “festivals in Kerala”, “food in Punjab”',
      '• “plan me 5 days in the north”',
      '• “wildlife in Madhya Pradesh”',
    ].join('\n'),
    chips: CHIPS_GENERAL,
  };
}

export { CHIPS_GENERAL, chipsForState };
