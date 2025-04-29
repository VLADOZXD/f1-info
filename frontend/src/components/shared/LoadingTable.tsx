type LoadingTableProps = { columns: Column<any>[] }

const LoadingTable = ({ columns }: LoadingTableProps) => {
  return (
    <table className="w-full table-fixed lg:mt-7 md:mt-4 mt-3">
      <thead>
        <tr className="bg-secondary">
          {columns.map((col) => (
            <th
              key={col.header}
              className={`text-left py-2 md:px-4 px-2 ${col.className}`}
            >
              <div className="sm:h-6 h-4 bg-slate-600 rounded"></div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...Array(10)].map((_, rowIndex) => (
          <tr
            key={rowIndex}
            className="odd:bg-primary even:bg-secondary animate-pulse"
          >
            {columns.map((col) => (
              <td
                key={col.header}
                className={`py-2 md:px-4 px-2 ${col.className}`}
              >
                <div className="sm:h-6 h-4 bg-slate-600 rounded"></div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default LoadingTable
