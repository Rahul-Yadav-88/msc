"use client"

import React, { useEffect, useMemo, useState } from "react"

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
  const common = "h-5 w-5 text-zinc-700"
  if (name === "globe") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3c3.2 3.4 3.2 14.6 0 18" />
        <path d="M12 3c-3.2 3.4-3.2 14.6 0 18" />
      </svg>
    )
  }
  if (name === "hand") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M8 11V6a2 2 0 1 1 4 0v5" />
        <path d="M12 11V5a2 2 0 1 1 4 0v6" />
        <path d="M16 12V7a2 2 0 1 1 4 0v8a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6v-2a2 2 0 1 1 4 0v1" />
      </svg>
    )
  }
  if (name === "chip") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="7" y="7" width="10" height="10" rx="2" />
        <path d="M9 1v4M15 1v4M9 19v4M15 19v4M1 9h4M1 15h4M19 9h4M19 15h4" />
      </svg>
    )
  }
  return (
    <svg
      className={common}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M12 2l3 4 5 1-3 4 1 5-6-2-6 2 1-5-3-4 5-1 3-4z" />
    </svg>
  )
}

export default function BuildingVision() {
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
      {/* Float animation (scoped) */}
      <style jsx>{`
        @keyframes floaty {
          0% {
            transform: translateY(0px) rotate(-0.2deg);
          }
          50% {
            transform: translateY(-10px) rotate(0.2deg);
          }
          100% {
            transform: translateY(0px) rotate(-0.2deg);
          }
        }
        .floaty {
          animation: floaty 4.5s ease-in-out infinite;
          will-change: transform;
        }
      `}</style>

      <div id="building-vision-section" className="mx-auto max-w-6xl px-4">
        <div
          className={[
            "grid overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 shadow-sm",
            "lg:grid-cols-2",
          ].join(" ")}
        >
          {/* Left Image */}
          <div className="relative flex items-center justify-center p-6 sm:p-8 lg:p-10">
            {/* smaller floating image card */}
            <div
              className={[
                "floaty relative overflow-hidden rounded-2xl border border-zinc-200 bg-white",
                "shadow-[0_18px_40px_rgba(0,0,0,0.12)]",
                // ✅ controls image size
                "w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[520px]",
              ].join(" ")}
            >
              <img
                src="/h2.png"
                alt="Building vision"
                className={[
                  // ✅ controls image height so it’s not too big
                  "h-[240px] w-full object-fill sm:h-[280px] lg:h-[450px]",
                ].join(" ")}
              />

              {/* subtle shine */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/15" />
            </div>

            {/* soft ground shadow so it feels “in air” */}
            <div className="pointer-events-none absolute bottom-8 h-10 w-[70%] max-w-[420px] rounded-full bg-black/10 blur-2xl" />
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
                  At M.S. Construction, our technical expertise and on-ground
                  experience transform ambitious infrastructure ideas into
                  reliable, long-lasting results. We combine modern equipment,
                  structured planning, and disciplined site coordination to
                  deliver projects that meet industry standards and client
                  expectations.
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
                  inView
                    ? "translate-y-0 opacity-100"
                    : "translate-y-3 opacity-0",
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

            {/* ambient blob */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/60 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
