import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitText from '../components/SplitText'

const PHONE_DISPLAY = '+233 30 274 1100'
const PHONE_DIAL = '+233302741100'
const WHATSAPP = `https://wa.me/${PHONE_DIAL.replace('+', '')}`
const EMAIL = 'info@ericshoes.gh'

const HEAD = 'text-[clamp(48px,14vw,168px)]'
const PHONE_SIZE = 'text-[clamp(26px,7.4vw,84px)]'

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
          y: 0, opacity: 1, ease: 'expo.out', duration: 1.0,
          scrollTrigger: { trigger: phoneRef.current, start: 'top 88%', toggleActions: 'play none none reverse' },
        },
      )
      gsap.fromTo(
        formRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1, ease: 'expo.out', duration: 1.0, delay: 0.1,
          scrollTrigger: { trigger: formRef.current, start: 'top 88%', toggleActions: 'play none none reverse' },
        },
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={ref} className="relative isolate overflow-hidden bg-oxide text-bone">
      <div className="relative mx-auto max-w-[100rem] px-4 pb-10 pt-20 sm:px-8 sm:pb-14 sm:pt-28 lg:px-16 lg:pt-32">
        <div className="mb-10 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.24em] opacity-70 sm:mb-16 sm:text-[11px] sm:tracking-[0.32em]">
          <span className="flex items-center gap-2">
            <span className="block h-1.5 w-1.5 animate-pulse rounded-full bg-flame" />
            04 / Contact
          </span>
          <span>Open · Mon – Sat</span>
        </div>

        <h2 className="mb-10 font-display font-extrabold uppercase leading-[0.92] tracking-cut sm:mb-16 lg:tracking-crush">
          <SplitText text="Let's" className={`block ${HEAD}`} glitch={false} stagger={0.03} />
          <SplitText text="talk." className={`block ${HEAD} text-flame`} glitch={false} stagger={0.04} delay={0.08} />
        </h2>

        {/* primary phone CTA */}
        <div ref={phoneRef} className="mb-14 sm:mb-20">
          <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] opacity-50 sm:mb-4 sm:text-[11px] sm:tracking-[0.32em]">
            Call us
          </div>
          <a
            href={`tel:${PHONE_DIAL}`}
            className="group inline-flex flex-wrap items-baseline gap-x-3 gap-y-1 font-display font-extrabold uppercase tracking-cut text-flame transition-colors hover:text-bone lg:gap-x-4 lg:tracking-crush"
          >
            <span className={`${PHONE_SIZE} leading-[0.95] [overflow-wrap:break-word]`}>
              {PHONE_DISPLAY}
            </span>
            <span className="text-[clamp(18px,4vw,38px)] leading-none opacity-70 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5">
              ↗
            </span>
          </a>
          <div className="mt-3 max-w-md font-mono text-[10px] uppercase tracking-[0.22em] opacity-65 sm:mt-4 sm:text-[11px] sm:tracking-[0.24em]">
            Same-day reply during business hours · Mon – Sat · 09:00 – 19:00 GMT
          </div>
        </div>

        {/* split: channels + form */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-10 sm:gap-x-8 lg:gap-x-16">
          <div className="col-span-12 lg:col-span-5">
            <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.28em] opacity-50 sm:text-[11px] sm:tracking-[0.32em]">
              Other ways to reach us
            </div>

            <div className="space-y-px overflow-hidden rounded-md border border-bone/12">
              <ChannelRow
                href={WHATSAPP}
                external
                accent="bg-lime"
                tint="bg-lime/15"
                label="WhatsApp"
                value="Message us anytime"
              />
              <ChannelRow
                href={`mailto:${EMAIL}`}
                accent="bg-cobalt"
                tint="bg-cobalt/15"
                label="Email"
                value={EMAIL}
              />
              <div className="flex items-center justify-between gap-3 bg-white/[0.02] px-4 py-4 sm:px-5 sm:py-5">
                <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ember/15 sm:h-9 sm:w-9">
                    <span className="block h-2 w-2 rounded-full bg-ember" />
                  </span>
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] uppercase tracking-[0.24em] opacity-55 sm:tracking-[0.28em]">Studio</div>
                    <div className="truncate font-display text-[15px] font-semibold tracking-cut sm:text-[18px]">
                      Accra · Ghana
                    </div>
                  </div>
                </div>
                <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.2em] opacity-50 sm:text-[10px] sm:tracking-[0.22em]">
                  By appointment
                </span>
              </div>
            </div>
          </div>

          {/* form */}
          <form
            ref={formRef}
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}
            className="col-span-12 lg:col-span-7"
          >
            <div
              className="rounded-md border border-bone/12 p-5 sm:p-8"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)',
              }}
            >
              <div className="mb-7 font-mono text-[10px] uppercase tracking-[0.28em] opacity-60 sm:text-[11px] sm:tracking-[0.32em]">
                Send us a message
              </div>

              {!submitted ? (
                <div className="grid grid-cols-2 gap-x-5 gap-y-6 sm:gap-x-8 sm:gap-y-7">
                  <Field label="Name" name="name" placeholder="Yaw Mensah" />
                  <Field label="Phone" name="phone" type="tel" placeholder="+233 …" />
                  <FieldArea label="Message" name="note" placeholder="Tell us what you're looking for." />

                  <div className="col-span-2 mt-1 flex flex-col-reverse items-stretch gap-3 border-t border-bone/15 pt-5 sm:flex-row sm:items-center sm:justify-end sm:pt-6">
                    <button
                      type="submit"
                      className="group inline-flex items-center justify-center gap-3 rounded-full bg-flame px-5 py-3 font-display text-[12px] font-bold uppercase tracking-cut text-bone transition-colors hover:bg-bone hover:text-flame sm:px-6 sm:text-[13px]"
                    >
                      Send message
                      <span className="transition-transform group-hover:translate-x-1">↗</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex min-h-[220px] flex-col items-start justify-center gap-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-flame sm:text-[11px] sm:tracking-[0.32em]">
                    Message received
                  </div>
                  <h3 className="font-display font-bold uppercase leading-none tracking-cut text-[clamp(28px,7vw,52px)] lg:tracking-crush">
                    Talk soon.
                  </h3>
                  <p className="max-w-md text-[13px] opacity-80 sm:text-[14px]">
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
        <div className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-bone/15 pt-6 font-mono text-[10px] uppercase tracking-[0.24em] opacity-65 sm:mt-24 sm:pt-8 sm:text-[11px] sm:tracking-[0.32em]">
          <span>© 2026 Eric Shoes and Business Enterprise</span>
          <span>Accra · Ghana</span>
          <a href={`tel:${PHONE_DIAL}`} className="hover:text-flame">{PHONE_DISPLAY}</a>
        </div>
      </div>
    </section>
  )
}

