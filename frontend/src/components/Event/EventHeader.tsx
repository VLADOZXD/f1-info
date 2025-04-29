import { countries } from "@/constants/countries"
import { getCountryCode } from "@/utils/getCountryCode"
import ReactCountryFlag from "react-country-flag"

type EventHeaderProps = {
  year: number
  country: keyof typeof countries
  name: string
}

const EventHeader = ({ year, country, name }: EventHeaderProps) => {
  const countryCode = getCountryCode(country)

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex gap-3 items-center">
        <div className="md:w-[40px] w-7 aspect-auto">
          {countryCode !== undefined ? (
            <ReactCountryFlag
              className="rounded-lg"
              countryCode={countryCode}
              svg
              style={{ display: "flex", width: "100%", height: "100%" }}
            />
          ) : (
            <div className="bg-white rounded-lg w-full md:h-[30px] h-[21px]"></div>
          )}
        </div>
        <p className="font-medium text-xl">
          {country} <span className="font-bold">{year}</span>
        </p>
      </div>
      <p className="text-sm">{name}</p>
    </div>
  )
}

export default EventHeader
