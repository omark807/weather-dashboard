import axios from 'axios';
import { fetchWeatherData } from '../../api';
import { WeatherResponse } from '../../types';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API - fetchWeatherData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('should fetch and process weather data successfully', async () => {
    // Create mock API response
    const mockResponse = {
      data: {
        current: {
          temp_c: 21.5,
          temp_f: 70.7,
          condition: {
            text: 'Partly cloudy',
            icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
            code: 1003
          },
          wind_kph: 15.8,
          wind_dir: 'WSW',
          humidity: 65,
          feelslike_c: 22.3,
          uv: 5,
          last_updated: '2025-03-26 12:30'
        },
        forecast: {
          forecastday: [
            {
              date: '2025-03-26',
              date_epoch: 1711497600,
              day: {
                maxtemp_c: 25.8,
                mintemp_c: 18.2,
                avgtemp_c: 22.5,
                condition: {
                  text: 'Partly cloudy',
                  icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
                  code: 1003
                },
                uv: 5
              },
              astro: {
                sunrise: '06:45 AM',
                sunset: '06:30 PM'
              }
            },
            {
              date: '2025-03-27',
              date_epoch: 1711584000,
              day: {
                maxtemp_c: 26.3,
                mintemp_c: 17.9,
                avgtemp_c: 22.1,
                condition: {
                  text: 'Sunny',
                  icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
                  code: 1000
                },
                uv: 6
              },
              astro: {
                sunrise: '06:46 AM',
                sunset: '06:29 PM'
              }
            }
          ]
        },
        location: {
          name: 'London',
          region: 'City of London, Greater London',
          country: 'United Kingdom',
          localtime: '2025-03-26 12:30'
        }
      }
    };
    
    // Setup axios mock
    mockedAxios.get.mockResolvedValue(mockResponse);
    
    // Call the function
    const result = await fetchWeatherData('London');
    
    // Verify the axios call
    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining('/forecast.json'),
      expect.objectContaining({
        params: expect.objectContaining({
          q: 'London',
          days: 3
        })
      })
    );
    
    // Verify the processed result
    expect(result).toMatchObject({
      location: 'London',
      country: 'United Kingdom',
      temperature: 21.5,
      condition: 'Partly cloudy',
      wind: 15.8,
      windDirection: 'WSW',
      humidity: 65,
      forecast: expect.arrayContaining([
        expect.objectContaining({
          maxTemp: 25.8,
          minTemp: 18.2,
          condition: 'Partly cloudy'
        }),
        expect.objectContaining({
          maxTemp: 26.3,
          minTemp: 17.9,
          condition: 'Sunny'
        })
      ])
    });
  });
  
  test('should handle API errors correctly', async () => {
    // Setup axios error response
    const errorResponse = {
      response: {
        status: 400,
        data: {
          error: {
            message: 'Invalid location'
          }
        }
      }
    };
    
    mockedAxios.get.mockRejectedValue(errorResponse);
    mockedAxios.isAxiosError.mockReturnValue(true);
    
    // Call the function and expect it to throw
    await expect(fetchWeatherData('InvalidLocation')).rejects.toMatchObject({
      message: 'Invalid location',
      code: 400
    });
  });
  
  test('should handle unexpected errors', async () => {
    // Setup a non-axios error
    mockedAxios.get.mockRejectedValue(new Error('Network error'));
    mockedAxios.isAxiosError.mockReturnValue(false);
    
    // Call the function and expect it to throw
    await expect(fetchWeatherData('London')).rejects.toMatchObject({
      message: 'An unexpected error occurred'
    });
  });
});