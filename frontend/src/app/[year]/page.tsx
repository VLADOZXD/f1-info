"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import SchedulePage from "@/pages/SchedulePage"

type SchedulePageProps = {
  params: {
    year: number
  }
}

const Schedule = ({ params }: SchedulePageProps) => {
  const { year } = params

  const router = useRouter()
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    if (year > currentYear || year < 2018 || isNaN(year)) {
      router.replace(`/${currentYear}`)
    }
  }, [year, currentYear, router])

  if (year > currentYear || year < 0 || isNaN(year)) {
    return null
  }

  return <SchedulePage year={Number(params.year)} />
}

export default Schedule
