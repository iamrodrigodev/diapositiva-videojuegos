import { FileIcon, ShieldCheckIcon, ShuffleIcon } from '@phosphor-icons/react'
import Card from '../../components/Card'
import CodeBlock from '../../components/CodeBlock'
import Slide from '../../components/Slide'
import Tabs from '../../components/Tabs'
import Flujo from './Flujo'
import Proteccion from './Proteccion'
import TiposDatos from './TiposDatos'

const RASGOS = [
  { icono: FileIcon, titulo: 'Todo en un archivo', texto: 'Tablas, índices y datos viven en un único .db que se puede copiar, respaldar o abrir en otra computadora.', codigo: 'estacion_norte.db' },
  { icono: ShieldCheckIcon, titulo: 'Transacciones ACID', texto: 'Las escrituras de una transacción se aplican todas o ninguna, incluso si el juego se cierra de golpe.', codigo: 'BEGIN; … COMMIT;' },
  { icono: ShuffleIcon, titulo: 'Tipado dinámico', texto: 'Cada valor guarda su propio tipo; la columna solo sugiere uno. Se explica en la pestaña «Tipos de datos».', codigo: 'INTEGER · REAL · TEXT · BLOB · NULL' },
]

const RASGOS_GRID = (
  <div className="grid grid-cols-3 gap-4 max-[900px]:grid-cols-1">
    {RASGOS.map(({ icono: Icono, titulo, texto, codigo }) => (
      <Card key={titulo} tone="cyan" className="flex flex-col" title={<><Icono aria-hidden="true" size={22} /> {titulo}</>}>
        <p className="mt-2 mb-1 text-sm leading-relaxed">{texto}</p>
        <div className="mt-auto"><CodeBlock code={codigo} /></div>
      </Card>
    ))}
  </div>
)

const TABS = [
  { id: 'flujo', label: 'Servidor vs embebido', contenido: <Flujo /> },
  { id: 'rasgos', label: 'Rasgos clave', contenido: RASGOS_GRID },
  { id: 'tipos', label: 'Tipos de datos', contenido: <TiposDatos /> },
  { id: 'proteccion', label: 'Protección de datos', contenido: <Proteccion /> },
]

export default function Arquitectura() {
  return (
    <Slide bloque="Bloque 2 · SQLite en Unity" titulo="Arquitectura">
      <Tabs tabs={TABS} label="Arquitectura de SQLite" />
    </Slide>
  )
}
