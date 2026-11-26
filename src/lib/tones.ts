export type Tone = 'neutral' | 'emerald' | 'blue' | 'violet' | 'red'

export const TONE_BORDER: Record<Tone, string> = {
  neutral: 'border-white/12',
  emerald: 'border-[#6ee7b780]',
  blue: 'border-[#7eb8ff80]',
  violet: 'border-[#c1a5ff80]',
  red: 'border-[#f8717180]',
}

export const TONE_TEXT: Record<Tone, string> = {
  neutral: 'text-[#f4f8ff]',
  emerald: 'text-emerald-300',
  blue: 'text-[#7eb8ff]',
  violet: 'text-[#c1a5ff]',
  red: 'text-[#fca5a5]',
}
