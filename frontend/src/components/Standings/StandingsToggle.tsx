type StandingsToggleProps = {
  toggle: string
  onToggle: (standings: "driver" | "constructor") => void
}

const StandingsToggle = ({ toggle, onToggle }: StandingsToggleProps) => {
  return (
    <div className="bg-secondary rounded-tl-[30px] lg:-mx-7 lg:-mt-7 md:-mx-4 md:-mt-4 -mx-3 -mt-3">
      <div className="grid grid-cols-2 items-center text-center divide-x divide-primary p-2 sm:font-bold font-semibold sm:text-lg text-sm">
        <h2
          className={`lg:p-6 md:p-4 p-2 cursor-default ${toggle === "driver" ? "text-red" : "text-white"}`}
          onClick={() => onToggle("driver")}
        >
          DRIVER
        </h2>
        <h2
          className={`lg:p-6 md:p-4 p-2 cursor-default ${toggle === "constructor" ? "text-red" : "text-white"}`}
          onClick={() => onToggle("constructor")}
        >
          CONSTRUCTOR
        </h2>
      </div>
    </div>
  )
}

export default StandingsToggle
