import { ArrowCounterClockwiseIcon, MinusIcon, PlusIcon, TrashIcon, TrophyIcon, UsersThreeIcon } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import Lead from '../../components/Lead'
import Reveal from '../../components/Reveal'
import Slide from '../../components/Slide'
import { ordenarEquipos, useEquipos } from '../../lib/equipos'
import { sonido } from '../../lib/sonido'

const COLOR_PUESTO = ['text-amber', 'text-fg', 'text-coral']
const pequeño = 'grid min-h-9 min-w-9 place-items-center rounded-[0.3rem] border px-2 font-mono text-sm focus-visible:outline-2 focus-visible:outline-cyan'

export default function RankingVivo() {
  const [equipos, setEquipos] = useEquipos()
  const [ultimo, setUltimo] = useState('SELECT nombre, puntos FROM equipos ORDER BY puntos DESC;')
  const orden = ordenarEquipos(equipos)

  const sumar = (id: number, delta: number) => {
    const equipo = equipos.find((e) => e.id === id)!
    setEquipos(equipos.map((e) => (e.id === id ? { ...e, puntos: Math.max(0, e.puntos + delta) } : e)))
    setUltimo(`UPDATE equipos SET puntos = puntos ${delta > 0 ? '+' : '-'} ${Math.abs(delta)} WHERE nombre = '${equipo.nombre}';`)
    if (delta > 0) sonido.acierto()
  }
  const renombrar = (id: number, nombre: string) => setEquipos(equipos.map((e) => (e.id === id ? { ...e, nombre } : e)))
  const agregar = () => {
    const id = Math.max(0, ...equipos.map((e) => e.id)) + 1
    setEquipos([...equipos, { id, nombre: `Equipo ${id}`, puntos: 0 }])
    setUltimo(`INSERT INTO equipos (nombre, puntos) VALUES ('Equipo ${id}', 0);`)
  }
  const quitar = (id: number) => setEquipos(equipos.filter((e) => e.id !== id))
  const reiniciar = () => { setEquipos(equipos.map((e) => ({ ...e, puntos: 0 }))); setUltimo('UPDATE equipos SET puntos = 0;') }

  return (
    <Slide bloque="Bloque 4 · Puntuaciones" titulo={<span className="inline-flex items-center gap-3"><TrophyIcon aria-hidden="true" /> Ranking en vivo</span>} interactiva>
      <Lead>Los puntos que ganó cada equipo en los juegos. El orden lo decide la consulta del <strong>Top N</strong>.</Lead>
      <Reveal className="grid gap-3">
        <ol className="grid gap-2">
          {orden.map((e, i) => (
            <motion.li layout transition={{ type: 'spring', stiffness: 380, damping: 32 }} key={e.id} className={`grid grid-cols-[3rem_1fr_auto_auto] items-center gap-3 rounded-lg border bg-panel px-3 py-2 ${i === 0 && e.puntos > 0 ? 'border-amber shadow-[0_0_20px_#ffb54733]' : 'border-white/12'}`}>
              <span className={`font-display text-2xl font-bold ${COLOR_PUESTO[i] ?? 'text-muted'}`}>#{i + 1}</span>
              <input aria-label={`Nombre del equipo ${i + 1}`} value={e.nombre} onChange={(ev) => renombrar(e.id, ev.target.value)} className="min-h-9 min-w-0 rounded-[0.3rem] border border-transparent bg-transparent px-2 font-display text-lg font-bold text-fg hover:border-white/20 focus-visible:border-cyan focus-visible:outline-none" />
              <span className="w-24 text-right font-mono text-2xl font-bold text-coral tabular-nums">{e.puntos}</span>
              <span className="flex gap-1.5">
                <button type="button" aria-label={`Restar 10 a ${e.nombre}`} onClick={() => sumar(e.id, -10)} className={`${pequeño} border-white/20 text-fg hover:bg-white/10`}><MinusIcon size={14} /></button>
                {[10, 50, 100].map((d) => (
                  <button key={d} type="button" aria-label={`Sumar ${d} a ${e.nombre}`} onClick={() => sumar(e.id, d)} className={`${pequeño} border-coral/50 text-coral hover:bg-coral/15`}><PlusIcon size={12} />{d}</button>
                ))}
                <button type="button" aria-label={`Quitar ${e.nombre}`} onClick={() => quitar(e.id)} disabled={equipos.length <= 2} className={`${pequeño} border-white/10 text-muted hover:text-coral disabled:opacity-25`}><TrashIcon size={14} /></button>
              </span>
            </motion.li>
          ))}
        </ol>
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" onClick={agregar} className="flex min-h-10 items-center gap-2 rounded-[0.4rem] border border-coral/50 px-4 text-sm text-coral hover:bg-coral/10 focus-visible:outline-2 focus-visible:outline-cyan"><UsersThreeIcon aria-hidden="true" size={16} /> Agregar equipo</button>
          <button type="button" onClick={reiniciar} className="flex min-h-10 items-center gap-2 rounded-[0.4rem] border border-white/20 px-4 text-sm text-fg hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-cyan"><ArrowCounterClockwiseIcon aria-hidden="true" size={16} /> Puntos a cero</button>
          <code aria-live="polite" className="min-w-0 flex-1 truncate rounded-[0.4rem] bg-well px-3 py-2 font-mono text-sm text-fg">{ultimo}</code>
        </div>
      </Reveal>
    </Slide>
  )
}
