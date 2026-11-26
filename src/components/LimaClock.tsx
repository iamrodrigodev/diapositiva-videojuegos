import { ClockIcon } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'

const limaTime = new Intl.DateTimeFormat('es-PE', {
  timeZone: 'America/Lima',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
})

export default function LimaClock() {
  const [time, setTime] = useState(() => limaTime.format(new Date()))

  useEffect(() => {
    const clock = window.setInterval(() => setTime(limaTime.format(new Date())), 1000)
    return () => window.clearInterval(clock)
  }, [])

  return (
    <span className="absolute right-[clamp(0.75rem,3vw,2.5rem)] flex items-center gap-[0.65rem] text-[#b9c7e0] max-[480px]:static">
      <ClockIcon aria-hidden="true" size={16} />
      <time dateTime={time}>{time}</time>
      <span>Lima</span>
    </span>
  )
}
