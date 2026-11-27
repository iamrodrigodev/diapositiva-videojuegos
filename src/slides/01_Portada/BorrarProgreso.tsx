import { TrashIcon, WarningIcon } from '@phosphor-icons/react'
import { useRef } from 'react'

function borrar() {
  Object.keys(localStorage).filter((k) => k.startsWith('diapos:')).forEach((k) => localStorage.removeItem(k))
  location.reload()
}

export default function BorrarProgreso() {
  const dialogo = useRef<HTMLDialogElement>(null)
  const cerrar = () => dialogo.current?.close()

  return (
    <>
      <button type="button" onClick={() => dialogo.current?.showModal()} className="flex min-h-9 items-center gap-2 rounded-[0.4rem] border border-white/15 px-3 font-mono text-xs text-muted hover:border-coral/60 hover:text-coral focus-visible:outline-2 focus-visible:outline-cyan">
        <TrashIcon aria-hidden="true" size={16} /> Borrar el progreso guardado
      </button>
      <dialog
        ref={dialogo}
        aria-labelledby="borrar-titulo"
        onClick={(e) => { if (e.target === e.currentTarget) cerrar() }}
        className="m-auto w-[min(30rem,calc(100vw-2rem))] rounded-xl border-2 border-coral/60 bg-ink-deep p-0 text-fg shadow-[0_0_60px_#ff6b5b33] backdrop:bg-black/70 backdrop:backdrop-blur-sm"
      >
        <div className="grid gap-4 p-6">
          <p id="borrar-titulo" className="flex items-center gap-3 font-display text-2xl font-bold text-coral uppercase">
            <WarningIcon aria-hidden="true" size={30} /> ¿Borrar el progreso?
          </p>
          <p className="leading-relaxed text-body">Se borran el avance de todos los juegos, los récords y las pestañas abiertas. La presentación vuelve a empezar como nueva.</p>
          <p className="font-mono text-xs text-muted">No se puede deshacer.</p>
          <div className="flex flex-wrap justify-end gap-3">
            <button type="button" autoFocus onClick={cerrar} className="min-h-11 rounded-[0.4rem] border border-white/20 px-5 font-bold text-fg hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan">Cancelar</button>
            <button type="button" onClick={borrar} className="chamfer flex min-h-11 items-center gap-2 bg-coral px-5 font-bold text-ink hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan">
              <TrashIcon aria-hidden="true" size={18} /> Sí, borrar todo
            </button>
          </div>
        </div>
      </dialog>
    </>
  )
}
