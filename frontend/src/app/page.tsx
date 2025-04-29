"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

const Home = () => {
  const router = useRouter()

  const currentYear = new Date().getFullYear()

  useEffect(() => {
    router.push(`/${currentYear}`)
  }, [currentYear, router])
}

export default Home
