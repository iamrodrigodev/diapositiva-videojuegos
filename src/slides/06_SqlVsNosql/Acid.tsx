import { ArrowRightIcon, CheckCircleIcon, XCircleIcon } from '@phosphor-icons/react'
import Card from '../../components/Card'

export default function Acid() {
  return (
    <div className="grid grid-cols-[3fr_2fr] gap-4 max-[900px]:grid-cols-1">
      <Card tone="mint" title="La idea: todo o nada">
        <p className="mt-2 leading-relaxed">
          Una <strong className="text-fg">transacción</strong> agrupa varias escrituras en una sola unidad. Si algo falla a la mitad, no se aplica ninguna: el guardado <strong className="text-fg">nunca queda a medias</strong> (atomicidad), y lo confirmado <strong className="text-fg">sobrevive aunque el juego se cierre de golpe</strong> (durabilidad).
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm max-[600px]:grid-cols-1">
          <div className="rounded-[0.4rem] border border-coral/40 bg-coral/5 p-3">
            <p className="flex items-center gap-1.5 font-bold text-coral"><XCircleIcon aria-hidden="true" size={18} /> Sin transacción</p>
            <p className="mt-1">Se guarda la partida, el juego se cierra de golpe y el inventario no: la ranura queda corrupta.</p>
          </div>
          <div className="rounded-[0.4rem] border border-mint/40 bg-mint/5 p-3">
            <p className="flex items-center gap-1.5 font-bold text-mint"><CheckCircleIcon aria-hidden="true" size={18} /> Con transacción</p>
            <p className="mt-1">Partida e inventario se guardan juntos o no se guarda nada: queda la versión anterior intacta.</p>
          </div>
        </div>
      </Card>
      <Card title="¿Dónde se ve en detalle?">
        <p className="mt-2 text-sm leading-relaxed">Las bases SQL, SQLite incluida, ofrecen transacciones; muchas NoSQL las relajan para escalar.</p>
        <p className="mt-3 flex items-center gap-2 font-display font-bold text-cyan"><ArrowRightIcon aria-hidden="true" size={18} /> Código de transacciones en SQLite: Bloque 2</p>
      </Card>
    </div>
  )
}
