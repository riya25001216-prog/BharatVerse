import { useEffect, useState } from 'react';
import { Pause, Play, Square, Volume2 } from 'lucide-react';
import { narrator, type NarratorState } from '../lib/narrator';
import { AnimeTara } from './AnimeTara';

export function FloatingAudioPlayer() {
  const [state, setState] = useState<NarratorState>(narrator.getState());

  useEffect(() => {
    return narrator.subscribe(setState);
  }, []);

  if (!state.isPlaying && !state.isPaused) {
    return null;
  }

  return (
    <aside
      aria-label="Floating audio narration player"
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 flex items-center gap-3.5 rounded-full border border-saffron-400/50 bg-ink-950/90 px-4 py-2.5 shadow-[0_10px_35px_rgba(242,169,59,0.3)] backdrop-blur-xl animate-fade-in transition-all"
    >
      <div className="relative shrink-0">
        <AnimeTara size="sm" state={state.isPlaying ? 'speaking' : 'idle'} />
        {state.isPlaying && (
          <span className="absolute -bottom-0.5 -right-0.5 grid h-3.5 w-3.5 place-items-center rounded-full bg-saffron-400 text-ink-950">
            <Volume2 size={9} className="animate-pulse" />
          </span>
        )}
      </div>

      <div className="max-w-[200px] sm:max-w-xs truncate text-xs text-parchment-100">
        <span className="font-semibold text-saffron-300">Tara: </span>
        <span className="italic">{state.currentText || 'Cultural Narration…'}</span>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        {state.isPaused ? (
          <button
            type="button"
            onClick={() => narrator.resume()}
            className="grid h-7 w-7 place-items-center rounded-full bg-saffron-400 text-ink-950 hover:bg-saffron-300 transition-colors"
            aria-label="Resume narration"
          >
            <Play size={12} className="fill-current" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => narrator.pause()}
            className="grid h-7 w-7 place-items-center rounded-full border border-white/20 bg-white/10 text-parchment-100 hover:bg-white/20 transition-colors"
            aria-label="Pause narration"
          >
            <Pause size={12} />
          </button>
        )}

        <button
          type="button"
          onClick={() => narrator.stop()}
          className="grid h-7 w-7 place-items-center rounded-full border border-white/20 bg-white/10 text-parchment-200/80 hover:bg-rose-500/20 hover:text-rose-300 transition-colors"
          aria-label="Stop narration"
        >
          <Square size={10} className="fill-current" />
        </button>
      </div>
    </aside>
  );
}
