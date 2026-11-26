import { ArrowRightIcon } from '@phosphor-icons/react'
import CodigoPorPasos, { type PasoCodigo } from '../../components/CodigoPorPasos'
import DataTable from '../../components/DataTable'

const CODIGO = `cmd.CommandText = "PRAGMA user_version";
long version = (long)cmd.ExecuteScalar();

if (version < 1) {
  cmd.CommandText = CrearTablas;
  cmd.ExecuteNonQuery();
}
if (version < 2) {
  cmd.CommandText = "ALTER TABLE partidas ADD COLUMN monedas INTEGER NOT NULL DEFAULT 0";
  cmd.ExecuteNonQuery();
}
cmd.CommandText = "PRAGMA user_version = 2";
cmd.ExecuteNonQuery();`

const PASOS: PasoCodigo[] = [
  { desde: 1, hasta: 2, titulo: '¿De qué versión es este archivo?', texto: <>SQLite guarda un número dentro del archivo: <code>user_version</code>. Un archivo nuevo empieza en 0.</> },
  { desde: 4, hasta: 7, titulo: 'Jugador nuevo', texto: <>Si es 0, el juego nunca se abrió: se crean las tablas de la diapositiva 18.</> },
  { desde: 8, hasta: 11, titulo: 'Jugador de la versión 1.0', texto: <>Si es 1, le falta la columna de monedas: <code>ALTER TABLE … ADD COLUMN</code> la agrega <strong>sin tocar sus partidas</strong>, con 0 monedas.</> },
  { desde: 12, hasta: 13, titulo: 'Anotar la versión', texto: <>Se guarda el 2: la próxima vez estos pasos se saltan. Todo esto va en el <code>DatabaseManager</code>, al abrir la base.</> },
]

export default function Actualizacion() {
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-3 max-[1000px]:grid-cols-1">
        <section className="rounded-lg border border-white/12 bg-panel p-3">
          <p className="font-display font-bold text-fg">Versión 1.0 del juego</p>
          <p className="mb-2 text-sm text-body">El jugador ya tiene partidas guardadas.</p>
          <DataTable nombre="partidas" columnas={['ranura', 'nivel', 'vida']} filas={[[1, 7, 80]]} />
        </section>
        <ArrowRightIcon aria-hidden="true" size={26} className="justify-self-center text-muted max-[1000px]:rotate-90" />
        <section className="rounded-lg border border-amber/45 bg-panel p-3">
          <p className="font-display font-bold text-amber">Sale la versión 1.1</p>
          <p className="text-sm text-body">El juego ahora tiene <strong className="text-fg">monedas</strong>, pero el archivo del jugador no tiene esa columna: el juego fallaría al guardar.</p>
        </section>
        <ArrowRightIcon aria-hidden="true" size={26} className="justify-self-center text-muted max-[1000px]:rotate-90" />
        <section className="rounded-lg border border-mint/45 bg-panel p-3">
          <p className="font-display font-bold text-mint">Migración al abrir</p>
          <p className="mb-2 text-sm text-body">Se agrega la columna; la partida sigue ahí.</p>
          <DataTable nombre="partidas" columnas={['ranura', 'nivel', 'vida', 'monedas']} filas={[[1, 7, 80, 0]]} />
        </section>
      </div>
      <CodigoPorPasos id="migracion-v2" partes={[{ titulo: 'Migración con user_version', codigo: CODIGO, pasos: PASOS }]} />
    </div>
  )
}
