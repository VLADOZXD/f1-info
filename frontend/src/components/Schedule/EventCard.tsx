import ReactCountryFlag from "react-country-flag"
import EventCardBottom from "./EventCardBottom"
import formateDate from "@/utils/formateDate"
import { getCountryCode } from "@/utils/getCountryCode"
import { RaceEvent } from "@/types/schedule"
import Link from "next/link"

type EventCardProps = Omit<RaceEvent, "id"> & {
  finished?: boolean
  podium: any | null
  podiumIsLoading: boolean
  year: number
}

const EventCard = ({
  finished,
  podium,
  podiumIsLoading,
  round,
  name,
  official_name,
  country,
  start_event_date,
  end_event_date,
  year,
}: EventCardProps) => {
  const countryCode = getCountryCode(country)

  const roundSlug = name.toLowerCase().replace(/\s+/g, "-")

  return (
    <Link href={`/${year}/${roundSlug}`}>
      <div className="w-auto rounded-xl border-2 bg-primary border-red relative hover:scale-[1.01] ease-in-out duration-50">
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
              <div className="md:w-[40px] w-7 aspect-auto">
                {countryCode !== undefined ? (
                  <ReactCountryFlag
                    className="rounded-lg"
                    countryCode={countryCode}
                    svg
                    style={{ display: "flex", width: "100%", height: "100%" }}
                  />
                ) : (
                  <div className="bg-white rounded-lg w-full md:h-[30px] h-[21px]"></div>
                )}
              </div>
              <h2 className="md:text-sm text-xs font-semibold">{country}</h2>
            </div>
          </div>
          <p className="text-xs mt-2 font-light line-clamp-3">
            {official_name}
          </p>
        </div>
        {finished !== undefined && (
          <EventCardBottom
            finished={finished}
            year={year}
            round={round}
            start_event_date={start_event_date}
            end_event_date={end_event_date}
            podium={podium}
            isLoading={podiumIsLoading}
          />
        )}
      </div>
    </Link>
  )
}

export default EventCard
