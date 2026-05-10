import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitText from '../components/SplitText'

const HERO_IMG =
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1800&q=85'

// Headline scale: bumped slightly to give the lines presence and let the
// longer line ("Stand out.") cross over the image area on desktop.
const HEAD = 'text-[clamp(40px,13vw,170px)]'

export default function Studio() {
  const ref = useRef(null)
  const imgRef = useRef(null)
  const mobileImgRef = useRef(null)

  useLayoutEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      // Both images parallax — desktop and the in-flow mobile one
      ;[imgRef.current, mobileImgRef.current].forEach((node) => {
        if (!node) return
        gsap.fromTo(
          node,
          { yPercent: -8, scale: 1.05 },
          {
            yPercent: 10, scale: 1, ease: 'none',
            scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
          },
        )
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="studio"
      ref={ref}
      className="relative overflow-hidden pb-16 pt-20 sm:pb-24 sm:pt-28 lg:pt-32"
    >
      <div className="relative mx-auto max-w-[110rem] px-4 sm:px-8 lg:px-16">
        {/* eyebrow */}
        <div className="mb-8 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.24em] opacity-60 sm:mb-12 sm:text-[11px] sm:tracking-[0.32em] lg:mb-16">
          <span className="flex items-center gap-2">
            <span className="block h-1.5 w-1.5 animate-pulse rounded-full bg-flame" />
            01 / Studio
          </span>
          <span>Spring 2026</span>
        </div>

        {/* MOBILE image — only shows below lg */}
        <div className="mb-8 lg:hidden">
          <div
            className="relative overflow-hidden rounded-sm bg-cream"
            style={{ aspectRatio: '4 / 3' }}
          >
            <img
              ref={mobileImgRef}
              src={HERO_IMG}
              alt="Featured sneaker"
              className="absolute inset-0 h-[120%] w-full object-cover will-change-transform"
            />
            <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-bone/95 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.2em]">
              <span className="block h-1.5 w-1.5 rounded-full bg-flame" />
              Air Max 1 ’86 OG
            </div>
          </div>
        </div>

        {/* DESKTOP hero stage — image positioned BEHIND headline on the right */}
        <div className="relative">
          {/* image — desktop only, absolute behind text */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] lg:block xl:w-[60%]"
          >
            <div className="relative h-full overflow-hidden rounded-sm bg-cream">
              <img
                ref={imgRef}
                src={HERO_IMG}
                alt=""
                className="absolute inset-0 h-full w-full object-cover will-change-transform"
              />
              {/* legibility gradient — bone fades into the image on the left edge */}
              <div
                className="absolute inset-y-0 left-0 w-2/3"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(242,234,219,0.94) 0%, rgba(242,234,219,0.55) 36%, rgba(242,234,219,0) 70%)',
                }}
              />
              {/* product caption pill — bottom right of image */}
              <div className="pointer-events-auto absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-bone/95 px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-oxide shadow-sm">
                <span className="block h-1.5 w-1.5 rounded-full bg-flame" />
                Air Max 1 ’86 OG · 2026
              </div>
            </div>
          </div>

          {/* headline — sits on top */}
          <h1 className="relative z-10 font-display font-extrabold uppercase leading-[0.94] tracking-cut text-oxide [overflow-wrap:break-word] lg:tracking-crush">
            <SplitText
              text="Find your"
              className={`block ${HEAD}`}
              glitch={false}
              stagger={0.025}
            />
            <SplitText
              text="fit."
              className={`block ${HEAD}`}
              glitch={false}
              stagger={0.04}
              delay={0.05}
            />
            <SplitText
              text="Walk"
              className={`block ${HEAD} text-stroke`}
              glitch={false}
              stagger={0.04}
              delay={0.1}
            />
            <SplitText
              text="your way."
              className={`block ${HEAD} text-flame`}
              glitch={false}
              stagger={0.025}
              delay={0.15}
            />
          </h1>
        </div>

        {/* sub paragraph */}
        <div className="mt-10 grid grid-cols-12 gap-6 sm:mt-16 lg:mt-20">
          <p className="col-span-12 max-w-2xl text-[14px] leading-[1.6] opacity-80 sm:text-[16px] lg:col-span-7 lg:text-[17px]">
            Eric Shoes and Business Enterprise stocks authentic releases from the
            world's leading sportswear houses — verified, factory-sealed, and
            delivered anywhere in Ghana.
          </p>
        </div>

        {/* baseline */}
        <div className="mt-12 flex flex-wrap items-end justify-between gap-5 border-t hairline pt-6 sm:mt-20 sm:pt-8">
          <a
            href="#work"
            className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] sm:text-[11px] sm:tracking-[0.32em]"
          >
            <span>Selected Work</span>
            <span className="grid h-7 w-7 place-items-center rounded-full bg-oxide text-bone transition-transform group-hover:translate-y-1">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M5 1V9M5 9L1 5M5 9L9 5" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </span>
          </a>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.24em] opacity-60 sm:tracking-[0.28em]">
            <span>Accra · Ghana</span>
            <span className="block h-[1px] w-6 bg-flame" />
            <span>Est. 2009</span>
          </div>
        </div>
      </div>
    </section>
  )
}
