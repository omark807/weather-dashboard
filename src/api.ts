import axios from 'axios';
import { WeatherResponse, WeatherData, ForecastItem, ApiError } from './types';
import { formatDate } from './utils';

// Free API key from WeatherAPI.com - limited to 1,000,000 calls per month
// You should sign up for your own API key at https://www.weatherapi.com/
const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key
const BASE_URL = 'https://api.weatherapi.com/v1';

/**
 * Fetches weather data for the specified location
 * @param location - City name or coordinates
 * @returns Processed weather data
 * @throws ApiError if the request fails
 */
export async function fetchWeatherData(location: string): Promise<WeatherData> {
  try {
    const response = await axios.get<WeatherResponse>(`${BASE_URL}/forecast.json`, {
      params: {
        key: API_KEY,
        q: location,
        days: 3,
        aqi: 'no',
        alerts: 'no'
      }
    });

    return processWeatherData(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle API errors
      const errorMessage = error.response?.data?.error?.message || 'Failed to fetch weather data';
      const errorCode = error.response?.status;
      
      throw {
        message: errorMessage,
        code: errorCode
      } as ApiError;
    }
    
    // Handle unexpected errors
    throw {
      message: 'An unexpected error occurred'
    } as ApiError;
  }
}

/**
 * Processes the raw API response into a more usable format
 * @param data - Raw API response
 * @returns Processed weather data
 */
function processWeatherData(data: WeatherResponse): WeatherData {
  // Process forecast data
  const forecastItems: ForecastItem[] = data.forecast.forecastday.map(day => ({
    date: formatDate(day.date),
    maxTemp: day.day.maxtemp_c,
    minTemp: day.day.mintemp_c,
    condition: day.day.condition.text,
    conditionIcon: day.day.condition.icon
  }));

  // Return processed data
  return {
    location: data.location.name,
    region: data.location.region,
    country: data.location.country,
    temperature: data.current.temp_c,
    condition: data.current.condition.text,
    conditionIcon: data.current.condition.icon,
    wind: data.current.wind_kph,
    windDirection: data.current.wind_dir,
    humidity: data.current.humidity,
    feelsLike: data.current.feelslike_c,
    uv: data.current.uv,
    lastUpdated: data.current.last_updated,
    forecast: forecastItems
  };
}