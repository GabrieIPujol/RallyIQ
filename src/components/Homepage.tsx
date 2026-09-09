import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useRef } from 'react'
import type { RefObject } from 'react'
import ballGroup4 from '../assets/homepage/ball-group4.svg'
import ballMask from '../assets/homepage/ball-mask.svg'
import ballVector from '../assets/homepage/ball-vector.svg'
import footerLogoGroup6 from '../assets/homepage/footer-logo-group6.svg'
import footerLogoMask from '../assets/homepage/footer-logo-mask.svg'
import footerLogoVector5 from '../assets/homepage/footer-logo-vector5.svg'
import iconEmail from '../assets/homepage/icon-email.svg'
import iconLocation from '../assets/homepage/icon-location.svg'
import logoGroup1 from '../assets/homepage/logo-group1.svg'
import logoGroup2 from '../assets/homepage/logo-group2.svg'
import logoMask from '../assets/homepage/logo-mask.svg'
import rectangleCourt from '../assets/homepage/rectangle-court.png'
import rectanglePhone from '../assets/homepage/rectangle-phone.png'

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

const DOT_SIZE = 175
const RALLY_STOPS = [
  { label: 'PLAY', top: 0, left: 0, labelTop: 77, labelLeft: 67 },
  { label: 'ANALYZE', top: 177, left: 208, labelTop: 254, labelLeft: 260 },
  { label: 'UNDERSTAND', top: 355, left: 0, labelTop: 431, labelLeft: 32 },
  { label: 'TRAIN', top: 532, left: 208, labelTop: 608, labelLeft: 270 },
  { label: 'IMPROVE', top: 709, left: 0, labelTop: 786, labelLeft: 50 },
]
const RALLY_PATH = RALLY_STOPS.map(
  (s, i) => `${i === 0 ? 'M' : 'L'} ${s.left + DOT_SIZE / 2} ${s.top + DOT_SIZE / 2}`,
).join(' ')

function Logo({ size, variant = 'header' }: { size: number; variant?: 'header' | 'footer' }) {
  const circle = variant === 'header' ? logoGroup1 : footerLogoVector5
  const strings = variant === 'header' ? logoGroup2 : footerLogoGroup6
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <img alt="" className="absolute inset-0 size-full" src={circle} />
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          maskImage: `url(${variant === 'header' ? logoMask : footerLogoMask})`,
          WebkitMaskImage: `url(${variant === 'header' ? logoMask : footerLogoMask})`,
        }}
      >
        <img alt="" className="size-[85%]" src={strings} />
      </div>
    </div>
  )
}

