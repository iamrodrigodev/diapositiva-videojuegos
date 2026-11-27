import { CalculatorIcon, FloppyDiskIcon } from '@phosphor-icons/react'
import Card from '../../components/Card'
import CodeBlock from '../../components/CodeBlock'
import Lead from '../../components/Lead'
import Reveal from '../../components/Reveal'
import Slide from '../../components/Slide'

const GUARDAR = [
  ['Nivel actual', 'progreso puro'],
  ['Checkpoint', 'dónde reaparece'],
  ['Vida actual', 'depende de lo que pasó'],
  ['Inventario', 'lo que encontró el jugador'],
]

const RECALCULAR = [
  ['Vida máxima', 'sale de una fórmula con el nivel'],
  ['Enemigos', 'se regeneran con la escena'],
  ['Peso del inventario', 'suma de los objetos'],
  ['Estadísticas del arma', 'vienen del catálogo: basta su nombre'],
]

const CLASE = `using System.Collections.Generic;

public class EstadoPartida {
  public int nivel;
  public string checkpoint;
  public int vida;
  public Dictionary<string, int> inventario = new Dictionary<string, int>();
}`

export default function QueGuardar() {
  return (
    <Slide bloque="Bloque 3 · Guardado de partidas" titulo="¿Qué guardar?">
      <Lead>¿Qué se guarda de una partida de <strong>Estación Norte</strong>? Regla de oro: guardar <strong>lo mínimo para reconstruir la partida</strong>. Lo que se puede calcular, se calcula al cargar.</Lead>
      <Reveal className="grid grid-cols-[1fr_1fr_minmax(16rem,1.1fr)] gap-4 max-[1000px]:grid-cols-2 max-[700px]:grid-cols-1">
        <Card tone="mint" title={<><FloppyDiskIcon aria-hidden="true" size={22} /> Se guarda: estado</>}>
          <ul className="mt-2 grid gap-2">
            {GUARDAR.map(([dato, motivo]) => <li key={dato}><strong className="text-fg">{dato}</strong><br /><span className="text-sm">{motivo}</span></li>)}
          </ul>
        </Card>
        <Card tone="amber" title={<><CalculatorIcon aria-hidden="true" size={22} /> Se recalcula: derivado</>}>
          <ul className="mt-2 grid gap-2">
            {RECALCULAR.map(([dato, motivo]) => <li key={dato}><strong className="text-fg">{dato}</strong><br /><span className="text-sm">{motivo}</span></li>)}
          </ul>
        </Card>
        <Card title="El estado en C#" className="max-[1000px]:col-span-full">
          <p className="mt-1 text-sm">Una clase con solo lo que se guarda. Es lo que escribiremos y leeremos de SQLite.</p>
          <CodeBlock code={CLASE} label="Clase EstadoPartida" />
        </Card>
      </Reveal>
      <Reveal className="text-body">Guardar de más ocupa espacio y, peor, <strong className="text-fg">se desincroniza</strong>: si el peso guardado no coincide con los objetos, ¿cuál es el correcto?</Reveal>
    </Slide>
  )
}
