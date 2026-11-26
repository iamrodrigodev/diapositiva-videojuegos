import { ArrowCounterClockwiseIcon, GitForkIcon } from '@phosphor-icons/react'
import { useState } from 'react'
import Lead from '../../components/Lead'
import Reveal from '../../components/Reveal'
import Slide from '../../components/Slide'
import { ARBOL, INICIO } from '../../data/arbolDecision'

const boton = 'min-h-11 rounded-[0.4rem] border px-6 font-display text-lg font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7eb8ff]'

export default function ComoElegir() {
  const [camino, setCamino] = useState<{ pregunta: string; respuesta: string }[]>([])
  const [actual, setActual] = useState(INICIO)
  const nodo = ARBOL[actual]

  const responder = (texto: string, respuesta: 'Sí' | 'No', siguiente: string) => {
    setCamino([...camino, { pregunta: texto, respuesta }])
    setActual(siguiente)
  }

  return (
    <Slide bloque="Bloque 1 · Contexto" titulo={<span className="inline-flex items-center gap-3"><GitForkIcon aria-hidden="true" /> ¿De qué depende elegir?</span>} interactiva>
      <Lead>Recorramos el árbol con <strong>Estación Norte</strong>: varias ranuras de guardado, inventario y un top 10 local en PC y móvil. El público responde cada pregunta.</Lead>

      <Reveal className="grid gap-3">
        <ol className="grid gap-2">
          {camino.map((paso) => (
            <li key={paso.pregunta} className="flex flex-wrap items-center gap-3 text-[#b9c7e0]">
              <span>{paso.pregunta}</span>
              <span className="rounded-[0.3rem] border border-white/20 px-2 font-mono text-sm text-[#f4f8ff]">{paso.respuesta}</span>
            </li>
          ))}
        </ol>

        {nodo?.tipo === 'pregunta' && (
          <div className="rounded-[0.5rem] border border-[#c1a5ff80] bg-[#151225] p-6">
            <p className="font-display text-[clamp(1.3rem,2.4vw,2rem)] font-bold text-[#f4f8ff]">{nodo.texto}</p>
            <div className="mt-4 flex gap-3">
              <button type="button" onClick={() => responder(nodo.texto, 'Sí', nodo.si)} className={`${boton} border-emerald-300 text-emerald-200 hover:bg-[#0d453d80]`}>Sí</button>
              <button type="button" onClick={() => responder(nodo.texto, 'No', nodo.no)} className={`${boton} border-[#f87171] text-[#fca5a5] hover:bg-[#f871711a]`}>No</button>
            </div>
          </div>
        )}

        {nodo?.tipo === 'resultado' && (
          <div role="status" className="rounded-[0.5rem] border border-emerald-300 bg-[#0d453d80] p-6">
            <p className="font-mono text-xs tracking-[0.19em] text-emerald-300 uppercase">Recomendación</p>
            <p className="font-display text-[clamp(2rem,4vw,3.25rem)] font-bold text-[#f4f8ff]">{nodo.texto}</p>
            <p className="mt-1 text-[#c9d6ec]">{nodo.porque}</p>
          </div>
        )}

        {camino.length > 0 && (
          <button type="button" onClick={() => { setCamino([]); setActual(INICIO) }} className="flex min-h-10 w-fit items-center gap-2 rounded-[0.4rem] border border-white/20 px-4 text-sm text-[#e0edff] hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-[#7eb8ff]">
            <ArrowCounterClockwiseIcon aria-hidden="true" size={16} /> Probar con otro juego
          </button>
        )}
      </Reveal>
    </Slide>
  )
}
