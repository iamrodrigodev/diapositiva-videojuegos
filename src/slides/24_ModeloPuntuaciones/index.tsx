import CodigoPorPasos, { type PasoCodigo } from '../../components/CodigoPorPasos'
import Slide from '../../components/Slide'
import Tabs from '../../components/Tabs'
import Indice from './Indice'

const SQL = `CREATE TABLE IF NOT EXISTS puntuaciones (
  id         INTEGER PRIMARY KEY,
  jugador_id INTEGER NOT NULL REFERENCES jugadores(id),
  nivel      INTEGER NOT NULL,
  puntaje    INTEGER NOT NULL,
  fecha      TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_nivel_puntaje
  ON puntuaciones (nivel, puntaje DESC);`

const PASOS: PasoCodigo[] = [
  { desde: 1, hasta: 2, titulo: 'Una fila por partida terminada', texto: <>Cada vez que alguien termina un nivel, se agrega una fila con su puntaje.</> },
  { desde: 3, hasta: 3, titulo: '¿De quién es?', texto: <>Apunta a la tabla <code>jugadores</code> del Bloque 3: el nombre se guarda una sola vez, no en cada puntaje.</> },
  { desde: 4, hasta: 6, titulo: 'Qué se registra', texto: <>Nivel, puntaje y fecha: lo justo para filtrar y ordenar el ranking.</> },
  { desde: 9, hasta: 10, titulo: 'El índice', texto: <>Mantiene los puntajes <strong>ya ordenados por nivel</strong>. Así el top 10 no recorre toda la tabla (pestaña siguiente). Se crea una vez, igual que las tablas.</> },
]

const TABS = [
  { id: 'tabla', label: 'La tabla', contenido: <CodigoPorPasos id="modelo-puntuaciones" partes={[{ titulo: 'Tabla e índice', codigo: SQL, pasos: PASOS }]} /> },
  { id: 'indice', label: '¿Qué es un índice?', contenido: <Indice /> },
]

export default function ModeloPuntuaciones() {
  return (
    <Slide bloque="Bloque 4 · Puntuaciones" titulo="Modelo de puntuaciones">
      <Tabs tabs={TABS} label="Modelo de puntuaciones" />
    </Slide>
  )
}
