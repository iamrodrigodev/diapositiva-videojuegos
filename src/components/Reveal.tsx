import { motion } from 'framer-motion'
import type { ComponentProps } from 'react'
import { fadeUp } from '../lib/motion'

// Bloque que entra con fadeUp dentro del stagger de <Slide>.
export default function Reveal(props: ComponentProps<typeof motion.div>) {
  return <motion.div variants={fadeUp} {...props} />
}
