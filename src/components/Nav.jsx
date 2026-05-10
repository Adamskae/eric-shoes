import { useEffect, useState } from 'react'

const links = [
  ['Studio', '#studio'],
  ['Work', '#work'],
  ['Story', '#story'],
  ['Contact', '#contact'],
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled ? 'backdrop-blur-md bg-bone/85 border-b hairline' : ''
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[110rem] items-center justify-between px-5 sm:px-10 lg:px-16">
          <a href="#studio" className="flex items-center gap-2.5 text-oxide">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-flame text-bone font-display text-[12px] font-extrabold">
              E
            </span>
            <span className="leading-tight">
              <span className="block font-display text-[13px] font-extrabold uppercase tracking-crush sm:text-[14px]">
                Eric Shoes
              </span>
              <span className="block font-mono text-[8px] uppercase tracking-[0.28em] opacity-55 sm:text-[9px]">
                and Business Enterprise
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 font-mono text-[11px] uppercase tracking-[0.28em] md:flex">
            {links.map(([label, href]) => (
              <a key={href} href={href} className="opacity-70 transition-opacity hover:opacity-100">
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="tel:+233302741100"
              className="hidden items-center gap-2 rounded-full bg-oxide px-4 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-bone transition-colors hover:bg-flame md:inline-flex"
            >
              <span className="hidden lg:inline">+233 30 274 1100</span>
              <span className="lg:hidden">Call</span>
              <span aria-hidden>↗</span>
            </a>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full border hairline-strong md:hidden"
            >
              <span className="relative block h-3 w-4">
                <span className={`absolute left-0 top-0 h-[1.5px] w-full bg-oxide transition-transform ${open ? 'translate-y-[5px] rotate-45' : ''}`} />
                <span className={`absolute left-0 top-[5px] h-[1.5px] w-full bg-oxide transition-opacity ${open ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`absolute left-0 top-[10px] h-[1.5px] w-full bg-oxide transition-transform ${open ? '-translate-y-[5px] -rotate-45' : ''}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 bg-bone transition-[opacity,transform] duration-500 md:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="flex h-full flex-col px-6 pb-10 pt-24">
          <div className="mb-8 font-mono text-[10px] uppercase tracking-[0.32em] opacity-50">
            Menu · 04 entries
          </div>
          <nav className="flex flex-1 flex-col">
            {links.map(([label, href], i) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="group flex items-baseline justify-between border-b hairline py-6 font-display text-[14vw] font-extrabold uppercase leading-none tracking-crush"
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-mono text-[12px] tracking-[0.28em] opacity-50">0{i + 1}</span>
                  <span className="transition-transform duration-500 group-hover:translate-x-2 group-hover:text-flame">
                    {label}
                  </span>
                </span>
                <span className="text-[20px] opacity-50">↗</span>
              </a>
            ))}
          </nav>

          <div className="mt-8 grid grid-cols-2 gap-6 border-t hairline pt-6 font-mono text-[11px] uppercase tracking-[0.2em]">
            <div>
              <div className="mb-1 opacity-50">Phone</div>
              <a href="tel:+233302741100" className="text-oxide">+233 30 274 1100</a>
            </div>
            <div>
              <div className="mb-1 opacity-50">Studio</div>
              <div>Accra · Ghana</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
