import type { ReactNode } from 'react'
import { TONE_BORDER, TONE_TEXT, type Tone } from '../lib/tones'

type Props = {
  tone?: Tone
  title?: ReactNode
  className?: string
  children: ReactNode
}

export default function Card({ tone = 'neutral', title, className = '', children }: Props) {
  return (
    <section className={`rounded-[0.5rem] border bg-[#101824] p-5 text-[#c9d6ec] ${TONE_BORDER[tone]} ${className}`}>
      {title && <h2 className={`flex items-center gap-2 font-display text-xl font-bold ${TONE_TEXT[tone]}`}>{title}</h2>}
      {children}
    </section>
  )
}
