import { ArrowsLeftRightIcon, BugIcon, HardDriveIcon, LightningSlashIcon, PowerIcon, type Icon } from '@phosphor-icons/react'
import CodeBlock from '../../components/CodeBlock'

const AMENAZAS: { icono: Icon; amenaza: string; respuesta: string }[] = [
  { icono: LightningSlashIcon, amenaza: 'Corte de luz', respuesta: 'Al reabrir, el diario restaura o descarta lo que quedó a medias.' },
  { icono: PowerIcon, amenaza: 'Cierre forzado', respuesta: 'Alt+F4, un crash o el móvil que mata la app: igual que un corte, nada queda a medias.' },
  { icono: BugIcon, amenaza: 'Error a mitad', respuesta: 'Si una escritura falla, Rollback deshace toda la transacción.' },
  { icono: ArrowsLeftRightIcon, amenaza: 'Dos escrituras a la vez', respuesta: 'Un bloqueo deja escribir de a una; la otra espera o recibe «ocupado».' },
  { icono: HardDriveIcon, amenaza: 'Disco lleno', respuesta: 'La transacción falla completa y la base sigue como antes.' },
]

const DIARIOS = [
  { nombre: 'Rollback journal', archivo: '.db-journal', como: 'Antes de modificar, copia lo original aparte. Si algo falla, lo restaura.' },
  { nombre: 'WAL', archivo: '.db-wal', como: 'Escribe los cambios al final de otro archivo y luego los pasa al .db. Lecturas y escrituras no se bloquean.' },
]

export default function Proteccion() {
  return (
    <div className="grid gap-3">
      <ul className="grid grid-cols-5 gap-3 max-[1100px]:grid-cols-3 max-[700px]:grid-cols-1">
        {AMENAZAS.map(({ icono: Icono, amenaza, respuesta }) => (
          <li key={amenaza} className="flex flex-col gap-1.5 rounded-lg border border-white/12 bg-panel p-3">
            <Icono aria-hidden="true" size={26} className="text-coral" />
            <p className="font-display font-bold text-fg">{amenaza}</p>
            <p className="text-sm leading-snug text-body">{respuesta}</p>
          </li>
        ))}
      </ul>
      <div className="grid grid-cols-[1fr_1fr_auto] items-stretch gap-3 max-[900px]:grid-cols-1">
        {DIARIOS.map((d) => (
          <div key={d.nombre} className="rounded-lg border border-cyan/40 bg-panel p-3 text-sm">
            <p className="font-display font-bold text-cyan">{d.nombre} <span className="font-mono text-xs font-normal text-muted">· archivo {d.archivo}</span></p>
            <p className="mt-1 text-body">{d.como}</p>
          </div>
        ))}
        <div className="flex flex-col justify-center rounded-lg border border-white/12 bg-panel p-3 text-sm text-body">
          Activar WAL una vez:
          <CodeBlock code="PRAGMA journal_mode = WAL;" />
        </div>
      </div>
    </div>
  )
}
