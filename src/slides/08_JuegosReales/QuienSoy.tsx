import { ArrowClockwiseIcon, ArrowRightIcon, LightbulbIcon, SignOutIcon, TrophyIcon } from '@phosphor-icons/react'
import LogoChip from '../../components/LogoChip'
import { CASOS, type CasoReal } from '../../data/casosReales'
import { barajar } from '../../lib/barajar'
import { sonido } from '../../lib/sonido'
import { usePersistentState } from '../../lib/usePersistentState'

const POR_RONDA = 5
const PUNTOS = [300, 200, 100]

type Ronda = { juego: string; opciones: string[] }[]

const nuevaRonda = (): Ronda =>
  barajar(CASOS).slice(0, POR_RONDA).map((c) => ({
    juego: c.juego,
    opciones: barajar([c.tecnologia, ...barajar(CASOS.filter((o) => o.tecnologia !== c.tecnologia)).slice(0, 3).map((o) => o.tecnologia)]),
  }))

const pistasDe = (c: CasoReal) => [c.pista, `Tipo: ${c.tipo}.`, `Empieza por «${c.tecnologia[0]}» y tiene ${c.tecnologia.length} caracteres.`]

// «¿Quién soy?»: se revelan pistas de a una; acertar con menos pistas da más puntos.
export default function QuienSoy() {
  const [ronda, setRonda] = usePersistentState<Ronda>('quien-soy:ronda', nuevaRonda)
  const [paso, setPaso] = usePersistentState('quien-soy:paso', 0)
  const [vistas, setVistas] = usePersistentState('quien-soy:pistas', 1)
  const [elegida, setElegida] = usePersistentState<string | null>('quien-soy:elegida', null)
  const [puntos, setPuntos] = usePersistentState('quien-soy:puntos', 0)
  const [aciertos, setAciertos] = usePersistentState('quien-soy:aciertos', 0)
  const [jugando, setJugando] = usePersistentState('quien-soy:jugando', false)

  const actual = ronda[paso]
  const caso = CASOS.find((c) => c.juego === actual?.juego)

  const reiniciar = () => { setRonda(nuevaRonda()); setPaso(0); setVistas(1); setElegida(null); setPuntos(0); setAciertos(0) }
  const salir = () => { reiniciar(); setJugando(false) }

  if (!jugando) {
    return (
      <div className="grid justify-items-center gap-3 rounded-lg border border-white/12 bg-panel p-8 text-center">
        <LightbulbIcon aria-hidden="true" size={48} className="text-amber" />
        <p className="font-display text-3xl font-bold text-fg uppercase">{POR_RONDA} juegos · 3 pistas cada uno</p>
        <p className="max-w-[52ch] text-body">Empiezas con una pista. Cada pista extra baja el premio: {PUNTOS.join(' → ')} puntos. Elige la tecnología entre cuatro opciones.</p>
        <button type="button" onClick={() => setJugando(true)} className="chamfer mt-2 flex min-h-12 items-center gap-2 bg-amber px-6 font-bold text-ink hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan">
          ▶ Empezar
        </button>
      </div>
    )
  }

  if (!actual || !caso) {
    return (
      <div role="status" className="grid justify-items-center gap-3 rounded-lg border border-amber/45 bg-panel p-8 text-center">
        <TrophyIcon aria-hidden="true" size={56} className="text-amber" />
        <p className="font-display text-4xl font-bold text-fg uppercase">{puntos} puntos</p>
        <p className="text-body">{aciertos} de {ronda.length} juegos adivinados</p>
        <button type="button" onClick={salir} className="chamfer mt-2 flex min-h-11 items-center gap-2 bg-amber px-6 font-bold text-ink hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan">
          <ArrowClockwiseIcon aria-hidden="true" size={18} /> Otra ronda
        </button>
      </div>
    )
  }

  const pistas = pistasDe(caso)
  const valor = PUNTOS[vistas - 1] ?? 100

  const responder = (opcion: string) => {
    if (elegida) return
    setElegida(opcion)
    if (opcion === caso.tecnologia) { sonido.acierto(); setPuntos((p) => p + valor); setAciertos((a) => a + 1) } else sonido.error()
  }
  const siguiente = () => {
    setElegida(null)
    setVistas(1)
    setPaso((p) => p + 1)
    if (paso + 1 >= ronda.length) sonido.victoria()
  }

  return (
    <div className="grid grid-cols-[1fr_1fr] gap-5 max-[900px]:grid-cols-1">
      <section className="grid content-start gap-2.5 rounded-lg border border-white/12 bg-panel p-4">
        <div className="flex items-center justify-between font-mono text-sm">
          <span className="text-muted">Juego {paso + 1} / {ronda.length}</span>
          <span className="flex items-center gap-1.5 text-amber"><TrophyIcon aria-hidden="true" size={18} /> {puntos} pts</span>
          <button type="button" onClick={salir} className="flex min-h-8 items-center gap-1.5 rounded-[0.4rem] border border-white/20 px-2.5 text-xs text-body hover:border-coral hover:text-coral focus-visible:outline-2 focus-visible:outline-cyan">
            <SignOutIcon aria-hidden="true" size={14} /> Salir
          </button>
        </div>
        <p className="font-display text-[clamp(1.8rem,3.4vw,3rem)] leading-none font-bold text-fg uppercase">{caso.juego}</p>
        <p className="text-body">¿Con qué tecnología persiste sus datos?</p>
        <ol className="grid gap-2">
          {pistas.slice(0, elegida ? 3 : vistas).map((p, i) => (
            <li key={p} className="flex gap-2 rounded-[0.4rem] border border-amber/30 bg-amber/5 px-3 py-2 text-sm text-fg">
              <LightbulbIcon aria-hidden="true" size={18} className="shrink-0 text-amber" /> <span><span className="font-mono text-xs text-amber">Pista {i + 1}:</span> {p}</span>
            </li>
          ))}
        </ol>
        {!elegida && (
          <div className="flex flex-wrap gap-2">
            {vistas < 3 && (
              <button type="button" onClick={() => { setVistas(vistas + 1); sonido.pista() }} className="flex min-h-9 items-center gap-2 rounded-[0.4rem] border border-amber/50 px-3 text-sm text-amber hover:bg-amber/10 focus-visible:outline-2 focus-visible:outline-cyan">
                <LightbulbIcon aria-hidden="true" size={16} /> Otra pista (vale {PUNTOS[vistas]} pts)
              </button>
            )}
          </div>
        )}
      </section>

      <section className="grid content-start gap-3">
        <p className="font-mono text-xs tracking-[0.2em] text-muted uppercase">Respuesta · ahora vale {valor} pts</p>
        <div role="group" aria-label="Tecnologías" className="grid grid-cols-2 gap-3">
          {actual.opciones.map((o) => {
            const color = !elegida
              ? 'border-white/20 hover:border-amber hover:bg-amber/10'
              : o === caso.tecnologia ? 'border-mint bg-mint/15' : o === elegida ? 'border-coral bg-coral/10' : 'border-white/10 opacity-40'
            return (
              <button key={o} type="button" disabled={!!elegida} onClick={() => responder(o)} className={`flex min-h-11 items-center justify-center rounded-[0.4rem] border px-3 focus-visible:outline-2 focus-visible:outline-cyan ${color}`}>
                <LogoChip nombre={o} />
              </button>
            )
          })}
        </div>
        {elegida && (
          <div role="status" className={`grid gap-1.5 rounded-lg border p-3 text-sm ${elegida === caso.tecnologia ? 'border-mint/50 bg-mint/5' : 'border-coral/50 bg-coral/5'}`}>
            <p className="font-display text-lg font-bold text-fg">{elegida === caso.tecnologia ? `✓ ¡Correcto! +${valor} pts` : `✗ Era ${caso.tecnologia}`}</p>
            <p className="font-mono text-xs text-cyan">{caso.tipo}</p>
            <p className="text-body">{caso.detalle}</p>
            <p className="font-mono text-xs text-muted">Fuente: {caso.fuente}</p>
            <button type="button" onClick={siguiente} className="chamfer mt-1 flex min-h-10 w-fit items-center gap-2 bg-amber px-5 font-bold text-ink hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan">
              {paso + 1 >= ronda.length ? 'Ver resultado' : 'Siguiente juego'} <ArrowRightIcon aria-hidden="true" size={16} />
            </button>
          </div>
        )}
      </section>
    </div>
  )
}
