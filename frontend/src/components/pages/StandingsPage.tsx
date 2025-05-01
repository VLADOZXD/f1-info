"use client"

import { useState } from "react"
import Container from "@/components/shared/Container"
import StandingsTable from "@/components/Standings/TableStandings"
import StandingsToggle from "@/components/Standings/StandingsToggle"
import { getConstructorStandings, getDriverStandings } from "@/utils/api"
import ArrowButton from "@/components/shared/ArrowButton"
import { useFetch } from "@/hooks/useFetch"

const StandingsPage = () => {
  const [toggle, setToggle] = useState<"driver" | "constructor">("driver")

  const currentYear = new Date().getFullYear()
  const [year, setYear] = useState(currentYear)

  const { data: standings, loading } = useFetch<
    DriverStandingsData[] | ConstructorStandingsData[]
  >({
    fetcher: () =>
      toggle === "driver"
        ? getDriverStandings(year)
        : getConstructorStandings(year),
    deps: [toggle, year],
  })

  const handlerToggleClick = (standings: "driver" | "constructor") => {
    setToggle(standings)
  }

  const handlePreviousClick = () => {
    setYear((prev) => prev - 1)
  }

  const handleNextClick = () => {
    setYear((prev) => prev + 1)
  }

  return (
    <Container>
      <StandingsToggle toggle={toggle} onToggle={handlerToggleClick} />
      <div className="w-full flex justify-between lg:mt-7 md:mt-4 mt-3">
        <ArrowButton
          orientation="left"
          text={year - 1}
          onArrowClick={handlePreviousClick}
          arrowDisable={loading}
        />
        {!(year === currentYear) && (
          <ArrowButton
            orientation="right"
            text={year + 1}
            onArrowClick={handleNextClick}
            arrowDisable={loading}
          />
        )}
      </div>
      <StandingsTable data={standings} loading={loading} standings={toggle} />
    </Container>
  )
}

export default StandingsPage
