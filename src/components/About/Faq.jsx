"use client"

import Image from "next/image"
import { useMemo, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

export default function FAQSection({
  eyebrow = "FAQ'S",
  title = "FREQUENTLY ASKED QUESTIONS",
  imageSrc = "/faq/faq.jpg",
  faqs = [
    {
      q: "How does Drill ensure transparency throughout the project?",
      a: "We provide regular updates, clear milestones, and shared documentation so you always know the status, timeline, and next steps.",
    },
    {
      q: "What types of construction projects does Drill specialize in?",
      a: "We specialize in residential, commercial, and infrastructure projects—covering design-to-delivery with quality and safety standards.",
    },
    {
      q: "How does Drill address noise and disruption during construction?",
      a: "We plan work schedules, use controlled methods, and maintain on-site coordination to minimize disruption for occupants and neighbors.",
    },
    {
      q: "What technology does Drill use for project management?",
      a: "We use modern project management tools for scheduling, task tracking, and reporting—ensuring clarity and timely delivery.",
    },
    {
      q: "How does Drill handle unexpected changes during a project?",
      a: "We evaluate impact, propose options, confirm approvals, and adjust schedules/budgets transparently—keeping work moving smoothly.",
    },
  ],
}) {
  const items = useMemo(() => faqs, [faqs])
  const [openIndex, setOpenIndex] = useState(-1)

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? -1 : i))

  return (
    <section className="w-full bg-white text-black">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.45 }}
        >
          <div className="flex items-center gap-2 text-[11px] tracking-[0.25em] text-black/45">
            <span className="h-[3px] w-[3px] rounded-full bg-black/20" />
            <span className="h-[3px] w-[3px] rounded-full bg-black/20" />
            <span>{eyebrow}</span>
          </div>

          <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">
            {title}
          </h2>
        </motion.div>

        {/* Layout */}
        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-start">
          {/* Left Image */}
          <div className="lg:col-span-6">
            <Reveal delay={0.05}>
              <TiltImage src={imageSrc} alt="FAQ" />
            </Reveal>
          </div>

          {/* Right Accordion */}
          <div className="lg:col-span-6">
            <Reveal delay={0.08}>
              <div className="mt-2 border border-black/10 bg-white">
                {items.map((item, i) => (
                  <FAQRow
                    key={item.q}
                    item={item}
                    isOpen={openIndex === i}
                    onToggle={() => toggle(i)}
                    showDivider={i !== items.length - 1}
                  />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------- Accordion Row -------------------- */

function FAQRow({ item, isOpen, onToggle, showDivider }) {
  return (
    <div className={showDivider ? "border-b border-black/10" : ""}>
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-5 py-5 text-left flex items-center justify-between gap-6 hover:bg-black/[0.02] transition"
      >
        <span className="text-sm md:text-[15px] font-medium text-black/85">
          {item.q}
        </span>

        {/* Plus icon with animation */}
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.18 }}
          className="flex h-9 w-9 items-center justify-center text-black/60"
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
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 -mt-1 text-sm md:text-[14px] leading-7 text-black/65">
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
      transition={{ duration: 0.45, delay }}
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
        className="relative h-[520px] w-full overflow-hidden border border-black/10 bg-gray-100 transition-transform duration-200"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={false}
        />

        {/* subtle shine */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100">
          <div className="absolute -top-24 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-white/35 blur-2xl" />
        </div>
      </div>
    </div>
  )
}
