import Card from '../../components/Card'
import CodeBlock from '../../components/CodeBlock'
import Slide from '../../components/Slide'
import Tabs from '../../components/Tabs'
import { FORMAS } from '../../data/formasPersistir'

const TABS = FORMAS.map((forma) => ({
  id: forma.id,
  label: forma.nombre,
  contenido: (
    <div className="grid grid-cols-[3fr_2fr] gap-4 max-[900px]:grid-cols-1">
      <Card tone="cyan" title={forma.nombre}>
        <p className="mt-2 leading-relaxed">{forma.concepto}</p>
        <p className="mt-2 font-mono text-xs text-muted">Dónde se guarda: {forma.donde}</p>
        <CodeBlock code={forma.codigo} label={`Ejemplo de ${forma.nombre}`} />
      </Card>
      <div className="grid content-start gap-4">
        <Card tone="mint" title="Ventajas">
          <ul className="mt-2 list-disc pl-5 text-sm leading-relaxed">{forma.pros.map((p) => <li key={p}>{p}</li>)}</ul>
        </Card>
        <Card tone="coral" title="Desventajas">
          <ul className="mt-2 list-disc pl-5 text-sm leading-relaxed">{forma.contras.map((c) => <li key={c}>{c}</li>)}</ul>
        </Card>
      </div>
    </div>
  ),
}))

export default function FormasDePersistir() {
  return (
    <Slide bloque="Bloque 1 · Contexto" titulo="Cuatro formas de persistir en Unity">
      <Tabs tabs={TABS} label="Formas de persistir" />
    </Slide>
  )
}
