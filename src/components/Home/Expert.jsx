"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"

/* ✅ React 19 safe tilt (no refs) */
function useTilt(max = 10, lift = 6) {
  const [style, setStyle] = useState({
    transform: "perspective(1100px) rotateX(0deg) rotateY(0deg) translateY(0px)",
  })

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const midX = rect.width / 2
    const midY = rect.height / 2

    const rY = ((x - midX) / midX) * max
    const rX = -((y - midY) / midY) * max

    setStyle({
      transform: `perspective(1100px) rotateX(${rX}deg) rotateY(${rY}deg) translateY(-${lift}px)`,
    })
  }

  const onLeave = () => {
    setStyle({
      transform: "perspective(1100px) rotateX(0deg) rotateY(0deg) translateY(0px)",
      transition: "transform 220ms ease",
    })
    setTimeout(() => {
      setStyle({
        transform: "perspective(1100px) rotateX(0deg) rotateY(0deg) translateY(0px)",
      })
    }, 230)
  }

  return { style, onMove, onLeave }
}

/* ✅ simple reveal on scroll */
function useInView(id, threshold = 0.2) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = document.getElementById(id)
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [id, threshold])

  return inView
}

export default function ExpertSection(props) {
  const {
    leftImage = "/why-left.jpg",
    smallImage = "/why-small.jpg",
    eyebrow = "WHY CHOOSE US",
    title = "Precision Execution for Reliable Infrastructure Projects",
    description =
      "Choosing M.S. Construction means working with a team that prioritizes quality, efficiency, and structured project coordination. From material sourcing to final delivery, we ensure every stage meets technical standards and timeline commitments.",
    bullets = [
      "Advanced batching technology",
      "Transparent project coordination",
      "Modern fleet & machinery strength",
    ],
    note =
      "Your project goals are our responsibility. We deliver tailored infrastructure solutions designed for durability, compliance, and long-term structural performance.",
    buttonText = "Contact us",
    buttonHref = "/Contact",
    maxWidthClass = "max-w-6xl",
    sectionClassName = "bg-white",
    paddingClassName = "py-16 sm:py-20",
    tiltStrength = 10,
    smallTiltStrength = 8,
    lift = 6,
  } = props || {}

  const inView = useInView("expert-modern-stack", 0.18)

  const tiles = useMemo(
    () =>
      bullets.map((t, i) => ({
        title: t,
        icon: i === 0 ? "✓" : i === 1 ? "↔" : "⚙",
      })),
    [bullets]
  )

  return (
    <section id="expert-modern-stack" className={`${sectionClassName} relative overflow-hidden`}>
      {/* Modern light background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-44 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[#d8b07a]/10 blur-3xl" />
        <div className="absolute -bottom-56 right-[-160px] h-[520px] w-[520px] rounded-full bg-red-500/6 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.10)_1px,transparent_1px)] [background-size:34px_34px]" />
      </div>

      <div className={`relative mx-auto ${maxWidthClass} px-6 ${paddingClassName}`}>
        {/* Top row */}
        <div className="grid gap-10 lg:grid-cols-12 items-start">
          {/* LEFT: Content */}
          <div
            className={[
              "lg:col-span-6",
              "transition-all duration-700",
              inView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-[0.99]",
            ].join(" ")}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-xs text-black/60 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-red-600" />
              <span className="tracking-[0.25em]">{eyebrow}</span>
            </div>

            <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold tracking-tight text-black leading-tight">
              {title}
            </h2>

            <p className="mt-4 text-sm sm:text-base text-black/60 leading-relaxed max-w-xl">
              {description}
            </p>

            {/* Feature tiles (modern) */}
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {tiles.map((t) => (
                <div
                  key={t.title}
                  className="group flex items-start gap-3 rounded-2xl border border-black/10 bg-white px-4 py-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-2xl border border-black/10 bg-[#f7f7f8] text-black/70">
                    {t.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-black/80">{t.title}</p>
                    <p className="mt-1 text-xs text-black/55">
                      Structured planning with clear execution standards.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Image stack (unique) */}
          <div
            className={[
              "lg:col-span-6",
              "transition-all duration-700",
              inView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-[0.99]",
            ].join(" ")}
            style={{ transitionDelay: inView ? "80ms" : "0ms" }}
          >
            <ImageStack
              leftImage={leftImage}
              smallImage={smallImage}
              tiltStrength={tiltStrength}
              smallTiltStrength={smallTiltStrength}
              lift={lift}
            />
          </div>
        </div>

        {/* Bottom CTA card (modern strip) */}
        <div
          className={[
            "mt-10 transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
          ].join(" ")}
          style={{ transitionDelay: inView ? "140ms" : "0ms" }}
        >
          <div className="rounded-[28px] border border-black/10 bg-white shadow-[0_28px_90px_-75px_rgba(0,0,0,0.45)] p-6 sm:p-8">
            <div className="grid gap-6 md:grid-cols-12 md:items-center">
              <div className="md:col-span-8">
                <p className="text-xs tracking-[0.24em] text-black/45 uppercase">Our promise</p>
                <p className="mt-3 text-sm sm:text-base text-black/65 leading-relaxed">
                  {note}
                </p>
              </div>

              <div className="md:col-span-4 md:flex md:justify-end">
                <Link
                  href={buttonHref}
                  className="inline-flex w-full md:w-auto items-center justify-center gap-3 rounded-2xl bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_60px_-30px_rgba(220,38,38,0.7)] hover:bg-red-500 transition"
                >
                  {buttonText} <span className="text-base">→</span>
                </Link>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <MetaChip text="Durability focused" />
              <MetaChip text="Standards compliant" />
              <MetaChip text="Milestone delivery" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Image Stack UI ---------------- */

function ImageStack({ leftImage, smallImage, tiltStrength, smallTiltStrength, lift }) {
  const bigTilt = useTilt(tiltStrength, lift)
  const smallTilt = useTilt(smallTiltStrength, Math.max(4, lift - 1))

  return (
    <div className="relative">
      {/* Base frame */}
      <div className="rounded-[32px] border border-black/10 bg-white p-3 shadow-[0_28px_90px_-70px_rgba(0,0,0,0.45)]">
        <div className="relative overflow-hidden rounded-[26px]">
          {/* big image */}
          <div
            onMouseMove={bigTilt.onMove}
            onMouseLeave={bigTilt.onLeave}
            style={bigTilt.style}
            className="relative h-[320px] sm:h-[420px] transition-transform will-change-transform"
          >
            <Image src={leftImage} alt="Main" fill className="object-cover" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/18 via-black/0 to-black/0" />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-black/10" />
          </div>

          {/* diagonal highlight */}
          <div className="pointer-events-none absolute -left-40 top-[-30%] h-[200%] w-[70%] rotate-12 bg-gradient-to-r from-white/0 via-white/35 to-white/0 opacity-50" />
        </div>
      </div>

      {/* Floating small image card */}
      <div className="absolute -bottom-8 left-6 right-6 sm:left-10 sm:right-auto sm:w-[320px]">
        <div
          onMouseMove={smallTilt.onMove}
          onMouseLeave={smallTilt.onLeave}
          style={smallTilt.style}
          className="rounded-[26px] border border-black/10 bg-white shadow-[0_22px_70px_-55px_rgba(0,0,0,0.45)] transition-transform will-change-transform"
        >
          <div className="p-3">
            <div className="relative h-[150px] overflow-hidden rounded-2xl">
              <Image src={smallImage} alt="Secondary" fill className="object-cover" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/22 via-black/0 to-black/0" />
            </div>

            <div className="mt-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-black/80">On-site coordination</p>
              <span className="text-xs font-semibold text-red-600">View →</span>
            </div>
          </div>
        </div>
      </div>

      {/* bottom spacing for floating card */}
      <div className="h-14 sm:h-10" />
    </div>
  )
}

function MetaChip({ text }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#f7f7f8] px-3 py-2 text-xs font-medium text-black/65">
      <span className="h-1.5 w-1.5 rounded-full bg-[#d8b07a]" />
      {text}
    </span>
  )
}
