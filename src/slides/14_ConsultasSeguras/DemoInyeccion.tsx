import { CheckCircleIcon, WarningIcon } from '@phosphor-icons/react'
import Card from '../../components/Card'
import CodeBlock from '../../components/CodeBlock'
import { usePersistentState } from '../../lib/usePersistentState'

const ATAQUE = "ana'; DROP TABLE jugadores; --"

export default function DemoInyeccion() {
  const [nombre, setNombre] = usePersistentState('inyeccion:nombre', ATAQUE)
  const peligroso = nombre.includes("'")

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <label htmlFor="nombre-jugador" className="font-mono text-sm text-muted">Nombre que escribe el jugador:</label>
        <input
          id="nombre-jugador"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="min-h-10 min-w-80 flex-1 rounded-[0.4rem] border border-amber/50 bg-well px-3 font-mono text-fg focus-visible:outline-2 focus-visible:outline-cyan"
        />
        <button type="button" onClick={() => setNombre('ana')} className="min-h-10 rounded-[0.4rem] border border-white/20 px-3 text-sm text-fg hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-cyan">Nombre normal</button>
        <button type="button" onClick={() => setNombre(ATAQUE)} className="min-h-10 rounded-[0.4rem] border border-coral/50 px-3 text-sm text-coral hover:bg-coral/10 focus-visible:outline-2 focus-visible:outline-cyan">Ataque</button>
      </div>
      <div className="grid grid-cols-2 gap-4 max-[900px]:grid-cols-1">
        <Card tone="coral" title={<><WarningIcon aria-hidden="true" size={22} /> Concatenar texto</>}>
          <CodeBlock code={`cmd.CommandText =
  "SELECT * FROM jugadores WHERE nombre = '" + nombre + "'";`} />
          <p className="mt-3 font-mono text-xs text-muted">SQL que llega a la base:</p>
          <CodeBlock code={`SELECT * FROM jugadores WHERE nombre = '${nombre}'`} />
          <p className={`mt-2 text-sm ${peligroso ? 'font-bold text-coral' : 'text-body'}`}>
            {peligroso ? 'La comilla cierra el texto y lo demás se ejecuta como SQL: ¡se borra la tabla!' : 'Con un nombre normal funciona… hasta que alguien escribe una comilla.'}
          </p>
        </Card>
        <Card tone="mint" title={<><CheckCircleIcon aria-hidden="true" size={22} /> Consulta parametrizada</>}>
          <CodeBlock code={`cmd.CommandText =
  "SELECT * FROM jugadores WHERE nombre = @nombre";
cmd.Parameters.AddWithValue("@nombre", nombre);`} />
          <p className="mt-3 font-mono text-xs text-muted">Valor de @nombre (siempre es solo texto):</p>
          <CodeBlock code={JSON.stringify(nombre)} />
          <p className="mt-2 text-sm text-body">La base recibe el SQL y el dato <strong className="text-fg">por separado</strong>: nunca se ejecuta lo que escribe el jugador.</p>
        </Card>
      </div>
    </div>
  )
}
