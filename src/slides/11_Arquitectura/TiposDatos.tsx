import Card from '../../components/Card'
import CodeBlock from '../../components/CodeBlock'

const CLASES: [string, string, string][] = [
  ['INTEGER', 'Números enteros', 'nivel = 7 · puntaje = 9850'],
  ['REAL', 'Números con decimales', 'volumen = 0.8'],
  ['TEXT', 'Texto', 'checkpoint = «Estación norte»'],
  ['BLOB', 'Bytes tal cual', 'captura de la partida (imagen)'],
  ['NULL', 'Sin valor', 'ranura vacía'],
]

export default function TiposDatos() {
  return (
    <div className="grid grid-cols-[2fr_3fr] gap-4 max-[900px]:grid-cols-1">
      <Card tone="cyan" title="Solo 5 tipos de almacenamiento">
        <table className="mt-2 w-full border-collapse text-left text-sm [&_:is(th,td)]:border-b [&_:is(th,td)]:border-white/10 [&_:is(th,td)]:py-1.5 [&_:is(th,td)]:pr-2">
          <tbody>
            {CLASES.map(([tipo, que, ejemplo]) => (
              <tr key={tipo}>
                <th scope="row" className="font-mono text-cyan">{tipo}</th>
                <td className="text-fg">{que}</td>
                <td className="text-xs text-muted">{ejemplo}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-2 text-xs text-muted">No hay tipo booleano ni de fecha: se guardan como INTEGER (0/1) y como TEXT («2026-11-26»).</p>
      </Card>
      <Card title="Tipado dinámico: el valor manda, no la columna">
        <p className="mt-2 text-sm leading-relaxed">
          En otras bases, una columna <code className="text-cyan">INTEGER</code> rechaza un texto. En SQLite la columna solo tiene una <strong className="text-fg">afinidad</strong>: un tipo preferido. Si el valor se puede convertir, lo convierte; si no, lo guarda <strong className="text-fg">tal como llegó</strong>.
        </p>
        <CodeBlock code={`CREATE TABLE prueba (nivel INTEGER);

INSERT INTO prueba VALUES ('7');     -- se guarda como INTEGER 7
INSERT INTO prueba VALUES ('siete'); -- ¡se guarda como TEXT, sin error!`} />
        <p className="mt-3 text-sm leading-relaxed">Para que SQLite rechace tipos incorrectos se declara la tabla como <code className="text-cyan">STRICT</code> (desde la versión 3.37):</p>
        <CodeBlock code="CREATE TABLE prueba (nivel INTEGER) STRICT;" />
      </Card>
    </div>
  )
}
