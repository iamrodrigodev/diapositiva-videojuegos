import Card from '../../components/Card'
import Reveal from '../../components/Reveal'
import Slide from '../../components/Slide'
import { CASOS } from '../../data/casosReales'

export default function CasosReales() {
  return (
    <Slide bloque="Bloque 1 · Contexto" titulo="Solución: casos reales documentados">
      <Reveal className="grid grid-cols-2 gap-4 max-[760px]:grid-cols-1">
        {CASOS.map((c) => (
          <Card key={c.juego} tone={c.tecnologia === 'SQLite' ? 'emerald' : 'neutral'} title={c.juego}>
            <p className="mt-1 font-mono text-sm text-[#7eb8ff]">{c.tecnologia} · {c.tipo}</p>
            <p className="mt-2 text-sm leading-relaxed">{c.detalle}</p>
            <p className="mt-3 font-mono text-xs text-[#8997ad]">Fuente: {c.fuente}</p>
          </Card>
        ))}
      </Reveal>
      <Reveal className="font-mono text-xs text-[#8997ad]">Referencias completas en APA 7 al final de la presentación.</Reveal>
    </Slide>
  )
}
