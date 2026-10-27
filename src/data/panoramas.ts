import type { PanoramaKind } from '../lib/geo';

export interface PanoramaPlace {
  slug: string;
  name: string;
  place: string;
  stateId: string;
  lat: number;
  lng: number;
  caption: string;
  kind: PanoramaKind;
  /** Extra narration shown when the viewer opens. */
  story: string;
  facts: string[];
}

export const PANORAMA_PLACES: PanoramaPlace[] = [
  {
    slug: 'taj-mahal',
    name: 'The Taj Mahal',
    place: 'Agra, Uttar Pradesh',
    stateId: 'uttar-pradesh',
    lat: 27.1751,
    lng: 78.0421,
    caption: 'The white marble mausoleum on the banks of the Yamuna.',
    kind: 'photo',
    story:
      'Built between 1632 and 1653, the Taj Mahal is a mausoleum for Mumtaz Mahal, and by extension a statement of Mughal power that has outlasted the empire that raised it.',
    facts: ['UNESCO World Heritage Site', '73 m main dome', '22 years to build'],
  },
  {
    slug: 'hawa-mahal',
    name: 'Hawa Mahal',
    place: 'Jaipur, Rajasthan',
    stateId: 'rajasthan',
    lat: 26.9124,
    lng: 75.7813,
    caption: 'The honeycomb palace of pink and red sandstone.',
    kind: 'photo',
    story:
      'Five storeys and 953 jharokhas, built in 1799 so that the royal women could watch the street below without ever being seen.',
    facts: ['953 windows', '5 storeys', 'Pink sandstone and lime plaster'],
  },
  {
    slug: 'amber-fort',
    name: 'Amber Fort',
    place: 'Jaipur, Rajasthan',
    stateId: 'rajasthan',
    lat: 26.9855,
    lng: 75.8513,
    caption: 'The hill fort above the Maota lake.',
    kind: 'photo',
    story:
      'Four courtyards of Rajput and Mughal architecture: the Suraj Pol gate, the Diwan-i-Aam, the Sheesh Mahal of mirrored glass, and the Ganesh Pol steps.',
    facts: ['Maota lake below', 'Sheesh Mahal of mirrors', 'Declared a UNESCO site in 2023'],
  },
  {
    slug: 'mehrangarh-fort',
    name: 'Mehrangarh Fort',
    place: 'Jaisalmer, Rajasthan',
    stateId: 'rajasthan',
    lat: 26.9165,
    lng: 70.0723,
    caption: 'A living fort above the Golden City.',
    kind: 'sphere',
    story:
      'One of the best-preserved forts in Rajasthan, still home to a hereditary royal family that curates its museum by hand.',
    facts: ['Founded 1459', '250 royal chambers', 'Curtains of Mexranga fort cloth'],
  },
  {
    slug: 'jaisalmer-fort',
    name: 'Jaisalmer Fort',
    place: 'Jaisalmer, Rajasthan',
    stateId: 'rajasthan',
    lat: 26.9165,
    lng: 70.0883,
    caption: 'The Sonar Fort rising out of the Thar.',
    kind: 'sphere',
    story:
      'A citadel inside a city inside a citadel, built almost entirely of the yellow sandstone that gives Jaisalmer its nickname.',
    facts: ['One of the few living forts', '91 bastions', '7 of the original 92 gates remain'],
  },
  {
    slug: 'gateway-of-india',
    name: 'Gateway of India',
    place: 'Mumbai, Maharashtra',
    stateId: 'maharashtra',
    lat: 18.922,
    lng: 72.8347,
    caption: 'The 1924 basalt arch where the Raj met the Republic.',
    kind: 'sphere',
    story:
      'Built to commemorate the landing of George V, it became the ceremonial face of Bombay and the first thing visitors saw from the sea.',
    facts: ['Built 1911 – 1924', 'Indigo basalt', '34 m tall'],
  },
  {
    slug: 'red-fort',
    name: 'Red Fort',
    place: 'Delhi',
    stateId: 'delhi',
    lat: 28.6562,
    lng: 77.241,
    caption: 'The Mughal seat of power for a century.',
    kind: 'photo',
    story:
      'Shah Jahan moved the Mughal court here in 1648 from Agra, and the fort became the ceremonial heart of the empire for a hundred years.',
    facts: ['Declared a UNESCO site in 2007', 'The Diwan-i-Khas', 'Lalbagh and the Rang Mahal'],
  },
  {
    slug: 'qutub-minar',
    name: 'Qutub Complex',
    place: 'Delhi',
    stateId: 'delhi',
    lat: 28.5245,
    lng: 77.1855,
    caption: 'The first great stone tower of the Delhi Sultanate.',
    kind: 'sphere',
    story:
      'A 73 m victory tower begun in 1199, surrounded by the earliest surviving domed mosques and the iron pillar that has not rusted in eight hundred years.',
    facts: ['73 m tall', 'Iron pillar: 12% more than 99% pure', 'UNESCO World Heritage Site'],
  },
  {
    slug: 'fatehpur-sikri',
    name: 'Fatehpur Sikri',
    place: 'Agra, Uttar Pradesh',
    stateId: 'uttar-pradesh',
    lat: 27.1839,
    lng: 77.9714,
    caption: 'Akbar\'s red sandstone capital, abandoned after fourteen years.',
    kind: 'photo',
    story:
      'Built by Akbar to celebrate the birth of his son, it was occupied for barely fourteen years before the court moved back to Agra.',
    facts: ['UNESCO World Heritage Site', 'Buland Darwaza, 54 m high', 'Akshardham carved in marble'],
  },
  {
    slug: 'ghat-varanasi',
    name: 'Assi Ghat',
    place: 'Varanasi, Uttar Pradesh',
    stateId: 'uttar-pradesh',
    lat: 25.3109,
    lng: 83.0107,
    caption: 'The Ganga at dawn, and the morning aarti.',
    kind: 'photo',
    story:
      'Eighty-eight ghats step down to the river here. The aarti at dusk, with the lamps on the water, is the single most photographed evening in India.',
    facts: ['88 ghats', 'The Ganga is 2,525 km long', 'Kashi — the oldest continuously lived-in city in the world'],
  },
  {
    slug: 'varanasi-ghats',
    name: 'Varanasi Ghats',
    place: 'Varanasi, Uttar Pradesh',
    stateId: 'uttar-pradesh',
    lat: 25.3186,
    lng: 82.9739,
    caption: 'Stone steps and the river that never stops.',
    kind: 'sphere',
    story:
      'The riverfront of Varanasi is one continuous piece of human work — steps, platforms and temples built over two thousand years.',
    facts: ['2,525 km of river', '80+ bathing ghats', 'UNESCO Creative City of Music'],
  },
  {
    slug: 'konark',
    name: 'Konark Sun Temple',
    place: 'Konark, Odisha',
    stateId: 'odisha',
    lat: 19.8876,
    lng: 86.0945,
    caption: 'A stone chariot for the sun god.',
    kind: 'photo',
    story:
      'Built in the 13th century, the temple is shaped like a chariot with 24 carved wheels and stands in the Baidhya river to the east.',
    facts: ['24 carved wheels', 'UNESCO World Heritage Site', 'A chariot to carry the sun god'],
  },
  {
    slug: 'sun-temple-konark',
    name: 'The Wheels of Konark',
    place: 'Konark, Odisha',
    stateId: 'odisha',
    lat: 19.8876,
    lng: 86.0945,
    caption: 'Twenty-four wheels, each carved differently.',
    kind: 'photo',
    story:
      'Each of the 24 wheels has eight spokes and its own set of carved figures — elephants, lions, musicians and dancers — all carved from a single piece of sandstone.',
    facts: ['24 wheels', '8 spokes each', 'Dancers and musicians in relief'],
  },
  {
    slug: 'meenakshi-temple',
    name: 'Meenakshi Temple',
    place: 'Madurai, Tamil Nadu',
    stateId: 'tamil-nadu',
    lat: 9.9195,
    lng: 78.1193,
    caption: 'A temple city of fourteen painted gopurams.',
    kind: 'photo',
    story:
      'More than a temple, a town: the corridors, the tank and the thousand sculptures of the goddesses are still in daily use.',
    facts: ['14 gopurams', 'The Thousand Pillar Hall', 'Reenactment of the Rath Yatra in April'],
  },
  {
    slug: 'temple-south',
    name: 'Brihadisvara Temple',
    place: 'Thanjavur, Tamil Nadu',
    stateId: 'tamil-nadu',
    lat: 10.7828,
    lng: 79.1318,
    caption: 'The great Chola vimana at Thanjavur.',
    kind: 'photo',
    story:
      'Raised in 1010 CE, the 63 m tower is the tallest in the country and still carries the Chola frescoes on its upper storeys.',
    facts: ['63 m vimana', 'Rajaraja Chola I', 'A UNESCO World Heritage Site'],
  },
  {
    slug: 'hampi',
    name: 'Hampi',
    place: 'Karnataka',
    stateId: 'karnataka',
    lat: 15.335,
    lng: 76.4606,
    caption: 'The boulder valley capital of Vijayanagara.',
    kind: 'photo',
    story:
      'The ruined capital of a South Indian empire, spread across a granite landscape of giant boulders, temples and water tanks.',
    facts: ['The capital of Vijayanagara', 'Over 1,600 monuments', 'A UNESCO World Heritage Site'],
  },
  {
    slug: 'mysore-palace',
    name: 'Mysore Palace',
    place: 'Mysuru, Karnataka',
    stateId: 'karnataka',
    lat: 12.3052,
    lng: 76.6551,
    caption: 'An Indo-Saracenic palace lit every Sunday evening.',
    kind: 'photo',
    story:
      'Rebuilt after a fire in 1897, the palace mixes Dravidian, Indo-Saracenic and Art Deco work, and its lighting ceremony draws tens of thousands.',
    facts: ['97,000 bulbs when lit', 'Dussehra celebrations in October', 'The Wodeyar royal family still lives here'],
  },
  {
    slug: 'golden-temple',
    name: 'Golden Temple',
    place: 'Amritsar, Punjab',
    stateId: 'punjab',
    lat: 31.619,
    lng: 74.9733,
    caption: 'A gurdwara wrapped in gold, standing in a sacred tank.',
    kind: 'photo',
    story:
      'The most visited Sikh shrine in the world, and the only one with an open kitchen that feeds anyone who asks, every day of the year.',
    facts: ['Free langar for 100,000 a day', 'The Amrit Sarovar tank', 'The Darshani Deori, seen from the bridge'],
  },
  {
    slug: 'dal-lake',
    name: 'Dal Lake',
    place: 'Srinagar, Jammu & Kashmir',
    stateId: 'jammu-and-kashmir',
    lat: 34.0837,
    lng: 74.7973,
    caption: 'A lake that is a neighbourhood.',
    kind: 'sphere',
    story:
      'Four districts of floating and shore-side houses, shikara boats and lotus beds, with the Harivallabh temple on an island in the middle.',
    facts: ['12 km long', 'The Mughal terrace garden, Nishat Bagh', 'Houseboats with carved walnut hulls'],
  },
  {
    slug: 'hemis-monastery',
    name: 'Hemis Monastery',
    place: 'Leh, Ladakh',
    stateId: 'ladakh',
    lat: 34.0098,
    lng: 77.6199,
    caption: 'The wealthiest monastery in Ladakh.',
    kind: 'sphere',
    story:
      'Built in the 17th century and rebuilt after the 1684 Mongol invasion, it still keeps a treasury of gold and silver vessels.',
    facts: ['Founded in the 17th century', 'Hemis Tsechu festival in July', 'A 500-year-old printing press'],
  },
  {
    slug: 'pangong-lake',
    name: 'Pangong Tso',
    place: 'Ladakh',
    stateId: 'ladakh',
    lat: 33.7431,
    lng: 78.9153,
    caption: 'A high lake that changes colour by the hour.',
    kind: 'photo',
    story:
      'At 4,350 m the water runs from cobalt to turquoise as the wind pushes it, and in winter it freezes into a dark sheet of ice.',
    facts: ['134 km long', '4,350 m above sea level', 'Bordered by India and Tibet'],
  },
  {
    slug: 'leh-palace',
    name: 'Leh Town',
    place: 'Leh, Ladakh',
    stateId: 'ladakh',
    lat: 34.1526,
    lng: 77.5771,
    caption: 'A high-desert town under the fortress.',
    kind: 'photo',
    story:
      'Whitewashed houses, poplar trees and a 17th-century palace on the ridge, with a Buddhist monastery on the hill opposite.',
    facts: ['3,500 m above sea level', 'Leh Palace, 1600s', 'The Tibetan Buddhist Namgyal Tsemo'],
  },
  {
    slug: 'kedarnath',
    name: 'Kedarnath',
    place: 'Uttarakhand',
    stateId: 'uttarakhand',
    lat: 30.7346,
    lng: 79.0669,
    caption: 'A stone temple at 3,583 m under the Kedarnath peak.',
    kind: 'photo',
    story:
      'One of the twelve Jyotirlingas, rebuilt in the eighteenth century after the Maratha saint Shankaracharya, and standing directly below a 6,900 m peak.',
    facts: ['3,583 m high', 'The Kedarnath peak at 6,900 m', 'Open roughly May to October'],
  },
  {
    slug: 'spiti-village',
    name: 'Keylong',
    place: 'Lahaul & Spiti, Himachal Pradesh',
    stateId: 'himachal-pradesh',
    lat: 32.239,
    lng: 77.6194,
    caption: 'A cold-desert village in the Lahaul valley.',
    kind: 'photo',
    story:
      'Green fields under a desert, with monasteries, apricot orchards and the road to the Kunzum pass above.',
    facts: ['2,200 m above sea level', 'The road to Komic and the Kunzum pass', 'Baralacha and Khardung La'],
  },
  {
    slug: 'victoria-memorial',
    name: 'Victoria Memorial',
    place: 'Kolkata, West Bengal',
    stateId: 'west-bengal',
    lat: 22.5448,
    lng: 88.3424,
    caption: 'A white marble hall of 1911, in the middle of Kolkata.',
    kind: 'sphere',
    story:
      'Built from Makrana marble in the style of the Taj Mahal, and surrounded by the gardens and the Victoria Memorial Hall of the Currency Building.',
    facts: ['Built 1906 – 1921', 'Makrana marble', 'A museum of the Raj'],
  },
  {
    slug: 'sundarban',
    name: 'The Sundarbans',
    place: 'West Bengal',
    stateId: 'west-bengal',
    lat: 21.9497,
    lng: 89.1833,
    caption: 'The largest mangrove forest on earth.',
    kind: 'sphere',
    story:
      'Tidal creeks, mud islands and the only swamp tigers left in the world — a UNESCO site and a biosphere reserve.',
    facts: ['10,000 km² of mangrove', 'The Royal Bengal tiger', 'A UNESCO Biosphere Reserve'],
  },
  {
    slug: 'sivasagar',
    name: 'Kareng Ghar',
    place: 'Sivasagar, Assam',
    stateId: 'assam',
    lat: 26.9985,
    lng: 94.1657,
    caption: 'The seven-storeyed palace of the Ahom kings.',
    kind: 'photo',
    story:
      'The Ahom capital, whose brick tower was modelled on the Syrian pyramids — a reminder of the trade that reached the Brahmaputra valley.',
    facts: ['The Ahom capital from 1797', 'A 32 m brick tower', 'The Rang Ghar amphitheatre'],
  },
  {
    slug: 'jagannath-puri',
    name: 'Bayalisabati Temple',
    place: 'West Bengal',
    stateId: 'west-bengal',
    lat: 22.9461,
    lng: 87.9252,
    caption: 'A terracotta temple of the Bengal School.',
    kind: 'sphere',
    story:
      'Built in the 19th century in the Bengali atchala style, with terracotta plaques covering every surface of the walls.',
    facts: ['Bengal School of architecture', 'Terracotta plaque work', 'Dedicated to the goddess Chandi'],
  },
  {
    slug: 'khajuraho',
    name: 'Lakshmana Temple',
    place: 'Khajuraho, Madhya Pradesh',
    stateId: 'madhya-pradesh',
    lat: 24.8318,
    lng: 79.9199,
    caption: 'Carved sandstone in the Chandela style.',
    kind: 'photo',
    story:
      'One of the best of the Western Group temples, covered in sculpture that runs from battle and hunting to the most explicit imagery anywhere in Indian art.',
    facts: ['950 – 1050 CE', 'A UNESCO World Heritage Site', '35 temples in the Western Group'],
  },
  {
    slug: 'rani-ki-vav',
    name: 'Rani ki Vav',
    place: 'Patan, Gujarat',
    stateId: 'gujarat',
    lat: 23.8607,
    lng: 72.3763,
    caption: 'A stepwell temple turned upside down.',
    kind: 'photo',
    story:
      'Built in the 11th century by Queen Udayamati for Bhima I, and buried by silt until it was rediscovered in the 1980s.',
    facts: ['11th century Solanki', 'Seven levels underground', 'A UNESCO World Heritage Site'],
  },
  {
    slug: 'rann-of-kutch',
    name: 'The Rann of Kutch',
    place: 'Gujarat',
    stateId: 'gujarat',
    lat: 23.8591,
    lng: 69.9808,
    caption: 'A salt desert the size of a small country.',
    kind: 'photo',
    story:
      'A salt crust pushed up by an underground river, white and cracked by day and a mirror under a full moon.',
    facts: ['7,500 km² of salt pan', 'The Rann Utsav tent city', 'Wild asses and blackbuck'],
  },
  {
    slug: 'hyderabad-lake',
    name: 'Hussain Sagar Lake',
    place: 'Hyderabad, Telangana',
    stateId: 'telangana',
    lat: 17.4212,
    lng: 78.4739,
    caption: 'The heart-shaped lake with the Buddha statue at its centre.',
    kind: 'sphere',
    story:
      'Built in 1562 on a tributary of the Musi river, Hussain Sagar is Hyderabad’s oldest lake, crowned by an 18 m tall monolithic Buddha statue on Gibraltar Rock.',
    facts: ['Built 1562', 'Buddha statue: 18 m tall', 'Necklace Road promenade'],
  },
  {
    slug: 'diu-fort',
    name: 'Diu Fort',
    place: 'Diu',
    stateId: 'dnh-and-dd',
    lat: 20.7141,
    lng: 70.9833,
    caption: 'A Portuguese coastal fortress on the Arabian Sea.',
    kind: 'sphere',
    story:
      'Built in 1535 after the Portuguese alliance with Bahadur Shah of Gujarat, Diu Fort guarded the sea route for over four centuries.',
    facts: ['Built 1535', 'Double moat and cannons', 'St Thomas Church within'],
  },
  {
    slug: 'marina-beach',
    name: 'Chennai Beach',
    place: 'Tamil Nadu',
    stateId: 'tamil-nadu',
    lat: 13.0500,
    lng: 80.2820,
    caption: 'The long sand of the Bay of Bengal.',
    kind: 'photo',
    story:
      'One of the longest urban beaches in the world, running beside Fort St George, where the first English settlement in India was built in 1639.',
    facts: ['6 km of sand', 'Fort St George, 1639', 'The Madras filter coffee culture'],
  },
  {
    slug: 'cellular-jail',
    name: 'Cellular Jail (Kala Pani)',
    place: 'Port Blair, Andaman & Nicobar Islands',
    stateId: 'andaman-and-nicobar-islands',
    lat: 11.6738,
    lng: 92.7473,
    caption: 'The historic panopticon prison where India\'s freedom fighters were held in solitary exile.',
    kind: 'photo',
    story:
      'Completed in 1906, Cellular Jail was engineered with seven radial wings extending from a central watchtower so that no prisoner could see or communicate with another.',
    facts: ['7 radial wings with 696 solitary cells', 'National Memorial monument', 'Houses the eternal flame of freedom'],
  },
  {
    slug: 'bengaluru-bellandur',
    name: 'Bellandur Lake Horizon',
    place: 'Bengaluru, Karnataka',
    stateId: 'karnataka',
    lat: 12.9352,
    lng: 77.6698,
    caption: 'A 360-degree panorama over the expansive lake basin from the Kempapura bridge.',
    kind: 'sphere',
    story:
      'Spanning over 890 acres, Bellandur Lake is the largest water body in Bengaluru, forming a critical ecological drainage basin for the plateau.',
    facts: ['Largest lake in Bengaluru', '360° panoramic horizon', 'Ecological wetland catchment'],
  },
  {
    slug: 'ooty-ithalar',
    name: 'Sunrise over Ithalar Valley',
    place: 'Ooty, Nilgiris, Tamil Nadu',
    stateId: 'tamil-nadu',
    lat: 11.3324,
    lng: 76.6853,
    caption: 'A 360-degree aerial panorama over mist-filled tea slopes and Nilgiri pine ridges.',
    kind: 'sphere',
    story:
      'Perched at over 2,200 meters in the Nilgiris (Blue Mountains), Ithalar village is surrounded by terraced organic tea gardens and Shola forest reserves.',
    facts: ['Altitude over 2,200 m', 'Full 360° aerial sphere', 'Nilgiri biosphere tea slopes'],
  },
  {
    slug: 'shore-temple',
    name: 'Shore Temple, Mahabalipuram',
    place: 'Mamallapuram, Tamil Nadu',
    stateId: 'tamil-nadu',
    lat: 12.6164,
    lng: 80.1989,
    caption: '8th-century Pallava structural stone temple overlooking the waves of the Bay of Bengal.',
    kind: 'photo',
    story:
      'Built by Narasimhavarman II (Rajasimha) around 700 CE, the Shore Temple is one of the earliest structural stone temples of Southern India, having weathered coastal salt spray for over 1,300 years.',
    facts: ['UNESCO World Heritage Site', 'Built from cut granite blocks', 'Surpassed the 2004 tsunami without structural collapse'],
  },
];

