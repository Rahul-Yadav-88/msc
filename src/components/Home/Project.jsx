"use client"

import React, { useMemo, useRef, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

/**
 * NOTE about images:
 * You are using Unsplash URLs. If you want to use next/image for these remote images,
 * you must add "images.domains = ['images.unsplash.com']" in next.config.js.
 * To avoid config, this component uses <img> (works immediately).
 */

export default function ProjectsSection({
  // Top small label
  eyebrow = "Explore",

  // Main heading
  heading = "OUR PROJECTS",

  // Cards data
  projects = [
    {
      location: "California, USA",
      title: "Aurora Business Park",
      desc: "Commercial development with modern infrastructure planning, structural work, and quality execution.",
      image:
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80",
    },
    {
      location: "New York, USA",
      title: "Riverbend Eco Park",
      desc: "Eco-friendly public space development with civil support and sustainable site execution.",
      image:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=80",
    },
    {
      location: "New Jersey, USA",
      title: "EcoNest Apartments",
      desc: "Residential construction with foundation engineering and timeline-focused execution.",
      image:
        "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1400&q=80",
    },
  ],

  // Button
  buttonText = "View All Projects",
  buttonHref = "/Projects",
  showButton = true,

  // Layout
  maxWidthClass = "max-w-6xl",
  sectionClassName = "bg-white",
  paddingClassName = "py-16 sm:py-20",

  // 3D/animation tuning
  tiltIntensity = 14, // rotation amount
  lift = 7, // translateY on hover
  stagger = 120, // card reveal delay (ms)

  // Premium motion tuning
  floatAmount = 10, // px
  floatBaseDuration = 4.6, // seconds
} = {}) {
  const items = useMemo(() => projects, [projects])

  return (
    <section className={sectionClassName}>
      <div className={`mx-auto ${maxWidthClass} px-4 sm:px-6 ${paddingClassName}`}>
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs tracking-widest text-black/50">
            <span className="inline-flex gap-1">
              <span className="h-1 w-1 bg-black/30 rounded-full" />
              <span className="h-1 w-1 bg-black/30 rounded-full" />
              <span className="h-1 w-1 bg-black/30 rounded-full" />
            </span>
            <span className="uppercase">{eyebrow}</span>
          </div>

          <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-black">
            {heading}
          </h2>
        </div>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p, idx) => (
            <FloatingTiltCard
              key={`${p.title}-${idx}`}
              project={p}
              delayMs={idx * stagger}
              tiltIntensity={tiltIntensity}
              lift={lift}
              floatAmount={floatAmount}
              floatDuration={floatBaseDuration + (idx % 3) * 0.35}
              floatDelay={(idx % 3) * 0.18}
            />
          ))}
        </div>

        {/* Button bottom right */}
        {showButton && (
          <div className="mt-8 flex justify-end">
            <Link
              href={buttonHref}
              className="group inline-flex items-center gap-2 border border-black/20 px-6 py-3 text-sm text-black/70 hover:text-black hover:border-black/40 transition"
            >
              {buttonText}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        )}
      </div>

      {/* local keyframes for reveal */}
      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0px);
          }
        }
      `}</style>
    </section>
  )
}

/* ================== FLOATING + 3D TILT CARD ================== */
function FloatingTiltCard({
  project,
  delayMs = 0,
  tiltIntensity = 14,
  lift = 7,
  floatAmount = 10,
  floatDuration = 4.6,
  floatDelay = 0,
}) {
  // float is outer motion, tilt is inner
  return (
    <motion.div
      className="relative"
      animate={{ y: [0, -floatAmount, 0] }}
      transition={{
        duration: floatDuration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: floatDelay,
      }}
      style={{
        animation: `fadeUp 720ms ease forwards`,
        animationDelay: `${delayMs}ms`,
        opacity: 0,
        transform: "translateY(14px)",
      }}
    >
      <TiltCard project={project} tiltIntensity={tiltIntensity} lift={lift} />
    </motion.div>
  )
}

/* -------------------- 3D Tilt (no library) -------------------- */
function TiltCard({ project, tiltIntensity = 14, lift = 7 }) {
  const cardRef = useRef(null)
  const [style, setStyle] = useState({})
  const [isHover, setIsHover] = useState(false)

  const base = useMemo(
    () => ({
      transition: isHover
        ? "transform 70ms linear"
        : "transform 520ms cubic-bezier(.2,.8,.2,1)",
    }),
    [isHover]
  )

  const onMove = (e) => {
    const el = cardRef.current
    if (!el) return

    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top

    const rotateY = ((x - r.width / 2) / r.width) * tiltIntensity
    const rotateX = -((y - r.height / 2) / r.height) * tiltIntensity

    setIsHover(true)
    setStyle({
      transform: `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-${lift}px)`,
    })
  }

  const onLeave = () => {
    setIsHover(false)
    setStyle({
      transform: "perspective(1100px) rotateX(0deg) rotateY(0deg) translateY(0px)",
    })
  }

  return (
    <div style={{ perspective: "1100px" }}>
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={[
          "group relative overflow-hidden bg-white border border-black/10",
          "shadow-[0_18px_55px_rgba(0,0,0,0.10)]",
          "will-change-transform",
        ].join(" ")}
        style={{ ...base, ...style }}
      >
        {/* Image area */}
        <div className="relative h-72 w-full overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.09]"
            loading="lazy"
          />

          {/* ✅ Premium glass overlay with description */}
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-all duration-300 group-hover:opacity-100">
            {/* dark gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

            {/* glass panel */}
            <div className="absolute inset-x-0 bottom-0 p-5">
              <div className="translate-y-5 transition-transform duration-300 group-hover:translate-y-0">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
                  <p className="text-[11px] tracking-wide text-white/70">{project.location}</p>
                  <h3 className="mt-1 text-base font-semibold text-white">{project.title}</h3>
                  {project.desc ? (
                    <p className="mt-2 text-xs leading-5 text-white/85 line-clamp-3">
                      {project.desc}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {/* subtle shine */}
            <div className="absolute inset-0 opacity-70">
              <div className="absolute -left-1/2 top-[-40%] h-[220%] w-[150%] rotate-12 bg-gradient-to-r from-transparent via-white/18 to-transparent" />
            </div>
          </div>

          {/* edge highlight on hover */}
          <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
            <div className="absolute inset-0 ring-1 ring-white/10" />
          </div>
        </div>

        {/* Bottom info (HIDES on hover) */}
        <div className="bg-[#f4f5f7] px-6 py-6 transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-5">
          <p className="text-xs tracking-wide text-black/55">{project.location}</p>
          <h3 className="mt-2 text-lg font-semibold text-black/85">{project.title}</h3>
        </div>

        {/* premium outer ring */}
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
          <div className="absolute inset-0 ring-1 ring-black/15" />
        </div>
      </div>

      <div className="h-4" />
    </div>
  )
}
