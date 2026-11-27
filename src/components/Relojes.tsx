import { ClockIcon, TimerIcon } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { formatoTiempo } from '../lib/useCronometro'
import { usePersistentState } from '../lib/usePersistentState'

const hora = new Intl.DateTimeFormat('es-PE', { timeZone: 'America/Lima', hour: 'numeric', minute: '2-digit', hour12: true })

type Props = { actual: number; inicio: number; fin: number }

export default function Relojes({ actual, inicio: desde, fin: hasta }: Props) {
  const [ahora, setAhora] = useState(() => Date.now())
  const [inicio, setInicio] = usePersistentState<number | null>('exposicion:inicio', null)
  const [fin, setFin] = usePersistentState<number | null>('exposicion:fin', null)

  useEffect(() => {
    const t = window.setInterval(() => setAhora(Date.now()), 1000)
    return () => window.clearInterval(t)
  }, [])

  useEffect(() => {
    if (actual >= desde && inicio === null) setInicio(Date.now())
    if (actual >= hasta && inicio !== null && fin === null) setFin(Date.now())
  }, [actual, desde, hasta, inicio, fin, setInicio, setFin])

  const segundos = inicio === null ? 0 : Math.max(0, Math.floor(((fin ?? ahora) - inicio) / 1000))

  return (
    <span className="flex items-center justify-self-end gap-4 whitespace-nowrap text-body">
      {inicio !== null && (
        <span className={`flex items-center gap-1.5 ${fin === null ? 'text-amber' : 'text-mint'}`} title={fin === null ? 'Tiempo de exposición' : 'Duración total de la exposición'}>
          <TimerIcon aria-hidden="true" size={16} />
          <span aria-label={`Tiempo de exposición: ${formatoTiempo(segundos)}`}>{formatoTiempo(segundos)}</span>
        </span>
      )}
      <span className="flex items-center gap-1.5">
        <ClockIcon aria-hidden="true" size={16} />
        <time>{hora.format(new Date(ahora))}</time>
      </span>
    </span>
  )
}
