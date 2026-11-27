import Card from '../../components/Card'
import CodeBlock from '../../components/CodeBlock'
import DataTable from '../../components/DataTable'

const GLOSARIO: [string, string][] = [
  ['Tabla', 'Agrupa datos de un mismo tipo: objetos, tipos, jugadores.'],
  ['Fila (registro)', 'Un elemento concreto: la Llave roja.'],
  ['Columna (campo)', 'Un atributo con tipo fijo: nombre TEXT, precio INTEGER.'],
  ['Llave primaria (PK)', 'Columna que identifica cada fila sin repetirse: id.'],
  ['Llave foránea (FK)', 'Columna que apunta a la PK de otra tabla y crea la relación: tipo_id.'],
  ['Consulta', 'Instrucción SQL que lee o modifica datos.'],
]

export default function Fundamentos() {
  return (
    <div className="grid grid-cols-[1fr_1fr] gap-4 max-[900px]:grid-cols-1">
      <Card tone="cyan" title="Una base de datos de Estación Norte">
        <div className="mt-3 grid gap-3">
          <DataTable nombre="tipos" columnas={['id (PK)', 'nombre']} filas={[[1, 'herramienta'], [2, 'llave']]} />
          <DataTable nombre="objetos" columnas={['id (PK)', 'nombre', 'precio', 'tipo_id (FK)']} filas={[[1, 'Linterna', 30, 1], [2, 'Llave roja', 50, 2]]} />
        </div>
        <CodeBlock code="SELECT nombre, precio FROM objetos WHERE tipo_id = 2;" />
      </Card>
      <Card title="Vocabulario básico">
        <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-sm max-[600px]:grid-cols-1">
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
