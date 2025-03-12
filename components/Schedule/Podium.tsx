import { Driver } from "@/types/schedule"

const PODIUM_HEIGHT = {
  1: "h-full",
  2: "h-[95%]",
  3: "h-[90%]",
}

const PODIUM_ORDER = {
  1: "order-2",
  2: "order-1",
  3: "order-3",
}

type PodiumType = Driver

const Podium = ({ driver_code, position, team_color }: PodiumType) => {
  return (
    <div
      key={driver_code}
      className={`${PODIUM_ORDER[position as 1 | 2 | 3]} sm:w-14 w-10 ${PODIUM_HEIGHT[position as 1 | 2 | 3]} py-1 rounded-md`}
      style={{ backgroundColor: team_color }}
    >
      <div className="flex flex-col justify-between h-full">
        <span className="text-xs font-bold">{"#" + position}</span>
        <p className="sm:text-lg text-base leading-none font-bold">
          {driver_code}
        </p>
      </div>
    </div>
  )
}

export default Podium
