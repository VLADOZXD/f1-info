"use client"

import { Driver, RaceEventType } from "@/types/schedule"
import formateDate from "@/utils/formateDate"
import { getCountryCode } from "@/utils/getCountryCode"
import ReactCountryFlag from "react-country-flag"
import EventCardBottom from "./EventCardBottom"
import getEventPodium from "@/utils/getEventPodium"
import { useEffect, useState } from "react"

type EventCardProps = RaceEventType & {
  finished?: boolean
  year: number
}

const EventCard = ({
  finished,
  round,
  name,
  country,
  start_event_date,
  end_event_date,
  year,
}: EventCardProps) => {
  const [podium, setPodium] = useState<Driver[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPodium = async () => {
      try {
        const data = await getEventPodium(year, round, end_event_date)
        setPodium(data.podium || [])
      } catch (err) {
        setError("Failed to fetch podium data")
      } finally {
        setLoading(false)
      }
    }

    fetchPodium()
  }, [year, round, end_event_date])

  const countryCode = getCountryCode(country)

  return (
    <div className="w-auto rounded-xl border-2 bg-background border-red relative hover:scale-[1.01] ease-in-out duration-50">
      <div className="absolute md:top-[-10px] top-[-8px] md:left-6 left-3 bg-inherit md:text-sm text-xs sm:font-bold font-semibold uppercase sm:px-2 px-0.5">
        {`Round ${round}`}
      </div>
      {finished && (
        <div className="absolute right-2 md:w-20 w-14 bg-gray-200 text-black py-0.5 rounded-b-md font-normal md:text-[9px] text-[6px] text-center">
          {`${formateDate(start_event_date)} - ${formateDate(end_event_date)}`}
        </div>
      )}
      <div className="sm:px-4 sm:py-4 py-3 px-1 h-[108px]">
        <div className="flex items-center">
          <div className="flex flex-row items-center md:gap-2 gap-0.5">
            {countryCode && (
              <div className="md:w-[40px] w-7 aspect-auto">
                <ReactCountryFlag
                  className="rounded-lg"
                  countryCode={countryCode}
                  svg
                  style={{ display: "flex", width: "100%", height: "100%" }}
                />
              </div>
            )}
            <h2 className="md:text-sm text-xs font-semibold">{country}</h2>
          </div>
        </div>
        <p className="text-xs mt-2 font-light line-clamp-3">{name}</p>
      </div>
      {finished !== undefined && (
        <EventCardBottom
          finished={finished}
          podium={podium}
          year={year}
          round={round}
          start_event_date={start_event_date}
          end_event_date={end_event_date}
          loading={loading}
        />
      )}
    </div>
  )
}

export default EventCard
