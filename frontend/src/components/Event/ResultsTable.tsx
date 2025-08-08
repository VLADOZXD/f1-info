import { QualifyingResults, RaceResults } from "@/types/event"
import Table from "../shared/Table"
import LoadingTable from "../shared/LoadingTable"

type ResultsTableProps = {
  data: QualifyingResults[] | RaceResults[] | undefined
  isLoading?: boolean
  activeSection: "race" | "sprint" | "qualifying"
}

const ResultsTable = ({
  data,
  isLoading = false,
  activeSection,
}: ResultsTableProps) => {
  const raceResults: Column<RaceResults>[] = [
    { header: "POS", accessor: "position", className: "pl-4" },
    { header: "NO", accessor: "driver_number", className: "md:block hidden" },
    { header: "DRIVER", accessor: "driver" },
    { header: "TEAM", accessor: "team_name" },
    { header: "PTS", accessor: "points" },
  ]

  const qualifyingResults: Column<QualifyingResults>[] = [
    { header: "POS", accessor: "position", className: "pl-4" },
    { header: "NO", accessor: "driver_number", className: "lg:block hidden" },
    { header: "DRIVER", accessor: "driver" },
    {
      header: "TEAM",
      accessor: "team_name",
      className: "md:block hidden",
    },
    { header: "Q1", accessor: "q1" },
    { header: "Q2", accessor: "q2" },
    { header: "Q3", accessor: "q3" },
  ]

  const isRaceResults = (
    data: QualifyingResults[] | RaceResults[],
  ): data is RaceResults[] => {
    return data.length > 0 && "points" in data[0]
  }

  const columns =
    activeSection === "qualifying" ? qualifyingResults : raceResults

  return (
    <>
      {isLoading ? (
        <LoadingTable columns={columns} />
      ) : data && data.length > 0 ? (
        isRaceResults(data) ? (
          <Table columns={raceResults} data={data} />
        ) : (
          <Table columns={qualifyingResults} data={data} />
        )
      ) : (
        <div className="w-full flex justify-center font-semibold">
          Data not yet available
        </div>
      )}
    </>
  )
}

export default ResultsTable
