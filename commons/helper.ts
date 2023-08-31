import { IAusCapital } from 'commons/constants'
import { ICityWeather } from 'commons/interfaces'

export const getAusCapitalCityIds = (capitals: IAusCapital) => Object.values(capitals)

export const sortCityTemp = (cityArray: ICityWeather[], prop: string) =>
  cityArray.sort((city1, city2) => city2[prop] - city1[prop])
