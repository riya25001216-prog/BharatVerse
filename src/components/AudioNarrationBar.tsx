import { useEffect, useState } from 'react';
import { Play, Pause, Square, Volume2, AlertCircle } from 'lucide-react';
import { narrator, type NarratorState } from '../lib/narrator';
import { AnimeTara } from './AnimeTara';
import { useLanguage } from '../lib/i18n';

interface AudioNarrationBarProps {
  textToNarrate: string;
  title?: string;
  className?: string;
}

export function AudioNarrationBar({ textToNarrate, title, className = '' }: AudioNarrationBarProps) {
  const { language, t } = useLanguage();
  const [narrState, setNarrState] = useState<NarratorState>(narrator.getState());

  useEffect(() => {
    return narrator.subscribe(setNarrState);
  }, []);

  const handlePlay = () => {
    narrator.play(textToNarrate, language);
  };

  const handlePause = () => {
    narrator.pause();
  };

  const handleResume = () => {
    narrator.resume();
  };

  const handleStop = () => {
    narrator.stop();
  };

  const isNarratingCurrentText = narrState.isPlaying || narrState.isPaused;

  return (
    <div
      className={`glass rounded-2xl border border-parchment-200/15 p-4 transition-all duration-300 ${
        isNarratingCurrentText ? 'ring-1 ring-saffron-400/50 shadow-[0_8px_30px_rgba(242,169,59,0.15)]' : ''
      } ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <AnimeTara
            size="sm"
            state={narrState.isPlaying ? 'speaking' : narrState.isPaused ? 'idle' : 'idle'}
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-semibold text-parchment-100">
                {title ? `${title} · ` : ''}{t('guideNarration')}
              </span>
              {narrState.isPlaying && (
                <span className="inline-flex items-center gap-1 rounded-full bg-saffron-400/20 px-2 py-0.5 text-[11px] font-medium text-saffron-300">
                  <Volume2 size={12} className="animate-pulse" />
                  {t('speaking')}
                </span>
              )}
              {narrState.isPaused && (
                <span className="rounded-full bg-parchment-200/10 px-2 py-0.5 text-[11px] text-parchment-200/60">
                  {t('paused')}
                </span>
              )}
            </div>
            <p className="text-[11.5px] text-parchment-200/55">
              {t('audioListenPrompt')}
            </p>
          </div>
        </div>

        {/* Audio Controls: Play, Pause, Resume, Stop */}
        <div className="flex items-center gap-2">
          {!narrState.isPlaying && !narrState.isPaused ? (
            <button
              type="button"
              onClick={handlePlay}
              className="inline-flex items-center gap-2 rounded-full bg-saffron-400 hover:bg-saffron-300 px-4 py-2 text-[12.5px] font-semibold text-ink-950 transition-colors shadow-md"
              aria-label={t('playAudio')}
            >
              <Play size={14} className="fill-current" />
              <span>{t('playAudio')}</span>
            </button>
          ) : (
            <>
              {narrState.isPaused ? (
                <button
                  type="button"
                  onClick={handleResume}
                  className="inline-flex items-center gap-1.5 rounded-full bg-saffron-400 hover:bg-saffron-300 px-3.5 py-1.5 text-[12px] font-semibold text-ink-950 transition-colors"
                  aria-label={t('resumeAudio')}
                >
                  <Play size={13} className="fill-current" />
                  <span>{t('resumeAudio')}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePause}
                  className="inline-flex items-center gap-1.5 rounded-full border border-parchment-200/20 bg-ink-950/60 hover:bg-white/10 px-3.5 py-1.5 text-[12px] font-medium text-parchment-100 transition-colors"
                  aria-label={t('pauseAudio')}
                >
                  <Pause size={13} />
                  <span>{t('pauseAudio')}</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleStop}
                className="inline-flex items-center gap-1.5 rounded-full border border-parchment-200/20 bg-ink-950/60 hover:bg-rose-500/20 hover:border-rose-400/40 px-3 py-1.5 text-[12px] text-parchment-200/70 hover:text-rose-300 transition-colors"
                aria-label={t('stopAudio')}
              >
                <Square size={12} className="fill-current" />
                <span>{t('stopAudio')}</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Narration sentence highlighting when active */}
      {isNarratingCurrentText && narrState.currentText && (
        <div className="mt-3 rounded-xl border border-saffron-400/30 bg-ink-950/60 p-3 backdrop-blur-md">
          <p className="text-[13px] leading-relaxed text-parchment-100 font-sans">
            <span className="rounded bg-saffron-400/30 px-1.5 py-0.5 text-saffron-200 font-medium shadow-sm">
              "{narrState.currentText}"
            </span>
          </p>
          <div className="mt-2 flex items-center justify-between text-[11px] text-parchment-200/45">
            <span>
              Sentence {narrState.currentSentenceIndex + 1} of {narrState.totalSentences}
            </span>
            <span>Tara narrating</span>
          </div>
        </div>
      )}

      {/* Error / Fallback display */}
      {narrState.error && (
        <div className="mt-2 flex items-center gap-2 text-[12px] text-amber-300/80">
          <AlertCircle size={14} className="shrink-0" />
          <span>{narrState.error}</span>
        </div>
      )}
    </div>
  );
}
