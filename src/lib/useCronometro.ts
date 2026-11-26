import { useEffect, useState } from 'react'
import { usePersistentState } from './usePersistentState'

export function useCronometro(id: string) {
  const [inicio, setInicio] = usePersistentState<number | null>(`${id}:inicio`, null)
  const [fin, setFin] = usePersistentState<number | null>(`${id}:fin`, null)
  const [ahora, setAhora] = useState(() => Date.now())

  useEffect(() => {
    if (inicio === null || fin !== null) return
    const t = window.setInterval(() => setAhora(Date.now()), 250)
    return () => window.clearInterval(t)
  }, [inicio, fin])

  const segundos = inicio === null ? 0 : Math.floor(((fin ?? ahora) - inicio) / 1000)

  return {
    segundos,
    iniciar: () => { if (inicio === null) setInicio(Date.now()) },
    detener: () => { if (inicio !== null && fin === null) setFin(Date.now()) },
    reiniciar: () => { setInicio(null); setFin(null) },
  }
}

export const formatoTiempo = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
