type Props = {
  juego: string
  opciones: string[]
  valor: string
  estado: 'pendiente' | 'correcto' | 'incorrecto'
  onChange: (valor: string) => void
}

const BORDE = {
  pendiente: 'border-white/12',
  correcto: 'border-emerald-300',
  incorrecto: 'border-[#f87171]',
}

export default function FilaPuzzle({ juego, opciones, valor, estado, onChange }: Props) {
  const id = `puzzle-${juego.replace(/\s+/g, '-')}`

  return (
    <li className={`flex items-center justify-between gap-4 rounded-[0.5rem] border-2 bg-[#101824] p-4 ${BORDE[estado]}`}>
      <label htmlFor={id} className="font-display text-lg font-bold text-[#f4f8ff]">{juego}</label>
      <select
        id={id}
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={estado === 'incorrecto'}
        className="min-h-10 rounded-[0.4rem] border border-white/20 bg-[#0a0f19] px-2 font-mono text-sm text-[#e0edff]"
      >
        <option value="">Elegir…</option>
        {opciones.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </li>
  )
}
