import { DeviceMobileIcon, FlagIcon, FloppyDiskIcon } from '@phosphor-icons/react'
import CodigoPorPasos, { type PasoCodigo } from '../../components/CodigoPorPasos'

const CODIGO = `using UnityEngine;

public class Checkpoint : MonoBehaviour {
  public string nombre;

  void OnTriggerEnter(Collider otro) {
    if (!otro.CompareTag("Player")) return;
    PartidaActual.Estado.checkpoint = nombre;
    Guardado.Guardar(1, 0, PartidaActual.Estado);
  }
}

public class AutoguardadoMovil : MonoBehaviour {
  void OnApplicationPause(bool pausado) {
    if (pausado) Guardado.Guardar(1, 0, PartidaActual.Estado);
  }
}`

const PASOS: PasoCodigo[] = [
  { desde: 3, hasta: 4, titulo: 'Un checkpoint en la escena', texto: <>Un objeto invisible que el jugador atraviesa. Su <code>nombre</code> es el lugar que se guarda.</> },
  { desde: 6, hasta: 8, titulo: 'Detectar al jugador', texto: <>Cuando el jugador lo cruza, se anota el checkpoint en la partida en memoria.</> },
  { desde: 9, hasta: 9, titulo: 'Guardar en la ranura 0', texto: <>Se reutiliza <code>Guardado.Guardar</code> (diapositiva 19). La ranura 0 es solo del autoguardado: no pisa las ranuras del jugador.</> },
  { desde: 13, hasta: 17, titulo: 'Al minimizar en el móvil', texto: <>El sistema puede cerrar la app sin avisar. <code>OnApplicationPause(true)</code> llega al pasar a segundo plano: es el último momento seguro.</> },
]

const CAMINO = ['Muelle sur', 'Estación norte', 'Faro']

export default function Autoguardado() {
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-[3fr_2fr] gap-4 max-[900px]:grid-cols-1">
        <section className="rounded-lg border border-white/12 bg-panel p-4">
          <p className="font-display text-lg font-bold text-fg">1 · Al cruzar un checkpoint</p>
          <ol className="mt-3 flex items-center justify-between gap-2">
            {CAMINO.map((c, i) => (
              <li key={c} className="flex flex-1 items-center gap-2">
                <span className="flex flex-col items-center gap-1 text-center text-sm text-fg">
                  <FlagIcon aria-hidden="true" size={26} className="text-violet" />{c}
                  <span className="flex items-center gap-1 font-mono text-xs text-mint"><FloppyDiskIcon aria-hidden="true" size={14} /> se guarda</span>
                </span>
                {i < CAMINO.length - 1 && <span className="h-0.5 flex-1 bg-[repeating-linear-gradient(90deg,#8b8f9e_0_8px,transparent_8px_14px)]" aria-hidden="true" />}
              </li>
            ))}
          </ol>
        </section>
        <section className="flex items-center gap-3 rounded-lg border border-white/12 bg-panel p-4">
          <DeviceMobileIcon aria-hidden="true" size={40} className="shrink-0 text-cyan" />
          <div>
            <p className="font-display text-lg font-bold text-fg">2 · Al minimizar el juego</p>
            <p className="text-sm text-body">En el móvil, el jugador cambia de app y el sistema puede cerrar el juego sin avisar.</p>
          </div>
        </section>
      </div>
      <CodigoPorPasos id="autoguardado-v2" partes={[{ titulo: 'Los dos autoguardados en código', codigo: CODIGO, pasos: PASOS }]} />
    </div>
  )
}
