import { ArrowClockwiseIcon, ArrowRightIcon, BugIcon, CheckIcon, CrownIcon, LightbulbIcon, ShuffleIcon, TimerIcon, TrophyIcon } from '@phosphor-icons/react'
import Celebracion from '../../components/Celebracion'
import { CODIGOS_CON_BUGS } from '../../data/codigosConBugs'
import { barajar } from '../../lib/barajar'
import { formatoTiempo, useCronometro } from '../../lib/useCronometro'
import { sonido } from '../../lib/sonido'
import { usePersistentState } from '../../lib/usePersistentState'

const POR_RONDA = 3
const PUNTOS_ACIERTO = 100
const PENALIZACION = 50
const COSTO_PISTA = 25

const nuevaRonda = () => barajar(CODIGOS_CON_BUGS.map((_, i) => i)).slice(0, POR_RONDA)
const accion = 'chamfer flex min-h-10 w-fit items-center gap-2 bg-cyan px-5 font-bold text-ink hover:brightness-110 disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber'

export default function CazaBugs() {
  const [ronda, setRonda] = usePersistentState<number[]>('caza-bugs:ronda', nuevaRonda)
  const [paso, setPaso] = usePersistentState('caza-bugs:paso', 0)
  const [marcadas, setMarcadas] = usePersistentState<number[]>('caza-bugs:marcadas', [])
  const [comprobado, setComprobado] = usePersistentState('caza-bugs:comprobado', false)
  const [pista, setPista] = usePersistentState<number | null>('caza-bugs:pista', null)
  const [puntos, setPuntos] = usePersistentState('caza-bugs:puntos', 0)
  const [record, setRecord] = usePersistentState('caza-bugs:record', 0)
  const reloj = useCronometro('caza-bugs:reloj')

  const codigo = CODIGOS_CON_BUGS[ronda[paso] ?? -1]

  const nueva = () => { setRonda(nuevaRonda()); setPaso(0); setMarcadas([]); setComprobado(false); setPista(null); setPuntos(0); reloj.reiniciar() }

  if (!codigo) {
    return (
      <div role="status" className="relative grid justify-items-center gap-3 rounded-lg border border-cyan/45 bg-panel p-8 text-center">
        <Celebracion activa={puntos > 0 && puntos >= record} />
        <TrophyIcon aria-hidden="true" size={56} className="text-cyan" />
        <p className="font-display text-4xl font-bold text-fg uppercase">{puntos} puntos</p>
        <p className="text-body">{POR_RONDA} códigos revisados en {formatoTiempo(reloj.segundos)}</p>
        <p className="flex items-center gap-2 font-mono text-sm text-amber"><CrownIcon aria-hidden="true" size={18} /> Récord: {record} pts {puntos >= record && puntos > 0 && '· ¡nuevo récord!'}</p>
        <button type="button" onClick={nueva} className={accion}><ShuffleIcon aria-hidden="true" size={18} /> Nuevos códigos</button>
      </div>
    )
  }

  const bugs = Object.keys(codigo.bugs).map(Number)
  const encontrados = marcadas.filter((l) => bugs.includes(l))
  const falsos = marcadas.filter((l) => !bugs.includes(l))
  const perfecto = comprobado && encontrados.length === bugs.length && falsos.length === 0

  const alternar = (linea: number) => {
    if (comprobado) return
    reloj.iniciar()
    setMarcadas((m) => (m.includes(linea) ? m.filter((l) => l !== linea) : [...m, linea]))
  }
  const pedirPista = () => {
    const pendiente = bugs.find((b) => !marcadas.includes(b))
    if (pendiente === undefined) return
    reloj.iniciar()
    setPista(pendiente)
    setPuntos((p) => Math.max(0, p - COSTO_PISTA))
    sonido.pista()
  }
  const comprobar = () => {
    setComprobado(true)
    setPuntos((p) => Math.max(0, p + encontrados.length * PUNTOS_ACIERTO - falsos.length * PENALIZACION))
    if (encontrados.length === bugs.length && falsos.length === 0) sonido.acierto()
    else sonido.error()
  }
  const siguiente = () => {
    setMarcadas([])
    setComprobado(false)
    setPista(null)
    setPaso(paso + 1)
    if (paso + 1 >= ronda.length) {
      reloj.detener()
      setRecord((r) => Math.max(r, puntos))
      sonido.victoria()
    }
  }

  return (
    <div className="relative grid grid-cols-[3fr_2fr] gap-4 max-[900px]:grid-cols-1">
      <Celebracion activa={perfecto} />
      <div className="grid content-start gap-2">
        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-sm">
          <span className="text-muted">Código {paso + 1} / {ronda.length} · {codigo.titulo}</span>
          <span className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-amber"><TimerIcon aria-hidden="true" size={18} /> {formatoTiempo(reloj.segundos)}</span>
            <span className="flex items-center gap-1.5 text-cyan"><TrophyIcon aria-hidden="true" size={18} /> {puntos} pts</span>
          </span>
        </div>
        <ol aria-label="Líneas de código: clic para marcar un bug" className="rounded-lg border border-white/12 bg-well py-2 font-mono text-[0.78rem]">
          {codigo.lineas.map((linea, i) => {
            const marcada = marcadas.includes(i)
            const esBug = bugs.includes(i)
            const enPista = pista !== null && !comprobado && Math.abs(i - pista) <= 1
            const color = comprobado
              ? esBug ? (marcada ? 'bg-mint/15 text-mint' : 'bg-amber/15 text-amber') : marcada ? 'bg-coral/15 text-coral' : 'text-muted'
              : marcada ? 'bg-coral/15 text-fg' : enPista ? 'bg-amber/10 text-fg' : 'text-fg hover:bg-white/5'
            return (
              <li key={i}>
                <button type="button" aria-pressed={marcada} onClick={() => alternar(i)} className={`grid w-full grid-cols-[2.5rem_1.5rem_1fr] items-center text-left focus-visible:outline-2 focus-visible:outline-cyan ${color}`}>
                  <span className="pr-2 text-right text-muted/60 select-none">{i + 1}</span>
                  <span aria-hidden="true">{marcada ? <BugIcon size={14} /> : enPista ? <LightbulbIcon size={14} className="text-amber" /> : ''}</span>
                  <span className="py-0.5 pr-3 break-words whitespace-pre-wrap">{linea}</span>
                </button>
              </li>
            )
          })}
        </ol>
      </div>

      <section className="grid content-start gap-3 rounded-lg border border-cyan/45 bg-panel p-4">
        <h3 className="font-display text-xl font-bold text-fg">Hay {bugs.length} bugs escondidos</h3>
        {!comprobado && <p className="text-sm text-fg">Toca cada <strong>línea con un error</strong> para marcarla 🐞; tócala otra vez para desmarcarla. Luego pulsa <strong>Revisar</strong>.</p>}
        <p className="text-sm text-body">+{PUNTOS_ACIERTO} por bug encontrado · −{PENALIZACION} por falsa alarma · −{COSTO_PISTA} por pista.</p>
        {pista !== null && !comprobado && <p className="text-sm text-amber">💡 Hay un bug entre las líneas {Math.max(1, pista)} y {Math.min(codigo.lineas.length, pista + 2)}.</p>}
        {!comprobado ? (
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={comprobar} disabled={marcadas.length === 0} className={accion}>
              <CheckIcon aria-hidden="true" size={16} /> Revisar ({marcadas.length})
            </button>
            <button type="button" onClick={pedirPista} disabled={pista !== null} className="flex min-h-10 items-center gap-2 rounded-[0.4rem] border border-amber/50 px-3 text-sm text-amber hover:bg-amber/10 disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-cyan">
              <LightbulbIcon aria-hidden="true" size={16} /> Pista (−{COSTO_PISTA})
            </button>
          </div>
        ) : (
          <div role="status" className="grid gap-2 text-sm">
            <p className="font-display text-lg font-bold text-fg">{perfecto ? '¡Limpio! ' : ''}{encontrados.length} de {bugs.length} encontrados{falsos.length > 0 && ` · ${falsos.length} falsa alarma${falsos.length > 1 ? 's' : ''}`}</p>
            <ul className="grid gap-1.5">
              {bugs.map((l) => (
                <li key={l} className={marcadas.includes(l) ? 'text-mint' : 'text-amber'}>
                  <strong>Línea {l + 1}:</strong> <span className="text-body">{codigo.bugs[l]}</span>
                </li>
              ))}
            </ul>
            <button type="button" onClick={siguiente} className={`${accion} mt-1`}>
              {paso + 1 >= ronda.length ? 'Ver resultado' : 'Siguiente código'} <ArrowRightIcon aria-hidden="true" size={16} />
            </button>
          </div>
        )}
        <button type="button" onClick={nueva} className="mt-auto flex w-fit items-center gap-1.5 font-mono text-xs text-muted hover:text-cyan focus-visible:outline-2 focus-visible:outline-cyan">
          <ArrowClockwiseIcon aria-hidden="true" size={14} /> Reiniciar con otros códigos
        </button>
      </section>
    </div>
  )
}
