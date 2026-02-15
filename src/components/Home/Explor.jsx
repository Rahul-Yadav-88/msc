"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef, useState } from "react"
import { motion } from "framer-motion"

export default function AboutStrip({
  label = "Explore",
  img1 = "/hero.webp",
  img2 = "/hero.webp",
  text = "Drill is not just a construction company we are builders of dreams. With over 25 years of expertise, we’ve become leaders in delivering high-quality, sustainable construction solutions that push the boundaries of modern architecture.",
  buttonText = "About us",
  buttonHref = "/about",
}) {
  return (
    <section className="relative bg-black text-white overflow-hidden">
      {/* subtle glow */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -top-32 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl"
          animate={{ y: [0, 14, 0], opacity: [0.35, 0.6, 0.35] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 right-[-120px] h-[360px] w-[360px] rounded-full bg-white/5 blur-3xl"
          animate={{ y: [0, -12, 0], opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
        {/* wrapper becomes column on mobile, row on desktop */}
        <div className="mx-auto max-w-4xl flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
          {/* Left label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.45 }}
            className="flex items-center gap-2 text-xs tracking-widest text-white/55"
          >
            <span className="inline-flex gap-1">
              <span className="h-1 w-1 rounded-full bg-white/25" />
              <span className="h-1 w-1 rounded-full bg-white/25" />
              <span className="h-1 w-1 rounded-full bg-white/25" />
            </span>
            <span className="uppercase">{label}</span>
          </motion.div>

          {/* Right content */}
          <div className="w-full">
            {/* images row */}
            <div className="flex flex-col sm:flex-row items-start gap-5 sm:gap-6">
              <Reveal delay={0.06}>
                <FloatingCard floatDelay={0}>
                  <TiltImage src={img1} alt="Team member" />
                </FloatingCard>
              </Reveal>

              <Reveal delay={0.12}>
                <FloatingCard floatDelay={0.18}>
                  <TiltImage src={img2} alt="Architecture" />
                </FloatingCard>
              </Reveal>
            </div>

            {/* text */}
            <Reveal delay={0.16}>
              <p className="mt-6 text-left text-base sm:text-lg md:text-xl leading-relaxed text-white/85 max-w-3xl">
                {text}
              </p>
            </Reveal>

            {/* button */}
            <Reveal delay={0.22}>
              <div className="mt-5">
                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href={buttonHref}
                    className="inline-flex items-center gap-3 border border-white/35 px-6 py-3 text-sm text-white/85 hover:text-white hover:border-white/70 transition"
                  >
                    {buttonText} <span className="text-base">→</span>
                  </Link>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------- helpers -------------------- */

function Reveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  )
}

function FloatingCard({ children, floatDelay = 0 }) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: floatDelay }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  )
}

function TiltImage({ src, alt }) {
  const ref = useRef(null)
  const [style, setStyle] = useState({})

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top

    const rx = -((y - r.height / 2) / (r.height / 2)) * 6
    const ry = ((x - r.width / 2) / (r.width / 2)) * 6

    setStyle({
      transform: `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`,
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
    <div className="[perspective:900px]">
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={style}
        className="relative h-44 w-full sm:h-52 sm:w-52 overflow-hidden border border-white/10 bg-white/5 shadow-[0_25px_70px_-50px_rgba(255,255,255,0.35)] transition-transform duration-200"
      >
        <Image src={src} alt={alt} fill className="object-cover" priority />
        {/* shine */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100">
          <div className="absolute -top-20 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-white/25 blur-2xl" />
        </div>
      </div>
    </div>
  )
}
