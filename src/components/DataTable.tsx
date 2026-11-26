type Props = {
  nombre: string
  columnas: string[]
  filas: (string | number)[][]
}

export default function DataTable({ nombre, columnas, filas }: Props) {
  return (
    <table className="w-full border-collapse text-left font-mono text-[0.8rem] text-[#e0edff] [&_:is(th,td)]:border [&_:is(th,td)]:border-[#344359] [&_:is(th,td)]:px-2 [&_:is(th,td)]:py-1">
      <caption className="pb-1 text-left text-xs text-[#a8bdd9]">{nombre}</caption>
      <thead className="bg-[#0a0f19] text-[#a8bdd9]">
        <tr>{columnas.map((c) => <th key={c} scope="col" className="font-normal">{c}</th>)}</tr>
      </thead>
      <tbody>
        {filas.map((fila) => (
          <tr key={fila.join('|')}>{fila.map((celda, i) => <td key={columnas[i]}>{celda}</td>)}</tr>
        ))}
      </tbody>
    </table>
  )
}
