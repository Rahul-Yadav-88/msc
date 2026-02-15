"use client"

import React, { useMemo, useRef, useState } from "react"
import Link from "next/link"

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
      image:
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80",
    },
    {
      location: "New York, USA",
      title: "Riverbend Eco Park",
      image:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=80",
    },
    {
      location: "New Jersey, USA",
      title: "EcoNest Apartments",
      image:
        "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1400&q=80",
    },
  ],

  // Button
  buttonText = "View All Projects",
  buttonHref = "/projects",
  showButton = true,

  // Layout
  maxWidthClass = "max-w-6xl",
  sectionClassName = "bg-white",
  paddingClassName = "py-16 sm:py-20",

  // 3D/animation tuning
  tiltIntensity = 14, // rotation amount
  lift = 6, // translateY on hover
  stagger = 90, // card reveal delay
} = {}) {
  return (
    <section className={sectionClassName}>
      <div className={`mx-auto ${maxWidthClass} px-4 sm:px-6 ${paddingClassName}`}>
        {/* Header */}
        <div className="mb-4">
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
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, idx) => (
            <TiltCard
              key={`${p.title}-${idx}`}
              project={p}
              delay={idx * stagger}
              tiltIntensity={tiltIntensity}
              lift={lift}
            />
          ))}
        </div>

        {/* Button bottom right */}
        {showButton && (
          <div className="mt-6 flex justify-end">
            <Link
              href={buttonHref}
              className="group inline-flex items-center gap-2 border border-black/20 px-5 py-3 text-sm text-black/70 hover:text-black hover:border-black/40 transition"
            >
              {buttonText}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

/* -------------------- 3D Tilt Card (no library) -------------------- */
function TiltCard({ project, delay = 0, tiltIntensity = 14, lift = 6 }) {
  const cardRef = useRef(null)
  const [style, setStyle] = useState({})
  const [isHover, setIsHover] = useState(false)

  const base = useMemo(
    () => ({
      transition: isHover
        ? "transform 60ms linear"
        : "transform 500ms cubic-bezier(.2,.8,.2,1)",
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
      transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-${lift}px)`,
    })
  }

  const onLeave = () => {
    setIsHover(false)
    setStyle({
      transform: "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)",
    })
  }

  return (
    <div
      style={{
        perspective: "1000px",
        animation: `fadeUp 750ms ease forwards`,
        animationDelay: `${delay}ms`,
        opacity: 0,
        transform: "translateY(14px)",
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group relative bg-white border border-black/10 shadow-[0_10px_30px_rgba(0,0,0,0.06)] will-change-transform"
        style={{ ...base, ...style }}
      >
        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          />

          {/* subtle shine layer */}
          <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
            <div className="absolute -inset-[40%] bg-gradient-to-br from-white/35 via-white/0 to-white/0 rotate-12" />
          </div>
        </div>

        {/* Bottom info */}
        <div className="bg-[#f4f5f7] px-6 py-6">
          <p className="text-xs tracking-wide text-black/55">{project.location}</p>
          <h3 className="mt-2 text-lg font-semibold text-black/85">
            {project.title}
          </h3>
        </div>

        {/* edge highlight */}
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
          <div className="absolute inset-0 ring-1 ring-black/10" />
        </div>
      </div>

      <div className="h-3" />
    </div>
  )
}
