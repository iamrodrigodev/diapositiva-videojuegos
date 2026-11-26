import type { ReactNode } from 'react'
import { usePersistentState } from '../lib/usePersistentState'
import Reveal from './Reveal'

export type Tab = { id: string; label: string; contenido: ReactNode }

export default function Tabs({ tabs, label }: { tabs: Tab[]; label: string }) {
  const [activa, setActiva] = usePersistentState(`tabs:${label}`, 0)
  const tab = tabs[activa]

  return (
    <>
      <Reveal>
        <div role="tablist" aria-label={label} className="flex flex-wrap gap-2">
          {tabs.map((t, i) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={i === activa}
              onClick={() => setActiva(i)}
              className={`min-h-10 rounded-[0.4rem] border px-4 font-display font-bold focus-visible:outline-2 focus-visible:outline-cyan ${i === activa ? 'chamfer border-amber bg-amber text-ink' : 'border-white/20 text-body hover:bg-white/5'}`}
            >
              {i + 1}. {t.label}
            </button>
          ))}
        </div>
      </Reveal>
      {tab && <Reveal key={tab.id} role="tabpanel" aria-label={tab.label}>{tab.contenido}</Reveal>}
    </>
  )
}
