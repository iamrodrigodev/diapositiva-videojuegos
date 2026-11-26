import { useState } from 'react'
import Card from '../../components/Card'
import CodeBlock from '../../components/CodeBlock'
import Reveal from '../../components/Reveal'
import Slide from '../../components/Slide'
import { FORMAS } from '../../data/formasPersistir'

export default function FormasDePersistir() {
  const [activa, setActiva] = useState(0)
  const forma = FORMAS[activa]

  return (
    <Slide bloque="Bloque 1 · Contexto" titulo="Cuatro formas de persistir en Unity">
      <Reveal>
        <div role="tablist" aria-label="Formas de persistir" className="flex flex-wrap gap-2">
          {FORMAS.map((f, i) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={i === activa}
              onClick={() => setActiva(i)}
              className={`min-h-10 rounded-[0.4rem] border px-4 font-display font-bold focus-visible:outline-2 focus-visible:outline-[#7eb8ff] ${i === activa ? 'border-emerald-300 bg-[#0d453d80] text-emerald-200' : 'border-white/20 text-[#c9d6ec] hover:bg-white/5'}`}
            >
              {i + 1}. {f.nombre}
            </button>
          ))}
        </div>
      </Reveal>
      {forma && (
        <Reveal key={forma.id} role="tabpanel" className="grid grid-cols-[3fr_2fr] gap-4 max-[900px]:grid-cols-1">
          <Card tone="blue" title={forma.nombre}>
            <p className="mt-1 font-mono text-xs text-[#a8bdd9]">Dónde se guarda: {forma.donde}</p>
            <CodeBlock code={forma.codigo} label={`Ejemplo de ${forma.nombre}`} />
          </Card>
          <div className="grid content-start gap-4">
            <Card tone="emerald" title="Ventajas">
              <ul className="mt-2 list-disc pl-5 text-sm leading-relaxed">{forma.pros.map((p) => <li key={p}>{p}</li>)}</ul>
            </Card>
            <Card tone="red" title="Desventajas">
              <ul className="mt-2 list-disc pl-5 text-sm leading-relaxed">{forma.contras.map((c) => <li key={c}>{c}</li>)}</ul>
            </Card>
          </div>
        </Reveal>
      )}
    </Slide>
  )
}
