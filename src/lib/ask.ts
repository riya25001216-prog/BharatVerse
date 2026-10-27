import { createContext, useContext } from 'react';

export interface GuideControls {
  /** Opens the guide on the Type tab and sends it a question. */
  ask: (question: string) => void;
  /** Opens the guide on the Talk (voice) tab. */
  openVoice: () => void;
  /** Opens the voice guide and asks Tara to look at and explain the current view. */
  explainView: () => void;
}

export const GuideContext = createContext<GuideControls>({
  ask: () => {},
  openVoice: () => {},
  explainView: () => {},
});

export const useGuide = () => useContext(GuideContext);
export const useAsk = () => useContext(GuideContext).ask;
