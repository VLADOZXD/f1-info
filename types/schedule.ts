import { countries } from "@/constants/countries"

export type RaceEventType = {
  round: number
  name: string
  country: keyof typeof countries
  start_event_date: string
  end_event_date: string
}

export type ScheduleType = {
  year: number
  events: RaceEventType[]
}

export type Driver = {
  position: number
  driver_code: string
  team_color: string
}
