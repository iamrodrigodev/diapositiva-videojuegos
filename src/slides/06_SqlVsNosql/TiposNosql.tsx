import { BracketsCurlyIcon, KeyIcon, type Icon } from '@phosphor-icons/react'
import type { ReactNode } from 'react'
import Card from '../../components/Card'
import LogoChip from '../../components/LogoChip'

const ejemplo = 'mt-3 rounded-[0.4rem] bg-well p-2.5 font-mono text-[0.72rem] leading-normal text-fg'

const TIPOS: { tipo: string; icono: Icon; como: string; motores: string[]; ejemplo: ReactNode; juego: string }[] = [
  {
    tipo: 'Documento', icono: BracketsCurlyIcon, como: 'Objetos tipo JSON, cada uno con su propia forma.', motores: ['MongoDB', 'Firestore'],
    ejemplo: <pre className={ejemplo}>{`{ "jugador": "ana",
  "logros": ["jefe1"],
  "ajustes": { "vol": 80 } }`}</pre>,
    juego: 'Perfil completo de un jugador en un documento.',
  },
  {
    tipo: 'Clave-valor', icono: KeyIcon, como: 'Un diccionario gigante: clave → valor. Muy rápido.', motores: ['Redis', 'LevelDB'],
    ejemplo: <pre className={ejemplo}>{`sesion:ana   → "token-9f2c"
chunk:12:-4  → <bytes>
online:total → 1532`}</pre>,
    juego: 'Sesiones activas o los trozos (chunks) de un mundo abierto.',
  },
]

export default function TiposNosql() {
  return (
    <div className="grid gap-3">
      <p className="text-body">«NoSQL» no es una sola cosa: agrupa varios modelos, cada uno pensado para un problema distinto.</p>
      <div className="grid grid-cols-2 gap-4 max-[600px]:grid-cols-1">
        {TIPOS.map(({ tipo, icono: Icono, como, motores, ejemplo: visual, juego }) => (
          <Card key={tipo} tone="amber" title={<><Icono aria-hidden="true" size={24} /> {tipo}</>}>
            <p className="mt-1 text-sm leading-snug">{como}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">{motores.map((m) => <LogoChip key={m} nombre={m} />)}</div>
            {visual}
            <p className="mt-3 text-sm leading-snug"><strong className="text-fg">En juegos:</strong> {juego}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
