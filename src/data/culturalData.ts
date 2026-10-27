export interface CulturalPillar {
  category: 'Traditional Attire' | 'Famous Food' | 'Art and Craft' | 'Traditions and Festivals' | 'Hidden Gem';
  title: string;
  image: string;
  summary: string;
  readMore: {
    originAndHistory: string;
    culturalSignificance: string;
    visitorOrPracticalInfo: string;
  };
  location?: string;
  howToReach?: string;
  bestTimeToVisit?: string;
}

export interface StateCulture {
  stateId: string;
  attire: CulturalPillar;
  food: CulturalPillar;
  craft: CulturalPillar;
  festivals: CulturalPillar;
  hiddenGem: CulturalPillar;
  relatedMonuments: {
    name: string;
    type: string;
    note: string;
    panoramaSlug?: string;
  }[];
}

export const CULTURAL_DATA_BY_STATE: Record<string, StateCulture> = {
  'andhra-pradesh': {
    stateId: 'andhra-pradesh',
    attire: {
      category: 'Traditional Attire',
      title: "Mangalagiri & Dharmavaram Silks",
      image: 'andhra-pradesh',
      summary: "Dharmavaram mulberry silk sarees with golden zari borders, and breathable Nizam-bordered Mangalagiri cottons.",
      readMore: {
        originAndHistory: "Vijayanagara royal looms in Anantapur and Panakala Narasimha temple.",
        culturalSignificance: "Bridal heirlooms symbolizing South Indian prestige and temple architectural motifs.",
        visitorOrPracticalInfo: "Available in Dharmavaram town and Mangalagiri handloom society outlets.",
      },
    },
    food: {
      category: 'Famous Food',
      title: "Gongura Mutton & Pootharekulu",
      image: 'andhra-pradesh',
      summary: "Fiery mutton cooked with sour sorrel leaves (Gongura), accompanied by paper-thin ghee-soaked sweet wafers.",
      readMore: {
        originAndHistory: "Sorrel leaves used in Telugu cooking for centuries; Pootharekulu originated in Atreyapuram.",
        culturalSignificance: "Balances Guntur chilli heat with deep herbal tanginess, a hallmark of Andhra spice art.",
        visitorOrPracticalInfo: "Sample in Vijayawada or Guntur; purchase authentic Pootharekulu in East Godavari.",
      },
    },
    craft: {
      category: 'Art and Craft',
      title: "Kalamkari & Kondapalli Toys",
      image: 'andhra-pradesh',
      summary: "Pen-drawn mythological temple cloths dyed with vegetable colours, and lightweight Tella Poniki wood toys.",
      readMore: {
        originAndHistory: "Srikalahasti temple banner tradition and 14th-century Rajasthani migrant woodcarvers.",
        culturalSignificance: "Preserves classical Mahabharata narratives using organic plant dyes and bamboo pens.",
        visitorOrPracticalInfo: "Visit artisan workshops in Kondapalli village or weaver lanes in Srikalahasti.",
      },
    },
    festivals: {
      category: 'Traditions and Festivals',
      title: "Tirupati Brahmotsavam & Ugadi",
      image: 'andhra-pradesh',
      summary: "The nine-day Brahmotsavam at Tirumala, and Telugu New Year celebrated with six-taste Ugadi Pachadi.",
      readMore: {
        originAndHistory: "Observed since Pallava and Chola dynasties in Bhadrapada month.",
        culturalSignificance: "Ugadi Pachadi teaches acceptance of life's mixed emotions in the coming year.",
        visitorOrPracticalInfo: "Book Tirumala darshan months in advance. Ugadi takes place in March-April.",
      },
    },
    hiddenGem: {
      category: 'Hidden Gem',
      title: "Gandikota \u2014 The Grand Canyon of India",
      image: 'andhra-pradesh',
      summary: "A dramatic river gorge cut through red Erramala sandstone by the Pennar River, crowned by a 13th-century stone fort.",
      location: "Gandikota, Kadapa District, Andhra Pradesh",
      howToReach: "75 km from Kadapa Station; 280 km from Bengaluru via NH44.",
      bestTimeToVisit: "October to March for cool canyon winds.",
      readMore: {
        originAndHistory: "Constructed in 1123 CE by Kaka Raja and Pemmasani Nayaks to guard the river gap.",
        culturalSignificance: "Features Raghunatha Swamy temple, granaries, and sheer cliffs dropping into the gorge.",
        visitorOrPracticalInfo: "Cliff camping and bouldering available; carry plenty of water and walking shoes.",
      },
    },
    relatedMonuments: [
      { name: "Tirumala Venkateswara Temple", type: "Dravidian Temple", note: "One of the wealthiest and most visited pilgrimage destinations on earth.", panoramaSlug: 'temple-south' },
      { name: "Lepakshi Veerabhadra Temple", type: "Hanging Pillar Architecture", note: "Famed for its monolithic Nandi and gravity-defying hanging pillar." },
      { name: "Borra Caves", type: "Limestone Karst", note: "Deepest caves in India with stalactite and stalagmite Shiva lingams." }
    ],
  },
  'arunachal-pradesh': {
    stateId: 'arunachal-pradesh',
    attire: {
      category: 'Traditional Attire',
      title: "Monpa Woolen Chuba & Mishmi Coats",
      image: 'arunachal-pradesh',
      summary: "Warm woolen wrap robes with sheepskin lining and geometric handwoven coats made on loin looms.",
      readMore: {
        originAndHistory: "High alpine Himalayan culture with Tibetan Mahayana Buddhist influences.",
        culturalSignificance: "Geometric tribal weaves indicate clan lineage and spiritual harmony with nature.",
        visitorOrPracticalInfo: "Handcrafted coats and slings available at Government Craft Centers in Tawang and Bomdila.",
      },
    },
    food: {
      category: 'Famous Food',
      title: "Pika Pila, Thukpa & Apong",
      image: 'arunachal-pradesh',
      summary: "Steaming vegetable-noodle broth, fiery fermented bamboo shoot relish, and organic fermented rice wine.",
      readMore: {
        originAndHistory: "Himalayan foraging, bamboo preservation, and hearthside slow fermentation.",
        culturalSignificance: "Apong is served in bamboo mugs as a sacred gesture of hospitality and kinship.",
        visitorOrPracticalInfo: "Homestays in Ziro, Tawang, and Dirang serve fresh organic meals over hearth fires.",
      },
    },
    craft: {
      category: 'Art and Craft',
      title: "Thangka Scrolls & Monpa Woodcraft",
      image: 'arunachal-pradesh',
      summary: "Devotional Buddhist scroll paintings on silk, alongside hand-turned wooden ceremonial bowls and masks.",
      readMore: {
        originAndHistory: "Preserved in Tawang Monastery since 1680 CE following strict iconographic rules.",
        culturalSignificance: "Serves as visual meditation aids and sacred protective objects blessed during rituals.",
        visitorOrPracticalInfo: "Visit the Tawang Monastery craft studio to watch monks prepare stone pigments.",
      },
    },
    festivals: {
      category: 'Traditions and Festivals',
      title: "Losar & Ziro Festival of Music",
      image: 'arunachal-pradesh',
      summary: "Tibetan Buddhist New Year with masked Cham dances, alongside the Apatani music festival.",
      readMore: {
        originAndHistory: "Ancient seasonal rites to dispel winter negativity and welcome the spring.",
        culturalSignificance: "Cham dancers don silk robes and wooden masks representing protector deities.",
        visitorOrPracticalInfo: "Losar occurs in February-March; check Inner Line Permit (ILP) rules beforehand.",
      },
    },
    hiddenGem: {
      category: 'Hidden Gem',
      title: "Dong Valley \u2014 The First Dawn of India",
      image: 'arunachal-pradesh',
      summary: "An unspoiled valley where India receives its very first ray of sunlight every day at 4:30 AM.",
      location: "Anjaw District, Eastern Arunachal Pradesh",
      howToReach: "Drive via Tezu and Walong from Dibrugarh (340 km); 90-minute pre-dawn hike.",
      bestTimeToVisit: "October to April when mountain ridges are clear of monsoon rain.",
      readMore: {
        originAndHistory: "Historic frontline during the 1962 border defense, surrounded by dense pine forests.",
        culturalSignificance: "Offers panoramic views of sunrise over the India-China-Myanmar tri-junction.",
        visitorOrPracticalInfo: "Requires a military checkpoint check; hire an experienced local guide from Walong.",
      },
    },
    relatedMonuments: [
      { name: "Tawang Monastery", type: "Mahayana Buddhist Monastery", note: "Founded in 1680 CE by Merak Lama, houses an 8-meter gilded Buddha." },
      { name: "Sela Pass", type: "Alpine Mountain Pass", note: "Altitude 4,170 m with twin sacred lakes flanked by prayer flags." },
      { name: "Ita Fort", type: "14th-Century Brick Citadel", note: "Historic fort in Itanagar built from over 8 million kiln bricks." }
    ],
  },
  'assam': {
    stateId: 'assam',
    attire: {
      category: 'Traditional Attire',
      title: "Golden Muga Silk Mekhela Chador",
      image: 'assam',
      summary: "Natural golden silk endemic to Assam, handwoven into the two-piece Mekhela Chador with red Kingkhap motifs.",
      readMore: {
        originAndHistory: "Reserved exclusively for Ahom royalty for centuries in the Brahmaputra valley.",
        culturalSignificance: "A symbol of Assamese dignity and bridal elegance; the luster increases with each wash.",
        visitorOrPracticalInfo: "Visit Sualkuchi, 35 km from Guwahati, to purchase directly from home weavers.",
      },
    },
    food: {
      category: 'Famous Food',
      title: "Kaji Nemu Masor Tenga & Khar",
      image: 'assam',
      summary: "Light tangy freshwater carp curry scented with Assam elongated lemon, with alkaline raw papaya Khar.",
      readMore: {
        originAndHistory: "River valley cuisine utilizing natural banana ash alkaline water and wild herbs.",
        culturalSignificance: "Relies on minimal oil and natural acidity rather than heavy spices, aiding digestion.",
        visitorOrPracticalInfo: "Available at authentic traditional thali restaurants in Guwahati and river steamers.",
      },
    },
    craft: {
      category: 'Art and Craft',
      title: "Assamese Jaapi & Sarthebari Bell Metal",
      image: 'assam',
      summary: "Conical bamboo and Tokou-leaf sun hats, and resonant bell-metal offering trays (Xorai).",
      readMore: {
        originAndHistory: "Historical agricultural headwear and 600-year-old royal metalcraft under Ahom kings.",
        culturalSignificance: "A miniature Jaapi and Xorai are presented as the highest token of Assamese respect.",
        visitorOrPracticalInfo: "Visit artisan workshops in Sarthebari and Nalbari to see bell-metal forged by hand.",
      },
    },
    festivals: {
      category: 'Traditions and Festivals',
      title: "Bohag Bihu & Ambubachi Mela",
      image: 'assam',
      summary: "Joyous spring New Year celebrations with Dhol and Pepa, and the sacred monsoon mela at Kamakhya.",
      readMore: {
        originAndHistory: "Vedic agricultural festivals aligned with seed sowing and rejuvenation of Mother Earth.",
        culturalSignificance: "Bihu dance unites young men and women in celebratory community open grounds.",
        visitorOrPracticalInfo: "Bohag Bihu is in mid-April. Ambubachi Mela takes place at Kamakhya Temple in late June.",
      },
    },
    hiddenGem: {
      category: 'Hidden Gem',
      title: "Majuli Island \u2014 World's Largest River Island",
      image: 'assam',
      summary: "A peaceful river island on the Brahmaputra housing 15th-century Satra monasteries and mask makers.",
      location: "Majuli District, Brahmaputra River, Assam",
      howToReach: "Regular ferry from Nimati Ghat near Jorhat (90-minute scenic river journey).",
      bestTimeToVisit: "November to March for the Raas Leela festival and migratory birds.",
      readMore: {
        originAndHistory: "Seat of Neo-Vaishnavite culture established by saint-reformer Srimanta Sankardeva.",
        culturalSignificance: "Monks at Natun Samaguri Satra craft mythological masks from bamboo, clay, and cow dung.",
        visitorOrPracticalInfo: "Stay in traditional bamboo homestays and rent bicycles to travel along village dykes.",
      },
    },
    relatedMonuments: [
      { name: "Kamakhya Temple", type: "Tantric Shakti Peeth", note: "Ancient hilltop shrine with unique subterranean natural spring sanctum." },
      { name: "Rang Ghar", type: "Ahom Royal Amphitheatre", note: "Two-storey pavilion in Sivasagar, one of the oldest amphitheaters in Asia.", panoramaSlug: 'sivasagar' },
      { name: "Kaziranga National Park", type: "UNESCO Wetland Sanctuary", note: "Sanctuary for two-thirds of the planet's great one-horned rhinoceroses." }
    ],
  },
  'bihar': {
    stateId: 'bihar',
    attire: {
      category: 'Traditional Attire',
      title: "Bhagalpuri Tussar Silk Saree",
      image: 'bihar',
      summary: "Textured handwoven silk from wild silkworms, celebrated for its natural matte sheen and breathability.",
      readMore: {
        originAndHistory: "Silk City Bhagalpur has practiced wild Tussar sericulture for over a century.",
        culturalSignificance: "Tussar sarees paired with Madhubani borders represent Mithila's intellectual heritage.",
        visitorOrPracticalInfo: "Explore the weaver societies of Champanagar in Bhagalpur for authentic hand-spun Tussar.",
      },
    },
    food: {
      category: 'Famous Food',
      title: "Litti Chokha & Thekua",
      image: 'bihar',
      summary: "Charcoal-roasted whole wheat balls stuffed with spiced sattu, dipped in desi ghee with smoked brinjal.",
      readMore: {
        originAndHistory: "Devised as durable rations during the Magadha empire; sustained ancient warriors.",
        culturalSignificance: "Thekua serves as the sacred Mahaprasad of Chhath Puja, made of wheat, jaggery and cardamom.",
        visitorOrPracticalInfo: "Patna, Gaya, and Darbhanga offer roadside stalls roasting fresh Litti over charcoal.",
      },
    },
    craft: {
      category: 'Art and Craft',
      title: "Madhubani Art & Sikki Grass Craft",
      image: 'bihar',
      summary: "Vibrant folk paintings made with twigs and fingers using natural dyes, and golden Sikki grass baskets.",
      readMore: {
        originAndHistory: "Legend holds King Janaka commissioned artists to paint Sita's wedding to Rama.",
        culturalSignificance: "Features motifs of sun, fish, and deities with distinct double borders and fish-eye profiles.",
        visitorOrPracticalInfo: "Visit Jitwarpur and Ranti villages near Madhubani to meet national awardee women artists.",
      },
    },
    festivals: {
      category: 'Traditions and Festivals',
      title: "Chhath Puja & Sonepur Mela",
      image: 'bihar',
      summary: "Four-day penance worshipping the Sun God and Chhathi Maiya standing in river waters at dawn and dusk.",
      readMore: {
        originAndHistory: "Ancient surviving Vedic ritual maintaining purity by revering both setting and rising sun.",
        culturalSignificance: "Celebrated without priests, exemplifying direct community equality on river ghats.",
        visitorOrPracticalInfo: "Experience Chhath on the Ganga ghats of Patna in October-November. Sonepur hosts a mega fair.",
      },
    },
    hiddenGem: {
      category: 'Hidden Gem',
      title: "Barabar Caves \u2014 Oldest Rock-Cut Architecture",
      image: 'bihar',
      summary: "Mauryan-era rock-cut caves carved into granite monoliths in 322 BCE with mirror-polished echo chambers.",
      location: "Makhdumpur, Jehanabad District, Bihar",
      howToReach: "40 km north of Gaya; rail to Bela Station followed by an 11 km taxi drive.",
      bestTimeToVisit: "October to February for comfortable cool weather.",
      readMore: {
        originAndHistory: "Dedicated by Emperor Ashoka to Ajivika ascetics, pre-dating Buddhist cave complexes.",
        culturalSignificance: "Granite surfaces are polished to a glass-like 'Mauryan polish' generating a 7-second acoustic echo.",
        visitorOrPracticalInfo: "Carry a torch to observe the mirror finish inside Lomas Rishi Cave; test acoustic echo.",
      },
    },
    relatedMonuments: [
      { name: "Mahabodhi Temple Complex", type: "UNESCO Buddhist Sanctuary", note: "The sacred spot where Siddhartha Gautama attained enlightenment beneath the Bodhi tree." },
      { name: "Nalanda University Ruins", type: "Ancient Monastic University", note: "5th-century international university that housed 10,000 students and nine million manuscripts." },
      { name: "Vishwa Shanti Stupa, Rajgir", type: "White Marble Peace Pagoda", note: "Perched on Gridhakuta hill where the Buddha preached the Lotus Sutra." }
    ],
  },
  'chhattisgarh': {
    stateId: 'chhattisgarh',
    attire: {
      category: 'Traditional Attire',
      title: "Kosa Silk & Bastar Tribal Drapes",
      image: 'chhattisgarh',
      summary: "Earthy golden Kosa silk from wild forest cocoons, and hand-dyed Lugda tribal sarees with red borders.",
      readMore: {
        originAndHistory: "Forest-dwelling Dewangan weavers of Champa cultivate wild silkworms in Sal trees.",
        culturalSignificance: "Natural thermal adaptability makes Kosa silk the chosen garment for sacred weddings.",
        visitorOrPracticalInfo: "Champa and Jagdalpur registered weaver societies provide genuine Kosa silk.",
      },
    },
    food: {
      category: 'Famous Food',
      title: "Chila, Muthia & Bafauri",
      image: 'chhattisgarh',
      summary: "Crisp rice-batter crepes served with coriander-chilli chutney, and steamed chana dal Bafauri.",
      readMore: {
        originAndHistory: "Chhattisgarh cultivates over 20,000 indigenous rice varieties reflected across its foods.",
        culturalSignificance: "Traditional food is steamed or roasted with minimal oil, using wild forest herbs.",
        visitorOrPracticalInfo: "Sample breakfast snacks at Gadh Kalava food stalls in Raipur and Jagdalpur.",
      },
    },
    craft: {
      category: 'Art and Craft',
      title: "Bastar Dhokra & Wrought Iron (Loha Shilp)",
      image: 'chhattisgarh',
      summary: "Ancient lost-wax bell-metal castings, paired with scrap-iron hand-beaten sculptures.",
      readMore: {
        originAndHistory: "Practiced by the Ghadwa tribal community for over 4,000 years, tracing to Mohenjo-daro.",
        culturalSignificance: "Every piece is completely unique because the beeswax mould must be broken after casting.",
        visitorOrPracticalInfo: "Visit Kondagaon craft village (the Craft City of Bastar) to observe earthen kilns.",
      },
    },
    festivals: {
      category: 'Traditions and Festivals',
      title: "Bastar Dussehra & Madai Mela",
      image: 'chhattisgarh',
      summary: "A 75-day festival worshipping Goddess Danteshwari with a massive two-tier wooden chariot.",
      readMore: {
        originAndHistory: "Initiated in the 15th century by Kakatiya King Purushottam Dev, dedicated to Divine Mother.",
        culturalSignificance: "Different tribal clans have hereditary duties: carving chariot wheels to pulling ropes.",
        visitorOrPracticalInfo: "Experience the culmination of Bastar Dussehra in Jagdalpur in October.",
      },
    },
    hiddenGem: {
      category: 'Hidden Gem',
      title: "Kutumsar Cave & Kanger Ghati Gorges",
      image: 'chhattisgarh',
      summary: "Subterranean limestone caves in dense sal forests featuring pools populated by blind cavefish.",
      location: "Kanger Ghati National Park, Bastar District",
      howToReach: "35 km south of Jagdalpur; hire a 4x4 forest vehicle with an authorized guide.",
      bestTimeToVisit: "November to April (the cave is submerged and closed during monsoons).",
      readMore: {
        originAndHistory: "Extends over 330 meters into the earth with massive stalactite and stalagmite columns.",
        culturalSignificance: "The endemic blind fish have evolved complete blindness in the perpetual dark cave pools.",
        visitorOrPracticalInfo: "Carry personal headlamps; navigate narrow vertical crevices with forest guides.",
      },
    },
    relatedMonuments: [
      { name: "Chitrakote Waterfalls", type: "Horseshoe Waterfall", note: "The 'Niagara of India', spanning up to 300 meters wide on the Indravati river." },
      { name: "Danteshwari Temple, Dantewada", type: "14th-Century Shakti Peeth", note: "Ancient seat of the tutelary deity of Bastar kings at the river confluence." },
      { name: "Sirpur Archaeological Complex", type: "Brick Monastic Ruins", note: "7th-century Buddhist monasteries, Jain viharas, and the red-brick Lakshmana Temple." }
    ],
  },
  'goa': {
    stateId: 'goa',
    attire: {
      category: 'Traditional Attire',
      title: "Kunbi Saree & Pano Bhaju",
      image: 'goa',
      summary: "Red-and-white checkered cotton sarees draped calf-length with a knotted pallu, and velvet blouses.",
      readMore: {
        originAndHistory: "Crafted by indigenous Kunbi tribal women for working in coastal paddy fields.",
        culturalSignificance: "Represents tribal empowerment, coastal resilience, and pre-colonial Konkan folk roots.",
        visitorOrPracticalInfo: "Available at specialized handloom cooperatives in Margao and Panaji.",
      },
    },
    food: {
      category: 'Famous Food',
      title: "Goan Fish Curry & Bebinca",
      image: 'goa',
      summary: "Catch-of-the-day fish in coconut milk and tangy red kokum, paired with 16-layer caramelized Bebinca.",
      readMore: {
        originAndHistory: "Confluence of Saraswat Hindu coastal cooking and 450 years of Portuguese influences.",
        culturalSignificance: "Bebinca, baked layer-by-layer over hot coals, is served at family celebrations.",
        visitorOrPracticalInfo: "Visit local shacks along Betalbatim, or heritage Portuguese mansions in Fontainhas.",
      },
    },
    craft: {
      category: 'Art and Craft',
      title: "Azulejos Glazed Ceramic Tiles",
      image: 'goa',
      summary: "Hand-glazed ceramic tiles painted in cobalt blue depicting Goan life and coastal vistas.",
      readMore: {
        originAndHistory: "Brought by the Portuguese from Moorish Spain; Goan artisans localized the motifs.",
        culturalSignificance: "Seen on facades of ancestral homes in Panaji, symbolizing Indo-Portuguese hybrid aesthetics.",
        visitorOrPracticalInfo: "Stroll through the Latin Quarter of Fontainhas in Panaji to purchase hand-painted tiles.",
      },
    },
    festivals: {
      category: 'Traditions and Festivals',
      title: "Shigmo & Feast of St. Francis Xavier",
      image: 'goa',
      summary: "Vibrant spring street parades with mythological floats, and the feast of the patron saint in Old Goa.",
      readMore: {
        originAndHistory: "Shigmo is the Konkani spring celebration of harvest and the return of warriors.",
        culturalSignificance: "Goan harmony is reflected in communities of all backgrounds joining carnival parades.",
        visitorOrPracticalInfo: "Shigmo occurs in March in Panaji and Margao. St. Francis Xavier feast is on Dec 3.",
      },
    },
    hiddenGem: {
      category: 'Hidden Gem',
      title: "Netravali Bubble Lake (Budbud Talli)",
      image: 'goa',
      summary: "A mysterious temple pond with continuous crystal bubbles rising from the bed that increase with clapping.",
      location: "Netravali, Sanguem Taluka, South Goa",
      howToReach: "70 km from Margao via Tilamol; scenic drive through spice plantations.",
      bestTimeToVisit: "October to February for clear forest trails and rich birdlife.",
      readMore: {
        originAndHistory: "Natural freshwater spring beside Gopinath temple fed by subterranean gas fissures.",
        culturalSignificance: "Regarded as a sacred natural wonder that responds playfully to sound vibrations.",
        visitorOrPracticalInfo: "Combine your visit with Savari and Mainapi waterfalls inside Netravali Sanctuary.",
      },
    },
    relatedMonuments: [
      { name: "Basilica of Bom Jesus", type: "UNESCO Baroque Basilica", note: "16th-century brick and basalt church holding the mortal remains of St. Francis Xavier." },
      { name: "Aguada Fort and Lighthouse", type: "17th-Century Coastal Fort", note: "Portuguese coastal fortress overlooking the Arabian Sea with a 79-gun battery.", panoramaSlug: 'scene-goa' },
      { name: "Shanta Durga Temple", type: "Indo-Portuguese Hindu Shrine", note: "Unique Konkani temple architecture featuring a deepstambha (lamp tower) and vaulted roof." }
    ],
  },
  'gujarat': {
    stateId: 'gujarat',
    attire: {
      category: 'Traditional Attire',
      title: "Chaniya Choli & Bandhani Odhani",
      image: 'gujarat',
      summary: "Flared ghagras stitched with mirrors and threadwork, paired with tied-and-dyed Bandhani silk dupattas.",
      readMore: {
        originAndHistory: "Bandhani tie-dye art in Kutch and Jamnagar dates back to the Indus Valley era.",
        culturalSignificance: "Mirrors are traditionally believed to deflect the evil eye; colours signal life stages.",
        visitorOrPracticalInfo: "Bhuj, Mandvi, and Jamnagar are renowned centers for authentic natural-dyed Bandhani.",
      },
    },
    food: {
      category: 'Famous Food',
      title: "Gujarati Thali, Undhiyu & Dhokla",
      image: 'gujarat',
      summary: "A vegetarian feast featuring Undhiyu (clay-pot winter vegetable bake), steamed Dhokla, and Jalebi.",
      readMore: {
        originAndHistory: "Undhiyu was traditionally cooked underground in clay pots (matlu) fired with dry leaves.",
        culturalSignificance: "The Gujarati palate balances sweet, sour, and spicy flavors with jaggery and kokum.",
        visitorOrPracticalInfo: "Savor traditional thalis at heritage dining halls in Ahmedabad, Vadodara, and Surat.",
      },
    },
    craft: {
      category: 'Art and Craft',
      title: "Patan Patola & Rogan Painting",
      image: 'gujarat',
      summary: "Double-Ikat silk sarees where warp and weft are both tie-dyed, and castor oil-based freehand paintwork.",
      readMore: {
        originAndHistory: "King Kumarapala in the 12th century brought 700 master weavers from Jalna to Patan.",
        culturalSignificance: "Double-ikat is so exact that both sides of the fabric are completely identical.",
        visitorOrPracticalInfo: "Visit the Patan Patola Museum, or Nirona village in Kutch to watch the Khatri Rogan masters.",
      },
    },
    festivals: {
      category: 'Traditions and Festivals',
      title: "Navratri Garba & Rann Utsav",
      image: 'gujarat',
      summary: "Nine consecutive nights of folk circle dance (Garba), and the moonlight desert festival on white salt.",
      readMore: {
        originAndHistory: "Garba honors the cosmic feminine creative energy of Goddess Shakti around a clay lamp.",
        culturalSignificance: "Recognized by UNESCO as Intangible Cultural Heritage, uniting communities in joy.",
        visitorOrPracticalInfo: "Navratri occurs in September-October; Rann Utsav runs from November to February.",
      },
    },
    hiddenGem: {
      category: 'Hidden Gem',
      title: "Polo Forest & Ancient Idar Temples",
      image: 'gujarat',
      summary: "A dense forest valley hiding 15th-century Jain and Shiva stone temple ruins along the Harnav River.",
      location: "Sabarkantha District, Northern Gujarat",
      howToReach: "150 km northeast of Ahmedabad (3-hour drive via Himatnagar).",
      bestTimeToVisit: "July to December when the river flows and the forest turns lush green.",
      readMore: {
        originAndHistory: "Constructed by the Parihar kings of Idar in the 10th century as a mountain sanctuary.",
        culturalSignificance: "Features carved pillars, dry-stone masonry, and a sun temple set against granite cliffs.",
        visitorOrPracticalInfo: "Trek to the Harnav dam and the Jain temples; great for bird watching and photography.",
      },
    },
    relatedMonuments: [
      { name: "Rani ki Vav, Patan", type: "UNESCO Stepwell Architecture", note: "Seven-storey inverted temple dedicated to Vishnu with over 800 classical sculptures.", panoramaSlug: 'rani-ki-vav' },
      { name: "Sun Temple, Modhera", type: "11th-Century Solanki Temple", note: "Engineered so the first ray of the equinox sun illuminates the sanctum deity.", panoramaSlug: 'rann-of-kutch' },
      { name: "Somnath Temple", type: "First of the 12 Jyotirlingas", note: "Rebuilt at the edge of the Arabian Sea where no land lies between it and Antarctica." }
    ],
  },
  'haryana': {
    stateId: 'haryana',
    attire: {
      category: 'Traditional Attire',
      title: "Daman, Kurti & Chunder",
      image: 'haryana',
      summary: "Heavy pleated circular skirt (Daman) weighing up to 15 kg, fitted Kurti, and gotta-bordered Chunder.",
      readMore: {
        originAndHistory: "Developed by Jat and Ahir agricultural communities to suit hard outdoor farming life.",
        culturalSignificance: "The wide spin of the Daman in Dhamal dance represents rural pride and agricultural vigor.",
        visitorOrPracticalInfo: "Surajkund Crafts Mela and Rohtak rural exhibitions showcase traditional hand-stitched Damans.",
      },
    },
    food: {
      category: 'Famous Food',
      title: "Bajra Khichdi & Ghar ka Makhan",
      image: 'haryana',
      summary: "Slow-cooked pearl millet porridge with homemade white butter, wild cucumber (kachri) curry, and jaggery.",
      readMore: {
        originAndHistory: "Rooted in Haryana's ancient dairy culture ('land of milk, butter, and wrestlers').",
        culturalSignificance: "Provides dense warmth and energy during freezing North Indian winter mornings.",
        visitorOrPracticalInfo: "Experience genuine village thalis at rural resorts in Kurukshetra, Jhajjar, and Murthal.",
      },
    },
    craft: {
      category: 'Art and Craft',
      title: "Panipat Durries & Jhajjar Pottery",
      image: 'haryana',
      summary: "Hand-woven cotton and woolen floor rugs, alongside red porous earthen water pitchers.",
      readMore: {
        originAndHistory: "Panipat has been a legendary center of loom weaving since the Grand Trunk Road era.",
        culturalSignificance: "Geometric dhurrie patterns carry ancestral weaver motifs representing fields and streams.",
        visitorOrPracticalInfo: "Panipat handloom market and Jhajjar potter colonies welcome direct craft buyers.",
      },
    },
    festivals: {
      category: 'Traditions and Festivals',
      title: "Gita Jayanti & Surajkund Mela",
      image: 'haryana',
      summary: "Grand cultural celebrations of the Bhagavad Gita at Brahma Sarovar, and Asia's largest craft mela.",
      readMore: {
        originAndHistory: "Kurukshetra is revered as the sacred field where Lord Krishna imparted the Gita to Arjuna.",
        culturalSignificance: "Surajkund Crafts Mela showcases master artisans from every Indian state and partner nations.",
        visitorOrPracticalInfo: "Gita Jayanti occurs in December in Kurukshetra. Surajkund Mela runs in February.",
      },
    },
    hiddenGem: {
      category: 'Hidden Gem',
      title: "Pinjore Gardens (Yadavindra Gardens)",
      image: 'haryana',
      summary: "Historic 17th-century terraced pleasure gardens with cascading fountains and Mughal pavilions.",
      location: "Pinjore, Panchkula District, Himalayan foothills",
      howToReach: "22 km from Chandigarh on the Kalka-Shimla road.",
      bestTimeToVisit: "October to March; evening visits offer illuminated fountains.",
      readMore: {
        originAndHistory: "Designed by Nawab Fidai Khan in the 17th century; terraces downward rather than upward.",
        culturalSignificance: "Combines Persian Charbagh terraces with Rajput decorative balconies.",
        visitorOrPracticalInfo: "Hosts the Mango Festival in July and Baisakhi fair in April; pleasant shaded lawns.",
      },
    },
    relatedMonuments: [
      { name: "Brahma Sarovar, Kurukshetra", type: "Ancient Sacred Water Basin", note: "Huge sacred water body mentioned in the Mahabharata, focal point of solar eclipse gatherings." },
      { name: "Sheikh Chilli's Tomb, Thanesar", type: "Mughal Architectural Mausoleum", note: "Buff sandstone tomb with pear-shaped marble dome dedicated to a Sufi master." },
      { name: "Raja Nahar Singh Palace", type: "18th-Century Ballabhgarh Fort", note: "Heritage palace with arched darbar halls, courtyards, and traditional frescoes." }
    ],
  },
  'himachal-pradesh': {
    stateId: 'himachal-pradesh',
    attire: {
      category: 'Traditional Attire',
      title: "Kullu Topi & Woolen Pattu",
      image: 'himachal-pradesh',
      summary: "Handwoven flat woolen caps with colorful geometric borders, paired with heavy sheep-wool wraps.",
      readMore: {
        originAndHistory: "Weaving flourished during snowfall months when Himalayan families stayed by warm hearths.",
        culturalSignificance: "The patterned border on a Kullu cap is a badge of honor and the official gift of welcome.",
        visitorOrPracticalInfo: "Bhuttico cooperative outlets in Kullu, Manali, and Shimla provide certified handloom shawls.",
      },
    },
    food: {
      category: 'Famous Food',
      title: "Himachali Dham & Siddu",
      image: 'himachal-pradesh',
      summary: "The festive multi-course feast (Dham) cooked in copper pots, and steamed wheat buns (Siddu) with ghee.",
      readMore: {
        originAndHistory: "Dham traces to King Jaitun of Kangra in the 12th century, inspired by royal feasts.",
        culturalSignificance: "Cooked without onion or garlic, relying on curd, mustard oil, and dried pomegranate seeds.",
        visitorOrPracticalInfo: "Sample Kangri or Chamba Dham at specialized cultural venues in Shimla and Dharamshala.",
      },
    },
    craft: {
      category: 'Art and Craft',
      title: "Chamba Rumal & Kangra Miniatures",
      image: 'himachal-pradesh',
      summary: "Double-sided silk embroidery on muslin that appears identical on both sides, and Pahari paintings.",
      readMore: {
        originAndHistory: "Flourished under Raja Umed Singh of Chamba in the 18th century, translating poetry into thread.",
        culturalSignificance: "Depicts scenes of Krishna's Raslila and wedding rituals; historically gifted to brides.",
        visitorOrPracticalInfo: "Visit the Bhuri Singh Museum in Chamba to view ancient masterpieces and live weavers.",
      },
    },
    festivals: {
      category: 'Traditions and Festivals',
      title: "Kullu Dussehra & Fagli Festival",
      image: 'himachal-pradesh',
      summary: "Week-long festival where over 200 village devtas in palanquins gather to pay homage to Raghunath.",
      readMore: {
        originAndHistory: "Begun in 1660 CE by Raja Jagat Singh, starting on the day Dussehra ends elsewhere in India.",
        culturalSignificance: "Demonstrates the living deity system where village devtas act as community guardians.",
        visitorOrPracticalInfo: "Dhalpur grounds in Kullu fill with music and trumpets in October; dress warmly.",
      },
    },
    hiddenGem: {
      category: 'Hidden Gem',
      title: "Kibber Village & Chicham Suspension Bridge",
      image: 'himachal-pradesh',
      summary: "One of the highest villages in the world at 4,270 m, perched above Spiti gorges with Asia's highest bridge.",
      location: "Spiti Valley, Lahaul & Spiti District",
      howToReach: "20 km from Kaza; accessible via Manali or Shimla-Kinnaur road.",
      bestTimeToVisit: "June to September for clear roads and blooming alpine valleys.",
      readMore: {
        originAndHistory: "Retains traditional flat-roofed mud-brick homes surrounded by snow leopard habitats.",
        culturalSignificance: "Chicham Bridge spans a 150-meter deep gorge, ending centuries of perilous ropeway crossings.",
        visitorOrPracticalInfo: "Acclimatize in Kaza first. Homestays offer warm butter tea, Thukpa, and solar power.",
      },
    },
    relatedMonuments: [
      { name: "Ki (Kye) Monastery", type: "11th-Century Gelugpa Monastery", note: "Spectacular fortress-like monastery perched at 4,166 m overlooking the Spiti River.", panoramaSlug: 'spiti-village' },
      { name: "Hadimba Devi Temple, Manali", type: "Four-Tier Pagoda Shrine", note: "16th-century cedarwood pagoda temple built around an ancient cave rock in the forest." },
      { name: "Kangra Fort", type: "Ancient Rock Fortress", note: "One of the oldest documented forts in India, mentioned in Alexander's campaign chronicles." }
    ],
  },
  'jammu-and-kashmir': {
    stateId: 'jammu-and-kashmir',
    attire: {
      category: 'Traditional Attire',
      title: "Kashmiri Phiran & Pashmina Shawl",
      image: 'jammu-and-kashmir',
      summary: "Warm loose woolen tunics with delicate Tilla gold-thread needlework, draped with ultra-fine Pashmina shawls.",
      readMore: {
        originAndHistory: "Designed to accommodate the Kangri (clay pot filled with glowing embers) inside during winters.",
        culturalSignificance: "Pashmina wool spun from Changthangi goats represents centuries of Kashmiri artisanal mastery.",
        visitorOrPracticalInfo: "Shop at Government Arts Emporiums in Srinagar or certified craft cooperatives on the Bund.",
      },
    },
    food: {
      category: 'Famous Food',
      title: "Kashmiri Wazwan & Kahwa",
      image: 'jammu-and-kashmir',
      summary: "The multi-course royal feast featuring Rogan Josh, Rista, and Gustaba, followed by saffron Kahwa tea.",
      readMore: {
        originAndHistory: "Introduced in the 14th century by master cooks from Samarkand who accompanied Timur to Kashmir.",
        culturalSignificance: "Served in four-person copper platters (Trami); cooking is overseen by master chefs (Vastas).",
        visitorOrPracticalInfo: "Sample Wazwan in traditional restaurants around Lal Chowk, and sip Kahwa on Shikara boats.",
      },
    },
    craft: {
      category: 'Art and Craft',
      title: "Papier-M\u00e2ch\u00e9 & Walnut Wood Carvings",
      image: 'jammu-and-kashmir',
      summary: "Hand-painted lacquer papier-m\u00e2ch\u00e9 with floral almond motifs, and intricate walnut wood carvings.",
      readMore: {
        originAndHistory: "Introduced by Sufi saint Mir Sayyid Ali Hamadani from Persia in the 14th century.",
        culturalSignificance: "Carved from mature walnut trees without chemical polish, featuring chinar leaf patterns.",
        visitorOrPracticalInfo: "Visit artisan karkhanas in Zadibal and Rainawari in Old Srinagar.",
      },
    },
    festivals: {
      category: 'Traditions and Festivals',
      title: "Tulip Festival & Shikara Festival",
      image: 'jammu-and-kashmir',
      summary: "Asia's largest tulip garden blooming against the Zabarwan range, and Dal Lake regattas.",
      readMore: {
        originAndHistory: "Celebrates the awakening of the Kashmir valley after months of freezing mountain snow.",
        culturalSignificance: "Shikaras are decked in flowers and textiles, accompanied by Sufiyana kalam music.",
        visitorOrPracticalInfo: "Tulip festival takes place in April at Indira Gandhi Memorial Tulip Garden in Srinagar.",
      },
    },
    hiddenGem: {
      category: 'Hidden Gem',
      title: "Doodhpathri \u2014 The Valley of Milk",
      image: 'jammu-and-kashmir',
      summary: "A bowl-shaped alpine meadow through which the frothy Shaliganga River rushes over polished stones.",
      location: "Budgam District, Central Kashmir",
      howToReach: "42 km from Srinagar Airport (2-hour drive through pine-fringed hills).",
      bestTimeToVisit: "May to October for green carpets of wildflowers and grazing sheep.",
      readMore: {
        originAndHistory: "Named because the roaring river churning against pebbles appears white like foaming milk.",
        culturalSignificance: "Far quieter than Gulmarg or Pahalgam, surrounded by dense deodar and pine forests.",
        visitorOrPracticalInfo: "Pack a warm jacket and picnic lunch; horseback riding along the riverbank is popular.",
      },
    },
    relatedMonuments: [
      { name: "Dal Lake & Floating Markets", type: "Iconic Alpine Waterway", note: "Reflective lake with wooden houseboats and early morning floating vegetable markets.", panoramaSlug: 'dal-lake' },
      { name: "Mughal Gardens (Shalimar & Nishat)", type: "Terraced Imperial Gardens", note: "17th-century stepped water gardens built by Jahangir and Shah Jahan on Dal Lake." },
      { name: "Shankaracharya Temple", type: "Ancient Hilltop Shrine", note: "8th-century stone temple perched on Gopadari Hill offering panoramic views of Srinagar." }
    ],
  },
  'jharkhand': {
    stateId: 'jharkhand',
    attire: {
      category: 'Traditional Attire',
      title: "Santhali Panchi & Parhan",
      image: 'jharkhand',
      summary: "Two-piece handloom cotton wraps with red and black geometric borders worn by Santhal tribal women.",
      readMore: {
        originAndHistory: "Woven on indigenous pit looms using unbleached cotton threads and vegetable-based dyes.",
        culturalSignificance: "Reflects the tribal harmony with nature; specific woven stripes signify clan identity.",
        visitorOrPracticalInfo: "Available at Jharcraft outlets and tribal weekly haats in Dumka, Ranchi, and Hazaribagh.",
      },
    },
    food: {
      category: 'Famous Food',
      title: "Dhuska, Ghugni & Rugda",
      image: 'jharkhand',
      summary: "Crisp fried rice-and-chana dal pancakes with spicy chickpea curry, and wild forest mushroom Rugda.",
      readMore: {
        originAndHistory: "Earthy agrarian diet combining forest-foraged mushrooms with protein-rich lentils.",
        culturalSignificance: "Rugda grows beneath Sal trees during early monsoon rains and has an earthy, meat-like texture.",
        visitorOrPracticalInfo: "Enjoy hot Dhuska at street stalls around Firayalal Chowk in Ranchi and tribal melas.",
      },
    },
    craft: {
      category: 'Art and Craft',
      title: "Sohrai & Khovar Mural Art",
      image: 'jharkhand',
      summary: "Ancient ritualistic wall paintings made by tribal women using natural red, yellow, and black clays.",
      readMore: {
        originAndHistory: "Hazaribagh cave art traditions dating back to the Mesolithic age, painted on mud walls.",
        culturalSignificance: "Recognized with a GI tag; features animals, birds, and fertility symbols painted with chew-sticks.",
        visitorOrPracticalInfo: "Visit the villages of Bhelwara and Jorakath near Hazaribagh to see living painted homes.",
      },
    },
    festivals: {
      category: 'Traditions and Festivals',
      title: "Sarhul & Karma Puja",
      image: 'jharkhand',
      summary: "Spring festival worshipping the Sal tree blossoms, and the Karma festival celebrating brotherhood and nature.",
      readMore: {
        originAndHistory: "Central religious festival of the Oraon, Munda, and Santhal tribes, honoring Mother Nature.",
        culturalSignificance: "Village priests (Pahan) offer sal flowers to ancestors; women tuck blossoms behind ears.",
        visitorOrPracticalInfo: "Sarhul takes place in March-April; tribal processions fill the streets of Ranchi with drums.",
      },
    },
    hiddenGem: {
      category: 'Hidden Gem',
      title: "Netarhat \u2014 Queen of Chotanagpur",
      image: 'jharkhand',
      summary: "A tranquil hill station perched on a laterite plateau surrounded by dense pine and sal forests.",
      location: "Latehar District, Jharkhand",
      howToReach: "155 km west of Ranchi (4-hour scenic drive across winding forest ghats).",
      bestTimeToVisit: "October to March for cool breezy mornings and clear sunset views.",
      readMore: {
        originAndHistory: "Historically used by British officials as a summer hill retreat away from the plains.",
        culturalSignificance: "Magnolia Point offers legendary sunset vistas over deep forested river valleys.",
        visitorOrPracticalInfo: "Visit the Netarhat sunrise point, Upper Ghaghri waterfall, and local pear orchards.",
      },
    },
    relatedMonuments: [
      { name: "Baidyanath Dham, Deoghar", type: "One of the 12 Sacred Jyotirlingas", note: "Ancient pilgrimage center where millions carry Ganga water during the Shravani Mela." },
      { name: "Hundru Falls", type: "320-Foot Water Cascade", note: "Spectacular waterfall on the Subarnarekha River falling over jagged metamorphic rocks." },
      { name: "Terracotta Temples of Maluti", type: "17th-Century Temple Cluster", note: "Historic cluster of 72 surviving terracotta temples depicting scenes from the Ramayana." }
    ],
  },
  'karnataka': {
    stateId: 'karnataka',
    attire: {
      category: 'Traditional Attire',
      title: "Mysore Silk & Ilkal Sarees",
      image: 'karnataka',
      summary: "Lustrous pure silk sarees infused with golden zari, and Ilkal sarees with distinctive red Topi Teni pallus.",
      readMore: {
        originAndHistory: "Patronized by the Maharajas of Mysore, who established India's first silk weaving factory.",
        culturalSignificance: "Mysore silk is known for its feather-light feel and 100% pure gold zari borders.",
        visitorOrPracticalInfo: "Purchase certified sarees directly from Karnataka Silk Industries Corporation (KSIC) showrooms.",
      },
    },
    food: {
      category: 'Famous Food',
      title: "Bisi Bele Bath & Mysore Pak",
      image: 'karnataka',
      summary: "Spicy rice-lentil stew with vegetables and tamarind, alongside melt-in-the-mouth gram flour Mysore Pak.",
      readMore: {
        originAndHistory: "Bisi Bele Bath originated in the royal kitchens of the Mysore Palace as a celebratory dish.",
        culturalSignificance: "Mysore Pak was created by royal chef Kakasura Madappa in 1935 using pure ghee and sugar syrup.",
        visitorOrPracticalInfo: "Sample original Mysore Pak at Guru Sweets in Mysore; try Bisi Bele Bath at traditional tiffin rooms.",
      },
    },
    craft: {
      category: 'Art and Craft',
      title: "Channapatna Toys & Bidriware",
      image: 'karnataka',
      summary: "Vegetable-dyed non-toxic wooden lacquer toys from Channapatna, and blackened silver-inlaid Bidriware.",
      readMore: {
        originAndHistory: "Tipu Sultan invited Persian craftsmen to teach lac-turnery to local woodworkers in Channapatna.",
        culturalSignificance: "Bidriware uses a rare soil from the Bidar Fort moat to oxidize the zinc-copper alloy jet black.",
        visitorOrPracticalInfo: "Visit Channapatna on the Bengaluru-Mysuru highway to watch wood-turning on lathes.",
      },
    },
    festivals: {
      category: 'Traditions and Festivals',
      title: "Mysore Dasara & Kambala",
      image: 'karnataka',
      summary: "Grand ten-day festival culminating in the Jumboo Savari elephant procession, and coastal buffalo races.",
      readMore: {
        originAndHistory: "Celebrated with royal grandeur since the 14th-century Vijayanagara Empire.",
        culturalSignificance: "The Mysore Palace is illuminated with over 100,000 light bulbs every evening during Dasara.",
        visitorOrPracticalInfo: "Mysore Dasara takes place in September-October; reserve palace procession tickets early.",
      },
    },
    hiddenGem: {
      category: 'Hidden Gem',
      title: "Yana Rocks \u2014 Ancient Karst Monoliths",
      image: 'karnataka',
      summary: "Two colossal black crystalline limestone rock spires rising 120 meters out of dense Sahyadri rainforests.",
      location: "Uttara Kannada District, Western Ghats",
      howToReach: "25 km from Kumta; 50 km from Gokarna; accessible via a 1.5 km forest trail.",
      bestTimeToVisit: "October to March when rain softens and forest trails are safe.",
      readMore: {
        originAndHistory: "Associated with the mythological battle between Lord Shiva and demon Bhasmasura.",
        culturalSignificance: "Bhairaveshwara Shikhara and Mohini Shikhara house a natural cave with a self-manifested lingam.",
        visitorOrPracticalInfo: "Wear slip-resistant shoes for the shaded wet rock pathway; keep an eye out for hornbills.",
      },
    },
    relatedMonuments: [
      { name: "Hampi Vijayanagara Ruins", type: "UNESCO World Heritage Site", note: "Sprawling boulder-strewn capital of the 14th-century Vijayanagara Empire with stone chariot.", panoramaSlug: 'hampi' },
      { name: "Mysore Palace", type: "Indo-Saracenic Royal Palace", note: "Magnificent palace of the Wodeyars with stained-glass ceilings and golden throne room.", panoramaSlug: 'mysore-palace' },
      { name: "Gol Gumbaz, Vijayapura", type: "Acoustic Whispering Gallery", note: "The second-largest dome in the world, renowned for echoing a whisper eleven times." }
    ],
  },
  'kerala': {
    stateId: 'kerala',
    attire: {
      category: 'Traditional Attire',
      title: "Kasavu Mundu & Neriyathu",
      image: 'kerala',
      summary: "Unbleached natural cotton cream drapes edged with shimmering pure golden zari borders.",
      readMore: {
        originAndHistory: "Worn for millennia in coastal Malabar, representing simplicity and spiritual purity.",
        culturalSignificance: "Traditional wear during Onam and Vishu, paired with fragrant jasmine flowers and gold jewelry.",
        visitorOrPracticalInfo: "Balaramapuram, Kuthampully, and Chendamangalam are famous weaving hubs for authentic handloom.",
      },
    },
    food: {
      category: 'Famous Food',
      title: "Kerala Sadya & Appam with Stew",
      image: 'kerala',
      summary: "The 26-dish feast served on a fresh banana leaf, and lacy rice crepes with coconut milk stew.",
      readMore: {
        originAndHistory: "A culinary ritual following Ayurvedic balance of sour, sweet, salty, astringent, bitter and spicy.",
        culturalSignificance: "Sadya is eaten with hands while seated cross-legged on the floor, ending with creamy Payasam.",
        visitorOrPracticalInfo: "Experience Sadya during Onam or at traditional heritage restaurants in Kochi and Trivandrum.",
      },
    },
    craft: {
      category: 'Art and Craft',
      title: "Aranmula Mirror & Coir Craft",
      image: 'kerala',
      summary: "Mysterious handmade metal-alloy mirrors made from secret copper-tin proportions in Aranmula.",
      readMore: {
        originAndHistory: "Unlike glass mirrors, it is a front-reflecting metal mirror eliminating secondary refraction.",
        culturalSignificance: "Declared a UNESCO GI craft; held as one of the eight auspicious royal objects (Ashtamangalya).",
        visitorOrPracticalInfo: "Visit master artisan families in Aranmula village near the Parthasarathy temple.",
      },
    },
    festivals: {
      category: 'Traditions and Festivals',
      title: "Thrissur Pooram & Onam",
      image: 'kerala',
      summary: "The percussion symphony of Ilanjithara Melam with caparisoned elephants, and harvest boat races.",
      readMore: {
        originAndHistory: "Instituted in the 18th century by Raja Rama Varma (Sakthan Thampuran) of Cochin.",
        culturalSignificance: "Famous for the spectacular Kudamattam (rapid exchange of colourful sequined umbrellas atop elephants).",
        visitorOrPracticalInfo: "Thrissur Pooram takes place in April-May at Vadakkumnathan temple grounds; arrive early.",
      },
    },
    hiddenGem: {
      category: 'Hidden Gem',
      title: "Gavi \u2014 Untouched Rainforest Sanctuary",
      image: 'kerala',
      summary: "A pristine eco-tourism reserve nestled inside Periyar Tiger Reserve with mist-covered cardamom valleys.",
      location: "Pathanamthitta District, Kerala",
      howToReach: "28 km from Kumily/Thekkady; accessible by Kerala Forest Development Corporation 4x4 vehicles.",
      bestTimeToVisit: "September to February for misty morning walks and wildlife sightings.",
      readMore: {
        originAndHistory: "Home to endangered Nilgiri tahrs, Lion-tailed macaques, and over 260 species of birds.",
        culturalSignificance: "Zero-plastic eco-zone with strictly capped daily tourist visitor numbers.",
        visitorOrPracticalInfo: "Advance forest department booking is required. Enjoy guided jungle safaris and rowing on Gavi lake.",
      },
    },
    relatedMonuments: [
      { name: "Alleppey Backwaters & Kettuvallam", type: "Coastal Waterway Network", note: "Traditional thatched wooden houseboats gliding along coconut-fringed palm canals.", panoramaSlug: 'scene-kerala' },
      { name: "Mattancherry Dutch Palace", type: "16th-Century Heritage Palace", note: "Built by the Portuguese and gifted to the Raja of Kochi, featuring Hindu murals." },
      { name: "Bekal Fort", type: "Coastal Defensive Bastion", note: "Largest keyhole-shaped coastal fort in Kerala, rising directly above Arabian Sea waves." }
    ],
  },
  'ladakh': {
    stateId: 'ladakh',
    attire: {
      category: 'Traditional Attire',
      title: "Ladakhi Goncha & Perak Headdress",
      image: 'ladakh',
      summary: "Voluminous woolen wrap coat bound at the waist with a bright silk sash, and turquoise-studded Perak.",
      readMore: {
        originAndHistory: "Crafted to shield high-altitude dwellers from biting Himalayan winds dropping to minus thirty.",
        culturalSignificance: "The Perak, handed down from mother to daughter, displays turquoise stones denoting family prosperity.",
        visitorOrPracticalInfo: "Traditional clothing can be admired at the Central Asian Museum and Leh market craft stores.",
      },
    },
    food: {
      category: 'Famous Food',
      title: "Skyu, Thukpa & Gur Gur Chai",
      image: 'ladakh',
      summary: "Hearty hand-kneaded pasta pellets stewed with root vegetables, and salty pink butter tea.",
      readMore: {
        originAndHistory: "Nutritionally engineered to sustain high-altitude metabolic demands in cold arid climates.",
        culturalSignificance: "Gur Gur Chai is churned in wooden cylinders with yak butter and salt to prevent dehydration.",
        visitorOrPracticalInfo: "Sample Skyu and steamed momos at traditional Ladakhi homestays in Nubra, Leh, and Zanskar.",
      },
    },
    craft: {
      category: 'Art and Craft',
      title: "Pashmina Weaving & Thangka Art",
      image: 'ladakh',
      summary: "Hand-spun ultra-soft cashmere from high-altitude Changthangi goats, and Buddhist monastic scrolls.",
      readMore: {
        originAndHistory: "Nomadic Changpa herders comb raw cashmere (lena) in the wind-swept plains of Changthang at 4,500 m.",
        culturalSignificance: "Hand-spun on wooden charkhas and woven on traditional pit looms into whisper-light shawls.",
        visitorOrPracticalInfo: "Buy authentic GI-tagged Pashmina from the Ladakh Nomadic Crafts cooperative in Leh.",
      },
    },
    festivals: {
      category: 'Traditions and Festivals',
      title: "Hemis Festival & Ladakh Festival",
      image: 'ladakh',
      summary: "Sacred monastic festival honoring Guru Padmasambhava with vibrant masked dances and monastic horns.",
      readMore: {
        originAndHistory: "Held at the 17th-century Hemis Monastery, the wealthiest monastery in Ladakh.",
        culturalSignificance: "Monks perform Cham dances embodying compassionate deities subduing harmful thoughts.",
        visitorOrPracticalInfo: "Hemis Festival occurs in June-July; witness the unfurling of the giant sacred Thangka scroll.",
      },
    },
    hiddenGem: {
      category: 'Hidden Gem',
      title: "Phugtal Monastery \u2014 The Honeycomb Cliff Sanctuary",
      image: 'ladakh',
      summary: "An ancient Buddhist monastery built into the cliff face of a massive natural limestone cave above Lungnak River.",
      location: "Zanskar Valley, Kargil District, Ladakh",
      howToReach: "Drive to Padum in Zanskar; trek 6 to 7 hours through Purne village along the river canyon.",
      bestTimeToVisit: "June to September when high mountain passes (Shinku La and Pensi La) are free of snow.",
      readMore: {
        originAndHistory: "Founded in the 12th century by Gangsem Sherap Sampo; preserved isolated for centuries.",
        culturalSignificance: "Houses about 70 monks, ancient library frescoes, and a natural spring inside the cave sanctum.",
        visitorOrPracticalInfo: "Basic guest accommodation available at the monastery; requires good physical stamina for the trek.",
      },
    },
    relatedMonuments: [
      { name: "Pangong Tso Lake", type: "Endorheic High-Altitude Lake", note: "134-km long saline lake changing color from emerald to turquoise across the day at 4,350 m.", panoramaSlug: 'pangong-lake' },
      { name: "Hemis Monastery", type: "Drukpa Lineage Sanctuary", note: "17th-century high monastery housing golden stupas, rare thangkas, and a museum.", panoramaSlug: 'hemis-monastery' },
      { name: "Leh Palace", type: "Royal Hillside Palace", note: "Nine-storey royal palace modeled after Lhasa's Potala, overlooking the Indus valley.", panoramaSlug: 'leh-palace' }
    ],
  },
  'madhya-pradesh': {
    stateId: 'madhya-pradesh',
    attire: {
      category: 'Traditional Attire',
      title: "Chanderi & Maheshwari Sarees",
      image: 'madhya-pradesh',
      summary: "Tissue-light silk-cotton weaves with shimmering gold zari motifs, and geometric Maheshwari borders.",
      readMore: {
        originAndHistory: "Chanderi weaving was patronized by the Scindias; Maheshwari was revived by Queen Ahilyabai Holkar.",
        culturalSignificance: "Famed for their translucent sheer texture, derived from using un-degummed raw silk and fine cotton.",
        visitorOrPracticalInfo: "Visit Chanderi in Ashoknagar district or the Rehwa Society in the historic Maheshwar Fort.",
      },
    },
    food: {
      category: 'Famous Food',
      title: "Indori Poha-Jalebi & Dal Bafla",
      image: 'madhya-pradesh',
      summary: "Flattened rice tempered with fennel seeds and sev, and ghee-soaked baked wheat balls with lentil dal.",
      readMore: {
        originAndHistory: "Indori street food is legendary for breakfast snacks topped with spicy Jeeravan masala.",
        culturalSignificance: "Dal Bafla is boiled before being baked over cow dung embers and crushed in warm desi ghee.",
        visitorOrPracticalInfo: "Sarafa Bazaar in Indore transforms into a buzzing street food haven every night from 9 PM to 2 AM.",
      },
    },
    craft: {
      category: 'Art and Craft',
      title: "Gond Tribal Art & Bagh Prints",
      image: 'madhya-pradesh',
      summary: "Intricate tribal paintings made of dots and lines depicting nature, and geometric Bagh block prints.",
      readMore: {
        originAndHistory: "Gond artists believe that viewing a good image brings good fortune, painting forest trees and spirits.",
        culturalSignificance: "Bagh printing in Dhar uses 100% natural red and black vegetable dyes and river-washed wood blocks.",
        visitorOrPracticalInfo: "Visit the Tribal Museum in Bhopal and artisan workshops in Bagh village to observe printing.",
      },
    },
    festivals: {
      category: 'Traditions and Festivals',
      title: "Khajuraho Dance Festival & Lokrang",
      image: 'madhya-pradesh',
      summary: "Classical dance festival staged against illuminated 1,000-year-old stone temple facades.",
      readMore: {
        originAndHistory: "Instituted to celebrate classical Indian dances (Kathak, Bharatanatyam, Odissi) in heritage courtyards.",
        culturalSignificance: "The intricate stone dancers carved on temple walls echo the living movements on the stage.",
        visitorOrPracticalInfo: "Held every February at the Western Group of Temples in Khajuraho; open to all visitors.",
      },
    },
    hiddenGem: {
      category: 'Hidden Gem',
      title: "Bhedaghat Marble Rocks & Dhuandhar Falls",
      image: 'madhya-pradesh',
      summary: "A 3-kilometer gorge where the sacred Narmada River cuts through 100-foot sheer crystalline white marble cliffs.",
      location: "Jabalpur District, Madhya Pradesh",
      howToReach: "25 km from Jabalpur Railway Station; well-connected by road and taxi services.",
      bestTimeToVisit: "November to April; moonlight boat rides on full moon nights are legendary.",
      readMore: {
        originAndHistory: "The Narmada plunges into a roaring mist at Dhuandhar Falls before narrowing through marble canyons.",
        culturalSignificance: "The cliffs change hue from pure white to pink and soft yellow under shifting sun and moonlight.",
        visitorOrPracticalInfo: "Take a guided rowboat through the canyon; boatmen narrate history with witty rhyming commentary.",
      },
    },
    relatedMonuments: [
      { name: "Khajuraho Temples", type: "UNESCO World Heritage Site", note: "Magnificent Nagara-style stone temples celebrating spiritual love, life, and celestial nymphs.", panoramaSlug: 'khajuraho' },
      { name: "Sanchi Stupa Complex", type: "Ancient Buddhist Sanctuary", note: "3rd-century BCE stone hemisphere commissioned by Emperor Ashoka with carved torana gateways." },
      { name: "Gwalior Fort", type: "Hilltop Citadel Palace", note: "Described by Babur as 'the pearl amongst fortresses in Hind', featuring blue glazed tilework." }
    ],
  },
  'maharashtra': {
    stateId: 'maharashtra',
    attire: {
      category: 'Traditional Attire',
      title: "Nauvari Saree & Paithani Silk",
      image: 'maharashtra',
      summary: "Traditional nine-yard drape tucked between the legs for freedom of movement, and Paithani peacock sarees.",
      readMore: {
        originAndHistory: "Nauvari was worn by Maratha warrior queens who rode into battle alongside men.",
        culturalSignificance: "Paithani sarees from Paithan are handwoven with pure gold and silver zari depicting peacock borders.",
        visitorOrPracticalInfo: "Visit Paithan or Yeola near Nashik to purchase authentic handloom Paithani sarees directly.",
      },
    },
    food: {
      category: 'Famous Food',
      title: "Puran Poli, Misal Pav & Modak",
      image: 'maharashtra',
      summary: "Cardamom-spiced sweet flatbread stuffed with chana dal, fiery sprouted moth bean curry, and steamed modaks.",
      readMore: {
        originAndHistory: "Puran Poli is the signature celebratory sweet for Gudi Padwa and Holi across Marathi homes.",
        culturalSignificance: "Ukadiche Modak, steamed rice-flour dumplings stuffed with fresh coconut and jaggery, is offered to Ganesha.",
        visitorOrPracticalInfo: "Sample Kolhapuri Misal in Kolhapur, and authentic home-style Puran Poli in Pune and Nagpur.",
      },
    },
    craft: {
      category: 'Art and Craft',
      title: "Warli Tribal Painting & Kolhapuri Chappals",
      image: 'maharashtra',
      summary: "Monochrome geometric paintings made of rice paste on ochre mud, and handcrafted leather footwear.",
      readMore: {
        originAndHistory: "Warli art traces back to 2500 BCE, using circles (sun/moon), triangles (mountains), and squares (sacred enclosures).",
        culturalSignificance: "Kolhapuri chappals are cut, stitched, and braided by hand using vegetable-tanned leather without nails.",
        visitorOrPracticalInfo: "Visit tribal villages in Dahanu and Palghar to interact with authentic Warli painter families.",
      },
    },
    festivals: {
      category: 'Traditions and Festivals',
      title: "Ganeshotsav & Pandharpur Wari",
      image: 'maharashtra',
      summary: "Ten-day public celebration of Lord Ganesha with dhol-tasha troupes, and the 21-day walking pilgrimage.",
      readMore: {
        originAndHistory: "Lokmanya Tilak transformed Ganesh Chaturthi in 1893 into a public movement to unite Indian citizens.",
        culturalSignificance: "The Wari pilgrimage sees hundreds of thousands of Varkaris walk 250 km singing abhangs of Saint Dnyaneshwar.",
        visitorOrPracticalInfo: "Ganeshotsav occurs in August-September; visit Lalbaugcha Raja in Mumbai and historic mandals in Pune.",
      },
    },
    hiddenGem: {
      category: 'Hidden Gem',
      title: "Lonar Crater Lake \u2014 Meteorite Impact Wonder",
      image: 'maharashtra',
      summary: "The world's only hyper-velocity meteorite impact crater formed in basalt rock, creating a saline-alkaline lake.",
      location: "Buldhana District, Vidarbha, Maharashtra",
      howToReach: "140 km from Aurangabad/Chhatrapati Sambhajinagar; 4-hour scenic drive.",
      bestTimeToVisit: "October to March when migratory flamingos gather along the emerald crater rim.",
      readMore: {
        originAndHistory: "Formed approximately 52,000 years ago when a meteorite struck the Deccan basalt plateau.",
        culturalSignificance: "Surrounded by ancient 8th-century stone temple ruins like the Daitya Sudan Temple.",
        visitorOrPracticalInfo: "Hike down the crater trail with a local naturalist guide; wear proper trail shoes.",
      },
    },
    relatedMonuments: [
      { name: "Gateway of India, Mumbai", type: "Indo-Saracenic Coastal Arch", note: "Majestic basalt arch overlooking Mumbai harbour where the British troops made their final exit.", panoramaSlug: 'gateway-of-india' },
      { name: "Ajanta and Ellora Caves", type: "UNESCO Rock-Cut Architecture", note: "Ancient Buddhist frescoes and the monolithic rock-cut Kailasa Temple carved from a single cliff." },
      { name: "Chhatrapati Shivaji Maharaj Terminus", type: "Victorian Gothic Railway Hub", note: "UNESCO-listed working railway cathedral with stone gargoyles, domes, and stained glass." }
    ],
  },
  'manipur': {
    stateId: 'manipur',
    attire: {
      category: 'Traditional Attire',
      title: "Innaphi & Phanek Handloom",
      image: 'manipur',
      summary: "Delicate translucent shawl draped across the upper body, paired with wrap-around striped Phanek skirts.",
      readMore: {
        originAndHistory: "Woven on traditional waist and back-strap looms in every Manipuri Meitei home.",
        culturalSignificance: "Moirang Phee motifs feature lotus-bud serrated patterns along the border, inspired by Loktak Lake.",
        visitorOrPracticalInfo: "Visit the Ima Keithel (Mother's Market) in Imphal to select authentic hand-woven textiles.",
      },
    },
    food: {
      category: 'Famous Food',
      title: "Kangshoi, Eromba & Chak-hao Kheer",
      image: 'manipur',
      summary: "Boiled seasonal vegetable stew with dry fish and herbs, and aromatic pudding made of black sticky rice.",
      readMore: {
        originAndHistory: "Manipuri cuisine relies heavily on fresh organic greens, king chillies, and indigenous herbs.",
        culturalSignificance: "Chak-hao (black rice) has a nutty fragrance and turns vibrant deep purple when boiled with milk.",
        visitorOrPracticalInfo: "Taste authentic Meitei feasts served on bell-metal plates at traditional venues in Imphal.",
      },
    },
    craft: {
      category: 'Art and Craft',
      title: "Longpi Black Stone Pottery & Kauna Craft",
      image: 'manipur',
      summary: "Handcrafted black clay cooking pots made without a potter's wheel, and woven water-reed mats.",
      readMore: {
        originAndHistory: "Longpi village crafts pottery from a mixture of ground serpentinite rock and weathered clay.",
        culturalSignificance: "Kauna water-reed craft is biodegradable, yielding durable cushions, picnic baskets, and floor mats.",
        visitorOrPracticalInfo: "Visit Longpi village in Ukhrul district to watch artisans shape pots using only hands and round stones.",
      },
    },
    festivals: {
      category: 'Traditions and Festivals',
      title: "Yaoshang & Sangai Festival",
      image: 'manipur',
      summary: "Five-day spring celebration featuring the joyful Thabal Chongba (moonlight folk dance) in every locality.",
      readMore: {
        originAndHistory: "Celebrates the onset of spring, integrating traditional Meitei sports and communal feasting.",
        culturalSignificance: "Thabal Chongba brings young men and women together holding hands in open-air circular dances.",
        visitorOrPracticalInfo: "Yaoshang occurs in March during Holi. Sangai Festival takes place in late November.",
      },
    },
    hiddenGem: {
      category: 'Hidden Gem',
      title: "Keibul Lamjao \u2014 Only Floating National Park",
      image: 'manipur',
      summary: "A national park composed of floating biomass islands (Phumdis) on Loktak Lake, home to the Sangai deer.",
      location: "Bishnupur District, Manipur",
      howToReach: "50 km south of Imphal (1.5-hour drive through lush paddy countryside).",
      bestTimeToVisit: "October to April for morning mist and clear sightings of the dancing deer.",
      readMore: {
        originAndHistory: "The park is entirely made of decomposing vegetation, soil, and organic matter that floats on water.",
        culturalSignificance: "Last natural refuge of the critically endangered brow-antlered Sangai deer (Rucervus eldii eldii).",
        visitorOrPracticalInfo: "Take an early morning forest department boat cruise; climb the Sendra hillock for panoramic lake views.",
      },
    },
    relatedMonuments: [
      { name: "Kangla Fort, Imphal", type: "Ancient Seat of Manipur Royalty", note: "Historic palace citadel surrounded by a moat, housing ancient temples and royal coronation stones." },
      { name: "INA War Memorial, Moirang", type: "Historic Freedom Shrine", note: "Where the Indian National Army under Netaji Subhash Chandra Bose first hoisted the tricolor in 1944." },
      { name: "Shri Govindajee Temple", type: "Twin-Dome Vaishnavite Temple", note: "Historic temple adjacent to the palace in Imphal, center of classical Manipuri Raas Leela dance." }
    ],
  },
  'meghalaya': {
    stateId: 'meghalaya',
    attire: {
      category: 'Traditional Attire',
      title: "Jainsem & Dakmanda Handloom",
      image: 'meghalaya',
      summary: "Two-piece silk fabric fastened at both shoulders falling straight to the ankles, and Garo wrap skirts.",
      readMore: {
        originAndHistory: "Woven by Khasi, Jaintia, and Garo women using indigenous mulberry and wild Eri silks.",
        culturalSignificance: "Eri silk ('peace silk') is harvested without killing the silkworm, embodying tribal compassion.",
        visitorOrPracticalInfo: "Available at the Shillong State Handloom Emporium and weekly rural markets in Nongpoh.",
      },
    },
    food: {
      category: 'Famous Food',
      title: "Jadoh, Dohneiiong & Tungrymbai",
      image: 'meghalaya',
      summary: "Aromatic short-grain rice cooked with meat stock, pork in roasted black sesame gravy, and fermented beans.",
      readMore: {
        originAndHistory: "Simple, unpretentious cooking centered around smoked meats, ginger, and pungent black sesame.",
        culturalSignificance: "Dohneiiong uses roasted black sesame paste to create a deeply nutty, savory dark gravy.",
        visitorOrPracticalInfo: "Sample authentic Khasi meals at traditional food stalls in Police Bazar and Lewduh (Bara Bazar).",
      },
    },
    craft: {
      category: 'Art and Craft',
      title: "Living Root Bridges & Bamboo Craft",
      image: 'meghalaya',
      summary: "Aerial bridges coaxed and guided from living Ficus elastica tree roots across mountain rivers.",
      readMore: {
        originAndHistory: "Conceived by indigenous Khasi and Jaintia tribes centuries ago to survive monsoon river torrents.",
        culturalSignificance: "Unlike steel and timber, living root bridges grow stronger with time, lasting up to 500 years.",
        visitorOrPracticalInfo: "Visit Cherrapunji (Sohra) or Mawlynnong to experience the double-decker and single root bridges.",
      },
    },
    festivals: {
      category: 'Traditions and Festivals',
      title: "Nongkrem Dance & Wangala Festival",
      image: 'meghalaya',
      summary: "Five-day Khasi harvest thanksgiving dance, and the Garo 100-drum harvest celebration.",
      readMore: {
        originAndHistory: "Nongkrem is held at Smit, the seat of the Syiem (king) of Khyrim, offering thanks for good harvests.",
        culturalSignificance: "Wangala features 100 long oval drums beaten simultaneously in unison by feather-capped dancers.",
        visitorOrPracticalInfo: "Nongkrem takes place in November at Smit. Wangala festival is celebrated in Asanang near Tura.",
      },
    },
    hiddenGem: {
      category: 'Hidden Gem',
      title: "Mawlynnong & Umngot River at Dawki",
      image: 'meghalaya',
      summary: "Asia's cleanest village paired with a river so clear that wooden boats appear to float in mid-air.",
      location: "East Khasi Hills & West Jaintia Hills",
      howToReach: "85 km south of Shillong (3-hour scenic drive to the Bangladesh border).",
      bestTimeToVisit: "November to April for crystal-clear turquoise waters at Dawki.",
      readMore: {
        originAndHistory: "Mawlynnong banned single-use plastics and instituted community sanitation over two decades ago.",
        culturalSignificance: "The Umngot River's pebbles are visible up to 20 feet deep through glass-like transparent water.",
        visitorOrPracticalInfo: "Hire a local country boat at Dawki; stroll through Mawlynnong's living root bridge and tree-canopy towers.",
      },
    },
    relatedMonuments: [
      { name: "Nohkalikai Falls, Sohra", type: "Tallest Plunge Waterfall in India", note: "Dramatic 340-meter plunge waterfall leaping off emerald cliffs into a turquoise mountain pool." },
      { name: "Mawsmai & Arwah Caves", type: "Prehistoric Limestone Caves", note: "Illuminated cave passages showcasing millions of years of stalactites, stalagmites, and sea fossils." },
      { name: "Umiam Lake (Barapani)", type: "Serene Mountain Reservoir", note: "Expansive blue lake surrounded by coniferous pine hills, offering watersports and sunsets." }
    ],
  },
  'mizoram': {
    stateId: 'mizoram',
    attire: {
      category: 'Traditional Attire',
      title: "Puan Handloom Wraps (Puanchei)",
      image: 'mizoram',
      summary: "Traditional multi-colored handwoven wraps featuring black, white, and red bands with zigzag motifs.",
      readMore: {
        originAndHistory: "Woven on traditional loin looms by Mizo women, handed down through generations as bridal gifts.",
        culturalSignificance: "Different Puan designs denote age, ceremony, and tribal honor; Puanchei is worn during Cheraw dances.",
        visitorOrPracticalInfo: "Available at the Government Zendo Handicrafts Emporium in Aizawl and local weavers in Thenzawl.",
      },
    },
    food: {
      category: 'Famous Food',
      title: "Bai, Sawhchiar & Bamboo Shoot Stew",
      image: 'mizoram',
      summary: "Fragrant vegetable stew made with mustard leaves, pork, and fermented pork fat (Sa-um).",
      readMore: {
        originAndHistory: "Mizo cooking highlights natural ingredients with minimal spices, relying on fresh bamboo shoots.",
        culturalSignificance: "Sawhchiar is a comfort porridge cooked with chicken or pork, rice, and fresh peppercorns.",
        visitorOrPracticalInfo: "Sample authentic home-cooked Mizo meals in local family restaurants across Aizawl.",
      },
    },
    craft: {
      category: 'Art and Craft',
      title: "Bamboo & Cane Furniture and Khumbeu",
      image: 'mizoram',
      summary: "Waterproof ceremonial cone hats (Khumbeu) woven from wild cane, and flexible bamboo baskets.",
      readMore: {
        originAndHistory: "Mizoram's hills are blanketed with bamboo forests, making cane weaving an innate domestic skill.",
        culturalSignificance: "Bamboo baskets are woven with intricate hexagonal patterns to carry firewood and hill crops.",
        visitorOrPracticalInfo: "Visit Thenzawl village, the recognized handloom and cane-weaving capital of Mizoram.",
      },
    },
    festivals: {
      category: 'Traditions and Festivals',
      title: "Chapchar Kut & Pawl Kut",
      image: 'mizoram',
      summary: "The joyous spring festival celebrating the completion of forest clearing, marked by the Cheraw bamboo dance.",
      readMore: {
        originAndHistory: "Celebrated with music, gongs, and community feasts (Kut) welcoming the agricultural new year.",
        culturalSignificance: "Cheraw dance features women stepping gracefully in and out of rhythmic clapping bamboo poles.",
        visitorOrPracticalInfo: "Chapchar Kut takes place annually in March at AR Ground in Aizawl; open to all visitors.",
      },
    },
    hiddenGem: {
      category: 'Hidden Gem',
      title: "Phawngpui \u2014 The Blue Mountain of the Gods",
      image: 'mizoram',
      summary: "The highest peak in Mizoram at 2,157 m, offering sheer cliffs, dwarf rhododendron forests, and cloud seas.",
      location: "Lawngtlai District, Southern Mizoram",
      howToReach: "Drive from Aizawl to Sangau village (230 km); trek 7 km to the mountain summit.",
      bestTimeToVisit: "November to April (the national park is closed during the heavy monsoon season).",
      readMore: {
        originAndHistory: "Revered by Mizo folklore as the celestial abode of mountain spirits and local folk deities.",
        culturalSignificance: "Home to the rare Blyth's tragopan, clouded leopard, and multi-colored mountain orchids.",
        visitorOrPracticalInfo: "Requires an entry permit from the forest department; eco-homestays available in Sangau village.",
      },
    },
    relatedMonuments: [
      { name: "Vantawng Falls", type: "Highest Waterfall in Mizoram", note: "Two-tiered 229-meter waterfall cascading through dense bamboo forests near Thenzawl." },
      { name: "Solomon's Temple, Aizawl", type: "White Marble Cathedral", note: "Imposing multi-tier Christian sanctuary built of white marble in Chawlhhmun." },
      { name: "Reiek Tlang", type: "Panoramic Mountain Ridge", note: "Historic village and rocky ridge offering 360-degree views stretching to the plains of Bangladesh." }
    ],
  },
  'nagaland': {
    stateId: 'nagaland',
    attire: {
      category: 'Traditional Attire',
      title: "Naga Warrior Shawls (Tsungkotepsu)",
      image: 'nagaland',
      summary: "Boldly colored woolen shawls woven with red, black, and white bands, embroidered with animal figures.",
      readMore: {
        originAndHistory: "Historically, specific shawls were earned through acts of warrior valor and community feasts of merit.",
        culturalSignificance: "Each of the 16 recognized Naga tribes has its own distinct shawl motifs and color codes.",
        visitorOrPracticalInfo: "Purchase certified tribal handloom shawls at the Kohima Night Market and State Handloom Emporium.",
      },
    },
    food: {
      category: 'Famous Food',
      title: "Smoked Pork with Axone & Raja Mircha",
      image: 'nagaland',
      summary: "Tender pork cooked with fermented soybean paste (Axone) and the legendary fiery Naga King Chilli.",
      readMore: {
        originAndHistory: "Smoking over firewood hearths preserves meat through humid monsoon months in highland villages.",
        culturalSignificance: "Axone imparts a deep, pungent, savory umami note that defines traditional Naga home cooking.",
        visitorOrPracticalInfo: "Savor authentic Naga cuisine at local kitchen cafes in Kohima and Dimapur.",
      },
    },
    craft: {
      category: 'Art and Craft',
      title: "Naga Wood Carvings & Bead Jewelry",
      image: 'nagaland',
      summary: "Sculpted wooden village gates and longhouses carved with hornbill birds, tigers, and human figures.",
      readMore: {
        originAndHistory: "Traditional Morung (youth dormitories) were adorned with bold relief carvings as tribal emblems.",
        culturalSignificance: "Bead necklaces of carnelian, glass, and brass bells are prized family heirlooms worn during festivals.",
        visitorOrPracticalInfo: "Visit Khonoma Green Village and the Konyak artisan villages in Mon district to meet master carvers.",
      },
    },
    festivals: {
      category: 'Traditions and Festivals',
      title: "Hornbill Festival \u2014 Festival of Festivals",
      image: 'nagaland',
      summary: "Grand 10-day cultural extravaganza bringing together all 16 Naga tribes in the heritage village of Kisama.",
      readMore: {
        originAndHistory: "Instituted by the state government in 2000 to revive and celebrate indigenous inter-tribal traditions.",
        culturalSignificance: "Features ancient war chants, indigenous archery, chili-eating contests, and rock concerts.",
        visitorOrPracticalInfo: "Held annually from December 1 to 10 at Kisama Heritage Village near Kohima; book months ahead.",
      },
    },
    hiddenGem: {
      category: 'Hidden Gem',
      title: "Dzukou Valley \u2014 Valley of the Flowers and Clouds",
      image: 'nagaland',
      summary: "A high-altitude undulating valley carpeted with dwarf bamboo, cold mountain streams, and seasonal lilies.",
      location: "Border of Kohima District (Nagaland) and Senapati District (Manipur)",
      howToReach: "Drive to Jakhama or Viswema village from Kohima (25 km); 4 to 5-hour scenic uphill mountain trek.",
      bestTimeToVisit: "June to September for blooming Dzukou lilies; October to March for crystal-clear mountain skies.",
      readMore: {
        originAndHistory: "Perched at 2,452 m, the valley feels like another planet with rolling green hillocks and no roads.",
        culturalSignificance: "Home to the endemic white-and-pink Dzukou lily found nowhere else on earth.",
        visitorOrPracticalInfo: "Basic dormitory resthouse available at the valley rim; carry warm sleeping bags and food.",
      },
    },
    relatedMonuments: [
      { name: "Kohima War Cemetery", type: "WWII Commonwealth Memorial", note: "Beautifully terraced hillside cemetery commemorating Allied soldiers who halted the 1944 invasion." },
      { name: "Kisama Heritage Village", type: "Living Naga Cultural Hamlet", note: "Permanent festival village showcasing traditional tribal morungs, log drums, and totems." },
      { name: "Khonoma Fort & Green Village", type: "Asia's First Green Village", note: "700-year-old Angami village famed for historic British resistance and community forest bans on logging." }
    ],
  },
  'odisha': {
    stateId: 'odisha',
    attire: {
      category: 'Traditional Attire',
      title: "Sambalpuri Bandha & Khandua Pata",
      image: 'odisha',
      summary: "Tie-and-dye Ikat silk and cotton sarees with conch shell, wheel, and floral motifs woven by Meher weavers.",
      readMore: {
        originAndHistory: "Tracing back to 12th-century temple offerings, where Khandua Pata silk was gifted to Lord Jagannath.",
        culturalSignificance: "The tie-dye process (Bandha) is done on individual threads before weaving, yielding identical colors on both sides.",
        visitorOrPracticalInfo: "Visit Bargarh and Sonepur weaver clusters, or Boyanika government emporiums in Bhubaneswar.",
      },
    },
    food: {
      category: 'Famous Food',
      title: "Dalma, Chhena Poda & Pakhala",
      image: 'odisha',
      summary: "Lentil stew simmered with raw papaya and pumpkin tempered with panch phoron, and caramelized baked cheese sweet.",
      readMore: {
        originAndHistory: "Dalma is an integral part of the sacred Chhappan Bhog (56 food offerings) at Puri Jagannath Temple.",
        culturalSignificance: "Chhena Poda was accidentally created in Nayagarh when fresh cottage cheese and sugar were left in a warm oven.",
        visitorOrPracticalInfo: "Sample Dalma at temple-style dining halls in Puri; try Chhena Poda at sweet shops across Nayagarh.",
      },
    },
    craft: {
      category: 'Art and Craft',
      title: "Pattachitra on Palm Leaf & Silver Filigree (Tarakasi)",
      image: 'odisha',
      summary: "Intricate miniature painting on cloth and dried palm leaves, and gossamer silver filigree jewelry in Cuttack.",
      readMore: {
        originAndHistory: "Pattachitra art in Raghurajpur dates to 5 BCE, illustrating stories of Jagannath, Krishna, and Gita Govinda.",
        culturalSignificance: "Tarakasi of Cuttack uses 99.9% pure silver drawn into hair-thin wires to create delicate ornaments.",
        visitorOrPracticalInfo: "Visit Raghurajpur Heritage Crafts Village near Puri to watch entire families paint on palm leaves.",
      },
    },
    festivals: {
      category: 'Traditions and Festivals',
      title: "Puri Ratha Yatra & Konark Dance Festival",
      image: 'odisha',
      summary: "The grand Chariot Festival where Lord Jagannath, Balabhadra, and Subhadra journey on massive wooden rathas.",
      readMore: {
        originAndHistory: "Recorded in sacred texts for over a millennium, drawing over a million devotees along the Bada Danda.",
        culturalSignificance: "Devotees of all backgrounds are permitted to touch and pull the sacred coir ropes of the chariots.",
        visitorOrPracticalInfo: "Puri Ratha Yatra occurs in June-July. Konark Dance Festival takes place in December at the Sun Temple.",
      },
    },
    hiddenGem: {
      category: 'Hidden Gem',
      title: "Mangalajodi Wetlands \u2014 Birders' Lake Haven",
      image: 'odisha',
      summary: "A quiet freshwater wetland on the northern edge of Chilika Lake, home to over 300,000 migratory waterfowl.",
      location: "Khordha District, Odisha (edge of Chilika Lake)",
      howToReach: "70 km from Bhubaneswar Airport (1.5-hour drive via NH16).",
      bestTimeToVisit: "November to February when migratory birds arrive from Siberia, Mongolia, and Central Asia.",
      readMore: {
        originAndHistory: "Former bird poachers were transformed into community protectors and conservation boat guides.",
        culturalSignificance: "Silent wooden country boats row through narrow reed channels, bringing visitors feet away from birds.",
        visitorOrPracticalInfo: "Binoculars and cameras are a must; homestays with warm Odia meals are managed by local villagers.",
      },
    },
    relatedMonuments: [
      { name: "Konark Sun Temple", type: "13th-Century Chariot Temple", note: "UNESCO World Heritage chariot temple with 24 carved stone sundial wheels pulled by stone horses.", panoramaSlug: 'konark' },
      { name: "Jagannath Temple, Puri", type: "Sacred Hindu Pilgrimage Shrine", note: "12th-century shrine with sacred kitchen cooking in earthen pots stacked seven high on wood fires.", panoramaSlug: 'jagannath-puri' },
      { name: "Udayagiri & Khandagiri Caves", type: "2nd-Century BCE Jain Rock Caves", note: "Ancient rock-cut residential caves of Jain monks with the famed Hathigumpha inscription of King Kharavela." }
    ],
  },
  'punjab': {
    stateId: 'punjab',
    attire: {
      category: 'Traditional Attire',
      title: "Phulkari Dupatta & Kurta Chadra",
      image: 'punjab',
      summary: "Vibrant geometric floral embroidery stitched with untwisted silk floss (pat) from the reverse of cotton cloth.",
      readMore: {
        originAndHistory: "Historically, grandmothers embroidered Phulkaris for newborn granddaughters as wedding trousseaus.",
        culturalSignificance: "Different styles (Bagh, Chope, Sainchi) convey matrimonial blessings, fertility, and festive joy.",
        visitorOrPracticalInfo: "Visit Tripuri and Patiala bazaars for authentic hand-embroidered Phulkari dupattas and suits.",
      },
    },
    food: {
      category: 'Famous Food',
      title: "Makki di Roti, Sarson da Saag & Amritsari Kulcha",
      image: 'punjab',
      summary: "Golden cornmeal flatbreads served with slow-cooked mustard greens, white butter, and tandoori kulchas.",
      readMore: {
        originAndHistory: "The hearty diet of the Punjab plains developed to fuel agrarian farmers working vast fields.",
        culturalSignificance: "Amritsari Kulchas are rolled with multiple flaky layers of spiced potato and baked in clay tandoors.",
        visitorOrPracticalInfo: "Sample fresh Kulchas in the heritage lanes of Amritsar; taste langar at the Golden Temple.",
      },
    },
    craft: {
      category: 'Art and Craft',
      title: "Jalandhar Wood Inlay & Leather Juttis",
      image: 'punjab',
      summary: "Handcrafted pointed leather slip-ons embellished with gold thread, and inlaid wooden furniture.",
      readMore: {
        originAndHistory: "Muktsar and Patiala are famed for traditional leather juttis stitched without modern synthetic adhesives.",
        culturalSignificance: "Embroidered juttis conform naturally to the wearer's feet over time with light oil conditioning.",
        visitorOrPracticalInfo: "Explore the shoe bazaars around the Golden Temple in Amritsar and Old Patiala market.",
      },
    },
    festivals: {
      category: 'Traditions and Festivals',
      title: "Baisakhi & Hola Mohalla",
      image: 'punjab',
      summary: "Spring harvest festival marking the founding of the Khalsa Panth in 1699, and the martial games of Anandpur Sahib.",
      readMore: {
        originAndHistory: "Baisakhi celebrates the harvest of winter rabi crops, accompanied by Bhangra and Gidda folk dances.",
        culturalSignificance: "Hola Mohalla features Nihang Sikh warriors showcasing horsemanship, gatka swordplay, and mock battles.",
        visitorOrPracticalInfo: "Baisakhi takes place on April 13-14 across Punjab. Hola Mohalla occurs in March at Anandpur Sahib.",
      },
    },
    hiddenGem: {
      category: 'Hidden Gem',
      title: "Kila Raipur \u2014 The Rural Olympics",
      image: 'punjab',
      summary: "An electric rural festival where village athletes, bullock carts, and tractor drivers compete in athletic feats.",
      location: "Kila Raipur Village, Ludhiana District, Punjab",
      howToReach: "20 km south of Ludhiana; well-connected by road and rail.",
      bestTimeToVisit: "February when winter weather is crisp and clear.",
      readMore: {
        originAndHistory: "Started in 1933 by philanthropist Inder Singh Grewal to inspire rural youth fitness and community spirit.",
        culturalSignificance: "Showcases camel races, tug-of-war, tent-pegging, and athletes lifting heavy weights with their teeth.",
        visitorOrPracticalInfo: "General admission is free; expect vibrant crowds, festive dhol music, and hot sugarcane juice.",
      },
    },
    relatedMonuments: [
      { name: "Golden Temple (Harmandir Sahib)", type: "Sacred Central Sikh Sanctuary", note: "Gilded marble shrine surrounded by the Amrit Sarovar lake, serving free langar to 100,000 daily.", panoramaSlug: 'golden-temple' },
      { name: "Jallianwala Bagh", type: "National Memorial Park", note: "Historic public garden preserving bullet marks from the tragic 1919 massacre, with eternal flame." },
      { name: "Qila Mubarak, Patiala", type: "18th-Century Sikh Palace Fortress", note: "Grand fortress combining Mughal and Rajasthani architecture with royal darbar hall and mirrors." }
    ],
  },
  'rajasthan': {
    stateId: 'rajasthan',
    attire: {
      category: 'Traditional Attire',
      title: "Rajputi Poshak & Bandhej Turbans",
      image: 'rajasthan',
      summary: "Royal four-piece attire with gold gotapatti embroidery, paired with colorful tied-and-dyed turbans (Safas).",
      readMore: {
        originAndHistory: "Worn by royal families of Mewar, Marwar, and Jaipur, reflecting warrior heritage and courtly dignity.",
        culturalSignificance: "The color and winding style of a man's turban traditionally identified his region, caste, and season.",
        visitorOrPracticalInfo: "Johari Bazaar in Jaipur and Old City bazaars in Jodhpur offer authentic poshak and bandhej work.",
      },
    },
    food: {
      category: 'Famous Food',
      title: "Dal Baati Churma, Ker Sangri & Ghevar",
      image: 'rajasthan',
      summary: "Baked whole-wheat balls dipped in ghee with spicy mixed lentils, desert bean curry, and honeycomb Ghevar.",
      readMore: {
        originAndHistory: "Devised during desert warfare: baatis were buried in warm desert sand to bake during camel travel.",
        culturalSignificance: "Ker (wild berries) and Sangri (desert beans) survive in arid Thar soils without needing irrigation.",
        visitorOrPracticalInfo: "Experience traditional thalis at heritage haveli dining halls in Jaipur, Jodhpur, and Udaipur.",
      },
    },
    craft: {
      category: 'Art and Craft',
      title: "Blue Pottery of Jaipur & Thewa Goldwork",
      image: 'rajasthan',
      summary: "Glazed ceramic ware made without clay using quartz powder, and 23k gold work fused onto colored glass.",
      readMore: {
        originAndHistory: "Blue pottery was brought to Jaipur by Maharaja Sawai Ram Singh II from Turko-Persian masters.",
        culturalSignificance: "Thewa art of Pratapgarh requires micro-carving delicate gold sheets bonded to Belgian glass.",
        visitorOrPracticalInfo: "Visit Kripal Kumbh in Jaipur for blue pottery, and Johari Bazaar for certified Thewa jewelry.",
      },
    },
    festivals: {
      category: 'Traditions and Festivals',
      title: "Pushkar Camel Fair & Desert Festival",
      image: 'rajasthan',
      summary: "Vast livestock gathering with decorated camels and folk musicians, and golden desert spectacles in Jaisalmer.",
      readMore: {
        originAndHistory: "Held on the banks of holy Pushkar Lake during the full moon of Kartika Purnima.",
        culturalSignificance: "Features traditional turban-tying competitions, camel beauty pageants, and evening devotional aarti.",
        visitorOrPracticalInfo: "Pushkar Fair takes place in October-November. Jaisalmer Desert Festival runs in February.",
      },
    },
    hiddenGem: {
      category: 'Hidden Gem',
      title: "Chand Baori, Abhaneri \u2014 The 3,500-Step Stepwell",
      image: 'rajasthan',
      summary: "A 13-storey mathematical stone stepwell plunging 30 meters into the earth with 3,500 symmetrical steps.",
      location: "Abhaneri Village, Dausa District, Rajasthan",
      howToReach: "95 km east of Jaipur on the Jaipur-Agra highway (1.5-hour drive).",
      bestTimeToVisit: "October to March when desert days are pleasant.",
      readMore: {
        originAndHistory: "Constructed in the 9th century by King Chanda of the Nikumbha dynasty to conserve water in arid lands.",
        culturalSignificance: "The mesmerizing geometric stairs create an inverted pyramid illusion designed to maximize cool shade.",
        visitorOrPracticalInfo: "Visit the adjacent 10th-century Harshat Mata temple; take photos when morning shadows hit the steps.",
      },
    },
    relatedMonuments: [
      { name: "Hawa Mahal, Jaipur", type: "Honeycomb Palace of the Winds", note: "Five-storey pink sandstone facade with 953 jharokha windows built for royal women.", panoramaSlug: 'hawa-mahal' },
      { name: "Amber Fort, Jaipur", type: "Hilltop Rajput-Mughal Citadel", note: "Overlooks Maota Lake, famous for its Sheesh Mahal mirror palace and grand courtyards.", panoramaSlug: 'amber-fort' },
      { name: "Mehrangarh Fort, Jodhpur", type: "Imposing Cliff Fortress", note: "Perched 122 meters above the Blue City with intricately carved royal palanquins and cannons.", panoramaSlug: 'mehrangarh-fort' },
      { name: "Jaisalmer Fort", type: "Living Golden Sandstone Citadel", note: "One of the few living forts in the world, with shops, temples, and homes inside yellow ramparts.", panoramaSlug: 'jaisalmer-fort' }
    ],
  },
  'sikkim': {
    stateId: 'sikkim',
    attire: {
      category: 'Traditional Attire',
      title: "Bakhu (Kho) & Honju Silk Shirt",
      image: 'sikkim',
      summary: "Traditional wrap-around ankle-length robe fastened at the waist with a silk sash, worn by Bhutias and Lepchas.",
      readMore: {
        originAndHistory: "Adapted to the high alpine climate of the Himalayas, allowing flexibility during steep mountain climbs.",
        culturalSignificance: "Women wear an apron of woven geometric silk (Pangden) in front, indicating marital status.",
        visitorOrPracticalInfo: "Visit the Directorate of Handicrafts and Handlooms on Tibet Road in Gangtok for certified garments.",
      },
    },
    food: {
      category: 'Famous Food',
      title: "Phagshapa, Gundruk & Momos",
      image: 'sikkim',
      summary: "Braised pork strips cooked with dried radishes and red chillies, and fermented leafy greens soup (Gundruk).",
      readMore: {
        originAndHistory: "Sikkimese gastronomy centers on seasonal fermentation, wild bamboo shoots, and warming broths.",
        culturalSignificance: "Gundruk is prepared by fermenting mustard or radish leaves in earthen pots, rich in digestive lactic acid.",
        visitorOrPracticalInfo: "Sample authentic Himalayan meals in traditional family restaurants on MG Marg in Gangtok.",
      },
    },
    craft: {
      category: 'Art and Craft',
      title: "Choktse Wooden Tables & Woolen Carpets",
      image: 'sikkim',
      summary: "Folding wooden tables carved with relief Buddhist motifs, alongside hand-knotted sheep-wool carpets.",
      readMore: {
        originAndHistory: "Tibet-influenced woodcarving features dragon, lotus, and conch motifs lacquered in bright enamel.",
        culturalSignificance: "Carpet weavers use hand-spun Tibetan highland wool and natural vegetal dyes on traditional vertical looms.",
        visitorOrPracticalInfo: "Visit the Government Institute of Cottage Industries in Gangtok to observe master carvers at work.",
      },
    },
    festivals: {
      category: 'Traditions and Festivals',
      title: "Saga Dawa & Pang Lhabsol",
      image: 'sikkim',
      summary: "Celebration of the Buddha's birth, enlightenment, and parinirvana, and veneration of Mount Kanchenjunga.",
      readMore: {
        originAndHistory: "Pang Lhabsol is unique to Sikkim, commemorating the historical treaty between Lepchas and Bhutias.",
        culturalSignificance: "Monks perform the dramatic Pangtoed warrior dance with swords and shields honoring Kanchenjunga.",
        visitorOrPracticalInfo: "Saga Dawa occurs in May-June. Pang Lhabsol takes place in August-September at Tsuklakhang Palace.",
      },
    },
    hiddenGem: {
      category: 'Hidden Gem',
      title: "Gurudongmar Lake \u2014 Sacred Glacial Waters",
      image: 'sikkim',
      summary: "One of the highest lakes in the world at 5,430 meters, whose waters remain partially unfrozen even in winter.",
      location: "North Sikkim District, near the Indo-China border",
      howToReach: "Drive from Gangtok via Lachen (170 km, requires an overnight stop at Lachen); early morning drive to lake.",
      bestTimeToVisit: "April to June, and October to November before heavy snow blankets mountain passes.",
      readMore: {
        originAndHistory: "Blessed by Guru Padmasambhava in the 8th century so that local villagers would never lack drinking water.",
        culturalSignificance: "Surrounded by snow-capped peaks, its crystal turquoise waters mirror the high Himalayan sky.",
        visitorOrPracticalInfo: "Requires special Protected Area Permits (PAP); acclimatize thoroughly in Lachen to avoid altitude sickness.",
      },
    },
    relatedMonuments: [
      { name: "Rumtek Monastery", type: "Dharma Chakra Centre", note: "Seat of the Karmapa Lama in exile, housing rare Tibetan art treasures and golden stupas." },
      { name: "Khangchendzonga National Park", type: "UNESCO Mixed World Heritage Site", note: "Preserves untouched glaciers, sacred lakes, and the third-highest mountain on earth.", panoramaSlug: 'scene-ladakh' },
      { name: "Pemayangtse Monastery", type: "Ancient Nyingma Sanctuary", note: "17th-century monastery in West Sikkim with the seven-tiered wooden model of Guru Rinpoche's heaven." }
    ],
  },
  'tamil-nadu': {
    stateId: 'tamil-nadu',
    attire: {
      category: 'Traditional Attire',
      title: "Kanchipuram Silk Saree & Veshti",
      image: 'tamil-nadu',
      summary: "Heavy mulberry silk sarees woven with pure gold zari borders depicting temple architecture and peacocks.",
      readMore: {
        originAndHistory: "Patronized by Chola and Pallava kings; weavers trace descent from sage Markandeya, weaver to the gods.",
        culturalSignificance: "Woven using three distinct shuttles (Korvai technique), joining borders so firmly they never separate.",
        visitorOrPracticalInfo: "Visit weaver cooperative societies directly in Kanchipuram town, 75 km from Chennai.",
      },
    },
    food: {
      category: 'Famous Food',
      title: "Chettinad Chicken, Dosa & Filter Coffee",
      image: 'tamil-nadu',
      summary: "Fiery stone-ground pepper chicken from the Chettinad region, crisp fermented dosas, and chicory filter kaapi.",
      readMore: {
        originAndHistory: "Chettinad cuisine was shaped by the seafaring Nattukottai Chettiars who traded spices across Southeast Asia.",
        culturalSignificance: "Uses freshly roasted Kalpasi (black stone flower), star anise, and whole peppercorns in unpolished clay pots.",
        visitorOrPracticalInfo: "Sample Chettinad feasts in Karaikudi mansions, and sip fresh frothy filter coffee in Mylapore, Chennai.",
      },
    },
    craft: {
      category: 'Art and Craft',
      title: "Thanjavur Paintings & Swamimalai Bronzes",
      image: 'tamil-nadu',
      summary: "Gold-leaf relief paintings on wooden planks with semi-precious stones, and lost-wax Chola bronze icons.",
      readMore: {
        originAndHistory: "Flourished in the 16th century under Thanjavur Nayaks and Maratha rulers, depicting baby Krishna and deities.",
        culturalSignificance: "Swamimalai bronze sculptors follow the ancient Shilpa Shastras to cast statues with exact divine proportions.",
        visitorOrPracticalInfo: "Visit artisan streets in Thanjavur around the palace, and bronze foundries in Swamimalai near Kumbakonam.",
      },
    },
    festivals: {
      category: 'Traditions and Festivals',
      title: "Pongal & Madurai Chithirai",
      image: 'tamil-nadu',
      summary: "Four-day harvest thanksgiving festival boiling fresh milk and rice in clay pots, and divine celestial weddings.",
      readMore: {
        originAndHistory: "Pongal expresses gratitude to the Sun God, cattle (Mattu Pongal), and Mother Earth for the winter rice harvest.",
        culturalSignificance: "Chithirai Festival reenacts the divine wedding of Goddess Meenakshi and Lord Sundareswarar.",
        visitorOrPracticalInfo: "Pongal occurs in mid-January. Chithirai Festival takes place in April-May in Madurai.",
      },
    },
    hiddenGem: {
      category: 'Hidden Gem',
      title: "Pichavaram Mangrove Forest",
      image: 'tamil-nadu',
      summary: "The second-largest mangrove forest on earth, crisscrossed by 4,400 interconnected water canals.",
      location: "Cuddalore District, Tamil Nadu (near Chidambaram)",
      howToReach: "15 km from Chidambaram Railway Station; well-connected by road from Chennai (240 km).",
      bestTimeToVisit: "October to March for pleasant temperatures and migratory pelican watching.",
      readMore: {
        originAndHistory: "Separated from the Bay of Bengal by a sandbank, acting as a natural tsunami barrier for coastal villages.",
        culturalSignificance: "The mangrove trees have specialized stilt roots and pneumatophores projecting above the green water.",
        visitorOrPracticalInfo: "Hire a rowboat or motorboat at the eco-tourism jetty; row under natural canopy tunnels of mangrove roots.",
      },
    },
    relatedMonuments: [
      { name: "Meenakshi Amman Temple, Madurai", type: "Historic Dravidian Monument", note: "Stunning temple city with 14 towering gopurams decorated with thousands of painted mythological figures.", panoramaSlug: 'meenakshi-temple' },
      { name: "Brihadisvara Temple, Thanjavur", type: "Great Living Chola Temple", note: "11th-century granite temple built by Rajaraja I with an 80-ton monolithic stone dome (Kumbam).", panoramaSlug: 'temple-south' },
      { name: "Group of Monuments at Mahabalipuram", type: "UNESCO Shore Sanctuaries", note: "7th-century coastal rock-cut monolithic rathas and relief carvings right by the Bay of Bengal.", panoramaSlug: 'marina-beach' }
    ],
  },
  'telangana': {
    stateId: 'telangana',
    attire: {
      category: 'Traditional Attire',
      title: "Pochampally Ikat & Gadwal Sarees",
      image: 'telangana',
      summary: "Geometric tie-and-dye silk-cotton sarees woven in Bhoodan Pochampally, and contrasting zari Gadwal borders.",
      readMore: {
        originAndHistory: "Pochampally Ikat (Telia Rumal technique) was granted India's first textile Geographical Indication (GI).",
        culturalSignificance: "The warp and weft threads are individually dyed before weaving, requiring complex mathematical precision.",
        visitorOrPracticalInfo: "Visit Pochampally weavers' village, located 45 km from Hyderabad, to see pit-loom master weavers.",
      },
    },
    food: {
      category: 'Famous Food',
      title: "Hyderabadi Dum Biryani & Haleem",
      image: 'telangana',
      summary: "Fragrant basmati rice layered with marinated meat slow-cooked in sealed handi pots, and pounded wheat Haleem.",
      readMore: {
        originAndHistory: "Developed in the royal kitchens of the Asaf Jahi Nizams, fusing Mughal and Deccan spice techniques.",
        culturalSignificance: "Haleem is slow-cooked for twelve hours over firewood during Ramadan until the meat dissolves into velvet.",
        visitorOrPracticalInfo: "Taste authentic kachchi dum biryani at heritage restaurants around Charminar and Banjara Hills in Hyderabad.",
      },
    },
    craft: {
      category: 'Art and Craft',
      title: "Bidriware & Cheriyal Scroll Painting",
      image: 'telangana',
      summary: "Zinc-copper alloy blackened with special Bidar soil inlaid with pure silver wires, and narrative cloth scrolls.",
      readMore: {
        originAndHistory: "Introduced by the Bahmani sultans in the 14th century, blending Persian and indigenous metalcraft.",
        culturalSignificance: "Cheriyal scroll painting depicts Telangana village legends and puranas on khadi canvas using tamarind gum.",
        visitorOrPracticalInfo: "Visit the artisan colonies of Hyderabad and Cheriyal village in Siddipet district.",
      },
    },
    festivals: {
      category: 'Traditions and Festivals',
      title: "Bathukamma & Bonalu",
      image: 'telangana',
      summary: "The nine-day floral festival where women arrange seasonal flowers in conical mounds, and offerings to Mahakali.",
      readMore: {
        originAndHistory: "Bathukamma celebrates the bond between nature, water bodies, and womanhood during the monsoon's close.",
        culturalSignificance: "Women sing folk songs circling around vibrant floral towers made of Gunugu, Tangedu, and Marigold blossoms.",
        visitorOrPracticalInfo: "Bathukamma occurs in September-October during Navratri; Bonalu takes place in Ashada (July-August).",
      },
    },
    hiddenGem: {
      category: 'Hidden Gem',
      title: "Laknavaram Lake & Suspension Bridge",
      image: 'telangana',
      summary: "A serene 10,000-acre lake formed by 13th-century Kakatiya kings with 13 forested islands linked by bridges.",
      location: "Govindaraopet, Mulugu District, Telangana",
      howToReach: "75 km from Warangal; 210 km from Hyderabad via NH163.",
      bestTimeToVisit: "October to March when surrounding Eturnagaram wildlife forests are green.",
      readMore: {
        originAndHistory: "The lake was created by building small bunds between surrounding hills during the Kakatiya dynasty.",
        culturalSignificance: "A 160-meter suspension bridge spans turquoise waters between two peaceful islands.",
        visitorOrPracticalInfo: "Enjoy motorboating and kayaking; eco-friendly lake cottages are available for overnight stays.",
      },
    },
    relatedMonuments: [
      { name: "Charminar, Hyderabad", type: "16th-Century Four-Arch Monument", note: "Grand limestone and granite monument commissioned in 1591 CE by Muhammad Quli Qutb Shah.", panoramaSlug: 'hyderabad-lake' },
      { name: "Golconda Fort", type: "Acoustic Hill Citadel", note: "Famous for its Diamond Vault (home of the Kohinoor) and acoustic clap signaling system." },
      { name: "Ramappa Temple, Palampet", type: "UNESCO World Heritage Site", note: "13th-century Kakatiya temple built with lightweight floating bricks and sculpted black basalt pillars." }
    ],
  },
  'tripura': {
    stateId: 'tripura',
    attire: {
      category: 'Traditional Attire',
      title: "Rignai & Risa Handloom",
      image: 'tripura',
      summary: "Wrap-around lower garment (Rignai) and narrow chest-wrap (Risa) woven with rich tribal patterns.",
      readMore: {
        originAndHistory: "Woven on traditional loin looms by indigenous Tripuri women; every clan possesses distinct design motifs.",
        culturalSignificance: "The Risa is symbolically gifted to adolescent girls during the traditional Risa Sormani rite of passage.",
        visitorOrPracticalInfo: "Purbasha government emporiums in Agartala showcase genuine tribal weaves and silk fabrics.",
      },
    },
    food: {
      category: 'Famous Food',
      title: "Mui Borok & Chakhwi",
      image: 'tripura',
      summary: "Traditional oil-free Tripuri dishes featuring fermented fish (Berma), bamboo shoots, and green chillies.",
      readMore: {
        originAndHistory: "Healthy cooking without added cooking oil, using alkali filtered through burnt bamboo and fragrant herbs.",
        culturalSignificance: "Berma imparts an intense umami punch that complements boiled mountain herbs and freshwater carp.",
        visitorOrPracticalInfo: "Sample tribal dishes at ethnic cafes and local cultural melas in Agartala and Udaipur.",
      },
    },
    craft: {
      category: 'Art and Craft',
      title: "Tripura Bamboo & Cane Craft",
      image: 'tripura',
      summary: "Exquisite bamboo screens, table mats, fruit baskets, and decorative sculptures made from seasoned bamboo.",
      readMore: {
        originAndHistory: "Tripura possesses over 28 bamboo species; bamboo is deeply woven into domestic, cultural, and spiritual life.",
        culturalSignificance: "Artisans slice bamboo into hair-thin strands to weave water-tight containers and artistic room dividers.",
        visitorOrPracticalInfo: "Visit the bamboo artisan clusters in Agartala and Khowai district to watch master splitting.",
      },
    },
    festivals: {
      category: 'Traditions and Festivals',
      title: "Kharchi Puja & Garia Dance",
      image: 'tripura',
      summary: "Seven-day royal festival worshipping the Fourteen Gods (Chaturdasha Devata) with ancient royal rituals.",
      readMore: {
        originAndHistory: "Combines tribal and Hindu rites dating back centuries under the Manikya kings of Tripura.",
        culturalSignificance: "The sacred head-deities are bathed in the Howrah River before being reinstalled in the temple sanctum.",
        visitorOrPracticalInfo: "Kharchi Puja takes place in July at Old Agartala; vibrant melas and cultural dance shows continue all week.",
      },
    },
    hiddenGem: {
      category: 'Hidden Gem',
      title: "Unakoti \u2014 The Lost Rock Carvings of Shiva",
      image: 'tripura',
      summary: "A forested ravine covered with colossal rock-cut bas-relief sculptures of Lord Shiva and Ganesha from the 7th century.",
      location: "Unakoti District, Northern Tripura",
      howToReach: "178 km from Agartala; accessible via rail to Kumarghat followed by a 20 km taxi drive.",
      bestTimeToVisit: "October to March when weather is dry and forested walking paths are clear.",
      readMore: {
        originAndHistory: "According to folklore, Shiva rested here with one crore deities; when they failed to wake at dawn, he turned them to stone (Unakoti = one less than a crore).",
        culturalSignificance: "The central 30-foot head of Shiva (Unakotiswara Kal Bhairava) is flanked by waterfalls in the jungle.",
        visitorOrPracticalInfo: "Stout walking shoes are recommended to navigate the stone staircases descending into the ravine.",
      },
    },
    relatedMonuments: [
      { name: "Neermahal, Melaghar", type: "Royal Water Palace", note: "Magnificent palace situated in the center of Rudrasagar Lake, built by King Bir Bikram Kishore Manikya." },
      { name: "Ujjayanta Palace, Agartala", type: "Historic Royal Residence", note: "Neo-classical palace with Mughal-style tiled gardens, now housing the State Museum of Northeast India." },
      { name: "Tripura Sundari Temple", type: "Ancient Shakti Peeth", note: "500-year-old temple shaped like a tortoise (Kurma), dedicated to Goddess Kali in Udaipur." }
    ],
  },
  'uttar-pradesh': {
    stateId: 'uttar-pradesh',
    attire: {
      category: 'Traditional Attire',
      title: "Lucknowi Chikankari & Banarasi Brocade",
      image: 'uttar-pradesh',
      summary: "Delicate white-on-white shadow embroidery from Lucknow, and gold and silver metallic brocade sarees of Varanasi.",
      readMore: {
        originAndHistory: "Chikankari was perfected under the Nawabs of Awadh with Empress Nur Jahan's royal patronage.",
        culturalSignificance: "Banarasi sarees are woven on jacquard looms with intricate Mughal jal patterns, taking up to six months.",
        visitorOrPracticalInfo: "Explore Chowk and Aminabad in Lucknow for Chikankari, and the weaver lanes of Thatheri Bazaar in Varanasi.",
      },
    },
    food: {
      category: 'Famous Food',
      title: "Awadhi Biryani, Galouti Kebab & Banarasi Chaat",
      image: 'uttar-pradesh',
      summary: "Melt-in-the-mouth minced meat kebabs with 160 secret spices, dum biryani, and crispy tamatar chaat.",
      readMore: {
        originAndHistory: "Galouti kebab was invented for the toothless Nawab Asad-ud-Daula so he could enjoy meat without chewing.",
        culturalSignificance: "Banarasi paan, folded with gulkand, betel nut, and silver leaf, is an art form in itself.",
        visitorOrPracticalInfo: "Visit Tunday Kababi in Lucknow, and try Tamatar Chaat and Malaiyo in Old Varanasi alleyways.",
      },
    },
    craft: {
      category: 'Art and Craft',
      title: "Varanasi Zari, Moradabad Brass & Firozabad Glass",
      image: 'uttar-pradesh',
      summary: "Handcrafted brass decor, hand-blown glass bangles, and sacred silver-gold zari embroidery.",
      readMore: {
        originAndHistory: "Moradabad is renowned worldwide as the 'Brass City', casting and etching ceremonial temple lamps.",
        culturalSignificance: "Firozabad has manufactured colorful glass bangles and lanterns since the Mughal era.",
        visitorOrPracticalInfo: "Visit the brass workshops of Moradabad, bangle markets in Firozabad, and Varanasi silk weavers.",
      },
    },
    festivals: {
      category: 'Traditions and Festivals',
      title: "Varanasi Ganga Aarti, Dev Deepawali & Braj Holi",
      image: 'uttar-pradesh',
      summary: "The evening synchronized lamp worship along Dashashwamedh Ghat, and Lathmar Holi in Barsana.",
      readMore: {
        originAndHistory: "Dev Deepawali on Kartik Purnima sees a million earthen lamps lit on all 84 ghats of Varanasi.",
        culturalSignificance: "Braj Holi in Mathura and Vrindavan is celebrated for 40 days with flowers, colours, and sacred song.",
        visitorOrPracticalInfo: "Ganga Aarti is performed every evening at sunset. Dev Deepawali is in November; Braj Holi is in March.",
      },
    },
    hiddenGem: {
      category: 'Hidden Gem',
      title: "Bateshwar Temples \u2014 101 Shiva Shrines on the Yamuna",
      image: 'uttar-pradesh',
      summary: "A sacred crescent-shaped bend of the Yamuna River lined with 101 white stone Shiva temples.",
      location: "Bateshwar, Agra District, Uttar Pradesh",
      howToReach: "70 km from Agra city; 1.5-hour drive via the Agra-Bah road.",
      bestTimeToVisit: "October to March; the annual animal fair takes place before Kartik Purnima.",
      readMore: {
        originAndHistory: "Ancestral village of former Prime Minister Atal Bihari Vajpayee, dating back centuries.",
        culturalSignificance: "The river Yamuna uniquely changes its flow direction from east to west at this sacred bend.",
        visitorOrPracticalInfo: "Experience morning boat rides along the row of white temples; combine with Chambal River sanctuary visits.",
      },
    },
    relatedMonuments: [
      { name: "Taj Mahal, Agra", type: "UNESCO Wonder of the World", note: "17th-century white marble mausoleum built by Shah Jahan for Mumtaz Mahal on the Yamuna.", panoramaSlug: 'taj-mahal' },
      { name: "Varanasi Ghats (Dashashwamedh & Assi)", type: "Ancient Living Riverfront", note: "Historic stone ghats stretching along the sacred Ganga, center of Hindu philosophy and morning boat rides.", panoramaSlug: 'ghat-varanasi' },
      { name: "Fatehpur Sikri", type: "Mughal Imperial Red Sandstone City", note: "Built by Akbar in 1571 CE, featuring the towering Buland Darwaza and Salim Chishti tomb.", panoramaSlug: 'fatehpur-sikri' }
    ],
  },
  'uttarakhand': {
    stateId: 'uttarakhand',
    attire: {
      category: 'Traditional Attire',
      title: "Pichora Veil & Ghagri",
      image: 'uttarakhand',
      summary: "A sacred saffron-yellow bridal veil printed with red dots, swastika, and sun-moon motifs in Kumaon.",
      readMore: {
        originAndHistory: "Worn during weddings and auspicious rituals by Kumaoni and Garhwali women for centuries.",
        culturalSignificance: "Symbolizes prosperity and blessings; hand-printed with natural turmeric and vermillion dyes.",
        visitorOrPracticalInfo: "Available at traditional bridal shops in Almora, Nainital, and Dehradun markets.",
      },
    },
    food: {
      category: 'Famous Food',
      title: "Kafuli, Bhatt ki Churkani & Bal Mithai",
      image: 'uttarakhand',
      summary: "Velvety spinach-fenugreek curry thickened with rice paste, black soybean stew, and roasted fudge coated in sugar balls.",
      readMore: {
        originAndHistory: "Hearty mountain diet utilizing iron-rich mountain pulses and wild greens grown in terraced hills.",
        culturalSignificance: "Bal Mithai is roasted khoya fudge coated with crunchy white sugar pills, native to Almora.",
        visitorOrPracticalInfo: "Sample authentic Pahadi thalis at traditional eateries in Almora, Dehradun, and Rishikesh.",
      },
    },
    craft: {
      category: 'Art and Craft',
      title: "Aipan Folk Art & Ringal Cane Craft",
      image: 'uttarakhand',
      summary: "Ritual floor and wall paintings made of brick-red terracotta paste (Geru) and white rice flour paste (Biswar).",
      readMore: {
        originAndHistory: "Passed down from mothers to daughters in Kumaon, painted on doorsteps, puja rooms, and chowkis.",
        culturalSignificance: "Each geometric motif carries specific spiritual protection for weddings, childbirth, and festivals.",
        visitorOrPracticalInfo: "Visit craft centers in Almora and Dehradun; local women's cooperatives sell framed Aipan art.",
      },
    },
    festivals: {
      category: 'Traditions and Festivals',
      title: "Ganga Dussehra & Nanda Devi Raj Jat",
      image: 'uttarakhand',
      summary: "Celebration of the descent of the Ganga to earth, and the 280-km Himalayan pilgrimage of Nanda Devi.",
      readMore: {
        originAndHistory: "Ganga Dussehra draws pilgrims to Haridwar and Rishikesh to bathe in the swift holy currents.",
        culturalSignificance: "Nanda Devi Raj Jat takes place every 12 years, guided by a four-horned ram to high Himalayan tarns.",
        visitorOrPracticalInfo: "Ganga Dussehra occurs in May-June; evening maha aarti at Har Ki Pauri is magnificent.",
      },
    },
    hiddenGem: {
      category: 'Hidden Gem',
      title: "Roopkund & Bedni Bugyal \u2014 The Alpine Meadows",
      image: 'uttarakhand',
      summary: "Vast emerald undulating alpine grasslands at 3,354 m offering views of Trishul and Nanda Ghunti peaks.",
      location: "Chamoli District, Garhwal Himalayas",
      howToReach: "Base camp at Lohajung; 3-day trek through oak and rhododendron forests.",
      bestTimeToVisit: "May to June for green pastures; September to October for golden autumn views.",
      readMore: {
        originAndHistory: "Bedni Bugyal is one of the largest alpine meadows in India, serving as a campsite on the Nanda Devi trail.",
        culturalSignificance: "Reflective Bedni Kund mirrors the snow-clad peaks of Mount Trishul.",
        visitorOrPracticalInfo: "Requires trekking permits and warm sub-zero sleeping gear; hire certified guides from Lohajung.",
      },
    },
    relatedMonuments: [
      { name: "Kedarnath Temple", type: "Sacred High-Altitude Jyotirlinga", note: "8th-century stone temple standing at 3,583 m flanked by the Kedarnath peak and Mandakini River.", panoramaSlug: 'kedarnath' },
      { name: "Badrinath Temple", type: "Sacred Char Dham Sanctuary", note: "Colorful facade dedicated to Lord Vishnu, nestled between Nar and Narayana mountain ranges." },
      { name: "Rishikesh Suspension Bridges & Ghats", type: "Yoga Capital of the World", note: "Historic suspension bridges and riverbanks where the emerald Ganga emerges from the Himalayas." }
    ],
  },
  'west-bengal': {
    stateId: 'west-bengal',
    attire: {
      category: 'Traditional Attire',
      title: "Baluchari, Jamdani & Lal Paar Saree",
      image: 'west-bengal',
      summary: "Baluchari silk sarees with mythological scenes woven into the pallu, and white cotton sarees with broad red borders.",
      readMore: {
        originAndHistory: "Baluchari weaving flourished in Murshidabad under Nawab Murshid Quli Khan in the 18th century.",
        culturalSignificance: "Lal Paar sarees are worn during Durga Puja, particularly for the sacred Sindoor Khela farewell ritual.",
        visitorOrPracticalInfo: "Visit Bishnupur in Bankura for Baluchari, and Shantipur/Phulia for fine handloom cottons.",
      },
    },
    food: {
      category: 'Famous Food',
      title: "Shorshe Ilish, Kosha Mangsho & Mishti Doi",
      image: 'west-bengal',
      summary: "Hilsa fish steamed in pungent yellow mustard-poppy seed gravy, slow-braised mutton, and baked caramel yogurt.",
      readMore: {
        originAndHistory: "Bengali food celebrates freshwater river fish, sweet-sour balancing, and the aromatic panch phoron spice mix.",
        culturalSignificance: "Mishti Doi is fermented in porous earthen pots, which absorb excess whey and concentrate caramel flavors.",
        visitorOrPracticalInfo: "Sample Shorshe Ilish at heritage Bengali restaurants in Kolkata, and buy Mishti Doi from iconic sweet shops.",
      },
    },
    craft: {
      category: 'Art and Craft',
      title: "Bishnupur Terracotta & Dokra",
      image: 'west-bengal',
      summary: "Fired reddish-brown clay tiles depicting scenes from the epics, and primitive lost-wax brass castings.",
      readMore: {
        originAndHistory: "17th-century Malla kings commissioned terracotta temples in Bankura due to the absence of stone in alluvial Bengal.",
        culturalSignificance: "The Bankura horse with its long erect ears is the official symbol of Indian handicrafts.",
        visitorOrPracticalInfo: "Visit Panchmura village in Bankura to watch potters mold horses and temple plaques on the wheel.",
      },
    },
    festivals: {
      category: 'Traditions and Festivals',
      title: "Durga Puja \u2014 UNESCO Intangible Heritage",
      image: 'west-bengal',
      summary: "Massive five-day festival where entire neighborhoods build artistic temporary pandals celebrating Goddess Durga.",
      readMore: {
        originAndHistory: "Celebrated with artistic street installations, dhak drum beats, dhunuchi folk dances, and immersion processions.",
        culturalSignificance: "Inscribed on the UNESCO Representative List of the Intangible Cultural Heritage of Humanity.",
        visitorOrPracticalInfo: "Durga Puja takes place in September-October; night-time pandal hopping in Kolkata is an unforgettable cultural experience.",
      },
    },
    hiddenGem: {
      category: 'Hidden Gem',
      title: "Bishnupur Terracotta Temples & Sundarbans Rivers",
      image: 'west-bengal',
      summary: "A historic temple town adorned with terracotta relief tiles depicting classical dance and epics.",
      location: "Bankura District, West Bengal",
      howToReach: "135 km from Kolkata; accessible by direct train (3 hours from Howrah).",
      bestTimeToVisit: "October to March when weather is pleasant for walking between temples.",
      readMore: {
        originAndHistory: "Constructed by the Malla kings between 1600 and 1750 CE using locally dug laterite clay.",
        culturalSignificance: "Features the pyramid-roofed Rasmancha, the Jor Bangla temple, and the carved Shyam Rai temple.",
        visitorOrPracticalInfo: "Rent a cycle-rickshaw to tour all 16 temples; visit local weavers for Baluchari silk sarees.",
      },
    },
    relatedMonuments: [
      { name: "Victoria Memorial, Kolkata", type: "White Makrana Marble Palace", note: "Grand British monument set in gardens, housing royal portrait galleries and historical exhibits.", panoramaSlug: 'victoria-memorial' },
      { name: "Sundarbans Mangrove Delta", type: "UNESCO Tiger Biosphere", note: "World's largest mangrove forest delta where Royal Bengal tigers swim between tidal river channels.", panoramaSlug: 'sundarban' },
      { name: "Howrah Bridge (Rabindra Setu)", type: "Iconic Cantilever Bridge", note: "Massive balanced cantilever steel bridge spanning the Hooghly River without any nuts or bolts." }
    ],
  },
  'andaman-and-nicobar-islands': {
    stateId: 'andaman-and-nicobar-islands',
    attire: {
      category: 'Traditional Attire',
      title: "Tropical Island Handloom & Shell Jewelry",
      image: 'andaman-and-nicobar-islands',
      summary: "Lightweight breezy tropical cottons paired with polished sea-shell necklaces and woven straw hats.",
      readMore: {
        originAndHistory: "Crafted by coastal islanders and settler communities to match warm humid sea winds.",
        culturalSignificance: "Shell crafts celebrate the rich marine ecosystem, supporting sustainable coastal artisans.",
        visitorOrPracticalInfo: "Aberdeen Bazaar in Port Blair offers certified government-stamped sea shell souvenirs.",
      },
    },
    food: {
      category: 'Famous Food',
      title: "Coconut Prawn Curry & Grilled Fish",
      image: 'andaman-and-nicobar-islands',
      summary: "Fresh sea prawns simmered in freshly squeezed coconut milk, green chillies, and island turmeric.",
      readMore: {
        originAndHistory: "Coastal cuisine influenced by South Indian, Bengali, and Burmese culinary migrations.",
        culturalSignificance: "Seafood is caught daily and grilled over coconut-husk charcoal fires with minimal spices.",
        visitorOrPracticalInfo: "Taste fresh seafood along New Marine Hill and Havelock Island beach shacks.",
      },
    },
    craft: {
      category: 'Art and Craft',
      title: "Padauk Wood Carving & Shell Work",
      image: 'andaman-and-nicobar-islands',
      summary: "Sculptures and tableware carved from reddish-golden Andaman Padauk timber, alongside shell lamps.",
      readMore: {
        originAndHistory: "Padauk is native to the Andaman islands, famous for its resistance to sea termites and moisture.",
        culturalSignificance: "Artisans polish mother-of-pearl, turbos, and cowries into jewelry boxes and lighting fixtures.",
        visitorOrPracticalInfo: "Visit the Sagarika Government Cottage Industries Emporium in Port Blair.",
      },
    },
    festivals: {
      category: 'Traditions and Festivals',
      title: "Island Tourism Festival & Subhash Mela",
      image: 'andaman-and-nicobar-islands',
      summary: "10-day winter festival showcasing island tribal dances, music concerts, and water sports at Port Blair.",
      readMore: {
        originAndHistory: "Brings together performers from the mainland and island tribes in cultural harmony.",
        culturalSignificance: "Celebrates the multicultural fabric of the islands, historically referred to as 'Mini India'.",
        visitorOrPracticalInfo: "Takes place in January at the ITF Ground in Port Blair; pleasant tropical sea breezes.",
      },
    },
    hiddenGem: {
      category: 'Hidden Gem',
      title: "Ross Island (Netaji Subhash Chandra Bose Island)",
      image: 'andaman-and-nicobar-islands',
      summary: "A ghost town where giant banyan tree roots have swallowed colonial Victorian stone ballrooms and barracks.",
      location: "Port Blair, Andaman Islands",
      howToReach: "15-minute speed boat ride from Aberdeen Jetty (Water Sports Complex) in Port Blair.",
      bestTimeToVisit: "November to April for calm seas and clear visibility.",
      readMore: {
        originAndHistory: "Served as the British penal administrative headquarters until an earthquake devastated it in 1941.",
        culturalSignificance: "Roots of wild ficus trees wrap around church walls and bakery chimneys in a surreal jungle takeover.",
        visitorOrPracticalInfo: "Spotted deer and peacocks roam freely among the ruins; an evening sound and light show narrates history.",
      },
    },
    relatedMonuments: [
      { name: "Cellular Jail (Kala Pani)", type: "National Memorial Fortress", note: "Seven-wing panopticon prison where Indian freedom fighters endured solitary confinement.", panoramaSlug: 'cellular-jail' },
      { name: "Radhanagar Beach, Havelock", type: "Award-Winning White Sand Beach", note: "Ranked among the finest beaches in Asia, known for pristine turquoise waters and golden sunsets." },
      { name: "Baratang Island Mud Volcanoes & Limestone Caves", type: "Rare Geological Features", note: "Active bubbling mud volcanoes and underground limestone stalactite caves reached by mangrove boats." }
    ],
  },
  'chandigarh': {
    stateId: 'chandigarh',
    attire: {
      category: 'Traditional Attire',
      title: "Contemporary Urban Handloom & Phulkari Stoles",
      image: 'chandigarh',
      summary: "Modern clean silhouettes paired with handcrafted Punjabi Phulkari stoles and leather juttis.",
      readMore: {
        originAndHistory: "Blends the agrarian textile traditions of Punjab and Haryana with planned city minimalism.",
        culturalSignificance: "Reflects the modernist identity of India's first post-independence planned city.",
        visitorOrPracticalInfo: "Sector 17 Plaza and Sector 22 markets house government state emporiums.",
      },
    },
    food: {
      category: 'Famous Food',
      title: "Chole Bhature, Butter Chicken & Lassi",
      image: 'chandigarh',
      summary: "Puffed golden bhaturas with spiced chickpeas, creamy tandoori butter chicken, and frothy sweet lassi.",
      readMore: {
        originAndHistory: "Hearty Punjabi cuisine refined in city dining rooms and street stalls.",
        culturalSignificance: "Served with pickled baby onions and mint chutney; lassi is poured into tall earthen tumblers.",
        visitorOrPracticalInfo: "Visit street food lanes in Sector 22 and legacy dhabas in Sector 35 for classic dishes.",
      },
    },
    craft: {
      category: 'Art and Craft',
      title: "Nek Chand Rock Garden Sculptures",
      image: 'chandigarh',
      summary: "Visionary outsider art sculptures created entirely from broken ceramic tiles, bangles, and industrial waste.",
      readMore: {
        originAndHistory: "Nek Chand began secretly building the garden in 1957 in a forest clearing using discarded city waste.",
        culturalSignificance: "Now spans 40 acres with courtyards, archways, and thousands of mosaic human and animal figures.",
        visitorOrPracticalInfo: "Visit the Rock Garden in Sector 1; walk through narrow stone gorges opening into courtyards.",
      },
    },
    festivals: {
      category: 'Traditions and Festivals',
      title: "Rose Festival & Chandigarh Carnival",
      image: 'chandigarh',
      summary: "Annual celebration of over 1,600 rose varieties at Zakir Hussain Rose Garden with music and pageants.",
      readMore: {
        originAndHistory: "Instituted to celebrate spring blooms and civic joy in Asia's largest rose garden.",
        culturalSignificance: "Features flower competitions, acoustic folk performances, and carnival floats.",
        visitorOrPracticalInfo: "Takes place in February at the Rose Garden in Sector 16; free entry for all visitors.",
      },
    },
    hiddenGem: {
      category: 'Hidden Gem',
      title: "Capitol Complex & The Open Hand Monument",
      image: 'chandigarh',
      summary: "Le Corbusier's UNESCO World Heritage masterwork featuring the rotating 28-meter Open Hand metal dove.",
      location: "Sector 1, Chandigarh",
      howToReach: "15-minute drive from Chandigarh Railway Station; public transit available.",
      bestTimeToVisit: "October to March for pleasant walking weather.",
      readMore: {
        originAndHistory: "Conceived by architect Le Corbusier as the symbolic crown of Chandigarh's city layout.",
        culturalSignificance: "The Open Hand symbolizes 'open to receive, open to give'\u2014peace, reconciliation, and modern unity.",
        visitorOrPracticalInfo: "Guided heritage walks inside the Secretariat, High Court, and Assembly require advance visitor registration.",
      },
    },
    relatedMonuments: [
      { name: "The Rock Garden", type: "Sculpture Garden of Recycled Art", note: "World-renowned labyrinth of mosaic courtyards created from urban broken ceramics and stone." },
      { name: "Sukhna Lake", type: "Man-Made Rain Reservoir", note: "3 sq km peaceful lake at the foothills of the Shivaliks, popular for morning walks and rowing." },
      { name: "Open Hand Monument", type: "Le Corbusier's Civic Symbol", note: "Giant rotating metal sculpture perched on a trench platform symbolizing peace and modern hope." }
    ],
  },
  'delhi': {
    stateId: 'delhi',
    attire: {
      category: 'Traditional Attire',
      title: "Zardozi Embroidery & Indo-Western Drapes",
      image: 'delhi',
      summary: "Opulent gold and silver metallic wire embroidery on velvet and raw silk, preserving Mughal court dress.",
      readMore: {
        originAndHistory: "Flourished in royal karkhanas of Old Delhi under Akbar and Shah Jahan.",
        culturalSignificance: "Couching twisted gold wires over velvet panels represents Delhi's layered imperial history.",
        visitorOrPracticalInfo: "Kinari Bazaar in Chandni Chowk is the epicenter for Zardozi borders and bridal wear.",
      },
    },
    food: {
      category: 'Famous Food',
      title: "Old Delhi Nihari, Chole Bhature & Chaat",
      image: 'delhi',
      summary: "Slow-simmered overnight meat stew with marrow, puffy bhaturas, and spicy street papdi chaat.",
      readMore: {
        originAndHistory: "Nihari was devised in the late 17th century for laborers building Shahjahanabad for winter stamina.",
        culturalSignificance: "Delhi food reflects 800 years of migration: Mughal dum cooking blended with post-partition Punjabi warmth.",
        visitorOrPracticalInfo: "Visit Matia Mahal opposite Jama Masjid for dawn Nihari and Chandni Chowk for jalebis.",
      },
    },
    craft: {
      category: 'Art and Craft',
      title: "Meenakari Enamelling & Paper Crafts",
      image: 'delhi',
      summary: "Mineral enamel fused onto gold and silver ornaments, accompanied by paper-making in historic alleys.",
      readMore: {
        originAndHistory: "Introduced by Raja Man Singh and refined under Mughal master jewelers.",
        culturalSignificance: "Known as 'painting on metal', intense kiln firing produces vivid jewel-toned bird motifs.",
        visitorOrPracticalInfo: "Dariba Kalan in Chandni Chowk features multi-generational silversmiths and enamellers.",
      },
    },
    festivals: {
      category: 'Traditions and Festivals',
      title: "Phool Walon Ki Sair & Qutub Festival",
      image: 'delhi',
      summary: "200-year-old interfaith festival presenting floral fans at both Yogmaya Temple and a Sufi shrine.",
      readMore: {
        originAndHistory: "Started in 1812 by Queen Mumtaz Mahal Begum, becoming an emblem of Delhi's syncretic Tehzeeb.",
        culturalSignificance: "Hindus and Muslims join to carry flower fans (pankhas) through the stone lanes of Mehrauli.",
        visitorOrPracticalInfo: "Celebrated in October-November in Mehrauli; features classical qawwali performances.",
      },
    },
    hiddenGem: {
      category: 'Hidden Gem',
      title: "Agrasen ki Baoli \u2014 The Subterranean Stepwell",
      image: 'delhi',
      summary: "A 60-meter long stepwell with 108 stone steps plunging into the earth, hidden near modern Connaught Place.",
      location: "Hailey Road, near Connaught Place, New Delhi",
      howToReach: "5-minute walk from Barakhamba Road or Mandi House Metro stations.",
      bestTimeToVisit: "Early morning (8:00 AM) before city traffic picks up.",
      readMore: {
        originAndHistory: "Believed to have been built by King Agrasen and reconstructed during the 14th-century Tughlaq era.",
        culturalSignificance: "Its tiered arched arcades provided a cool sanctuary from scorching North Indian summers.",
        visitorOrPracticalInfo: "Entry is free; look for the niche carvings along the stone step tiers.",
      },
    },
    relatedMonuments: [
      { name: "Red Fort (Lal Qila)", type: "Mughal Imperial Fortress", note: "Massive red sandstone citadel built by Shah Jahan in 1648 CE with Diwan-i-Khas.", panoramaSlug: 'red-fort' },
      { name: "Qutub Minar Complex", type: "12th-Century Minaret", note: "72.5-meter victory tower with intricate inscriptions and the rust-resistant Iron Pillar.", panoramaSlug: 'qutub-minar' },
      { name: "Humayun's Tomb", type: "UNESCO Mughal Garden Tomb", note: "The red sandstone precursor to the Taj Mahal with four-quadrant Charbagh gardens." }
    ],
  },
  'dnh-and-dd': {
    stateId: 'dnh-and-dd',
    attire: {
      category: 'Traditional Attire',
      title: "Warli Attire & Portuguese-Konkan Dress",
      image: 'dnh-and-dd',
      summary: "Simple cotton waist-cloths and colorful sarees, alongside Portuguese-influenced fisherfolk blouses.",
      readMore: {
        originAndHistory: "Reflects the confluence of indigenous Warli tribes and four centuries of Portuguese naval presence.",
        culturalSignificance: "Fishers wear lightweight drapes suitable for rowing wooden canoes through ocean surf.",
        visitorOrPracticalInfo: "Handloom and local garments can be explored in Daman and Silvassa markets.",
      },
    },
    food: {
      category: 'Famous Food',
      title: "Ubadiyu & Fresh Crab Sukka",
      image: 'dnh-and-dd',
      summary: "Clay-pot roasted winter vegetables and country beans flavored with wild carom, and spicy coastal crab.",
      readMore: {
        originAndHistory: "Ubadiyu is cooked by inverting earthen pots underground packed with aromatic leaves and embers.",
        culturalSignificance: "Fresh catch of crab, pomfret, and prawns is seasoned with Konkani kokum and green chillies.",
        visitorOrPracticalInfo: "Daman sea-face shacks and local tribal eateries in Silvassa serve authentic dishes.",
      },
    },
    craft: {
      category: 'Art and Craft',
      title: "Warli Canvas Art & Mat Weaving",
      image: 'dnh-and-dd',
      summary: "Tribal wall paintings depicting the Tarpa dance, mother earth, and farming rituals on cloth canvas.",
      readMore: {
        originAndHistory: "Indigenous Warli art uses rice flour paste and tree gum, illustrating village community life.",
        culturalSignificance: "Palm leaves and river grasses are hand-plaited into cooling floor mats and fishing baskets.",
        visitorOrPracticalInfo: "Visit the Tribal Cultural Museum in Silvassa to watch local Warli artists.",
      },
    },
    festivals: {
      category: 'Traditions and Festivals',
      title: "Nariyal Poornima & Tarpa Dance",
      image: 'dnh-and-dd',
      summary: "Offering golden coconuts to the Arabian Sea to mark the opening of the fishing season, and Tarpa dances.",
      readMore: {
        originAndHistory: "Fishermen decorate fishing boats and pray to Varuna for calm waters and bountiful catch.",
        culturalSignificance: "Villagers dance hand-in-hand in a winding spiral around the wind-instrument Tarpa player.",
        visitorOrPracticalInfo: "Nariyal Poornima occurs in August; Tarpa folk festival is held in Silvassa in December.",
      },
    },
    hiddenGem: {
      category: 'Hidden Gem',
      title: "Diu Fort Moat & Jallandhar Beach Caves",
      image: 'dnh-and-dd',
      summary: "A massive 16th-century sea citadel surrounded by a deep sea moat, with hidden rock caverns on the beach.",
      location: "Diu Island, Union Territory of DNH & DD",
      howToReach: "Connected by bridge from Gujarat mainland; flights from Mumbai to Diu Airport.",
      bestTimeToVisit: "October to March for pleasant ocean breezes.",
      readMore: {
        originAndHistory: "Built in 1535 CE following a defense alliance between the Sultan of Gujarat and Portuguese troops.",
        culturalSignificance: "Features brass cannons, stone bridges, and panoramic views of crashing Arabian Sea waves.",
        visitorOrPracticalInfo: "Stroll through the fort at sunset; explore the adjacent St. Paul's Church.",
      },
    },
    relatedMonuments: [
      { name: "Diu Fort", type: "16th-Century Island Citadel", note: "Massive stone fortress jutting directly into the sea with lighthouses and historic cannons.", panoramaSlug: 'diu-fort' },
      { name: "Moti Daman Fort", type: "Portuguese Coastal Fortress", note: "Surrounded by a deep moat with ten bastions and the Church of Bom Jesus inside." },
      { name: "Dudhani Lake & Water Sports", type: "Madhuban Dam Reservoir", note: "Scenic freshwater lake in Dadra & Nagar Haveli surrounded by forested foothills." }
    ],
  },
  'lakshadweep': {
    stateId: 'lakshadweep',
    attire: {
      category: 'Traditional Attire',
      title: "Kachi & Thattam Headdress",
      image: 'lakshadweep',
      summary: "Rectangular cotton drapes (Kachi) paired with embroidered headscarves (Thattam) and silver waistbands.",
      readMore: {
        originAndHistory: "Reflects islander maritime heritage with Arab, Malabar, and Muslim trade influences.",
        culturalSignificance: "Silver waistbelts (Aranjanam) and filigree earrings are treasured family heirlooms.",
        visitorOrPracticalInfo: "Crafted by traditional tailor families in Agatti, Kavaratti, and Amini islands.",
      },
    },
    food: {
      category: 'Famous Food',
      title: "Mus Kavaab & Rayereha",
      image: 'lakshadweep',
      summary: "Spicy dried tuna fish skewers marinated in red chilli and coconut paste, and aromatic coconut fish curry.",
      readMore: {
        originAndHistory: "Tuna is the dietary staple of the atolls, caught via sustainable pole-and-line fishing.",
        culturalSignificance: "Mus (air-dried smoked tuna) was devised to preserve fish during monsoon months when boats stay ashore.",
        visitorOrPracticalInfo: "Enjoy fresh coconut water and home-style tuna curries at island beach homestays.",
      },
    },
    craft: {
      category: 'Art and Craft',
      title: "Coral & Coir Fibre Craft",
      image: 'lakshadweep',
      summary: "Hand-twisted golden coconut coir ropes, and shell jewelry polished from naturally washed-up shells.",
      readMore: {
        originAndHistory: "Lakshadweep coir is prized worldwide for its tensile strength and resistance to saltwater rot.",
        culturalSignificance: "Tortoiseshell-patterned artifacts and coconut-shell ladles are carved with geometric lines.",
        visitorOrPracticalInfo: "Available at local government emporiums on Kavaratti and Kadmat islands.",
      },
    },
    festivals: {
      category: 'Traditions and Festivals',
      title: "Eid-ul-Fitr & Milad-un-Nabi",
      image: 'lakshadweep',
      summary: "Joyful island festivities with community beach prayers, boat races, and evening drum processions.",
      readMore: {
        originAndHistory: "Islanders gather in historic mosques for community feasts featuring rice and spiced tuna.",
        culturalSignificance: "Traditional Parichakali (sword-and-shield martial folk dance) is performed on festival nights.",
        visitorOrPracticalInfo: "Dates follow the lunar Islamic calendar; special permits required for all visitors.",
      },
    },
    hiddenGem: {
      category: 'Hidden Gem',
      title: "Kadmat Island Lagoon \u2014 The Coral Atoll",
      image: 'lakshadweep',
      summary: "A long narrow coral island flanked on both sides by calm, shallow turquoise lagoons with sea turtles.",
      location: "Kadmat Island, Lakshadweep Archipelago",
      howToReach: "Passenger ships from Kochi (14 hours) or helicopter transfer from Agatti Airport.",
      bestTimeToVisit: "October to May when the sea is calm and visibility underwater exceeds 30 meters.",
      readMore: {
        originAndHistory: "The shallow lagoon is protected by an outer barrier reef, creating an aquarium-like natural pool.",
        culturalSignificance: "Home to green sea turtles, manta rays, and pristine coral gardens teeming with reef fish.",
        visitorOrPracticalInfo: "Advance booking with Lakshadweep Tourism (SPORTS) is required; scuba diving is outstanding.",
      },
    },
    relatedMonuments: [
      { name: "Ujra Mosque, Kavaratti", type: "17th-Century Carved Sanctuary", note: "Unique mosque featuring ceilings carved from single blocks of driftwood and an ornate water tank." },
      { name: "Minicoy Lighthouse", type: "1885 British Brick Beacon", note: "Historical 49-meter tall white lighthouse offering panoramic views across the Maliku atoll." },
      { name: "Agatti Coral Reef", type: "Living Marine Barrier", note: "Breathtaking atoll landing strip surrounded by vibrant turquoise coral reefs." }
    ],
  },
  'puducherry': {
    stateId: 'puducherry',
    attire: {
      category: 'Traditional Attire',
      title: "Franco-Tamil Cottons & Silk Drapes",
      image: 'puducherry',
      summary: "Cool pastel linen tunics paired with traditional Tamil silk sarees and French-inspired scarves.",
      readMore: {
        originAndHistory: "Reflects three centuries of French colonial rule blending with indigenous Tamil culture.",
        culturalSignificance: "Lightweight breathable fabrics suit the coastal tropical climate of the Bay of Bengal.",
        visitorOrPracticalInfo: "Boutiques in the French Quarter (White Town) and Auroville showcase organic dyed garments.",
      },
    },
    food: {
      category: 'Famous Food',
      title: "Pondicherry Creole Curry & Baguettes",
      image: 'puducherry',
      summary: "Fresh seafood curry cooked with coconut milk, aniseed, and tamarind, eaten with crusty baguettes.",
      readMore: {
        originAndHistory: "Unique Creole cuisine created when French governors' wives adapted recipes to Tamil spices.",
        culturalSignificance: "Croissants, quiches, and caf\u00e9 au lait are enjoyed alongside crispy masala dosas.",
        visitorOrPracticalInfo: "Dine at heritage courtyard cafes in White Town, and taste fresh pastries in local bakeries.",
      },
    },
    craft: {
      category: 'Art and Craft',
      title: "Auroville Marbled Paper & Incense",
      image: 'puducherry',
      summary: "Hand-marbled cotton-rag paper made using water-surface oil inks, and pure botanical incense.",
      readMore: {
        originAndHistory: "Auroville craft communities perfected handmade paper from recycled cotton cloth waste.",
        culturalSignificance: "Natural incense is rolled using fragrant temple tree resins, essential oils, and vetiver.",
        visitorOrPracticalInfo: "Visit the Auroville Visitors Centre craft boutiques and Sri Aurobindo Ashram paper factory.",
      },
    },
    festivals: {
      category: 'Traditions and Festivals',
      title: "F\u00eate de Pondich\u00e9ry & Bastille Day",
      image: 'puducherry',
      summary: "Celebration of Puducherry's heritage with music along the promenade, and Bastille Day parades.",
      readMore: {
        originAndHistory: "French citizens and locals celebrate July 14 with lantern processions and military bands.",
        culturalSignificance: "The Promenade Beach hosts open-air theater, classical Bharatnatyam, and French chansons.",
        visitorOrPracticalInfo: "Takes place in July and August along Goubert Avenue by the sea.",
      },
    },
    hiddenGem: {
      category: 'Hidden Gem',
      title: "Arikamedu \u2014 Ancient Roman Port Ruins",
      image: 'puducherry',
      summary: "An archaeological excavation revealing a 1st-century BCE Roman trading port on the Ariyankuppam River.",
      location: "Kakkayanthope, 7 km south of Puducherry town",
      howToReach: "15-minute taxi or auto-rickshaw ride from White Town; accessible by local road.",
      bestTimeToVisit: "October to March for cool pleasant exploration.",
      readMore: {
        originAndHistory: "Excavated by Sir Mortimer Wheeler in the 1940s, uncovering Roman amphorae wine jars and gems.",
        culturalSignificance: "Proves ancient Tamil kingdoms traded directly with the Roman Empire over two thousand years ago.",
        visitorOrPracticalInfo: "Stroll through the shaded palm ruins along the quiet river inlet; carry mosquito repellent.",
      },
    },
    relatedMonuments: [
      { name: "The Promenade Beach (Goubert Avenue)", type: "Iconic Coastal Esplanade", note: "1.5-km seaside boulevard flanked by the French war memorial and Mahatma Gandhi statue.", panoramaSlug: 'marina-beach' },
      { name: "Auroville Matrimandir", type: "Golden Geodesic Sphere", note: "Spiritual meditation pavilion covered in 1,414 golden discs, set in tranquil green gardens." },
      { name: "Sri Aurobindo Ashram", type: "Spiritual Community Sanctuary", note: "Founded in 1926 by Sri Aurobindo and Mirra Alfassa (The Mother), center of integral yoga." }
    ],
  },
};

export function getStateCulture(stateId: string): StateCulture | undefined {
  return CULTURAL_DATA_BY_STATE[stateId];
}
