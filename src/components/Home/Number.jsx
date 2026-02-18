"use client"

import React from "react"
import { motion } from "framer-motion"

export default function FactsFigures() {
  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12, delayChildren: 0.05 },
    },
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  const card = {
    hidden: { opacity: 0, y: 18, rotateX: 6, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: { duration: 0.65, ease: "easeOut" },
    },
  }

  return (
    <section className="bg-[#f3f4f6] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* keep your layout; add subtle depth wrapper */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="relative"
        >
          {/* soft glow / depth (subtle) */}
          <div className="pointer-events-none absolute -inset-6 rounded-[28px] bg-gradient-to-br from-black/5 via-transparent to-black/10 blur-2xl" />

          <div
            className="relative grid grid-cols-1 lg:grid-cols-2 border border-black/10 rounded-2xl overflow-hidden"
            style={{ perspective: 1200 }}
          >
            {/* LEFT TOP */}
            <motion.div
              variants={card}
              whileHover={{
                y: -3,
                rotateX: 4,
                rotateY: -4,
                boxShadow: "0 22px 45px -28px rgba(0,0,0,0.35)",
              }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="bg-[#f3f4f6] p-10 sm:p-14 border-b lg:border-b-0 lg:border-r border-black/10"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div variants={fadeUp} style={{ transform: "translateZ(12px)" }}>
                <div className="flex items-center gap-2 text-xs tracking-widest text-black/40">
                  <span className="inline-flex gap-1">
                    <span className="h-1 w-1 rounded-full bg-black/25" />
                    <span className="h-1 w-1 rounded-full bg-black/25" />
                  </span>
                  <span className="uppercase">BY THE NUMBERS</span>
                </div>

                <h2 className="mt-10 text-xl sm:text-2xl font-medium tracking-tight text-black">
                  FACTS &amp; FIGURES
                </h2>

                <p className="mt-3 max-w-md text-sm text-black/55 leading-relaxed">
                  On-time project completion rate backed by disciplined execution systems.


                </p>
              </motion.div>

              {/* subtle floating accent */}
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute right-8 top-8 h-14 w-14 rounded-2xl border border-black/10 bg-white/60 backdrop-blur"
                animate={{ y: [0, -6, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                style={{ transform: "translateZ(18px)" }}
              />
            </motion.div>

            {/* RIGHT TOP */}
            <motion.div
              variants={card}
              whileHover={{
                y: -3,
                rotateX: 4,
                rotateY: 4,
                boxShadow: "0 22px 45px -28px rgba(0,0,0,0.35)",
              }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="bg-white p-10 sm:p-14 border-b border-black/10 relative"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* shimmer line */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-black/15 to-transparent" />

              <motion.div variants={fadeUp} style={{ transform: "translateZ(12px)" }}>
                <p className="text-5xl sm:text-6xl font-semibold tracking-tight text-black">
                  100%
                </p>
                <p className="mt-4 max-w-md text-sm text-black/55 leading-relaxed">
Infrastructure and concrete projects delivered across Haryana & NCR.

                </p>
              </motion.div>
            </motion.div>

            {/* LEFT BOTTOM */}
            <motion.div
              variants={card}
              whileHover={{
                y: -3,
                rotateX: -4,
                rotateY: -4,
                boxShadow: "0 22px 45px -28px rgba(0,0,0,0.35)",
              }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="bg-white p-10 sm:p-14 lg:border-r border-black/10 relative"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div variants={fadeUp} style={{ transform: "translateZ(12px)" }}>
                <p className="text-5xl sm:text-6xl font-semibold tracking-tight text-black">
                  30+
                </p>
                <p className="mt-4 max-w-md text-sm text-black/55 leading-relaxed">
Advanced machinery units including batching plant, transit mixers, excavators, graders,
and compactors.
                </p>
              </motion.div>
            </motion.div>

            {/* RIGHT BOTTOM */}
            <motion.div
              variants={card}
              whileHover={{
                y: -3,
                rotateX: -4,
                rotateY: 4,
                boxShadow: "0 26px 55px -34px rgba(0,0,0,0.65)",
              }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="bg-black p-10 sm:p-14 relative"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* subtle glow */}
              <div className="pointer-events-none absolute -inset-10 bg-gradient-to-br from-white/10 via-transparent to-transparent blur-2xl" />

              <motion.div variants={fadeUp} style={{ transform: "translateZ(12px)" }}>
                <p className="text-5xl sm:text-6xl font-semibold tracking-tight text-white">
                  5+ Years
                </p>
                <p className="mt-4 max-w-md text-sm text-white/60 leading-relaxed">
                  Operational experience in infrastructure and civil development.

                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
