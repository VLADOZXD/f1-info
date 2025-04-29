type TableProps<T> = {
  columns: Column<T>[]
  data: T[]
}

const Table = <T,>({ columns, data }: TableProps<T>) => {
  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-secondary text-gray-400 lg:text-base md:text-sm text-xs">
          {columns.map((col) => (
            <th key={col.header} className={`text-left py-2 ${col.className}`}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr
            key={index}
            className="odd:bg-primary even:bg-secondary lg:text-base md:text-sm text-xs"
          >
            {columns.map((col) => (
              <td key={col.header} className={`py-2 ${col.className}`}>
                {col.render
                  ? col.render(row)
                  : col.accessor
                    ? (row[col.accessor] as React.ReactNode)
                    : null}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
