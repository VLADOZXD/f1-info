import Table from "../shared/Table"
import LoadingTable from "../shared/LoadingTable"

type StandingsTableProps = {
  data: DriverStandingsData[] | ConstructorStandingsData[] | null
  standings: "driver" | "constructor"
  loading?: boolean
}

const StandingsTable = ({
  data,
  standings,
  loading = false,
}: StandingsTableProps) => {
  const driverStandings: Column<DriverStandingsData>[] = [
    { header: "POS", accessor: "position", className: "pl-4" },
    {
      header: "DRIVER",
      render: (driver: DriverStandingsData) => (
        <div className="flex items-center">
          <div
            className="w-2 h-6 rounded-sm mr-1"
            style={{ backgroundColor: driver.team_color }}
          ></div>
          {driver.driver_name}
        </div>
      ),
    },
    { header: "TEAM", accessor: "team_name" },
    { header: "PTS", accessor: "points" },
  ]

  const constructorStandings: Column<ConstructorStandingsData>[] = [
    { header: "POS", accessor: "position", className: "pl-4" },
    {
      header: "TEAM",
      render: (constructor: ConstructorStandingsData) => (
        <div className="flex items-center">
          <div
            className="w-2 h-6 rounded-sm mr-1"
            style={{ backgroundColor: constructor.team_color }}
          ></div>
          {constructor.constructor_name}
        </div>
      ),
    },
    { header: "PTS", accessor: "points" },
  ]

  const isDriverStandingsData = (
    data: DriverStandingsData[] | ConstructorStandingsData[],
  ): data is DriverStandingsData[] => {
    return data.length > 0 && "driver_name" in data[0]
  }

  return (
    <div className="lg:mt-7 md:mt-4 mt-3">
      {loading ? (
        <LoadingTable
          columns={
            standings === "driver" ? driverStandings : constructorStandings
          }
        />
      ) : (
        data &&
        (isDriverStandingsData(data) ? (
          <Table columns={driverStandings} data={data} />
        ) : (
          <Table columns={constructorStandings} data={data} />
        ))
      )}
    </div>
  )
}

export default StandingsTable
