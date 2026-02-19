"use client"

import Image from "next/image"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

const SERVICES = [
  {
    title: "Ready Mix Concrete Production",
    image: "/p1.png",
    desc: "High-quality ready mix concrete with consistent batching, timely dispatch, and site-ready delivery for all project scales.",
    Icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" {...props}>
        <path
          d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm11-1h5v3h-5v5h-3v-5H7v-3h5V7h3v5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity=".9"
        />
      </svg>
    ),
  },
  {
    title: "Earthwork & Subgrade Preparation",
    image: "/p3.png",
    desc: "Excavation, leveling, compaction, and subgrade preparation to ensure strong foundations and long-term stability.",
    Icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" {...props}>
        <path
          d="M12 3l8 4.5-8 4.5-8-4.5L12 3Zm8 8.5-8 4.5-8-4.5M20 16.5 12 21l-8-4.5"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity=".9"
        />
      </svg>
    ),
  },
  {
    title: "Infrastructure Development Support",
    image: "/p2.png",
    desc: "End-to-end civil support for roads, drainage, and utilities with skilled manpower, equipment, and on-site coordination.",
    Icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" {...props}>
        <path
          d="M4 20V7l8-4 8 4v13H4Zm4 0v-7h3v7H8Zm5 0v-10h3v10h-3Z"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity=".9"
        />
      </svg>
    ),
  },
  {
    title: "Industrial Civil Construction",
    image: "/p6.png",
    desc: "Civil works for warehouses, factories, and platforms with precise execution, safety focus, and schedule adherence.",
    Icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" {...props}>
        <path
          d="M7 7h10M7 12h6M7 17h10M5 4h14v16H5V4Z"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity=".9"
        />
      </svg>
    ),
  },
  {
    title: "Project Coordination & Execution",
    image: "/p5.png",
    desc: "On-site supervision, resource planning, and milestone tracking to keep work smooth, aligned, and on time.",
    Icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" {...props}>
        <path
          d="M4 10.5 12 4l8 6.5V20H4v-9.5Zm6 9.5v-6h4v6h-4Z"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity=".9"
        />
      </svg>
    ),
  },
  {
    title: "Quality Testing & Compliance",
    image: "/p4.png",
    desc: "Slump checks, cube testing, and quality documentation to ensure standards, approvals, and reliable performance.",
    Icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" {...props}>
        <path
          d="M4 20V6l8-2 8 2v14H4Zm4-2h8M8 8h8M8 12h8"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity=".9"
        />
      </svg>
    ),
  },
]

