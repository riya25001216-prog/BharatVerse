import { motion } from 'framer-motion';

/** Slow-drifting aurora field that sits behind every section. */
export function Aurora() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute -left-[18%] -top-[22%] h-[62vmax] w-[62vmax] animate-aurora-a rounded-full bg-[radial-gradient(circle_at_center,rgba(249,138,9,0.26),transparent_62%)] blur-[90px]" />
      <div className="absolute -right-[14%] top-[6%] h-[54vmax] w-[54vmax] animate-aurora-b rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.3),transparent_62%)] blur-[100px]" />
      <div className="absolute bottom-[-24%] left-[24%] h-[58vmax] w-[58vmax] animate-aurora-c rounded-full bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.22),transparent_62%)] blur-[110px]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,5,12,0.35)_0%,rgba(4,5,12,0.7)_45%,rgba(4,5,12,0.92)_100%)]" />
      <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_50%_0%,#000_20%,transparent_78%)]" />
    </div>
  );
}

/** Section heading with the small kicker, rule and display title. */
export function SectionHeading({
  kicker,
  title,
  highlight,
  description,
  align = 'center',
}: {
  kicker: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: 'center' | 'left';
}) {
  const isCenter = align === 'center';
  return (
    <div className={isCenter ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'}>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6 }}
        className={`flex items-center gap-3 ${isCenter ? 'justify-center' : ''}`}
      >
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-saffron-400/70" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.34em] text-saffron-300/90">
          {kicker}
        </span>
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-saffron-400/70" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, delay: 0.08 }}
        className="mt-5 font-display text-4xl font-light leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl"
      >
        {title}{' '}
        {highlight ? <span className="text-shine italic">{highlight}</span> : null}
      </motion.h2>

      {description ? (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.16 }}
          className={`mt-5 text-[15px] leading-relaxed text-white/55 sm:text-base ${isCenter ? 'mx-auto max-w-2xl' : ''}`}
        >
          {description}
        </motion.p>
      ) : null}
    </div>
  );
}
