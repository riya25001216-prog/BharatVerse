import { createContext, useContext } from 'react';
export const GuideContext = createContext({
    ask: () => { },
    openVoice: () => { },
    explainView: () => { },
});
export const useGuide = () => useContext(GuideContext);
export const useAsk = () => useContext(GuideContext).ask;
