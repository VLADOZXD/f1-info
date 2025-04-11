type SkeletonStandingsProps = { columns?: number }

const SkeletonStandings = ({ columns = 4 }: SkeletonStandingsProps) => {
  return (
    <table className="w-full table-auto lg:mt-7 md:mt-4 mt-3">
      <thead>
        <tr className="bg-secondary">
          {[...Array(columns)].map((_, index) => (
            <th key={index} className="text-left py-2 md:px-8 px-2">
              <div className="w-full sm:h-6 h-4 bg-slate-600 rounded"></div>
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
            {[...Array(columns)].map((_, colIndex) => (
              <td key={colIndex} className="py-2 md:px-8 px-2">
                <div className="w-full h-6 bg-slate-600 rounded"></div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default SkeletonStandings
