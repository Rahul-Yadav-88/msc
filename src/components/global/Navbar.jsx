"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { FaInstagram, FaLinkedinIn } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const navLinks = [
    { label: "HOME", href: "/" },
    { label: "ABOUT", href: "/About" },
    { label: "PROJECTS", href: "/Projects" },
    { label: "SERVICES", href: "/Services" },
    { label: "CONTACT", href: "/Contact" },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* 3D / glassy top bar */}
      <div
        className={[
          "w-full border-b border-black/10 bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/65",
          "transition-all duration-300",
          scrolled ? "shadow-[0_10px_30px_-18px_rgba(0,0,0,0.35)]" : "",
        ].join(" ")}
        style={{
          transform: "perspective(1200px) translateZ(0px)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Left: Logo */}
            <motion.div
              className="flex w-auto items-center md:w-[220px]"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex items-center"
                aria-label="MS Constructions"
              >
                <Image
                  src="/logo.jpeg" // ✅ put your file in /public/logo.jpeg
                  alt="MS Constructions Logo"
                  width={290}
                  height={164}
                  priority
                  className="h-20 w-auto object-contain"
                />
              </Link>
            </motion.div>

            {/* Center: Menu (desktop) */}
            <nav className="hidden flex-1 items-center justify-center gap-10 md:flex">
              {navLinks.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.05 * i }}
                >
                  <Link
                    href={item.href}
                    className="relative text-xs font-medium tracking-widest text-black/80 transition duration-200 hover:text-black"
                  >
                    <span className="inline-block transition-transform duration-200 hover:-translate-y-[2px] hover:translate-x-[1px]">
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Right: Social Icons (desktop) */}
            <div className="hidden w-[220px] items-center justify-end gap-5 md:flex">
              <SocialIcon href="https://x.com/" label="X">
                <FaXTwitter className="text-[16px]" />
              </SocialIcon>
              <SocialIcon href="https://instagram.com/" label="Instagram">
                <FaInstagram className="text-[16px]" />
              </SocialIcon>
              <SocialIcon href="https://linkedin.com/" label="LinkedIn">
                <FaLinkedinIn className="text-[16px]" />
              </SocialIcon>
            </div>

            {/* Mobile: Menu button */}
            <div className="flex items-center gap-2 md:hidden">
              <motion.button
                onClick={() => setOpen((v) => !v)}
                className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm"
                whileTap={{ scale: 0.96 }}
                whileHover={{ y: -1 }}
                aria-label="Toggle menu"
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Drawer */}
            <motion.aside
              className="fixed right-0 top-0 z-50 h-full w-[85%] max-w-sm border-l border-black/10 bg-white shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              style={{
                transform: "perspective(1200px) translateZ(0px)",
              }}
            >
              <div className="flex h-16 items-center justify-between border-b border-black/10 px-4">
                {/* Mobile Logo */}
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="flex items-center"
                  aria-label="MS Constructions"
                >
                  <Image
                    src="/logo.jpeg"
                    alt="MS Constructions Logo"
                    width={160}
                    height={60}
                    className="h-9 w-auto object-contain"
                  />
                </Link>

                <button
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-black/10 bg-white px-3 py-2"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-4">
                <nav className="flex flex-col gap-2">
                  {navLinks.map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, delay: 0.05 * i }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="group flex items-center justify-between rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-medium tracking-widest text-black/80 shadow-sm"
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <span className="transition-transform duration-200 group-hover:-translate-y-[2px]">
                          {item.label}
                        </span>
                        <span className="text-black/40 transition-transform duration-200 group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="mt-6">
                  <p className="mb-3 text-xs tracking-widest text-black/50">
                    FOLLOW
                  </p>
                  <div className="flex items-center gap-3">
                    <SocialIcon href="https://x.com/" label="X" large>
                      <FaXTwitter className="text-[18px]" />
                    </SocialIcon>
                    <SocialIcon href="https://instagram.com/" label="Instagram" large>
                      <FaInstagram className="text-[18px]" />
                    </SocialIcon>
                    <SocialIcon href="https://linkedin.com/" label="LinkedIn" large>
                      <FaLinkedinIn className="text-[18px]" />
                    </SocialIcon>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}

function SocialIcon({ href, label, children, large = false }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={[
        "inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white shadow-sm",
        large ? "h-11 w-11" : "h-9 w-9",
        "text-black/80 transition hover:text-black",
      ].join(" ")}
      style={{ transformStyle: "preserve-3d" }}
      whileHover={{
        y: -2,
        rotateX: 8,
        rotateY: -8,
        boxShadow: "0 18px 30px -18px rgba(0,0,0,0.45)",
      }}
      whileTap={{ scale: 0.96 }}
    >
      <span style={{ transform: "translateZ(14px)" }}>{children}</span>
    </motion.a>
  )
}
