import { ArrowRightIcon } from '@phosphor-icons/react'
import Card from '../../components/Card'

export default function Acid() {
  return (
    <div className="grid grid-cols-[3fr_2fr] gap-4 max-[900px]:grid-cols-1">
      <Card tone="mint" title="La idea: todo o nada">
        <p className="mt-2 leading-relaxed">
          Una <strong className="text-fg">transacción</strong> agrupa varias escrituras en una sola unidad. Si algo falla a la mitad, no se aplica ninguna: el guardado <strong className="text-fg">nunca queda a medias</strong> (atomicidad), y lo confirmado <strong className="text-fg">sobrevive aunque el juego se cierre de golpe</strong> (durabilidad).
        </p>
      </Card>
      <Card title="¿Dónde se ve en detalle?">
        <p className="mt-2 text-sm leading-relaxed">Las bases SQL, SQLite incluida, ofrecen transacciones; muchas NoSQL las relajan para escalar.</p>
        <p className="mt-3 flex items-center gap-2 font-display font-bold text-cyan"><ArrowRightIcon aria-hidden="true" size={18} /> Código de transacciones en SQLite: Bloque 2</p>
      </Card>
    </div>
  )
}
