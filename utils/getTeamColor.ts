const getTeamColor = (
  year: string,
  round: string,
  constructor_name: string,
) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_API_URL}py/team-color/?year=${year}&round_number=${round}&constructor_name=${constructor_name}`,
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

export default getTeamColor
