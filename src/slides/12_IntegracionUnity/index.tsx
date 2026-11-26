import Slide from '../../components/Slide'
import Tabs from '../../components/Tabs'
import Herramientas from './Herramientas'
import Instalacion from './Instalacion'
import Orm from './Orm'
import Plataformas from './Plataformas'
import Ubicacion from './Ubicacion'

const TABS = [
  { id: 'orm', label: 'ADO.NET u ORM', contenido: <Orm /> },
  { id: 'instalar', label: 'Instalación', contenido: <Instalacion /> },
  { id: 'ubicacion', label: '¿Dónde vive el .db?', contenido: <Ubicacion /> },
  { id: 'plataformas', label: 'Plataformas', contenido: <Plataformas /> },
  { id: 'herramientas', label: 'Herramientas', contenido: <Herramientas /> },
]

export default function IntegracionUnity() {
  return (
    <Slide bloque="Bloque 2 · SQLite en Unity" titulo="Integración en Unity">
      <Tabs tabs={TABS} label="Integración en Unity" />
    </Slide>
  )
}
