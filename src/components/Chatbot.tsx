import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SendHorizonal, X, Mic, MicOff, Volume2, Sparkles } from 'lucide-react';
import { localReply, CHIPS_GENERAL } from '../lib/chatEngine';
import { checkOllama, ollamaChat, OLLAMA_SYSTEM_PROMPT, type OllamaStatus } from '../lib/ollama';
import { renderMarkdown } from '../lib/markdown';
import { STATE_STORIES } from '../data/states';
import type { ChatMessage } from '../data/types';
import { AnimeTara, type TaraState } from './AnimeTara';
import { LanguageSelector } from './LanguageSelector';
import { SafeImage } from './SafeImage';
import { imagePath } from '../lib/assets';
import { useLanguage } from '../lib/i18n';
import { narrator, createSpeechRecognizer, type NarratorState } from '../lib/narrator';

let messageId = 0;
const nextId = () => `m${messageId++}`;

const CONTEXT_BRIEF = STATE_STORIES.map(
  (s) =>
    `${s.name} (${s.type}) — capital ${s.capital}; best ${s.bestMonths}; food: ${s.cuisine.join(', ')}; festivals: ${s.festivals
      .map((f) => `${f.name} (${f.when})`)
      .join(', ')}; places: ${s.landmarks.map((l) => l.name).join(', ')}.`
).join('\n');

