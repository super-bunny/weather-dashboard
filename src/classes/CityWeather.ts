import axios, { AxiosError, AxiosResponse } from 'axios'
import ICurrentWeatherData from '../types/CityWeather'

export default class CityWeather {
  private data: ICurrentWeatherData

  constructor(data: ICurrentWeatherData) {
    this.data = data
  }

  get city(): string {
    return this.data.name
  }

  get temperature(): number {
    return this.data.main.temp
  }

  get maxTemperature(): number {
    return this.data.main.tempMax
  }

  get minTemperature(): number {
    return this.data.main.tempMin
  }

  get pressure(): number {
    return this.data.main.pressure
  }

  get humidity(): number {
    return this.data.main.humidity
  }

  async refresh(): Promise<boolean | AxiosError> {
    return await axios.get(`https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          q: this.city,
          units: 'metric',
          appid: process.env.REACT_APP_API_KEY_OPEN_WEATHER,
        },
      })
      .then((response: AxiosResponse<ICurrentWeatherData>) => {
        this.data = response.data
        return true
      })
  }

  static async getInstance(city: string): Promise<CityWeather | AxiosError> {
    return await axios.get(`https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          q: city,
          units: 'metric',
          appid: process.env.REACT_APP_API_KEY_OPEN_WEATHER,
        },
      })
      .then(
        response => new CityWeather(response.data),
      )
  }
}
