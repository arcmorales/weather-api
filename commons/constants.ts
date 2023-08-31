type AustralianCapitalCities =
  | 'Sydney'
  | 'Melbourne'
  | 'Brisbane'
  | 'Canberra'
  | 'Darwin'
  | 'Hobart'
  | 'Perth'
  | 'Adelaide'

export interface IAusCapital extends Record<AustralianCapitalCities, number> {}

interface ICoordinates extends Record<'lat' | 'lon', number> {}

export const AUS_CAPITAL_CITIES: IAusCapital = {
  Sydney: 2_147_714,
  Melbourne: 2_158_177,
  Brisbane: 2_174_003,
  Canberra: 2_172_517,
  Darwin: 2_073_124,
  Hobart: 2_163_355,
  Perth: 2_063_523,
  Adelaide: 2_078_025,
}

export const ENDPOINT = `current`

export const COORDINATES: ICoordinates = {
  lat: -33.865_143,
  lon: 151.2099,
}
