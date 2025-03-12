const getSchedule = (year: number) => {
  return fetch(`${process.env.FASTAPI_API_URL}/schedule/${year}`)
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

export default getSchedule
