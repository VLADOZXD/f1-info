"use client"

import { useEffect, useState } from "react"
import { ScheduleType } from "@/types/schedule"
import { getSchedule } from "@/utils/api"
import Schedule from "@/components/Schedule"
import ArrowButton from "@/components/ArrowButton"
import Container from "@/components/Container"
import SkeletonEventCard from "@/components/Schedule/SkeletonEventCard"

const SchedulePage = () => {
  const currentYear = new Date().getFullYear()
  const [year, setYear] = useState(currentYear)
  const [schedule, setSchedule] = useState<ScheduleType | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchSchedule = async () => {
      setLoading(true)
      try {
        const data = await getSchedule(year)
        setSchedule(data)
      } finally {
        setLoading(false)
      }
    }

    fetchSchedule()
  }, [year])

  const handlePreviousClick = () => {
    setYear((prev) => prev - 1)
  }

  const handleNextClick = () => {
    setYear((prev) => prev + 1)
  }
  return (
    <Container>
      <div className="w-full flex justify-between lg:mb-7 md:mb-4 mb-3">
        <ArrowButton
          orientation="left"
          text={year - 1}
          onArrowClick={handlePreviousClick}
          arrowDisable={loading}
        />
        {year < currentYear && (
          <ArrowButton
            orientation="right"
            text={year + 1}
            onArrowClick={handleNextClick}
            arrowDisable={loading}
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
