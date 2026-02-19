"use client"

import Image from "next/image"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

export default function OurProjects({
  title = "Our Projects",
  projects = [
    {
      location: "Haryana",
      name: "KGP Expressway",
      image: "/s5.png",
      desc: "Ready mix concrete supply and batching support with consistent quality and timely dispatch.",
    },
    {
      location: "Haryana",
      name: "NH-152D Bharat Mala Project",
      image: "/s4.png",
      desc: "Concrete production + on-site coordination to meet tight timelines and compliance standards.",
    },
    {
      location: "Jhajjar",
      name: "Industrial Warehouse Platform",
      image: "/s6.png",
      desc: "Platform construction support including earthwork preparation, leveling, and RCC works.",
    },
    {
      location: "Rohtak",
      name: "Commercial Complex Foundation",
      image: "/s2.png",
      desc: "Foundation and base works with quality testing, cube trials, and site supervision.",
    },
    {
      location: "Bahadurgarh",
      name: "Industrial Road Development",
      image: "/s1.png",
      desc: "Subgrade prep, compaction, and concrete supply for durable industrial road development.",
    },
    {
      location: "NCR Region",
      name: "Warehouse Civil Support",
      image: "/s3.png",
      desc: "Civil + RCC support for warehouse development with planning, execution, and QC checks.",
    },
  ],
  buttonText = "Next",
  onNext,
  autoMs = 3000, // ✅ big image auto-change 2–4 sec (default 3 sec)
}) {
  const items = useMemo(() => projects.slice(0, 6), [projects])
  const [active, setActive] = useState(0)

  // ✅ Autoplay featured image (pause on hover grid)
  const pausedRef = useRef(false)

  useEffect(() => {
    if (!items.length) return
    const id = setInterval(() => {
      if (pausedRef.current) return
      setActive((p) => (p + 1) % items.length)
    }, autoMs)

    return () => clearInterval(id)
  }, [items.length, autoMs])

  const pause = () => (pausedRef.current = true)
  const resume = () => (pausedRef.current = false)

  return (
    <section className="relative w-full overflow-hidden bg-white text-black">
      {/* modern background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-44 left-1/2 h-[520px] w-[920px] -translate-x-1/2 rounded-full bg-rose-500/10 blur-3xl" />
        <div className="absolute -bottom-56 right-[-160px] h-[520px] w-[520px] rounded-full bg-amber-400/10 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.08)_1px,transparent_1px)] [background-size:34px_34px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-14 md:px-6">
        {/* Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs tracking-[0.28em] text-black/45">RECENT WORK</p>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.45 }}
              className="mt-3 text-4xl font-extrabold tracking-tight"
            >
              Our <span className="text-rose-600">Projects</span>
            </motion.h2>

            <p className="mt-3 max-w-2xl text-sm sm:text-base text-black/60">
              Our projects reflect precision, reliability, and structural excellence across highways, industrial platforms, and commercial developments.
              
            </p>
          </div>

          <button
            type="button"
            onClick={onNext}
            className="group inline-flex items-center gap-3 rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-black/80 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:scale-[0.99]"
          >
            {buttonText}
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </div>

        {/* Layout */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* LEFT: Featured + extra panel to fill empty space ✅ */}
          <div className="lg:col-span-5">
            <div className="flex h-full flex-col gap-6">
              <FeaturedPanel project={items[active]} />
              <HighlightsPanel activeProject={items[active]} />
            </div>
          </div>

          {/* RIGHT: Cards */}
          <div className="lg:col-span-7">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
              }}
              className="grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2"
              onMouseEnter={pause}
              onMouseLeave={resume}
              onFocus={pause}
              onBlur={resume}
            >
              {items.map((p, i) => (
                <motion.div
                  key={`${p.name}-${i}`}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { type: "spring", stiffness: 130, damping: 18 },
                    },
                  }}
                  className="h-full"
                >
                  <ProjectCard
                    project={p}
                    index={i}
                    active={i === active}
                    onEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------- Featured Panel -------------------- */

function FeaturedPanel({ project }) {
  if (!project) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className="relative overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_28px_90px_-60px_rgba(0,0,0,0.45)]"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-rose-400/25 blur-2xl" />
      </div>

      {/* ✅ a bit shorter so we have space for highlights panel */}
      <div className="relative h-[420px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={project.image}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
          >
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-[11px] font-semibold text-white/90 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-300" />
            Featured Project
          </div>

          <h3 className="mt-3 text-2xl font-bold tracking-tight text-white">{project.name}</h3>
          <p className="mt-1 text-sm text-white/80">{project.location}</p>

          {project.desc ? (
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/85">{project.desc}</p>
          ) : null}
        </div>
      </div>

      <div className="flex items-center justify-between px-6 py-4">
        <p className="text-xs text-black/55">Auto-rotates • Hover grid to pause</p>
        <span className="text-xs font-semibold text-rose-600">Case studies →</span>
      </div>
    </motion.div>
  )
}

/* -------------------- NEW: Highlights Panel (fills empty space) -------------------- */

