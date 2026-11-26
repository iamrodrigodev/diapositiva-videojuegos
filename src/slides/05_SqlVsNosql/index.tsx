import Card from '../../components/Card'
import CodeBlock from '../../components/CodeBlock'
import Lead from '../../components/Lead'
import Reveal from '../../components/Reveal'
import Slide from '../../components/Slide'

const TABLA = `partidas
┌────┬───────┬────────────────┐
│ id │ nivel │ checkpoint     │
├────┼───────┼────────────────┤
│ 42 │ 7     │ Estación norte │
└────┴───────┴────────────────┘
inventario (partida_id → partidas.id)
│ 42 │ Linterna │ 1 │`

const DOCUMENTO = `{
  "id": 42,
  "nivel": 7,
  "checkpoint": "Estación norte",
  "inventario": [
    { "item": "Linterna", "cant": 1 }
  ]
}`

export default function SqlVsNosql() {
  return (
    <Slide bloque="Bloque 1 · Contexto" titulo="SQL vs NoSQL: el mismo dato, dos formas">
      <Reveal className="grid grid-cols-2 gap-4 max-[760px]:grid-cols-1">
        <Card tone="blue" title="SQL · relacional">
          <ul className="mt-2 list-disc pl-5 text-sm leading-relaxed">
            <li>Tablas con <strong>esquema fijo</strong> (columnas y tipos).</li>
            <li><strong>Relaciones</strong> entre tablas mediante llaves.</li>
            <li>Consultas potentes: ordenar, filtrar, unir.</li>
          </ul>
          <CodeBlock code={TABLA} label="Partida 42 como tablas relacionadas" />
        </Card>
        <Card tone="violet" title="NoSQL · documento o clave-valor">
          <ul className="mt-2 list-disc pl-5 text-sm leading-relaxed">
            <li><strong>Esquema flexible</strong>: cada documento puede variar.</li>
            <li>Datos anidados en un solo bloque.</li>
            <li>Escala horizontalmente en varios servidores.</li>
          </ul>
          <CodeBlock code={DOCUMENTO} label="Partida 42 como documento JSON" />
        </Card>
      </Reveal>
      <Lead>
        Ninguna es mejor en absoluto: SQL brilla con <strong>relaciones y consultas</strong>; NoSQL, con <strong>flexibilidad y escala</strong>.
      </Lead>
    </Slide>
  )
}
