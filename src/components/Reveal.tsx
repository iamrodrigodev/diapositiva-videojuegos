import { motion } from 'framer-motion'
import type { ComponentProps } from 'react'
import { fadeUp } from '../lib/motion'

export default function Reveal(props: ComponentProps<typeof motion.div>) {
  return <motion.div variants={fadeUp} {...props} />
}
