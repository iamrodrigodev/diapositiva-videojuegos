// Compartido por el puzzle (07) y su solución (08) para que no se contradigan.
export type CasoReal = {
  juego: string
  tecnologia: string
  tipo: string
  detalle: string
  fuente: string
}

export const CASOS: CasoReal[] = [
  {
    juego: 'Civilization VI',
    tecnologia: 'SQLite',
    tipo: 'SQL local',
    detalle: 'Los datos del juego (civilizaciones, unidades, edificios) se cargan en bases SQLite; los mods los modifican con sentencias SQL.',
    fuente: 'Civilization Wiki · Modding (Civ6)',
  },
  {
    juego: 'Minecraft Bedrock',
    tecnologia: 'LevelDB',
    tipo: 'NoSQL clave-valor',
    detalle: 'Los chunks y entidades del mundo se guardan en una versión de LevelDB modificada por Mojang.',
    fuente: 'Mojang · leveldb (GitHub)',
  },
  {
    juego: 'Fortnite',
    tecnologia: 'MongoDB',
    tipo: 'NoSQL de documentos',
    detalle: 'Su base de datos principal de servicios usaba 9 shards de MongoDB (postmortem con 3,4 M de jugadores simultáneos).',
    fuente: 'Epic Games, 2018',
  },
  {
    juego: 'EVE Online',
    tecnologia: 'Microsoft SQL Server',
    tipo: 'SQL en servidor',
    detalle: 'El universo compartido persiste en servidores de base de datos SQL Server.',
    fuente: 'CCP Games · A History of EVE Database Server Hardware',
  },
]

// Incluye un distractor (PlayerPrefs) que no corresponde a ningún caso.
export const OPCIONES_PUZZLE = ['MongoDB', 'PlayerPrefs', 'Microsoft SQL Server', 'SQLite', 'LevelDB']
