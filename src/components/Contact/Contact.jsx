"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"

export default function ContactPage({
  title = "Contact Us",
  subtitle = "Tell us about your infrastructure requirements. Our team will respond within 24 hours.",
  email = "msconstruction495@gmail.com",
  phone = "+91 98138 62442",
  address = "Jhajjar-Rewari Road NH 71, VPO Dadanpur District Jhajjar, Haryana",
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert("Message Sent ✔")
  }

  return (
    <section className="relative overflow-hidden bg-gray-50 py-16 text-black">
      
      {/* Floating Background Lights */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute top-[-150px] left-1/2 h-[450px] w-[800px] -translate-x-1/2 rounded-full bg-blue-200/40 blur-3xl"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-120px] right-[-100px] h-[350px] w-[350px] rounded-full bg-indigo-200/40 blur-3xl"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <h1 className="text-4xl font-semibold md:text-5xl">{title}</h1>
          <p className="mt-4 text-gray-600">{subtitle}</p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
          
          {/* Info Section */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-white p-8 shadow-xl"
            >
              <h3 className="text-lg font-semibold">Contact Details</h3>

              <div className="mt-6 space-y-4 text-sm">
                <InfoRow label="Email" value={email} />
                <InfoRow label="Phone" value={phone} />
                <InfoRow label="Address" value={address} />
              </div>
            </motion.div>
          </div>

          {/* Form Section */}
          <div className="lg:col-span-7">
            <TiltCard>
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-2xl bg-white p-8 shadow-2xl"
              >
                <h3 className="text-lg font-semibold">Send Message</h3>

                <div className="mt-6 space-y-5">
                  <Input
                    label="Full Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                  />
                  <Input
                    label="Email Address"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                  <Textarea
                    label="Message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>

                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  type="submit"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                  Send Message →
                </motion.button>
              </motion.form>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- UI Components ---------- */

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between border-b border-gray-200 pb-3 text-gray-700">
      <span>{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}

function Input({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm text-gray-600">{label}</span>
      <input
        {...props}
        required
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-black"
      />
    </label>
  )
}

function Textarea({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm text-gray-600">{label}</span>
      <textarea
        {...props}
        rows={5}
        required
        className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-black"
      />
    </label>
  )
}

/* ---------- 3D Tilt Wrapper ---------- */

function TiltCard({ children }) {
  const ref = useRef(null)
  const [style, setStyle] = useState({})

  const handleMove = (e) => {
    const el = ref.current
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const rotateX = -((y - rect.height / 2) / (rect.height / 2)) * 5
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 5

    setStyle({
      transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
    })
  }

  const reset = () => {
    setStyle({
      transform: "perspective(900px) rotateX(0deg) rotateY(0deg)",
      transition: "transform 200ms ease",
    })
  }

  return (
    <div className="[perspective:900px]">
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={style}
        className="transition-transform duration-200"
      >
        {children}
      </div>
    </div>
  )
}
