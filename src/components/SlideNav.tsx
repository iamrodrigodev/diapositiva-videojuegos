import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react'

const navigationButton = 'grid min-h-8 min-w-8 place-items-center rounded-[0.4rem] border border-white/20 hover:bg-white/5 disabled:text-muted disabled:hover:bg-transparent focus-visible:outline-2 focus-visible:outline-cyan'
const pad = (n: number) => String(n).padStart(2, '0')

const COLOR_BLOQUE = ['bg-fg', 'bg-amber', 'bg-cyan', 'bg-mint', 'bg-coral']

type Props = { actual: number; bloques: number[]; onIr: (indice: number) => void }

export default function SlideNav({ actual, bloques, onIr }: Props) {
  const total = bloques.length

  return (
    <nav className="flex items-center gap-3" aria-label="Navegación de diapositivas">
      <button className={navigationButton} type="button" disabled={actual === 0} onClick={() => onIr(actual - 1)} aria-label="Diapositiva anterior">
        <CaretLeftIcon aria-hidden="true" size={17} />
      </button>
      <ol className="flex h-5 items-center gap-1">
        {bloques.map((bloque, i) => (
          <li key={i} className="flex h-full items-center">
            <button
              type="button"
              onClick={() => onIr(i)}
              aria-label={`Ir a la diapositiva ${i + 1}`}
              aria-current={i === actual ? 'step' : undefined}
              className={`w-4 transition-all focus-visible:outline-2 focus-visible:outline-cyan ${COLOR_BLOQUE[bloque]} ${i === actual ? 'h-5' : i < actual ? 'h-2.5 opacity-70' : 'h-2.5 opacity-20 hover:opacity-50'}`}
            />
          </li>
        ))}
      </ol>
      <span aria-live="polite" className="min-w-14 text-center">{pad(actual + 1)} / {pad(total)}</span>
      <button className={navigationButton} type="button" disabled={actual === total - 1} onClick={() => onIr(actual + 1)} aria-label="Diapositiva siguiente">
        <CaretRightIcon aria-hidden="true" size={17} />
      </button>
    </nav>
  )
}
