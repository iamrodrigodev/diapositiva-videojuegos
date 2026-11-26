import { motion, useReducedMotion } from 'framer-motion'

const CICLO = 4
const repetir = { duration: CICLO, repeat: Infinity, ease: 'linear' as const }

export default function Destructor() {
  const reducido = useReducedMotion()

  return (
    <svg viewBox="0 0 480 180" role="img" aria-label="Ilustración: el barco envía una consulta al servidor Informix, el servidor cae y no responde; SQLite, dentro del barco, no depende de él" className="w-full rounded-lg bg-well">
      <g className="stroke-cyan/25" strokeWidth="1.5" fill="none">
        <path d="M0 140 Q 30 134 60 140 T 120 140 T 180 140 T 240 140 T 300 140 T 360 140 T 420 140 T 480 140" />
        <path d="M0 154 Q 30 148 60 154 T 120 154 T 180 154 T 240 154 T 300 154 T 360 154 T 420 154 T 480 154" />
      </g>

      <motion.g animate={reducido ? {} : { y: [0, -2, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
        <path d="M20 112 L320 112 L300 136 L48 136 Z" className="fill-panel stroke-fg/70" strokeWidth="2" />
        <rect x="100" y="84" width="110" height="28" className="fill-panel stroke-fg/70" strokeWidth="2" />
        <rect x="135" y="64" width="40" height="20" className="fill-panel stroke-fg/70" strokeWidth="2" />
        <line x1="155" y1="64" x2="155" y2="34" className="stroke-fg/70" strokeWidth="2" />
        <line x1="143" y1="44" x2="167" y2="44" className="stroke-fg/70" strokeWidth="2" />
        <rect x="235" y="98" width="40" height="14" className="fill-panel stroke-fg/70" strokeWidth="2" />
        <line x1="255" y1="98" x2="285" y2="90" className="stroke-fg/70" strokeWidth="3" />

        <g transform="translate(112 88)">
          <rect width="86" height="20" rx="3" className="fill-cyan/15 stroke-cyan" strokeWidth="1.5" />
          <g className="stroke-cyan" fill="none" strokeWidth="1.4" transform="translate(6 3)">
            <ellipse cx="6" cy="2.5" rx="6" ry="2.2" />
            <path d="M0 2.5 V11.5 C0 12.8 2.7 13.8 6 13.8 S12 12.8 12 11.5 V2.5" />
            <path d="M0 7 C0 8.3 2.7 9.3 6 9.3 S12 8.3 12 7" />
          </g>
          <text x="52" y="14" textAnchor="middle" className="fill-cyan font-mono text-[9px] font-bold">SQLite</text>
        </g>
      </motion.g>

      <motion.g animate={reducido ? {} : { opacity: [1, 1, 0.35, 0.35, 1] }} transition={{ ...repetir, times: [0, 0.4, 0.45, 0.85, 1] }}>
        <rect x="372" y="28" width="92" height="74" rx="5" className="fill-panel stroke-coral" strokeWidth="2" />
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(388 ${38 + i * 14})`}>
            <rect width="60" height="10" rx="2" className="fill-none stroke-coral/80" strokeWidth="1.3" />
            <circle cx="7" cy="5" r="1.6" className="fill-coral" />
            <line x1="24" y1="5" x2="52" y2="5" className="stroke-coral/60" strokeWidth="1.3" />
          </g>
        ))}
        <text x="418" y="96" textAnchor="middle" className="fill-coral font-mono text-[9px] font-bold">Informix</text>
      </motion.g>
      <text x="418" y="118" textAnchor="middle" className="fill-muted font-mono text-[8px]">servidor externo</text>

      <path d="M210 92 C 280 70, 320 64, 370 64" fill="none" className="stroke-fg/25" strokeWidth="2" strokeDasharray="5 5" />

      {!reducido && (
        <>
          <motion.g
            animate={{ x: [0, 160, 160, 160], y: [0, -28, -28, -28], opacity: [1, 1, 0, 0] }}
            transition={{ ...repetir, times: [0, 0.4, 0.42, 1] }}
          >
            <rect x="196" y="84" width="50" height="14" rx="7" className="fill-amber" />
            <text x="221" y="94" textAnchor="middle" className="fill-ink font-mono text-[8px] font-bold">consulta</text>
          </motion.g>
          <motion.g
            animate={{ opacity: [0, 0, 1, 1, 0] }}
            transition={{ ...repetir, times: [0, 0.42, 0.46, 0.8, 0.85] }}
          >
            <circle cx="372" cy="64" r="11" className="fill-coral" />
            <text x="372" y="68.5" textAnchor="middle" className="fill-ink font-mono text-[13px] font-bold">✕</text>
            <rect x="300" y="14" width="80" height="14" rx="7" className="fill-coral/20 stroke-coral" strokeWidth="1" />
            <text x="340" y="24" textAnchor="middle" className="fill-coral font-mono text-[8px] font-bold">sin respuesta</text>
          </motion.g>
        </>
      )}

      <text x="155" y="172" textAnchor="middle" className="fill-cyan font-mono text-[8px]">la base va dentro del programa</text>
      <text x="418" y="132" textAnchor="middle" className="fill-coral font-mono text-[8px]">si cae, el sistema se cae</text>
    </svg>
  )
}
