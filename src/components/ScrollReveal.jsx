import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * ScrollReveal — the core "section pinning + clip-path unfold + parallax displacement"
 * primitive. One instance per immersive section.
 *
 *  Layering, top → bottom (z-index ascending = on top):
 *    1. <bgRef>     full-bleed image, pinned for the section's scroll length, parallax y +12%
 *    2. tone tint   sectional duotone wash (neon for sneakers / earth for executive)
 *    3. <gridRef>   12-column hairline grid overlay (decorative)
 *    4. <fgRef>     headline / body / specs — parallaxes opposite to bg (yPercent -38)
 *
 *  Behavior:
 *    - The section's outer <article> is `height: heightVh`, giving the pin scroll runway.
 *    - The frame inside is pinned via ScrollTrigger for the duration.
 *    - As the section's TOP enters the viewport from BELOW, an `inset()` clip-path
 *      "unfolds" the frame from the bottom up — creating the RawMotion fold reveal.
 *    - `direction="left"` switches the unfold to a horizontal reveal (used on the
 *      executive section to feel cinematic instead of physical).
 *
 *  Children render inside the foreground layer and inherit parallax displacement.
 */
export default function ScrollReveal({
  image,
  imageAlt = '',
  eyebrow,
  headline,           // ReactNode — usually composed of <SplitText/> blocks
  body,
  specs,              // [{ label, value }]
  tint = 'rgba(0,0,0,0)', // section tone overlay
  imageClass = '',
  className = '',
  heightVh = 220,
  index = 0,
  isFirst = false,
  direction = 'up',   // 'up' | 'left' | 'diagonal'
  align = 'left',     // 'left' | 'center' | 'right'
}) {
  const sectionRef = useRef(null)
  const frameRef   = useRef(null)
  const bgRef      = useRef(null)
  const fgRef      = useRef(null)
  const gridRef    = useRef(null)
  const eyebrowRef = useRef(null)

  useLayoutEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // 1. Pin the sticky frame for the duration of this section.
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: frameRef.current,
        pinSpacing: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      })

      // 2. Clip-path "unfold" — the section reveals OVER the previous one.
      //    The first section skips this so it's visible on load.
      if (!isFirst) {
        const initial =
          direction === 'left'
            ? 'inset(0% 0% 0% 100%)'
            : direction === 'diagonal'
              ? 'polygon(100% 0,100% 0,100% 0,100% 0)'
              : 'inset(100% 0% 0% 0%)'
        const final =
          direction === 'diagonal'
            ? 'polygon(0 0,100% 0,100% 100%,0 100%)'
            : 'inset(0% 0% 0% 0%)'

        gsap.fromTo(
          frameRef.current,
          { clipPath: initial, WebkitClipPath: initial },
          {
            clipPath: final,
            WebkitClipPath: final,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'top top',
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        )
      }

      // 3. Parallax displacement — image drifts with scroll, content drifts FASTER
      //    in the opposite direction. This is the "headline detaches from photograph"
      //    feel the brief asks for.
      gsap.fromTo(
        bgRef.current,
        { yPercent: -6, scale: 1.08 },
        {
          yPercent: 12,
          scale: 1.0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        },
      )

      gsap.fromTo(
        fgRef.current,
        { yPercent: 8 },
        {
          yPercent: -38,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        },
      )

      // Subtle counter-parallax on the grid for depth
      gsap.fromTo(
        gridRef.current,
        { yPercent: 0, opacity: 0.35 },
        {
          yPercent: -20,
          opacity: 0.15,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        },
      )

      // 4. Eyebrow ticker — slides in from the side once the section locks
      if (eyebrowRef.current) {
        gsap.fromTo(
          eyebrowRef.current,
          { x: align === 'right' ? 60 : -60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              once: false,
              toggleActions: 'play none none reverse',
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [isFirst, direction, align])

  const alignment =
    align === 'center'
      ? 'items-center text-center'
      : align === 'right'
        ? 'items-end text-right'
        : 'items-start text-left'

  return (
    <article
      ref={sectionRef}
      className={`relative w-full ${className}`}
      style={{ height: `${heightVh}vh` }}
      data-section-index={index}
    >
      <div
        ref={frameRef}
        className="relative h-screen w-full overflow-hidden"
        style={{ willChange: 'clip-path' }}
      >
        {/* image layer */}
        <div ref={bgRef} className="absolute inset-0 will-change-transform">
          <img
            src={image}
            alt={imageAlt}
            loading={isFirst ? 'eager' : 'lazy'}
            className={`absolute inset-0 h-full w-full object-cover ${imageClass}`}
          />
          {/* tone wash */}
          <div
            className="absolute inset-0 mix-blend-multiply"
            style={{ background: tint }}
          />
          {/* readability vignette */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(120% 80% at 50% 60%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.55) 100%)',
            }}
          />
        </div>

        {/* hairline 12-col grid */}
        <div
          ref={gridRef}
          aria-hidden="true"
          className="absolute inset-0 vline pointer-events-none"
        />

        {/* foreground content */}
        <div
          ref={fgRef}
          className={`relative z-10 mx-auto flex h-full max-w-[110rem] flex-col justify-end px-6 pb-24 sm:px-10 lg:px-16 ${alignment} will-change-transform`}
        >
          {eyebrow && (
            <div
              ref={eyebrowRef}
              className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] opacity-90"
            >
              <span className="inline-block h-[1px] w-8 bg-current" />
              <span>{eyebrow}</span>
            </div>
          )}

          {headline && <div className="mb-8 max-w-[1200px]">{headline}</div>}

          {body && (
            <p className="mb-10 max-w-md text-[14px] leading-[1.55] sm:text-[15px] opacity-80">
              {body}
            </p>
          )}

          {specs && specs.length > 0 && (
            <dl
              className={`flex flex-wrap gap-x-10 gap-y-3 font-mono text-[11px] uppercase tracking-[0.18em] ${align === 'right' ? 'justify-end' : ''}`}
            >
              {specs.map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-1">
                  <dt className="opacity-50">{label}</dt>
                  <dd className="opacity-95">{value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </article>
  )
}
