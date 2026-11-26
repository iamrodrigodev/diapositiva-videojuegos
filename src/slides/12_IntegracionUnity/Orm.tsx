import { CheckCircleIcon, WarningCircleIcon } from '@phosphor-icons/react'
import Card from '../../components/Card'
import CodeBlock from '../../components/CodeBlock'

const OPCIONES = [
  { nombre: 'sqlite-net', que: 'ORM ligero de código abierto', uso: 'El más usado en Unity y en apps móviles', ok: true },
  { nombre: 'SQLite4Unity3d', que: 'sqlite-net preparado para Unity', uso: 'Trae las librerías nativas de cada plataforma', ok: true },
  { nombre: 'EF Core · Dapper', que: 'ORM populares de .NET', uso: 'Fallan con IL2CPP (iOS, consolas): no se recomiendan', ok: false },
]

export default function Orm() {
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-2 gap-4 max-[800px]:grid-cols-1">
        <Card tone="cyan" title="1 · SQL a mano (ADO.NET)">
          <p className="mt-2 leading-relaxed">Tú escribes cada sentencia SQL. Más código, pero <strong className="text-fg">ves y controlas</strong> exactamente qué se ejecuta.</p>
          <CodeBlock code={`cmd.CommandText = "INSERT INTO sesiones (inicio) VALUES (@inicio)";
cmd.Parameters.AddWithValue("@inicio", ahora);
cmd.ExecuteNonQuery();`} />
        </Card>
        <Card tone="amber" title="2 · ORM">
          <p className="mt-2 leading-relaxed"><strong className="text-fg">ORM</strong> = mapeo objeto-relacional: <strong className="text-fg">una clase es una tabla</strong> y cada objeto, una fila. La librería escribe el SQL por ti.</p>
          <CodeBlock code={`db.Insert(new Sesion { Inicio = ahora });`} />
        </Card>
      </div>
      <table className="w-full border-collapse text-left text-fg [&_:is(th,td)]:border [&_:is(th,td)]:border-line [&_:is(th,td)]:px-4 [&_:is(th,td)]:py-2.5">
        <caption className="pb-2 text-left font-mono text-xs tracking-[0.19em] text-muted uppercase">Opciones de ORM en Unity</caption>
        <tbody>
          {OPCIONES.map((o) => (
            <tr key={o.nombre} className={o.ok ? '' : 'bg-coral/10'}>
              <th scope="row" className="w-48 font-display font-bold">{o.nombre}</th>
              <td>{o.que}</td>
              <td className={`flex items-center gap-2 ${o.ok ? 'text-mint' : 'text-coral'}`}>
                {o.ok ? <CheckCircleIcon aria-hidden="true" size={20} /> : <WarningCircleIcon aria-hidden="true" size={20} />} {o.uso}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-body">En esta exposición usamos <strong className="text-fg">SQL a mano</strong>: así se ve el SQL real de los bloques 3 y 4.</p>
    </div>
  )
}
