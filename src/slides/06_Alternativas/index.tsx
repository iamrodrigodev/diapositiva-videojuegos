import Reveal from '../../components/Reveal'
import Slide from '../../components/Slide'

const CRITERIOS = ['Volumen', 'Consultas', 'Alcance', 'Plataformas', 'Seguridad']

const FILAS: { opcion: string; tipo: string; celdas: string[]; destacada?: boolean }[] = [
  { opcion: 'PlayerPrefs', tipo: 'Clave-valor local', celdas: ['Muy bajo', 'Ninguna', 'Local', 'Todas', 'Editable'] },
  { opcion: 'JSON / archivo propio', tipo: 'Archivo local', celdas: ['Medio', 'Cargar todo', 'Local', 'Todas', 'Editable*'] },
  { opcion: 'SQLite', tipo: 'SQL local', celdas: ['Alto', 'SQL completo', 'Local', 'PC y móvil', 'Editable*'], destacada: true },
  { opcion: 'MySQL / PostgreSQL', tipo: 'SQL en servidor', celdas: ['Muy alto', 'SQL completo', 'Online', 'Todas (vía API)', 'En servidor'] },
  { opcion: 'Firebase / MongoDB / PlayFab', tipo: 'NoSQL o nube', celdas: ['Muy alto', 'Por clave o doc.', 'Online', 'Todas', 'En servidor'] },
]

const PREGUNTAS = [
  ['border-[#6ee7b7]', '¿Cuántos datos y con qué forma?', 'Pocos valores sueltos o muchas filas relacionadas.'],
  ['border-[#7eb8ff]', '¿Necesito consultarlos?', 'Ordenar, filtrar, sacar un "top 10".'],
  ['border-[#c1a5ff]', '¿Un dispositivo o muchos?', 'Compartir entre jugadores exige un servidor.'],
]

export default function Alternativas() {
  return (
    <Slide bloque="Bloque 1 · Contexto" titulo="Alternativas en Unity y de qué depende elegir">
      <Reveal className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-[clamp(0.8rem,1.1vw,0.95rem)] text-[#e0edff] [&_:is(th,td)]:border [&_:is(th,td)]:border-[#344359] [&_:is(th,td)]:px-3 [&_:is(th,td)]:py-2">
          <thead className="bg-[#101824] font-mono text-xs text-[#a8bdd9] uppercase">
            <tr><th scope="col">Opción</th>{CRITERIOS.map((c) => <th key={c} scope="col">{c}</th>)}</tr>
          </thead>
          <tbody>
            {FILAS.map((f) => (
              <tr key={f.opcion} className={f.destacada ? 'bg-[#0d453d80]' : 'bg-[#0d1120]'}>
                <th scope="row" className="font-normal">
                  <span className={`font-display font-bold ${f.destacada ? 'text-emerald-300' : 'text-[#f4f8ff]'}`}>{f.opcion}</span>
                  <span className="block font-mono text-xs text-[#a8bdd9]">{f.tipo}</span>
                </th>
                {f.celdas.map((c, i) => <td key={CRITERIOS[i]}>{c}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
      <Reveal>
        <ul className="grid grid-cols-3 gap-3 text-sm text-[#c9d6ec] max-[760px]:grid-cols-1">
          {PREGUNTAS.map(([borde, pregunta, ayuda]) => (
            <li key={pregunta} className={`border-l-2 pl-3 ${borde}`}><strong className="text-[#f4f8ff]">{pregunta}</strong> {ayuda}</li>
          ))}
        </ul>
      </Reveal>
      <Reveal className="font-mono text-xs text-[#8997ad]">* Editable salvo que se cifre. Los detalles de plataforma de SQLite se ven en el Bloque 2.</Reveal>
    </Slide>
  )
}