export default function ServicesSection({
  title = "Our Services",
  subtitle = "Our projects reflect precision, reliability, and structural excellence across highways, industrial platforms, and commercial developments.",
  autoMs = 3000, // ✅ 2–4 sec (set 2000 or 4000)
}) {
  const items = useMemo(() => SERVICES, [])
  const [active, setActive] = useState(0)
  const a = items[active]

  // ✅ autoplay + pause on hover
  const pausedRef = useRef(false)
  useEffect(() => {
    if (!items.length) return
    const id = setInterval(() => {
      if (pausedRef.current) return
      setActive((p) => (p + 1) % items.length)
    }, autoMs)
    return () => clearInterval(id)
  }, [autoMs, items.length])

  return (
    <section className="relative w-full overflow-hidden bg-white text-black">
      {/* background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-44 left-1/2 h-[520px] w-[980px] -translate-x-1/2 rounded-full bg-rose-500/10 blur-3xl" />
        <div className="absolute -bottom-56 right-[-180px] h-[520px] w-[520px] rounded-full bg-amber-400/10 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.08)_1px,transparent_1px)] [background-size:34px_34px]" />
      </div>

      {/* ✅ Wider container to reduce empty space on big screens */}
      <div className="relative mx-auto w-full max-w-7xl px-4 py-14 md:px-6 md:py-16 2xl:max-w-[1400px]">
        {/* header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs tracking-[0.28em] text-black/45">WHAT WE DO</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
              Our <span className="text-rose-600">Services</span>
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-black/60 md:text-[15px]">
              {subtitle}{" "}
              <span className="font-semibold text-black/70">(Auto: {Math.round(autoMs / 1000)}s)</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Pill>RMC</Pill>
            <Pill>Earthwork</Pill>
            <Pill>Execution</Pill>
            <Pill>QC</Pill>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* LEFT column */}
          <div
            className="lg:col-span-4"
            onMouseEnter={() => (pausedRef.current = true)}
            onMouseLeave={() => (pausedRef.current = false)}
          >
            {/* Index */}
            <div className="rounded-3xl border border-black/10 bg-white/70 p-4 shadow-sm backdrop-blur">
              <p className="px-2 pb-3 text-xs font-semibold tracking-[0.22em] text-black/45">
                SERVICE INDEX
              </p>

              <div className="space-y-2">
                {items.map((s, i) => {
                  const isActive = i === active
                  return (
                    <button
                      key={s.title}
                      type="button"
                      onClick={() => setActive(i)}
                      className={[
                        "group relative flex w-full items-start gap-3 rounded-2xl px-3 py-3 text-left transition outline-none",
                        isActive ? "bg-rose-50/70 ring-1 ring-rose-500/15" : "hover:bg-black/[0.02]",
                        "focus-visible:ring-2 focus-visible:ring-rose-500/30",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "mt-1 grid h-9 w-9 place-items-center rounded-2xl border",
                          isActive ? "border-rose-200 bg-white text-rose-700" : "border-black/10 bg-white text-black/65",
                        ].join(" ")}
                      >
                        <s.Icon className="h-6 w-6" />
                      </span>

                      <div className="min-w-0">
                        <div className="flex items-center justify-between gap-3">
                          <p className="truncate text-sm font-semibold text-black/85">{s.title}</p>
                          <span className={["text-sm font-semibold transition", isActive ? "text-rose-600" : "text-black/20"].join(" ")}>
                            →
                          </span>
                        </div>
                        <p className="mt-1 line-clamp-2 text-xs leading-5 text-black/55">{s.desc}</p>
                      </div>
                    </button>
                  )
                })}
              </div>

              <div className="mt-4 flex items-center justify-between px-2">
                <span className="text-xs text-black/55">Auto-rotate</span>
                <span className="text-xs font-semibold text-rose-600">Hover panel to pause</span>
              </div>
            </div>

            {/* ✅ Fill empty space: Quick facts + CTA (replaces that floating/hiding issue) */}
            <div className="mt-6 rounded-3xl border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs tracking-[0.22em] text-black/45">QUICK FACTS</p>
                  <p className="mt-2 text-base font-semibold text-black/85">Reliable execution</p>
                  <p className="mt-1 text-sm text-black/60">Consistent quality, disciplined workflow, timely delivery.</p>
                </div>
                <span className="rounded-full border border-black/10 bg-black/[0.02] px-3 py-1 text-[11px] font-semibold text-black/60">
                  Haryana + NCR
                </span>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                <Metric label="Quality" value="High" />
                <Metric label="Timeline" value="On-time" />
                <Metric label="Support" value="On-site" />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <SoftTag>Batching Control</SoftTag>
                <SoftTag>Site Coordination</SoftTag>
                <SoftTag>Documentation</SoftTag>
              </div>

              <button
                type="button"
                className="mt-5 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-black/75 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                Request a Quote →
              </button>
            </div>
          </div>

          {/* RIGHT column */}
          <div
            className="lg:col-span-8"
            onMouseEnter={() => (pausedRef.current = true)}
            onMouseLeave={() => (pausedRef.current = false)}
          >
            <StageCard service={a} />

            {/* ✅ ALL 6 cards visible */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mt-6 rounded-3xl border border-black/10 bg-white/70 p-4 shadow-sm backdrop-blur"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold tracking-[0.22em] text-black/45">GALLERY</p>
                <p className="text-xs text-black/55">Hover a card to preview</p>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((s, i) => (
                  <ThumbCard
                    key={s.title}
                    service={s}
                    active={i === active}
                    onEnter={() => setActive(i)}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Stage Card (big) ---------------- */

function StageCard({ service }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className="relative"
    >
      {/* ✅ keep only ONE clean shadow (no floating layers behind that hide content) */}
      <div className="pointer-events-none absolute inset-0 translate-y-5 rounded-[36px] bg-black/5 blur-2xl" />

      <div className="relative overflow-hidden rounded-[36px] border border-black/10 bg-white shadow-[0_28px_90px_-60px_rgba(0,0,0,0.45)]">
        {/* top bar */}
        <div className="relative flex items-center justify-between border-b border-black/10 bg-white/80 px-6 py-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl border border-black/10 bg-white text-rose-600">
              <service.Icon className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs tracking-[0.22em] text-black/45">SERVICE PREVIEW</p>
              <p className="text-sm font-semibold text-black/80">{service.title}</p>
            </div>
          </div>

          <div className="hidden gap-2 sm:flex">
            <Chip>Planning</Chip>
            <Chip>Execution</Chip>
            <Chip>QC</Chip>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* image */}
          <div className="relative lg:col-span-7">
            <div className="relative h-[320px] w-full bg-gray-100 sm:h-[380px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={service.image}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.55, ease: "easeInOut" }}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* badge */}
              <motion.div
                className="pointer-events-none absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/90 backdrop-blur"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-rose-300" />
                Auto Preview
              </motion.div>
            </div>
          </div>

          {/* content */}
          <div className="relative lg:col-span-5">
            <div className="flex h-full flex-col p-6">
              <p className="text-xs tracking-[0.24em] text-black/45">DETAILS</p>
              <h3 className="mt-2 text-xl font-bold tracking-tight text-black/90">{service.title}</h3>
              <p className="mt-3 text-sm leading-7 text-black/65">{service.desc}</p>

              <div className="mt-5 grid grid-cols-3 gap-3">
                <Metric label="Quality" value="High" />
                <Metric label="Speed" value="On-time" />
                <Metric label="Support" value="On-site" />
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs text-black/55">Structured workflow →</span>
                <button
                  type="button"
                  className="rounded-2xl border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-black/70 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  Get Quote →
                </button>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <SoftTag>Batching Control</SoftTag>
                <SoftTag>Site Coordination</SoftTag>
                <SoftTag>Quality Docs</SoftTag>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ---------------- Thumbnails ---------------- */

function ThumbCard({ service, active, onEnter }) {
  return (
    <button
      type="button"
      onMouseEnter={onEnter}
      onFocus={onEnter}
      className={[
        "group relative w-full overflow-hidden rounded-3xl border text-left outline-none transition",
        active
          ? "border-rose-200 bg-rose-50/60 shadow-[0_18px_60px_-45px_rgba(0,0,0,0.28)]"
          : "border-black/10 bg-white shadow-[0_14px_40px_-34px_rgba(0,0,0,0.22)] hover:bg-black/[0.02]",
        "focus-visible:ring-2 focus-visible:ring-rose-500/30",
      ].join(" ")}
    >
      <div className="relative h-[140px] w-full bg-gray-100">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          sizes="(max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm font-semibold text-black/85 line-clamp-2">{service.title}</p>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl border border-black/10 bg-white text-black/70">
            <service.Icon className="h-6 w-6" />
          </span>
        </div>
        <p className="mt-2 text-xs leading-5 text-black/55 line-clamp-2">{service.desc}</p>
      </div>

      <div
        className={[
          "h-1 w-full transition",
          active ? "bg-gradient-to-r from-rose-500/70 via-rose-400/30 to-transparent" : "bg-transparent",
        ].join(" ")}
      />
    </button>
  )
}

/* ---------------- Helpers ---------------- */

function Pill({ children }) {
  return (
    <span className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-[11px] font-semibold text-black/60 shadow-sm backdrop-blur">
      {children}
    </span>
  )
}
function Chip({ children }) {
  return (
    <span className="rounded-full border border-black/10 bg-black/[0.02] px-3 py-1 text-[11px] font-semibold text-black/60">
      {children}
    </span>
  )
}
function Metric({ label, value }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-3">
      <p className="text-[11px] tracking-wide text-black/45">{label}</p>
      <p className="mt-1 text-sm font-semibold text-black/80">{value}</p>
    </div>
  )
}
function SoftTag({ children }) {
  return (
    <span className="rounded-full border border-black/10 bg-black/[0.02] px-3 py-1 text-[11px] font-semibold text-black/60">
      {children}
    </span>
  )
}
