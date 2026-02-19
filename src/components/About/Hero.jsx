"use client"

import Image from "next/image"
import Link from "next/link"
import React, { useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

/**
 * ✅ Modern + Unique UI
 * ✅ 3D FEEL (depth layers, floating, stacked cards, glass chips) — NO TILT
 * ✅ Big image auto-changes (every 3s by default) + pauses on hover
 * ✅ Clean alignment + premium layout
 */

export default function OurStory({
  title = "Our Story",
  eyebrow = "ABOUT US",
  heading = "Building Infrastructure with Precision, Discipline, and Integrity.",
  description = "M.S. Construction is a trusted infrastructure and Ready Mix Concrete partner operating across Haryana and NCR. Established with a commitment to quality and structured execution, we specialize in batching plant operations, earthwork development, and civil infrastructure support.",
  buttonText = "Explore Projects",
  buttonHref = "/Projects",
  images = ["/a1.png", "/a2.png", "/h4.png"], // ✅ you can pass 2 or more images
  points = [
    "Consistent concrete quality with automated batching systems",
    "Timely dispatch supported by modern transit mixer fleet",
    "Strong site supervision and structured execution",
    "Commitment to safety and industry compliance",
  ],
  autoMs = 3000, // ✅ 2–4 sec (set 2000 or 4000)
}) {
  const gallery = useMemo(() => images.filter(Boolean), [images])
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  // autoplay (no tools; lightweight)
  React.useEffect(() => {
    if (!gallery.length) return
    const id = setInterval(() => {
      if (paused) return
      setActive((p) => (p + 1) % gallery.length)
    }, autoMs)
    return () => clearInterval(id)
  }, [autoMs, gallery.length, paused])

  return (
    <section className="relative w-full overflow-hidden bg-white text-black">
      {/* Background depth (no tilt) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-44 left-1/2 h-[520px] w-[980px] -translate-x-1/2 rounded-full bg-rose-500/10 blur-3xl" />
        <div className="absolute -bottom-56 right-[-180px] h-[520px] w-[520px] rounded-full bg-amber-400/10 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.08)_1px,transparent_1px)] [background-size:34px_34px]" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 py-14 md:px-6 md:py-16 2xl:max-w-[1400px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.45 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="text-xs tracking-[0.28em] text-black/45">{eyebrow}</p>
            <h2 className="mt-2 text-4xl font-extrabold tracking-tight">{title}</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            <Chip>Haryana + NCR</Chip>
            <Chip>Batching Plant</Chip>
            <Chip>Earthwork</Chip>
            <Chip>QC</Chip>
          </div>
        </motion.div>

        {/* Layout */}
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* LEFT: Auto image stage */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              className="relative"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {/* depth shadow */}
              <div className="pointer-events-none absolute inset-0 translate-y-5 rounded-[36px] bg-black/5 blur-2xl" />

              <div className="relative overflow-hidden rounded-[36px] border border-black/10 bg-white shadow-[0_28px_90px_-60px_rgba(0,0,0,0.45)]">
                {/* Top strip */}
                <div className="flex items-center justify-between border-b border-black/10 bg-white/80 px-5 py-4 backdrop-blur">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-2xl border border-black/10 bg-white text-rose-600">
                      <DotIcon />
                    </span>
                    <div>
                      <p className="text-xs tracking-[0.22em] text-black/45">OUR STORY</p>
                      <p className="text-sm font-semibold text-black/80">Auto gallery</p>
                    </div>
                  </div>

                  <div className="text-xs text-black/55">
                    {paused ? "Paused" : `Auto: ${Math.round(autoMs / 1000)}s`} • Hover to pause
                  </div>
                </div>

                {/* Image */}
                <div className="relative h-[420px] w-full bg-gray-100">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={gallery[active]}
                      className="absolute inset-0"
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      <Image
                        src={gallery[active]}
                        alt="Our story"
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                    </motion.div>
                  </AnimatePresence>

                  {/* Floating ring (3D feel, no tilt) */}
                  <motion.div
                    aria-hidden
                    className="pointer-events-none absolute right-6 top-6 h-20 w-20 rounded-full border border-white/25 bg-white/10 backdrop-blur"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
                  />

                  {/* Caption */}
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/90 backdrop-blur">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-300" />
                      Precision • Discipline • Integrity
                    </div>
                    <h3 className="mt-3 text-2xl font-bold tracking-tight text-white">{heading}</h3>
                  </div>
                </div>

                {/* Thumbs */}
                <div className="flex gap-3 overflow-x-auto px-5 py-4">
                  {gallery.map((src, i) => (
                    <button
                      key={`${src}-${i}`}
                      type="button"
                      onClick={() => setActive(i)}
                      className={[
                        "relative h-16 w-24 shrink-0 overflow-hidden rounded-2xl border transition",
                        i === active ? "border-rose-300 ring-2 ring-rose-500/20" : "border-black/10 hover:border-black/20",
                      ].join(" ")}
                      aria-label={`Open image ${i + 1}`}
                    >
                      <Image src={src} alt="" fill className="object-cover" sizes="96px" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Modern content card */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.05 }}
              className="relative"
            >
              {/* depth shadow */}
              <div className="pointer-events-none absolute inset-0 translate-y-5 rounded-[36px] bg-black/5 blur-2xl" />

              <div className="relative rounded-[36px] border border-black/10 bg-white/70 p-7 shadow-[0_28px_90px_-60px_rgba(0,0,0,0.40)] backdrop-blur">
                <p className="text-xs tracking-[0.24em] text-black/45">WHO WE ARE</p>

                <p className="mt-3 text-sm leading-7 text-black/70 md:text-[15px]">
                  {description}
                </p>

                {/* points */}
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {points.map((p, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{ duration: 0.45, delay: 0.06 * i }}
                      className="rounded-3xl border border-black/10 bg-white p-4 shadow-sm"
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-1 h-2.5 w-2.5 rounded-sm bg-rose-600 shadow-[0_10px_20px_-12px_rgba(244,63,94,0.65)]" />
                        <p className="text-sm leading-6 text-black/75">{p}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* metrics row */}
                <div className="mt-6 grid grid-cols-3 gap-3">
                  <Metric label="Quality" value="High" />
                  <Metric label="Timeline" value="On-time" />
                  <Metric label="Support" value="On-site" />
                </div>

                {/* CTA */}
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Link
                    href={buttonHref}
                    className="group inline-flex items-center gap-3 rounded-2xl border border-black/10 bg-white px-6 py-3 text-sm font-semibold text-black/80 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    {buttonText}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>

                  <span className="text-xs text-black/55">Trusted for civil + RMC across Haryana & NCR</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- UI helpers ---------------- */

function Chip({ children }) {
  return (
    <span className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-[11px] font-semibold text-black/60 shadow-sm backdrop-blur">
      {children}
    </span>
  )
}

function Metric({ label, value }) {
  return (
    <div className="rounded-3xl border border-black/10 bg-white p-4 shadow-sm">
      <p className="text-[11px] tracking-wide text-black/45">{label}</p>
      <p className="mt-1 text-sm font-semibold text-black/80">{value}</p>
    </div>
  )
}

function DotIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path
        d="M7 12h10M12 7v10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity=".9"
      />
    </svg>
  )
}
