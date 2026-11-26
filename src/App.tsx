import { useCallback, useEffect, useState } from 'react'
import LimaClock from './components/LimaClock'
import SlideNav from './components/SlideNav'
import { SLIDES } from './slides'

const ultima = SLIDES.length - 1
const BLOQUES = SLIDES.map((s) => s.bloque)

export default function App() {
  const [actual, setActual] = useState(0)
  const ir = useCallback((indice: number) => setActual(Math.min(Math.max(indice, 0), ultima)), [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // No robar las flechas a los controles de las diapositivas interactivas.
      if (e.target instanceof HTMLElement && e.target.closest('select, input, textarea')) return
      if (e.key === 'ArrowRight' || e.key === 'PageDown') setActual((i) => Math.min(i + 1, ultima))
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') setActual((i) => Math.max(i - 1, 0))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const Diapositiva = SLIDES[actual]?.Componente

  return (
    <div className="grid min-h-dvh grid-rows-[1fr_auto] bg-ink-deep font-sans antialiased">
      <main className="presentation-grid grid items-center bg-ink">
        {Diapositiva && <Diapositiva key={actual} />}
      </main>
      <footer className="relative flex min-h-14 items-center justify-center border-t border-white/12 bg-ink-deep px-[clamp(0.75rem,3vw,2.5rem)] py-2 font-mono text-xs leading-none text-fg tabular-nums max-[480px]:justify-between">
        <SlideNav actual={actual} bloques={BLOQUES} onIr={ir} />
        <LimaClock />
      </footer>
    </div>
  )
}
