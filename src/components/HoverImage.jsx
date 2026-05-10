import { useEffect, useRef } from 'react'

/**
 * HoverImage — a fixed-position image stack that lerps to the cursor.
 * Used by the SelectedWork index to preview the active row.
 *
 * Props:
 *   activeIndex: number — which entry is hovered (-1 = none)
 *   works:       [{ id, img }] — image set
 *   width:       px width of the preview
 */
export default function HoverImage({ activeIndex, works, width = 360 }) {
  const wrapRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(hover: none)').matches) return

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my
    let raf = 0

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
    }

    const tick = () => {
      rx += (mx - rx) * 0.18
      ry += (my - ry) * 0.18
      if (wrapRef.current) {
        wrapRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block"
      style={{ transform: 'translate3d(-9999px,-9999px,0)' }}
    >
      <div
        className="relative -translate-x-1/2 -translate-y-1/2"
        style={{ width, aspectRatio: '4 / 5' }}
      >
        {works.map((w, i) => {
          const visible = activeIndex === i
          return (
            <img
              key={w.id}
              src={w.img}
              alt=""
              loading="lazy"
              className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform,filter] duration-500 ease-out ${
                visible ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-95 blur-[6px]'
              }`}
              style={{ transitionDelay: visible ? '0ms' : '0ms' }}
            />
          )
        })}
      </div>
    </div>
  )
}
