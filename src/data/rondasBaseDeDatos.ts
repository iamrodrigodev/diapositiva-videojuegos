import { PUNTAJES_EJEMPLO, type FilaPuntaje } from './rankingEjemplo'

export type Ronda = { consulta: string; respuesta: string[]; explicacion: string }

export const clave = (f: FilaPuntaje) => `${f.jugador}-${f.nivel}`

const ejecutar = (filtro: (f: FilaPuntaje) => boolean, desc: boolean, limite?: number) =>
  PUNTAJES_EJEMPLO.filter(filtro).sort((a, b) => (desc ? b.puntaje - a.puntaje : a.puntaje - b.puntaje)).slice(0, limite).map(clave)

export const RONDAS: Ronda[] = [
  {
    consulta: 'SELECT j.nombre, r.nivel, r.puntaje\nFROM records r JOIN jugadores j ON j.id = r.jugador_id\nWHERE r.nivel = 1\nORDER BY r.puntaje DESC\nLIMIT 3;',
    respuesta: ejecutar((f) => f.nivel === 1, true, 3),
    explicacion: 'Solo el nivel 1, del mayor al menor, y se queda con los 3 primeros.',
  },
  {
    consulta: 'SELECT j.nombre, r.nivel, r.puntaje\nFROM records r JOIN jugadores j ON j.id = r.jugador_id\nWHERE r.nivel = 2\nORDER BY r.puntaje ASC\nLIMIT 2;',
    respuesta: ejecutar((f) => f.nivel === 2, false, 2),
    explicacion: 'ASC ordena del menor al mayor: salen los 2 puntajes más bajos del nivel 2.',
  },
  {
    consulta: 'SELECT j.nombre, r.nivel, r.puntaje\nFROM records r JOIN jugadores j ON j.id = r.jugador_id\nWHERE r.nivel = 3 AND r.puntaje > 10500\nORDER BY r.puntaje DESC;',
    respuesta: ejecutar((f) => f.nivel === 3 && f.puntaje > 10500, true),
    explicacion: 'Las dos condiciones deben cumplirse a la vez; sin LIMIT salen todas las que pasan el filtro.',
  },
  {
    consulta: 'SELECT j.nombre, r.nivel, r.puntaje\nFROM records r JOIN jugadores j ON j.id = r.jugador_id\nWHERE r.puntaje > 9000\nORDER BY r.puntaje DESC\nLIMIT 5;',
    respuesta: ejecutar((f) => f.puntaje > 9000, true, 5),
    explicacion: 'Sin filtro de nivel, compiten todos los niveles juntos.',
  },
]
