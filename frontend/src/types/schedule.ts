import { countries } from "@/constants/countries"

export type RaceEventType = {
  id: string
  round: number
  name: string
  country: keyof typeof countries
  official_name: string
  start_event_date: string
  end_event_date: string
}

export type ScheduleType = {
  year: number
  events: RaceEventType[]
}

export type Driver = {
  id: string
  position: number
  driver_code: string
  team_color: string
}

export type PodiumType = {
  podium: Driver[]
}
