import Slide from '../../components/Slide'
import Tabs from '../../components/Tabs'
import Acid from './Acid'
import Comparacion from './Comparacion'
import Fundamentos from './Fundamentos'
import TiposNosql from './TiposNosql'

const TABS = [
  { id: 'fundamentos', label: 'Bases de datos desde cero', contenido: <Fundamentos /> },
  { id: 'comparacion', label: 'SQL vs NoSQL', contenido: <Comparacion /> },
  { id: 'tipos', label: 'Tipos de NoSQL', contenido: <TiposNosql /> },
  { id: 'acid', label: 'Transacciones ACID', contenido: <Acid /> },
]

export default function SqlVsNosql() {
  return (
    <Slide bloque="Bloque 1 · Contexto" titulo="Bases de datos: SQL y NoSQL">
      <Tabs tabs={TABS} label="Bases de datos" />
    </Slide>
  )
}
