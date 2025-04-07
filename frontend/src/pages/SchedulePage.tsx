import Schedule from "@/components/Schedule"
import { ScheduleType } from "@/types/schedule"

type SchedulePageProps = { schedule: ScheduleType }

const SchedulePage = ({ schedule }: SchedulePageProps) => {
  return (
    <>
      <Schedule events={schedule.events} year={schedule.year} />
    </>
  )
}

export default SchedulePage
