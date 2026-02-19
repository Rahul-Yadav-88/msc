"use client"

import React, { useMemo, useState } from "react"
import { motion } from "framer-motion"

/** ✅ React-safe tilt (no refs) */
function useTilt(max = 10) {
  const [style, setStyle] = useState({
    transform: "perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
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
      transform: `perspective(1200px) rotateX(${rX}deg) rotateY(${rY}deg) translateZ(10px)`,
    })
  }

  const onLeave = () => {
    setStyle({
      transform:
        "perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
      transition: "transform 220ms ease",
    })
    setTimeout(() => {
      setStyle({
        transform:
          "perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
      })
    }, 240)
  }

  return { style, onMove, onLeave }
}

export default function ContactSectionLight({
  label = "CONTACT US",
  title = "Let’s connect",
  subtitle = "Send us a message and our team will get back to you promptly.",
  imageSrc = "/h14.png",
  email = "msconstruction495@gmail.com",
  phone = "+91 98138 62442",
  address = `Jhajjar-Rewari Road, NH 71, VPO Dadanpur\nDistrict Jhajjar, Haryana`,
}) {
  const cardTilt = useTilt(7)
  const imageTilt = useTilt(12)

  const chips = useMemo(
    () => ["Concrete Supply", "RMC Dispatch", "On-site Supervision", "Testing & QA"],
    []
  )

  return (
    <section className="relative overflow-hidden bg-white text-zinc-900">
      {/* Background: soft grid + subtle glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.7] [background-image:radial-gradient(circle_at_1px_1px,rgba(24,24,27,0.06)_1px,transparent_1px)] [background-size:22px_22px]" />
        <motion.div
          className="absolute -top-40 left-1/2 h-[520px] w-[920px] -translate-x-1/2 rounded-full bg-zinc-900/5 blur-3xl"
          animate={{ y: [0, 14, 0], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-44 right-[-160px] h-[420px] w-[420px] rounded-full bg-zinc-900/5 blur-3xl"
          animate={{ y: [0, -12, 0], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 text-xs tracking-[0.25em] text-zinc-500">
            <span className="inline-flex items-center gap-1">
              <span className="h-1 w-1 rounded-full bg-zinc-400" />
              <span className="h-1 w-1 rounded-full bg-zinc-400" />
              <span className="h-1 w-1 rounded-full bg-zinc-400" />
            </span>
            <span className="uppercase">{label}</span>
            <span className="h-px flex-1 bg-zinc-200" />
          </div>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">
            {subtitle}
          </p>

          {/* chips */}
          <div className="mt-6 flex flex-wrap gap-2">
            {chips.map((c, i) => (
              <motion.div
                key={c}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: 0.05 * i }}
                className="rounded-full border border-zinc-200 bg-white/70 px-3 py-1 text-[11px] tracking-wide text-zinc-700 shadow-sm"
              >
                {c}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* LEFT: 3D contact card */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative"
            >
              {/* soft aura */}
              <motion.div
                className="pointer-events-none absolute -inset-6 rounded-[28px] bg-zinc-900/5 blur-2xl"
                animate={{ opacity: [0.18, 0.28, 0.18] }}
                transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
              />

              <div
                onMouseMove={cardTilt.onMove}
                onMouseLeave={cardTilt.onLeave}
                style={cardTilt.style}
                className="relative rounded-[28px] border border-zinc-200 bg-white p-5 shadow-[0_30px_80px_-55px_rgba(0,0,0,0.25)]"
              >
                {/* top row */}
                <div className="flex items-center justify-between">
                  <div className="text-xs tracking-[0.22em] text-zinc-500">
                    M.S. CONSTRUCTION
                  </div>

                  <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-[11px] text-zinc-600">
                    Available
                  </span>
                </div>

                {/* image */}
                <div className="mt-4">
                  <div
                    onMouseMove={imageTilt.onMove}
                    onMouseLeave={imageTilt.onLeave}
                    style={imageTilt.style}
                    className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50"
                  >
                    <img
                      src={imageSrc}
                      alt="Contact"
                      className="h-[240px] w-full object-fill"
                    />

                    {/* animated sheen */}
                    <motion.div
                      className="pointer-events-none absolute -left-28 top-0 h-full w-40 bg-white/70 blur-2xl"
                      animate={{ x: [0, 520, 0] }}
                      transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* subtle overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

                    {/* badge */}
                    <div className="absolute bottom-3 left-3 rounded-full border border-white/60 bg-white/80 px-3 py-1 text-[11px] text-zinc-700 shadow-sm">
                      Quality • Speed • Compliance
                    </div>
                  </div>
                </div>

                {/* contact blocks */}
                <div className="mt-6 space-y-4">
                  <InfoRowLight label="Send us an email" value={email} />
                  <InfoRowLight label="Give us a call" value={phone} />
                  <InfoRowLight label="Address" value={address} multiline />
                </div>

                {/* bottom mini stats */}
                <div className="mt-6 grid grid-cols-3 gap-3">
                  <MiniStatLight title="Response" value="< 24h" />
                  <MiniStatLight title="Dispatch" value="Fast" />
                  <MiniStatLight title="Support" value="On-site" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: modern form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.06 }}
              className="relative"
            >
              <div className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-[0_30px_80px_-60px_rgba(0,0,0,0.22)] sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight">
                      Send a message
                    </h3>
                    <p className="mt-2 text-sm text-zinc-500">
                      Share your requirement. We’ll contact you with next steps.
                    </p>
                  </div>

                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
                    className="hidden sm:block rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-xs text-zinc-600"
                  >
                    Secure form
                  </motion.div>
                </div>

                <form className="mt-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <FieldLight label="Full Name*" placeholder="Full Name" />

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FieldLight label="Email*" type="email" placeholder="Email" />
                    <FieldLight label="Phone" type="tel" placeholder="Phone No" />
                  </div>

                  <FieldLight
                    label="Message*"
                    as="textarea"
                    rows={6}
                    placeholder="Write your message here..."
                  />

                  <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-zinc-500">
                      By submitting, you agree to be contacted by our team.
                    </p>

                    <motion.button
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
                    >
                      Submit Now
                      <span className="transition group-hover:translate-x-0.5">→</span>
                    </motion.button>
                  </div>
                </form>
              </div>

              {/* soft glow under form */}
              <div className="pointer-events-none absolute inset-x-8 -bottom-10 h-24 rounded-full bg-zinc-900/5 blur-3xl" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------ helpers ------------------------------ */

function InfoRowLight({ label, value, multiline = false }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
      <p className="text-[11px] tracking-wide text-zinc-500">{label}</p>
      <p className="mt-1 text-sm font-medium text-zinc-900">
        {multiline
          ? value.split("\n").map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))
          : value}
      </p>
    </div>
  )
}

function MiniStatLight({ title, value }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3 text-center">
      <div className="text-[11px] text-zinc-500">{title}</div>
      <div className="mt-1 text-sm font-semibold text-zinc-900">{value}</div>
    </div>
  )
}

function FieldLight({ label, as = "input", type = "text", rows, placeholder }) {
  const Comp = as
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] tracking-wide text-zinc-600">
        {label}
      </span>
      <Comp
        type={type}
        rows={rows}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200"
      />
    </label>
  )
}
