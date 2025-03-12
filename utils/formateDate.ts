const formateDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return (
    date.getDate().toString().padStart(2, "0") +
    " " +
    date.toLocaleString("en-US", { month: "short" }).toUpperCase()
  )
}

export default formateDate
