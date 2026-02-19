"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Sparkles,
  ShieldCheck,
  Clock,
  CheckCircle2,
} from "lucide-react"

export default function ContactPage({
  title = "Contact Us",
  subtitle = "Tell us about your infrastructure requirements. Our team will respond within 24 hours.",
  email = "msconstruction495@gmail.com",
  phone = "+91 98138 62442",
  address = "Jhajjar-Rewari Road NH 71, VPO Dadanpur District Jhajjar, Haryana",
}) {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [sent, setSent] = useState(false)

  const features = useMemo(
    () => [
      { Icon: Clock, label: "Fast response", desc: "Reply within 24 hours" },
      { Icon: ShieldCheck, label: "Reliable team", desc: "Site-ready support" },
      { Icon: Sparkles, label: "Clear estimates", desc: "Transparent pricing" },
    ],
    []
  )

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const onSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 1600)
    alert("Message Sent ✔")
  }

  return (
    <section className="relative overflow-hidden bg-[#f3f6ff] py-16 text-[#0b1020]">
      {/* Unique background: ribbon + dots + soft blobs */}
      <div className="pointer-events-none absolute inset-0">
        {/* diagonal ribbon */}
        <div className="absolute -top-24 left-1/2 h-[520px] w-[1200px] -translate-x-1/2 rotate-[-10deg] rounded-[80px] bg-white/70 shadow-[0_60px_140px_rgba(15,23,42,0.10)]" />
        {/* blobs */}
        <motion.div
          className="absolute -top-40 left-[-120px] h-[520px] w-[520px] rounded-full bg-blue-300/40 blur-3xl"
          animate={{ y: [0, 18, 0], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-48 right-[-140px] h-[520px] w-[520px] rounded-full bg-indigo-300/40 blur-3xl"
          animate={{ y: [0, -18, 0], opacity: [0.32, 0.52, 0.32] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* dotted texture */}
        <div className="absolute inset-0 opacity-[0.25] [background-image:radial-gradient(rgba(15,23,42,0.18)_1px,transparent_1px)] [background-size:18px_18px]" />
        {/* subtle grid */}
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(15,23,42,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.10)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-[11px] tracking-[0.26em] text-black/60 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            CONTACT
          </div>

          <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <h1 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
              {title}
            </h1>

            {/* mini feature chips */}
            <div className="flex flex-wrap gap-2">
              {features.map(({ Icon, label }) => (
                <div
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/65 px-3 py-1 text-xs text-black/70 shadow-sm"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-black/60 sm:text-base">
            {subtitle}
          </p>
        </motion.div>

        {/* Layout: unique split with stacked "info tiles" */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch">
          {/* Left column: info tiles */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5 h-full"
          >
            <div className="grid h-full gap-4">
              <DepthTile>
                <TileRow icon={Mail} title="Email" value={email} />
              </DepthTile>

              <DepthTile>
                <TileRow icon={Phone} title="Phone" value={phone} />
              </DepthTile>

              <DepthTile>
                <TileRow icon={MapPin} title="Address" value={address} />
              </DepthTile>

              {/* big info card */}
              <DepthTile className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs tracking-[0.22em] text-black/50">M.S. CONSTRUCTION</p>
                    <h3 className="mt-2 text-lg font-semibold">Project support, end-to-end.</h3>
                    <p className="mt-2 text-sm text-black/60">
                      Share your requirement and timeline — we’ll guide you with the best approach.
                    </p>
                  </div>

                  <motion.div
                    className="hidden sm:inline-flex items-center rounded-2xl border border-black/10 bg-white/70 px-3 py-1.5 text-xs text-black/60 shadow-sm"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                  >
                    24×7
                  </motion.div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3">
                  {[
                    { label: "Quality", desc: "Tested" },
                    { label: "Delivery", desc: "On-time" },
                    { label: "Support", desc: "Site-ready" },
                  ].map((x) => (
                    <div
                      key={x.label}
                      className="rounded-2xl border border-black/10 bg-white/70 px-3 py-3 text-center shadow-sm"
                    >
                      <p className="text-sm font-semibold">{x.label}</p>
                      <p className="mt-0.5 text-xs text-black/55">{x.desc}</p>
                    </div>
                  ))}
                </div>
              </DepthTile>
            </div>
          </motion.div>

          {/* Right column: form (3D depth, no tilt) */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.06 }}
            className="lg:col-span-7 h-full"
          >
            <FormShell>
              <form onSubmit={onSubmit} className="flex h-full flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold">Send a message</h3>
                    <p className="mt-1 text-sm text-black/60">
                      We’ll reply with next steps and an estimate.
                    </p>
                  </div>

                  <motion.span
                    className="mt-2 h-2.5 w-2.5 rounded-full bg-blue-600/70"
                    animate={{ opacity: [0.35, 1, 0.35] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Full name">
                    <Input
                      name="name"
                      value={form.name}
                      onChange={onChange}
                      placeholder="Rahul Yadav"
                      autoComplete="name"
                    />
                  </Field>

                  <Field label="Email">
                    <Input
                      name="email"
                      value={form.email}
                      onChange={onChange}
                      placeholder="rahul@gmail.com"
                      autoComplete="email"
                    />
                  </Field>

                  <div className="sm:col-span-2">
                    <Field label="Message">
                      <Textarea
                        name="message"
                        value={form.message}
                        onChange={onChange}
                        placeholder="Tell us your project type, location, and timeline..."
                      />
                    </Field>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-xs text-black/55">
                    <span className="inline-flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4" />
                      Your details stay private.
                    </span>
                  </div>

                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                  >
                    {sent ? (
                      <>
                        Sent <CheckCircle2 className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Send <Send className="h-4 w-4 transition group-hover:translate-x-0.5" />
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </FormShell>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ----------------- Unique UI Blocks (no tilt) ----------------- */

function DepthTile({ children, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      {/* back layer */}
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-3xl bg-white/75 shadow-[0_30px_90px_rgba(15,23,42,0.12)]"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* front layer */}
      <div className="relative rounded-3xl border border-black/10 bg-white/70 p-5 backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 rounded-3xl [box-shadow:inset_0_1px_0_rgba(255,255,255,0.95)]" />
        <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-70 [background:radial-gradient(circle_at_22%_15%,rgba(59,130,246,0.16),transparent_45%)]" />
        {children}
      </div>
    </div>
  )
}

function FormShell({ children }) {
  return (
    <div className="relative h-full">
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-[34px] bg-white/85 shadow-[0_40px_120px_rgba(15,23,42,0.14)]"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative h-full rounded-[34px] border border-black/10 bg-white/75 p-6 sm:p-8 backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 rounded-[34px] [box-shadow:inset_0_1px_0_rgba(255,255,255,0.95)]" />
        <div className="pointer-events-none absolute inset-0 rounded-[34px] opacity-70 [background:radial-gradient(circle_at_30%_18%,rgba(99,102,241,0.14),transparent_50%)]" />
        {children}
      </div>
    </div>
  )
}

function TileRow({ icon: Icon, title, value }) {
  return (
    <div className="flex items-start gap-3">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-black/10 bg-white/80">
        <Icon className="h-5 w-5 text-black/70" />
      </span>
      <div className="min-w-0">
        <p className="text-xs text-black/50">{title}</p>
        <p className="mt-0.5 text-sm font-semibold text-black/80 break-words">{value}</p>
      </div>
    </div>
  )
}

/* ----------------- Form UI ----------------- */

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm text-black/60">{label}</span>
      {children}
    </label>
  )
}

function Input(props) {
  return (
    <input
      {...props}
      required
      className="w-full rounded-2xl border border-black/10 bg-white/85 px-4 py-3 text-sm text-black/80 placeholder:text-black/35 outline-none transition focus:border-blue-500/60 focus:bg-white"
    />
  )
}

function Textarea(props) {
  return (
    <textarea
      {...props}
      rows={7}
      required
      className="w-full resize-none rounded-2xl border border-black/10 bg-white/85 px-4 py-3 text-sm text-black/80 placeholder:text-black/35 outline-none transition focus:border-blue-500/60 focus:bg-white"
    />
  )
}
