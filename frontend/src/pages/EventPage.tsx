import Container from "@/components/shared/Container"
import EventHeader from "@/components/Event/EventHeader"
import EventResults from "@/components/Event/EventResults"
import EventSchedule from "@/components/Event/EventSchedule"

import { EventDetail } from "@/types/event"

type EventPageProps = {
  event: EventDetail
}

const EventPage = ({ event }: EventPageProps) => {
  return (
    <Container>
      <div className="flex md:flex-row flex-col md:justify-between md:space-x-3 space-x-0 md:space-y-0 space-y-3">
        <EventHeader
          year={event.year}
          country={event.country}
          name={event.official_name}
        />
        <EventSchedule sessions={event.sessions} />
      </div>
      <EventResults
        year={event.year}
        round={event.name}
        eventFormat={event.event_format}
      />
    </Container>
  )
}

export default EventPage