function HighlightsPanel({ activeProject }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.05 }}
      className="relative overflow-hidden rounded-3xl border border-black/10 bg-white p-6 shadow-[0_22px_60px_-38px_rgba(0,0,0,0.35)]"
    >
      {/* subtle glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-rose-500/10 blur-3xl" />
        <div className="absolute -left-24 -bottom-24 h-56 w-56 rounded-full bg-amber-400/10 blur-3xl" />
      </div>

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.26em] text-black/45">PROJECT HIGHLIGHTS</p>
            <p className="mt-2 text-lg font-semibold text-black/85">
              Execution snapshot
            </p>
            <p className="mt-1 text-sm text-black/60">
              Fast overview for{" "}
              <span className="font-semibold text-black/70">{activeProject?.name}</span>
            </p>
          </div>

          <span className="rounded-full border border-black/10 bg-black/[0.02] px-3 py-1 text-[11px] font-semibold text-black/60">
            Updated
          </span>
        </div>

        {/* stats */}
        <div className="mt-5 grid grid-cols-3 gap-3">
          <StatCard label="Dispatch" value="On-time" />
          <StatCard label="QC Checks" value="Strict" />
          <StatCard label="Support" value="On-site" />
        </div>

        {/* timeline-ish row */}
        <div className="mt-5 rounded-2xl border border-black/10 bg-gray-50 p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-black/70">Workflow</p>
            <p className="text-xs text-black/45">Planning → Execution → QC</p>
          </div>

          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-black/10">
            <motion.div
              className="h-full w-2/3 rounded-full bg-rose-500/70"
              initial={{ width: "18%" }}
              whileInView={{ width: "70%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>

          <p className="mt-3 text-xs text-black/55">
            Need similar execution support?{" "}
            <span className="font-semibold text-rose-600">Let’s plan it</span>.
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-3">
      <p className="text-[11px] tracking-wide text-black/45">{label}</p>
      <p className="mt-1 text-sm font-semibold text-black/80">{value}</p>
    </div>
  )
}

/* -------------------- Project Card (NO TILT) -------------------- */

function ProjectCard({ project, index, active, onEnter, onFocus }) {
  const floatDelay = (index % 3) * 0.18
  const floatDuration = 4.8 + (index % 4) * 0.28

  return (
    <motion.div
      className="relative h-full"
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: floatDuration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: floatDelay,
      }}
    >
      <div className="pointer-events-none absolute inset-0 translate-y-3 rounded-[28px] bg-black/5 blur-xl" />

      <div
        tabIndex={0}
        onMouseEnter={onEnter}
        onFocus={onFocus}
        className={[
          "group relative flex h-full flex-col overflow-hidden rounded-[28px] border bg-white outline-none transition",
          "border-black/10 shadow-[0_22px_60px_-38px_rgba(0,0,0,0.45)]",
          "hover:-translate-y-1 hover:shadow-[0_34px_90px_-60px_rgba(0,0,0,0.55)]",
          "focus-visible:ring-2 focus-visible:ring-rose-500/40",
          active ? "ring-1 ring-rose-500/25" : "",
        ].join(" ")}
      >
        <div className="relative h-[240px] w-full shrink-0 bg-gray-100">
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover transition duration-700 group-hover:scale-[1.06]"
            sizes="(max-width: 1024px) 50vw, 33vw"
          />

          <motion.div
            aria-hidden
            className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0"
            whileHover={{ x: ["-40%", "240%"], opacity: [0, 1, 0] }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
          />

          <div className="absolute left-4 top-4">
            <span
              className={[
                "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold backdrop-blur",
                active
                  ? "border-rose-200 bg-rose-50/80 text-rose-700"
                  : "border-black/10 bg-white/75 text-black/70",
              ].join(" ")}
            >
              <span className={["h-1.5 w-1.5 rounded-full", active ? "bg-rose-500" : "bg-black/30"].join(" ")} />
              Project
            </span>
          </div>

          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <div className="translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
                <p className="text-[11px] tracking-wide text-white/70">{project.location}</p>
                <p className="mt-1 text-sm font-semibold text-white">{project.name}</p>
                {project.desc ? (
                  <p className="mt-2 text-xs leading-5 text-white/85">{project.desc}</p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10" />
        </div>

        <div className="relative flex flex-1 flex-col bg-gray-50 px-5 py-4">
          <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

          <p className="text-[11px] tracking-wide text-black/55">{project.location}</p>

          <div className="mt-1 flex items-start justify-between gap-3">
            <p className="text-sm font-semibold text-black/85">{project.name}</p>
            <span className={["text-sm font-semibold transition", active ? "text-rose-600" : "text-black/25"].join(" ")}>
              →
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] text-black/55">
              Execution
            </span>
            <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] text-black/55">
              Planning
            </span>
            <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] text-black/55">
              QC
            </span>
          </div>
        </div>

        <div
          className={[
            "h-1 w-full transition",
            active ? "bg-gradient-to-r from-rose-500/70 via-rose-400/30 to-transparent" : "bg-transparent",
          ].join(" ")}
        />
      </div>
    </motion.div>
  )
}
