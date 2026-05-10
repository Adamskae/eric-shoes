import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HoverImage from '../components/HoverImage'

const WORKS = [
  {
    id: 'air-max-1',
    name: 'Air Max 1 ’86 OG',
    brand: 'Nike',
    tag: 'Lifestyle · Visible Air',
    year: '2026',
    accent: '#FF4D2E',
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1100&q=80',
  },
  {
    id: 'samba-og',
    name: 'Samba OG',
    brand: 'Adidas',
    tag: 'Court · T-toe Suede',
    year: '2026',
    accent: '#1F4DE6',
    img: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1100&q=80',
  },
  {
    id: 'nb-990',
    name: '990v6',
    brand: 'New Balance',
    tag: 'Heritage · Made in USA',
    year: '2025',
    accent: '#A6D34A',
    img: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=1100&q=80',
  },
]

export default function SelectedWork() {
  const ref = useRef(null)
  const [active, setActive] = useState(-1)

  useLayoutEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      const rows = ref.current.querySelectorAll('[data-row]')
      rows.forEach((row) => {
        gsap.fromTo(
          row,
          { yPercent: 24, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            ease: 'expo.out',
            duration: 1.0,
            scrollTrigger: {
              trigger: row,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          },
        )
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const accent = active >= 0 ? WORKS[active].accent : null

  return (
    <section id="work" ref={ref} className="relative bg-bone py-24 sm:py-32 lg:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-[background] duration-700"
        style={{
          background: accent
            ? `radial-gradient(45% 45% at 70% 40%, ${accent}26, transparent 70%)`
            : 'transparent',
        }}
      />

      <div className="relative mx-auto max-w-[110rem] px-5 sm:px-10 lg:px-16">
        <div className="mb-14 grid grid-cols-12 items-end gap-6 sm:mb-20">
          <div className="col-span-12 lg:col-span-8">
            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.32em] opacity-60 sm:text-[11px]">
              02 / Selected Work
            </div>
            <h2 className="font-display text-[10vw] font-bold uppercase leading-[0.95] tracking-crush sm:text-[5.4vw] lg:text-[4.4vw]">
              In stock
              <span className="block">
                <span className="text-flame">right now.</span>
              </span>
            </h2>
          </div>
          <div className="col-span-12 self-end font-mono text-[10px] uppercase tracking-[0.28em] opacity-60 sm:text-[11px] lg:col-span-4 lg:text-right">
            Index · 03 silhouettes
          </div>
        </div>

        <ul className="border-t hairline-strong" onMouseLeave={() => setActive(-1)}>
          {WORKS.map((w, i) => (
            <li key={w.id} data-row className="border-b hairline">
              <a
                href="#contact"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(-1)}
                className={`group grid grid-cols-12 items-baseline gap-x-3 gap-y-2 py-6 transition-opacity duration-300 sm:gap-x-4 sm:py-8 lg:py-10 ${
                  active !== -1 && active !== i ? 'opacity-30' : 'opacity-100'
                }`}
              >
                <span className="col-span-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.32em] opacity-70 sm:col-span-1 sm:text-[11px]">
                  <span className="block h-2 w-2 rounded-full transition-transform group-hover:scale-150" style={{ background: w.accent }} />
                  0{i + 1}
                </span>

                <span className="col-span-10 hidden font-mono text-[10px] uppercase tracking-[0.28em] sm:col-span-2 sm:block" style={{ color: w.accent }}>
                  {w.brand}
                </span>

                <h3 className="col-span-10 font-display text-[9vw] font-extrabold uppercase leading-[0.95] tracking-crush sm:col-span-5 sm:text-[5.2vw] lg:col-span-4 lg:text-[4.2vw]">
                  <span
                    className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-2 sm:group-hover:translate-x-3"
                    style={active === i ? { color: w.accent } : undefined}
                  >
                    {w.name}
                  </span>
                </h3>

                <span className="col-span-7 font-mono text-[10px] uppercase tracking-[0.24em] opacity-70 sm:hidden" style={{ color: w.accent }}>
                  {w.brand} · {w.year}
                </span>
                <span className="col-span-3 text-right text-[16px] sm:hidden">↗</span>

                <span className="col-span-3 hidden font-mono text-[11px] uppercase tracking-[0.28em] opacity-70 sm:block lg:col-span-3">
                  {w.tag}
                </span>
                <span className="col-span-1 hidden font-mono text-[11px] uppercase tracking-[0.28em] opacity-70 sm:block">
                  {w.year}
                </span>
                <span className="hidden text-right text-[18px] sm:col-span-1 sm:block">
                  <span className="inline-block transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.28em] opacity-70 sm:text-[11px] sm:tracking-[0.32em]">
          <span>Don't see what you want? We source it.</span>
          <a href="#contact" className="hover:text-flame">Request a fit ↗</a>
        </div>
      </div>

      <HoverImage activeIndex={active} works={WORKS} />
    </section>
  )
}
