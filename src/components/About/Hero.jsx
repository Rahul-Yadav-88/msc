"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef, useState } from "react"
import { motion } from "framer-motion"

export default function OurStory({
  title = "Our Story",
  heading = "We believe in transforming visions into reality through innovative construction solutions.",
  description = "Drill is a trusted name in the construction industry, specializing in residential, commercial, & infrastructure projects. From concept to completion, we focus on delivering quality craftsmanship, sustainable practices, and seamless project execution.",
  buttonText = "Explore Projects",
  buttonHref = "/projects",
  mainImage = "/story/main.jpg",
  smallImage = "/story/small.jpg",
  points = [
    "Delivering high-quality outcomes while optimizing costs",
    "Quick resolution of unexpected challenges during projects",
    "Blending creativity and functionality in every project",
    "Meticulous attention to detail for superior results every time",
    "Trusted by clients with numerous successful projects.",
  ],
}) {
  return (
    <section className="w-full bg-white text-black">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        {/* Title - same position like screenshot */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.45 }}
          className="text-4xl font-medium"
        >
          {title}
        </motion.h2>

        {/* Main 2-column layout */}
        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* LEFT: Big image */}
          <div className="lg:col-span-6">
            <Reveal delay={0.05}>
              <TiltBox className="relative h-[460px] w-full overflow-hidden bg-gray-100">
                <Image
                  src={mainImage}
                  alt="Our story main"
                  fill
                  className="object-cover"
                  priority
                />
              </TiltBox>
            </Reveal>
          </div>

          {/* RIGHT: Text + button + bottom row */}
          <div className="lg:col-span-6">
            <Reveal delay={0.08}>
              <h3 className="text-xl md:text-2xl font-semibold leading-snug max-w-xl">
                {heading}
              </h3>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-4 text-sm md:text-[15px] leading-7 text-black/70 max-w-xl">
                {description}
              </p>
            </Reveal>

            {/* Button - same simple bordered style */}
            <Reveal delay={0.16}>
              <div className="mt-6">
                <Link
                  href={buttonHref}
                  className="inline-flex items-center gap-3 border border-black/40 px-6 py-3 text-sm font-medium hover:bg-black hover:text-white transition"
                >
                  {buttonText}
                  <span className="text-base">→</span>
                </Link>
              </div>
            </Reveal>

            {/* Bottom row: small image + bullet list */}
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-12 md:items-start">
              {/* Small image */}
              <div className="md:col-span-4">
                <Reveal delay={0.2}>
                  <TiltBox className="relative h-[220px] w-full overflow-hidden bg-gray-100">
                    <Image
                      src={smallImage}
                      alt="Our story small"
                      fill
                      className="object-cover"
                    />
                  </TiltBox>
                </Reveal>
              </div>

              {/* Bullet list - same square bullets like screenshot */}
              <div className="md:col-span-8">
                <Reveal delay={0.24}>
                  <ul className="mt-1 space-y-4 text-sm md:text-[15px] text-black/75">
                    {points.map((p, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <span className="mt-[9px] h-[5px] w-[5px] bg-black shrink-0" />
                        <span className="leading-7">{p}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------- small animation helpers -------------------- */

function Reveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.45, delay }}
    >
      {children}
    </motion.div>
  )
}

/* Subtle 3D tilt (very light so it still looks like screenshot) */
function TiltBox({ children, className = "" }) {
  const ref = useRef(null)
  const [style, setStyle] = useState({})

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    const rx = -((y - r.height / 2) / (r.height / 2)) * 4
    const ry = ((x - r.width / 2) / (r.width / 2)) * 4

    setStyle({
      transform: `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`,
    })
  }

  const onLeave = () => {
    setStyle({ transform: "perspective(900px) rotateX(0deg) rotateY(0deg)" })
    setTimeout(() => setStyle({}), 180)
  }

  return (
    <div className="[perspective:900px]">
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={style}
        className={`${className} transition-transform duration-200`}
      >
        {children}
      </div>
    </div>
  )
}
