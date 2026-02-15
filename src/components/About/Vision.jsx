"use client"

import React, { useEffect, useMemo, useState } from "react"

// ✅ React 19 safe tilt: uses event.currentTarget (no refs)
function useTilt(max = 10) {
  const [style, setStyle] = useState({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
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
      transform: `perspective(1000px) rotateX(${rX}deg) rotateY(${rY}deg) translateZ(6px)`,
    })
  }

  const onLeave = () => {
    setStyle({
      transform:
        "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
    })
  }

  return { style, onMove, onLeave }
}

// ✅ simple intersection observer for reveal animation
function useInView(options = { threshold: 0.2 }) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = document.getElementById("building-vision-section")
    if (!el) return

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true)
    }, options)

    obs.observe(el)
    return () => obs.disconnect()
  }, [options])

  return inView
}

const Icon = ({ name }) => {
  // minimal inline icons (no extra lib)
  const common = "h-5 w-5 text-zinc-700"
  if (name === "globe") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3c3.2 3.4 3.2 14.6 0 18" />
        <path d="M12 3c-3.2 3.4-3.2 14.6 0 18" />
      </svg>
    )
  }
  if (name === "hand") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M8 11V6a2 2 0 1 1 4 0v5" />
        <path d="M12 11V5a2 2 0 1 1 4 0v6" />
        <path d="M16 12V7a2 2 0 1 1 4 0v8a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6v-2a2 2 0 1 1 4 0v1" />
      </svg>
    )
  }
  if (name === "chip") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="7" y="7" width="10" height="10" rx="2" />
        <path d="M9 1v4M15 1v4M9 19v4M15 19v4M1 9h4M1 15h4M19 9h4M19 15h4" />
      </svg>
    )
  }
  // default: badge
  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 2l3 4 5 1-3 4 1 5-6-2-6 2 1-5-3-4 5-1 3-4z" />
    </svg>
  )
}

export default function BuildingVision() {
  const wrapTilt = useTilt(6)
  const imgTilt = useTilt(10)
  const inView = useInView()

  const items = useMemo(
    () => [
      { icon: "globe", title: "Committed to Sustainability" },
      { icon: "hand", title: "Client-Centered Approach" },
      { icon: "chip", title: "Technological Excellence" },
      { icon: "badge", title: "Excellence in Every Project" },
    ],
    []
  )

  return (
    <section className="w-full bg-white py-16">
      <div
        id="building-vision-section"
        className="mx-auto max-w-6xl px-4"
      >
        <div
          onMouseMove={wrapTilt.onMove}
          onMouseLeave={wrapTilt.onLeave}
          style={wrapTilt.style}
          className={[
            "grid overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 shadow-sm",
            "lg:grid-cols-2",
            "transition-transform duration-200 will-change-transform",
          ].join(" ")}
        >
          {/* Left Image */}
          <div className="relative min-h-[320px] lg:min-h-[520px]">
            <div
              onMouseMove={imgTilt.onMove}
              onMouseLeave={imgTilt.onLeave}
              style={imgTilt.style}
              className="h-full w-full transition-transform duration-200 will-change-transform"
            >
              <img
                src="/vision.jpg" // ✅ put your image in /public/vision.jpg
                alt="Building vision"
                className="h-full w-full object-cover"
              />
            </div>

            {/* subtle shine */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/10" />
          </div>

          {/* Right Content */}
          <div className="relative flex items-center">
            <div className="w-full p-8 lg:p-10">
              <div
                className={[
                  "transition-all duration-700",
                  inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                ].join(" ")}
              >
                <h3 className="text-2xl font-semibold text-zinc-900 lg:text-3xl">
                  Building Your Vision
                </h3>

                <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-600">
                  At Drill, our team’s vast experience and technical mastery turn
                  ambitious ideas into exceptional realities, delivering projects
                  that last a lifetime.
                </p>
              </div>

              {/* Feature Cards */}
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {items.map((it, idx) => (
                  <div
                    key={it.title}
                    className={[
                      "group flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-4",
                      "shadow-[0_1px_0_rgba(0,0,0,0.02)]",
                      "transition-all duration-300",
                      "hover:-translate-y-1 hover:shadow-md",
                      inView
                        ? "translate-y-0 opacity-100"
                        : "translate-y-3 opacity-0",
                    ].join(" ")}
                    style={{
                      transitionDelay: inView ? `${120 + idx * 90}ms` : "0ms",
                    }}
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-lg border border-zinc-200 bg-zinc-50 transition group-hover:scale-[1.03]">
                      <Icon name={it.icon} />
                    </span>
                    <p className="text-sm font-medium text-zinc-800">
                      {it.title}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div
                className={[
                  "mt-8",
                  "transition-all duration-700",
                  inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                ].join(" ")}
                style={{ transitionDelay: inView ? "520ms" : "0ms" }}
              >
                <button className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-900">
                  Collaborate Now
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>
            </div>

            {/* animated ambient blob */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/60 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
