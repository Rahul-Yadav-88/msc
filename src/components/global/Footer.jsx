"use client"

import Link from "next/link"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Mail, Phone, ArrowRight, Instagram, Facebook, Youtube, Linkedin } from "lucide-react"
import { useMemo } from "react"

export default function Footer() {
  const navItems = useMemo(
    () => [
      { label: "About us", href: "/About" },
      { label: "Projects", href: "/Projects" },
      { label: "Services", href: "/Services" },
      // { label: "Blogs", href: "/Blog" },
      // { label: "Reviews", href: "/Reviews" },
      // { label: "FAQ", href: "/FAQ" },
    ],
    []
  )

  const resources = useMemo(
    () => [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms" },
      // { label: "Style Guide", href: "#" },
      // { label: "License", href: "#" },
    ],
    []
  )

  const socials = useMemo(
    () => [
      { label: "Instagram", href: "#", Icon: Instagram },
      { label: "Facebook", href: "#", Icon: Facebook },
      { label: "YouTube", href: "#", Icon: Youtube },
      { label: "LinkedIn", href: "#", Icon: Linkedin },
    ],
    []
  )

  return (
    <footer className="relative overflow-hidden bg-[#07070a] text-white">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -top-32 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl"
          animate={{ y: [0, 18, 0], opacity: [0.18, 0.35, 0.18] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-52 right-[-180px] h-[520px] w-[520px] rounded-full bg-red-500/15 blur-3xl"
          animate={{ y: [0, -18, 0], opacity: [0.16, 0.34, 0.16] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.10),transparent_45%),radial-gradient(circle_at_80%_75%,rgba(239,68,68,0.14),transparent_40%)]" />
        <div className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:64px_64px]" />
      </div>

      {/* TOP: CTA band */}
      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
          <TiltCard className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[11px] tracking-[0.28em] text-white/65">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500/70" />
                  LET’S BUILD TOGETHER
                </div>

                <h2 className="mt-4 text-2xl font-semibold leading-tight sm:text-3xl md:text-4xl">
                  Ready to start your next project?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-white/60 sm:text-base">
                  Tell us what you’re building — we’ll help you plan, price, and deliver with confidence.
                </p>
              </motion.div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <ShimmerButton href="/contact" text="Get a Quote" />
                <Link
                  href="/services"
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  View Services
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </TiltCard>
        </div>
      </div>

      {/* MAIN */}
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* Brand / contact quick */}
          <Reveal className="md:col-span-5">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs tracking-[0.22em] text-white/50">M.S. CONSTRUCTION</p>
                  <h3 className="mt-2 text-xl font-semibold">Build stronger. Deliver faster.</h3>
                  <p className="mt-2 text-sm text-white/60">
                    Trusted batching, supervision, and on-time dispatch for infrastructure projects.
                  </p>
                </div>

                {/* Floating badge */}
                <motion.div
                  className="hidden sm:block rounded-2xl border border-white/10 bg-black/35 px-3 py-2 text-xs text-white/70"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  24×7 Support
                </motion.div>
              </div>

              <div className="mt-6 grid gap-3">
                <a
                  href="mailto:msconstruction495@gmail.com"
                  className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 transition hover:bg-black/35"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/5">
                    <Mail className="h-5 w-5 text-white/70 transition group-hover:text-white" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs text-white/45">Email</p>
                    <p className="truncate text-sm font-semibold text-white/85 group-hover:text-white">
                      msconstruction495@gmail.com
                    </p>
                  </div>
                </a>

                <a
                  href="tel:+919813862442"
                  className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 transition hover:bg-black/35"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/5">
                    <Phone className="h-5 w-5 text-white/70 transition group-hover:text-white" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs text-white/45">Phone</p>
                    <p className="truncate text-sm font-semibold text-white/85 group-hover:text-white">
                      +91 98138 62442
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </Reveal>

          {/* Links */}
          <Reveal delay={0.05} className="md:col-span-3">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
              <h4 className="text-sm font-semibold tracking-wide">Explore</h4>
              <ul className="mt-4 space-y-2">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="group inline-flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm text-white/65 transition hover:bg-white/5 hover:text-white"
                    >
                      <span>{item.label}</span>
                      <ArrowRight className="h-4 w-4 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Resources + Social */}
          <Reveal delay={0.1} className="md:col-span-4">
            <div className="grid gap-8">
              <TiltCard className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
                <h4 className="text-sm font-semibold tracking-wide">Resources</h4>
                <ul className="mt-4 space-y-2">
                  {resources.map((r) => (
                    <li key={r.label}>
                      <Link
                        href={r.href}
                        className="inline-flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm text-white/65 transition hover:bg-white/5 hover:text-white"
                      >
                        {r.label}
                        <span className="text-xs text-white/35">↗</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </TiltCard>

              <TiltCard className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
                <h4 className="text-sm font-semibold tracking-wide">Follow</h4>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {socials.map(({ label, href, Icon }) => (
                    <Link
                      key={label}
                      href={href}
                      className="group flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/70 transition hover:bg-black/35 hover:text-white"
                    >
                      <Icon className="h-4 w-4 text-white/60 transition group-hover:text-white" />
                      {label}
                    </Link>
                  ))}
                </div>
              </TiltCard>
            </div>
          </Reveal>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-center text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between sm:text-left sm:px-6 lg:px-8">
          <p>Copyright © 2026 MS Constructions.</p>
          <p className="text-white/35">Designed & Developed with care.</p>
        </div>
      </div>
    </footer>
  )
}

/* ---------------- Helpers ---------------- */

function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  )
}

/**
 * 3D Tilt Card (React-safe: no ref reads during render)
 * Uses pointer position via event.currentTarget.
 */
function TiltCard({ children, className = "" }) {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const sx = useSpring(mx, { stiffness: 180, damping: 18 })
  const sy = useSpring(my, { stiffness: 180, damping: 18 })

  const rX = useTransform(sy, [-0.5, 0.5], [8, -8])
  const rY = useTransform(sx, [-0.5, 0.5], [-10, 10])

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    mx.set(px)
    my.set(py)
  }

  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <div className="[perspective:1200px]">
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          rotateX: rX,
          rotateY: rY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 180, damping: 16 }}
        className={className}
      >
        {/* subtle specular highlight */}
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 [background:radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.16),transparent_45%)] group-hover:opacity-100" />
        {children}
      </motion.div>
    </div>
  )
}

function ShimmerButton({ href, text }) {
  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="inline-block">
      <Link
        href={href}
        className="relative inline-flex items-center gap-2 overflow-hidden rounded-2xl border border-white/10 bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-500"
      >
        {/* shimmer */}
        <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100" />
        <motion.span
          aria-hidden
          className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 bg-white/25 blur-xl"
          animate={{ x: ["-120%", "240%"] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
        {text}
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </Link>
    </motion.div>
  )
}
