"use client"

import { fetchSchedule } from "@/utils/api"
import Schedule from "@/components/Schedule"
import ArrowButton from "@/components/shared/ArrowButton"
import Container from "@/components/shared/Container"
import SkeletonEventCard from "@/components/Schedule/SkeletonEventCard"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

type SchedulePageProps = {
  year: number
}

const SchedulePage = ({ year }: SchedulePageProps) => {
  const router = useRouter()

  const { data: schedule, isLoading } = useQuery({
    queryKey: ["schedule", year],
    queryFn: () => fetchSchedule(year),
    staleTime: 600000,
    refetchOnWindowFocus: false,
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
            arrowDisable={isLoading}
          />
        )}
        {year < currentYear && (
          <ArrowButton
            orientation="right"
            text={year + 1}
            onArrowClick={handleNextClick}
            arrowDisable={isLoading}
            className="ml-auto"
          />
        )}
      </div>
      {isLoading || schedule === null ? (
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
