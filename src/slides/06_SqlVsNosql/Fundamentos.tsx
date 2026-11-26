import Card from '../../components/Card'
import CodeBlock from '../../components/CodeBlock'
import DataTable from '../../components/DataTable'

const GLOSARIO: [string, string][] = [
  ['Base de datos', 'Conjunto organizado de datos que un motor (SQLite, MySQL…) guarda y consulta.'],
  ['Tabla', 'Agrupa datos de un mismo tipo: partidas, inventario, puntuaciones.'],
  ['Fila (registro)', 'Un elemento concreto: la partida 42.'],
  ['Columna (campo)', 'Un atributo con tipo fijo: nivel INTEGER, checkpoint TEXT.'],
  ['Llave primaria (PK)', 'Columna que identifica cada fila sin repetirse: id.'],
  ['Llave foránea (FK)', 'Columna que apunta a la PK de otra tabla y crea la relación: partida_id.'],
  ['Consulta', 'Instrucción SQL que lee o modifica datos.'],
]

export default function Fundamentos() {
  return (
    <div className="grid grid-cols-[1fr_1fr] gap-4 max-[900px]:grid-cols-1">
      <Card tone="cyan" title="Una base de datos de Estación Norte">
        <div className="mt-3 grid gap-3">
          <DataTable nombre="partidas" columnas={['id (PK)', 'nivel', 'checkpoint']} filas={[[42, 7, 'Estación norte'], [43, 2, 'Muelle sur']]} />
          <DataTable nombre="inventario" columnas={['id (PK)', 'partida_id (FK)', 'item']} filas={[[1, 42, 'Linterna'], [2, 42, 'Llave roja']]} />
        </div>
        <CodeBlock code={`-- ¿Qué lleva la partida 42?
SELECT item FROM inventario WHERE partida_id = 42;`} />
      </Card>
      <Card title="Vocabulario básico">
        <dl className="mt-2 grid gap-2 text-sm">
          {GLOSARIO.map(([termino, definicion]) => (
            <div key={termino}>
              <dt className="font-display font-bold text-fg">{termino}</dt>
              <dd>{definicion}</dd>
            </div>
          ))}
        </dl>
      </Card>
    </div>
  )
}
