export type ConsultaIncompleta = {
  titulo: string
  partes: string[]
  respuestas: string[]
  trampas: string[]
  explicacion: string
}

export const CONSULTAS_INCOMPLETAS: ConsultaIncompleta[] = [
  {
    titulo: 'Top 10 del nivel 2',
    partes: ['SELECT jugador_id, puntaje FROM records\n', ' nivel = 2\n', ' puntaje ', '\n', ' 10;'],
    respuestas: ['WHERE', 'ORDER BY', 'DESC', 'LIMIT'],
    trampas: ['ASC', 'GROUP BY'],
    explicacion: 'WHERE filtra el nivel, ORDER BY … DESC pone el mayor primero y LIMIT corta en 10.',
  },
  {
    titulo: 'Guardar solo el récord',
    partes: ['INSERT INTO records (jugador_id, nivel, puntaje, fecha)\nVALUES (1, 2, 8800, datetime(\'now\'))\nON', ' (jugador_id, nivel) DO ', '\n  SET puntaje = ', '.puntaje\n  WHERE ', '.puntaje > records.puntaje;'],
    respuestas: ['CONFLICT', 'UPDATE', 'excluded', 'excluded'],
    trampas: ['DELETE', 'NEW'],
    explicacion: 'ON CONFLICT … DO UPDATE es el upsert; excluded es el puntaje nuevo, y el WHERE solo actualiza si lo supera.',
  },
  {
    titulo: 'Numerar los puestos',
    partes: ['SELECT jugador_id,\n  ', '() OVER (ORDER BY puntaje ', ') AS posicion\nFROM records;'],
    respuestas: ['RANK', 'DESC'],
    trampas: ['COUNT', 'ASC'],
    explicacion: 'RANK() OVER (ORDER BY puntaje DESC) da el puesto 1 al puntaje más alto.',
  },
  {
    titulo: 'Acelerar el ranking',
    partes: ['CREATE ', ' idx_nivel_puntaje\n  ', ' records (nivel, puntaje DESC);'],
    respuestas: ['INDEX', 'ON'],
    trampas: ['TABLE', 'FROM'],
    explicacion: 'CREATE INDEX … ON tabla (columnas) mantiene los puntajes ordenados por nivel.',
  },
]
