import { usePersistentState } from './usePersistentState'

export type Equipo = { id: number; nombre: string; puntos: number }

const INICIALES: Equipo[] = [1, 2, 3, 4].map((id) => ({ id, nombre: `Equipo ${id}`, puntos: 0 }))

// Compartido por el Ranking en vivo (30) y el Podio (32): ambos leen la misma clave guardada.
export function useEquipos() {
  return usePersistentState<Equipo[]>('ranking-vivo:equipos', INICIALES)
}

export const ordenarEquipos = (equipos: Equipo[]) => [...equipos].sort((a, b) => b.puntos - a.puntos || a.id - b.id)