export function Chatbot({
  seed,
  voiceNonce,
  explainNonce: _explainNonce,
  open,
  onOpenChange,
}: {
  seed: { text: string; nonce: number } | null;
  voiceNonce: number;
  explainNonce: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { language, t } = useLanguage();

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: nextId(),
      role: 'bot',
      text: `Namaste! I am **Tara**, your cultural virtual guide across India.\n\nAsk me about any state, traditional attire, famous food, art & craft, festivals, or hidden gems. You can type or use the voice microphone in your preferred language!`,
      chips: ['Tell me about Kerala', 'Best food in Punjab', 'Festivals in Assam', 'Plan a 5-day cultural trip'],
    },
  ]);

  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [taraState, setTaraState] = useState<TaraState>('idle');
  const [isListening, setIsListening] = useState(false);
  const [narrState, setNarrState] = useState<NarratorState>(narrator.getState());
  const [ollama, setOllama] = useState<OllamaStatus>({ available: false, models: [] });
  const [useLocalLLM, setUseLocalLLM] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognizerRef = useRef<any>(null);

  useEffect(() => {
    void checkOllama().then(setOllama);
  }, []);

  // Sync narrator status with Tara's speaking visual state
  useEffect(() => {
    return narrator.subscribe((st) => {
      setNarrState(st);
      if (st.isPlaying) {
        setTaraState('speaking');
      } else if (!isListening && !typing) {
        setTaraState('idle');
      }
    });
  }, [isListening, typing]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (!open) {
      if (recognizerRef.current) {
        recognizerRef.current.stop();
        setIsListening(false);
      }
      return;
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onOpenChange(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onOpenChange]);

  const speakText = (text: string) => {
    narrator.play(text, language);
  };

  const stopSpeaking = () => {
    narrator.stop();
  };

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setInput('');
    setMessages((m) => [...m, { id: nextId(), role: 'user', text: trimmed }]);
    setTyping(true);
    setTaraState('thinking');

    const local = localReply(trimmed, {}, language);
    let answer = local;

    if (useLocalLLM && ollama.available) {
      try {
        const history = messages.slice(-6).map((m) => ({
          role: m.role === 'user' ? ('user' as const) : ('assistant' as const),
          content: m.text,
        }));
        const reply = await ollamaChat(
          trimmed,
          history,
          `${OLLAMA_SYSTEM_PROMPT}\nSelected Language: ${language}\nReference notes:\n${CONTEXT_BRIEF}`,
          ollama.models[0]
        );
        if (reply) answer = { text: reply, chips: local.chips };
      } catch {
        // Fall back gracefully to curated local knowledge
        answer = local;
      }
    }

    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: nextId(),
          role: 'bot',
          text: answer.text,
          chips: answer.chips,
          stateId: answer.stateId,
          image: answer.image,
        },
      ]);
      setTyping(false);
      setTaraState('speaking');
      // Speak the answer aloud
      speakText(answer.text);
    }, Math.min(600, 150 + trimmed.length * 5));
  };

  // Voice Recognition toggle
  const toggleSpeechRecognition = () => {
    if (isListening) {
      if (recognizerRef.current) recognizerRef.current.stop();
      setIsListening(false);
      setTaraState('idle');
      return;
    }

    const recognizer = createSpeechRecognizer(
      language,
      (transcript) => {
        setInput(transcript);
        setIsListening(false);
        setTaraState('idle');
        void send(transcript);
      },
      (err) => {
        console.warn('Speech recognition warning:', err);
        setIsListening(false);
        setTaraState('error');
        setTimeout(() => setTaraState('idle'), 2500);
      },
      () => {
        setIsListening(false);
        setTaraState((prev) => (prev === 'listening' ? 'idle' : prev));
      }
    );

    if (!recognizer) {
      alert('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    recognizerRef.current = recognizer;
    try {
      recognizer.start();
      setIsListening(true);
      setTaraState('listening');
    } catch {
      setIsListening(false);
      setTaraState('idle');
    }
  };

  // "Ask Tara" external links or voiceNonce trigger
  useEffect(() => {
    if (seed && open) {
      void send(seed.text);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed?.nonce]);

  useEffect(() => {
    if (voiceNonce && open) {
      toggleSpeechRecognition();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voiceNonce]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250);
  }, [open]);

  return (
    <>
      {/* Floating Launcher Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 18 }}
        onClick={() => onOpenChange(!open)}
        className="fixed bottom-5 right-5 z-[70] flex h-14 items-center gap-3 rounded-full border border-saffron-300/40 bg-ink-900/90 py-1.5 pl-2 pr-5 shadow-[0_18px_50px_-14px_rgba(242,169,59,0.6)] backdrop-blur-xl transition-all hover:border-saffron-300/80 hover:scale-105 sm:bottom-7 sm:right-7"
        aria-label={open ? 'Close Tara virtual guide' : 'Talk to Tara, your cultural guide'}
        aria-expanded={open}
      >
        <span className="relative">
          <AnimeTara size="sm" state={narrState.isPlaying ? 'speaking' : isListening ? 'listening' : 'idle'} />
          <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-ink-900" />
        </span>
        <span className="text-left leading-tight">
          <span className="block text-[14px] font-semibold text-parchment-100 flex items-center gap-1.5">
            Guide Tara
            {narrState.isPlaying && <Sparkles size={12} className="text-saffron-400 animate-spin" />}
          </span>
          <span className="hidden text-[11px] text-parchment-200/60 sm:block">
            {isListening ? 'Listening…' : narrState.isPlaying ? 'Speaking…' : 'Voice & Multilingual'}
          </span>
        </span>
      </motion.button>

      {/* Main Chatbot Modal Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Tara, your BharatVerse cultural guide"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-[5.25rem] right-3 z-[69] flex h-[min(650px,calc(100svh-7rem))] w-[min(420px,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-[28px] border border-parchment-200/20 bg-ink-900/95 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] backdrop-blur-2xl sm:bottom-[6rem] sm:right-7"
          >
            {/* Header: Anime Tara Profile + Language Selector + Close */}
            <div className="flex items-center justify-between gap-2 border-b border-white/10 px-4 py-3 bg-white/[0.02]">
              <div className="flex items-center gap-2.5">
                <AnimeTara size="sm" state={taraState} />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-display text-base leading-tight text-parchment-100 font-medium">Tara</span>
                    <span className="rounded-full bg-saffron-400/20 px-1.5 py-0.2 text-[10px] font-semibold text-saffron-300">
                      AI Guide
                    </span>
                  </div>
                  <div className="text-[11px] text-parchment-200/55 flex items-center gap-1">
                    <span className={`h-1.5 w-1.5 rounded-full ${ollama.available ? 'bg-emerald-400' : 'bg-saffron-400'}`} />
                    {ollama.available ? `Ollama: ${ollama.models[0]}` : 'Offline Cultural Engine'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <LanguageSelector compact />
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="grid h-8 w-8 place-items-center rounded-full text-parchment-200/60 transition-colors hover:bg-white/10 hover:text-parchment-100"
                  aria-label="Close guide"
                >
                  <X size={17} />
                </button>
              </div>
            </div>

            {/* Speaking / Audio Banner if active */}
            {narrState.isPlaying && (
              <div className="flex items-center justify-between gap-2 bg-saffron-400/10 px-4 py-2 border-b border-saffron-400/20 text-xs text-saffron-300">
                <span className="flex items-center gap-1.5 truncate">
                  <Volume2 size={13} className="animate-pulse shrink-0" />
                  <span className="truncate">"{narrState.currentText}"</span>
                </span>
                <button
                  type="button"
                  onClick={stopSpeaking}
                  className="shrink-0 rounded-full bg-saffron-400/20 px-2 py-0.5 text-[10px] font-bold text-saffron-200 hover:bg-saffron-400/40"
                >
                  Stop
                </button>
              </div>
            )}

            {/* Conversation Messages */}
            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
              {messages.map((m) =>
                m.role === 'user' ? (
                  <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
                    <div className="max-w-[85%] rounded-2xl rounded-br-md bg-saffron-400 px-3.5 py-2.5 text-[13.5px] leading-relaxed text-ink-950 shadow-sm font-sans">
                      {m.text}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2.5">
                    <AnimeTara size="sm" state={narrState.isPlaying ? 'speaking' : 'idle'} />
                    <div className="min-w-0 flex-1">
                      {m.image && (
                        <div className="mb-2 h-28 w-full max-w-[220px] overflow-hidden rounded-xl border border-white/10">
                          <SafeImage
                            src={imagePath(m.image)}
                            alt=""
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                      <div className="rounded-2xl rounded-tl-md border border-parchment-200/10 bg-white/[0.04] p-3 text-xs leading-relaxed text-parchment-100">
                        {renderMarkdown(m.text)}
                      </div>

                      {/* Listen to Answer button */}
                      <div className="mt-1.5 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => speakText(m.text)}
                          className="inline-flex items-center gap-1 text-[11px] text-parchment-200/50 hover:text-saffron-300 transition-colors"
                        >
                          <Volume2 size={12} />
                          <span>{t('listenGuide')}</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )
              )}

              {typing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2.5" aria-label="Tara is typing">
                  <AnimeTara size="sm" state="thinking" />
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-md border border-parchment-200/10 bg-white/[0.04] px-4 py-3.5">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-saffron-400"
                        animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
                        transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Quick Suggestion Chips */}
            <div className="no-scrollbar flex gap-1.5 overflow-x-auto border-t border-parchment-200/10 px-3 py-2 bg-white/[0.01]">
              {(messages[messages.length - 1]?.chips ?? CHIPS_GENERAL).map((chip) => (
                <button
                  key={chip}
                  onClick={() => void send(chip)}
                  className="shrink-0 rounded-full border border-parchment-200/15 px-3 py-1 text-[11.5px] text-parchment-200/75 transition-colors hover:border-saffron-300/50 hover:text-parchment-100"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input Bar: Text Field + Speech Recognition Mic + Send Button */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void send(input);
              }}
              className="flex items-center gap-2 border-t border-parchment-200/10 p-3 bg-ink-950/40"
            >
              <button
                type="button"
                onClick={toggleSpeechRecognition}
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all ${
                  isListening
                    ? 'border-red-400 bg-red-500 text-white animate-pulse shadow-md'
                    : 'border-parchment-200/20 bg-white/[0.04] text-parchment-200/70 hover:border-saffron-400 hover:text-saffron-300'
                }`}
                aria-label={isListening ? 'Stop listening' : 'Start voice input in selected language'}
              >
                {isListening ? <MicOff size={16} /> : <Mic size={16} />}
              </button>

              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isListening ? 'Listening… Speak now' : t('askPlaceholder')}
                className="flex-1 rounded-full border border-parchment-200/15 bg-white/[0.04] px-4 py-2 text-xs text-parchment-100 placeholder-parchment-200/40 outline-none transition-colors focus:border-saffron-400/60"
                aria-label="Message Tara"
              />

              <button
                type="submit"
                disabled={!input.trim()}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-saffron-400 text-ink-950 transition-colors enabled:hover:bg-saffron-300 disabled:opacity-40"
                aria-label="Send"
              >
                <SendHorizonal size={15} />
              </button>
            </form>

            {/* Offline vs Local LLM Indicator */}
            {ollama.available && (
              <button
                type="button"
                onClick={() => setUseLocalLLM((v) => !v)}
                className="flex items-center justify-center gap-2 border-t border-parchment-200/10 px-3 py-1.5 text-[11px] text-parchment-200/50 hover:text-parchment-100 transition-colors"
              >
                <span className={`h-1.5 w-1.5 rounded-full ${useLocalLLM ? 'bg-emerald-400' : 'bg-parchment-200/30'}`} />
                {useLocalLLM ? `Using local model (${ollama.models[0]})` : 'Using verified cultural knowledge'}
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
