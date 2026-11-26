import { useEffect, useState } from 'react'

// useState que sobrevive a F5: guarda el valor en localStorage bajo una clave.
export function usePersistentState<T>(clave: string, inicial: T | (() => T)) {
  const llave = `diapos:${clave}`
  const [valor, setValor] = useState<T>(() => {
    const guardado = localStorage.getItem(llave)
    if (guardado !== null) {
      try {
        return JSON.parse(guardado) as T
      } catch {
        // Dato corrupto o de una versión anterior: se ignora y se usa el inicial.
      }
    }
    return inicial instanceof Function ? inicial() : inicial
  })

  useEffect(() => { localStorage.setItem(llave, JSON.stringify(valor)) }, [llave, valor])

  return [valor, setValor] as const
}
