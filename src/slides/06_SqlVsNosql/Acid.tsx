import Card from '../../components/Card'

const ACID = [
  { letra: 'A', nombre: 'Atomicidad', que: 'Una transacción se aplica completa o no se aplica.', ejemplo: 'Guardar partida e inventario: si falla el inventario, la partida tampoco se guarda a medias.' },
  { letra: 'C', nombre: 'Consistencia', que: 'Los datos siempre cumplen las reglas definidas.', ejemplo: 'Un ítem no puede apuntar a una partida_id que no existe.' },
  { letra: 'I', nombre: 'Aislamiento', que: 'Operaciones simultáneas no se mezclan entre sí.', ejemplo: 'El autoguardado y el guardado manual no se pisan.' },
  { letra: 'D', nombre: 'Durabilidad', que: 'Lo confirmado queda en disco aunque se corte la luz.', ejemplo: 'Tras «Partida guardada», un apagón no borra el progreso.' },
]

export default function Acid() {
  return (
    <div className="grid gap-3">
      <p className="text-body">
        Una <strong className="text-fg">transacción</strong> agrupa varias operaciones en una sola unidad. Las bases SQL (SQLite incluida) garantizan cuatro propiedades, conocidas como <strong className="text-fg">ACID</strong>:
      </p>
      <div className="grid grid-cols-4 gap-4 max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1">
        {ACID.map((p) => (
          <Card key={p.letra} tone="mint" title={<><span className="font-mono text-3xl">{p.letra}</span> {p.nombre}</>}>
            <p className="mt-2 text-sm leading-relaxed">{p.que}</p>
            <p className="mt-3 border-t border-white/10 pt-2 text-sm"><strong className="text-fg">Estación Norte:</strong> {p.ejemplo}</p>
          </Card>
        ))}
      </div>
      <p className="text-sm text-muted">Muchas bases NoSQL relajan estas garantías (modelo BASE: consistencia eventual) a cambio de escalar a millones de usuarios.</p>
    </div>
  )
}
