import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitText from '../components/SplitText'

const PHONE_DISPLAY = '+233 30 274 1100'
const PHONE_DIAL = '+233302741100'
const WHATSAPP = `https://wa.me/${PHONE_DIAL.replace('+', '')}`
const EMAIL = 'info@ericshoes.gh'

export default function Contact() {
  const ref = useRef(null)
  const phoneRef = useRef(null)
  const formRef = useRef(null)
  const [submitted, setSubmitted] = useState(false)

  useLayoutEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        phoneRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1,
          ease: 'expo.out', duration: 1.0,
          scrollTrigger: { trigger: phoneRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
        },
      )
      gsap.fromTo(
        formRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1,
          ease: 'expo.out', duration: 1.0, delay: 0.1,
          scrollTrigger: { trigger: formRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
        },
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={ref} className="relative isolate overflow-hidden bg-oxide text-bone">
      <div className="relative mx-auto max-w-[100rem] px-5 pb-12 pt-24 sm:px-10 sm:pb-16 sm:pt-32 lg:px-16">
        {/* eyebrow */}
        <div className="mb-12 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.28em] opacity-70 sm:mb-20 sm:text-[11px] sm:tracking-[0.32em]">
          <span className="flex items-center gap-2">
            <span className="block h-1.5 w-1.5 animate-pulse rounded-full bg-flame" />
            04 / Contact
          </span>
          <span>Open · Mon – Sat</span>
        </div>

        {/* headline */}
        <h2 className="mb-12 font-display font-extrabold uppercase leading-[0.92] tracking-crush sm:mb-20">
          <SplitText text="Let's" className="block text-[20vw] sm:text-[14vw] lg:text-[10vw]" glitch={false} stagger={0.03} />
          <SplitText text="talk." className="block text-[20vw] sm:text-[14vw] lg:text-[10vw] text-flame" glitch={false} stagger={0.04} delay={0.08} />
        </h2>

        {/* primary phone CTA — the hero of the section */}
        <div ref={phoneRef} className="mb-16 sm:mb-24">
          <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.32em] opacity-50 sm:mb-4 sm:text-[11px]">
            Call us
          </div>
          <a
            href={`tel:${PHONE_DIAL}`}
            className="group inline-flex flex-wrap items-baseline gap-x-4 gap-y-2 font-display font-extrabold uppercase tracking-crush text-flame transition-colors hover:text-bone"
          >
            <span className="text-[12vw] leading-none sm:text-[7.5vw] lg:text-[5.4vw]">
              {PHONE_DISPLAY}
            </span>
            <span className="text-[6vw] leading-none opacity-70 transition-transform group-hover:translate-x-2 group-hover:-translate-y-1 sm:text-[3vw] lg:text-[2vw]">
              ↗
            </span>
          </a>
          <div className="mt-3 max-w-md font-mono text-[11px] uppercase tracking-[0.24em] opacity-65 sm:mt-4">
            Same-day reply during business hours · Mon – Sat · 09:00 – 19:00 GMT
          </div>
        </div>

        {/* split: contact channels + form */}
        <div className="grid grid-cols-12 gap-x-8 gap-y-12 lg:gap-x-16">
          {/* Channels — clean stacked */}
          <div className="col-span-12 lg:col-span-5">
            <div className="mb-6 font-mono text-[10px] uppercase tracking-[0.32em] opacity-50 sm:text-[11px]">
              Other ways to reach us
            </div>

            <div className="space-y-px overflow-hidden rounded-md border border-bone/12">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between bg-white/[0.02] px-5 py-5 transition-colors hover:bg-white/[0.06]"
              >
                <div className="flex items-center gap-4">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-lime/15">
                    <span className="block h-2 w-2 rounded-full bg-lime" />
                  </span>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.28em] opacity-55">
                      WhatsApp
                    </div>
                    <div className="font-display text-[16px] font-semibold tracking-cut sm:text-[18px]">
                      Message us anytime
                    </div>
                  </div>
                </div>
                <span className="text-[16px] opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
              </a>

              <a
                href={`mailto:${EMAIL}`}
                className="group flex items-center justify-between bg-white/[0.02] px-5 py-5 transition-colors hover:bg-white/[0.06]"
              >
                <div className="flex items-center gap-4">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-cobalt/15">
                    <span className="block h-2 w-2 rounded-full bg-cobalt" />
                  </span>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.28em] opacity-55">
                      Email
                    </div>
                    <div className="font-display text-[16px] font-semibold tracking-cut sm:text-[18px]">
                      {EMAIL}
                    </div>
                  </div>
                </div>
                <span className="text-[16px] opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
              </a>

              <div className="flex items-center justify-between bg-white/[0.02] px-5 py-5">
                <div className="flex items-center gap-4">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-ember/15">
                    <span className="block h-2 w-2 rounded-full bg-ember" />
                  </span>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.28em] opacity-55">
                      Studio
                    </div>
                    <div className="font-display text-[16px] font-semibold tracking-cut sm:text-[18px]">
                      Accra · Ghana
                    </div>
                  </div>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] opacity-50">
                  By appointment
                </span>
              </div>
            </div>
          </div>

          {/* Form — simple 3 fields */}
          <form
            ref={formRef}
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}
            className="col-span-12 lg:col-span-7"
          >
            <div
              className="rounded-md border border-bone/12 p-6 sm:p-9"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)',
              }}
            >
              <div className="mb-8 font-mono text-[10px] uppercase tracking-[0.32em] opacity-60">
                Send us a message
              </div>

              {!submitted ? (
                <div className="grid grid-cols-2 gap-x-6 gap-y-7 sm:gap-x-8">
                  <Field label="Name" name="name" placeholder="Yaw Mensah" />
                  <Field label="Phone" name="phone" type="tel" placeholder="+233 …" />
                  <FieldArea label="Message" name="note" placeholder="Tell us what you're looking for." />

                  <div className="col-span-2 mt-2 flex items-center justify-end border-t border-bone/15 pt-6">
                    <button
                      type="submit"
                      className="group inline-flex items-center gap-3 rounded-full bg-flame px-6 py-3 font-display text-[13px] font-bold uppercase tracking-cut text-bone transition-colors hover:bg-bone hover:text-flame"
                    >
                      Send message
                      <span className="transition-transform group-hover:translate-x-1">↗</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex min-h-[240px] flex-col items-start justify-center gap-3">
                  <div className="font-mono text-[11px] uppercase tracking-[0.32em] text-flame">
                    Message received
                  </div>
                  <h3 className="font-display text-[32px] font-bold uppercase leading-none tracking-crush sm:text-[44px]">
                    Talk soon.
                  </h3>
                  <p className="max-w-md text-[14px] opacity-80">
                    For anything urgent, call{' '}
                    <a href={`tel:${PHONE_DIAL}`} className="text-flame underline decoration-flame underline-offset-4">
                      {PHONE_DISPLAY}
                    </a>.
                  </p>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* baseline */}
        <div className="mt-20 flex flex-wrap items-center justify-between gap-3 border-t border-bone/15 pt-8 font-mono text-[10px] uppercase tracking-[0.28em] opacity-60 sm:mt-28 sm:text-[11px] sm:tracking-[0.32em]">
          <span>© 2026 Eric Shoes and Business Enterprise</span>
          <span>Accra · Ghana</span>
          <a href={`tel:${PHONE_DIAL}`} className="hover:text-flame">{PHONE_DISPLAY}</a>
        </div>
      </div>
    </section>
  )
}

function Field({ label, name, type = 'text', placeholder, span = 'col-span-2 sm:col-span-1' }) {
  return (
    <label className={`block ${span}`}>
      <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.28em] opacity-60">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="w-full border-b border-bone/30 bg-transparent pb-3 font-display text-[17px] tracking-cut text-bone placeholder:text-bone/30 focus:border-flame focus:outline-none"
      />
    </label>
  )
}

function FieldArea({ label, name, placeholder }) {
  return (
    <label className="col-span-2 block">
      <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.28em] opacity-60">
        {label}
      </span>
      <textarea
        name={name}
        rows={2}
        maxLength={240}
        placeholder={placeholder}
        className="w-full resize-none border-b border-bone/30 bg-transparent pb-3 font-body text-[15px] leading-[1.55] text-bone placeholder:text-bone/30 focus:border-flame focus:outline-none"
      />
    </label>
  )
}
