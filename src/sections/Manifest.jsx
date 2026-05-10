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
          y: 0, opacity: 1, filter: 'blur(0px)',
          ease: 'expo.out', duration: 1.2,
          scrollTrigger: { trigger: ref.current, start: 'top 78%', toggleActions: 'play none none reverse' },
        },
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="story"
      ref={ref}
      className="relative overflow-hidden bg-cream py-20 sm:py-32 lg:py-44"
    >
      <div className="relative mx-auto max-w-[100rem] px-4 sm:px-8 lg:px-16">
        <div className="mb-10 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.24em] opacity-60 sm:mb-16 sm:text-[11px] sm:tracking-[0.32em]">
          <span>03 / Story</span>
          <span>Since 2009</span>
        </div>

        <blockquote data-quote className="max-w-[1400px]">
          <p className="font-display font-medium uppercase leading-[1.1] tracking-cut text-[clamp(22px,4.6vw,58px)] [overflow-wrap:break-word]">
            Every step is a <span className="text-flame">decision</span>. The shoes
            you tie on in the morning quietly shape how you walk into a room, how
            you carry yourself across the city, how you keep going when nobody is
            watching. Find a pair that matches the person you are{' '}
            <span className="underline decoration-flame decoration-2 underline-offset-[0.2em] sm:underline-offset-[0.28em]">
              becoming
            </span>{' '}
            — and keep walking forward.
          </p>
        </blockquote>

        <footer className="mt-10 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t hairline-strong pt-5 font-mono text-[10px] uppercase tracking-[0.24em] opacity-80 sm:mt-16 sm:gap-x-8 sm:pt-6 sm:text-[11px] sm:tracking-[0.28em]">
          <span>— Eric, Founder</span>
          <span className="opacity-60">Eric Shoes and Business Enterprise · 2009</span>
        </footer>
      </div>
    </section>
  )
}
