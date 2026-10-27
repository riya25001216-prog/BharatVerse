import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../lib/i18n';

function Mark() {
  // A stylised rangoli diamond — the brand mark.
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 1.8 22.2 12 12 22.2 1.8 12Z" stroke="#F2A93B" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M12 6.4 17.6 12 12 17.6 6.4 12Z" stroke="#F3E9D6" strokeOpacity=".7" strokeWidth="1.1" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="2" fill="#F2A93B" />
    </svg>
  );
}

export function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

  const links = [
    { path: '/explore', label: t('atlas') },
    { path: '/destinations', label: t('destinations') },
    { path: '/stories', label: t('stories') },
    { path: '/guide', label: t('guide') },
  ];

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-[background-color,border-color,backdrop-filter] duration-300 ${
        solid
          ? 'border-b border-parchment-200/10 bg-ink-950/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-gradient-to-b from-ink-950/70 to-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 sm:h-[72px] sm:px-8" aria-label="Main">
        <Link to="/" className="flex items-center gap-2.5" aria-label="BharatVerse home">
          <Mark />
          <span className="font-display text-[22px] font-medium tracking-tight text-parchment-100">
            Bharat<span className="font-playfair font-normal text-saffron-400">Verse</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.path}>
              <NavLink
                to={l.path}
                className={({ isActive }) =>
                  `relative block rounded-full px-4 py-2 text-[14px] font-medium transition-colors ${
                    isActive ? 'text-parchment-100' : 'text-parchment-200/65 hover:text-parchment-100'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-4 -bottom-0.5 h-[2px] rounded-full bg-saffron-400"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2.5">
          <LanguageSelector />
          <Link to="/plan" className="btn-primary hidden !px-5 !py-2.5 md:inline-flex">
            Plan a trip
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-parchment-200/20 text-parchment-100 transition-colors hover:bg-white/10 md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-parchment-200/10 md:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 py-4">
              {[{ path: '/', label: 'Home' }, ...links].map((l) => (
                <li key={l.path}>
                  <NavLink
                    to={l.path}
                    end={l.path === '/'}
                    className={({ isActive }) =>
                      `block rounded-2xl px-4 py-3 font-display text-xl transition-colors ${
                        isActive ? 'bg-white/[0.06] text-saffron-300' : 'text-parchment-100 hover:bg-white/[0.04]'
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
              <li className="pt-2">
                <Link to="/plan" className="btn-primary w-full">
                  Plan a trip
                </Link>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
