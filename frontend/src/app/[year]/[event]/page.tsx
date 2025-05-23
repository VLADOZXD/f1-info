import EventPage from "@/components/pages/EventPage"
import { getEventSchedule } from "@/utils/api"

type EventPageProps = {
  params: {
    year: number
    event: string
  }
}

const Event = async ({ params }: EventPageProps) => {
  const { year, event } = params

  const data = await getEventSchedule(year, event.replace(/-/g, " "))

  return <EventPage event={data.event} />
}

export default Event
