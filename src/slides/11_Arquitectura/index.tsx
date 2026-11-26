import { FileIcon, ShieldCheckIcon, ShuffleIcon } from '@phosphor-icons/react'
import Card from '../../components/Card'
import CodeBlock from '../../components/CodeBlock'
import Slide from '../../components/Slide'
import Tabs from '../../components/Tabs'
import CorteDeLuz from './CorteDeLuz'
import Flujo from './Flujo'

const RASGOS = [
  { icono: FileIcon, titulo: 'Todo en un archivo', texto: 'Tablas, índices y datos viven en un único .db que se puede copiar, respaldar o abrir en otra computadora.', codigo: 'estacion_norte.db' },
  { icono: ShieldCheckIcon, titulo: 'Transacciones ACID', texto: 'Las escrituras de una transacción se aplican todas o ninguna, incluso si el juego se cierra de golpe.', codigo: 'BEGIN; … COMMIT;' },
  { icono: ShuffleIcon, titulo: 'Tipado dinámico', texto: 'La columna sugiere un tipo («afinidad»), pero cada valor guarda su propio tipo. Solo hay 5 clases de almacenamiento.', codigo: 'INTEGER · REAL · TEXT · BLOB · NULL' },
]

const RASGOS_GRID = (
  <div className="grid grid-cols-3 gap-4 max-[900px]:grid-cols-1">
    {RASGOS.map(({ icono: Icono, titulo, texto, codigo }) => (
      <Card key={titulo} tone="cyan" title={<><Icono aria-hidden="true" size={22} /> {titulo}</>}>
        <p className="mt-2 text-sm leading-relaxed">{texto}</p>
        <CodeBlock code={codigo} />
      </Card>
    ))}
  </div>
)

const TABS = [
  { id: 'flujo', label: 'Servidor vs embebido', contenido: <Flujo /> },
  { id: 'rasgos', label: 'Rasgos clave', contenido: RASGOS_GRID },
  { id: 'corte', label: '¿Cómo sobrevive a un corte de luz?', contenido: <CorteDeLuz /> },
]

export default function Arquitectura() {
  return (
    <Slide bloque="Bloque 2 · SQLite en Unity" titulo="¿Cómo funciona por dentro?">
      <Tabs tabs={TABS} label="Arquitectura de SQLite" />
    </Slide>
  )
}
