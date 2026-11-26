import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'

// Si la diapositiva no cabe (zoom del navegador, pantalla baja), la escala hacia abajo para evitar el scroll.
export default function AjusteAPantalla({ children }: { children: ReactNode }) {
  const marco = useRef<HTMLDivElement>(null)
  const contenido = useRef<HTMLDivElement>(null)
  const [escala, setEscala] = useState(1)

  useLayoutEffect(() => {
    const m = marco.current
    const c = contenido.current
    if (!m || !c) return
    // offsetHeight no incluye el transform: es la altura natural del contenido.
    const ajustar = () => setEscala(Math.min(1, m.clientHeight / c.offsetHeight))
    const observador = new ResizeObserver(ajustar)
    observador.observe(m)
    observador.observe(c)
    ajustar()
    return () => observador.disconnect()
  }, [])

  return (
    <div ref={marco} className="relative h-full overflow-hidden">
      <div
        ref={contenido}
        className="absolute inset-x-0 top-1/2"
        style={{ transform: `translateY(-50%) scale(${escala})`, transformOrigin: 'center' }}
      >
        {children}
      </div>
    </div>
  )
}
