import { ChatsCircleIcon, GameControllerIcon } from '@phosphor-icons/react'
import Reveal from '../../components/Reveal'
import Slide from '../../components/Slide'

const BLOQUES = [
  { n: 1, titulo: 'Contexto', rango: '03–09', que: 'Qué es persistir en Unity, cuándo hace falta, alternativas y por qué SQLite.', color: 'border-amber text-amber', barra: 'bg-amber' },
  { n: 2, titulo: 'SQLite en Unity', rango: '10–16', que: 'Origen, cómo funciona, cómo se integra y el código básico seguro.', color: 'border-cyan text-cyan', barra: 'bg-cyan' },
  { n: 3, titulo: 'Guardado de partidas', rango: '17–23', que: 'Qué guardar, el modelo de datos, guardar, cargar, ranuras y un guardado que resiste cierres.', color: 'border-violet text-violet', barra: 'bg-violet' },
  { n: 4, titulo: 'Puntuaciones', rango: '24–30', que: 'Registrar puntajes, el top N, tu posición y los límites del ranking local.', color: 'border-coral text-coral', barra: 'bg-coral' },
]

export default function Agenda() {
  return (
    <Slide bloque="Apertura" titulo="Agenda">
      <Reveal className="grid grid-cols-4 gap-4 max-[1000px]:grid-cols-2 max-[600px]:grid-cols-1">
        {BLOQUES.map((b) => (
          <section key={b.n} className={`flex flex-col gap-2 rounded-lg border-2 bg-panel p-4 ${b.color.split(' ')[0]}`}>
            <span className={`h-1.5 w-12 ${b.barra}`} />
            <p className={`font-mono text-xs tracking-[0.2em] uppercase ${b.color.split(' ')[1]}`}>Bloque {b.n} · diap. {b.rango}</p>
            <p className="font-display text-2xl font-bold text-fg uppercase">{b.titulo}</p>
            <p className="text-body">{b.que}</p>
          </section>
        ))}
      </Reveal>
      <Reveal className="grid grid-cols-2 gap-4 max-[800px]:grid-cols-1">
        <div className="flex gap-3 rounded-lg border border-white/12 bg-panel p-4">
          <GameControllerIcon aria-hidden="true" size={34} className="shrink-0 text-amber" />
          <p className="text-body"><strong className="text-fg">Cada bloque tiene juegos.</strong> En cada uno participa un voluntario del público.</p>
        </div>
        <div className="flex gap-3 rounded-lg border border-white/12 bg-panel p-4">
          <ChatsCircleIcon aria-hidden="true" size={34} className="shrink-0 text-coral" />
          <p className="text-body">Al final: <strong className="text-fg">conclusiones, preguntas</strong> y referencias.</p>
        </div>
      </Reveal>
      <Reveal className="font-mono text-sm text-muted"><strong className="text-fg">Nuestro ejemplo:</strong> <em className="text-fg">Estación Norte</em>, un juego de aventura inventado con ranuras de guardado, inventario y un top 10. Lo usamos en los 4 bloques.</Reveal>
    </Slide>
  )
}
