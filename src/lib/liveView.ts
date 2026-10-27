/**
 * "Live view": what the visitor is looking at right now, shared with the voice guide.
 * Pages describe themselves in words; the 360° viewer can also hand over a snapshot
 * of the exact frame on screen so Tara can see it.
 */
type Listener = () => void;

interface LiveView {
  /** One or two sentences describing the current screen, written for the guide. */
  description: string;
  /** Captures the current frame as a JPEG, when the page has something visual to show. */
  capture?: () => Promise<Blob | null>;
}

let current: LiveView = { description: 'The visitor is on the BharatVerse website.' };
const listeners = new Set<Listener>();

export function setLiveView(next: LiveView) {
  if (next.description === current.description && next.capture === current.capture) return;
  current = next;
  listeners.forEach((l) => l());
}

export function getLiveView(): LiveView {
  return current;
}

export function subscribeLiveView(l: Listener) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}
