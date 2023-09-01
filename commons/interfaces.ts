export interface ICityWeather {
  app_temp: number
  city_name: string
  country_code: string
  timezone: string
  weather: IWeather
}

interface IWeather {
  code: number
  icon: string
  description: string
}
