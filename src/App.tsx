import { CaretLeftIcon, CaretRightIcon, ClockIcon } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import Portada from './slides/01_Portada'

const navigationButton = 'grid min-h-8 min-w-8 place-items-center rounded-[0.4rem] border border-white/19 disabled:text-[#8997ad]'

const limaTime = new Intl.DateTimeFormat('es-PE', {
  timeZone: 'America/Lima',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
})

export default function App() {
  const [time, setTime] = useState(() => limaTime.format(new Date()))

  useEffect(() => {
    const clock = window.setInterval(() => setTime(limaTime.format(new Date())), 1000)
    return () => window.clearInterval(clock)
  }, [])

  return (
    <div className="grid min-h-dvh grid-rows-[1fr_auto] bg-[#0a0d17] font-sans antialiased">
      <main className="presentation-grid grid items-center border-t-2 border-[#76e3c4] bg-[#0d1120]">
        <Portada />
      </main>
      <footer className="relative flex min-h-14 items-center justify-center border-t border-white/12 bg-[#0a0d17] px-[clamp(0.75rem,3vw,2.5rem)] py-2 font-mono text-xs leading-none text-[#e0edff] tabular-nums max-[480px]:justify-between">
        <nav className="flex items-center gap-[0.65rem]" aria-label="Navegación de diapositivas">
          <button className={navigationButton} type="button" disabled aria-label="Diapositiva anterior">
            <CaretLeftIcon aria-hidden="true" size={17} />
          </button>
          <span aria-label="Diapositiva 1 de 1">01 / 01</span>
          <button className={navigationButton} type="button" disabled aria-label="Diapositiva siguiente">
            <CaretRightIcon aria-hidden="true" size={17} />
          </button>
        </nav>
        <span className="absolute right-[clamp(0.75rem,3vw,2.5rem)] flex items-center gap-[0.65rem] text-[#b9c7e0] max-[480px]:static">
          <ClockIcon aria-hidden="true" size={16} />
          <time dateTime={time}>{time}</time>
          <span>Lima</span>
        </span>
      </footer>
    </div>
  )
}
