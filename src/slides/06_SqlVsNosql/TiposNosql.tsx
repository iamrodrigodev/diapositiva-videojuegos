import { BracketsCurlyIcon, ColumnsIcon, GraphIcon, KeyIcon, type Icon } from '@phosphor-icons/react'
import type { ReactNode } from 'react'
import Card from '../../components/Card'
import LogoChip from '../../components/LogoChip'

const ejemplo = 'mt-3 rounded-[0.4rem] bg-well p-2.5 font-mono text-[0.72rem] leading-normal text-fg'

// Diagrama mínimo de grafo: jugadores como nodos, amistades como aristas.
const GRAFO = (
  <svg viewBox="0 0 200 70" role="img" aria-label="Grafo: Ana es amiga de Luis y de Sofía; ambos son amigos de Leo" className="mt-3 w-full rounded-[0.4rem] bg-well">
    <g className="stroke-amber/60" strokeWidth="1.5">
      <line x1="40" y1="35" x2="100" y2="16" /><line x1="40" y1="35" x2="100" y2="54" /><line x1="100" y1="16" x2="160" y2="35" /><line x1="100" y1="54" x2="160" y2="35" />
    </g>
    {([['Ana', 40, 35], ['Luis', 100, 16], ['Sofía', 100, 54], ['Leo', 160, 35]] as const).map(([n, x, y]) => (
      <g key={n}>
        <circle cx={x} cy={y} r="11" className="fill-panel stroke-amber" strokeWidth="1.5" />
        <text x={x} y={y + 3} textAnchor="middle" className="fill-fg font-mono text-[7px]">{n}</text>
      </g>
    ))}
  </svg>
)

const TIPOS: { tipo: string; icono: Icon; como: string; motores: string[]; ejemplo: ReactNode; juego: string }[] = [
  {
    tipo: 'Documento', icono: BracketsCurlyIcon, como: 'Objetos tipo JSON, cada uno con su propia forma.', motores: ['MongoDB', 'Firestore'],
    ejemplo: <pre className={ejemplo}>{`{ "jugador": "ana",
  "logros": ["jefe1"],
  "ajustes": { "vol": 80 } }`}</pre>,
    juego: 'Perfil completo de un jugador en un documento.',
  },
  {
    tipo: 'Clave-valor', icono: KeyIcon, como: 'Un diccionario gigante: clave → valor. Muy rápido.', motores: ['Redis', 'LevelDB'],
    ejemplo: <pre className={ejemplo}>{`sesion:ana   → "token-9f2c"
chunk:12:-4  → <bytes>
online:total → 1532`}</pre>,
    juego: 'Sesiones activas; chunks de Minecraft Bedrock.',
  },
  {
    tipo: 'Columnar', icono: ColumnsIcon, como: 'Agrupa por columnas y reparte volúmenes enormes.', motores: ['Cassandra', 'HBase'],
    ejemplo: <pre className={ejemplo}>{`evento | jugador | hora
muerte | ana     | 10:01
nivel  | luis    | 10:01
...millones de filas/día`}</pre>,
    juego: 'Telemetría de millones de partidas.',
  },
  {
    tipo: 'Grafo', icono: GraphIcon, como: 'Nodos y relaciones como datos de primera clase.', motores: ['Neo4j'],
    ejemplo: GRAFO,
    juego: 'Red de amigos y «quizá conozcas a…».',
  },
]

export default function TiposNosql() {
  return (
    <div className="grid gap-3">
      <p className="text-body">«NoSQL» no es una sola cosa: agrupa varios modelos, cada uno pensado para un problema distinto.</p>
      <div className="grid grid-cols-4 gap-4 max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1">
        {TIPOS.map(({ tipo, icono: Icono, como, motores, ejemplo: visual, juego }) => (
          <Card key={tipo} tone="amber" title={<><Icono aria-hidden="true" size={24} /> {tipo}</>}>
            <p className="mt-1 text-sm leading-snug">{como}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">{motores.map((m) => <LogoChip key={m} nombre={m} />)}</div>
            {visual}
            <p className="mt-3 text-sm leading-snug"><strong className="text-fg">En juegos:</strong> {juego}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
