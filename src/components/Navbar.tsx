import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const LINKS = [
  { path: '/explore', label: 'Explore' },
  { path: '/stories', label: 'Stories' },
  { path: '/guide', label: 'AI Guide' },
  { path: '/destinations', label: 'Destinations' },
  { path: '/plan', label: 'Plan a Trip' },
];

export function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const close = () => setOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between p-4 sm:p-5">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4">
        <Link
          to="/"
          onClick={close}
          className="group flex items-center gap-3 text-left"
          aria-label="BharatVerse home"
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            className="text-white"
            aria-hidden="true"
          >
            <path d="M12 2 L22 12 L12 22 L2 12 Z" strokeLinejoin="round" />
            <path d="M12 6 L18 12 L12 18 L6 12 Z" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none" />
          </svg>
          <span className="font-playfair text-2xl italic text-white">BharatVerse</span>
        </Link>

        <div className="absolute left-1/2 hidden -translate-x-1/2 md:flex">
          <div className="flex items-center gap-1 rounded-full border border-white/30 bg-white/20 px-2 py-2 backdrop-blur-md">
            {LINKS.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                className={`relative rounded-full px-4 py-2 text-[13px] font-medium transition-colors ${
                  isActive(l.path)
                    ? 'text-white bg-white/10'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/plan"
            className="sheen hidden rounded-full bg-white px-5 py-2.5 text-[13px] font-semibold text-ink-950 transition-transform hover:scale-[1.03] md:inline-flex"
          >
            Plan a Trip
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open ? (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="glass absolute top-full left-4 right-4 z-[99] rounded-3xl p-4 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {[
              { path: '/', label: 'Home' },
              ...LINKS,
            ].map((l) => (
              <Link
                key={l.path}
                to={l.path}
                onClick={close}
                className={`rounded-2xl px-4 py-3 text-[14px] font-medium transition-colors ${
                  isActive(l.path) ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </motion.div>
      ) : null}
    </nav>
  );
}