function ChannelRow({ href, external, accent, tint, label, value }) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="group flex items-center justify-between gap-3 bg-white/[0.02] px-4 py-4 transition-colors hover:bg-white/[0.06] sm:px-5 sm:py-5"
    >
      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${tint} sm:h-9 sm:w-9`}>
          <span className={`block h-2 w-2 rounded-full ${accent}`} />
        </span>
        <div className="min-w-0">
          <div className="font-mono text-[10px] uppercase tracking-[0.24em] opacity-55 sm:tracking-[0.28em]">
            {label}
          </div>
          <div className="truncate font-display text-[15px] font-semibold tracking-cut sm:text-[18px]">
            {value}
          </div>
        </div>
      </div>
      <span className="shrink-0 text-[15px] opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
    </a>
  )
}

function Field({ label, name, type = 'text', placeholder, span = 'col-span-2 sm:col-span-1' }) {
  return (
    <label className={`block ${span}`}>
      <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.24em] opacity-60 sm:tracking-[0.28em]">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="w-full border-b border-bone/30 bg-transparent pb-3 font-display text-[16px] tracking-cut text-bone placeholder:text-bone/30 focus:border-flame focus:outline-none sm:text-[17px]"
      />
    </label>
  )
}

function FieldArea({ label, name, placeholder }) {
  return (
    <label className="col-span-2 block">
      <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.24em] opacity-60 sm:tracking-[0.28em]">
        {label}
      </span>
      <textarea
        name={name}
        rows={2}
        maxLength={240}
        placeholder={placeholder}
        className="w-full resize-none border-b border-bone/30 bg-transparent pb-3 font-body text-[14px] leading-[1.55] text-bone placeholder:text-bone/30 focus:border-flame focus:outline-none sm:text-[15px]"
      />
    </label>
  )
}
