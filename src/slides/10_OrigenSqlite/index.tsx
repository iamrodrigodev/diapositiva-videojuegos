import { AnchorIcon, DeviceMobileIcon, GlobeIcon, ScalesIcon } from '@phosphor-icons/react'
import Card from '../../components/Card'
import Lead from '../../components/Lead'
import Reveal from '../../components/Reveal'
import Slide from '../../components/Slide'
import Destructor from './Destructor'

const LINEA = [
  { anio: '2000', hito: 'D. Richard Hipp diseña SQLite en primavera; la versión 1.0 sale en agosto.' },
  { anio: '2004', hito: 'SQLite 3: el formato de archivo que se sigue usando hoy.' },
  { anio: 'Hoy', hito: 'Está en cada Android, iPhone, navegador y en miles de juegos.' },
]

const DATOS = [
  { icono: ScalesIcon, dato: 'Dominio público', texto: 'gratis para cualquier uso' },
  { icono: DeviceMobileIcon, dato: '+1 billón', texto: 'de bases en uso (estimado)' },
  { icono: GlobeIcon, dato: 'Nº 1', texto: 'motor de BD más desplegado' },
]

export default function OrigenSqlite() {
  return (
    <Slide bloque="Bloque 2 · SQLite en Unity" titulo="Origen de SQLite">
      <Lead>En el Bloque 1 elegimos <strong>SQLite</strong> para Estación Norte. Antes de usarlo en Unity: ¿de dónde viene? Nació de un programa que <strong>no podía depender de un servidor</strong>.</Lead>
      <Reveal className="grid grid-cols-[3fr_2fr] gap-4 max-[900px]:grid-cols-1">
        <Card tone="cyan" title={<><AnchorIcon aria-hidden="true" size={24} /> Un destructor de la Marina</>}>
          <p className="mt-2 leading-relaxed">
            Hipp trabajaba para <strong className="text-fg">General Dynamics</strong> en el software de control de daños de destructores de la Marina de EE. UU. Ese programa usaba un servidor <strong className="text-fg">Informix</strong>: necesitaba un administrador y, si el servidor caía, el programa caía con él.
          </p>
          <div className="mt-3"><Destructor /></div>
          <p className="mt-2 text-sm text-fg"><strong className="text-amber">Su idea:</strong> una base SQL que viva dentro del programa, sin servidor, sin administrador y que resista cortes de energía.</p>
        </Card>
        <div className="grid content-start gap-4">
          <Card title="Línea de tiempo">
            <ol className="mt-3 grid gap-3">
              {LINEA.map((l) => (
                <li key={l.anio} className="grid grid-cols-[3.5rem_1fr] gap-3">
                  <span className="chamfer grid h-8 place-items-center bg-cyan font-mono text-sm font-bold text-ink">{l.anio}</span>
                  <span className="text-sm leading-snug">{l.hito}</span>
                </li>
              ))}
            </ol>
          </Card>
          <div className="grid grid-cols-3 gap-3 text-center">
            {DATOS.map(({ icono: Icono, dato, texto }) => (
              <div key={dato} className="rounded-lg border border-white/12 bg-panel p-3">
                <Icono aria-hidden="true" size={22} className="mx-auto text-cyan" />
                <p className="mt-1 font-display text-lg font-bold text-fg">{dato}</p>
                <p className="text-xs text-muted">{texto}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Slide>
  )
}
