"use client"

import React, { useEffect, useMemo, useState } from "react"
import Link from "next/link"

// ✅ React 19 safe tilt (no refs)
function useTilt(max = 8) {
  const [style, setStyle] = useState({
    transform: "perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
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
      transform: `perspective(1200px) rotateX(${rX}deg) rotateY(${rY}deg) translateZ(8px)`,
    })
  }

  const onLeave = () => {
    setStyle({
      transform: "perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
    })
  }

  return { style, onMove, onLeave }
}

// ✅ Reveal on scroll
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

// Simple line-icons (no library)
function ServiceIcon({ type = "grid" }) {
  const cls = "h-6 w-6 text-rose-300"
  if (type === "layers") {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 3l9 5-9 5-9-5 9-5z" />
        <path d="M3 12l9 5 9-5" />
        <path d="M3 16l9 5 9-5" />
      </svg>
    )
  }
  if (type === "building") {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 21V3h10v18" />
        <path d="M14 9h6v12" />
        <path d="M8 7h2M8 11h2M8 15h2" />
        <path d="M17 13h2M17 17h2" />
      </svg>
    )
  }
  // default "blueprint/grid"
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 4h7v7H4V4zM13 4h7v7h-7V4zM4 13h7v7H4v-7zM13 13h7v7h-7v-7z" />
    </svg>
  )
}

function ServiceCard({ item, index, inView }) {
  const tilt = useTilt(7)

  return (
    <article
      onMouseMove={tilt.onMove}
      onMouseLeave={tilt.onLeave}
      style={tilt.style}
      className={[
        "group relative border border-zinc-200 bg-zinc-50",
        "p-6 transition-transform duration-200 will-change-transform",
        "hover:bg-white",
        inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
      ].join(" ")}
      aria-label={item.title}
    >
      <div
        className="transition-all duration-700"
        style={{ transitionDelay: inView ? `${140 + index * 120}ms` : "0ms" }}
      >
        {/* title row */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-medium text-zinc-900">{item.title}</h3>

          {/* small icon top-right */}
          <div className="grid h-10 w-10 place-items-center rounded-lg border border-rose-100 bg-white/70">
            <ServiceIcon type={item.icon} />
          </div>
        </div>

        {/* image (with hover description overlay) */}
        <div className="mt-6 overflow-hidden rounded-lg border border-zinc-200 bg-white relative">
          <img
            src={item.image}
            alt={item.title}
            className="h-[200px] w-full object-cover transition duration-700 group-hover:scale-[1.05]"
          />

          {/* ✅ Overlay (only when hovering IMAGE area) */}
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {/* gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

            {/* text */}
            <div className="absolute inset-x-0 bottom-0 p-4">
              <div className="translate-y-3 transition-transform duration-300 group-hover:translate-y-0">
                <p className="text-[11px] tracking-[0.18em] text-white/70 uppercase">
                  Service
                </p>
                <p className="mt-1 text-sm font-semibold text-white">{item.title}</p>
                {item.desc ? (
                  <p className="mt-2 text-xs leading-5 text-white/85 line-clamp-3">
                    {item.desc}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {/* subtle 3D shine */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute -left-20 top-10 h-32 w-32 rounded-full bg-white/50 blur-2xl" />
        </div>
      </div>
    </article>
  )
}

export default function OurServices() {
  const inView = useInView("our-services", 0.15)

  const services = useMemo(
    () => [
      {
        title: "Structural & Concrete Engineering",
        icon: "grid",
        image: "/h7.png",
        desc: "Concrete planning, structural execution, and site-ready engineering support for strong, durable builds.",
      },
      {
        title: "General Contracting & Earthwork",
        icon: "layers",
        image: "/h9.png",
        desc: "Earthwork, excavation, leveling, and contractor coordination to ensure smooth and timely construction progress.",
      },
      {
        title: "Commercial & Industrial Construction Support",
        icon: "building",
        image: "/h5.png",
        desc: "Civil and RCC support for warehouses and industrial sites with quality control and milestone-based execution.",
      },
    ],
    []
  )

  return (
    <section id="our-services" className="w-full bg-zinc-50 py-16">
      <div className="mx-auto max-w-6xl px-4">
        {/* Heading */}
        <div
          className={[
            "mb-10 transition-all duration-700",
            inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
          ].join(" ")}
        >
          <p className="text-xs tracking-[0.25em] text-zinc-400">WHAT WE DO</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight text-zinc-900">
            OUR SERVICES
          </h2>
        </div>

        {/* Grid wrapper */}
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {services.map((item, idx) => (
              <div
                key={item.title}
                className={[
                  "border-zinc-200",
                  idx === 0 ? "" : "md:border-l",
                  "border-t md:border-t-0",
                  idx === 0 ? "border-t-0" : "",
                ].join(" ")}
              >
                <ServiceCard item={item} index={idx} inView={inView} />
              </div>
            ))}
          </div>
        </div>

        {/* Button */}
        <div
          className={[
            "mt-10 flex justify-end transition-all duration-700",
            inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
          ].join(" ")}
          style={{ transitionDelay: inView ? "520ms" : "0ms" }}
        >
          <Link
            href="/Services"
            className="group inline-flex items-center gap-3 rounded-md border border-zinc-400 bg-transparent px-5 py-3 text-sm font-medium text-zinc-900 transition
                       hover:-translate-y-1 hover:bg-white hover:shadow-md active:translate-y-0"
          >
            View All Services
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
