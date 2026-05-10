import { useEffect, useRef, useMemo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Custom SplitText.
 *
 * Wraps each word in an inline-block container with overflow:hidden,
 * and each char in a translated/skewed span. Works without GSAP's paid
 * SplitText plugin and preserves selection / a11y via aria-label.
 *
 * Triggers a glitch-slide reveal when the host enters the viewport.
 */
export default function SplitText({
  text,
  as: Tag = 'span',
  className = '',
  charClassName = '',
  trigger,
  start = 'top 80%',
  delay = 0,
  stagger = 0.022,
  duration = 0.95,
  glitch = true,
  scrub = false,
}) {
  const rootRef = useRef(null)

  const segments = useMemo(() => {
    return text.split(' ').map((word, wi) => ({
      word,
      key: `${wi}-${word}`,
      chars: [...word],
    }))
  }, [text])

  useEffect(() => {
    if (!rootRef.current) return
    const root = rootRef.current
    const chars = root.querySelectorAll('[data-char]')
    if (!chars.length) return

    gsap.set(chars, {
      yPercent: 115,
      rotateZ: 4,
      skewY: 6,
      opacity: 0,
      filter: glitch ? 'blur(6px)' : 'none',
    })

    const tween = () =>
      gsap.to(chars, {
        yPercent: 0,
        rotateZ: 0,
        skewY: 0,
        opacity: 1,
        filter: 'blur(0px)',
        ease: 'expo.out',
        duration,
        stagger: { each: stagger, from: 'start' },
        delay,
        overwrite: 'auto',
        onStart: () => {
          if (!glitch) return
          // Random chars get a brief glitch flash
          const sample = gsap.utils.shuffle([...chars]).slice(0, Math.min(6, chars.length))
          sample.forEach((c) => {
            gsap.fromTo(
              c,
              { textShadow: '0 0 0 transparent' },
              {
                textShadow: '2px 0 0 rgba(216,255,59,.7), -2px 0 0 rgba(255,46,147,.7)',
                duration: 0.08,
                yoyo: true,
                repeat: 3,
                ease: 'steps(1)',
              },
            )
          })
        },
      })

    const triggerEl = trigger?.current ?? root
    let st
    if (scrub) {
      st = ScrollTrigger.create({
        trigger: triggerEl,
        start,
        end: 'bottom 60%',
        scrub: true,
        animation: tween(),
      })
    } else {
      st = ScrollTrigger.create({
        trigger: triggerEl,
        start,
        once: false,
        onEnter: () => tween(),
        onEnterBack: () => tween(),
      })
    }

    return () => st && st.kill()
  }, [text, trigger, start, delay, stagger, duration, glitch, scrub])

  return (
    <Tag ref={rootRef} aria-label={text} className={className}>
      {segments.map(({ word, chars, key }, wi) => (
        <span
          key={key}
          aria-hidden="true"
          className="inline-block whitespace-nowrap overflow-hidden align-baseline"
          style={{ paddingBottom: '0.12em', marginBottom: '-0.12em' }}
        >
          {chars.map((c, ci) => (
            <span
              key={ci}
              data-char
              className={`inline-block will-change-transform ${charClassName}`}
            >
              {c}
            </span>
          ))}
          {wi < segments.length - 1 && (
            <span className="inline-block" style={{ width: '0.28em' }} />
          )}
        </span>
      ))}
    </Tag>
  )
}
