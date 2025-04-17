type DriverStandingsData = {
  id: string
  position: string
  points: string
  driver_name: string
  team_name: string
  team_color: string
}

type DriverStandingsType = {
  driver_standings: DriverStandingsData[]
}

type ConstructorStandingsData = {
  id: string
  position: string
  points: string
  constructor_name: string
  team_color: string
}

type ConstructorStandingsType = {
  constructor_standings: ConstructorStandingsData[]
}