function NavLinks({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-8 font-lexend text-base tracking-[-0.32px] text-black ${className ?? ''}`}>
      <a href="#como-funciona">Como Funciona</a>
      <a href="#sobre-nos">Sobre Nós</a>
      <a href="#contato">Contato</a>
    </div>
  )
}

function RallyTimeline({
  containerRef,
}: {
  containerRef: RefObject<HTMLDivElement | null>
}) {
  const dotRefs = useRef<(HTMLDivElement | null)[]>([])
  const labelRefs = useRef<(HTMLParagraphElement | null)[]>([])
  const pathRef = useRef<SVGPathElement>(null)

  useGSAP(
    () => {
      const path = pathRef.current
      if (!path) return
      const length = path.getTotalLength()
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
      gsap.set(dotRefs.current, { scale: 0, transformOrigin: '50% 50%' })
      gsap.set(labelRefs.current, { opacity: 0, y: 6 })

      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ delay: 0.15 })
        tl.to(path, { strokeDashoffset: 0, duration: 1.4, ease: 'power1.inOut' })
          .to(dotRefs.current, { scale: 1, duration: 0.4, stagger: 1.1 / 5, ease: 'back.out(2.4)' }, 0)
          .to(labelRefs.current, { opacity: 1, y: 0, duration: 0.35, stagger: 1.1 / 5 }, 0.2)
        return () => {
          tl.kill()
        }
      })
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(path, { strokeDashoffset: 0 })
        gsap.set(dotRefs.current, { scale: 1 })
        gsap.set(labelRefs.current, { opacity: 1, y: 0 })
      })
    },
    { scope: containerRef },
  )

  return (
    <div className="relative h-[882px] w-[383px] shrink-0">
      <svg className="absolute inset-0" width={383} height={882} viewBox="0 0 383 882" fill="none">
        <path ref={pathRef} d={RALLY_PATH} stroke="#849317" strokeWidth={1.5} strokeLinecap="round" />
      </svg>
      {RALLY_STOPS.map((stop, i) => {
        const isPrincipal = i % 2 === 0
        return (
          <div
            key={stop.label}
            ref={(el) => {
              dotRefs.current[i] = el
            }}
            className={`absolute rounded-full ring-1 ${
              isPrincipal ? 'bg-green-principal ring-green-light/60' : 'bg-green-dark ring-green-principal/60'
            }`}
            style={{ top: stop.top, left: stop.left, width: DOT_SIZE, height: DOT_SIZE }}
          />
        )
      })}
      {RALLY_STOPS.map((stop, i) => (
        <p
          key={stop.label}
          ref={(el) => {
            labelRefs.current[i] = el
          }}
          className={`absolute font-lexend text-base tracking-[-0.32px] ${
            i % 2 === 0 ? 'text-green-dark' : 'text-green-principal'
          }`}
          style={{ top: stop.labelTop, left: stop.labelLeft }}
        >
          {stop.label}
        </p>
      ))}
    </div>
  )
}

export default function Homepage() {
  const rootRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const heroCopyRef = useRef<HTMLParagraphElement>(null)
  const playWatermarkRef = useRef<HTMLParagraphElement>(null)
  const ctaNavRef = useRef<HTMLButtonElement>(null)
  const ctaFinalRef = useRef<HTMLButtonElement>(null)
  const ballWrapRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // Sticky header gains a hairline + soft shadow once the hero scrolls under it.
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        onUpdate: (self) => headerRef.current?.classList.toggle('border-black/10', self.progress > 0),
      })

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // The single orchestrated hero moment: headline stagger-in, then the copy, then the PLAY watermark.
        const split = new SplitText(headlineRef.current, { type: 'words' })
        gsap.set(split.words, { opacity: 0, y: 16 })
        gsap.set(heroCopyRef.current, { opacity: 0, y: 10 })
        gsap.set(playWatermarkRef.current, { opacity: 0, scale: 0.85 })

        const tl = gsap.timeline({ delay: 0.5 })
        tl.to(split.words, { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'expo.out' })
          .to(heroCopyRef.current, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, '-=0.25')
          .to(playWatermarkRef.current, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)' }, '-=0.2')

        // Restrained scroll reveals: each section gets one quiet fade+rise, not a blanket per-card animation.
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 24,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          })
        })

        gsap.from('[data-reveal-stagger] > *', {
          opacity: 0,
          y: 24,
          duration: 0.5,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: { trigger: '[data-reveal-stagger]', start: 'top 85%' },
        })

        // The ball is literally a ball: it earns a slow spin tied to scroll, not decoration for its own sake.
        gsap.to(ballWrapRef.current, {
          rotate: 20,
          ease: 'none',
          scrollTrigger: { trigger: ballWrapRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        })

        return () => {
          tl.kill()
          split.revert()
        }
      })

      // Button micro-interaction: small, deliberate, GSAP-driven rather than decorative CSS.
      const buttons = [ctaNavRef.current, ctaFinalRef.current].filter(Boolean) as HTMLButtonElement[]
      buttons.forEach((btn) => {
        const enter = () => gsap.to(btn, { scale: 1.04, duration: 0.25, ease: 'power2.out' })
        const leave = () => gsap.to(btn, { scale: 1, duration: 0.25, ease: 'power2.out' })
        btn.addEventListener('mouseenter', enter)
        btn.addEventListener('mouseleave', leave)
      })
    },
    { scope: rootRef },
  )

  return (
    <div ref={rootRef} className="bg-white-principal">
      <header
        ref={headerRef}
        className="sticky top-0 z-50 border-b border-transparent bg-white-principal/90 backdrop-blur-sm transition-colors duration-300"
      >
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-[112px] py-6">
          <div className="flex flex-1 items-center justify-between">
            <div className="flex items-center gap-1">
              <Logo size={20} />
              <p className="font-lexend text-base tracking-[-0.32px] text-black/50">RallyIQ</p>
            </div>
            <NavLinks className="flex-1 justify-center" />
          </div>
          <button
            ref={ctaNavRef}
            type="button"
            className="shrink-0 cursor-pointer rounded-lg bg-green-principal px-6 py-2 font-lexend text-base tracking-[-0.32px] text-black"
          >
            Lista de pré-venda
          </button>
        </div>
      </header>

      <section ref={heroRef} className="mx-auto flex w-full max-w-[1440px] items-start justify-between px-[112px] pt-[45px]">
        <RallyTimeline containerRef={heroRef} />

        <div className="flex w-[592px] shrink-0 flex-col gap-16">
          <div className="flex flex-col gap-8 text-black">
            <h1 ref={headlineRef} className="font-lexend text-[32px] font-medium tracking-[-0.64px]">
              Transforme cada partida em evolução.
            </h1>
            <p ref={heroCopyRef} className="max-w-[62ch] font-manjari text-2xl leading-[1.5] tracking-[-0.48px]">
              RallyIQ é uma plataforma inteligente para jogadores amadores de tênis que transforma
              seus jogos em insights personalizados, objetivos de treino e estratégias para você
              entender seu jogo, treinar melhor e evoluir a cada partida.
            </p>
          </div>
          <p
            ref={playWatermarkRef}
            className="p-2 text-center font-lexend text-[200px] font-extralight tracking-[-4px] text-green-principal"
          >
            PLAY
          </p>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-16 px-[112px] pt-[130px]" id="como-funciona">
        <div className="flex flex-col gap-10">
          <div data-reveal className="relative h-[451px] w-full overflow-visible rounded-lg">
            <img alt="Quadra de tênis" src={rectangleCourt} className="size-full rounded-lg object-cover" />
            <p className="absolute -top-[90px] right-0 font-lexend text-[72px] font-extralight tracking-[-1.44px] text-green-dark">
              COMO FUNCIONA?
            </p>
          </div>
          <div data-reveal-stagger className="flex h-[213px] items-center gap-8">
            <div className="h-full w-full overflow-hidden rounded-lg border-[0.5px] border-black">
              <img alt="App RallyIQ" src={rectanglePhone} className="mx-auto h-full object-contain" />
            </div>
            <div className="h-full w-full overflow-hidden rounded-lg border-[0.5px] border-black">
              <img alt="App RallyIQ" src={rectanglePhone} className="mx-auto h-full object-contain" />
            </div>
          </div>
        </div>
        <p data-reveal className="max-w-[75ch] font-manjari text-2xl leading-[1.5] tracking-[-0.48px] text-black">
          O RallyIQ acompanha sua jornada dentro e fora da quadra. Registre suas partidas, conte
          como foi seu desempenho e deixe a plataforma identificar padrões no seu jogo. A partir
          dessas informações, o RallyIQ transforma seus dados em insights personalizados, objetivos
          de treino e recomendações para você saber exatamente onde focar. Quanto mais você joga,
          mais o RallyIQ entende seu estilo e acompanha sua evolução.
        </p>
      </section>

      <section className="mt-[200px] flex flex-col items-center gap-[200px]" id="sobre-nos">
        <p data-reveal className="-mb-4 w-full text-center font-lexend text-[184px] font-thin tracking-[-3.68px] text-black">
          QUEM SOMOS
        </p>
        <div className="relative w-full bg-black py-24">
          <div className="mx-auto flex w-[1217px] items-start gap-12">
            <div ref={ballWrapRef} className="relative size-[593px] shrink-0">
              <img alt="" src={ballVector} className="absolute inset-0 size-full" />
              <div
                className="absolute size-[568px]"
                style={{ top: 81, left: 23, maskImage: `url(${ballMask})`, WebkitMaskImage: `url(${ballMask})` }}
              >
                <img alt="Bola de tênis" src={ballGroup4} className="size-full" />
              </div>
            </div>
            <div data-reveal className="w-[432px] font-manjari text-2xl leading-[1.5] tracking-[-0.48px] text-white-principal">
              <p className="mb-4">
                RallyIQ é uma StartUp fundada em 2026, com a proposta de uma plataforma digital
                focada no desenvolvimento de jogadores amadores de tênis. Em vez de funcionar
                apenas como um aplicativo de resultados, ranking ou análise estatística, o produto
                transforma informações das partidas em insights, objetivos de treino e
                acompanhamento da evolução do jogador.
              </p>
              <p>
                Jogadores amadores costumam jogar várias partidas, mas muitas vezes não sabem
                exatamente por que ganharam ou perderam, quais são seus principais pontos fracos ou
                o que deveriam treinar para melhorar. Os dados ficam fragmentados entre memória do
                jogador, anotações, professores, vídeos e diferentes aplicativos. A oportunidade é
                transformar a partida em uma fonte de aprendizado, sem exigir que o jogador seja um
                estatístico ou precise preencher dezenas de métricas.
              </p>
            </div>
          </div>
        </div>

        <div data-reveal className="flex flex-col items-center gap-[104px]">
          <h2 className="text-center font-lexend text-[120px] font-extralight leading-normal tracking-[-2.4px] text-black">
            Venha fazer parte do
            <br />
            Pré Lançamento
          </h2>
          <button
            ref={ctaFinalRef}
            type="button"
            className="cursor-pointer rounded-lg bg-green-principal px-[50px] py-6 font-lexend text-[80px] tracking-[-1.6px] text-black"
          >
            Entre na Lista de Pré Venda
          </button>
        </div>

        <footer data-reveal className="flex w-full flex-col items-center gap-[104px] bg-green-dark pt-[60px]" id="contato">
          <div className="flex w-[1216px] items-start justify-between">
            <div className="flex items-start gap-2">
              <Logo size={50} variant="footer" />
              <p className="font-lexend text-[40px] tracking-[-0.8px] text-white">RallyIQ</p>
            </div>
            <div className="flex w-[476px] gap-10">
              <div className="flex flex-1 flex-col gap-4 text-white">
                <p className="font-lexend text-[36px] tracking-[-0.72px]">Menu</p>
                <div className="flex flex-col gap-2 font-manjari text-2xl tracking-[-0.48px]">
                  <a href="#como-funciona">Como Funciona</a>
                  <a href="#sobre-nos">Sobre Nós</a>
                  <a href="#contato">Contato</a>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <p className="font-lexend text-[36px] tracking-[-0.72px] text-white">Contato</p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <img alt="" src={iconLocation} className="size-6" />
                    <p className="font-manjari text-2xl tracking-[-0.48px] text-white">rallyiq.tenis</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <img alt="" src={iconEmail} className="h-[17px] w-[25px]" />
                    <p className="font-manjari text-2xl tracking-[-0.48px] text-white">
                      rallyiqtenis@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="w-full text-center font-lexend text-[360px] font-extralight tracking-[-7.2px] text-white">
            RALLYIQ
          </p>
        </footer>
      </section>
    </div>
  )
}
