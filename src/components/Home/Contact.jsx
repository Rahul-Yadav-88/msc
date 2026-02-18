"use client"

import React, { useState } from "react"

function useTilt(max = 10) {
  const [style, setStyle] = useState({
    transform: "perspective(900px) rotateX(0deg) rotateY(0deg)",
  })

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const midX = rect.width / 2
    const midY = rect.height / 2

    const rotateY = ((x - midX) / midX) * max
    const rotateX = -((y - midY) / midY) * max

    setStyle({
      transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
    })
  }

  const handleLeave = () => {
    setStyle({
      transform: "perspective(900px) rotateX(0deg) rotateY(0deg)",
    })
  }

  return {
    style,
    handleMove,
    handleLeave,
  }
}

export default function ContactSection() {
  const cardTilt = useTilt(8)
  const imageTilt = useTilt(12)

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        {/* Heading */}
        <div className="mb-10">
          <p className="text-xs tracking-[0.25em] text-zinc-400">CONTACT US</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight text-zinc-900">
            LET&apos;S CONNECT
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">

          {/* LEFT CARD */}
          <div className="lg:col-span-4">
            <div
              onMouseMove={cardTilt.handleMove}
              onMouseLeave={cardTilt.handleLeave}
              style={cardTilt.style}
              className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-transform duration-200"
            >
              <div
                onMouseMove={imageTilt.handleMove}
                onMouseLeave={imageTilt.handleLeave}
                style={imageTilt.style}
                className="overflow-hidden rounded-lg border border-zinc-200 transition-transform duration-200"
              >
                <img
                  src="/h14.png"
                  alt="Contact"
                  className="h-[220px] w-full object-fill transition duration-500 hover:scale-105"
                />
              </div>

              <div className="mt-6 space-y-6 text-sm">
                <div>
                  <p className="text-xs text-zinc-500">Send us an email</p>
                  <p className="mt-1 text-base font-medium">
                    msconstruction495@gmail.com
                  </p>
                </div>

                <div>
                  <p className="text-xs text-zinc-500">Give us a call</p>
                  <p className="mt-1 text-base font-medium">
                    +91 98138 62442
                  </p>
                </div>

                <div>
                  <p className="text-xs text-zinc-500">Address</p>
                  <p className="mt-1 text-base font-medium">
                    Jhajjar-Rewari Road
NH 71, VPO Dadanpur

                    <br />
                    District Jhajjar, Haryana

                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="lg:col-span-8">
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h3 className="text-2xl font-semibold">
                Send a message
              </h3>
              <p className="mt-2 text-sm text-zinc-500">
                Send us a message, and our team will get back to you promptly.
              </p>

              <form
                className="mt-8 space-y-6"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="text"
                  placeholder="Full Name*"
                  className="h-12 w-full rounded-md border border-zinc-200 px-4 text-sm outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200"
                />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <input
                    type="email"
                    placeholder="Email*"
                    className="h-12 rounded-md border border-zinc-200 px-4 text-sm outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200"
                  />
                  <input
                    type="tel"
                    placeholder="Phone No"
                    className="h-12 rounded-md border border-zinc-200 px-4 text-sm outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200"
                  />
                </div>

                <textarea
                  rows={6}
                  placeholder="Write your message here*"
                  className="w-full rounded-md border border-zinc-200 px-4 py-3 text-sm outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200"
                />

                <div className="flex justify-end">
                  <button className="inline-flex items-center gap-2 rounded-md border border-zinc-300 px-5 py-3 text-sm font-medium transition hover:-translate-y-1 hover:shadow-md">
                    Submit Now →
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
