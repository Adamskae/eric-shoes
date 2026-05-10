import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Manifest() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current.querySelector('[data-quote]'),
        { y: 40, opacity: 0, filter: 'blur(8px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          ease: 'expo.out',
          duration: 1.2,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        },
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="story"
      ref={ref}
      className="relative bg-cream py-24 sm:py-36 lg:py-48"
    >
      <div className="relative mx-auto max-w-[100rem] px-5 sm:px-10 lg:px-16">
        <div className="mb-14 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.28em] opacity-60 sm:mb-20 sm:text-[11px] sm:tracking-[0.32em]">
          <span>03 / Story</span>
          <span>Since 2009</span>
        </div>

        <blockquote data-quote className="max-w-5xl">
          <p className="font-display text-[7.5vw] font-medium uppercase leading-[1.08] tracking-cut sm:text-[4.6vw] lg:text-[3.6vw]">
            Every step is a <span className="text-flame">decision</span>. The shoes
            you tie on in the morning quietly shape how you walk into a room, how
            you carry yourself across the city, how you keep going when nobody is
            watching. Find a pair that matches the person you are{' '}
            <span className="underline decoration-flame decoration-2 underline-offset-[0.28em]">
              becoming
            </span>{' '}
            — and keep walking forward.
          </p>
        </blockquote>

        <footer className="mt-12 flex flex-wrap items-baseline gap-x-8 gap-y-2 border-t hairline-strong pt-6 font-mono text-[11px] uppercase tracking-[0.28em] opacity-80 sm:mt-16">
          <span>— Eric, Founder</span>
          <span className="opacity-60">Eric Shoes and Business Enterprise · 2009</span>
        </footer>
      </div>
    </section>
  )
}
