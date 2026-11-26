import Card from '../../components/Card'

const TIPOS = [
  { tipo: 'Documento', como: 'Guarda objetos tipo JSON completos, cada uno con su propia forma.', motores: 'MongoDB, Firestore', juego: 'Perfil completo de un jugador: datos, logros y ajustes en un documento.' },
  { tipo: 'Clave-valor', como: 'Un diccionario gigante: a cada clave le corresponde un valor. Muy rápido.', motores: 'Redis, LevelDB', juego: 'Sesiones activas en un servidor; chunks de un mundo de Minecraft Bedrock.' },
  { tipo: 'Columnar', como: 'Agrupa los datos por columnas y reparte enormes volúmenes en muchos servidores.', motores: 'Cassandra, HBase', juego: 'Telemetría: millones de eventos de partidas por día para analítica.' },
  { tipo: 'Grafo', como: 'Guarda nodos y las relaciones entre ellos como datos de primera clase.', motores: 'Neo4j', juego: 'Red de amigos y recomendaciones de «jugadores que quizá conozcas».' },
]

export default function TiposNosql() {
  return (
    <div className="grid gap-3">
      <p className="text-body">«NoSQL» no es una sola cosa: agrupa varios modelos, cada uno pensado para un problema distinto.</p>
      <div className="grid grid-cols-4 gap-4 max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1">
        {TIPOS.map((t) => (
          <Card key={t.tipo} tone="amber" title={t.tipo}>
            <p className="mt-2 text-sm leading-relaxed">{t.como}</p>
            <p className="mt-2 font-mono text-xs text-muted">{t.motores}</p>
            <p className="mt-3 border-t border-white/10 pt-2 text-sm"><strong className="text-fg">En juegos:</strong> {t.juego}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
