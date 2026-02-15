"use client"

import Image from "next/image"
import { useMemo, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

export default function TestimonialsSection() {
  const testimonials = useMemo(
    () => [
      {
        name: "Darlene Robertson",
        location: "New York, US",
        text: "Drill’s innovative approach and commitment to quality have made them our go-to partner for all construction needs",
        avatar: "/avatars/avatar1.jpg",
      },
      {
        name: "Savannah Nguyen",
        location: "Toronto, US",
        text: "Working with Drill has been a delight. Their team’s collaboration and expertise brought our designs to life flawlessly.",
        avatar: "/avatars/avatar2.jpg",
      },
      {
        name: "Kathryn Murphy",
        location: "Dallas, US",
        text: "Drill collaborative approach ensured designs were implemented with impeccable attention to detail. A pleasure to work with!",
        avatar: "/avatars/avatar3.jpg",
      },
      {
        name: "Brooklyn Simmons",
        location: "Georgia, US",
        text: "The team at Drill handled our complex requirements with precision and professionalism. Results speak for themselves.",
        avatar: "/avatars/avatar4.jpg",
      },
    ],
    []
  )

  // mobile carousel
  const trackRef = useRef(null)
  const [index, setIndex] = useState(0)
  const maxIndex = testimonials.length - 1

  const scrollToIndex = (i) => {
    const track = trackRef.current
    if (!track) return

    const clamped = Math.max(0, Math.min(maxIndex, i))
    setIndex(clamped)

    const card = track.querySelector(`[data-card="${clamped}"]`)
    if (card) card.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" })
  }

  const prev = () => scrollToIndex(index - 1)
  const next = () => scrollToIndex(index + 1)

  return (
    <section className="relative w-full overflow-hidden bg-black text-white">
      {/* subtle spotlight / glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-48 right-[-120px] h-[420px] w-[420px] rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 text-xs tracking-[0.3em] text-white/60">
            <span className="h-[2px] w-6 bg-white/30" />
            <span>TESTIMONIALS</span>
          </div>

          <h2 className="mt-3 text-3xl font-semibold tracking-wide md:text-4xl">
            CLIENTS REVIEW
          </h2>
        </motion.div>

        {/* Desktop: 4 columns */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-4">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <div className={`px-6 py-2 ${i !== 0 ? "border-l border-white/10" : ""}`}>
                  <TiltCard t={t} />
                </div>
              </Reveal>
            ))}
          </div>

          {/* Arrows (animated, decorative like screenshot) */}
          <div className="mt-10 flex justify-center gap-3">
            <ArrowButton disabled>
              <motion.svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                animate={{ x: [0, -2, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <path
                  d="M14.5 5.5L8 12l6.5 6.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </ArrowButton>

            <ArrowButton disabled>
              <motion.svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                animate={{ x: [0, 2, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <path
                  d="M9.5 5.5L16 12l-6.5 6.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </ArrowButton>
          </div>
        </div>

        {/* Mobile/Tablet: Carousel */}
        <div className="lg:hidden">
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                data-card={i}
                className="min-w-[85%] snap-start"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
              >
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <TiltCard t={t} compact />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex justify-center gap-3">
            <ArrowButton onClick={prev} disabled={index === 0}>
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                <path
                  d="M14.5 5.5L8 12l6.5 6.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ArrowButton>

            <ArrowButton onClick={next} disabled={index === maxIndex}>
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                <path
                  d="M9.5 5.5L16 12l-6.5 6.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ArrowButton>
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------- Helpers -------------------- */

function Reveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  )
}

function TiltCard({ t, compact = false }) {
  const wrapRef = useRef(null)
  const [style, setStyle] = useState({})

  const onMove = (e) => {
    const el = wrapRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const midX = rect.width / 2
    const midY = rect.height / 2

    // small, premium tilt
    const rotateY = ((x - midX) / midX) * 8
    const rotateX = -((y - midY) / midY) * 8

    setStyle({
      transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`,
    })
  }

  const onLeave = () => {
    setStyle({
      transform: "perspective(900px) rotateX(0deg) rotateY(0deg)",
      transition: "transform 250ms ease",
    })
    // remove transition after it settles (so next hover feels snappy)
    setTimeout(() => setStyle({}), 260)
  }

  return (
    <div className="group [perspective:900px]">
      <div
        ref={wrapRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={[
          "relative rounded-2xl border border-white/10 bg-white/[0.02]",
          "p-6 transition-shadow duration-300",
          "hover:shadow-[0_20px_60px_-30px_rgba(255,255,255,0.25)]",
        ].join(" ")}
        style={style}
      >
        {/* glow ring */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute inset-0 rounded-2xl ring-1 ring-white/15" />
          <div className="absolute -inset-10 rounded-full bg-white/5 blur-2xl" />
        </div>

        <div className="relative">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-full ring-1 ring-white/15">
              <Image src={t.avatar} alt={t.name} fill className="object-cover" />
            </div>

            <div>
              <p className="text-sm font-semibold">{t.name}</p>
              <p className="text-xs text-white/50">{t.location}</p>
            </div>
          </div>

          <p className={`mt-6 text-sm leading-6 text-white/60 ${compact ? "" : ""}`}>
            {t.text}
          </p>

          {/* tiny “depth” line */}
          <div className="mt-6 h-px w-10 bg-white/10" />
        </div>
      </div>
    </div>
  )
}

function ArrowButton({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button"
      className={[
        "grid h-10 w-10 place-items-center rounded-full border border-white/15",
        "bg-white/[0.02] text-white/80 transition",
        "hover:bg-white/[0.06] hover:text-white",
        "active:scale-95",
        "disabled:cursor-not-allowed disabled:opacity-40",
      ].join(" ")}
      aria-label="carousel button"
    >
      {children}
    </button>
  )
}
