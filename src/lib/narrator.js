import { SUPPORTED_LANGUAGES } from './i18n';
class CulturalNarrator {
    synth = null;
    currentUtterance = null;
    listeners = new Set();
    sentences = [];
    currentSentenceIdx = 0;
    currentLang = 'en';
    keepAliveInterval = null;
    state = {
        isPlaying: false,
        isPaused: false,
        currentSentenceIndex: -1,
        totalSentences: 0,
        currentText: '',
        error: null,
    };
    constructor() {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            this.synth = window.speechSynthesis;
            // Pre-warm voices
            try {
                this.synth.getVoices();
                this.synth.onvoiceschanged = () => {
                    this.synth?.getVoices();
                };
            }
            catch {
                // Ignore voice pre-warming errors
            }
        }
    }
    unlockAudio() {
        if (this.synth) {
            try {
                this.synth.resume();
            }
            catch {
                // Ignore audio resume errors
            }
        }
    }
    subscribe(listener) {
        this.listeners.add(listener);
        listener(this.state);
        return () => this.listeners.delete(listener);
    }
    notify() {
        this.listeners.forEach((l) => l(this.state));
    }
    isAvailable() {
        return !!this.synth;
    }
    play(text, lang = 'en') {
        if (!this.synth) {
            this.state = {
                ...this.state,
                isPlaying: false,
                error: 'Text-to-speech is not supported on this browser.',
            };
            this.notify();
            return;
        }
        this.stop();
        const cleanText = text.replace(/[*#_~`]/g, '').trim();
        if (!cleanText)
            return;
        // Split text into meaningful sentences for narration and highlighting
        this.sentences = cleanText
            .split(/(?<=[.?!।\n])\s+/)
            .map((s) => s.trim())
            .filter((s) => s.length > 0);
        if (this.sentences.length === 0) {
            this.sentences = [cleanText];
        }
        this.currentSentenceIdx = 0;
        this.currentLang = lang;
        this.state = {
            isPlaying: true,
            isPaused: false,
            currentSentenceIndex: 0,
            totalSentences: this.sentences.length,
            currentText: this.sentences[0] || '',
            error: null,
        };
        this.notify();
        // Chrome keep-alive timer to prevent speech cutoff
        this.clearKeepAlive();
        this.keepAliveInterval = setInterval(() => {
            if (this.synth?.speaking && !this.state.isPaused) {
                this.synth.pause();
                this.synth.resume();
            }
        }, 9000);
        this.speakSentence(0);
    }
    speakSentence(idx) {
        if (!this.synth || idx >= this.sentences.length) {
            this.stop();
            return;
        }
        this.currentSentenceIdx = idx;
        const sentence = this.sentences[idx];
        const utterance = new SpeechSynthesisUtterance(sentence);
        this.currentUtterance = utterance;
        const langInfo = SUPPORTED_LANGUAGES.find((l) => l.code === this.currentLang);
        const speechCode = langInfo?.speechLang || 'en-IN';
        utterance.lang = speechCode;
        // Attempt to select an authentic Indian voice if available
        const voices = this.synth.getVoices();
        let matchingVoice = voices.find((v) => v.lang === speechCode);
        if (!matchingVoice) {
            matchingVoice = voices.find((v) => v.lang.startsWith(this.currentLang));
        }
        if (!matchingVoice && this.currentLang === 'en') {
            matchingVoice = voices.find((v) => v.lang.includes('IN') || v.name.includes('India'));
        }
        if (!matchingVoice && voices.length > 0) {
            // Default to first available natural voice
            matchingVoice = voices.find((v) => v.default) || voices[0];
        }
        if (matchingVoice) {
            utterance.voice = matchingVoice;
        }
        utterance.rate = 0.95;
        utterance.pitch = 1.05;
        utterance.onend = () => {
            if (this.state.isPlaying && !this.state.isPaused) {
                if (this.currentSentenceIdx + 1 < this.sentences.length) {
                    this.state = {
                        ...this.state,
                        currentSentenceIndex: this.currentSentenceIdx + 1,
                        currentText: this.sentences[this.currentSentenceIdx + 1] || '',
                    };
                    this.notify();
                    this.speakSentence(this.currentSentenceIdx + 1);
                }
                else {
                    this.stop();
                }
            }
        };
        utterance.onerror = (e) => {
            if (e.error === 'interrupted' || e.error === 'canceled')
                return;
            this.state = {
                ...this.state,
                isPlaying: false,
                error: `Audio playback warning: ${e.error || 'voice unavailable'}`,
            };
            this.notify();
        };
        try {
            this.synth.cancel();
            this.synth.resume();
            this.synth.speak(utterance);
        }
        catch {
            // Ignore speak invocation errors
        }
    }
    pause() {
        if (this.synth && this.state.isPlaying && !this.state.isPaused) {
            this.synth.pause();
            this.state = { ...this.state, isPaused: true };
            this.notify();
        }
    }
    resume() {
        if (this.synth && this.state.isPlaying && this.state.isPaused) {
            this.synth.resume();
            this.state = { ...this.state, isPaused: false };
            this.notify();
        }
    }
    clearKeepAlive() {
        if (this.keepAliveInterval) {
            clearInterval(this.keepAliveInterval);
            this.keepAliveInterval = null;
        }
    }
    stop() {
        this.clearKeepAlive();
        if (this.synth) {
            try {
                this.synth.cancel();
            }
            catch {
                // Ignore cancel errors
            }
        }
        this.currentUtterance = null;
        this.state = {
            isPlaying: false,
            isPaused: false,
            currentSentenceIndex: -1,
            totalSentences: 0,
            currentText: '',
            error: null,
        };
        this.notify();
    }
    getState() {
        return this.state;
    }
    getCurrentUtterance() {
        return this.currentUtterance;
    }
}
export const narrator = new CulturalNarrator();
/** Web Speech Recognition helper for 10 Indian languages */
export function createSpeechRecognizer(lang, onResult, onError, onEnd) {
    const SpeechRecognition = window.SpeechRecognition ||
        window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        return null;
    }
    try {
        const recognition = new SpeechRecognition();
        const langInfo = SUPPORTED_LANGUAGES.find((l) => l.code === lang);
        recognition.lang = langInfo?.speechLang || 'en-IN';
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            if (transcript)
                onResult(transcript);
        };
        recognition.onerror = (event) => {
            onError(event.error || 'Speech recognition failed');
        };
        recognition.onend = () => {
            onEnd();
        };
        return recognition;
    }
    catch {
        return null;
    }
}
