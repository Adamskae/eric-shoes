import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Wires Lenis to GSAP's ticker so ScrollTrigger sees the
 * Lenis-driven scroll position. Returns the Lenis instance for
 * any imperative needs (lenis.scrollTo, etc).
 */
export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      smoothTouch: false,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.085,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const tickerCb = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tickerCb)
    gsap.ticker.lagSmoothing(0)

    document.documentElement.classList.add('lenis', 'lenis-smooth')

    // Refresh ScrollTrigger after fonts load to avoid measurement drift
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh())
    }
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('resize', refresh)

    return () => {
      window.removeEventListener('resize', refresh)
      gsap.ticker.remove(tickerCb)
      lenis.destroy()
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
    }
  }, [])
}
