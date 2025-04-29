import { Driver } from "@/types/schedule"
import formateDate from "@/utils/formateDate"
import Podium from "./Podium"
import { getEventPodium } from "@/utils/api"
import { useFetch } from "@/hooks/useFetch"

type EventCardBottom = {
  finished: boolean
  year: number
  round: number
  start_event_date: string
  end_event_date: string
  allowFetch: boolean
}

const EventCardBottom = ({
  finished,
  year,
  round,
  start_event_date,
  end_event_date,
  allowFetch,
}: EventCardBottom) => {
  const { data, loading: loading } = useFetch({
    fetcher: (signal) => getEventPodium(year, round, signal),
    skip:
      !allowFetch ||
      round === 0 ||
      new Date().getTime() <= new Date(end_event_date).getTime(),
    deps: [year, round, allowFetch],
  })

  let cardBottomContent

  if (!finished) {
    cardBottomContent = (
      <div className="h-16 bg-secondary rounded-b-xl py-4 text-center text-xl font-medium">
        {`${formateDate(start_event_date)} - ${formateDate(end_event_date)}`}
      </div>
    )
  } else if (loading) {
    cardBottomContent = (
      <div className="flex justify-around items-end sm:px-4 px-1 py-1 h-16 bg-secondary rounded-b-xl text-center animate-pulse">
        {new Array(3).fill(null).map((_, index) => (
          <div
            key={index}
            className={`sm:w-14 w-10 bg-slate-600 rounded-md ${
              index === 0
                ? "animate-pulse-height-2"
                : index === 1
                  ? "animate-pulse-height-1"
                  : "animate-pulse-height-3"
            }`}
          ></div>
        ))}
      </div>
    )
  } else {
    cardBottomContent = (
      <div className="flex justify-around items-end sm:px-4 px-1 py-1 h-16 bg-secondary rounded-b-xl text-center">
        {data?.podium?.length &&
          data.podium.map((driver: Driver) => (
            <Podium
              key={driver.id}
              driver_code={driver.driver_code}
              position={driver.position}
              team_color={driver.team_color}
            />
          ))}
      </div>
    )
  }

  if (round === 0) {
    cardBottomContent = (
      <div className="h-16 bg-secondary rounded-b-xl py-4 text-center text-xl font-medium">
        ENDED
      </div>
    )
  }
  return cardBottomContent
}

export default EventCardBottom
