import formateDate from "@/utils/formateDate"
import formateTime from "@/utils/formateTime"

type EventScheduleItemProps = { name: string; event_start: string }

const EventScheduleItem = ({ name, event_start }: EventScheduleItemProps) => {
  const formattedTime = formateTime(event_start)
  const formattedDate = formateDate(event_start)
  const [day, month] = formattedDate.split(" ")

  return (
    <div className="flex items-center">
      <div className="flex items-center space-x-4">
        <div className="flex flex-col items-center w-fit md:text-base text-sm ">
          <span>{day}</span>
          <span className="font-semibold">{month}</span>
        </div>
        <div className="h-10 w-px bg-red"></div>
        <p className="font-bold md:text-xl text-lg">{name}</p>
      </div>
      <span className="ml-auto bg-slate-200 py-px px-2 rounded-xl text-secondary text-sm">
        {formattedTime}
      </span>
    </div>
  )
}

export default EventScheduleItem
