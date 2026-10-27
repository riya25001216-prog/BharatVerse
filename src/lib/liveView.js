let current = { description: 'The visitor is on the BharatVerse website.' };
const listeners = new Set();
export function setLiveView(next) {
    if (next.description === current.description && next.capture === current.capture)
        return;
    current = next;
    listeners.forEach((l) => l());
}
export function getLiveView() {
    return current;
}
export function subscribeLiveView(l) {
    listeners.add(l);
    return () => {
        listeners.delete(l);
    };
}
