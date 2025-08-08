import { EventResponse, SessionResultsResponse } from "@/types/event"
import { RacesPodiumRespose, ScheduleResponse } from "@/types/schedule"

const API_URL = process.env.NEXT_PUBLIC_API_URL

const fetchData = async <T>(
  endpoint: string,
  params?: Record<string, any>,
): Promise<T> => {
  const url = new URL(`${API_URL}${endpoint}`)

  if (params) {
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, String(params[key])),
    )
  }

  const response = await fetch(url.toString())

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json()
}

export const fetchRacesPodium = (year: number): Promise<RacesPodiumRespose> => {
  return fetchData(`/api/py/results/races-podium`, { year })
}

export const fetchSessionResults = (
  year: number,
  round: string,
  session_type: string,
): Promise<SessionResultsResponse> => {
  return fetchData(`/api/py/results`, { year, round, session_type })
}

export const fetchSchedule = (year: number): Promise<ScheduleResponse> => {
  return fetchData(`/api/py/schedule`, { year })
}

export const fetchEventSchedule = (
  year: number,
  round: string,
): Promise<EventResponse> => {
  return fetchData(`/api/py/schedule/event`, { year, round })
}

export const fetchDriverStandings = (
  year: number,
): Promise<DriverStandingsResponse[]> => {
  return fetchData(`/api/py/standings/driver/${year}`)
}
export const fetchConstructorStandings = (
  year: number,
): Promise<ConstructorStandingsResponse[]> => {
  return fetchData(`/api/py/standings/constructor/${year}`)
}
