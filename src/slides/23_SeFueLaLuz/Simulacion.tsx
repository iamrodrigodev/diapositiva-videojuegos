import { ArrowClockwiseIcon, ArrowRightIcon, CheckCircleIcon, FloppyDiskIcon, PowerIcon, XCircleIcon, WarningIcon } from '@phosphor-icons/react'
import { useEffect } from 'react'
import { sonido } from '../../lib/sonido'
import { usePersistentState } from '../../lib/usePersistentState'

type Partida = { nivel: number; lugar: string; objetos: string[] }
type Fase = 'listo' | 'guardando' | 'cortado' | 'reabierto' | 'completo'

const ANTES: Partida = { nivel: 7, lugar: 'Estación norte', objetos: ['🔦 Linterna', '💊 Botiquín ×2'] }
const NUEVA: Partida = { nivel: 8, lugar: 'Faro', objetos: ['🔦 Linterna', '🗝️ Llave roja'] }

const PASOS: { texto: string; aplicar: (p: Partida) => Partida }[] = [
  { texto: 'Cambiar nivel y lugar', aplicar: (p) => ({ ...p, nivel: NUEVA.nivel, lugar: NUEVA.lugar }) },
  { texto: 'Vaciar el inventario viejo', aplicar: (p) => ({ ...p, objetos: [] }) },
  { texto: 'Guardar 🔦 Linterna', aplicar: (p) => ({ ...p, objetos: [...p.objetos, '🔦 Linterna'] }) },
  { texto: 'Guardar 🗝️ Llave roja', aplicar: (p) => ({ ...p, objetos: [...p.objetos, '🗝️ Llave roja'] }) },
]

const hasta = (k: number) => PASOS.slice(0, k).reduce((p, paso) => paso.aplicar(p), ANTES)

function Ranura({ partida, titulo }: { partida: Partida; titulo: string }) {
  return (
    <div className="rounded-lg border border-white/15 bg-well p-3">
      <p className="font-mono text-xs tracking-[0.15em] text-muted uppercase">{titulo}</p>
      <p className="mt-1 font-display text-xl font-bold text-fg">Nivel {partida.nivel} · {partida.lugar}</p>
      <p className="mt-1 text-sm text-body">Inventario: {partida.objetos.length ? partida.objetos.join(', ') : <span className="font-bold text-coral">vacío</span>}</p>
    </div>
  )
}

const boton = 'flex min-h-12 items-center gap-2 rounded-[0.4rem] px-5 text-lg font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan'

