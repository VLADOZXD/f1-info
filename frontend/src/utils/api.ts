import { PodiumType, ScheduleType } from "@/types/schedule"

const API_URL = process.env.NEXT_PUBLIC_API_URL

const fetchData = async <T>(
  endpoint: string,
  params?: Record<string, any>,
  signal?: AbortSignal,
): Promise<T> => {
  const url = new URL(`${API_URL}${endpoint}`)

  if (params) {
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, String(params[key])),
    )
  }

  const response = await fetch(url.toString(), { signal })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json()
}

export const getEventPodium = (
  year: number,
  round: number,
  signal?: AbortSignal,
): Promise<PodiumType> => {
  return fetchData(`/api/py/results/podium/`, { year, round }, signal)
}

export const getSchedule = (year: number): Promise<ScheduleType> => {
  return fetchData(`/api/py/schedule/${year}`)
}

export const getDriverStandings = (
  year: number,
): Promise<DriverStandingsType> => {
  return fetchData(`/api/py/standings/driver/${year}`)
}
export const getConstructorStandings = (
  year: number,
): Promise<ConstructorStandingsType> => {
  return fetchData(`/api/py/standings/constructor/${year}`)
}
