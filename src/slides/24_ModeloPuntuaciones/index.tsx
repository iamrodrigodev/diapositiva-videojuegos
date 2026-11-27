import CodigoPorPasos, { type PasoCodigo } from '../../components/CodigoPorPasos'
import Lead from '../../components/Lead'
import Slide from '../../components/Slide'
import Tabs from '../../components/Tabs'
import Indice from './Indice'

const SQL = `CREATE TABLE IF NOT EXISTS records (
  jugador_id INTEGER NOT NULL REFERENCES jugadores(id),
  nivel      INTEGER NOT NULL,
  puntaje    INTEGER NOT NULL,
  fecha      TEXT NOT NULL,
  PRIMARY KEY (jugador_id, nivel)
);

CREATE INDEX IF NOT EXISTS idx_nivel_puntaje
  ON records (nivel, puntaje DESC);`

const PASOS: PasoCodigo[] = [
  { desde: 1, hasta: 2, titulo: 'El récord de cada jugador', texto: <>Una tabla <code>records</code>: solo importa el <strong>mejor</strong> puntaje, no cada partida. Apunta a <code>jugadores</code> del Bloque 3.</> },
  { desde: 3, hasta: 5, titulo: 'Qué se registra', texto: <>Nivel, puntaje y fecha: lo justo para filtrar y ordenar el ranking.</> },
  { desde: 6, hasta: 6, titulo: 'Uno por nivel', texto: <>La llave <code>(jugador_id, nivel)</code> impide dos récords del mismo jugador en un nivel. Si se quisiera un historial de todas las partidas, sería otra tabla sin esta llave.</> },
  { desde: 9, hasta: 10, titulo: 'El índice', texto: <>Mantiene los puntajes <strong>ya ordenados por nivel</strong>. Así el top 10 no recorre toda la tabla (pestaña siguiente). Se crea una vez, igual que las tablas.</> },
  { desde: 1, hasta: 10, titulo: '¿Dónde se ejecuta?', texto: <>Es un paso más de la actualización de la diapositiva 21: <code>if (version &lt; 3)</code> crea la tabla y el índice, y se anota <code>user_version = 3</code>. Las partidas guardadas no se tocan.</> },
]

const TABS = [
  { id: 'tabla', label: 'La tabla', contenido: <CodigoPorPasos id="modelo-puntuaciones" partes={[{ titulo: 'Tabla e índice', codigo: SQL, pasos: PASOS }]} /> },
  { id: 'indice', label: '¿Qué es un índice?', contenido: <Indice /> },
]

export default function ModeloPuntuaciones() {
  return (
    <Slide bloque="Bloque 4 · Puntuaciones" titulo="Modelo de puntuaciones">
      <Lead>El ranking de <strong>Estación Norte</strong>: el mejor puntaje de cada jugador en cada nivel, en el mismo <code>estacion_norte.db</code> de las partidas.</Lead>
      <Tabs tabs={TABS} label="Modelo de puntuaciones" />
    </Slide>
  )
}
