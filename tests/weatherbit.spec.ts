import { test, expect } from '@playwright/test'
import { getAusCapitalCityIds, sortCityTemp } from 'commons/helper'
import { AUS_CAPITAL_CITIES, COORDINATES, ENDPOINT } from 'commons/constants'

const CITIES = getAusCapitalCityIds(AUS_CAPITAL_CITIES).toString()

test.describe('Get Weather Data', () => {
  test(`AC2: As a frequent flyer, I want to get current weather data for the city at Latitude: -33.865143, Longitude: 151.209900`, async ({
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

    expect(response.ok()).toBeTruthy()

    expect(data.lat, `incorrect latitude returned`).toEqual(Number.parseFloat(COORDINATES.lat.toFixed(4)))
    expect(data.lon, `incorrect longitude returned`).toEqual(Number.parseFloat(COORDINATES.lon.toFixed(4)))
    expect(data, `missing property "weather"`).toHaveProperty(`weather`)
    expect(data, `missing property "weather.code"`).toHaveProperty(`weather.code`)
    expect(data, `missing property "weather.description"`).toHaveProperty(`weather.description`)
    expect(data, `missing property "weather.icon" `).toHaveProperty(`weather.icon`)

    expect(typeof data.city_name, `prop "city_name" has incorrect data type`).toBe(`string`)
    expect(typeof data.country_code, `prop "country_code" has incorrect data type`).toBe(`string`)
    expect(typeof data.timezone, `prop "timezone" has incorrect data type`).toBe(`string`)
  })

  test('AC3: As a frequent flyer, I want to programmatically find the current warmest capital city in Australia', async ({
    request,
  }) => {
    const response = await request.get(ENDPOINT, {
      params: {
        cities: CITIES,
        key: process.env.API_KEY,
      },
    })

    const body = await response.json()
    const cityData = body.data

    const sortByAppTemp = sortCityTemp(cityData, 'app_temp')
    const warmestCapitalCity = sortByAppTemp[0]
    const coldestCapitalCity = sortByAppTemp[`${sortByAppTemp.length - 1}`]

    expect(response.ok()).toBeTruthy()

    sortByAppTemp.forEach((capitalData) => {
      expect(typeof capitalData.city_name, `prop city_name has incorrect data type`).toBe(`string`)
      expect(typeof capitalData.app_temp, `${capitalData.city_name} has incorrect apparent temperature`).toBe(`number`)
    })

    console.log(
      `The warmest capital city in Australia is ${warmestCapitalCity.city_name} with an apparent temperature of" +
      " ${warmestCapitalCity.app_temp} degrees`
    )
    console.log(
      `While the coldest capital city in Australia is ${coldestCapitalCity.city_name} with an apparent temperature of ${coldestCapitalCity.app_temp} degrees`
    )
  })
})
