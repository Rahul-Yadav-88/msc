"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"

export default function ExpertSection(props) {
  const {
    leftImage = "/why-left.jpg",
    smallImage = "/why-small.jpg",
    eyebrow = "WHY CHOOSE US",
    title = "Precision Execution for Reliable Infrastructure Projects",
    description =
      "Choosing M.S. Construction means working with a team that prioritizes quality, efficiency, and structured project coordination. From material sourcing to final delivery, we ensure every stage meets technical standards and timeline commitments.",
    bullets = ["Advanced batching technology", "Transparent project coordination", "Modern fleet & machinery strength"],
    note =
      "Your project goals are our responsibility. We deliver tailored infrastructure solutions designed for durability, compliance, and long-term structural performance.",
    buttonText = "Contact us",
    buttonHref = "/Contact",

    // Layout controls (optional)
    maxWidthClass = "max-w-6xl",
    sectionClassName = "bg-white",
    paddingClassName = "",

    // Effects (optional)
    tiltStrength = 14,
    smallTiltStrength = 10,
    lift = 6,
  } = props || {}

  const revealRef = useRef(null)
  const [show, setShow] = useState(false)

  // ✅ Scroll reveal
  useEffect(() => {
    const el = revealRef.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShow(true)
      },
      { threshold: 0.2 }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section className={sectionClassName}>
      <div className={`mx-auto ${maxWidthClass} px-6 ${paddingClassName}`}>
        <div
          ref={revealRef}
          className={`grid gap-10 lg:grid-cols-12 items-start transition-all duration-700 ${
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* LEFT BIG IMAGE */}
          <div className="lg:col-span-5 ">
            <TiltImage
              src={leftImage}
              alt="Construction image"
              className="relative w-full h-[36vw] rounded-lg overflow-hidden bg-black/5"
              strength={tiltStrength}
              lift={lift}
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="lg:col-span-7">
            <p className="text-xs tracking-widest text-black/40 uppercase">{eyebrow}</p>

            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-black leading-tight">
              {title}
            </h2>

            <p className="mt-4 text-sm sm:text-base text-black/60 leading-relaxed max-w-2xl">
              {description}
            </p>

            {/* Bullet row */}
            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-3 text-sm text-black/70">
              {bullets.map((b) => (
                <div key={b} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-black/25" />
                  <span className="font-medium">{b}</span>
                </div>
              ))}
            </div>

            {/* Bottom row */}
            <div className="mt-10 grid gap-8 md:grid-cols-12 items-start">
              <div className="md:col-span-5">
                <TiltImage
                  src={smallImage}
                  alt="Worker image"
                  className="relative w-full aspect-[4/3] overflow-hidden bg-black/5"
                  strength={smallTiltStrength}
                  lift={lift}
                />
              </div>

              <div className="md:col-span-7">
                <p className="text-sm sm:text-base text-black/60 leading-relaxed">
                  {note}
                </p>

                <Link
                  href={buttonHref}
                  className="mt-8 inline-flex items-center gap-3 border border-black/25 px-6 py-3 text-sm text-black/80 hover:text-black hover:border-black/45 transition"
                >
                  {buttonText} <span className="text-base">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------- 3D Tilt Image (no library) -------------------- */
function TiltImage({ src, alt, className = "", strength = 14, lift = 6 }) {
  const ref = useRef(null)
  const [isHover, setIsHover] = useState(false)
  const [style, setStyle] = useState({})

  const base = useMemo(
    () => ({
      transition: isHover
        ? "transform 60ms linear"
        : "transform 500ms cubic-bezier(.2,.8,.2,1)",
    }),
    [isHover]
  )

  const onMove = (e) => {
    const el = ref.current
    if (!el) return

    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top

    const rotateY = ((x - r.width / 2) / r.width) * strength
    const rotateX = -((y - r.height / 2) / r.height) * strength

    setIsHover(true)
    setStyle({
      transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-${lift}px)`,
    })
  }

  const onLeave = () => {
    setIsHover(false)
    setStyle({
      transform: "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)",
    })
  }

  return (
    <div style={{ perspective: "1000px" }}>
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={`${className} will-change-transform`}
        style={{ ...base, ...style }}
      >
        <Image src={src} alt={alt} fill className="object-cover rounded-lg" />

        {/* Shine */}
        <div className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition duration-500">
          <div className="absolute -inset-[40%] bg-gradient-to-br from-white/35 via-white/0 to-white/0 rotate-12" />
        </div>

        {/* Border highlight */}
        <div className="pointer-events-none absolute inset-0 ring-1 ring-black/10" />
      </div>
    </div>
  )
}