export default function Simulacion() {
  const [fase, setFase] = usePersistentState<Fase>('luz2:fase', 'listo')
  const [hechos, setHechos] = usePersistentState('luz2:hechos', 0)

  useEffect(() => {
    if (fase !== 'guardando') return
    const t = window.setInterval(() => setHechos((k) => Math.min(k + 1, PASOS.length)), 1300)
    return () => window.clearInterval(t)
  }, [fase, setHechos])

  useEffect(() => {
    if (fase === 'guardando' && hechos >= PASOS.length) { setFase('completo'); sonido.acierto() }
  }, [fase, hechos, setFase])

  const guardar = () => { setHechos(0); setFase('guardando'); sonido.pista() }
  const cortar = () => { setFase('cortado'); sonido.error() }
  const reabrir = () => setFase('reabierto')
  const reiniciar = () => { setFase('listo'); setHechos(0) }

  const sinTransaccion = hasta(hechos)
  const corrupta = hechos > 0 && hechos < PASOS.length

  const instruccion = {
    listo: <>① Pulsa <strong className="text-mint">Guardar partida</strong>.</>,
    guardando: <>② ¡Rápido! <strong className="text-coral">Cierra el juego de golpe</strong> antes de que termine.</>,
    cortado: <>③ El juego se cerró. <strong className="text-amber">Vuelve a abrir el juego</strong>: ¿qué quedó guardado?</>,
    reabierto: <>Compara las dos ranuras. ¿Cuál preferirías como jugador?</>,
    completo: <>Esta vez no cerraste el juego: los dos guardados terminaron bien. <strong className="text-fg">Prueba otra vez y ciérralo a mitad.</strong></>,
  }[fase]

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 max-[800px]:grid-cols-1">
        <Ranura titulo="Lo que había guardado" partida={ANTES} />
        <ArrowRightIcon aria-hidden="true" size={28} className="justify-self-center text-muted max-[800px]:rotate-90" />
        <Ranura titulo="Lo que quieres guardar ahora" partida={NUEVA} />
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-lg border border-white/12 bg-panel p-3">
        {fase === 'listo' && <button type="button" onClick={guardar} className={`${boton} chamfer bg-mint text-ink hover:brightness-110`}><FloppyDiskIcon aria-hidden="true" size={22} /> Guardar partida</button>}
        {fase === 'guardando' && <button type="button" onClick={cortar} className={`${boton} chamfer animate-pulse bg-coral text-ink hover:brightness-110`}><XCircleIcon aria-hidden="true" size={22} /> Cerrar el juego de golpe</button>}
        {fase === 'cortado' && <button type="button" onClick={reabrir} className={`${boton} chamfer bg-amber text-ink hover:brightness-110`}><PowerIcon aria-hidden="true" size={22} /> Volver a abrir el juego</button>}
        {(fase === 'reabierto' || fase === 'completo') && <button type="button" onClick={reiniciar} className={`${boton} border border-white/20 text-fg hover:bg-white/5`}><ArrowClockwiseIcon aria-hidden="true" size={22} /> Probar otra vez</button>}
        <p role="status" className="text-lg text-body">{instruccion}</p>
      </div>

      <div className={`grid gap-2 ${fase === 'cortado' ? 'opacity-40' : ''} ${fase === 'reabierto' ? 'hidden' : ''}`}>
        <div className="h-2 overflow-hidden rounded-full bg-well" aria-hidden="true">
          <div className="h-full bg-mint transition-[width] duration-700" style={{ width: `${(hechos / PASOS.length) * 100}%` }} />
        </div>
        <ol className="grid grid-cols-4 gap-2 text-sm max-[800px]:grid-cols-2">
          {PASOS.map((p, i) => {
            const estado = i < hechos ? 'hecho' : fase === 'guardando' && i === hechos ? 'ahora' : (fase === 'cortado' || fase === 'reabierto') ? 'perdido' : 'pendiente'
            const estilos = { hecho: 'border-mint/50 text-fg', ahora: 'border-amber text-amber', perdido: 'border-coral/40 text-muted line-through', pendiente: 'border-white/10 text-muted' }[estado]
            return <li key={p.texto} className={`rounded-[0.4rem] border px-3 py-2 ${estilos}`}>{i < hechos ? '✓' : `${i + 1}.`} {p.texto}</li>
          })}
        </ol>
      </div>

      {fase === 'reabierto' && (
        <div className="grid grid-cols-2 gap-4 max-[800px]:grid-cols-1">
          <section className={`grid gap-2 rounded-lg border-2 p-4 ${corrupta ? 'border-coral bg-coral/10' : 'border-white/15 bg-panel'}`}>
            <p className="flex items-center gap-2 font-display text-lg font-bold text-coral"><WarningIcon aria-hidden="true" size={22} /> Sin transacción</p>
            <Ranura titulo="Al volver a abrir" partida={sinTransaccion} />
            <p className="font-bold text-coral">{corrupta ? 'Partida rota: se guardó la mitad. Perdiste objetos que sí tenías.' : 'Hubo suerte: el corte no partió el guardado.'}</p>
          </section>
          <section className="grid gap-2 rounded-lg border-2 border-mint bg-mint/10 p-4">
            <p className="flex items-center gap-2 font-display text-lg font-bold text-mint"><CheckCircleIcon aria-hidden="true" size={22} /> Con transacción</p>
            <Ranura titulo="Al volver a abrir" partida={ANTES} />
            <p className="font-bold text-mint">Todo como antes de guardar: solo se pierde el último avance, nunca la partida.</p>
          </section>
        </div>
      )}

      {fase === 'reabierto' && <p className="text-center font-display text-2xl font-bold text-fg uppercase">Transacción = todo o nada</p>}
    </div>
  )
}
