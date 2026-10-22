import type { StateStory } from './types';

export type Mood = 'All' | 'Temples' | 'Wild' | 'Coast' | 'Peaks' | 'Table' | 'Craft';

export interface CuratedStory {
  id: string;
  stateId: string;
  eyebrow: string;
  title: string;
  excerpt: string;
  body: string;
  moods: Mood[];
}

export const MOODS: Mood[] = ['All', 'Temples', 'Wild', 'Coast', 'Peaks', 'Table', 'Craft'];

export const CURATED_STORIES: CuratedStory[] = [
  {
    id: 'first-light-agra',
    stateId: 'uttar-pradesh',
    eyebrow: 'Uttar Pradesh · Agra',
    title: 'The marble that refuses to fade',
    excerpt:
      'Two hundred years of river silt, monsoon dust and a million visitors — and the Taj still catches the first light like new marble.',
    body:
      'Shah Jahan did not build a monument so much as a proof. The idea was that a thing made by grief, paid for by an empire, should outlast both. The platform, the four minarets and the inlaid pietra dura were all calculated so the light would travel across the surface in a particular way. At 6:12 on a February morning, with the mist still in the Yamuna, the whole building turns the colour of a lit peach. By seven, it is white. By nine, it is a tourist attraction. Come early. The building is not the same object at any other hour.',
    moods: ['Temples', 'Craft'],
  },
  {
    id: 'boat-with-the-tigers',
    stateId: 'west-bengal',
    eyebrow: 'West Bengal · Sundarbans',
    title: 'Where the river grew a forest',
    excerpt:
      'The largest mangrove forest on earth, where every path is a river and every ripple might be a Royal Bengal tiger.',
    body:
      'The Sundarbans is the only place on the planet where a tiger swims for a living. The water here is brackish and the ground is mud that swallows a boot to the ankle. There is no road into the forest, only creeks; guides navigate by reading the tide and by tracking the mud. What you will notice first is the silence — mangrove roots make the world sound muffled, as if the forest is underwater even when it is not.',
    moods: ['Wild', 'Coast'],
  },
  {
    id: 'salt-in-the-dark',
    stateId: 'gujarat',
    eyebrow: 'Gujarat · Rann of Kutch',
    title: 'A desert made of water',
    excerpt:
      'On a new-moon night, the Rann turns into a mirror, and the only people out walking on it are the salt-makers.',
    body:
      'The Rann is not sand; it is a crust of salt pushed up by an underground river that has been spitting brine here for millennia. In the day it is blinding white and cracked into polygons. At night, under a moon, the reflection makes it look like a lake. The Makran camel drivers, the Rabari herders and the Agarias who harvest the salt have been working this ground for centuries, following a calendar that is neither solar nor lunar but entirely local.',
    moods: ['Coast', 'Craft'],
  },
  {
    id: 'theatre-in-the-wet',
    stateId: 'kerala',
    eyebrow: 'Kerala · Thrissur',
    title: 'The night the elephants dressed up',
    excerpt:
      'Thrissur Pooram turns a monsoon-soaked town into a stage where fifty caparisoned elephants and a thousand drums compete until dawn.',
    body:
      'Pooram is a competition. Not a parade — a competition, in which each temple presents its own percussion ensemble, its own fireworks and its own elephants, and the crowd decides the winner by sound volume and by how long they will stand there. It starts in the evening and ends at dawn with a procession of caparisoned elephants in golden cloth, nettipattam and LED-lit venchamaram. It is loud, it is absurd, and it is a hundred years old.',
    moods: ['Craft', 'Temples'],
  },
  {
    id: 'blue-ladakh',
    stateId: 'ladakh',
    eyebrow: 'Ladakh · Pangong Tso',
    title: 'A lake that changes its mind',
    excerpt:
      'At 4,350 metres, Pangong Tso shifts from cobalt to turquoise by afternoon — and then, in winter, freezes solid overnight.',
    body:
      'There is a word in Ladakhi for the particular blue that happens when the sun is low and the air is dry. The lake sits at 4,350 metres and is 134 kilometres long, most of it in Tibet, which is why you can walk to a shore that belongs to no country. The wind here is serious. The silence is more serious. In winter the temperature drops past minus twenty-five and the surface becomes a dark sheet of ice that the Tibetans say is "the sky falling".',
    moods: ['Peaks'],
  },
  {
    id: 'the-monsoon-bowl',
    stateId: 'maharashtra',
    eyebrow: 'Maharashtra · Western Ghats',
    title: 'When the hills become a waterfall',
    excerpt:
      'In July the Ghats release the whole year of rain at once, and every waterfall in the Sahyadris runs hard for a single week.',
    body:
      'The Sahyadris run parallel to the west coast, and when the south-west monsoon hits them, the orographic lift is so violent that a whole season of rain arrives in a few days. The result is a country of temporary waterfalls — a hundred feet of water over a basalt ledge, gone in ten days. Locals call it the "waterfall week", and it is the one time of year when the mountains are louder than the traffic.',
    moods: ['Peaks', 'Wild'],
  },
  {
    id: 'nine-metres-of-saffron',
    stateId: 'jammu-and-kashmir',
    eyebrow: 'Jammu & Kashmir · Pampore',
    title: 'The crocus that wakes a valley',
    excerpt:
      'For six weeks in late autumn, the Pampore plateau is a bruise of purple — and every gram of saffron is worth more than its weight in silver.',
    body:
      'The kesar crocus is planted in September and flowers in October, and it must be picked in the hours after dawn because the flower closes as the sun climbs. It takes about 150,000 flowers for a kilogram of saffron, and each flower gives three red stigmas that must be separated by hand. The whole thing smells faintly of hay and honey. Pampore has been growing it for a thousand years, and the region\'s kesar is still the reference against which other saffron is judged.',
    moods: ['Peaks', 'Craft'],
  },
  {
    id: 'the-plateau-of-lions',
    stateId: 'gujarat',
    eyebrow: 'Gujarat · Gir',
    title: 'The last of the Asiatic lions',
    excerpt:
      'Roughly 670 lions walk the Gir forests, and they are the only ones left anywhere in the world.',
    body:
      'The Asiatic lion once stretched from Greece to eastern India. By 1900 there were perhaps a dozen left in the Gir forest, and the species survived only because the Nawab of Junagadh refused to hunt them and set aside a stretch of the Gir as protected ground. The number has recovered, but the population has a fatal weakness: every lion descends from that one tiny founding group, so the entire species carries the same genetic material. A single epidemic could undo a century of recovery.',
    moods: ['Wild'],
  },
  {
    id: 'the-plastic-bloom',
    stateId: 'andhra-pradesh',
    eyebrow: 'Andhra Pradesh · Konaseema',
    title: 'A temple built from a plastic wasteyard',
    excerpt:
      'In a fishing village on the Godavari delta, a new temple rises out of 25 tonnes of discarded bottles, collected by a retired schoolteacher.',
    body:
      'The Kanaka Durga temple near Pedakakani was raised from interlocking plastic bricks made from bottle waste, on land donated by a fisherman, with a workforce of local youth paid a rupee a day. It opened in 2022 and holds a record for being the largest plastic waste temple in the world. More interestingly, it changed the economics of the village: waste now has a price, which means it stops being burned.',
    moods: ['Craft', 'Temples'],
  },
  {
    id: 'coral-cities',
    stateId: 'lakshadweep',
    eyebrow: 'Lakshadweep · Agatti',
    title: 'Thirty-six islands and one reef',
    excerpt:
      'Lakshadweep is less a place than a reef: ten degrees of coral, atolls, lagoons and about 40,000 people living on it.',
    body:
      'India\'s smallest union territory is really a single atoll system running almost a thousand kilometres along the Lakshadweep ridge, which is the northernmost of the Indian Ocean\'s coral atolls. The islands are flat, sandy and barely a metre above the sea, and they sit in lagoons so clear that the bottom is visible from a boat. It is also India\'s only place where the dugong still lives, and the first place the radio picked up V.K. Krishna Menon\'s "Tryst with destiny" speech to the world.',
    moods: ['Coast', 'Wild'],
  },
  {
    id: 'the-monsoon-melody',
    stateId: 'assam',
    eyebrow: 'Assam · Majuli',
    title: 'A river island with a thousand names',
    excerpt:
      'Majuli is the largest river island on earth, a Vaishnavite island where the monks still make masks and the river still decides the map.',
    body:
      'Majuli is not permanent. It is a sandbar the Brahmaputra has been rebuilding for centuries, which means everything on it — the satras, the houses, the shrimp ponds — has been moved, once or twice. That impermanence has shaped the culture: the satras train musicians to maintain an unbroken oral repertoire precisely because nothing else here lasts. The mask-making of the Kirtan Ghar in Samaguri Satra, made of bamboo and cloth, survives in only a handful of families.',
    moods: ['Craft', 'Coast'],
  },
  {
    id: 'the-long-road-to-the-south',
    stateId: 'tamil-nadu',
    eyebrow: 'Tamil Nadu · Mahabalipuram',
    title: 'Seven temples, one rock',
    excerpt:
      'The Pancha Rathas were carved from a single granite outcrop in the 7th century, and they have never been joined.',
    body:
      'Each of the five monuments is complete, with its own plinth, walls, roof and doorway, and yet they share one continuous bed of rock — quarry-cut in place and never separated, so the seams still run between them. Each is dedicated to a different god and a different architectural stage. The Shore Temple next door, meanwhile, was built in a later idiom entirely, its tower in a style that only appears for about a century before the Cholas reinvented it. Together they are a compressed history of South Indian temple architecture.',
    moods: ['Temples', 'Craft'],
  },
];

export function storyForState(state: StateStory) {
  return CURATED_STORIES.find((s) => s.stateId === state.id);
}
