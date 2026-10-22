import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { localReply, CHIPS_GENERAL } from '../lib/chatEngine';
import { checkOllama, ollamaChat, OLLAMA_SYSTEM_PROMPT, type OllamaStatus } from '../lib/ollama';
import { renderMarkdown } from '../lib/markdown';
import { STATE_STORIES } from '../data/states';
import type { ChatMessage } from '../data/types';

let messageId = 0;
const nextId = () => `m${messageId++}`;

const GREETING: ChatMessage = {
  id: nextId(),
  role: 'bot',
  text: `Namaste — I am the **BharatVerse guide**.\n\nI run entirely inside this page, so I work even when the network does not. Ask me about any state, its food, its festivals, or ask me to plan a route.`,
  chips: ['Tell me about Kerala', 'Best time to visit India', 'Festivals in Assam', 'Plan me a 5-day trip'],
};

const CONTEXT_BRIEF = STATE_STORIES.map(
  (s) =>
    `${s.name} (${s.type}) — capital ${s.capital}; best ${s.bestMonths}; food: ${s.cuisine.join(', ')}; festivals: ${s.festivals
      .map((f) => `${f.name} (${f.when})`)
      .join(', ')}; places: ${s.landmarks.map((l) => l.name).join(', ')}.`
).join('\n');

export function Chatbot({
  seed,
  open,
  onOpenChange,
}: {
  seed: { text: string; nonce: number } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [ollama, setOllama] = useState<OllamaStatus>({ available: false, models: [] });
  const [useLocalLLM, setUseLocalLLM] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    checkOllama().then(setOllama);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

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
      if (reply) {
        answer = { text: reply, chips: local.chips };
      }
    }

    setTimeout(
      () => {
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
      },
      Math.min(700, 180 + trimmed.length * 6)
    );
  };

  useEffect(() => {
    if (seed && open) {
      void send(seed.text);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed?.nonce]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250);
  }, [open]);

  return (
    <>
      {/* launcher */}
      <motion.button
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 18 }}
        onClick={() => onOpenChange(!open)}
        className="group fixed bottom-5 right-5 z-[70] flex h-14 items-center gap-2.5 rounded-full bg-[linear-gradient(120deg,#ffc46b,#f98a09)] px-4 shadow-[0_18px_50px_-12px_rgba(249,138,9,0.85)] transition-transform hover:scale-[1.04] sm:bottom-7 sm:right-7"
        aria-label="Open the BharatVerse guide"
      >
        <span className="relative grid h-9 w-9 place-items-center rounded-full bg-ink-950/85">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#ffc46b" strokeWidth="1.9">
            <path
              d="M12 3.2c-4 0-7.2 2.8-7.2 6.4 0 2.2 1.2 3.9 2.7 5.2.5.4.8 1 .8 1.6v.6c0 .5.4.9.9.9h.9c.4 0 .7-.3.8-.6l.3-1.1c.1-.4.5-.7.9-.7h3.8c.4 0 .8.3.9.7l.3 1.1c.1.4.4.6.8.6h.9c.5 0 .9-.4.9-.9v-.6c0-.6.3-1.2.8-1.6 1.5-1.3 2.7-3 2.7-5.2 0-3.6-3.2-6.4-7.2-6.4Z"
              strokeLinejoin="round"
            />
            <circle cx="9" cy="10" r="1" fill="#ffc46b" stroke="none" />
            <circle cx="15" cy="10" r="1" fill="#ffc46b" stroke="none" />
          </svg>
          <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-ink-950" />
        </span>
        <span className="hidden text-[13px] font-semibold text-ink-950 sm:block">Ask the guide</span>
      </motion.button>

      {/* panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="glass fixed bottom-[4.75rem] right-3 z-[69] flex h-[min(600px,calc(100vh-7.5rem))] w-[min(400px,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-[26px] shadow-glass-lg sm:bottom-[5.5rem] sm:right-5"
          >
            {/* header */}
            <div className="relative flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3.5">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[linear-gradient(120deg,#ffc46b,#f98a09)] font-display text-sm font-semibold text-ink-950">
                  भ
                </span>
                <div>
                  <div className="text-[13.5px] font-semibold text-white">BharatVerse Guide</div>
                  <div className="flex items-center gap-1.5 text-[10px] text-white/45">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Runs locally
                    {ollama.available ? (
                      <span className="text-saffron-300/80">· {ollama.models[0] ?? 'local model'}</span>
                    ) : null}
                  </div>
                </div>
              </div>
              <button
                onClick={() => onOpenChange(false)}
                className="grid h-8 w-8 place-items-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Close guide"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* messages */}
            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
              {messages.map((m) =>
                m.role === 'user' ? (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-end"
                  >
                    <div className="max-w-[85%] rounded-2xl rounded-br-md bg-[linear-gradient(120deg,#ffc46b,#f98a09)] px-3.5 py-2.5 text-[13px] leading-relaxed text-ink-950">
                      {m.text}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-2.5"
                  >
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/10 text-[11px] font-semibold text-saffron-300">
                      भ
                    </span>
                    <div className="min-w-0 flex-1">
                      {m.image ? (
                        <img
                          src={`/images/${m.image}.jpg`}
                          alt=""
                          loading="lazy"
                          className="mb-2 h-28 w-full max-w-[220px] rounded-xl object-cover"
                        />
                      ) : null}
                      <div className="rounded-2xl rounded-tl-md border border-white/10 bg-white/[0.04] px-3.5 py-2.5">
                        {renderMarkdown(m.text)}
                      </div>
                    </div>
                  </motion.div>
                )
              )}

              {typing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2.5">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/10 text-[11px] font-semibold text-saffron-300">
                    भ
                  </span>
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-md border border-white/10 bg-white/[0.04] px-4 py-3.5">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-white/50"
                        animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
                        transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* chips */}
            <div className="no-scrollbar flex gap-1.5 overflow-x-auto border-t border-white/8 px-3 py-2.5">
              {(messages[messages.length - 1]?.chips ?? CHIPS_GENERAL).map((chip) => (
                <button
                  key={chip}
                  onClick={() => void send(chip)}
                  className="chip shrink-0 border border-white/12 bg-white/[0.04] text-white/70 transition-colors hover:border-saffron-300/40 hover:text-white"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void send(input);
              }}
              className="flex items-center gap-2 border-t border-white/10 px-3 py-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about any state…"
                className="flex-1 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-[13px] text-white placeholder-white/30 outline-none transition-colors focus:border-saffron-300/45"
                aria-label="Message the guide"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[linear-gradient(120deg,#ffc46b,#f98a09)] text-ink-950 transition-transform disabled:opacity-40 enabled:hover:scale-105"
                aria-label="Send"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 12 20 4l-6 16-2.5-6.5L4 12Z" strokeLinejoin="round" />
                </svg>
              </button>
            </form>

            {ollama.available ? (
              <button
                onClick={() => setUseLocalLLM((v) => !v)}
                className="flex items-center justify-center gap-2 border-t border-white/8 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-white/40 transition-colors hover:text-white/70"
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${useLocalLLM ? 'bg-emerald-400' : 'bg-white/25'}`}
                />
                {useLocalLLM ? 'Local model answering' : 'Built-in knowledge base answering'}
              </button>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
