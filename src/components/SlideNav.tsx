import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react'

const navigationButton = 'grid min-h-8 min-w-8 place-items-center rounded-[0.4rem] border border-white/19 hover:bg-white/5 disabled:text-[#8997ad] disabled:hover:bg-transparent'
const pad = (n: number) => String(n).padStart(2, '0')

type Props = { actual: number; total: number; onIr: (indice: number) => void }

export default function SlideNav({ actual, total, onIr }: Props) {
  return (
    <nav className="flex items-center gap-[0.65rem]" aria-label="Navegación de diapositivas">
      <button className={navigationButton} type="button" disabled={actual === 0} onClick={() => onIr(actual - 1)} aria-label="Diapositiva anterior">
        <CaretLeftIcon aria-hidden="true" size={17} />
      </button>
      <span aria-live="polite" aria-label={`Diapositiva ${actual + 1} de ${total}`}>{pad(actual + 1)} / {pad(total)}</span>
      <button className={navigationButton} type="button" disabled={actual === total - 1} onClick={() => onIr(actual + 1)} aria-label="Diapositiva siguiente">
        <CaretRightIcon aria-hidden="true" size={17} />
      </button>
    </nav>
  )
}
