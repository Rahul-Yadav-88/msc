"use client"

import Image from "next/image"
import { useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"

export default function MeetOurTeam({
  eyebrow = "MEMBERS",
  title = "MEET OUR TEAM",
  team = [
    {
      name: "Esther Howards",
      role: "Founder & CEO",
      img: "/team/team1.jpg",
    },
    {
      name: "Ronald Richard",
      role: "Co-Founder",
      img: "/team/team2.jpg",
    },
    {
      name: "Cameron Williamson",
      role: "Managing Director",
      img: "/team/team3.jpg",
    },
    {
      name: "Bessie Cooper",
      role: "Sales Manager",
      img: "/team/team4.jpg",
    },
  ],
}) {
  const items = useMemo(() => team, [team])

  return (
    <section className="w-full bg-white text-black">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.45 }}
        >
          <div className="flex items-center gap-2 text-[11px] tracking-[0.25em] text-black/45">
            <span className="h-[3px] w-[3px] rounded-full bg-black/20" />
            <span className="h-[3px] w-[3px] rounded-full bg-black/20" />
            <span>{eyebrow}</span>
          </div>

          <h2 className="mt-2 text-4xl font-semibold tracking-tight">
            {title}
          </h2>
        </motion.div>

        {/* Grid (same as screenshot) */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.06}>
              <TeamCard member={m} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------- card -------------------- */

function TeamCard({ member }) {
  const cardRef = useRef(null)
  const [style, setStyle] = useState({})

  const onMove = (e) => {
    const el = cardRef.current
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
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={style}
        className="group"
      >
        {/* image box */}
        <div className="relative aspect-[4/5] w-full overflow-hidden border border-black/10 bg-gray-100">
          <Image
            src={member.img}
            alt={member.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.06]"
            sizes="(max-width: 1024px) 50vw, 25vw"
          />

          {/* soft shine */}
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="absolute -top-24 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-white/35 blur-2xl" />
          </div>
        </div>

        {/* text */}
        <div className="mt-3">
          <p className="text-sm font-semibold">{member.name}</p>
          <p className="mt-0.5 text-xs text-black/55">{member.role}</p>
        </div>
      </div>
    </div>
  )
}

/* -------------------- reveal -------------------- */

function Reveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.45, delay }}
    >
      {children}
    </motion.div>
  )
}
