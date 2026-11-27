import Slide from '../../components/Slide'
import Tabs from '../../components/Tabs'
import Flujo from './Flujo'
import Proteccion from './Proteccion'
import TiposDatos from './TiposDatos'

const TABS = [
  { id: 'flujo', label: 'Servidor vs embebido', contenido: <Flujo /> },
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
