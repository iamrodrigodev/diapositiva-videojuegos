type Columna = { nombre: string; tipo: string; clave?: 'PK' | 'FK' }
type Tabla = { nombre: string; que: string; columnas: Columna[] }

const TABLAS: Tabla[] = [
  { nombre: 'jugadores', que: 'Quién juega', columnas: [{ nombre: 'id', tipo: 'INTEGER', clave: 'PK' }, { nombre: 'nombre', tipo: 'TEXT' }] },
  {
    nombre: 'partidas', que: 'Una fila por ranura', columnas: [
      { nombre: 'id', tipo: 'INTEGER', clave: 'PK' },
      { nombre: 'jugador_id', tipo: 'INTEGER', clave: 'FK' },
      { nombre: 'ranura', tipo: 'INTEGER' },
      { nombre: 'nivel', tipo: 'INTEGER' },
      { nombre: 'checkpoint', tipo: 'TEXT' },
      { nombre: 'vida', tipo: 'INTEGER' },
      { nombre: 'guardado_en', tipo: 'TEXT' },
    ],
  },
  { nombre: 'inventario', que: 'Objetos de cada partida', columnas: [{ nombre: 'partida_id', tipo: 'INTEGER', clave: 'FK' }, { nombre: 'item', tipo: 'TEXT' }, { nombre: 'cantidad', tipo: 'INTEGER' }] },
]

function Relacion({ texto }: { texto: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 px-1 font-mono text-xs text-mint" aria-hidden="true">
      <span>1</span>
      <span className="h-0.5 w-14 bg-mint" />
      <span>N</span>
      <span className="mt-1 max-w-24 text-center text-[0.7rem] text-muted">{texto}</span>
    </div>
  )
}

export default function Diagrama() {
  return (
    <div className="grid grid-cols-[1fr_auto_1.2fr_auto_1fr] items-center gap-2 max-[900px]:grid-cols-1">
      {TABLAS.map((t, i) => (
        <div key={t.nombre} className="contents">
          {i > 0 && <Relacion texto={i === 1 ? 'un jugador, varias partidas' : 'una partida, varios objetos'} />}
          <figure className="overflow-hidden rounded-lg border border-mint/45 bg-panel">
            <figcaption className="border-b border-mint/30 bg-mint/10 px-3 py-2">
              <p className="font-mono font-bold text-mint">{t.nombre}</p>
              <p className="text-xs text-muted">{t.que}</p>
            </figcaption>
            <ul className="divide-y divide-white/5 font-mono text-sm">
              {t.columnas.map((c) => (
                <li key={c.nombre} className="flex items-center justify-between gap-3 px-3 py-1.5">
                  <span className="flex items-center gap-2 text-fg">
                    {c.clave && <span className={`rounded-[0.2rem] px-1 text-[0.65rem] font-bold text-ink ${c.clave === 'PK' ? 'bg-amber' : 'bg-cyan'}`}>{c.clave}</span>}
                    {c.nombre}
                  </span>
                  <span className="text-xs text-muted">{c.tipo}</span>
                </li>
              ))}
            </ul>
          </figure>
        </div>
      ))}
    </div>
  )
}
