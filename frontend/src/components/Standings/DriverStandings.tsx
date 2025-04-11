type DriverStandingsProps = {
  drivers: DriverStandingType[]
}

const DriverStandings = ({ drivers }: DriverStandingsProps) => {
  return (
    <table className="w-full table-auto lg:mt-7 md:mt-4 mt-3">
      <thead>
        <tr className="bg-secondary text-gray-400 sm:text-base text-xs">
          <th className="text-left pl-4 py-2">POS</th>
          <th className="text-left py-2">DRIVER</th>
          <th className="text-left py-2">TEAM</th>
          <th className="text-left py-2">PTS</th>
        </tr>
      </thead>
      <tbody>
        {drivers.map((driver) => (
          <tr
            key={driver.id}
            className="odd:bg-primary even:bg-secondary sm:text-base text-xs"
          >
            <td className="pl-4 py-2">{driver.position}</td>
            <td className="py-2 flex items-center">
              <div
                className="w-2 h-6 rounded-sm mr-1"
                style={{ backgroundColor: driver.team_color }}
              ></div>
              {driver.driver_name}
            </td>
            <td className="py-2">{driver.team_name}</td>
            <td className="py-2">{driver.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default DriverStandings
