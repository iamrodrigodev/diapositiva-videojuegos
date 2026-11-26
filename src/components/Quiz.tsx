import { ArrowClockwiseIcon, ArrowRightIcon, FireIcon, SignOutIcon, TrophyIcon } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { barajar } from '../lib/barajar'
import { sonido } from '../lib/sonido'
import { usePersistentState } from '../lib/usePersistentState'

export type PreguntaQuiz = { pregunta: string; opciones: string[]; correcta: string; explicacion: string }

type Props = {
  id: string
  preguntas: PreguntaQuiz[]
  porRonda: number
  segundos?: number
}

type Ronda = { pregunta: number; opciones: string[] }[]

const SIN_TIEMPO = '⌛'
const LETRAS = ['A', 'B', 'C', 'D']

export default function Quiz({ id, preguntas, porRonda, segundos = 20 }: Props) {
  const nuevaRonda = (): Ronda =>
    barajar(preguntas.map((_, i) => i)).slice(0, porRonda).map((i) => ({ pregunta: i, opciones: barajar(preguntas[i]!.opciones) }))

  const [ronda, setRonda] = usePersistentState<Ronda>(`${id}:ronda`, nuevaRonda)
  const [paso, setPaso] = usePersistentState(`${id}:paso`, 0)
  const [elegida, setElegida] = usePersistentState<string | null>(`${id}:elegida`, null)
  const [puntos, setPuntos] = usePersistentState(`${id}:puntos`, 0)
  const [aciertos, setAciertos] = usePersistentState(`${id}:aciertos`, 0)
  const [racha, setRacha] = usePersistentState(`${id}:racha`, 0)
  const [limite, setLimite] = usePersistentState<number | null>(`${id}:limite`, null)
  const [ahora, setAhora] = useState(() => Date.now())

  const actual = ronda[paso]
  const datos = actual ? preguntas[actual.pregunta] : undefined
  const terminado = paso >= ronda.length
  const restante = limite === null ? segundos : Math.max(0, Math.ceil((limite - ahora) / 1000))

  useEffect(() => {
    if (limite === null || elegida !== null) return
    const t = window.setInterval(() => setAhora(Date.now()), 200)
    return () => window.clearInterval(t)
  }, [limite, elegida])

  const responder = (opcion: string) => {
    if (!datos || elegida !== null) return
    setElegida(opcion)
    if (opcion === datos.correcta) {
      sonido.acierto()
      setPuntos((p) => p + 100 + restante * 5 + racha * 20)
      setAciertos((a) => a + 1)
      setRacha((r) => r + 1)
    } else {
      sonido.error()
      setRacha(0)
    }
  }

  useEffect(() => {
    if (limite !== null && elegida === null && restante === 0) responder(SIN_TIEMPO)
  })

  const empezar = () => { setLimite(Date.now() + segundos * 1000); setAhora(Date.now()) }
  const siguiente = () => {
    setElegida(null)
    setPaso((p) => p + 1)
    if (paso + 1 >= ronda.length) { setLimite(null); sonido.victoria() } else empezar()
  }
  const reiniciar = () => { setRonda(nuevaRonda()); setPaso(0); setElegida(null); setPuntos(0); setAciertos(0); setRacha(0); setLimite(null) }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const i = Number(e.key) - 1
      if (actual && limite !== null && i >= 0 && i < actual.opciones.length) responder(actual.opciones[i]!)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const marcador = (
    <div className="flex items-center gap-4 font-mono text-sm">
      <span className="flex items-center gap-1.5 text-amber"><TrophyIcon aria-hidden="true" size={18} /> {puntos} pts</span>
      <span className={`flex items-center gap-1.5 ${racha > 1 ? 'text-coral' : 'text-muted'}`}><FireIcon aria-hidden="true" size={18} /> racha {racha}</span>
      <span className="text-muted">{Math.min(paso + 1, ronda.length)} / {ronda.length}</span>
    </div>
  )

  if (terminado) {
    return (
      <div role="status" className="grid justify-items-center gap-3 rounded-lg border border-amber/45 bg-panel p-8 text-center">
        <TrophyIcon aria-hidden="true" size={56} className="text-amber" />
        <p className="font-display text-4xl font-bold text-fg uppercase">{puntos} puntos</p>
        <p className="text-body">{aciertos} de {ronda.length} correctas · {aciertos === ronda.length ? '¡Ronda perfecta!' : aciertos >= ronda.length / 2 ? 'Buen trabajo' : 'A repasar el bloque'}</p>
        <button type="button" onClick={reiniciar} className="chamfer mt-2 flex min-h-11 items-center gap-2 bg-amber px-6 font-bold text-ink hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan">
          <ArrowClockwiseIcon aria-hidden="true" size={18} /> Jugar otra ronda
        </button>
      </div>
    )
  }

  if (!actual || !datos) return null

  return (
    <div className="grid gap-4 rounded-lg border border-white/12 bg-panel p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {marcador}
        {(limite !== null || paso > 0) && (
          <button type="button" onClick={reiniciar} className="flex min-h-9 items-center gap-2 rounded-[0.4rem] border border-white/20 px-3 text-sm text-body hover:border-coral hover:text-coral focus-visible:outline-2 focus-visible:outline-cyan">
            <SignOutIcon aria-hidden="true" size={16} /> Salir del juego
          </button>
        )}
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-well" aria-hidden="true">
        <div className={`h-full transition-[width] duration-200 ${restante <= 5 ? 'bg-coral' : 'bg-amber'}`} style={{ width: `${(restante / segundos) * 100}%` }} />
      </div>

      <p className="font-display text-[clamp(1.3rem,2.3vw,2rem)] leading-tight font-bold text-fg">{datos.pregunta}</p>

      {limite === null ? (
        <button type="button" onClick={empezar} className="chamfer flex min-h-12 w-fit items-center gap-2 bg-amber px-6 font-bold text-ink hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan">
          ▶ Empezar ({segundos} s por pregunta)
        </button>
      ) : (
        <div role="group" aria-label="Opciones" className="grid grid-cols-2 gap-3 max-[760px]:grid-cols-1">
          {actual.opciones.map((o, i) => {
            const color = elegida === null
              ? 'border-white/20 hover:border-amber hover:bg-amber/10'
              : o === datos.correcta ? 'border-mint bg-mint/15 text-mint' : o === elegida ? 'border-coral bg-coral/10 text-coral' : 'border-white/10 opacity-50'
            return (
              <button key={o} type="button" disabled={elegida !== null} onClick={() => responder(o)} className={`flex min-h-12 items-center gap-3 rounded-[0.4rem] border px-4 text-left text-fg focus-visible:outline-2 focus-visible:outline-cyan ${color}`}>
                <span className="chamfer grid size-7 shrink-0 place-items-center bg-well font-mono text-sm text-amber">{LETRAS[i]}</span>
                {o}
              </button>
            )
          })}
        </div>
      )}

      {elegida !== null && (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p role="status" className="max-w-[70ch] text-sm text-body">
            <strong className={elegida === datos.correcta ? 'text-mint' : 'text-coral'}>
              {elegida === datos.correcta ? '✓ ¡Correcto! ' : elegida === SIN_TIEMPO ? '⌛ Se acabó el tiempo. ' : '✗ Incorrecto. '}
            </strong>
            {datos.explicacion}
          </p>
          <button type="button" onClick={siguiente} className="chamfer flex min-h-10 items-center gap-2 bg-amber px-5 font-bold text-ink hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan">
            {paso + 1 >= ronda.length ? 'Ver resultado' : 'Siguiente'} <ArrowRightIcon aria-hidden="true" size={16} />
          </button>
        </div>
      )}
    </div>
  )
}
