const formateTime = (dateStr: string) => {
  const date = new Date(dateStr + "Z")
  const hours = date.getHours().toString().padStart(2, "0")
  const minutes = date.getMinutes().toString().padStart(2, "0")
  return `${hours}:${minutes}`
}

export default formateTime
