import axios, { AxiosError, AxiosResponse } from 'axios'
import ICurrentWeatherData from '../types/CityWeather'

const OPEN_WEATHER_HOST = process.env.REACT_APP_OPEN_WEATHER_API_HOST || 'api.openweathermap.org'
const OPEN_WEATHER_PORT = process.env.REACT_APP_OPEN_WEATHER_API_PORT || 80
const OPEN_WEATHER_API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY

export default class CityWeather {
  private data: ICurrentWeatherData

  constructor(data: ICurrentWeatherData) {
    this.data = data
  }

  get city(): string {
    return this.data.name
  }

  get countryCode(): string {
    return this.data.sys.country
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

  get description(): string {
    return this.data.weather[0].description
  }

  get imgUrl(): string {
    return `http://openweathermap.org/img/wn/${ this.data.weather[0].icon }@2x.png`
  }

  async refresh(): Promise<boolean | AxiosError> {
    return await axios.get(`http://${ OPEN_WEATHER_HOST }:${ OPEN_WEATHER_PORT }/data/2.5/weather`,
      {
        params: {
          q: this.city,
          units: 'metric',
          appid: OPEN_WEATHER_API_KEY,
        },
      })
      .then((response: AxiosResponse<ICurrentWeatherData>) => {
        this.data = response.data
        return true
      })
  }

  static async getInstance(city: string): Promise<CityWeather | AxiosError> {
    return await axios.get(`http://${ OPEN_WEATHER_HOST }:${ OPEN_WEATHER_PORT }/data/2.5/weather`,
      {
        params: {
          q: city,
          units: 'metric',
          appid: OPEN_WEATHER_API_KEY,
        },
      })
      .then(
        response => new CityWeather(response.data),
      )
  }
}
