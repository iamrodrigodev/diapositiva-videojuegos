import Reveal from '../../components/Reveal'
import Slide from '../../components/Slide'
import { REFERENCIAS } from '../../data/referencias'

export default function Referencias() {
  return (
    <Slide bloque="Cierre" titulo="Referencias">
      <Reveal>
        <ul className="columns-2 gap-8 text-[0.78rem] leading-snug text-body max-[900px]:columns-1">
          {REFERENCIAS.map((r) => (
            <li key={r.titulo} className="mb-1.5 break-inside-avoid pl-6 -indent-6">
              {r.texto} <em className="text-fg">{r.titulo}</em>{r.resto}{' '}
              {r.url && <a href={r.url} target="_blank" rel="noreferrer" className="break-all text-cyan underline decoration-cyan/40 underline-offset-2 hover:decoration-cyan">{r.url}</a>}
            </li>
          ))}
        </ul>
      </Reveal>
    </Slide>
  )
}
