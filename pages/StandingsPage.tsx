"use client"

import { useEffect, useState } from "react"
import Container from "@/components/Container"
import DriverStandings from "@/components/Standings/DriverStandings"
import StandingsToggle from "@/components/Standings/StandingsToggle"
import { getConstructorStandings, getDriverStandings } from "@/utils/api"
import ConstructorStandings from "@/components/Standings/ConstructorStandings"
import SkeletonStandings from "@/components/Standings/SkeletonStandings"

const StandingsPage = () => {
  const [toggle, setToggle] = useState<"driver" | "constructor">("driver")
  const [data, setData] = useState<
    DriverStandingsType | ConstructorStandingsType | null
  >(null)
  const [loading, setLoading] = useState(false)

  const currentYear = new Date().getFullYear()

  useEffect(() => {
    const fetchStandings = async () => {
      setLoading(true)

      try {
        const fetchedData =
          toggle === "driver"
            ? await getDriverStandings(currentYear)
            : await getConstructorStandings(currentYear)
        setData(fetchedData)
      } finally {
        setLoading(false)
      }
    }

    fetchStandings()
  }, [toggle, currentYear])

  const onToggleClick = (standings: "driver" | "constructor") => {
    setToggle(standings)
  }

  return (
    <Container>
      <StandingsToggle toggle={toggle} onToggle={onToggleClick} />
      {loading && <SkeletonStandings columns={toggle === "driver" ? 4 : 3} />}
      {data && toggle === "driver" && "driver_standings" in data ? (
        <DriverStandings drivers={data.driver_standings} />
      ) : (
        data &&
        toggle === "constructor" &&
        "constructor_standings" in data && (
          <ConstructorStandings constructors={data.constructor_standings} />
        )
      )}
    </Container>
  )
}

export default StandingsPage
