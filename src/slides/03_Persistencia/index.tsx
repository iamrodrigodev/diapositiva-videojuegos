import { ArrowRightIcon, CpuIcon, HardDrivesIcon } from '@phosphor-icons/react'
import Card from '../../components/Card'
import Lead from '../../components/Lead'
import Reveal from '../../components/Reveal'
import Slide from '../../components/Slide'

const DATOS = [
  ['Progreso', 'Nivel 07, punto de control "Estación norte"'],
  ['Configuración', 'Volumen 80 %, idioma español'],
  ['Estadísticas', '12 h jugadas, 340 enemigos derrotados'],
  ['Puntajes', 'Mejor marca: 9 850 puntos'],
]

export default function Persistencia() {
  return (
    <Slide bloque="Bloque 1 · Contexto" titulo="¿Qué es la persistencia de datos?">
      <Lead>
        Es lograr que los datos del juego <strong>sobrevivan al cerrarlo</strong>: se escriben en almacenamiento permanente y se vuelven a leer en la siguiente sesión.
      </Lead>

      <Reveal className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 max-[760px]:grid-cols-1">
        <Card tone="red" title={<><CpuIcon aria-hidden="true" size={24} /> Memoria RAM</>}>
          <p className="mt-2">Volátil. Variables y objetos de la escena: al cerrar el juego, <strong>se pierden</strong>.</p>
        </Card>
        <ArrowRightIcon aria-hidden="true" size={32} className="justify-self-center text-emerald-300 max-[760px]:rotate-90" />
        <Card tone="emerald" title={<><HardDrivesIcon aria-hidden="true" size={24} /> Disco o servidor</>}>
          <p className="mt-2">Persistente. Archivos o bases de datos: los datos <strong>siguen ahí</strong> la próxima vez.</p>
        </Card>
      </Reveal>

      <Reveal>
        <h2 className="font-mono text-xs tracking-[0.19em] text-[#a8bdd9] uppercase">Qué guarda un juego · ejemplo: Estación Norte</h2>
        <ul className="mt-3 grid grid-cols-4 gap-3 max-[760px]:grid-cols-2">
          {DATOS.map(([tipo, ejemplo]) => (
            <li key={tipo} className="border-l-2 border-[#7eb8ff] pl-3">
              <p className="font-display font-bold text-[#f4f8ff]">{tipo}</p>
              <p className="text-sm text-[#b9c7e0]">{ejemplo}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </Slide>
  )
}
