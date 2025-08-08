"use client"

import { ScheduleResponse } from "@/types/schedule"
import EventCard from "./EventCard"
import { fetchRacesPodium } from "@/utils/api"
import { useQuery } from "@tanstack/react-query"

type ScheduleProps = ScheduleResponse

const Schedule = ({ events, year }: ScheduleProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["racesPodium", year],
    queryFn: () => fetchRacesPodium(year),
    staleTime: 600000,
    refetchOnWindowFocus: true,
  })

  const currentDate = new Date()

  return (
    <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-4 gap-y-8">
      {events.map((event) => (
        <EventCard
          key={event.id}
          finished={
            currentDate.getTime() > new Date(event.end_event_date).getTime()
          }
          podium={data?.find((race) => race.raceName === event.name)?.podium}
          podiumIsLoading={isLoading}
          round={event.round}
          country={event.country}
          official_name={event.official_name}
          name={event.name}
          start_event_date={event.start_event_date}
          end_event_date={event.end_event_date}
          year={year}
        />
      ))}
    </div>
  )
}

export default Schedule
