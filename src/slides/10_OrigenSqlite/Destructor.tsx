import { motion, useReducedMotion } from 'framer-motion'

export default function Destructor() {
  const reducido = useReducedMotion()

  return (
    <svg viewBox="0 0 480 170" role="img" aria-label="Ilustración: un destructor cuyo programa dependía de un servidor externo; SQLite lo reemplaza dentro del propio programa" className="w-full rounded-lg bg-well">
      <g className="stroke-cyan/25" strokeWidth="1.5" fill="none">
        <path d="M0 132 Q 30 126 60 132 T 120 132 T 180 132 T 240 132 T 300 132 T 360 132 T 420 132 T 480 132" />
        <path d="M0 146 Q 30 140 60 146 T 120 146 T 180 146 T 240 146 T 300 146 T 360 146 T 420 146 T 480 146" />
      </g>
      <motion.g
        animate={reducido ? {} : { y: [0, -2, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M30 104 L330 104 L310 128 L58 128 Z" className="fill-panel stroke-fg/70" strokeWidth="2" />
        <rect x="120" y="80" width="90" height="24" className="fill-panel stroke-fg/70" strokeWidth="2" />
        <rect x="150" y="60" width="40" height="20" className="fill-panel stroke-fg/70" strokeWidth="2" />
        <line x1="170" y1="60" x2="170" y2="28" className="stroke-fg/70" strokeWidth="2" />
        <line x1="158" y1="38" x2="182" y2="38" className="stroke-fg/70" strokeWidth="2" />
        <rect x="235" y="90" width="40" height="14" className="fill-panel stroke-fg/70" strokeWidth="2" />
        <line x1="255" y1="90" x2="285" y2="82" className="stroke-fg/70" strokeWidth="3" />
        <rect x="132" y="86" width="26" height="12" rx="2" className="fill-cyan/80" />
        <text x="145" y="95" textAnchor="middle" className="fill-ink font-mono text-[7px] font-bold">SQLite</text>
      </motion.g>
      <g>
        <rect x="380" y="40" width="80" height="44" rx="4" className="fill-panel stroke-coral" strokeWidth="2" />
        <text x="420" y="58" textAnchor="middle" className="fill-coral font-mono text-[9px] font-bold">Servidor</text>
        <text x="420" y="71" textAnchor="middle" className="fill-coral font-mono text-[9px]">Informix</text>
        <path d="M212 88 C 290 60, 330 60, 378 62" fill="none" className="stroke-coral" strokeWidth="2" strokeDasharray="6 5" />
        <motion.g
          animate={reducido ? {} : { opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          <circle cx="300" cy="66" r="9" className="fill-coral" />
          <text x="300" y="70" textAnchor="middle" className="fill-ink font-mono text-[11px] font-bold">✕</text>
        </motion.g>
      </g>
      <text x="420" y="100" textAnchor="middle" className="fill-muted font-mono text-[8px]">si cae, cae el barco</text>
      <text x="145" y="160" textAnchor="middle" className="fill-cyan font-mono text-[8px]">la base vive dentro del programa</text>
    </svg>
  )
}
