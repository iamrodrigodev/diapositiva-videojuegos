export type Tone = 'neutral' | 'mint' | 'cyan' | 'amber' | 'coral'

export const TONE_BORDER: Record<Tone, string> = {
  neutral: 'border-white/12',
  mint: 'border-mint/45',
  cyan: 'border-cyan/45',
  amber: 'border-amber/45',
  coral: 'border-coral/45',
}

export const TONE_TEXT: Record<Tone, string> = {
  neutral: 'text-fg',
  mint: 'text-mint',
  cyan: 'text-cyan',
  amber: 'text-amber',
  coral: 'text-coral',
}
