import type { LanguageCode } from './i18n';
import type { StateStory } from '../data/types';
import { CULTURAL_DATA_BY_STATE } from '../data/culturalData';

export interface LocalizedReply {
  greeting: string;
  attireHeader: string;
  foodHeader: string;
  craftHeader: string;
  festivalHeader: string;
  hiddenGemHeader: string;
  howToReachHeader: string;
  offlineNotice: string;
}

export const LOCALIZED_TEMPLATES: Record<LanguageCode, LocalizedReply> = {
  en: {
    greeting: "Namaste! I am Tara, your cultural virtual guide.",
    attireHeader: "Traditional Attire",
    foodHeader: "Famous Cuisine",
    craftHeader: "Art & Handloom Crafts",
    festivalHeader: "Festivals & Traditions",
    hiddenGemHeader: "Hidden Gem",
    howToReachHeader: "Travel & Route Advice",
    offlineNotice: "Operating in verified offline cultural knowledge mode.",
  },
  hi: {
    greeting: "नमस्ते! मैं तारा हूँ, आपकी डिजिटल सांस्कृतिक मार्गदर्शिका।",
    attireHeader: "पारंपरिक वेशभूषा",
    foodHeader: "प्रसिद्ध खानपान एवं व्यंजन",
    craftHeader: "कला एवं हस्तशिल्प",
    festivalHeader: "परंपराएँ एवं प्रमुख त्यौहार",
    hiddenGemHeader: "अन्वेषित रहस्य (हिडन जेम)",
    howToReachHeader: "यात्रा व पहुँचने का मार्ग",
    offlineNotice: "सत्यापित ऑफलाइन सांस्कृतिक ज्ञान कोष सक्रिय है।",
  },
  bn: {
    greeting: "নমস্কার! আমি তারা, আপনার ভারতভার্স সাংস্কৃতিক ভার্চুয়াল গাইড।",
    attireHeader: "ঐতিহ্যবাহী পোশাক",
    foodHeader: "বিখ্যাত খাবার ও পদ",
    craftHeader: "শিল্প ও ঐতিহ্যবাহী কারুশিল্প",
    festivalHeader: "ঐতিহ্য ও উৎসব",
    hiddenGemHeader: "লুকানো রত্ন",
    howToReachHeader: "যাতায়াত ও ভ্রমণ নির্দেশিকা",
    offlineNotice: "যাচাইকৃত সাংস্কৃতিক অফলাইন মোডে উত্তর দেওয়া হচ্ছে।",
  },
  ta: {
    greeting: "வணக்கம்! நான் தாரா, உங்கள் பாரதவர்ஸ் கலாச்சார வழிகாட்டி.",
    attireHeader: "பாரம்பரிய உடை",
    foodHeader: "பிரபலமான பாரம்பரிய உணவு",
    craftHeader: "கலை மற்றும் கைவினைப் பொருட்கள்",
    festivalHeader: "பாரம்பரியங்கள் மற்றும் திருவிழாக்கள்",
    hiddenGemHeader: "மறைக்கப்பட்ட பொக்கிஷம்",
    howToReachHeader: "பயண வழிகாட்டுதல்",
    offlineNotice: "நம்பகமான ஆஃப்லைன் கலாச்சார தரவுப் பயன்முறை செயல்படுகிறது.",
  },
  te: {
    greeting: "నమస్కారం! నేను తారను, మీ సాంస్కృతిక వర్చువల్ గైడ్.",
    attireHeader: "సాంప్రదాయ దుస్తులు",
    foodHeader: "ప్రసిద్ధ వంటకాలు",
    craftHeader: "కళలు మరియు చేతిపనులు",
    festivalHeader: "సంప్రదాయాలు మరియు పండుగలు",
    hiddenGemHeader: "అపూర్వ రహస్య ప్రదేశం",
    howToReachHeader: "ప్రయాణ సమాచారం",
    offlineNotice: "ధృవీకరించబడిన ఆఫ్‌లైన్ సాంస్కృతిక సమాచార విధానం సక్రియంగా ఉంది.",
  },
  mr: {
    greeting: "नमस्कार! मी तारा, तुमची सांस्कृतिक आभासी मार्गदर्शक.",
    attireHeader: "पारंपरिक पोशाख",
    foodHeader: "प्रसिद्ध खाद्यसंस्कृती",
    craftHeader: "कला आणि हस्तकला",
    festivalHeader: "परंपरा आणि सण-उत्सव",
    hiddenGemHeader: "अनोखी जागा (हिडन जेम)",
    howToReachHeader: "प्रवास व पोहोचण्याचे मार्गदर्शन",
    offlineNotice: "सत्यापित ऑफलाइन सांस्कृतिक माहिती कार्यरत आहे.",
  },
  gu: {
    greeting: "નમસ્તે! હું તારા છું, તમારી સાંસ્કૃતિક વર્ચ્યુઅલ માર્ગદર્શક.",
    attireHeader: "પરંપરાગત પોશાક",
    foodHeader: "પ્રખ્યાત વાનગીઓ",
    craftHeader: "કલા અને હસ્તકલા",
    festivalHeader: "પરંપરાઓ અને ઉત્સવો",
    hiddenGemHeader: "અનોખું સ્થળ",
    howToReachHeader: "પ્રવાસ માર્ગદર્શન",
    offlineNotice: "ચકાસાયેલ ઑફલાઇન સાંસ્કૃતિક માહિતી સક્રિય છે.",
  },
  kn: {
    greeting: "ನಮಸ್ಕಾರ! ನಾನು ತಾರಾ, ನಿಮ್ಮ ಭಾರತವರ್ಸ್ ಸಾಂಸ್ಕೃತಿಕ ಮಾರ್ಗದರ್ಶಿ.",
    attireHeader: "ಸಾಂಪ್ರದಾಯಿಕ ಉಡುಪು",
    foodHeader: "ಪ್ರಸಿದ್ಧ ಆಹಾರ ಪದ್ಧತಿ",
    craftHeader: "ಕಲೆ ಮತ್ತು ಕರಕುಶಲತೆ",
    festivalHeader: "ಸಂಪ್ರದಾಯಗಳು ಮತ್ತು ಹಬ್ಬಗಳು",
    hiddenGemHeader: "ಅಪರೂಪದ ತಾಣ",
    howToReachHeader: "ಪ್ರವಾಸ ಮಾರ್ಗದರ್ಶನ",
    offlineNotice: "ದೃಢೀಕೃತ ಆಫ್‌ಲೈನ್ ಸಾಂಸ್ಕೃತಿಕ ಮಾಹಿತಿ ಸಕ್ರಿಯವಾಗಿದೆ.",
  },
  ml: {
    greeting: "നമസ്കാരം! ഞാൻ താര, നിങ്ങളുടെ ഭാരതവേർസ് സാംസ്കാരിക സഹായി.",
    attireHeader: "പരമ്പരാഗത വസ്ത്രധാരണം",
    foodHeader: "പ്രസിദ്ധമായ നാടൻ വിഭവങ്ങൾ",
    craftHeader: "കലയും കരകൗശലവും",
    festivalHeader: "ആചാരങ്ങളും ഉത്സവങ്ങളും",
    hiddenGemHeader: "അപൂർവ്വ രത്നം",
    howToReachHeader: "യാത്രാ വിവരങ്ങൾ",
    offlineNotice: "സ്ഥിരീകരിച്ച സാംസ്കാരിക വിവരങ്ങൾ ലഭ്യമാക്കിയിരിക്കുന്നു.",
  },
  pa: {
    greeting: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤਾਰਾ ਹਾਂ, ਤੁਹਾਡੀ ਸੱਭਿਆਚਾਰਕ ਵਰਚੁਅਲ ਗਾਈਡ।",
    attireHeader: "ਰਵਾਇਤੀ ਪਹਿਰਾਵਾ",
    foodHeader: "ਮਸ਼ਹੂਰ ਖਾਣ-ਪੀਣ",
    craftHeader: "ਕਲਾ ਅਤੇ ਦਸਤਕਾਰੀ",
    festivalHeader: "ਰਵਾਇਤਾਂ ਅਤੇ ਤਿਉਹਾਰ",
    hiddenGemHeader: "ਲੁਕਿਆ ਹੋਇਆ ਰਤਨ",
    howToReachHeader: "ਯਾਤਰਾ ਅਤੇ ਰਸਤਾ ਸਲਾਹ",
    offlineNotice: "ਪ੍ਰਮਾਣਿਤ ਆਫ਼ਲਾਈਨ ਸੱਭਿਆਚਾਰਕ ਗਿਆਨ ਮੋਡ ਸਰਗਰਮ ਹੈ।",
  },
};

