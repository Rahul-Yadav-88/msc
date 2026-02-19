"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

export default function AboutStripModern({
  label = "About",
  kicker = "Built for heavy-duty delivery",
  title = "Infrastructure-grade concrete, delivered with discipline.",
  text = "M.S. Construction is not just a concrete supplier. We are a structured infrastructure partner committed to delivering quality, durability, and efficiency across every project. With advanced machinery, experienced engineers, and disciplined site coordination, we provide dependable solutions that meet industry standards and exceed client expectations.",
  img1 = "/h3.png",
  img2 = "/h4.png",
  stats = [
    { k: "On-time Dispatch", v: "98%" },
    { k: "Quality Checks", v: "Batch-wise" },
    { k: "Projects Served", v: "500+" },
  ],
  buttonText = "About us",
  buttonHref = "/About",
}) {
  return (
    <section className="relative overflow-hidden bg-[#070A0F] text-white">
      {/* background: grid + glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:48px_48px]" />
        <motion.div
          className="absolute -top-40 left-1/2 h-[520px] w-[920px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl"
          animate={{ y: [0, 14, 0], opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-44 right-[-160px] h-[420px] w-[420px] rounded-full bg-white/5 blur-3xl"
          animate={{ y: [0, -12, 0], opacity: [0.2, 0.45, 0.2] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* LEFT: copy */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-6"
          >
            {/* label row */}
            <div className="flex items-center gap-3 text-xs tracking-[0.22em] text-white/60">
              <span className="inline-flex items-center gap-1">
                <span className="h-1 w-1 rounded-full bg-white/30" />
                <span className="h-1 w-1 rounded-full bg-white/30" />
                <span className="h-1 w-1 rounded-full bg-white/30" />
              </span>
              <span className="uppercase">{label}</span>
              <span className="h-px flex-1 bg-white/10" />
            </div>

            <p className="mt-5 text-sm text-white/70">{kicker}</p>

            <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              {title}
            </h2>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              {text}
            </p>

            {/* stats */}
            <div className="mt-7 grid max-w-xl grid-cols-3 gap-3">
              {stats.map((s, i) => (
                <motion.div
                  key={s.k}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.45, delay: 0.05 * i }}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur"
                >
                  <div className="text-lg font-semibold text-white">{s.v}</div>
                  <div className="mt-1 text-xs tracking-wide text-white/60">{s.k}</div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href={buttonHref}
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm text-white/85 backdrop-blur transition hover:border-white/35 hover:bg-white/10"
                >
                  {buttonText}
                  <span className="transition group-hover:translate-x-0.5">→</span>
                </Link>
              </motion.div>

              <div className="text-xs text-white/55">
                Response within <span className="text-white/80">24 hours</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: visuals */}
          <div className="lg:col-span-6">
            <div className="relative rounded-[28px] border border-white/10 bg-white/[0.03] p-4 backdrop-blur">
              {/* top chips */}
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Chip>Automated Batching</Chip>
                <Chip>Moisture Control</Chip>
                <Chip>Site Supervision</Chip>
              </div>

              {/* images */}
              <div className="grid gap-4 sm:grid-cols-2">
                <TiltMedia src={img1} alt="Concrete plant / team" />
                <div className="grid gap-4">
                  <TiltMedia src={img2} alt="Project / architecture" />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.5 }}
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-4"
                  >
                    <div className="text-sm font-medium text-white/90">
                      “Strength you can measure.”
                    </div>
                    <div className="mt-2 text-xs leading-relaxed text-white/60">
                      Batch-wise testing + compliance-first execution across every delivery.
                    </div>

                    {/* tiny moving shimmer */}
                    <motion.div
                      className="pointer-events-none absolute -left-24 top-0 h-full w-40 bg-white/10 blur-2xl"
                      animate={{ x: [0, 420, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </motion.div>
                </div>
              </div>

              {/* bottom accent */}
              <div className="pointer-events-none absolute inset-x-10 -bottom-12 h-24 rounded-full bg-white/10 blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------- small UI parts -------------------- */

function Chip({ children }) {
  return (
    <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] tracking-wide text-white/70">
      {children}
    </div>
  )
}

/**
 * Modern tilt without refs: uses event.currentTarget (React-safe)
 * + subtle floating motion
 */
function TiltMedia({ src, alt }) {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const sx = useSpring(mx, { stiffness: 220, damping: 18 })
  const sy = useSpring(my, { stiffness: 220, damping: 18 })

  const rX = useTransform(sy, [-0.5, 0.5], [8, -8])
  const rY = useTransform(sx, [-0.5, 0.5], [-10, 10])

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    mx.set(px)
    my.set(py)
  }

  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      style={{ rotateX: rX, rotateY: rY, transformStyle: "preserve-3d" }}
      className="relative h-56 w-full rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_30px_80px_-60px_rgba(255,255,255,0.35)]"
    >
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <Image src={src} alt={alt} fill className="object-cover" priority />
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
      </div>

      {/* glass highlight */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{ transform: "translateZ(24px)" }}
      >
        <div className="absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-white/18 blur-2xl" />
        <div className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] text-white/70 backdrop-blur">
          Modern Execution
        </div>
      </div>
    </motion.div>
  )
}
