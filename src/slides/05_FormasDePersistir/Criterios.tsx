const CRITERIOS = ['Volumen de datos', 'Consultas', 'Alcance', 'Plataformas', 'Seguridad']

const FILAS: { opcion: string; celdas: string[]; destacada?: boolean }[] = [
  { opcion: 'PlayerPrefs', celdas: ['Pocos valores sueltos', 'Ninguna', 'Local', 'Todas', 'Editable por el jugador'] },
  { opcion: 'JSON', celdas: ['Un objeto que se guarda entero', 'Cargar todo y filtrar en C#', 'Local', 'Todas', 'Editable salvo que se cifre'] },
  { opcion: 'SQLite', celdas: ['Muchos registros relacionados', 'SQL completo', 'Local', 'PC y móvil · WebGL no', 'Editable salvo que se cifre'], destacada: true },
  { opcion: 'Servidor / nube', celdas: ['Sin límite práctico', 'SQL o API del servicio', 'Online, compartido', 'Todas, con internet', 'Lo valida el servidor'] },
]

const REGLAS: [string, string][] = [
  ['¿Se comparte entre jugadores o dispositivos?', 'Servidor / nube'],
  ['¿Muchos datos que se consultan u ordenan?', 'SQLite'],
  ['¿Un objeto que se guarda y carga entero?', 'JSON'],
  ['¿Solo unos pocos ajustes?', 'PlayerPrefs'],
]

export default function Criterios() {
  return (
    <div className="grid gap-4">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm text-fg [&_:is(th,td)]:border [&_:is(th,td)]:border-line [&_:is(th,td)]:px-3 [&_:is(th,td)]:py-2">
          <thead className="bg-panel font-mono text-xs text-muted uppercase">
            <tr><th scope="col">Opción</th>{CRITERIOS.map((c) => <th key={c} scope="col">{c}</th>)}</tr>
          </thead>
          <tbody>
            {FILAS.map((f) => (
              <tr key={f.opcion} className={f.destacada ? 'bg-amber/10' : ''}>
                <th scope="row" className={`font-display font-bold ${f.destacada ? 'text-amber' : ''}`}>{f.opcion}</th>
                {f.celdas.map((c, i) => <td key={CRITERIOS[i]}>{c}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ol className="grid grid-cols-4 gap-3 max-[900px]:grid-cols-2">
        {REGLAS.map(([pregunta, respuesta], i) => (
          <li key={pregunta} className="rounded-lg border border-white/12 bg-panel p-3 text-sm">
            <p className="font-mono text-xs text-muted">Pregunta {i + 1}</p>
            <p className="mt-1 text-fg">{pregunta}</p>
            <p className="mt-1 font-display font-bold text-amber">Sí → {respuesta}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
