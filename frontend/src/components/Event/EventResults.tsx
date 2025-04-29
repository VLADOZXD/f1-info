"use client"

import { EventFormat, Session, SessionResultsResponse } from "@/types/event"
import ResultsSidebar from "./ResultsSidebar"
import { useState } from "react"
import { useFetch } from "@/hooks/useFetch"
import { getSessionResults } from "@/utils/api"
import ResultsTable from "./ResultsTable"

type EventResultsProps = {
  year: number
  round: string
  eventFormat: EventFormat
}

const EventResults = ({ year, round, eventFormat }: EventResultsProps) => {
  const [activeSection, setActiveSection] = useState<
    "race" | "sprint" | "qualifying"
  >("race")

  const { data: results, loading } = useFetch<SessionResultsResponse>({
    fetcher: () => getSessionResults(year, round, activeSection),
    deps: [activeSection],
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
        loading={loading}
        activeSection={activeSection}
      />
    </div>
  )
}

export default EventResults
