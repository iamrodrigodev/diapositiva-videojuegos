import type { ComponentType } from 'react'
import Portada from './01_Portada'
import Agenda from './02_Agenda'
import Persistencia from './03_Persistencia'
import DondeViveElDato from './04_DondeViveElDato'
import FormasDePersistir from './05_FormasDePersistir'
import SqlVsNosql from './06_SqlVsNosql'
import SqlONosql from './07_SqlONosql'
import JuegosReales from './08_JuegosReales'
import QuienGuardaQue from './09_QuienGuardaQue'
import OrigenSqlite from './10_OrigenSqlite'
import Arquitectura from './11_Arquitectura'
import IntegracionUnity from './12_IntegracionUnity'
import DatabaseManager from './13_DatabaseManager'
import ConsultasSeguras from './14_ConsultasSeguras'
import EncuentraElBug from './15_EncuentraElBug'
import ConectaLosCables from './16_ConectaLosCables'
import QueGuardar from './17_QueGuardar'
import ModeloDatos from './18_ModeloDatos'
import Guardar from './19_Guardar'
import Cargar from './20_Cargar'
import Ranuras from './21_Ranuras'
import GuardarORecalcular from './22_GuardarORecalcular'
import SeFueLaLuz from './23_SeFueLaLuz'
import ModeloPuntuaciones from './24_ModeloPuntuaciones'
import RegistrarPuntaje from './25_RegistrarPuntaje'
import TopN from './26_TopN'
import Posicion from './27_Posicion'
import Limites from './28_Limites'
import CompletaConsulta from './29_CompletaConsulta'
import SeLaBaseDeDatos from './30_SeLaBaseDeDatos'
import Conclusiones from './31_Conclusiones'
import Preguntas from './32_Preguntas'
import Referencias from './33_Referencias'

export type Diapositiva = { Componente: ComponentType; bloque: 0 | 1 | 2 | 3 | 4 }

export const SLIDES: Diapositiva[] = [
  { Componente: Portada, bloque: 0 },
  { Componente: Agenda, bloque: 0 },
  { Componente: Persistencia, bloque: 1 },
  { Componente: DondeViveElDato, bloque: 1 },
  { Componente: FormasDePersistir, bloque: 1 },
  { Componente: SqlVsNosql, bloque: 1 },
  { Componente: SqlONosql, bloque: 1 },
  { Componente: JuegosReales, bloque: 1 },
  { Componente: QuienGuardaQue, bloque: 1 },
  { Componente: OrigenSqlite, bloque: 2 },
  { Componente: Arquitectura, bloque: 2 },
  { Componente: IntegracionUnity, bloque: 2 },
  { Componente: DatabaseManager, bloque: 2 },
  { Componente: ConsultasSeguras, bloque: 2 },
  { Componente: EncuentraElBug, bloque: 2 },
  { Componente: ConectaLosCables, bloque: 2 },
  { Componente: QueGuardar, bloque: 3 },
  { Componente: ModeloDatos, bloque: 3 },
  { Componente: Guardar, bloque: 3 },
  { Componente: Cargar, bloque: 3 },
  { Componente: Ranuras, bloque: 3 },
  { Componente: GuardarORecalcular, bloque: 3 },
  { Componente: SeFueLaLuz, bloque: 3 },
  { Componente: ModeloPuntuaciones, bloque: 4 },
  { Componente: RegistrarPuntaje, bloque: 4 },
  { Componente: TopN, bloque: 4 },
  { Componente: Posicion, bloque: 4 },
  { Componente: Limites, bloque: 4 },
  { Componente: CompletaConsulta, bloque: 4 },
  { Componente: SeLaBaseDeDatos, bloque: 4 },
  { Componente: Conclusiones, bloque: 0 },
  { Componente: Preguntas, bloque: 0 },
  { Componente: Referencias, bloque: 0 },
]
