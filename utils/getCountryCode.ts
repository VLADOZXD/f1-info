import { countries } from "../constants/countries"

export const getCountryCode = (
  country: keyof typeof countries,
): string | undefined => {
  return countries[country]
}
