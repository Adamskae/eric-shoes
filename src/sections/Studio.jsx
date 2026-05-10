import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitText from '../components/SplitText'

const HERO_IMG =
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1600&q=85'

export default function Studio() {
  const ref = useRef(null)
  const imgRef = useRef(null)

  useLayoutEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { yPercent: -8, scale: 1.05 },
        {
          yPercent: 10,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="studio"
      ref={ref}
      className="relative overflow-hidden pb-16 pt-24 sm:pb-24 sm:pt-32"
    >
      <div className="relative mx-auto max-w-[110rem] px-5 sm:px-10 lg:px-16">
        {/* eyebrow row */}
        <div className="mb-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] opacity-60 sm:mb-16 sm:text-[11px] sm:tracking-[0.32em]">
          <span className="flex items-center gap-2">
            <span className="block h-1.5 w-1.5 animate-pulse rounded-full bg-flame" />
            01 / Studio
          </span>
          <span>Spring 2026</span>
        </div>

        <div className="grid grid-cols-12 gap-6 lg:gap-10">
          <div className="col-span-12 lg:col-span-8">
            <h1 className="font-display font-extrabold uppercase leading-[0.92] tracking-crush text-oxide">
              <SplitText text="The fits" className="block text-[18vw] sm:text-[12vw] lg:text-[8.6vw]" glitch={false} stagger={0.025} />
              <SplitText text="everyone's" className="block text-[18vw] sm:text-[12vw] lg:text-[8.6vw]" glitch={false} stagger={0.025} delay={0.05} />
              <SplitText text="talking" className="block text-[18vw] sm:text-[12vw] lg:text-[8.6vw] text-stroke" glitch={false} stagger={0.025} delay={0.1} />
              <SplitText text="about." className="block text-[18vw] sm:text-[12vw] lg:text-[8.6vw] text-flame" glitch={false} stagger={0.03} delay={0.15} />
            </h1>
          </div>

          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <div
              className="relative overflow-hidden rounded-sm bg-cream"
              style={{ aspectRatio: '4 / 5' }}
            >
              <img
                ref={imgRef}
                src={HERO_IMG}
                alt="Featured sneaker"
                className="absolute inset-0 h-[120%] w-full object-cover will-change-transform"
              />
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-bone/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em]">
                <span className="block h-1.5 w-1.5 rounded-full bg-flame" />
                In stock
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between border-t hairline pt-3 font-mono text-[11px] uppercase tracking-[0.24em] opacity-80">
              <span className="font-semibold">Air Max 1 ’86 OG</span>
              <span className="opacity-70">Featured · 2026</span>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-12 gap-6 sm:mt-16">
          <p className="col-span-12 max-w-2xl text-[15px] leading-[1.6] opacity-80 sm:text-[17px] lg:col-span-8">
            Eric Shoes and Business Enterprise stocks authentic releases from the
            world's leading sportswear houses — verified, factory-sealed, and
            delivered anywhere in Ghana.
          </p>
        </div>

        <div className="mt-16 flex flex-wrap items-end justify-between gap-6 border-t hairline pt-6 sm:mt-24 sm:pt-8">
          <a href="#work" className="group flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em]">
            <span>Selected Work</span>
            <span className="grid h-7 w-7 place-items-center rounded-full bg-oxide text-bone transition-transform group-hover:translate-y-1">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M5 1V9M5 9L1 5M5 9L9 5" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </span>
          </a>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.28em] opacity-60">
            <span>Accra · Ghana</span>
            <span className="block h-[1px] w-6 bg-flame" />
            <span>Est. 2009</span>
          </div>
        </div>
      </div>
    </section>
  )
}
