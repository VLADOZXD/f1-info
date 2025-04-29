"use client"

import { getSchedule } from "@/utils/api"
import Schedule from "@/components/Schedule"
import ArrowButton from "@/components/shared/ArrowButton"
import Container from "@/components/shared/Container"
import SkeletonEventCard from "@/components/Schedule/SkeletonEventCard"
import { useFetch } from "@/hooks/useFetch"
import { useRouter } from "next/navigation"

type SchedulePageProps = {
  year: number
}

const SchedulePage = ({ year }: SchedulePageProps) => {
  const router = useRouter()

  const { data: schedule, loading } = useFetch({
    fetcher: () => getSchedule(year),
  })

  const currentYear = new Date().getFullYear()

  const handlePreviousClick = () => {
    router.replace(`/${year - 1}`)
  }

  const handleNextClick = () => {
    router.replace(`/${year + 1}`)
  }
  return (
    <Container>
      <div className="w-full flex lg:mb-7 md:mb-4 mb-3">
        {year !== 2018 && (
          <ArrowButton
            orientation="left"
            text={year - 1}
            onArrowClick={handlePreviousClick}
            arrowDisable={loading}
          />
        )}
        {year < currentYear && (
          <ArrowButton
            orientation="right"
            text={year + 1}
            onArrowClick={handleNextClick}
            arrowDisable={loading}
            className="ml-auto"
          />
        )}
      </div>
      {loading ? (
        <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-4 gap-y-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonEventCard key={index} />
          ))}
        </div>
      ) : (
        schedule && <Schedule events={schedule.events} year={year} />
      )}
    </Container>
  )
}

export default SchedulePage