/**
 * Builds an authentic response for a state in the visitor's selected language,
 * incorporating all 5 cultural categories and travel details.
 */
export function buildMultilingualStateResponse(
  state: StateStory,
  lang: LanguageCode = 'en',
  category?: 'attire' | 'food' | 'craft' | 'festivals' | 'hiddenGem'
): string {
  const t = LOCALIZED_TEMPLATES[lang] || LOCALIZED_TEMPLATES.en;
  const culture = CULTURAL_DATA_BY_STATE[state.id];

  if (category === 'attire' && culture) {
    return [
      `**${t.attireHeader} — ${state.name}**`,
      ``,
      `• **${culture.attire.title}**: ${culture.attire.summary}`,
      ``,
      `*Historical Origin*: ${culture.attire.readMore.originAndHistory}`,
      `*Cultural Significance*: ${culture.attire.readMore.culturalSignificance}`,
      `*Practical Advice*: ${culture.attire.readMore.visitorOrPracticalInfo}`,
    ].join('\n');
  }

  if (category === 'food' && culture) {
    return [
      `**${t.foodHeader} — ${state.name}**`,
      ``,
      `• **${culture.food.title}**: ${culture.food.summary}`,
      `• Signature dishes: ${state.cuisine.join(', ')}`,
      ``,
      `*Culinary Roots*: ${culture.food.readMore.originAndHistory}`,
      `*Cultural Role*: ${culture.food.readMore.culturalSignificance}`,
      `*Best Spots*: ${culture.food.readMore.visitorOrPracticalInfo}`,
    ].join('\n');
  }

  if (category === 'craft' && culture) {
    return [
      `**${t.craftHeader} — ${state.name}**`,
      ``,
      `• **${culture.craft.title}**: ${culture.craft.summary}`,
      `• Traditional artforms: ${state.artForms.join(', ')}`,
      ``,
      `*Craft Heritage*: ${culture.craft.readMore.originAndHistory}`,
      `*Significance*: ${culture.craft.readMore.culturalSignificance}`,
      `*Artisan Centers*: ${culture.craft.readMore.visitorOrPracticalInfo}`,
    ].join('\n');
  }

  if (category === 'festivals' && culture) {
    return [
      `**${t.festivalHeader} — ${state.name}**`,
      ``,
      `• **${culture.festivals.title}**: ${culture.festivals.summary}`,
      ...state.festivals.map((f) => `• **${f.name}** (${f.when}) — ${f.note}`),
      ``,
      `*Origin*: ${culture.festivals.readMore.originAndHistory}`,
      `*Festive Spirit*: ${culture.festivals.readMore.culturalSignificance}`,
      `*Best Season to Visit*: ${state.bestMonths}`,
    ].join('\n');
  }

  if (category === 'hiddenGem' && culture) {
    return [
      `**${t.hiddenGemHeader} — ${state.name}**`,
      ``,
      `• **${culture.hiddenGem.title}** (📍 ${culture.hiddenGem.location || state.name})`,
      `${culture.hiddenGem.summary}`,
      ``,
      `*Why it's special*: ${culture.hiddenGem.readMore.culturalSignificance}`,
      `*How to reach*: ${culture.hiddenGem.howToReach || 'Accessible via capital ' + state.capital}`,
      `*Best time to visit*: ${culture.hiddenGem.bestTimeToVisit || state.bestMonths}`,
    ].join('\n');
  }

  // Complete comprehensive response with all 5 pillars
  const parts = [
    `**${state.name}** (${state.type === 'UT' ? 'Union Territory' : 'State'}) — *${state.tagline}*`,
    ``,
    `• **Capital**: ${state.capital} | **Region**: ${state.region} | **Best Time**: ${state.bestMonths}`,
    `• **${t.attireHeader}**: ${culture ? culture.attire.title : 'Traditional handloom sarees and dhotis'}`,
    `• **${t.foodHeader}**: ${culture ? culture.food.title : state.cuisine.slice(0, 3).join(', ')}`,
    `• **${t.craftHeader}**: ${culture ? culture.craft.title : state.artForms.slice(0, 3).join(', ')}`,
    `• **${t.festivalHeader}**: ${culture ? culture.festivals.title : state.festivals[0]?.name}`,
    `• **${t.hiddenGemHeader}**: ${culture ? culture.hiddenGem.title : state.landmarks[0]?.name}`,
    ``,
    `${state.vibe}`,
    ``,
    `*Local Guide Tip*: ${state.guideTip}`,
  ];

  return parts.join('\n');
}
