'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function LinkWithChizz() {
  const handleDownloadVCard = async () => {
    const response = await fetch('/api/vcard')
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'Chizz_Cunningham.vcf'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <main className="min-h-screen bg-[#0B0B0C] flex items-center justify-center px-4 py-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-gradient-to-br from-[#1A1A1C] to-[#0F0F10] rounded-3xl p-8 shadow-2xl border border-[#2A2A2C]">
          {/* Profile Image */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center mb-6"
          >
            <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-[#2A2A2C] ring-offset-4 ring-offset-[#1A1A1C]">
              <Image
                src="/Images/Chizz_Cunningham_Image.jpeg"
                alt="Chizz Cunningham"
                fill
                className="object-cover grayscale"
                sizes="128px"
                priority
              />
            </div>
          </motion.div>

          {/* Name & Title */}
          <motion.div variants={itemVariants} className="text-center mb-6">
            <h1 className="font-serif text-white text-2xl sm:text-3xl font-medium tracking-tight">
              Chizz Cunningham
            </h1>
            <p className="text-[#8A8A8A] text-sm mt-2">
              Founder & Software Engineer
            </p>
            <p className="text-[#6A6A6A] text-xs mt-1">
              Archatech Labs LLC
            </p>
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={itemVariants}
            className="text-[#9A9A9A] text-sm text-center leading-relaxed mb-8"
          >
            Tech entrepreneur, investor, and fractional CTO building software platforms and empowering innovation through Archatech Labs.
          </motion.p>

          {/* Save Contact Button */}
          <motion.div variants={itemVariants} className="mb-6">
            <button
              onClick={handleDownloadVCard}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white text-[#0B0B0C] font-semibold text-sm rounded-full hover:bg-[#EFEDE7] transition-colors duration-200 shadow-lg"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16"
                />
              </svg>
              Save Contact
            </button>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="space-y-3">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/chizz-cunningham-664237214/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between px-5 py-4 bg-[#0A66C2]/10 border border-[#0A66C2]/30 rounded-2xl hover:bg-[#0A66C2]/20 transition-colors duration-200 group"
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="text-[#D0D0D0] text-sm font-medium">LinkedIn</span>
              </div>
              <svg
                className="w-4 h-4 text-[#6A6A6A] group-hover:text-[#D0D0D0] transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>

            {/* Twitter/X */}
            <a
              href="https://x.com/techlordchizz"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between px-5 py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors duration-200 group"
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span className="text-[#D0D0D0] text-sm font-medium">X (Twitter)</span>
              </div>
              <svg
                className="w-4 h-4 text-[#6A6A6A] group-hover:text-[#D0D0D0] transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>

          {/* Website Link */}
          <motion.div variants={itemVariants} className="mt-8 text-center">
            <a
              href="/"
              className="text-[#6A6A6A] text-xs hover:text-[#9A9A9A] transition-colors"
            >
              www.chizzcunningham.io
            </a>
          </motion.div>
        </div>

        {/* Branding */}
        <motion.p
          variants={itemVariants}
          className="text-center text-[#4A4A4A] text-xs mt-6"
        >
          Powered by Archatech Labs
        </motion.p>
      </motion.div>
    </main>
  )
}
