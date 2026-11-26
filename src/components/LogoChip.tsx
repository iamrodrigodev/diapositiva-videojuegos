import { LOGOS } from '../lib/logos'

// Chip con el logo monocromo del motor (consistente con la paleta) y su nombre.
export default function LogoChip({ nombre }: { nombre: string }) {
  const logo = LOGOS[nombre]
  return (
    <span className="inline-flex items-center gap-1.5 rounded-[0.3rem] border border-white/15 bg-well px-2 py-0.5 font-mono text-xs text-fg">
      {logo && (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-3.5 fill-current">
          <path d={logo.path} />
        </svg>
      )}
      {nombre}
    </span>
  )
}
