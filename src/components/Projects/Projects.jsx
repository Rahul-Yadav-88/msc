"use client"

import Image from "next/image"
import { useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"

export default function OurProjects({
  title = "Our Projects",
  projects = [
    { location: "California, USA", name: "Aurora Business Park", image: "/projects/p1.jpg" },
    { location: "New York, USA", name: "Riverbend Eco Park", image: "/projects/p2.jpg" },
    { location: "New Jersey, USA", name: "EcoNest Apartments", image: "/projects/p3.jpg" },
    { location: "Texas, USA", name: "Skyline Tower", image: "/projects/p4.jpg" },
    { location: "Dallas, USA", name: "Downtown Business Center", image: "/projects/p5.jpg" },
    { location: "Georgia, USA", name: "Riverside Villas", image: "/projects/p6.jpg" },
  ],
  buttonText = "Next",
  onNext, // optional callback
}) {
  const items = useMemo(() => projects, [projects])

  return (
    <section className="w-full bg-white text-black">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.45 }}
          className="text-4xl font-medium"
        >
          {title}
        </motion.h2>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {items.slice(0, 6).map((p, i) => (
            <Reveal key={`${p.name}-${i}`} delay={i * 0.06}>
              <FloatingProjectCard project={p} index={i} />
            </Reveal>
          ))}
        </div>

        {/* Next button bottom-right */}
        <div className="mt-10 flex justify-end">
          <button
            type="button"
            onClick={onNext}
            className="group inline-flex items-center gap-3 border border-black/35 bg-white px-5 py-2.5 text-sm font-medium transition hover:bg-black hover:text-white active:scale-[0.98]"
          >
            {buttonText}
            <span className="transition group-hover:translate-x-0.5">→</span>
          </button>
        </div>
      </div>
    </section>
  )
}

/* -------------------- Card -------------------- */

function FloatingProjectCard({ project, index }) {
  // subtle, staggered floating so all cards don't move together
  const floatDelay = (index % 3) * 0.2
  const floatDuration = 4.6 + (index % 4) * 0.3

  return (
    <motion.div
      className="relative"
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: floatDuration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: floatDelay,
      }}
    >
      <TiltCard>
        <div className="overflow-hidden bg-white shadow-[0_22px_60px_-38px_rgba(0,0,0,0.45)]">
          {/* Image */}
          <div className="relative h-[250px] w-full bg-gray-100">
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover transition duration-700 group-hover:scale-[1.06]"
              sizes="(max-width: 1024px) 50vw, 33vw"
            />

            {/* subtle shine */}
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute -top-24 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-white/35 blur-2xl" />
            </div>
          </div>

          {/* Text block like screenshot */}
          <div className="bg-gray-50 px-5 py-4">
            <p className="text-[11px] tracking-wide text-black/55">{project.location}</p>
            <p className="mt-1 text-sm font-semibold text-black/85">{project.name}</p>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  )
}

/* -------------------- 3D Tilt Wrapper -------------------- */

function TiltCard({ children }) {
  const ref = useRef(null)
  const [style, setStyle] = useState({})

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top

    const rx = -((y - r.height / 2) / (r.height / 2)) * 7
    const ry = ((x - r.width / 2) / (r.width / 2)) * 7

    setStyle({
      transform: `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`,
    })
  }

  const onLeave = () => {
    setStyle({
      transform: "perspective(900px) rotateX(0deg) rotateY(0deg)",
      transition: "transform 220ms ease",
    })
    setTimeout(() => setStyle({}), 230)
  }

  return (
    <div className="group [perspective:900px]">
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={style}
        className={[
          "transition-transform duration-200",
          "hover:-translate-y-1", // extra lift on hover
        ].join(" ")}
      >
        {children}
      </div>
    </div>
  )
}

/* -------------------- Reveal -------------------- */

function Reveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  )
}
