"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"

export default function HeroSectionModern() {
  const tilt = useTilt(7)

  return (
    <section className="relative w-full overflow-hidden bg-black">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/hero.png"
          alt="Modern construction"
          fill
          priority
          className="object-cover opacity-[0.88]"
        />
        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/50 to-black/85" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(216,176,122,0.28),transparent_55%),radial-gradient(circle_at_80%_20%,rgba(255,80,80,0.20),transparent_50%),radial-gradient(circle_at_70%_85%,rgba(255,255,255,0.10),transparent_55%)]" />
        {/* subtle grid */}
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:44px_44px]" />
      </div>

      {/* Floating glow blobs */}
      <motion.div
        className="pointer-events-none absolute -top-28 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[#d8b07a]/20 blur-3xl"
        animate={{ y: [0, 18, 0], opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-40 right-[-140px] h-[420px] w-[420px] rounded-full bg-red-500/15 blur-3xl"
        animate={{ y: [0, -16, 0], opacity: [0.2, 0.55, 0.2] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="min-h-[86vh] py-14 sm:py-16 lg:py-20 flex items-center">
          <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-10">
            {/* LEFT: text */}
            <div className="lg:col-span-7">
              {/* pill */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/80 backdrop-blur"
              >
                <span className="h-2 w-2 rounded-full bg-[#d8b07a]" />
                Trusted Infrastructure & Ready Mix Concrete
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
                className="mt-6 text-[42px] leading-[0.98] sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white"
              >
                Build with
                <span className="ml-3 bg-gradient-to-r from-[#caa56a] via-[#d8b07a] to-[#b88b4f] bg-clip-text text-transparent">
                  precision
                </span>
                <br />
                deliver with
                <span className="ml-3 bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                  confidence
                </span>
                .
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.55, ease: "easeOut", delay: 0.12 }}
                className="mt-5 max-w-2xl text-sm sm:text-base text-white/75 leading-relaxed"
              >
                Delivering high-quality Ready Mix Concrete and civil infrastructure solutions across Haryana and NCR
                with advanced batching systems, disciplined execution, and reliable on-site coordination.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.55, ease: "easeOut", delay: 0.18 }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/Contact"
                    className="group inline-flex items-center gap-3 rounded-2xl bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_50px_-18px_rgba(255,0,0,0.8)] hover:bg-red-500 transition"
                  >
                    Explore Projects
                    <span className="text-lg transition group-hover:translate-x-0.5">→</span>
                  </Link>
                </motion.div>

                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/Contact"
                    className="inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur hover:bg-white/10 transition"
                  >
                    Get a Quote
                    <span className="text-lg">↗</span>
                  </Link>
                </motion.div>
              </motion.div>

              {/* stats */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.55, ease: "easeOut", delay: 0.22 }}
                className="mt-10 grid max-w-xl grid-cols-3 gap-3"
              >
                <Stat label="Quality Control" value="Lab Tested" />
                <Stat label="Delivery" value="On-Time Mixers" />
                <Stat label="Coverage" value="Haryana + NCR" />
              </motion.div>
            </div>

            {/* RIGHT: modern glass card */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                onMouseMove={tilt.onMove}
                onMouseLeave={tilt.onLeave}
                style={tilt.style}
                className="relative rounded-3xl border border-white/15 bg-white/7 p-5 sm:p-6 backdrop-blur-xl shadow-[0_50px_120px_-70px_rgba(0,0,0,0.9)]"
              >
                {/* top highlight */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_30%_20%,rgba(216,176,122,0.22),transparent_55%)]" />

                {/* floating chips */}
                <div className="flex flex-wrap gap-2">
                  <Chip text="Automated Batching" />
                  <Chip text="Moisture Control" />
                  <Chip text="Site Supervision" />
                  <Chip text="Highway & Industrial Works" />
                </div>

                <h3 className="mt-6 text-lg font-bold text-white">
                  Modern Infrastructure, executed with disciplined teams.
                </h3>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">
                  From expressways to warehouse platforms and commercial foundations — we follow structured planning,
                  controlled production, and quality checks at every stage.
                </p>

                <div className="mt-6 space-y-4">
                  <Feature
                    title="Consistent concrete quality"
                    desc="Automated batching + lab-tested materials for dependable strength."
                    icon={<IconDoc />}
                  />
                  <Feature
                    title="Proven project execution"
                    desc="Highways, industrial platforms, and large-scale developments."
                    icon={<IconHome />}
                  />
                  <Feature
                    title="Systems + safety-first delivery"
                    desc="Reliable dispatch, durable outcomes, and timely completion."
                    icon={<IconChart />}
                  />
                </div>

                {/* bottom mini bar */}
                <div className="mt-7 flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                  <p className="text-xs text-white/70">
                    Need a fast quotation? <span className="text-white/90 font-semibold">Contact our team</span>
                  </p>
                  <Link
                    href="/Contact"
                    className="text-xs font-semibold text-[#d8b07a] hover:text-white transition"
                  >
                    Contact →
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* bottom fade */}
        <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-20 bg-gradient-to-t from-black to-transparent" />
      </div>
    </section>
  )
}

/* ---------------- helpers ---------------- */

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/12 bg-white/5 px-4 py-3 backdrop-blur">
      <p className="text-[11px] uppercase tracking-wider text-white/55">{label}</p>
      <p className="mt-1 text-sm font-semibold text-white/90">{value}</p>
    </div>
  )
}

function Chip({ text }) {
  return (
    <span className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-[11px] text-white/75 backdrop-blur">
      {text}
    </span>
  )
}

function Feature({ icon, title, desc }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl border border-white/12 bg-white/5 text-white/80">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-white/90">{title}</p>
        <p className="text-xs text-white/65 leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}

/* React 19-safe tilt (no refs needed) */
function useTilt(max = 8) {
  const [style, setStyle] = useState({
    transform: "perspective(1100px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
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
      transform: `perspective(1100px) rotateX(${rX}deg) rotateY(${rY}deg) translateZ(10px)`,
    })
  }

  const onLeave = () => {
    setStyle({
      transform: "perspective(1100px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
      transition: "transform 220ms ease",
    })
    setTimeout(() => {
      setStyle({
        transform: "perspective(1100px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
      })
    }, 230)
  }

  return { style, onMove, onLeave }
}

/* icons */
function IconDoc() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white/80">
      <path strokeWidth="1.7" d="M8 3h7l4 4v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
      <path strokeWidth="1.7" d="M15 3v5h5" />
      <path strokeWidth="1.7" d="M9 12h6M9 16h6" />
    </svg>
  )
}
function IconHome() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white/80">
      <path strokeWidth="1.7" d="M3 10.5 12 3l9 7.5V21a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2v-10.5Z" />
    </svg>
  )
}
function IconChart() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white/80">
      <path strokeWidth="1.7" d="M4 19V5" />
      <path strokeWidth="1.7" d="M4 19h16" />
      <path strokeWidth="1.7" d="M7 15l4-4 3 3 5-6" />
    </svg>
  )
}
