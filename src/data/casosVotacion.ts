export const ALTERNATIVAS = ['PlayerPrefs', 'JSON', 'SQLite', 'Servidor / nube'] as const
export type Alternativa = (typeof ALTERNATIVAS)[number]

export type CasoVotacion = {
  juego: string
  necesidad: string
  respuesta: Alternativa
  porque: string
}

export const CASOS_VOTACION: CasoVotacion[] = [
  {
    juego: 'Ritmo Pulse (móvil)',
    necesidad: 'Solo guarda el volumen y la calibración de audio.',
    respuesta: 'PlayerPrefs',
    porque: 'Pocos valores sueltos y sin consultas: una base de datos sería excesiva.',
  },
  {
    juego: 'Cripta Roguelike',
    necesidad: 'Una sola partida en curso que se guarda y se carga entera.',
    respuesta: 'JSON',
    porque: 'Un único objeto que se serializa completo; no hace falta consultar por partes.',
  },
  {
    juego: 'Arena Global',
    necesidad: 'Ranking mundial de un millón de jugadores en varios dispositivos.',
    respuesta: 'Servidor / nube',
    porque: 'Los datos se comparten entre jugadores: tienen que vivir en un servidor.',
  },
  {
    juego: 'Estación Norte',
    necesidad: 'Varias ranuras, inventario y un top 10 local en PC y móvil.',
    respuesta: 'SQLite',
    porque: 'Datos relacionados y consultas ordenadas, sin necesidad de servidor.',
  },
]