export const PANORAMA_BY_SLUG: Record<string, PanoramaPlace> = Object.fromEntries(
  PANORAMA_PLACES.map((p) => [p.slug, p])
);

export const PANORAMAS_BY_STATE: Record<string, PanoramaPlace[]> = PANORAMA_PLACES.reduce(
  (acc, p) => {
    (acc[p.stateId] ||= []).push(p);
    return acc;
  },
  {} as Record<string, PanoramaPlace[]>
);

/** Maps a journey stop to the 360° scene captured there: "journeyId:stopIndex". */
export const JOURNEY_PANORAMAS: Record<string, string> = {
  'golden-triangle:0': 'taj-mahal',
  'golden-triangle:1': 'red-fort',
  'golden-triangle:2': 'fatehpur-sikri',
  'golden-triangle:3': 'hawa-mahal',
  'golden-triangle:4': 'amber-fort',
  'ladakh-high-road:0': 'hemis-monastery',
  'ladakh-high-road:1': 'pangong-lake',
  'ladakh-high-road:2': 'pangong-lake',
  'ladakh-high-road:3': 'hemis-monastery',
  'temple-trail-south:2': 'temple-south',
  'temple-trail-south:3': 'meenakshi-temple',
  'sundarbans-story:0': 'sundarban',
  'sundarbans-story:1': 'victoria-memorial',
  'sundarbans-story:2': 'ghat-varanasi',
  'sundarbans-story:3': 'ghat-varanasi',
  'kutch-craft-line:0': 'rann-of-kutch',
  'kutch-craft-line:1': 'rani-ki-vav',
  'kutch-craft-line:2': 'rani-ki-vav',
  'kutch-craft-line:3': 'rann-of-kutch',
};

export function panoramaForStop(journeyId: string, index: number): PanoramaPlace | null {
  const slug = JOURNEY_PANORAMAS[`${journeyId}:${index}`];
  return slug ? PANORAMA_BY_SLUG[slug] ?? null : null;
}

