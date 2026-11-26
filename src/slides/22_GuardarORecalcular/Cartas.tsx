import { ArrowClockwiseIcon, CalculatorIcon, CrownIcon, FireIcon, FloppyDiskIcon, SignOutIcon, TimerIcon, TrophyIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import Celebracion from '../../components/Celebracion'
import { MAZO_GUARDAR } from '../../data/guardarORecalcular'
import { barajar } from '../../lib/barajar'
import { sonido } from '../../lib/sonido'
import { formatoTiempo, useCronometro } from '../../lib/useCronometro'
import { usePersistentState } from '../../lib/usePersistentState'

const POR_RONDA = 8
const nuevaRonda = () => barajar(MAZO_GUARDAR.map((c) => c.id)).slice(0, POR_RONDA)
const carta = (id: string) => MAZO_GUARDAR.find((c) => c.id === id)!

type Respuesta = { id: string; guardar: boolean }

const VUELO = {
  entra: { y: 30, opacity: 0, scale: 0.92, x: 0, rotate: 0 },
  quieta: { y: 0, opacity: 1, scale: 1, x: 0, rotate: 0 },
  sale: (guardar: boolean | undefined) => ({ x: guardar ? 420 : -420, rotate: guardar ? 14 : -14, opacity: 0 }),
}

const grande = 'flex min-h-16 flex-1 items-center justify-center gap-3 rounded-lg border-2 px-4 font-display text-xl font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan disabled:opacity-40'

export default function Cartas() {
  const [ronda, setRonda] = usePersistentState<string[]>('cartas:ronda', nuevaRonda)
  const [respuestas, setRespuestas] = usePersistentState<Respuesta[]>('cartas:respuestas', [])
  const [racha, setRacha] = usePersistentState('cartas:racha', 0)
  const [record, setRecord] = usePersistentState('cartas:record', 0)
  const reloj = useCronometro('cartas:reloj')

  const paso = respuestas.length
  const id = ronda[paso]
  const ultima = respuestas[paso - 1]
  const aciertos = respuestas.filter((r) => carta(r.id).guardar === r.guardar).length
  const terminado = paso >= ronda.length

  const responder = (guardar: boolean) => {
    if (!id) return
    reloj.iniciar()
    const bien = carta(id).guardar === guardar
    setRespuestas((r) => [...r, { id, guardar }])
    setRacha((x) => (bien ? x + 1 : 0))
    if (bien) sonido.acierto()
    else sonido.error()
    if (paso + 1 >= ronda.length) {
      reloj.detener()
      setRecord((r) => Math.max(r, aciertos + (bien ? 1 : 0)))
      sonido.victoria()
    }
  }
  const reiniciar = () => { setRonda(nuevaRonda()); setRespuestas([]); setRacha(0); reloj.reiniciar() }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && e.target.closest('input, select, textarea')) return
      if (e.key === 'g' || e.key === 'G') responder(true)
      if (e.key === 'r' || e.key === 'R') responder(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const marcador = (
    <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-sm">
      <span className="text-muted">Carta {Math.min(paso + 1, ronda.length)} / {ronda.length}</span>
      <span className="flex items-center gap-4">
        <span className={`flex items-center gap-1.5 ${racha > 1 ? 'text-coral' : 'text-muted'}`}><FireIcon aria-hidden="true" size={18} /> racha {racha}</span>
        <span className="flex items-center gap-1.5 text-amber"><TimerIcon aria-hidden="true" size={18} /> {formatoTiempo(reloj.segundos)}</span>
        <span className="flex items-center gap-1.5 text-muted"><CrownIcon aria-hidden="true" size={18} /> récord {record}/{POR_RONDA}</span>
        {paso > 0 && <button type="button" onClick={reiniciar} className="flex items-center gap-1 rounded-[0.3rem] border border-white/20 px-2 py-1 text-xs text-body hover:border-coral hover:text-coral focus-visible:outline-2 focus-visible:outline-cyan"><SignOutIcon aria-hidden="true" size={14} /> Salir</button>}
      </span>
    </div>
  )

  if (terminado) {
    return (
      <div role="status" className="relative grid justify-items-center gap-3 rounded-lg border border-mint/45 bg-panel p-8 text-center">
        <Celebracion activa={aciertos === ronda.length} />
        <TrophyIcon aria-hidden="true" size={56} className="text-mint" />
        <p className="font-display text-4xl font-bold text-fg uppercase">{aciertos} de {ronda.length}</p>
        <p className="text-body">en {formatoTiempo(reloj.segundos)} · {aciertos === ronda.length ? '¡Guardado perfecto!' : aciertos >= ronda.length * 0.7 ? 'Buen criterio' : 'Repasa la regla de oro'}</p>
        <button type="button" onClick={reiniciar} className="chamfer mt-2 flex min-h-11 items-center gap-2 bg-mint px-6 font-bold text-ink hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan">
          <ArrowClockwiseIcon aria-hidden="true" size={18} /> Otras cartas
        </button>
      </div>
    )
  }

  const enJuego = carta(id!)

  return (
    <div className="grid gap-4">
      {marcador}
      <div className="relative grid min-h-48 place-items-center overflow-hidden">
        <AnimatePresence mode="popLayout" custom={ultima?.guardar}>
          <motion.div
            key={id}
            custom={ultima?.guardar}
            variants={VUELO}
            initial="entra"
            animate="quieta"
            exit="sale"
            transition={{ duration: 0.3 }}
            className="w-full max-w-xl rounded-xl border-2 border-white/20 bg-panel p-6 text-center shadow-[0_12px_40px_#00000080]"
          >
            <p className="font-mono text-xs tracking-[0.2em] text-muted uppercase">¿Este dato se guarda?</p>
            <p className="mt-3 font-display text-[clamp(1.5rem,2.6vw,2.2rem)] leading-tight font-bold text-fg">{enJuego.dato}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex gap-4">
        <button type="button" onClick={() => responder(false)} className={`${grande} border-amber text-amber hover:bg-amber/10`}>
          <CalculatorIcon aria-hidden="true" size={26} /> Recalcular <kbd className="rounded border border-amber/50 px-1.5 font-mono text-sm">R</kbd>
        </button>
        <button type="button" onClick={() => responder(true)} className={`${grande} border-mint text-mint hover:bg-mint/10`}>
          <FloppyDiskIcon aria-hidden="true" size={26} /> Guardar <kbd className="rounded border border-mint/50 px-1.5 font-mono text-sm">G</kbd>
        </button>
      </div>
      <p role="status" className="min-h-6 text-center text-sm">
        {ultima && (
          <span className={carta(ultima.id).guardar === ultima.guardar ? 'text-mint' : 'text-coral'}>
            {carta(ultima.id).guardar === ultima.guardar ? '✓' : '✗'} «{carta(ultima.id).dato}»: {carta(ultima.id).guardar ? 'se guarda' : 'se recalcula'}. <span className="text-body">{carta(ultima.id).porque}</span>
          </span>
        )}
      </p>
    </div>
  )
}
