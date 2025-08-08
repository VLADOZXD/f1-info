"use client"

import { EventFormat } from "@/types/event"
import ResultsSidebar from "./ResultsSidebar"
import { useState } from "react"
import { fetchSessionResults } from "@/utils/api"
import ResultsTable from "./ResultsTable"
import { useQuery } from "@tanstack/react-query"

type EventResultsProps = {
  year: number
  round: string
  eventFormat: EventFormat
}

const EventResults = ({ year, round, eventFormat }: EventResultsProps) => {
  const [activeSection, setActiveSection] = useState<
    "race" | "sprint" | "qualifying"
  >("race")

  const { data: results, isLoading } = useQuery({
    queryKey: ["racesPodium", year, round, activeSection],
    queryFn: () => fetchSessionResults(year, round, activeSection),
    staleTime: 600000,
    refetchOnWindowFocus: false,
  })

  return (
    <div className="flex md:flex-row flex-col md:space-x-2 space-x-0 md:space-y-0 space-y-4 lg:mt-7 md:mt-4 mt-3">
      <ResultsSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        eventFormat={eventFormat}
      />
      <ResultsTable
        data={results}
        isLoading={isLoading}
        activeSection={activeSection}
      />
    </div>
  )
}

export default EventResults
