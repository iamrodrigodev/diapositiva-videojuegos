export type CasoReal = {
  juego: string
  tecnologia: string
  tipo: string
  pista: string
  detalle: string
  fuente: string
}

export const CASOS: CasoReal[] = [
  {
    juego: 'Civilization VI',
    tecnologia: 'SQLite',
    tipo: 'SQL local',
    pista: 'Una base SQL que cabe en un solo archivo, sin servidor. Es el tema central de esta exposición.',
    detalle: 'Los datos del juego (civilizaciones, unidades, edificios) viven en bases SQLite; los mods los modifican con sentencias SQL.',
    fuente: 'Civilization Wiki · Modding (Civ6)',
  },
  {
    juego: 'Minecraft Java',
    tecnologia: 'Archivos NBT',
    tipo: 'Archivo binario propio',
    pista: 'No es una base de datos: es un formato binario inventado por el propio estudio.',
    detalle: 'Cada mundo se guarda en archivos de región (.mca) con el formato binario NBT diseñado por Mojang.',
    fuente: 'Minecraft Wiki · Anvil file format',
  },
  {
    juego: 'Minecraft Bedrock',
    tecnologia: 'LevelDB',
    tipo: 'NoSQL clave-valor',
    pista: 'Clave-valor ultrarrápida creada por Google; cada trozo del mundo es una clave.',
    detalle: 'Los chunks y entidades del mundo se guardan en una versión de LevelDB modificada por Mojang.',
    fuente: 'Mojang · leveldb (GitHub)',
  },
  {
    juego: 'Fortnite',
    tecnologia: 'MongoDB',
    tipo: 'NoSQL de documentos',
    pista: 'Guarda documentos tipo JSON y se reparte en muchos servidores (shards).',
    detalle: 'Su base de datos principal de servicios usaba 9 shards de MongoDB (postmortem con 3,4 M de jugadores simultáneos).',
    fuente: 'Epic Games, 2018',
  },
  {
    juego: 'EVE Online',
    tecnologia: 'SQL Server',
    tipo: 'SQL en servidor',
    pista: 'Un universo único para todos los jugadores, sobre la base SQL de Microsoft.',
    detalle: 'Todo el universo compartido persiste en servidores de base de datos Microsoft SQL Server.',
    fuente: 'CCP Games · A History of EVE Database Server Hardware',
  },
  {
    juego: 'Pokémon GO',
    tecnologia: 'Cloud Datastore',
    tipo: 'NoSQL en la nube',
    pista: 'Base NoSQL administrada por Google Cloud, antecesora de Firestore.',
    detalle: 'Cloud Datastore fue su base de datos principal; en el lanzamiento recibió más de 50 veces la carga prevista.',
    fuente: 'Google Cloud Blog, 2016',
  },
  {
    juego: 'Stardew Valley',
    tecnologia: 'Archivos XML',
    tipo: 'Archivo de texto',
    pista: 'Texto plano con etiquetas <así>, legible y editable a mano.',
    detalle: 'Cada partida se guarda como un archivo XML que la comunidad edita para corregir o modificar saves.',
    fuente: 'Stardew Valley Wiki · Saves',
  },
  {
    juego: 'Clash of Clans',
    tecnologia: 'MySQL',
    tipo: 'SQL en servidor',
    pista: 'La base SQL de código abierto más popular, repartida en cientos de instancias.',
    detalle: 'Tres desarrolladores de servidor mantenían unas 300 bases MySQL en AWS para millones de aldeas.',
    fuente: 'AWS · Innovator: Supercell',
  },
]
