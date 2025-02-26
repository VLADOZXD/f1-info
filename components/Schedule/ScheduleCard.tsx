import { getCountryCode } from "@/utils/getCountryCode"
import ReactCountryFlag from "react-country-flag"
import { inherits } from "util"

type ScheduleCardProps = {
  finished?: boolean
}

const ScheduleCard = ({ finished }: ScheduleCardProps) => {
  const countryCode = getCountryCode("Bahrain")

  return (
    <div className="w-auto max-w-[274px] rounded-xl border-2 bg-background border-red relative hover:scale-[1.01] ease-in-out duration-50">
      <div className="absolute top-[-10px] left-6 w-max bg-inherit text-sm font-bold uppercase px-2">
        Round 1
      </div>
      <div className="sm:px-4 sm:py-4 py-3 px-1">
        <div className="flex items-center">
          <div className="flex flex-row items-center ms:gap-2 gap-0.5">
            {countryCode && (
              <div className="sm:w-[40px] w-8 sm:h-[30px] h-6">
                <ReactCountryFlag
                  className="rounded-lg"
                  countryCode={countryCode}
                  svg
                  style={{ display: "flex", width: "100%", height: "100%" }}
                />
              </div>
            )}
            <h2 className="md:text-base sm:text-sm text-xs font-semibold">
              Bahrain
            </h2>
          </div>
          {finished && (
            <div className="ml-auto bg-gray-200 text-black lg:px-2 px-1 md:py-1 py-0.5 rounded-md font-normal md:text-[10px] text-[8px]">
              29 FEB - 02 MAR
            </div>
          )}
        </div>
        <p className="text-xs mt-2 font-light">
          FORMULA 1 MSC CRUISES GRAN PREMIO DEL MADE IN ITALY E
          DELL`EMILIA-ROMAGNA 2024
        </p>
      </div>
      {!finished ? (
        <div className="h-16 bg-scheduleBackground rounded-b-xl py-4 text-center text-xl font-medium">
          29 FEB - 02 MAR
        </div>
      ) : (
        <div className="flex justify-around items-end sm:px-4 px-1 py-1 h-16 bg-scheduleBackground rounded-b-xl text-center">
          <div className="flex flex-col order-1 justify-between sm:w-14 w-10 h-[95%] py-1 bg-blue-600 rounded-md">
            <span className="text-xs font-bold">#2</span>
            <p className="sm:text-lg text-base leading-none font-bold">PER</p>
          </div>
          <div className="flex flex-col order-2 justify-between sm:w-14 w-10 h-full py-1 bg-blue-600 rounded-md ">
            <span className="text-xs font-bold">#1</span>
            <p className="sm:text-lg text-base  leading-none font-bold">VER</p>
          </div>
          <div className="flex flex-col order-3 justify-between sm:w-14 w-10 h-[90%] py-1 bg-red rounded-md">
            <span className="text-xs font-bold">#3</span>
            <p className="sm:text-lg text-base  leading-none font-bold">LEC</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ScheduleCard
