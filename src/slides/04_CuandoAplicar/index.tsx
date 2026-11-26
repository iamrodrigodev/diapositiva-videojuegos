import Lead from '../../components/Lead'
import Reveal from '../../components/Reveal'
import Slide from '../../components/Slide'

const ESPECTRO = [
  { nivel: 'Nada o casi nada', juego: 'Arcade de una sola sesión', guarda: 'Se juega y se reinicia; como mucho, el récord.', barra: 'w-1/12' },
  { nivel: 'Mínima', juego: 'Puzzle casual', guarda: 'Configuración y nivel alcanzado: pocos valores sueltos.', barra: 'w-4/12' },
  { nivel: 'Estructurada', juego: 'RPG o aventura', guarda: 'Varias ranuras, inventario, misiones e historial de puntajes.', barra: 'w-8/12' },
  { nivel: 'Compartida', juego: 'Juego online', guarda: 'Cuentas, rankings globales y progreso entre dispositivos.', barra: 'w-full' },
]

export default function CuandoAplicar() {
  return (
    <Slide bloque="Bloque 1 · Contexto" titulo="¿Cuándo aplicarla y cuánta?">
      <Lead>
        Casi todo juego persiste algo, pero <strong>no todo juego necesita una base de datos</strong>. La cantidad y la forma de los datos determinan la herramienta.
      </Lead>

      <Reveal>
        <ol className="grid gap-3">
          {ESPECTRO.map((paso, i) => (
            <li key={paso.nivel} className="grid grid-cols-[14rem_1fr] items-center gap-4 rounded-[0.5rem] border border-white/12 bg-[#101824] p-4 max-[760px]:grid-cols-1">
              <div>
                <p className="font-mono text-xs text-[#a8bdd9]">0{i + 1} · {paso.juego}</p>
                <p className="font-display text-lg font-bold text-[#f4f8ff]">{paso.nivel}</p>
              </div>
              <div>
                <div className="h-2 rounded-full bg-white/8"><div className={`h-2 rounded-full bg-[linear-gradient(90deg,#6ee7b7,#7eb8ff,#c1a5ff)] ${paso.barra}`} /></div>
                <p className="mt-2 text-sm text-[#c9d6ec]">{paso.guarda}</p>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal className="font-mono text-sm text-emerald-200">
        Estación Norte está en el nivel 03: ranuras de guardado y tabla de puntuaciones, en un solo dispositivo.
      </Reveal>
    </Slide>
  )
}
