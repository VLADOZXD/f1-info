import { countries } from "@/constants/countries"

export type RaceEvent = {
  id: string
  round: number
  name: string
  country: keyof typeof countries
  official_name: string
  start_event_date: string
  end_event_date: string
}

export type ScheduleResponse = {
  year: number
  events: RaceEvent[]
}

export type Driver = {
  id: string
  position: number
  driver_code: string
  team_color: string
}

export type RacePodium = {
  raceName: string
  podium: Driver[]
}

export type RacesPodiumRespose = RacePodium[]
