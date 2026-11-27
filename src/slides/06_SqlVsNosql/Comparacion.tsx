import Card from '../../components/Card'
import CodeBlock from '../../components/CodeBlock'
import LogoChip from '../../components/LogoChip'

const DOCUMENTO = `{
  "id": 2, "nombre": "Llave roja",
  "precio": 50,
  "tipo": { "id": 2, "nombre": "llave" }
}`

const COMPARACION: [string, string, string][] = [
  ['Estructura', 'Tablas con esquema fijo: toda fila tiene las mismas columnas', 'Esquema flexible: cada documento puede tener campos distintos'],
  ['Relaciones', 'Llaves foráneas; se combinan tablas con JOIN', 'Datos anidados dentro del documento o duplicados'],
  ['Consultas', 'SQL estándar: filtrar, ordenar, agrupar', 'API propia de cada motor'],
  ['Consistencia', 'Transacciones ACID', 'Muchos priorizan disponibilidad y velocidad'],
  ['Escala', 'Vertical: un servidor más potente', 'Horizontal: repartir en muchos servidores'],
]

export default function Comparacion() {
  return (
    <div className="grid grid-cols-[2fr_3fr] gap-4 max-[900px]:grid-cols-1">
      <Card tone="amber" title="El mismo objeto en NoSQL">
        <p className="mt-2 text-sm">En vez de dos tablas relacionadas, <strong>un solo documento</strong> con el tipo anidado. Se lee de una vez, pero el tipo queda copiado en cada objeto: si cambia, hay que corregir todos.</p>
        <CodeBlock code={DOCUMENTO} label="La Llave roja como documento JSON" />
      </Card>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm text-fg [&_:is(th,td)]:border [&_:is(th,td)]:border-line [&_:is(th,td)]:px-3 [&_:is(th,td)]:py-1.5">
          <thead className="bg-panel font-mono text-xs text-muted uppercase">
            <tr><th scope="col">Criterio</th><th scope="col" className="text-cyan">SQL</th><th scope="col" className="text-amber">NoSQL</th></tr>
          </thead>
          <tbody>
            {COMPARACION.map(([criterio, sql, nosql]) => (
              <tr key={criterio}><th scope="row" className="font-display font-bold">{criterio}</th><td>{sql}</td><td>{nosql}</td></tr>
            ))}
            <tr>
              <th scope="row" className="font-display font-bold">Motores</th>
              <td><span className="flex flex-wrap gap-1.5">{['SQLite', 'MySQL', 'PostgreSQL', 'SQL Server'].map((m) => <LogoChip key={m} nombre={m} />)}</span></td>
              <td><span className="flex flex-wrap gap-1.5">{['MongoDB', 'Firestore', 'LevelDB', 'Redis'].map((m) => <LogoChip key={m} nombre={m} />)}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
