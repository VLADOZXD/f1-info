import getTeamColor from "@/utils/getTeamColor"
import { NextRequest, NextResponse } from "next/server"

const ERGAST_API_BASE_URL = "http://ergast.com/api/f1"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const season = searchParams.get("season") || "current"
  const round = searchParams.get("round") || "last"

  try {
    const response = await fetch(
      `${ERGAST_API_BASE_URL}/${season}/${round}/results.json`,
    )

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch race results" },
        { status: response.status },
      )
    }

    const data = await response.json()
    const podium = data.MRData.RaceTable.Races[0]?.Results?.slice(0, 3) || []

    const racePodium = await Promise.all(
      podium.map(async (driver: any) => ({
        position: parseInt(driver.position),
        driver_code: driver.Driver.code,
        team_color: await getTeamColor(season, round, driver.Constructor.name),
      })),
    )

    return NextResponse.json({ podium: racePodium }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    )
  }
}
