import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useRef, useState } from 'react'
import ballGroup4 from '../assets/homepage/ball-group4.svg'
import ballMask from '../assets/homepage/ball-mask.svg'
import ballVector from '../assets/homepage/ball-vector.svg'
import footerLogoGroup6 from '../assets/homepage/footer-logo-group6.svg'
import footerLogoMask from '../assets/homepage/footer-logo-mask.svg'
import footerLogoVector5 from '../assets/homepage/footer-logo-vector5.svg'
import iconEmail from '../assets/homepage/icon-email.svg'
import iconLocation from '../assets/homepage/icon-location.svg'
import rectanglePhone from '../assets/homepage/rectangle-phone.png'

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

const NAV = [
  { label: 'Como Funciona', href: '#como-funciona' },
  { label: 'Sobre Nós', href: '#sobre-nos' },
  { label: 'Contato', href: '#contato' },
]

// The one place numbered markers are earned: this is a literal sequence, a loop
// the player repeats after every logged match.
const STEPS = [
  { n: '01', k: 'PLAY', d: 'Jogue e registre a partida. Placar, adversário, como você se sentiu em quadra.' },
  { n: '02', k: 'ANALYZE', d: 'A plataforma cruza os dados e encontra padrões no seu jogo que passam batido.' },
  { n: '03', k: 'UNDERSTAND', d: 'Insights claros: onde perdeu pontos, o que te derrubou, seus pontos fracos.' },
  { n: '04', k: 'TRAIN', d: 'Objetivos de treino para o que importa agora — sem dezenas de métricas pra preencher.' },
  { n: '05', k: 'IMPROVE', d: 'Quanto mais você joga, mais o RallyIQ entende seu estilo e acompanha sua evolução.' },
]

const GRAIN =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"

function Logo({ size }: { size: number }) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <img alt="" className="absolute inset-0 size-full" src={footerLogoVector5} />
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ maskImage: `url(${footerLogoMask})`, WebkitMaskImage: `url(${footerLogoMask})` }}
      >
        <img alt="" className="size-[85%]" src={footerLogoGroup6} />
      </div>
    </div>
  )
}

// Signature effect: a Hawk-Eye style tracking radar — range rings, crosshair,
// and one slow lime sweep. Sits behind the hero, mostly felt not seen.
function CourtRadar() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute -right-[18%] top-1/2 h-[125vh] max-h-[1050px] -translate-y-1/2 opacity-70 sm:right-[-10%]"
      viewBox="0 0 800 800"
      fill="none"
    >
      <defs>
        <linearGradient id="v2-sweep" x1="400" y1="400" x2="400" y2="10" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#c4df04" stopOpacity="0" />
          <stop offset="100%" stopColor="#c4df04" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      {[120, 220, 320, 390].map((r) => (
        <circle key={r} cx="400" cy="400" r={r} stroke="#c4df04" strokeOpacity="0.14" strokeWidth="1" />
      ))}
      <path d="M400 0V800M0 400H800" stroke="#c4df04" strokeOpacity="0.09" strokeWidth="1" />
      <circle cx="400" cy="400" r="2.5" fill="#c4df04" />
      <g className="v2-radar-sweep" transform="rotate(38 400 400)">
        <line x1="400" y1="400" x2="400" y2="10" stroke="url(#v2-sweep)" strokeWidth="1.5" />
        <circle cx="400" cy="10" r="3" fill="#c4df04" />
      </g>
      <circle cx="560" cy="250" r="3.5" fill="#c4df04" fillOpacity="0.7" />
      <circle cx="300" cy="520" r="2.5" fill="#c4df04" fillOpacity="0.45" />
    </svg>
  )
}

function CornerReticles() {
  const base = 'pointer-events-none absolute h-6 w-6 border-green-principal/40'
  return (
    <>
      <span className={`${base} left-5 top-5 border-l border-t`} />
      <span className={`${base} right-5 top-5 border-r border-t`} />
      <span className={`${base} bottom-5 left-5 border-b border-l`} />
      <span className={`${base} bottom-5 right-5 border-b border-r`} />
    </>
  )
}

