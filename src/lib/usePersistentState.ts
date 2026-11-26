import { useEffect, useState } from 'react'

export function usePersistentState<T>(clave: string, inicial: T | (() => T)) {
  const llave = `diapos:${clave}`
  const [valor, setValor] = useState<T>(() => {
    const guardado = localStorage.getItem(llave)
    if (guardado !== null) {
      try {
        return JSON.parse(guardado) as T
      } catch {
        localStorage.removeItem(llave)
      }
    }
    return inicial instanceof Function ? inicial() : inicial
  })

  useEffect(() => { localStorage.setItem(llave, JSON.stringify(valor)) }, [llave, valor])

  return [valor, setValor] as const
}
