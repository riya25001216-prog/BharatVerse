export type Region = 'North' | 'South' | 'East' | 'West' | 'Central' | 'North East' | 'Islands';

export interface Festival {
  name: string;
  when: string;
  note: string;
}

export interface Landmark {
  name: string;
  note: string;
}

export interface StateStory {
  id: string;
  name: string;
  type: 'State' | 'UT';
  region: Region;
  capital: string;
  areaKm2: number;
  populationCrore: number;
  formed: string;
  languages: string[];
  cuisine: string[];
  festivals: Festival[];
  landmarks: Landmark[];
  nature: string;
  artForms: string[];
  stateAnimal: string;
  stateBird: string;
  bestMonths: string;
  vibe: string;
  guideTip: string;
  image: string;
  accent: string;
  tagline: string;
}

export interface JourneyStop {
  title: string;
  place: string;
  stateId: string;
  description: string;
  image: string;
  hotspot: { x: number; y: number };
  sound: string;
}

export interface Journey {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  duration: string;
  days: number;
  distance: string;
  budget: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  bestTime: string;
  states: string[];
  cover: string;
  stops: JourneyStop[];
  plan: { day: string; title: string; detail: string }[];
  kit: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  text: string;
  chips?: string[];
  stateId?: string;
  image?: string;
}
