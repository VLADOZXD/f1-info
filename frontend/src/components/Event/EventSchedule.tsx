import { Session } from "@/types/event"
import EventScheduleItem from "./EventScheduleItem"

type EventScheduleProps = { sessions: Session[] }

const EventSchedule = ({ sessions }: EventScheduleProps) => {
  return (
    <div className="flex flex-col-reverse w-full rounded-xl border-2 bg-secondary border-red space-y-2 space-y-reverse md:p-3 p-2">
      {sessions.map((session) => (
        <EventScheduleItem
          key={session.id}
          name={session.name}
          event_start={session.event_start}
        />
      ))}
    </div>
  )
}

export default EventSchedule
