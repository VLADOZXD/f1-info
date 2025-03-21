const getEventPodium = (
  year: number,
  round: number,
  end_event_date: string,
) => {
  if (new Date().getTime() > new Date(end_event_date).getTime()) {
    return fetch(
      `${process.env.NEXT_PUBLIC_FASTAPI_API_URL}race-podium/?year=${year}&round=${round}`,
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json()
      })
      .then((data) => {
        return data
      })
  }
}

export default getEventPodium
