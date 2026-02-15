"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, Phone, ArrowRight } from "lucide-react"
import { useRef, useState } from "react"

export default function Footer() {
  const navItems = [
    { label: "About us", icon: "👤", href: "/about" },
    { label: "Projects", icon: "📁", href: "/projects" },
    { label: "Services", icon: "⚙️", href: "/services" },
    { label: "Blogs", icon: "📝", href: "/blog" },
    { label: "Reviews", icon: "⭐", href: "/reviews" },
    { label: "FAQ", icon: "❓", href: "/faq" },
  ]

  const socialLinks = [
    { name: "Instagram", href: "#" },
    { name: "Facebook", href: "#" },
    { name: "YouTube", href: "#" },
    { name: "Twitter", href: "#" },
  ]

  const resources = [
    { name: "Style Guide", href: "#" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "License", href: "#" },
  ]

  return (
    <footer className="relative overflow-hidden bg-black text-white">
      {/* Floating background glows */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl"
          animate={{ y: [0, 18, 0], opacity: [0.35, 0.6, 0.35] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-48 right-[-140px] h-[420px] w-[420px] rounded-full bg-red-500/10 blur-3xl"
          animate={{ y: [0, -16, 0], opacity: [0.25, 0.55, 0.25] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* CTA Section */}
      <div className="relative border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
            {/* Left side */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.55 }}
              className="max-w-xl"
            >
              <div className="flex items-center gap-3 text-xs tracking-[0.3em] text-white/55">
                <span className="h-[2px] w-6 bg-white/25" />
                <span>LET’S BUILD TOGETHER</span>
              </div>

              <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                Contact us today to discuss your next project
              </h2>

              <div className="mt-7">
                <TiltButton href="/contact" />
              </div>
            </motion.div>

            {/* Right side - Nav links */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="flex flex-wrap gap-x-8 gap-y-4 md:max-w-md"
            >
              {navItems.map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={item.href}
                    className="text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm"
                  >
                    <span className="opacity-80">{item.icon}</span>
                    <span>{item.label}</span>
                    <span className="opacity-0 group-hover:opacity-100" />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-12">
          {/* Follow us */}
          <Reveal>
            <div>
              <h3 className="font-semibold text-lg mb-6">Follow us</h3>
              <ul className="space-y-3">
                {socialLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/55 hover:text-white transition-colors inline-flex items-center gap-2"
                    >
                      <span className="h-1 w-1 rounded-full bg-white/25" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Resources */}
          <Reveal delay={0.05}>
            <div>
              <h3 className="font-semibold text-lg mb-6">Resources</h3>
              <ul className="space-y-3">
                {resources.map((resource) => (
                  <li key={resource.name}>
                    <Link
                      href={resource.href}
                      className="text-white/55 hover:text-white transition-colors inline-flex items-center gap-2"
                    >
                      <span className="h-1 w-1 rounded-full bg-white/25" />
                      {resource.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Spacer / Newsletter style card */}
          <Reveal delay={0.1}>
            <TiltCard>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-sm text-white/70">
                  Get updates about new projects, insights, and construction trends.
                </p>

                <div className="mt-4 flex gap-2">
                  <input
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:border-white/25"
                  />
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black"
                    type="button"
                  >
                    Join
                  </motion.button>
                </div>

                <p className="mt-3 text-xs text-white/45">
                  No spam. Unsubscribe anytime.
                </p>
              </div>
            </TiltCard>
          </Reveal>

          {/* Contact Information */}
          <Reveal delay={0.15}>
            <div className="space-y-8">
              <div>
                <p className="text-white/50 text-sm mb-2">Send us an email</p>
                <a
                  href="mailto:info@example.com"
                  className="group inline-flex items-center gap-3 text-white font-semibold text-lg hover:text-red-400 transition"
                >
                  <Mail className="h-5 w-5 text-white/65 group-hover:text-red-400 transition" />
                  info@example.com
                </a>
              </div>

              <div>
                <p className="text-white/50 text-sm mb-2">Give us a call</p>
                <a
                  href="tel:+14065550120"
                  className="group inline-flex items-center gap-3 text-white font-semibold text-lg hover:text-red-400 transition"
                >
                  <Phone className="h-5 w-5 text-white/65 group-hover:text-red-400 transition" />
                  +(406) 555-0120
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-white/40 text-center text-sm">
            Copyright © 2025 Drill.
          </p>
        </div>
      </div>
    </footer>
  )
}

/* ----------------- Anim Helpers ----------------- */

function Reveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  )
}

/* ----------------- 3D Tilt Card ----------------- */

function TiltCard({ children }) {
  const ref = useRef(null)
  const [style, setStyle] = useState({})

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    const rx = -((y - r.height / 2) / (r.height / 2)) * 5
    const ry = ((x - r.width / 2) / (r.width / 2)) * 5
    setStyle({ transform: `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)` })
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
        className="transition-transform duration-200 hover:-translate-y-1"
      >
        {children}
      </div>
    </div>
  )
}

/* ----------------- 3D Tilt CTA Button ----------------- */

function TiltButton({ href }) {
  const ref = useRef(null)
  const [style, setStyle] = useState({})

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    const rx = -((y - r.height / 2) / (r.height / 2)) * 8
    const ry = ((x - r.width / 2) / (r.width / 2)) * 8
    setStyle({ transform: `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)` })
  }

  const onLeave = () => {
    setStyle({
      transform: "perspective(900px) rotateX(0deg) rotateY(0deg)",
      transition: "transform 180ms ease",
    })
    setTimeout(() => setStyle({}), 190)
  }

  return (
    <div className="[perspective:900px]">
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={style}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="inline-block"
      >
        <Link
          href={href}
          className="group inline-flex items-center gap-3 bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-500"
        >
          Collaborate Now
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </div>
  )
}
