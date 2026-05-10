import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const WORKS = [
  {
    id: 'air-max-1',
    name: 'Air Max 1 ’86 OG',
    brand: 'Nike',
    tag: 'Lifestyle · Visible Air',
    year: '2026',
    accent: '#FF4D2E',
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=82',
  },
  {
    id: 'samba-og',
    name: 'Samba OG',
    brand: 'Adidas',
    tag: 'Court · T-toe Suede',
    year: '2026',
    accent: '#1F4DE6',
    img: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1400&q=82',
  },
  {
    id: 'nb-990',
    name: '990v6',
    brand: 'New Balance',
    tag: 'Heritage · Made in USA',
    year: '2025',
    accent: '#A6D34A',
    img: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=1400&q=82',
  },
]

export default function SelectedWork() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      const cards = ref.current.querySelectorAll('[data-card]')
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1,
            ease: 'expo.out', duration: 1.0,
            scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none reverse' },
          },
        )
        const img = card.querySelector('[data-card-img]')
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -6 },
            {
              yPercent: 8, ease: 'none',
              scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        }
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="work" ref={ref} className="relative overflow-hidden bg-bone py-16 sm:py-24 lg:py-36">
      <div className="relative mx-auto max-w-[110rem] px-4 sm:px-8 lg:px-16">
        {/* section header */}
        <div className="mb-10 flex items-end justify-between gap-4 sm:mb-14 lg:mb-20">
          <div>
            <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.24em] opacity-60 sm:mb-3 sm:text-[11px] sm:tracking-[0.32em]">
              02 / Selected Work
            </div>
            <h2 className="font-display font-bold uppercase leading-[0.96] tracking-cut text-[clamp(28px,6.5vw,80px)] lg:tracking-crush">
              In stock
              <span className="block text-flame">right now.</span>
            </h2>
          </div>
          <div className="shrink-0 self-end font-mono text-[9px] uppercase tracking-[0.22em] opacity-60 sm:text-[11px] sm:tracking-[0.28em]">
            03 silhouettes
          </div>
        </div>

        {/* alternating side-by-side cards */}
        <div className="flex flex-col gap-10 sm:gap-16 lg:gap-24">
          {WORKS.map((w, i) => {
            const reversed = i % 2 === 1
            return (
              <article
                key={w.id}
                data-card
                className={`group flex items-stretch gap-4 sm:gap-6 lg:items-center lg:gap-12 ${
                  reversed ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                {/* image — always inline, even on mobile */}
                <a
                  href="#contact"
                  className="relative block w-[44%] shrink-0 overflow-hidden rounded-sm bg-cream sm:w-[46%] lg:w-[50%]"
                >
                  <div className="relative" style={{ aspectRatio: '5 / 4' }}>
                    <img
                      src={w.img}
                      alt={`${w.brand} ${w.name}`}
                      data-card-img
                      loading="lazy"
                      className="absolute inset-0 h-[114%] w-full object-cover transition-transform duration-700 will-change-transform group-hover:scale-[1.04]"
                    />
                    {/* brand pill */}
                    <div
                      className="absolute left-2 top-2 flex items-center gap-1.5 rounded-full bg-bone/95 px-2 py-1 font-mono text-[8px] font-semibold uppercase tracking-[0.18em] sm:left-3 sm:top-3 sm:gap-2 sm:px-3 sm:py-1.5 sm:text-[10px] lg:left-4 lg:top-4 lg:px-4 lg:py-2 lg:text-[11px]"
                      style={{ color: w.accent }}
                    >
                      <span className="block h-1 w-1 rounded-full sm:h-1.5 sm:w-1.5" style={{ background: w.accent }} />
                      {w.brand}
                    </div>
                  </div>
                </a>

                {/* content */}
                <div className="flex flex-1 flex-col justify-between gap-3 py-1 sm:gap-4 lg:gap-6 lg:py-4">
                  {/* meta header */}
                  <header className="flex items-baseline justify-between gap-2 font-mono text-[9px] uppercase tracking-[0.22em] sm:text-[10px] sm:tracking-[0.28em] lg:text-[11px] lg:tracking-[0.32em]">
                    <span className="font-bold" style={{ color: w.accent }}>0{i + 1} / 03</span>
                    <span className="opacity-55">{w.year}</span>
                  </header>

                  {/* huge product name */}
                  <h3 className="font-display font-extrabold uppercase leading-[0.95] tracking-cut text-[clamp(22px,5.2vw,72px)] [overflow-wrap:break-word] [hyphens:auto] lg:tracking-crush">
                    <a
                      href="#contact"
                      className="block transition-colors duration-500 group-hover:[color:var(--accent)]"
                      style={{ '--accent': w.accent }}
                    >
                      {w.name}
                    </a>
                  </h3>

                  {/* tag — visible on all sizes, just smaller on mobile */}
                  <div
                    className="font-mono text-[9px] uppercase tracking-[0.22em] sm:text-[10px] sm:tracking-[0.28em] lg:text-[11px] lg:tracking-[0.32em]"
                    style={{ color: w.accent }}
                  >
                    {w.tag}
                  </div>

                  {/* brief — desktop only */}
                  <p className="hidden max-w-md text-[14px] leading-[1.5] opacity-75 sm:block sm:text-[14px] lg:text-[15px]">
                    {brief(w.id)}
                  </p>

                  {/* footer with CTA */}
                  <div className="mt-1 flex items-center justify-between gap-2 border-t hairline pt-3 sm:pt-4 lg:pt-5">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] opacity-60 sm:text-[10px] sm:tracking-[0.24em] lg:text-[11px] lg:tracking-[0.28em]">
                      Available
                    </span>
                    <a
                      href="#contact"
                      className="group/cta inline-flex items-center gap-1.5 rounded-full bg-oxide px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-bone transition-colors hover:bg-flame sm:gap-2 sm:px-4 sm:py-2 sm:text-[10px] sm:tracking-[0.24em] lg:px-5 lg:py-2.5 lg:text-[11px] lg:tracking-[0.28em]"
                    >
                      Inquire
                      <span className="transition-transform group-hover/cta:translate-x-0.5">↗</span>
                    </a>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t hairline pt-5 font-mono text-[9px] uppercase tracking-[0.22em] opacity-70 sm:mt-20 sm:pt-6 sm:text-[11px] sm:tracking-[0.32em]">
          <span>Don't see what you want? We source it.</span>
          <a href="#contact" className="hover:text-flame">Request a fit ↗</a>
        </div>
      </div>
    </section>
  )
}

function brief(id) {
  switch (id) {
    case 'air-max-1':
      return 'The original visible-air silhouette. A wardrobe staple in red, blue, beige and bone — sized for adults and kids.'
    case 'samba-og':
      return 'The all-time terrace classic. T-toe gum sole, soft leather upper. Pair with anything denim.'
    case 'nb-990':
      return 'Heritage running, dad-shoe royalty. Pigskin and mesh, ENCAP cushioning. Made in the USA.'
    default:
      return ''
  }
}
