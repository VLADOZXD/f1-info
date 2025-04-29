import { countries } from "@/constants/countries"

export type Session = {
  id: string
  name: string
  event_start: string
  event_end: string
}

export type EventFormat =
  | "conventional"
  | "sprint"
  | "sprint_shootout"
  | "sprint_qualifying"
  | "testing"

export type EventDetail = {
  year: number
  country: keyof typeof countries
  name: string
  official_name: string
  event_format: EventFormat
  sessions: Session[]
}

export type EventResponse = {
  event: EventDetail
}

export type QualifyingResults = {
  position: number
  driver_number: number
  driver: string
  team_name: string
  q1: string
  q2: string
  q3: string
}

export type RaceResults = {
  position: number
  driver_number: number
  driver: string
  team_name: string
  points: number
}

export type SessionResultsResponse = QualifyingResults[] | RaceResults[]
