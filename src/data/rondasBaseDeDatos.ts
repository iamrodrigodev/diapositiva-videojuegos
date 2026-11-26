import { PUNTAJES_EJEMPLO, type FilaPuntaje } from './rankingEjemplo'

export type Ronda = { consulta: string; respuesta: string[]; explicacion: string }

export const clave = (f: FilaPuntaje) => `${f.jugador}-${f.nivel}`

const ejecutar = (filtro: (f: FilaPuntaje) => boolean, desc: boolean, limite?: number) =>
  PUNTAJES_EJEMPLO.filter(filtro).sort((a, b) => (desc ? b.puntaje - a.puntaje : a.puntaje - b.puntaje)).slice(0, limite).map(clave)

// La respuesta se calcula con los mismos datos que ve el jugador: no puede desincronizarse.
export const RONDAS: Ronda[] = [
  {
    consulta: 'SELECT * FROM records\nWHERE nivel = 1\nORDER BY puntaje DESC\nLIMIT 3;',
    respuesta: ejecutar((f) => f.nivel === 1, true, 3),
    explicacion: 'Solo el nivel 1, del mayor al menor, y se queda con los 3 primeros.',
  },
  {
    consulta: 'SELECT * FROM records\nWHERE nivel = 2\nORDER BY puntaje ASC\nLIMIT 2;',
    respuesta: ejecutar((f) => f.nivel === 2, false, 2),
    explicacion: 'ASC ordena del menor al mayor: salen los 2 puntajes más bajos del nivel 2.',
  },
  {
    consulta: 'SELECT * FROM records\nWHERE nivel = 3 AND puntaje > 10500\nORDER BY puntaje DESC;',
    respuesta: ejecutar((f) => f.nivel === 3 && f.puntaje > 10500, true),
    explicacion: 'Las dos condiciones deben cumplirse a la vez; sin LIMIT salen todas las que pasan el filtro.',
  },
  {
    consulta: 'SELECT * FROM records\nWHERE puntaje > 9000\nORDER BY puntaje DESC\nLIMIT 4;',
    respuesta: ejecutar((f) => f.puntaje > 9000, true, 4),
    explicacion: 'Sin filtro de nivel, compiten todos los niveles juntos.',
  },
]
