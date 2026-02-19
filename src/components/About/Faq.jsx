"use client"

import Image from "next/image"
import { useMemo, useState } from "react"
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion"

export default function FAQSection({
  eyebrow = "FAQ'S",
  title = "FREQUENTLY ASKED QUESTIONS",
  subtitle = "Quick answers about our process, quality, and delivery.",
  imageSrc = "/a1.png",
  faqs = [
    {
      q: "How does M.S. Construction ensure concrete quality?",
      a: "We use automated batching systems with moisture control and conduct regular laboratory testing to ensure strength and compliance with Indian Standards.",
    },
    {
      q: "What types of projects do you specialize in?",
      a: "We specialize in highways, expressways, industrial warehouse platforms, commercial foundations, and large-scale infrastructure developments.",
    },
    {
      q: "How do you manage timely delivery?",
      a: "Our structured dispatch system and modern transit mixer fleet ensure timely delivery aligned with project schedules.",
    },
    {
      q: "Do you provide on-site supervision?",
      a: "Yes. Our experienced supervisors monitor execution, coordinate machinery, and ensure quality compliance at every stage.",
    },
    {
      q: "Can you handle large-scale infrastructure projects?",
      a: "With our advanced machinery fleet and batching capacity, we are fully equipped to manage high-volume infrastructure demands.",
    },
  ],
}) {
  const items = useMemo(() => faqs, [faqs])
  const [openIndex, setOpenIndex] = useState(0)

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? -1 : i))

  return (
    <section className="relative w-full overflow-hidden bg-white text-black">
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-black/[0.05] blur-3xl" />
        <div className="absolute -bottom-24 right-[-6rem] h-72 w-72 rounded-full bg-black/[0.04] blur-3xl" />
        <div className="absolute inset-0 [background-image:radial-gradient(circle_at_1px_1px,rgba(0,0,0,.06)_1px,transparent_0)] [background-size:18px_18px] opacity-[0.35]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-14 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.65 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-2 text-[11px] tracking-[0.28em] text-black/50">
            <span className="h-[4px] w-[4px] rounded-full bg-black/20" />
            <span className="h-[4px] w-[4px] rounded-full bg-black/20" />
            <span className="h-[4px] w-[4px] rounded-full bg-black/20" />
            <span>{eyebrow}</span>
          </div>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h2>

          {subtitle ? (
            <p className="mt-3 text-sm leading-7 text-black/60 md:text-[15px]">
              {subtitle}
            </p>
          ) : null}
        </motion.div>

        {/* Layout */}
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-start">
          {/* Left: Image Card */}
          <div className="lg:col-span-6">
            <Reveal delay={0.05}>
              <TiltCardImage
                src={imageSrc}
                alt="FAQ"
                badgeTop="Trusted quality"
                badgeBottom="Fast delivery • On-site supervision"
              />
            </Reveal>
          </div>

          {/* Right: Accordion */}
          <div className="lg:col-span-6">
            <Reveal delay={0.08}>
              <div className="relative">
                {/* floating frame */}
                <div className="absolute -inset-3 rounded-3xl bg-black/[0.03] blur-xl" />
                <div className="relative rounded-3xl border border-black/10 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 shadow-[0_22px_60px_-34px_rgba(0,0,0,0.35)]">
                  <div className="flex items-center justify-between px-5 py-4">
                    <div className="text-xs tracking-[0.22em] text-black/45">
                      EXPAND FOR DETAILS
                    </div>
                    <div className="hidden sm:flex items-center gap-2 text-[12px] text-black/50">
                      <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500/70" />
                      <span>Updated</span>
                    </div>
                  </div>

                  <div className="h-px w-full bg-black/10" />

                  <div className="p-2">
                    {items.map((item, i) => (
                      <FAQRow
                        key={item.q}
                        item={item}
                        index={i}
                        isOpen={openIndex === i}
                        onToggle={() => toggle(i)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------- Accordion Row -------------------- */

function FAQRow({ item, isOpen, onToggle, index }) {
  return (
    <div className="group">
      <motion.button
        type="button"
        onClick={onToggle}
        whileTap={{ scale: 0.995 }}
        className={[
          "w-full rounded-2xl px-4 py-4 text-left",
          "transition",
          "hover:bg-black/[0.03]",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20",
          isOpen ? "bg-black/[0.03]" : "",
        ].join(" ")}
      >
        <div className="flex items-start justify-between gap-5">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-black/10 bg-white text-[11px] text-black/60">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-sm font-medium text-black/85 md:text-[15px]">
                {item.q}
              </span>
            </div>
          </div>

          {/* icon */}
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="mt-[2px] flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-black/10 bg-white text-black/55 shadow-[0_10px_30px_-18px_rgba(0,0,0,.35)]"
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
              <path
                d="M12 5v14M5 12h14"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </motion.span>
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="px-9 pb-3 pt-3 text-sm leading-7 text-black/65 md:text-[14px]">
                {item.a}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}

/* -------------------- Anim helpers -------------------- */

function Reveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  )
}

/* -------------------- Modern 3D Image Card -------------------- */
/**
 * No refs needed during render (React 19 safe)
 * Uses event.currentTarget to get bounds
 */
function TiltCardImage({
  src,
  alt,
  badgeTop = "Premium build",
  badgeBottom = "Quality • Safety • Speed",
}) {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  // smooth tilt
  const rx = useSpring(my, { stiffness: 160, damping: 18, mass: 0.3 })
  const ry = useSpring(mx, { stiffness: 160, damping: 18, mass: 0.3 })

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const px = (x / rect.width - 0.5) * 2 // -1..1
    const py = (y / rect.height - 0.5) * 2 // -1..1

    // set motion values (tilt intensity)
    mx.set(px * 10) // rotateY
    my.set(py * -10) // rotateX
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
          rotateX: rx,
          rotateY: ry,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        className="relative overflow-hidden rounded-3xl border border-black/10 bg-gray-100 shadow-[0_26px_70px_-42px_rgba(0,0,0,0.55)]"
      >
        {/* image */}
        <div className="relative h-[520px] w-full">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={false}
          />
        </div>

        {/* depth layers */}
        <div className="pointer-events-none absolute inset-0">
          {/* glow */}
          <motion.div
            style={{ transform: "translateZ(30px)" }}
            className="absolute -top-20 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-white/35 blur-3xl"
          />
          {/* grid shine */}
          <motion.div
            style={{ transform: "translateZ(20px)" }}
            className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
          {/* gradient overlay */}
          <motion.div
            style={{ transform: "translateZ(10px)" }}
            className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent"
          />
        </div>

        {/* floating badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45 }}
          style={{ transform: "translateZ(40px)" }}
          className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-[12px] text-white backdrop-blur"
        >
          <span className="h-2 w-2 rounded-full bg-white/80" />
          <span className="tracking-wide">{badgeTop}</span>
        </motion.div>

        <motion.div
          style={{ transform: "translateZ(46px)" }}
          className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/20 bg-white/10 p-4 text-white backdrop-blur"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="text-sm font-semibold tracking-tight">
                Need help choosing the right mix?
              </div>
              <div className="mt-1 text-[13px] text-white/80">
                {badgeBottom}
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                <path
                  d="M12 5v14m0 0-5-5m5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>

        {/* subtle border light */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />
      </motion.div>
    </div>
  )
}
