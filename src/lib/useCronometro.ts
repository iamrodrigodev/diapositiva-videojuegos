import { useEffect } from 'react'
import { usePersistentState } from './usePersistentState'

type Estado = 'parado' | 'corriendo' | 'detenido'

export function useCronometro(id: string) {
  const [ms, setMs] = usePersistentState(`${id}:ms`, 0)
  const [estado, setEstado] = usePersistentState<Estado>(`${id}:estado`, 'parado')

  useEffect(() => {
    if (estado !== 'corriendo') return
    let ultimo = Date.now()
    const t = window.setInterval(() => {
      const ahora = Date.now()
      const paso = Math.min(ahora - ultimo, 1000)
      if (document.visibilityState === 'visible') setMs((m) => m + paso)
      ultimo = ahora
    }, 250)
    return () => window.clearInterval(t)
  }, [estado, setMs])

  return {
    segundos: Math.floor(ms / 1000),
    iniciar: () => { if (estado === 'parado') setEstado('corriendo') },
    continuar: () => { if (estado !== 'corriendo') setEstado('corriendo') },
    detener:() => { if (estado === 'corriendo') setEstado('detenido') },
    reiniciar: () => { setMs(0); setEstado('parado') },
  }
}

export const formatoTiempo = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
