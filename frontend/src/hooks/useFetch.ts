import { useEffect, useState } from "react"

type UseFetchOptions<T> = {
  fetcher: (signal?: AbortSignal) => Promise<T>
  deps?: any[]
  skip?: boolean
}

export const useFetch = <T>({
  fetcher,
  deps = [],
  skip = false,
}: UseFetchOptions<T>) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (skip) return

    const controller = new AbortController()
    const signal = controller.signal

    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const result = await fetcher(signal)
        if (!signal.aborted) {
          setData(result)
        }
      } catch (err) {
        if (!signal.aborted) {
          setError(err as Error)
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      controller.abort()
    }
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error }
}
