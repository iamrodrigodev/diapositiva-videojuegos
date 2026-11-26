import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp } from '../lib/motion'

export default function Lead({ children }: { children: ReactNode }) {
  return (
    <motion.p variants={fadeUp} className="max-w-[64ch] text-[clamp(1rem,1.5vw,1.25rem)] leading-relaxed text-[#c9d6ec] [&_strong]:text-[#f4f8ff]">
      {children}
    </motion.p>
  )
}
