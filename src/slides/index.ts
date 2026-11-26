import type { ComponentType } from 'react'
import Portada from './01_Portada'
import Persistencia from './03_Persistencia'
import DondeViveElDato from './04_DondeViveElDato'
import FormasDePersistir from './05_FormasDePersistir'
import SqlVsNosql from './06_SqlVsNosql'
import SqlONosql from './07_SqlONosql'
import JuegosReales from './08_JuegosReales'
import QuienGuardaQue from './09_QuienGuardaQue'

// bloque 0 = apertura/cierre compartidos; 1-4 = bloques de cada integrante.
export type Diapositiva = { Componente: ComponentType; bloque: 0 | 1 | 2 | 3 | 4 }

// Orden de la presentación. 02_Agenda se agrega al cerrar el temario.
export const SLIDES: Diapositiva[] = [
  { Componente: Portada, bloque: 0 },
  { Componente: Persistencia, bloque: 1 },
  { Componente: DondeViveElDato, bloque: 1 },
  { Componente: FormasDePersistir, bloque: 1 },
  { Componente: SqlVsNosql, bloque: 1 },
  { Componente: SqlONosql, bloque: 1 },
  { Componente: JuegosReales, bloque: 1 },
  { Componente: QuienGuardaQue, bloque: 1 },
]
