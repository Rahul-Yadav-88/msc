"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

const SERVICES = [
  {
    title: "Ready Mix Concrete Production",
    image: "/services/structural.jpg",
    desc: "High-quality ready mix concrete with consistent batching, timely dispatch, and site-ready delivery for all project scales.",
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
    title: "Earthwork & Subgrade Preparation",
    image: "/services/contracting.jpg",
    desc: "Excavation, leveling, compaction, and subgrade preparation to ensure strong foundations and long-term stability.",
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
    title: "Infrastructure Development Support",
    image: "/services/commercial.jpg",
    desc: "End-to-end civil support for roads, drainage, and utilities with skilled manpower, equipment, and on-site coordination.",
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
    title: "Industrial Civil Construction",
    image: "/services/management.jpg",
    desc: "Civil works for warehouses, factories, and platforms with precise execution, safety focus, and schedule adherence.",
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
    title: "Project Coordination & Execution",
    image: "/services/residential.jpg",
    desc: "On-site supervision, resource planning, and milestone tracking to keep work smooth, aligned, and on time.",
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
    title: "Quality Testing & Compliance",
    image: "/services/design.jpg",
    desc: "Slump checks, cube testing, and quality documentation to ensure standards, approvals, and reliable performance.",
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

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()

    const px = (e.clientX - r.left) / r.width // 0..1
    const py = (e.clientY - r.top) / r.height // 0..1

    const ry = clamp((px - 0.5) * 14, -10, 10)
    const rx = clamp((0.5 - py) * 14, -10, 10)

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
      {/* Perspective wrapper */}
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

          {/* Image + hover description overlay */}
          <div className="relative overflow-hidden rounded-xl">
            <div className="relative h-[170px] w-full md:h-[185px]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={index < 3}
              />
            </div>

            {/* dark fade */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* description */}
            <div className="pointer-events-none absolute inset-0 flex items-end p-4 opacity-0 transition-all duration-300 group-hover:opacity-100">
              <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="mt-1 text-xs leading-5 text-white/85">{item.desc}</p>
              </div>
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

      {/* ✅ Global helpers */}
      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .service-card-float {
          transform-style: preserve-3d;
          transition: transform 160ms ease, box-shadow 220ms ease;
          will-change: transform;
          animation: floaty 4.8s ease-in-out infinite;
        }

        /* Stagger float */
        .grid > :nth-child(1) .service-card-float {
          animation-delay: 0s;
        }
        .grid > :nth-child(2) .service-card-float {
          animation-delay: 0.25s;
        }
        .grid > :nth-child(3) .service-card-float {
          animation-delay: 0.5s;
        }
        .grid > :nth-child(4) .service-card-float {
          animation-delay: 0.15s;
        }
        .grid > :nth-child(5) .service-card-float {
          animation-delay: 0.4s;
        }
        .grid > :nth-child(6) .service-card-float {
          animation-delay: 0.65s;
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
