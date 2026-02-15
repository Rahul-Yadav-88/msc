"use client"

import { useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

const SERVICES = [
  {
    title: "Structural Engineering",
    image: "/services/structural.jpg",
    Icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" {...props}>
        <path
          d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm11-1h5v3h-5v5h-3v-5H7v-3h5V7h3v5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity=".9"
        />
      </svg>
    ),
  },
  {
    title: "General Contracting",
    image: "/services/contracting.jpg",
    Icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" {...props}>
        <path
          d="M12 3l8 4.5-8 4.5-8-4.5L12 3Zm8 8.5-8 4.5-8-4.5M20 16.5 12 21l-8-4.5"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity=".9"
        />
      </svg>
    ),
  },
  {
    title: "Commercial Construction",
    image: "/services/commercial.jpg",
    Icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" {...props}>
        <path
          d="M4 20V7l8-4 8 4v13H4Zm4 0v-7h3v7H8Zm5 0v-10h3v10h-3Z"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity=".9"
        />
      </svg>
    ),
  },
  {
    title: "Project Management",
    image: "/services/management.jpg",
    Icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" {...props}>
        <path
          d="M7 7h10M7 12h6M7 17h10M5 4h14v16H5V4Z"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity=".9"
        />
      </svg>
    ),
  },
  {
    title: "Residential Construction",
    image: "/services/residential.jpg",
    Icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" {...props}>
        <path
          d="M4 10.5 12 4l8 6.5V20H4v-9.5Zm6 9.5v-6h4v6h-4Z"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity=".9"
        />
      </svg>
    ),
  },
  {
    title: "Architectural Design",
    image: "/services/design.jpg",
    Icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" {...props}>
        <path
          d="M4 20V6l8-2 8 2v14H4Zm4-2h8M8 8h8M8 12h8"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity=".9"
        />
      </svg>
    ),
  },
]

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n))
}

function ServiceCard({ item, index }) {
  const ref = useRef(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })

  const floatDelay = useMemo(() => (index % 3) * 0.25, [index])

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()

    const px = (e.clientX - r.left) / r.width // 0..1
    const py = (e.clientY - r.top) / r.height // 0..1

    // rotate ranges
    const ry = clamp((px - 0.5) * 14, -10, 10) // left/right
    const rx = clamp((0.5 - py) * 14, -10, 10) // up/down

    setTilt({ rx, ry })
  }

  const onLeave = () => setTilt({ rx: 0, ry: 0 })

  return (
    <motion.div
      className="group relative border border-neutral-200 bg-white"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Outer perspective wrapper */}
      <div className="perspective-1000">
        <div
          ref={ref}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          className="service-card-float relative h-full select-none p-7 md:p-8"
          style={{
            transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(0)`,
          }}
        >
          {/* Header */}
          <div className="mb-5 flex items-start justify-between gap-4">
            <h3 className="text-[15px] font-medium tracking-wide text-neutral-900 md:text-base">
              {item.title}
            </h3>

            <span className="grid h-9 w-9 place-items-center text-rose-300">
              <item.Icon className="h-6 w-6" />
            </span>
          </div>

          {/* Image */}
          <div className="relative overflow-hidden rounded-none">
            <div className="relative h-[170px] w-full md:h-[185px]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={index < 3}
              />
            </div>

            {/* subtle shine */}
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute -left-1/2 top-0 h-full w-[140%] rotate-12 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
          </div>

          {/* depth shadow */}
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100">
            <div className="absolute left-10 right-10 top-20 h-24 rounded-full bg-neutral-900/10" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ServicesSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-16">
        <motion.h2
          className="mb-10 text-3xl font-medium tracking-tight text-neutral-900 md:text-4xl"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Our Services
        </motion.h2>

        <div className="grid gap-0 border border-neutral-200 md:grid-cols-3">
          {SERVICES.map((item, index) => (
            <ServiceCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>

      {/* CSS helpers (no tailwind config needed) */}
      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .service-card-float {
          transform-style: preserve-3d;
          transition: transform 160ms ease, box-shadow 220ms ease;
          will-change: transform;
          box-shadow: 0 0 0 rgba(0, 0, 0, 0);
          animation: floaty 4.8s ease-in-out infinite;
        }
        /* stagger the float so cards don’t move together */
        .service-card-float {
          animation-delay: var(--float-delay, 0s);
        }

        /* Set delay per card via nth-child */
        .grid > :nth-child(1) .service-card-float {
          --float-delay: 0s;
        }
        .grid > :nth-child(2) .service-card-float {
          --float-delay: 0.25s;
        }
        .grid > :nth-child(3) .service-card-float {
          --float-delay: 0.5s;
        }
        .grid > :nth-child(4) .service-card-float {
          --float-delay: 0.15s;
        }
        .grid > :nth-child(5) .service-card-float {
          --float-delay: 0.4s;
        }
        .grid > :nth-child(6) .service-card-float {
          --float-delay: 0.65s;
        }

        @keyframes floaty {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, -10px, 0);
          }
        }
      `}</style>
    </section>
  )
}
