"use client"

import React from "react"
import { motion } from "framer-motion"

export default function FactsFigures({
  eyebrow = "BY THE NUMBERS",
  title = "FACTS & FIGURES",
  subtitle =
    "A quick snapshot of execution strength — capability, delivery discipline, and on-ground readiness.",

  stats = [
    {
      value: "100%",
      label: "Delivery Focus",
      desc: "Infrastructure and concrete projects delivered across Haryana & NCR.",
    },
    {
      value: "30+",
      label: "Machinery Units",
      desc: "Batching plant, transit mixers, excavators, graders, compactors & more.",
    },
    {
      value: "5+ Years",
      label: "Experience",
      desc: "Operational experience in infrastructure and civil development.",
    },
    {
      value: "On-time",
      label: "Execution Rate",
      desc: "Milestone-driven planning and structured coordination for timelines.",
    },
  ],
} = {}) {
  const wrap = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
  }

  const fade = {
    hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 140, damping: 18 },
    },
  }

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20">
      {/* light background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-44 left-1/2 h-[520px] w-[920px] -translate-x-1/2 rounded-full bg-[#d8b07a]/10 blur-3xl" />
        <div className="absolute -bottom-56 right-[-160px] h-[520px] w-[520px] rounded-full bg-red-500/6 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.09)_1px,transparent_1px)] [background-size:34px_34px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          variants={wrap}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid gap-10 lg:grid-cols-12 lg:items-center"
        >
          {/* Left editorial */}
          <motion.div variants={fade} className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-xs text-black/60 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-red-600" />
              <span className="tracking-[0.26em] uppercase">{eyebrow}</span>
            </div>

            <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold tracking-tight text-black">
              {title}
            </h2>

            <p className="mt-3 text-sm sm:text-base text-black/60 leading-relaxed max-w-md">
              {subtitle}
            </p>

            {/* modern mini callouts */}
            <div className="mt-7 grid gap-3">
              <MiniPill text="Controlled production" />
              <MiniPill text="Disciplined dispatch system" />
              <MiniPill text="Site-ready execution teams" />
            </div>
          </motion.div>

          {/* Right floating tiles */}
          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {stats.map((s, i) => (
                <StatTile key={`${s.value}-${i}`} s={s} i={i} />
              ))}
            </div>

            {/* subtle bottom note */}
            <motion.p
              variants={fade}
              className="mt-5 text-xs text-black/45"
            >
              Figures represent operational capability and execution approach across projects.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function StatTile({ s, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ type: "spring", stiffness: 150, damping: 18, delay: i * 0.06 }}
      whileHover={{ y: -6 }}
      className={[
        "group relative overflow-hidden rounded-[26px]",
        "border border-black/10 bg-white",
        "shadow-[0_24px_70px_-55px_rgba(0,0,0,0.45)]",
        "p-6",
      ].join(" ")}
    >
      {/* corner accent */}
      <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 -translate-y-8 translate-x-8 rounded-full bg-red-500/10 blur-2xl" />

      <p className="text-xs tracking-[0.24em] text-black/45 uppercase">{s.label}</p>

      <div className="mt-3 flex items-end justify-between gap-4">
        <p className="text-4xl sm:text-5xl font-extrabold tracking-tight text-black">
          {s.value}
        </p>
        <span className="text-sm font-semibold text-red-600 opacity-0 transition group-hover:opacity-100">
          →
        </span>
      </div>

      <p className="mt-3 text-sm text-black/60 leading-relaxed">{s.desc}</p>

      {/* hover ring */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 ring-1 ring-black/10" />
      </div>
    </motion.div>
  )
}

function MiniPill({ text }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3 shadow-sm">
      <span className="h-2 w-2 rounded-full bg-[#d8b07a]" />
      <p className="text-sm text-black/65">{text}</p>
    </div>
  )
}
