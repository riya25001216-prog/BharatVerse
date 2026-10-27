import { motion } from 'framer-motion';

/** Static night-sky wash behind every page: deep indigo with a faint marigold glow. */
export function Aurora() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(90%_60%_at_15%_0%,rgba(37,47,88,0.7),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_45%_at_95%_35%,rgba(242,169,59,0.06),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(70%_50%_at_10%_100%,rgba(31,165,154,0.05),transparent_70%)]" />
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
        <span className="h-px w-8 bg-saffron-400/80" aria-hidden="true" />
        <span className="text-[14px] font-medium text-saffron-300">{kicker}</span>
        {isCenter ? <span className="h-px w-8 bg-saffron-400/80" aria-hidden="true" /> : null}
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, delay: 0.08 }}
        className="mt-5 font-display text-4xl font-light leading-[1.05] tracking-[-0.025em] text-parchment-100 sm:text-5xl md:text-[3.5rem]"
      >
        {title}{' '}
        {highlight ? <span className="text-shine">{highlight}</span> : null}
      </motion.h2>

      {description ? (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.16 }}
          className={`mt-5 max-w-[38rem] text-[16px] leading-relaxed text-parchment-200/65 sm:text-[17px] ${isCenter ? 'mx-auto' : ''}`}
        >
          {description}
        </motion.p>
      ) : null}
    </div>
  );
}
