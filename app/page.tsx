import SchedulePage from "@/pages/SchedulePage"
import { ScheduleType } from "@/types/schedule"
import getSchedule from "@/utils/getSchedule"

const Home = async () => {
  const currentYear = new Date().getFullYear()

  const schedule: ScheduleType = await getSchedule(currentYear)

  return <SchedulePage schedule={schedule} />
}

export default Home
