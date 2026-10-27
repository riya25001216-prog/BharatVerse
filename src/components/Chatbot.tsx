import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AudioLines, Keyboard, SendHorizonal, X } from 'lucide-react';
import { localReply, CHIPS_GENERAL } from '../lib/chatEngine';
import { checkOllama, ollamaChat, OLLAMA_SYSTEM_PROMPT, type OllamaStatus } from '../lib/ollama';
import { renderMarkdown } from '../lib/markdown';
import { STATE_STORIES } from '../data/states';
import type { ChatMessage } from '../data/types';

// The voice SDK is only downloaded when someone opens the Talk tab.
const VoiceAgent = lazy(() => import('./VoiceAgent').then((m) => ({ default: m.VoiceAgent })));

let messageId = 0;
const nextId = () => `m${messageId++}`;

const GREETING: ChatMessage = {
  id: nextId(),
  role: 'bot',
  text: `Namaste, I’m **Tara**, your BharatVerse guide.\n\nAsk me about any state, its food or festivals, or ask me to plan a route. This typed chat works even offline.`,
  chips: ['Tell me about Kerala', 'Best time to visit India', 'Festivals in Assam', 'Plan me a 5-day trip'],
};

const CONTEXT_BRIEF = STATE_STORIES.map(
  (s) =>
    `${s.name} (${s.type}) — capital ${s.capital}; best ${s.bestMonths}; food: ${s.cuisine.join(', ')}; festivals: ${s.festivals
      .map((f) => `${f.name} (${f.when})`)
      .join(', ')}; places: ${s.landmarks.map((l) => l.name).join(', ')}.`
).join('\n');

type Tab = 'talk' | 'type';

function Avatar({ size = 'h-7 w-7 text-[11px]' }: { size?: string }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#FBEBCB,#F2A93B_55%,#C9740E)] font-display font-semibold text-ink-950 ${size}`}
      aria-hidden="true"
    >
      T
    </span>
  );
}

