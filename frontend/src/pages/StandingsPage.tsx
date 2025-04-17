"use client"

import { useState } from "react"
import Container from "@/components/Container"
import DriverStandings from "@/components/Standings/DriverStandings"
import StandingsToggle from "@/components/Standings/StandingsToggle"
import { getConstructorStandings, getDriverStandings } from "@/utils/api"
import ConstructorStandings from "@/components/Standings/ConstructorStandings"
import SkeletonStandings from "@/components/Standings/SkeletonStandings"
import ArrowButton from "@/components/ArrowButton"
import { useFetch } from "@/hooks/useFetch"

const StandingsPage = () => {
  const [toggle, setToggle] = useState<"driver" | "constructor">("driver")

  const currentYear = new Date().getFullYear()
  const [year, setYear] = useState(currentYear)

  const { data: standings, loading } = useFetch<
    DriverStandingsType | ConstructorStandingsType
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
      {loading && <SkeletonStandings columns={toggle === "driver" ? 4 : 3} />}
      {!loading &&
        standings &&
        (toggle === "driver" && "driver_standings" in standings ? (
          <DriverStandings drivers={standings.driver_standings} />
        ) : (
          toggle === "constructor" &&
          "constructor_standings" in standings && (
            <ConstructorStandings
              constructors={standings.constructor_standings}
            />
          )
        ))}
    </Container>
  )
}

export default StandingsPage
