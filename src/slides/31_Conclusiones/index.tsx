import { CheckCircleIcon, XCircleIcon } from '@phosphor-icons/react'
import Card from '../../components/Card'
import Reveal from '../../components/Reveal'
import Slide from '../../components/Slide'

const SI = [
  'Muchos datos relacionados: partidas, inventario, récords.',
  'Hace falta consultar: filtrar, ordenar, el top 10.',
  'Todo vive en el dispositivo del jugador, sin internet.',
  'Hay que proteger el guardado con transacciones.',
]

const NO = [
  'Solo unos pocos ajustes: basta PlayerPrefs.',
  'Un objeto que se guarda entero: basta JSON.',
  'Datos compartidos o ranking mundial: hace falta un servidor.',
  'El juego es para WebGL: no hay SQLite nativo.',
]

const RESUMEN = [
  ['amber', '1', 'Persistir es sobrevivir al cierre; no todo juego necesita una base de datos.'],
  ['cyan', '2', 'SQLite vive dentro del juego: un archivo, sin servidor, con consultas seguras.'],
  ['violet', '3', 'Guardar lo mínimo, en una transacción; cargar y reconstruir.'],
  ['coral', '4', 'Ranking con ORDER BY, LIMIT y RANK(); local, no global.'],
]

const COLOR: Record<string, string> = { amber: 'bg-amber', cyan: 'bg-cyan', violet: 'bg-violet', coral: 'bg-coral' }

export default function Conclusiones() {
  return (
    <Slide bloque="Cierre" titulo="Conclusiones">
      <Reveal className="grid grid-cols-2 gap-4 max-[800px]:grid-cols-1">
        <Card tone="mint" title={<><CheckCircleIcon aria-hidden="true" size={24} /> SQLite sí conviene cuando…</>}>
          <ul className="mt-2 grid gap-2">{SI.map((s) => <li key={s} className="flex gap-2"><span className="text-mint">✓</span>{s}</li>)}</ul>
        </Card>
        <Card tone="coral" title={<><XCircleIcon aria-hidden="true" size={24} /> No conviene cuando…</>}>
          <ul className="mt-2 grid gap-2">{NO.map((s) => <li key={s} className="flex gap-2"><span className="text-coral">✗</span>{s}</li>)}</ul>
        </Card>
      </Reveal>
      <Reveal className="grid grid-cols-4 gap-3 max-[900px]:grid-cols-2">
        {RESUMEN.map(([color, n, texto]) => (
          <div key={n} className="flex gap-3 rounded-lg border border-white/12 bg-panel p-3">
            <span className={`chamfer grid size-8 shrink-0 place-items-center font-mono font-bold text-ink ${COLOR[color!]}`}>{n}</span>
            <p className="text-sm text-body">{texto}</p>
          </div>
        ))}
      </Reveal>
    </Slide>
  )
}
