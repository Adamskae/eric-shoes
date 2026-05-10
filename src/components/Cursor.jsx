import { useEffect, useRef } from 'react'

/**
 * Custom cursor — a small dot + ring that lerps to the mouse position.
 * Hidden on touch devices.
 */
export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my
    let raf = 0

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%,-50%)`
      }
    }

    const tick = () => {
      rx += (mx - rx) * 0.14
      ry += (my - ry) * 0.14
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%,-50%)`
      }
      raf = requestAnimationFrame(tick)
    }

    const onEnter = () => {
      ringRef.current?.classList.add('scale-[2.4]', 'opacity-50')
    }
    const onLeave = () => {
      ringRef.current?.classList.remove('scale-[2.4]', 'opacity-50')
    }

    window.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-8 w-8 rounded-full border border-bone/60 mix-blend-difference transition-[transform,opacity] duration-200 ease-out"
        style={{ transform: 'translate3d(-100px,-100px,0)' }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-acid mix-blend-difference"
        style={{ transform: 'translate3d(-100px,-100px,0)' }}
      />
    </>
  )
}
