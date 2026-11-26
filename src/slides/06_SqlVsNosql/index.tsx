import Card from '../../components/Card'
import CodeBlock from '../../components/CodeBlock'
import DataTable from '../../components/DataTable'
import Reveal from '../../components/Reveal'
import Slide from '../../components/Slide'

const DOCUMENTO = `{
  "id": 42, "nivel": 7,
  "checkpoint": "Estación norte",
  "inventario": [
    { "item": "Linterna", "cant": 1 }
  ]
}`

const COMPARACION: [string, string, string][] = [
  ['Estructura', 'Tablas con esquema fijo', 'Documentos, clave-valor o grafos; esquema flexible'],
  ['Relaciones', 'Llaves foráneas y JOIN', 'Datos anidados o duplicados'],
  ['Consultas', 'SQL estándar: filtrar, ordenar, agrupar', 'API propia de cada motor'],
  ['Consistencia', 'Transacciones ACID', 'Muchos priorizan disponibilidad y velocidad'],
  ['Escala', 'Vertical (un servidor más potente)', 'Horizontal (más servidores)'],
  ['Motores', 'SQLite, MySQL, PostgreSQL, SQL Server', 'MongoDB, Firestore, LevelDB, Redis'],
]

export default function SqlVsNosql() {
  return (
    <Slide bloque="Bloque 1 · Contexto" titulo="SQL vs NoSQL: dos maneras de organizar datos">
      <Reveal className="grid grid-cols-[1fr_1fr] gap-4 max-[900px]:grid-cols-1">
        <Card tone="blue" title="SQL · la partida 42 en tablas">
          <div className="mt-3 grid gap-3">
            <DataTable nombre="partidas" columnas={['id', 'nivel', 'checkpoint']} filas={[[42, 7, 'Estación norte']]} />
            <DataTable nombre="inventario" columnas={['partida_id', 'item', 'cant']} filas={[[42, 'Linterna', 1]]} />
          </div>
          <p className="mt-2 font-mono text-xs text-[#a8bdd9]">inventario.partida_id → partidas.id</p>
        </Card>
        <Card tone="violet" title="NoSQL · la partida 42 como documento">
          <CodeBlock code={DOCUMENTO} label="Partida 42 como documento JSON" />
        </Card>
      </Reveal>
      <Reveal className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm text-[#e0edff] [&_:is(th,td)]:border [&_:is(th,td)]:border-[#344359] [&_:is(th,td)]:px-3 [&_:is(th,td)]:py-1.5">
          <thead className="bg-[#101824] font-mono text-xs text-[#a8bdd9] uppercase">
            <tr><th scope="col">Criterio</th><th scope="col" className="text-[#7eb8ff]">SQL</th><th scope="col" className="text-[#c1a5ff]">NoSQL</th></tr>
          </thead>
          <tbody>
            {COMPARACION.map(([criterio, sql, nosql]) => (
              <tr key={criterio}><th scope="row" className="font-display font-bold">{criterio}</th><td>{sql}</td><td>{nosql}</td></tr>
            ))}
          </tbody>
        </table>
      </Reveal>
    </Slide>
  )
}
