type Column<T> = {
  header: string
  accessor?: keyof T
  className?: string
  render?: (row: T) => React.ReactNode
}
