import type { ButtonHTMLAttributes } from 'react'

const VARIANT = {
  primary: 'bg-emerald-300 font-medium text-[#0a0d17] hover:bg-emerald-200',
  secondary: 'border border-white/20 text-[#e0edff] hover:bg-white/5',
}

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: keyof typeof VARIANT }

export default function Button({ variant = 'primary', className = '', ...props }: Props) {
  return (
    <button
      type="button"
      className={`min-h-10 rounded-[0.4rem] px-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7eb8ff] ${VARIANT[variant]} ${className}`}
      {...props}
    />
  )
}
