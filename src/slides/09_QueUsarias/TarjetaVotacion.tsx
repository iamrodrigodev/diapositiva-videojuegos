import { useState } from 'react'
import { ALTERNATIVAS, type Alternativa, type CasoVotacion } from '../../data/casosVotacion'

export default function TarjetaVotacion({ caso }: { caso: CasoVotacion }) {
  const [elegida, setElegida] = useState<Alternativa | null>(null)

  return (
    <li className="rounded-[0.5rem] border border-white/12 bg-[#101824] p-4">
      <p className="font-display text-lg font-bold text-[#f4f8ff]">{caso.juego}</p>
      <p className="text-sm text-[#c9d6ec]">{caso.necesidad}</p>
      <div role="group" aria-label={`Alternativa para ${caso.juego}`} className="mt-3 flex flex-wrap gap-2">
        {ALTERNATIVAS.map((a) => {
          const color = elegida === null
            ? 'border-white/20 hover:bg-white/5'
            : a === caso.respuesta
              ? 'border-emerald-300 bg-[#0d453d80] text-emerald-200'
              : a === elegida ? 'border-[#f87171] text-[#fca5a5]' : 'border-white/10 text-[#8997ad]'
          return (
            <button
              key={a}
              type="button"
              aria-pressed={elegida === a}
              onClick={() => setElegida(a)}
              className={`min-h-8 rounded-[0.4rem] border px-3 font-mono text-xs text-[#e0edff] focus-visible:outline-2 focus-visible:outline-[#7eb8ff] ${color}`}
            >
              {a}
            </button>
          )
        })}
      </div>
      <p role="status" className="mt-2 min-h-5 text-sm text-emerald-200">
        {elegida && `${elegida === caso.respuesta ? '✓' : '✗'} ${caso.respuesta}: ${caso.porque}`}
      </p>
    </li>
  )
}
