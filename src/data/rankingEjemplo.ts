export type FilaPuntaje = { jugador: string; nivel: number; puntaje: number; dias: number }

// dias = hace cuántos días se registró (0 = hoy); sirve para el filtro por período.
export const PUNTAJES_EJEMPLO: FilaPuntaje[] = [
  { jugador: 'ana', nivel: 1, puntaje: 9850, dias: 0 },
  { jugador: 'luis', nivel: 1, puntaje: 7420, dias: 2 },
  { jugador: 'sofia', nivel: 1, puntaje: 8910, dias: 9 },
  { jugador: 'leo', nivel: 1, puntaje: 6120, dias: 0 },
  { jugador: 'mia', nivel: 1, puntaje: 9100, dias: 15 },
  { jugador: 'ana', nivel: 2, puntaje: 5600, dias: 1 },
  { jugador: 'luis', nivel: 2, puntaje: 8030, dias: 0 },
  { jugador: 'sofia', nivel: 2, puntaje: 7750, dias: 4 },
  { jugador: 'mia', nivel: 2, puntaje: 4980, dias: 20 },
  { jugador: 'leo', nivel: 2, puntaje: 8800, dias: 6 },
  { jugador: 'ana', nivel: 3, puntaje: 12040, dias: 3 },
  { jugador: 'leo', nivel: 3, puntaje: 11870, dias: 0 },
  { jugador: 'sofia', nivel: 3, puntaje: 9990, dias: 12 },
  { jugador: 'luis', nivel: 3, puntaje: 10400, dias: 5 },
]
