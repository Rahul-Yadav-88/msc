"use client"

import React, { useMemo, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

/* ---------------- Animation Variants ---------------- */

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 18,
    },
  },
}

/* ---------------- Main Section ---------------- */

export default function ProjectsSection({
  eyebrow = "Explore",
  heading = "OUR PROJECTS",

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

  buttonText = "View All Projects",
  buttonHref = "/Projects",
  showButton = true,

  maxWidthClass = "max-w-6xl",
  sectionClassName = "bg-white",
  paddingClassName = "py-16 sm:py-20",
} = {}) {
  const items = useMemo(() => projects, [projects])

  return (
    <section className={`${sectionClassName} relative overflow-hidden`}>
      {/* Light background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[#d8b07a]/10 blur-3xl" />
      </div>

      <div className={`relative mx-auto ${maxWidthClass} px-4 sm:px-6 ${paddingClassName}`}>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs tracking-widest text-black/50">
            <span className="h-1 w-1 rounded-full bg-black/30" />
            <span className="uppercase">{eyebrow}</span>
          </div>

          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-black">
            {heading}
          </h2>
        </div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((p, idx) => (
            <motion.div key={`${p.title}-${idx}`} variants={item}>
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </motion.div>

        {/* Button */}
        {showButton && (
          <div className="mt-10 flex justify-end">
            <Link
              href={buttonHref}
              className="group inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-6 py-3 text-sm font-medium text-black/80 shadow-sm hover:shadow-md hover:border-black/20 transition"
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

/* ---------------- Card ---------------- */

function ProjectCard({ project }) {
  const tilt = useTilt(6)

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="relative"
    >
      <div
        onMouseMove={tilt.onMove}
        onMouseLeave={tilt.onLeave}
        style={tilt.style}
        className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_20px_60px_-40px_rgba(0,0,0,0.4)] transition-all duration-300"
      >
        {/* Image */}
        <div className="relative h-72 w-full overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            loading="lazy"
          />

          {/* Soft dark overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

          {/* Glass hover description */}
          <div className="absolute inset-x-0 bottom-0 p-5 opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <div className="rounded-xl border border-white/50 bg-white/70 backdrop-blur-md p-4 shadow-md">
              <p className="text-xs text-black/50">{project.location}</p>
              <h3 className="mt-1 text-base font-semibold text-black/85">
                {project.title}
              </h3>
              {project.desc && (
                <p className="mt-2 text-xs text-black/65 line-clamp-3">
                  {project.desc}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom content */}
        <div className="px-6 py-6 bg-[#f4f5f7] transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-6">
          <p className="text-xs text-black/50">{project.location}</p>
          <h3 className="mt-2 text-lg font-semibold text-black/85">
            {project.title}
          </h3>
        </div>
      </div>

      {/* Shadow base */}
      <div className="pointer-events-none mx-auto mt-4 h-4 w-[70%] rounded-full bg-black/10 blur-xl" />
    </motion.div>
  )
}

/* ---------------- Tilt (React 19 safe) ---------------- */

function useTilt(max = 6) {
  const [style, setStyle] = useState({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
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
      transform: `perspective(1000px) rotateX(${rX}deg) rotateY(${rY}deg)`,
    })
  }

  const onLeave = () => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
      transition: "transform 220ms ease",
    })
    setTimeout(() => {
      setStyle({
        transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
      })
    }, 230)
  }

  return { style, onMove, onLeave }
}
