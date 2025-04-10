"use client"

import { useEffect, useState } from "react"
import Container from "@/components/Container"
import DriverStandings from "@/components/Standings/DriverStandings"
import StandingsToggle from "@/components/Standings/StandingsToggle"
import { getConstructorStandings, getDriverStandings } from "@/utils/api"
import ConstructorStandings from "@/components/Standings/ConstructorStandings"
import SkeletonStandings from "@/components/Standings/SkeletonStandings"
import ArrowButton from "@/components/ArrowButton"

const StandingsPage = () => {
  const [toggle, setToggle] = useState<"driver" | "constructor">("driver")
  const [data, setData] = useState<
    DriverStandingsType | ConstructorStandingsType | null
  >(null)
  const [loading, setLoading] = useState(false)

  const currentYear = new Date().getFullYear()

  const [year, setYear] = useState(currentYear)

  useEffect(() => {
    const fetchStandings = async () => {
      setLoading(true)

      try {
        const fetchedData =
          toggle === "driver"
            ? await getDriverStandings(year)
            : await getConstructorStandings(year)
        setData(fetchedData)
      } finally {
        setLoading(false)
      }
    }

    fetchStandings()
  }, [toggle, year])

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
        data &&
        (toggle === "driver" && "driver_standings" in data ? (
          <DriverStandings drivers={data.driver_standings} />
        ) : (
          toggle === "constructor" &&
          "constructor_standings" in data && (
            <ConstructorStandings constructors={data.constructor_standings} />
          )
        ))}
    </Container>
  )
}

export default StandingsPage
