import Container from "../Container"
import ScheduleCard from "./ScheduleCard"

const Schedule = () => {
  return (
    <Container>
      <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-4 gap-y-8">
        <ScheduleCard finished />
        <ScheduleCard />
        <ScheduleCard />
        <ScheduleCard />
        <ScheduleCard />
        <ScheduleCard />
        <ScheduleCard />
      </div>
    </Container>
  )
}

export default Schedule