export default function HomepageV2() {
  const rootRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const [showRing] = useState(
    () =>
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Sticky header gains a hairline + blur once the hero scrolls under it.
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        onUpdate: (self) =>
          headerRef.current?.classList.toggle('is-stuck', self.progress > 0.02),
      })

      // Keep pinned math honest once fonts settle the layout.
      document.fonts.ready.then(() => ScrollTrigger.refresh())

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // THE orchestrated moment: the hero assembles once, in order.
        const splits = gsap.utils
          .toArray<HTMLElement>('[data-hero-line]')
          .map((el) => new SplitText(el, { type: 'words' }))
        const words = splits.flatMap((s) => s.words)

        gsap.set(words, { yPercent: 120 })
        gsap.set('[data-hero-rule]', { scaleX: 0, transformOrigin: 'left center' })
        gsap.set('[data-hero-fade]', { opacity: 0, y: 14 })

        const tl = gsap.timeline({ delay: 0.35, defaults: { ease: 'expo.out' } })
        tl.to(words, { yPercent: 0, duration: 0.9, stagger: 0.03 })
          .to('[data-hero-rule]', { scaleX: 1, duration: 0.7, ease: 'power2.inOut' }, '-=0.4')
          .to('[data-hero-fade]', { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, '-=0.5')

        // Slow radar sweep + a scroll-tied spin on the ball (it is a ball).
        gsap.to('.v2-radar-sweep', {
          rotate: 360,
          transformOrigin: '400px 400px',
          duration: 9,
          ease: 'none',
          repeat: -1,
        })
        gsap.to('[data-orbit]', {
          rotate: 360,
          transformOrigin: '50% 50%',
          duration: 24,
          ease: 'none',
          repeat: -1,
        })
        gsap.to('[data-ball]', {
          rotate: 24,
          ease: 'none',
          scrollTrigger: { trigger: '[data-ball]', start: 'top bottom', end: 'bottom top', scrub: 1 },
        })

        // Seamless wordmark marquee (content is duplicated in markup).
        gsap.to('[data-marquee]', { xPercent: -50, duration: 22, ease: 'none', repeat: -1 })

        // Giant background words drift a little slower than the page.
        gsap.utils.toArray<HTMLElement>('[data-watermark]').forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: 12 },
            {
              yPercent: -12,
              ease: 'none',
              scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        })

        // Two deliberate content reveals — not one per section.
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 28,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 82%' },
          })
        })

        return () => {
          tl.kill()
          splits.forEach((s) => s.revert())
        }
      })

      // Desktop-only: the sequence scrolls sideways, pinned once.
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const section = rootRef.current!.querySelector<HTMLElement>('[data-steps-section]')!
        const track = section.querySelector<HTMLElement>('[data-steps-track]')!
        const rail = section.querySelector<HTMLElement>('[data-steps-rail]')
        const inner = section.querySelector<HTMLElement>('[data-steps-inner]')
        track.classList.add('is-horizontal')
        rail?.classList.remove('hidden')
        inner?.classList.add('min-h-svh')

        const distance = () => track.scrollWidth - window.innerWidth + 96

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => '+=' + distance(),
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
        tl.to(track, { x: () => -distance(), ease: 'none' })
        tl.fromTo('[data-steps-progress]', { scaleX: 0 }, { scaleX: 1, ease: 'none' }, 0)

        gsap.utils.toArray<HTMLElement>('[data-step]').forEach((panel) => {
          gsap.from(panel.querySelectorAll('[data-step-in]'), {
            opacity: 0,
            y: 24,
            duration: 0.4,
            stagger: 0.06,
            scrollTrigger: { trigger: panel, containerAnimation: tl, start: 'left 75%' },
          })
        })

        return () => {
          track.classList.remove('is-horizontal')
          rail?.classList.add('hidden')
          inner?.classList.remove('min-h-svh')
        }
      })

      // Magnetic pull on the primary actions — pointer devices, motion allowed.
      mm.add('(pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
        const cleanups = gsap.utils.toArray<HTMLElement>('[data-magnetic]').map((el) => {
          const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3' })
          const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3' })
          const move = (e: MouseEvent) => {
            const r = el.getBoundingClientRect()
            xTo(((e.clientX - r.left) / r.width - 0.5) * 16)
            yTo(((e.clientY - r.top) / r.height - 0.5) * 16)
          }
          const reset = () => {
            xTo(0)
            yTo(0)
          }
          el.addEventListener('mousemove', move)
          el.addEventListener('mouseleave', reset)
          return () => {
            el.removeEventListener('mousemove', move)
            el.removeEventListener('mouseleave', reset)
          }
        })
        return () => cleanups.forEach((fn) => fn())
      })
    },
    { scope: rootRef },
  )

  return (
    <div ref={rootRef} className="relative bg-ink font-lexend text-white-principal">
      {showRing && <CursorRing />}

      <div
        aria-hidden
        className="v2-grain pointer-events-none fixed inset-[-20%] z-[100] opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: `url("${GRAIN}")` }}
      />

      <header
        ref={headerRef}
        className="[&.is-stuck]:border-ink-line [&.is-stuck]:bg-ink/80 [&.is-stuck]:backdrop-blur-md sticky top-0 z-50 border-b border-transparent transition-colors duration-300"
      >
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-[clamp(1.25rem,5vw,4rem)] py-5">
          <a href="#hero" className="flex items-center gap-2 outline-offset-4 focus-visible:outline-2 focus-visible:outline-green-principal">
            <Logo size={22} />
            <span className="text-base tracking-[-0.02em] text-white-principal">RallyIQ</span>
          </a>
          <nav className="hidden items-center gap-9 text-sm tracking-[-0.01em] text-ink-mute md:flex">
            {NAV.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="outline-offset-4 transition-colors hover:text-white-principal focus-visible:outline-2 focus-visible:outline-green-principal"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <button
            data-magnetic
            type="button"
            className="shrink-0 bg-green-principal px-5 py-2 text-sm tracking-[-0.01em] text-black transition-colors hover:bg-white-principal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white-principal"
          >
            Entrar na lista
          </button>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section ref={heroRef} id="hero" className="relative flex min-h-svh flex-col justify-center overflow-hidden">
          <CourtRadar />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'linear-gradient(#c4df04 1px, transparent 1px), linear-gradient(90deg, #c4df04 1px, transparent 1px)',
              backgroundSize: '84px 84px',
            }}
          />
          <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-[clamp(1.25rem,5vw,4rem)] pb-20 pt-24">
            <p data-hero-fade className="flex items-center gap-3 text-sm tracking-[-0.01em] text-ink-mute">
              <span className="v2-pulse inline-block size-2 rounded-full bg-green-principal" />
              Lista de pré-venda aberta
            </p>
            <h1 className="max-w-[15ch] font-light text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] tracking-[-0.03em]">
              <span className="block overflow-hidden pb-[0.05em]">
                <span data-hero-line className="block">Transforme cada partida</span>
              </span>
              <span className="mt-1 block overflow-hidden pb-[0.08em]">
                <span
                  data-hero-line
                  className="block whitespace-nowrap text-[1.45em] font-extralight leading-[0.95] tracking-[-0.04em]"
                >
                  em evolução.
                </span>
              </span>
              <span data-hero-rule className="mt-6 block h-px w-full max-w-[560px] bg-green-principal" />
            </h1>
            <p
              data-hero-fade
              className="max-w-[52ch] font-manjari text-[clamp(1.05rem,1.6vw,1.45rem)] leading-[1.55] tracking-[-0.005em] text-white-principal/75"
            >
              Plataforma inteligente para jogadores amadores de tênis. Suas partidas viram insights,
              objetivos de treino e estratégia — para você entender o jogo e evoluir a cada saque.
            </p>
            <div data-hero-fade className="flex flex-wrap items-center gap-4 pt-2">
              <button
                data-magnetic
                type="button"
                className="bg-green-principal px-7 py-3.5 text-base tracking-[-0.01em] text-black transition-colors hover:bg-white-principal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white-principal"
              >
                Entrar na lista de pré-venda
              </button>
              <a
                href="#como-funciona"
                className="border border-ink-line px-7 py-3.5 text-base tracking-[-0.01em] text-white-principal transition-colors hover:border-green-principal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-principal"
              >
                Ver como funciona
              </a>
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <div className="overflow-hidden border-y border-ink-line py-5">
          <div data-marquee className="flex w-max items-center gap-10 pr-10 text-[clamp(1.75rem,5vw,3.75rem)] font-extralight uppercase tracking-[-0.03em] text-green-principal">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className="flex items-center gap-10">
                RallyIQ
                <span className="size-1.5 rounded-full bg-green-principal/50" />
              </span>
            ))}
          </div>
        </div>

        {/* COMO FUNCIONA — pinned horizontal sequence on desktop w/ motion, vertical list otherwise */}
        <section data-steps-section id="como-funciona" className="relative overflow-hidden bg-ink">
          <div data-steps-inner className="flex flex-col justify-center gap-14 py-24 md:gap-20">
            <div className="mx-auto w-full max-w-[1440px] px-[clamp(1.25rem,5vw,4rem)]">
              <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-extralight tracking-[-0.03em]">Como funciona</h2>
              <p className="mt-4 max-w-[42ch] font-manjari text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.55] text-white-principal/70">
                Cinco etapas. Um ciclo que se repete a cada partida que você registra.
              </p>
            </div>

            <div className="relative">
              <div data-steps-rail className="mx-auto mb-10 hidden w-full max-w-[1440px] px-[clamp(1.25rem,5vw,4rem)]">
                <div className="h-px w-full bg-ink-line" />
                <div data-steps-progress className="-mt-px h-px w-full origin-left bg-green-principal" />
              </div>
              <div
                data-steps-track
                className="mx-auto grid w-full max-w-[1440px] grid-cols-1 px-[clamp(1.25rem,5vw,4rem)] lg:grid-cols-2 lg:gap-x-20 [&.is-horizontal]:mx-0 [&.is-horizontal]:flex [&.is-horizontal]:w-max [&.is-horizontal]:max-w-none [&.is-horizontal]:flex-row"
              >
                {STEPS.map((s) => (
                  <article
                    key={s.n}
                    data-step
                    className="flex max-w-[620px] shrink-0 items-start gap-6 border-t border-ink-line py-8 first:border-t-0 md:gap-10 lg:border-t-0 lg:py-7 [.is-horizontal_&]:mr-16 [.is-horizontal_&]:w-[340px] [.is-horizontal_&]:max-w-none [.is-horizontal_&]:flex-col [.is-horizontal_&]:border-t-0 [.is-horizontal_&]:py-0"
                  >
                    <span
                      data-step-in
                      className="shrink-0 font-thin leading-none text-green-principal/70 text-[clamp(2rem,3.5vw,3rem)] tabular-nums"
                    >
                      {s.n}
                    </span>
                    <div className="flex flex-col gap-2.5">
                      <h3 data-step-in className="text-[clamp(1.5rem,2.6vw,2.25rem)] font-light tracking-[-0.02em]">
                        {s.k}
                      </h3>
                      <p
                        data-step-in
                        className="max-w-[42ch] font-manjari text-[clamp(1rem,1.3vw,1.2rem)] leading-[1.55] text-white-principal/70"
                      >
                        {s.d}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PRODUTO */}
        <section className="relative overflow-hidden border-t border-ink-line py-[clamp(4rem,9vw,7rem)]">
          <div className="relative mx-auto flex max-w-[1200px] flex-col items-center gap-9 px-[clamp(1.25rem,5vw,4rem)] text-center">
            <p className="max-w-[38ch] font-manjari text-[clamp(1.05rem,1.6vw,1.4rem)] leading-[1.55] text-white-principal/75">
              Tudo num app só: tendências, colocação de bola, insights e evolução partida a partida.
            </p>
            <div className="relative w-full max-w-[1040px] border border-ink-line bg-ink-raise px-[clamp(1rem,4vw,3.5rem)] pt-[clamp(1.5rem,4vw,3.5rem)]">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-green-principal/[0.06] blur-2xl"
              />
              <img
                alt="Telas do app RallyIQ: tendências de jogo, mapa de colocação de bola e resumo da partida"
                src={rectanglePhone}
                className="relative w-full [mask-image:linear-gradient(to_bottom,black_82%,transparent)]"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* QUEM SOMOS */}
        <section id="sobre-nos" className="relative overflow-hidden border-t border-ink-line py-[clamp(5rem,11vw,9rem)]">
          <span
            data-watermark
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 select-none whitespace-nowrap text-center text-[clamp(3rem,13vw,11rem)] font-thin uppercase leading-none tracking-[-0.05em] text-white-principal/[0.05]"
          >
            Quem somos
          </span>
          <div className="relative mx-auto grid max-w-[1440px] items-center gap-14 px-[clamp(1.25rem,5vw,4rem)] lg:grid-cols-[0.9fr_1.1fr]">
            <div data-ball className="relative mx-auto aspect-square w-full max-w-[460px]">
              <img alt="" src={ballVector} className="absolute inset-0 size-full" />
              <div
                className="absolute inset-0"
                style={{ maskImage: `url(${ballMask})`, WebkitMaskImage: `url(${ballMask})` }}
              >
                <img alt="Bola de tênis" src={ballGroup4} className="size-full object-contain" />
              </div>
              <svg data-orbit aria-hidden className="absolute inset-[-12%]" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="48" stroke="#c4df04" strokeOpacity="0.2" strokeWidth="0.4" />
                <circle cx="50" cy="2" r="1.4" fill="#c4df04" />
                <circle cx="96" cy="62" r="1" fill="#c4df04" fillOpacity="0.6" />
              </svg>
            </div>
            <div
              data-reveal
              className="max-w-[52ch] font-manjari text-[clamp(1.05rem,1.5vw,1.35rem)] leading-[1.6] text-white-principal/80"
            >
              <p>
                RallyIQ é uma startup fundada em 2026: uma plataforma digital focada no
                desenvolvimento de jogadores amadores de tênis. Não é mais um app de resultados,
                ranking ou estatística — é a partida transformada em aprendizado.
              </p>
              <p className="mt-5">
                Jogadores amadores jogam muito, mas raramente sabem por que ganharam ou perderam,
                quais são seus pontos fracos ou o que treinar. Os dados ficam espalhados entre
                memória, anotações, professor, vídeos e apps. A gente junta tudo num lugar só — sem
                exigir que você seja estatístico.
              </p>
              <div className="mt-9 flex flex-wrap gap-2.5">
                {['Fundada em 2026', 'Foco em amadores', 'Insights personalizados'].map((t) => (
                  <span key={t} className="border border-ink-line px-3.5 py-1.5 text-xs tracking-[-0.01em] text-ink-mute">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PRÉ-LANÇAMENTO */}
        <section data-reveal className="relative overflow-hidden border-t border-ink-line py-[clamp(5rem,12vw,9rem)]">
          <CornerReticles />
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-principal/[0.06] blur-3xl"
          />
          <div className="relative mx-auto flex max-w-[1440px] flex-col items-center gap-11 px-[clamp(1.25rem,5vw,4rem)] text-center">
            <h2 className="max-w-[16ch] text-[clamp(2.25rem,7vw,5.5rem)] font-extralight leading-[1.05] tracking-[-0.03em]">
              Venha fazer parte do pré-lançamento
            </h2>
            <button
              data-magnetic
              type="button"
              className="bg-green-principal px-[clamp(1.5rem,4vw,3rem)] py-[clamp(1rem,2vw,1.6rem)] text-[clamp(1.05rem,2.2vw,1.6rem)] tracking-[-0.02em] text-black transition-colors hover:bg-white-principal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white-principal"
            >
              Entrar na lista de pré-venda
            </button>
          </div>
        </section>

        {/* FOOTER */}
        <footer id="contato" className="relative overflow-hidden border-t border-ink-line pb-10 pt-20">
          <div className="mx-auto flex max-w-[1440px] flex-wrap items-start justify-between gap-12 px-[clamp(1.25rem,5vw,4rem)]">
            <div className="flex items-center gap-2.5">
              <Logo size={38} />
              <span className="text-2xl tracking-[-0.02em] text-white-principal">RallyIQ</span>
            </div>
            <div className="flex flex-wrap gap-x-16 gap-y-8">
              <nav className="flex flex-col gap-3">
                <p className="text-sm text-ink-mute">Menu</p>
                {NAV.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className="font-manjari text-lg text-white-principal/80 outline-offset-4 transition-colors hover:text-green-principal focus-visible:outline-2 focus-visible:outline-green-principal"
                  >
                    {l.label}
                  </a>
                ))}
              </nav>
              <div className="flex flex-col gap-3">
                <p className="text-sm text-ink-mute">Contato</p>
                <span className="flex items-center gap-2.5 font-manjari text-lg text-white-principal/80">
                  <img alt="" src={iconLocation} className="size-5 opacity-70 brightness-0 invert" />
                  rallyiq.tenis
                </span>
                <a
                  href="mailto:rallyiqtenis@gmail.com"
                  className="flex items-center gap-2.5 font-manjari text-lg text-white-principal/80 outline-offset-4 transition-colors hover:text-green-principal focus-visible:outline-2 focus-visible:outline-green-principal"
                >
                  <img alt="" src={iconEmail} className="h-4 w-5 opacity-70 brightness-0 invert" />
                  rallyiqtenis@gmail.com
                </a>
              </div>
            </div>
          </div>
          <p
            aria-hidden
            className="pointer-events-none mt-12 w-full select-none text-center text-[clamp(3.5rem,25vw,21rem)] font-extralight uppercase leading-[0.8] tracking-[-0.05em] text-white-principal/[0.06]"
          >
            RallyIQ
          </p>
        </footer>
      </main>
    </div>
  )
}

function CursorRing() {
  const ringRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const ring = ringRef.current!
    const xTo = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3' })
    const yTo = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3' })
    const move = (e: MouseEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
      gsap.to(ring, { opacity: 1, duration: 0.2 })
    }
    const grow = (e: MouseEvent) => {
      const hit = (e.target as HTMLElement).closest('a, button')
      gsap.to(ring, { scale: hit ? 1.9 : 1, duration: 0.25, ease: 'power2.out' })
    }
    const leave = () => gsap.to(ring, { opacity: 0, duration: 0.2 })
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', grow)
    document.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', grow)
      document.removeEventListener('mouseleave', leave)
    }
  })

  return (
    <div
      ref={ringRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[101] -ml-3 -mt-3 size-6 rounded-full border border-green-principal opacity-0 mix-blend-difference"
    />
  )
}
