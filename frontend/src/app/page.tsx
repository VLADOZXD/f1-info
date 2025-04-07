import SchedulePage from "@/pages/SchedulePage"
import { getSchedule } from "@/utils/api"

const Home = async () => {
  const currentYear = new Date().getFullYear()

  const schedule = await getSchedule(currentYear)

  return <SchedulePage schedule={schedule} />
}

export default Home
