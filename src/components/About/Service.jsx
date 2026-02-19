"use client"

import React, { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"

/* ---------- Simple line-icons (same types you used) ---------- */
function ServiceIcon({ type = "grid" }) {
  const cls = "h-5 w-5"
  if (type === "layers") {
    return (
      <svg
        className={cls}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      >
        <path d="M12 3l9 5-9 5-9-5 9-5z" />
        <path d="M3 12l9 5 9-5" />
        <path d="M3 16l9 5 9-5" />
      </svg>
    )
  }
  if (type === "building") {
    return (
      <svg
        className={cls}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      >
        <path d="M4 21V3h10v18" />
        <path d="M14 9h6v12" />
        <path d="M8 7h2M8 11h2M8 15h2" />
        <path d="M17 13h2M17 17h2" />
      </svg>
    )
  }
  return (
    <svg
      className={cls}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path d="M4 4h7v7H4V4zM13 4h7v7h-7V4zM4 13h7v7H4v-7zM13 13h7v7h-7v-7z" />
    </svg>
  )
}

const listWrap = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.12 } },
}
const listItem = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 140, damping: 18 },
  },
}

export default function OurServices() {
  // ✅ Your SAME data
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

  const [active, setActive] = useState(0)
  const a = services[active]

  // ✅ Auto change every 6 seconds
  useEffect(() => {
    if (!services?.length) return

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % services.length)
    }, 6000) // 6000ms = 6 seconds

    return () => clearInterval(interval)
  }, [services.length])

  return (
    <section
      id="our-services"
      className="relative w-full overflow-hidden bg-white py-16 sm:py-20"
    >
      {/* light modern background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-rose-500/8 blur-3xl" />
        <div className="absolute -bottom-56 right-[-180px] h-[520px] w-[520px] rounded-full bg-[#d8b07a]/10 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.08)_1px,transparent_1px)] [background-size:34px_34px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs tracking-[0.28em] text-black/45">WHAT WE DO</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-black">
              Our <span className="text-rose-600">Services</span>
            </h2>
            <p className="mt-3 max-w-2xl text-sm sm:text-base text-black/60">
              We provide reliable, precision-driven construction and engineering solutions backed by advanced technology and strict quality control. From concrete production to large-scale infrastructure support, we build systems designed to last.
            </p>
          </div>

          <Link
            href="/Services"
            className="group inline-flex items-center gap-3 rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-black/80 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            View All Services
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* Unique layout: Live preview */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* LEFT: Preview panel */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ type: "spring", stiffness: 130, damping: 18 }}
              className="relative overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_28px_90px_-60px_rgba(0,0,0,0.45)]"
            >
              <div className="relative h-[320px] sm:h-[420px]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={a.image}
                    src={a.image}
                    alt={a.title}
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  />
                </AnimatePresence>

                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                {/* preview content */}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/18 px-3 py-1 text-[11px] font-semibold text-white/90 backdrop-blur">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-300" />
                    Live Preview
                  </div>

                  <h3 className="mt-3 text-2xl font-bold tracking-tight text-white">
                    {a.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/85">
                    {a.desc}
                  </p>

                  {/* small meta row */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] text-white/85 backdrop-blur">
                      Quality Control
                    </span>
                    <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] text-white/85 backdrop-blur">
                      On-site Coordination
                    </span>
                    <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] text-white/85 backdrop-blur">
                      Timely Execution
                    </span>
                  </div>
                </div>
              </div>

              {/* bottom strip */}
              <div className="flex items-center justify-between px-6 py-4">
                <p className="text-xs text-black/55">
                  Tip: Always prioritize quality, compliance, and timely execution to ensure long-lasting infrastructure.
                </p>
                <span className="text-xs font-semibold text-rose-600">
                  Modern workflow →
                </span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Interactive list */}
          <div className="lg:col-span-5">
            <motion.div
              variants={listWrap}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="space-y-4"
            >
              {services.map((s, idx) => {
                const isActive = idx === active
                return (
                  <motion.button
                    key={s.title}
                    type="button"
                    variants={listItem}
                    // ✅ Optional: keep hover switch (remove if you want ONLY autoplay)
                    onMouseEnter={() => setActive(idx)}
                    onFocus={() => setActive(idx)}
                    className={[
                      "relative w-full overflow-hidden rounded-3xl border text-left transition",
                      isActive
                        ? "border-rose-200 bg-rose-50/60 shadow-[0_18px_60px_-45px_rgba(0,0,0,0.35)]"
                        : "border-black/10 bg-white hover:bg-black/[0.02]",
                    ].join(" ")}
                  >
                    {/* active accent */}
                    <div
                      className={[
                        "absolute left-0 top-0 h-full w-1 transition",
                        isActive ? "bg-rose-500" : "bg-transparent",
                      ].join(" ")}
                    />

                    <div className="p-5">
                      <div className="flex items-start gap-4">
                        <div
                          className={[
                            "grid h-11 w-11 place-items-center rounded-2xl border",
                            isActive
                              ? "border-rose-200 bg-white text-rose-700"
                              : "border-black/10 bg-white text-black/70",
                          ].join(" ")}
                        >
                          <ServiceIcon type={s.icon} />
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center justify-between gap-3">
                            <p className="truncate text-base font-semibold text-black/90">
                              {s.title}
                            </p>
                            <span
                              className={[
                                "text-sm font-semibold transition",
                                isActive ? "text-rose-600" : "text-black/30",
                              ].join(" ")}
                            >
                              →
                            </span>
                          </div>

                          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-black/60">
                            {s.desc}
                          </p>

                          {/* micro tags */}
                          <div className="mt-3 flex flex-wrap gap-2">
                            <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] text-black/55">
                              Execution
                            </span>
                            <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] text-black/55">
                              Planning
                            </span>
                            <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] text-black/55">
                              Support
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                )
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
