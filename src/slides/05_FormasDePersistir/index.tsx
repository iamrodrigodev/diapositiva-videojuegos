import { CloudArrowUpIcon, DatabaseIcon, FileCodeIcon, SlidersHorizontalIcon, ThumbsDownIcon, ThumbsUpIcon, type Icon } from '@phosphor-icons/react'
import Card from '../../components/Card'
import CodeBlock from '../../components/CodeBlock'
import Slide from '../../components/Slide'
import Tabs from '../../components/Tabs'
import { FORMAS } from '../../data/formasPersistir'
import Criterios from './Criterios'

const ICONOS: Record<string, Icon> = { playerprefs: SlidersHorizontalIcon, json: FileCodeIcon, sqlite: DatabaseIcon, servidor: CloudArrowUpIcon }

const FORMAS_TABS = FORMAS.map((forma) => {
  const Icono = ICONOS[forma.id] ?? DatabaseIcon
  return {
  id: forma.id,
  label: forma.nombre,
  contenido: (
    <div className="grid grid-cols-[3fr_2fr] gap-4 max-[900px]:grid-cols-1">
      <Card tone="cyan" title={<><Icono aria-hidden="true" size={26} /> {forma.nombre}</>}>
        <p className="mt-2 leading-relaxed">{forma.concepto}</p>
        <p className="mt-2 font-mono text-xs text-muted">Dónde se guarda: {forma.donde}</p>
        <CodeBlock code={forma.codigo} label={`Ejemplo de ${forma.nombre}`} />
      </Card>
      <div className="grid gap-4">
        <Card tone="mint" title={<><ThumbsUpIcon aria-hidden="true" size={22} /> Ventajas</>}>
          <ul className="mt-2 list-disc pl-5 text-sm leading-relaxed">{forma.pros.map((p) => <li key={p}>{p}</li>)}</ul>
        </Card>
        <Card tone="coral" title={<><ThumbsDownIcon aria-hidden="true" size={22} /> Desventajas</>}>
          <ul className="mt-2 list-disc pl-5 text-sm leading-relaxed">{forma.contras.map((c) => <li key={c}>{c}</li>)}</ul>
        </Card>
      </div>
    </div>
  ),
  }
})

const TABS = [...FORMAS_TABS, { id: 'elegir', label: '¿Cómo elegir?', contenido: <Criterios /> }]

export default function FormasDePersistir() {
  return (
    <Slide bloque="Bloque 1 · Contexto" titulo="Formas de persistir">
      <Tabs tabs={TABS} label="Formas de persistir" />
    </Slide>
  )
}
