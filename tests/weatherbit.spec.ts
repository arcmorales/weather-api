import { expect, test } from '@playwright/test'
import { getAusCapitalCityIds, sortCityTemp } from 'commons/helper'
import { AUS_CAPITAL_CITIES, COORDINATES, ENDPOINT } from 'commons/constants'
import { ICityWeather } from 'commons/interfaces'

const CITIES = getAusCapitalCityIds(AUS_CAPITAL_CITIES).toString()

test.describe('Get Weather Data', () => {
  test(`@AC2: As a frequent flyer, I want to get current weather data for the city at Latitude: -33.865143, Longitude: 151.209900`, async ({
    request,
  }) => {
    const response = await request.get(ENDPOINT, {
      params: {
        key: process.env.API_KEY,
        ...COORDINATES,
      },
    })
    const body = await response.json()
    const data = body.data[0]

    expect(response.ok(), `verify call to get current weather data is successful`).toBeTruthy()

    expect(data.lat, `verify latitude returned`).toEqual(Number.parseFloat(COORDINATES.lat.toFixed(4)))
    expect(data.lon, `verify longitude returned`).toEqual(Number.parseFloat(COORDINATES.lon.toFixed(4)))
    expect(data, `check for property "weather"`).toHaveProperty(`weather`)
    expect(data, `check for property "weather.code"`).toHaveProperty(`weather.code`)
    expect(data, `check for property "weather.description"`).toHaveProperty(`weather.description`)
    expect(data, `check for property "weather.icon" `).toHaveProperty(`weather.icon`)

    expect(typeof data.city_name, `prop "city_name" type to be string`).toBe(`string`)
    expect(typeof data.country_code, `prop "country_code" type to be string`).toBe(`string`)
    expect(typeof data.timezone, `prop "timezone" type to be string`).toBe(`string`)
  })

  test('@AC3: As a frequent flyer, I want to programmatically find the current warmest capital city in Australia', async ({
    request,
  }) => {
    const response = await request.get(ENDPOINT, {
      params: {
        cities: CITIES,
        key: process.env.API_KEY,
      },
    })

    const { data }: { data: ICityWeather[] } = await response.json()

    const sortByAppTemp = sortCityTemp(data, 'app_temp')
    const warmestCapitalCity = sortByAppTemp[0]
    const coldestCapitalCity = sortByAppTemp.at(-1)

    expect(
      response.ok(),
      `verify call to get current weather data for Australia capital cities is successful`
    ).toBeTruthy()

    sortByAppTemp.forEach((capitalData) => {
      expect(typeof capitalData.city_name, `check city_name type to be string`).toBe(`string`)
      expect(
        typeof capitalData.app_temp,
        `${capitalData.city_name} - check apparent temperature type to be number`
      ).toBe(`number`)
    })

    console.log(
      `The warmest capital city in Australia is ${warmestCapitalCity.city_name} with an apparent temperature of ${warmestCapitalCity.app_temp} degrees`
    )
    console.log(
      `While the coldest capital city in Australia is ${
        coldestCapitalCity!.city_name
      } with an apparent temperature of ${coldestCapitalCity!.app_temp} degrees`
    )
  })
})