export function Chatbot({
  seed,
  voiceNonce,
  explainNonce,
  open,
  onOpenChange,
}: {
  seed: { text: string; nonce: number } | null;
  voiceNonce: number;
  explainNonce: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [tab, setTab] = useState<Tab>('talk');
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [ollama, setOllama] = useState<OllamaStatus>({ available: false, models: [] });
  const [useLocalLLM, setUseLocalLLM] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    void checkOllama().then(setOllama);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing, tab]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onOpenChange(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onOpenChange]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setInput('');
    setMessages((m) => [...m, { id: nextId(), role: 'user', text: trimmed }]);
    setTyping(true);

    const local = localReply(trimmed, {});
    let answer = local;
    if (useLocalLLM && ollama.available) {
      const history = messages.slice(-6).map((m) => ({
        role: m.role === 'user' ? ('user' as const) : ('assistant' as const),
        content: m.text,
      }));
      const reply = await ollamaChat(
        trimmed,
        history,
        `${OLLAMA_SYSTEM_PROMPT}\n\nReference notes:\n${CONTEXT_BRIEF}`,
        ollama.models[0]
      );
      if (reply) answer = { text: reply, chips: local.chips };
    }

    setTimeout(
      () => {
        setMessages((m) => [
          ...m,
          { id: nextId(), role: 'bot', text: answer.text, chips: answer.chips, stateId: answer.stateId, image: answer.image },
        ]);
        setTyping(false);
      },
      Math.min(700, 180 + trimmed.length * 6)
    );
  };

  // "Ask Tara" buttons around the site send a typed question.
  useEffect(() => {
    if (seed && open) {
      setTab('type');
      void send(seed.text);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed?.nonce]);

  useEffect(() => {
    if (voiceNonce) setTab('talk');
  }, [voiceNonce]);

  useEffect(() => {
    if (open && tab === 'type') setTimeout(() => inputRef.current?.focus(), 250);
  }, [open, tab]);

  const tabBtn = (t: Tab, label: string, Icon: typeof AudioLines) => (
    <button
      type="button"
      role="tab"
      aria-selected={tab === t}
      onClick={() => setTab(t)}
      className={`relative flex flex-1 items-center justify-center gap-2 rounded-full py-2 text-[13px] font-semibold transition-colors ${
        tab === t ? 'text-ink-950' : 'text-parchment-200/70 hover:text-parchment-100'
      }`}
    >
      {tab === t ? (
        <motion.span
          layoutId="guide-tab"
          className="absolute inset-0 rounded-full bg-parchment-100"
          transition={{ type: 'spring', stiffness: 420, damping: 34 }}
        />
      ) : null}
      <span className="relative flex items-center gap-2">
        <Icon size={15} />
        {label}
      </span>
    </button>
  );

  return (
    <>
      {/* launcher */}
      <motion.button
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 18 }}
        onClick={() => onOpenChange(!open)}
        className="fixed bottom-5 right-5 z-[70] flex h-14 items-center gap-3 rounded-full border border-saffron-300/40 bg-ink-900/90 py-2 pl-2 pr-5 shadow-[0_18px_50px_-14px_rgba(242,169,59,0.6)] backdrop-blur-xl transition-colors hover:border-saffron-300/80 sm:bottom-7 sm:right-7"
        aria-label={open ? 'Close the guide' : 'Talk to Tara, the BharatVerse guide'}
        aria-expanded={open}
      >
        <span className="relative">
          <Avatar size="h-10 w-10 text-base" />
          <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-peacock-400 ring-2 ring-ink-900" />
        </span>
        <span className="text-left leading-tight">
          <span className="block text-[14px] font-semibold text-parchment-100">Talk to Tara</span>
          <span className="hidden text-[11.5px] text-parchment-200/60 sm:block">Voice or text guide</span>
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Tara, the BharatVerse guide"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-[5.25rem] right-3 z-[69] flex h-[min(640px,calc(100svh-7rem))] w-[min(410px,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-[28px] border border-parchment-200/15 bg-ink-900/95 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] backdrop-blur-2xl sm:bottom-[6rem] sm:right-7"
          >
            <div className="flex items-center justify-between gap-3 px-4 pb-3 pt-4">
              <div className="flex items-center gap-3">
                <Avatar size="h-10 w-10 text-base" />
                <div>
                  <div className="font-display text-lg leading-tight text-parchment-100">Tara</div>
                  <div className="text-[12px] text-parchment-200/55">
                    {tab === 'talk' ? 'Voice guide by ElevenLabs' : ollama.available ? `Local model: ${ollama.models[0]}` : 'Works offline'}
                  </div>
                </div>
              </div>
              <button
                onClick={() => onOpenChange(false)}
                className="grid h-9 w-9 place-items-center rounded-full text-parchment-200/60 transition-colors hover:bg-white/10 hover:text-parchment-100"
                aria-label="Close guide"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mx-4 mb-1 flex rounded-full border border-parchment-200/15 p-1" role="tablist" aria-label="How to talk to Tara">
              {tabBtn('talk', 'Talk', AudioLines)}
              {tabBtn('type', 'Type', Keyboard)}
            </div>

            {tab === 'talk' ? (
              <Suspense
                fallback={<div className="grid flex-1 place-items-center text-sm text-parchment-200/60">Loading voice…</div>}
              >
                <VoiceAgent active={open && tab === 'talk'} explainNonce={explainNonce} />
              </Suspense>
            ) : (
              <>
                <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
                  {messages.map((m) =>
                    m.role === 'user' ? (
                      <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
                        <div className="max-w-[85%] rounded-2xl rounded-br-md bg-saffron-400 px-3.5 py-2.5 text-[13.5px] leading-relaxed text-ink-950">
                          {m.text}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2.5">
                        <Avatar />
                        <div className="min-w-0 flex-1">
                          {m.image ? (
                            <img
                              src={`/images/${m.image}.jpg`}
                              alt=""
                              loading="lazy"
                              className="mb-2 h-28 w-full max-w-[220px] rounded-xl object-cover"
                            />
                          ) : null}
                          <div className="rounded-2xl rounded-tl-md border border-parchment-200/10 bg-white/[0.04] px-3.5 py-2.5 text-parchment-100">
                            {renderMarkdown(m.text)}
                          </div>
                        </div>
                      </motion.div>
                    )
                  )}

                  {typing && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2.5" aria-label="Tara is typing">
                      <Avatar />
                      <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-md border border-parchment-200/10 bg-white/[0.04] px-4 py-3.5">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            className="h-1.5 w-1.5 rounded-full bg-parchment-200/60"
                            animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
                            transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.15 }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="no-scrollbar flex gap-1.5 overflow-x-auto border-t border-parchment-200/10 px-3 py-2.5">
                  {(messages[messages.length - 1]?.chips ?? CHIPS_GENERAL).map((chip) => (
                    <button
                      key={chip}
                      onClick={() => void send(chip)}
                      className="shrink-0 rounded-full border border-parchment-200/15 px-3 py-1.5 text-[12.5px] text-parchment-200/80 transition-colors hover:border-saffron-300/50 hover:text-parchment-100"
                    >
                      {chip}
                    </button>
                  ))}
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    void send(input);
                  }}
                  className="flex items-center gap-2 border-t border-parchment-200/10 px-3 py-3"
                >
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about any state…"
                    className="flex-1 rounded-full border border-parchment-200/15 bg-white/[0.04] px-4 py-2.5 text-[14px] text-parchment-100 placeholder-parchment-200/40 outline-none transition-colors focus:border-saffron-400/60"
                    aria-label="Message Tara"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim()}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-saffron-400 text-ink-950 transition-colors enabled:hover:bg-saffron-300 disabled:opacity-40"
                    aria-label="Send"
                  >
                    <SendHorizonal size={17} />
                  </button>
                </form>

                {ollama.available ? (
                  <button
                    onClick={() => setUseLocalLLM((v) => !v)}
                    className="flex items-center justify-center gap-2 border-t border-parchment-200/10 px-3 py-2 text-[12px] text-parchment-200/55 transition-colors hover:text-parchment-100"
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${useLocalLLM ? 'bg-peacock-400' : 'bg-parchment-200/30'}`} />
                    {useLocalLLM ? 'Local model answering' : 'Built-in knowledge answering'}
                  </button>
                ) : null}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
