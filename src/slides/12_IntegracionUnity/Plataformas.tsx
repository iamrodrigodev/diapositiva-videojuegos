import { CheckCircleIcon, XCircleIcon } from '@phosphor-icons/react'
import Card from '../../components/Card'

const PLATAFORMAS: { nombre: string; ok: boolean; archivo: string; nota: string }[] = [
  { nombre: 'Windows', ok: true, archivo: 'sqlite3.dll', nota: 'Se descarga de sqlite.org' },
  { nombre: 'macOS · Linux', ok: true, archivo: 'libsqlite3', nota: 'Suele venir instalado en el sistema' },
  { nombre: 'Android', ok: true, archivo: 'libsqlite3.so', nota: 'Uno por procesador (ARM64, ARMv7)' },
  { nombre: 'iOS', ok: true, archivo: '—', nota: 'SQLite ya viene con el sistema' },
  { nombre: 'WebGL', ok: false, archivo: '—', nota: 'El navegador no carga librerías nativas; los archivos van a un disco virtual (IndexedDB)' },
]

export default function Plataformas() {
  return (
    <div className="grid grid-cols-[2fr_3fr] gap-4 max-[900px]:grid-cols-1">
      <Card tone="cyan" title="¿Por qué depende de la plataforma?">
        <p className="mt-2 leading-relaxed">El motor de SQLite está escrito en <strong className="text-fg">C</strong> y se compila para cada sistema operativo y procesador. Tu código C# es el mismo en todas partes, pero el juego necesita el <strong className="text-fg">motor nativo</strong> correcto en cada build.</p>
        <p className="mt-3 rounded-[0.4rem] border border-coral/40 bg-coral/5 p-3 text-sm text-fg">
          <strong className="text-coral">WebGL:</strong> el juego corre dentro del navegador, que no permite librerías nativas; sus archivos van a un disco virtual del navegador. Ahí se usa PlayerPrefs, JSON o un servidor (Bloque 1).
        </p>
      </Card>
      <table className="w-full border-collapse self-start text-left text-fg [&_:is(th,td)]:border [&_:is(th,td)]:border-line [&_:is(th,td)]:px-4 [&_:is(th,td)]:py-2.5">
        <thead className="bg-panel font-mono text-xs text-muted uppercase">
          <tr><th scope="col">Plataforma</th><th scope="col">¿Funciona?</th><th scope="col">Motor nativo</th><th scope="col">Nota</th></tr>
        </thead>
        <tbody>
          {PLATAFORMAS.map((p) => (
            <tr key={p.nombre} className={p.ok ? '' : 'bg-coral/10'}>
              <th scope="row" className="font-display font-bold">{p.nombre}</th>
              <td>{p.ok ? <span className="flex items-center gap-1.5 text-mint"><CheckCircleIcon aria-hidden="true" size={18} /> Sí</span> : <span className="flex items-center gap-1.5 text-coral"><XCircleIcon aria-hidden="true" size={18} /> No</span>}</td>
              <td className="font-mono text-sm text-cyan">{p.archivo}</td>
              <td className="text-sm">{p.nota}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
