import { CheckCircleIcon, PlayIcon, WarningIcon } from '@phosphor-icons/react'
import { useState } from 'react'
import Card from '../../components/Card'
import CodeBlock from '../../components/CodeBlock'
import DataTable from '../../components/DataTable'
import { sonido } from '../../lib/sonido'
import { usePersistentState } from '../../lib/usePersistentState'

const ATAQUE = "ana'; DROP TABLE jugadores; --"
const JUGADORES: [number, string, number][] = [[1, 'ana', 7], [2, 'luis', 3], [3, 'sofia', 5]]

type Resultado = { tipo: 'filas'; filas: [number, string, number][] } | { tipo: 'borrada' }

function ejecutar(nombre: string, parametrizada: boolean): Resultado {
  if (!parametrizada && /drop\s+table/i.test(nombre)) return { tipo: 'borrada' }
  const buscado = parametrizada ? nombre : nombre.split("'")[0]!
  return { tipo: 'filas', filas: JUGADORES.filter(([, n]) => n === buscado) }
}

function Salida({ resultado }: { resultado: Resultado | null }) {
  if (!resultado) return <p className="text-sm text-muted">Pulsa «Ejecutar» para ver qué devuelve la base.</p>
  if (resultado.tipo === 'borrada') return <p className="rounded-[0.4rem] border border-coral bg-coral/15 p-3 font-bold text-coral">💥 La tabla «jugadores» fue eliminada: se perdieron todos los jugadores.</p>
  return resultado.filas.length
    ? <DataTable nombre={`${resultado.filas.length} fila encontrada`} columnas={['id', 'nombre', 'nivel']} filas={resultado.filas} />
    : <p className="rounded-[0.4rem] border border-mint/50 bg-mint/10 p-3 text-mint">0 filas: no existe un jugador con ese nombre exacto. La tabla sigue intacta.</p>
}

const ejecutarBoton = 'chamfer flex min-h-9 w-fit items-center gap-2 px-4 text-sm font-bold text-ink hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan'

export default function DemoInyeccion() {
  const [nombre, setNombre] = usePersistentState('inyeccion:nombre', ATAQUE)
  const [mal, setMal] = useState<Resultado | null>(null)
  const [bien, setBien] = useState<Resultado | null>(null)
  const cambiar = (v: string) => { setNombre(v); setMal(null); setBien(null) }
  const peligro = nombre.includes("'")

  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <label htmlFor="nombre-jugador" className="text-body">El jugador escribe su nombre:</label>
        <input id="nombre-jugador" value={nombre} onChange={(e) => cambiar(e.target.value)} className="min-h-10 min-w-72 flex-1 rounded-[0.4rem] border border-amber/50 bg-well px-3 font-mono text-fg focus-visible:outline-2 focus-visible:outline-cyan" />
        <button type="button" onClick={() => cambiar('ana')} className="min-h-10 rounded-[0.4rem] border border-white/20 px-3 text-sm text-fg hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-cyan">Nombre normal</button>
        <button type="button" onClick={() => cambiar(ATAQUE)} className="min-h-10 rounded-[0.4rem] border border-coral/50 px-3 text-sm text-coral hover:bg-coral/10 focus-visible:outline-2 focus-visible:outline-cyan">Escribir un ataque</button>
      </div>
      <div className="grid grid-cols-2 gap-4 max-[900px]:grid-cols-1">
        <Card tone="coral" className="flex flex-col gap-2" title={<><WarningIcon aria-hidden="true" size={22} /> Concatenando texto</>}>
          <CodeBlock code={`cmd.CommandText = "SELECT * FROM jugadores WHERE nombre = '" + nombre + "'";`} />
          <p className="font-mono text-xs text-muted">SQL que recibe la base:</p>
          <pre className="overflow-x-auto rounded-[0.4rem] bg-well p-3 font-mono text-[0.8rem] text-fg">SELECT * FROM jugadores WHERE nombre = '<span className={peligro ? 'bg-coral/30 text-coral' : 'text-amber'}>{nombre}</span>'</pre>
          {peligro && <p className="text-sm text-coral">La comilla cierra el texto: lo que sigue se ejecuta como otra orden SQL.</p>}
          <button type="button" onClick={() => { const r = ejecutar(nombre, false); setMal(r); if (r.tipo === 'borrada') sonido.error() }} className={`${ejecutarBoton} bg-coral`}><PlayIcon aria-hidden="true" size={16} /> Ejecutar</button>
          <Salida resultado={mal} />
        </Card>
        <Card tone="mint" className="flex flex-col gap-2" title={<><CheckCircleIcon aria-hidden="true" size={22} /> Con parámetro</>}>
          <CodeBlock code={`cmd.CommandText = "SELECT * FROM jugadores WHERE nombre = @nombre";
cmd.Parameters.AddWithValue("@nombre", nombre);`} />
          <p className="font-mono text-xs text-muted">La base recibe la orden y el dato por separado:</p>
          <pre className="overflow-x-auto rounded-[0.4rem] bg-well p-3 font-mono text-[0.8rem] text-fg">@nombre = <span className="text-mint">{JSON.stringify(nombre)}</span></pre>
          <p className="text-sm text-body">El dato nunca se ejecuta: siempre es solo un texto a buscar.</p>
          <button type="button" onClick={() => { setBien(ejecutar(nombre, true)); sonido.acierto() }} className={`${ejecutarBoton} bg-mint`}><PlayIcon aria-hidden="true" size={16} /> Ejecutar</button>
          <Salida resultado={bien} />
        </Card>
      </div>
    </div>
  )
}
