import { CheckIcon, WarningIcon } from '@phosphor-icons/react'
import Card from '../../components/Card'
import CodeBlock from '../../components/CodeBlock'

const OPCIONES = [
  { nombre: 'sqlite-net', nota: 'ORM ligero, el más usado en Unity y móviles.', ok: true },
  { nombre: 'SQLite4Unity3d', nota: 'sqlite-net con los binarios de cada plataforma listos.', ok: true },
  { nombre: 'EF Core · Dapper', nota: 'Populares en .NET, pero chocan con IL2CPP (iOS, consolas).', ok: false },
]

export default function Orm() {
  return (
    <div className="grid grid-cols-2 gap-4 max-[700px]:grid-cols-1">
      <Card tone="cyan" title="ADO.NET (Mono.Data.Sqlite)">
        <p className="mt-1 text-sm">Se escribe el <strong className="text-fg">SQL a mano</strong>: control total y sin dependencias extra, pero más código.</p>
        <CodeBlock code={`cmd.CommandText =
  "INSERT INTO sesiones (inicio) VALUES (@inicio)";
cmd.Parameters.AddWithValue("@inicio", ahora);
cmd.ExecuteNonQuery();`} />
      </Card>
      <Card tone="amber" title="ORM (sqlite-net)">
        <p className="mt-1 text-sm"><strong className="text-fg">Mapeo objeto-relacional</strong>: una clase es una tabla y cada objeto, una fila. El SQL lo genera la librería.</p>
        <CodeBlock code={`class Sesion {
  [PrimaryKey, AutoIncrement] public int Id { get; set; }
  public string Inicio { get; set; }
}
db.Insert(new Sesion { Inicio = ahora });`} />
      </Card>
      <ul aria-label="Opciones de ORM en Unity" className="col-span-full grid grid-cols-3 gap-3 max-[900px]:grid-cols-1">
        {OPCIONES.map((o) => (
          <li key={o.nombre} className={`flex gap-2 rounded-lg border bg-panel p-3 text-sm ${o.ok ? 'border-mint/40' : 'border-coral/40'}`}>
            {o.ok ? <CheckIcon aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-mint" /> : <WarningIcon aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-coral" />}
            <span><strong className="font-display text-fg">{o.nombre}</strong> · {o.nota}</span>
          </li>
        ))}
      </ul>
      <p className="col-span-full text-sm text-body">Usamos <strong className="text-fg">ADO.NET</strong> para ver el SQL real que explican los bloques 3 y 4.</p>
    </div>
  )
}
