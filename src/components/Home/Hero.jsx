"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef, useState } from "react"
import { motion } from "framer-motion"

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* soft background glows */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[#d8b07a]/15 blur-3xl"
          animate={{ y: [0, 18, 0], opacity: [0.45, 0.7, 0.45] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-52 right-[-120px] h-[420px] w-[420px] rounded-full bg-red-500/10 blur-3xl"
          animate={{ y: [0, -14, 0], opacity: [0.25, 0.55, 0.25] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Top image */}
      <div className="relative h-[320px] sm:h-[440px] md:h-[560px] lg:h-[640px] w-full overflow-hidden">
        {/* subtle parallax/zoom */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1.0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <Image
            src="/hero.webp"
            alt="Modern construction"
            fill
            priority
            className="object-cover"
          />
        </motion.div>

        {/* Optional vignette for better text contrast */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-black/0 to-black/0" />
      </div>

      {/* White content panel overlapping image */}
      <div className="relative -mt-10 sm:-mt-14 md:-mt-20 lg:-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <TiltCard>
            <div className="bg-white shadow-[0_30px_90px_-60px_rgba(0,0,0,0.55)]">
              <div className="px-5 sm:px-10 pt-8 sm:pt-12 pb-10 sm:pb-14">
                {/* Heading */}
                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  className="text-[40px] leading-[0.95] sm:text-6xl md:text-7xl font-extrabold tracking-tight"
                >
                  <span className="bg-gradient-to-r from-[#caa56a] via-[#d8b07a] to-[#b88b4f] bg-clip-text text-transparent">
                    MODERN
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-[#caa56a] via-[#d8b07a] to-[#b88b4f] bg-clip-text text-transparent">
                    CONSTRUCTION
                  </span>
                </motion.h1>

                {/* Bottom grid */}
                <div className="mt-8 grid gap-10 lg:grid-cols-12 items-start">
                  {/* Left description + button */}
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.55, delay: 0.05 }}
                    className="lg:col-span-7"
                  >
                    <p className="max-w-2xl text-base sm:text-xl text-black leading-relaxed font-semibold">
                      Building Infrastructure That Shapes the Future.
                    </p>

                    <p className="mt-2 max-w-2xl text-sm sm:text-base text-black/70 leading-relaxed">
                      Delivering reliable Ready Mix Concrete and civil infrastructure solutions across
                      Haryana and NCR with precision engineering and modern execution systems.
                    </p>

                    <p className="mt-3 max-w-2xl text-sm sm:text-base text-black/60 leading-relaxed">
                      From expressways and highways to industrial warehouses and commercial foundations,
                      M.S. Construction ensures structured planning, controlled batching, and disciplined
                      on-site coordination for every project
                    </p>

                    <motion.div
                      className="mt-7"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        href="/projects"
                        className="inline-flex items-center gap-3 bg-red-600 px-6 py-3 text-sm font-medium text-white hover:bg-red-500 transition"
                      >
                        Explore Projects <span className="text-lg">→</span>
                      </Link>
                    </motion.div>
                  </motion.div>

                  {/* Right features */}
                  <div className="lg:col-span-5">
                    <ul className="space-y-6">
                      <Feature
                        icon={<IconDoc />}
                        title="Delivering quality construction"
                        desc="solutions since day one."
                        delay={0.08}
                      />
                      <Feature
                        icon={<IconHome />}
                        title="Proven track record of excellence"
                        desc="across diverse industries."
                        delay={0.14}
                      />
                      <Feature
                        icon={<IconChart />}
                        title="Innovating to push boundaries"
                        desc="in modern construction."
                        delay={0.2}
                      />
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  )
}

function Feature({ icon, title, desc, delay = 0 }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: 16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
      className="flex items-start gap-4"
    >
      <motion.div
        whileHover={{ y: -2, scale: 1.03 }}
        className="mt-0.5 flex h-12 w-12 items-center justify-center rounded-full border border-black/25 bg-white"
      >
        {icon}
      </motion.div>

      <div>
        <p className="text-sm font-semibold text-black/80">{title}</p>
        <p className="text-sm text-black/55">{desc}</p>
      </div>
    </motion.li>
  )
}

/* ---------- subtle 3D tilt wrapper for the white panel ---------- */
function TiltCard({ children }) {
  const ref = useRef(null)
  const [style, setStyle] = useState({})

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    const rx = -((y - r.height / 2) / (r.height / 2)) * 3
    const ry = ((x - r.width / 2) / (r.width / 2)) * 3
    setStyle({ transform: `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg)` })
  }

  const onLeave = () => {
    setStyle({
      transform: "perspective(1100px) rotateX(0deg) rotateY(0deg)",
      transition: "transform 220ms ease",
    })
    setTimeout(() => setStyle({}), 230)
  }

  return (
    <div className="[perspective:1100px]">
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={style}
        className="transition-transform duration-200"
      >
        {children}
      </div>
    </div>
  )
}

/* --- Simple line icons (no packages needed) --- */
function IconDoc() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-black/60">
      <path strokeWidth="1.7" d="M8 3h7l4 4v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
      <path strokeWidth="1.7" d="M15 3v5h5" />
      <path strokeWidth="1.7" d="M9 12h6M9 16h6" />
    </svg>
  )
}

function IconHome() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-black/60">
      <path strokeWidth="1.7" d="M3 10.5 12 3l9 7.5V21a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2v-10.5Z" />
    </svg>
  )
}

function IconChart() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-black/60">
      <path strokeWidth="1.7" d="M4 19V5" />
      <path strokeWidth="1.7" d="M4 19h16" />
      <path strokeWidth="1.7" d="M7 15l4-4 3 3 5-6" />
    </svg>
  )
}
