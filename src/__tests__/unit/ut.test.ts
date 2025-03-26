import { updateWeatherUI, showError, hideError, showLoading } from '../../ui';
import { WeatherData, ApiError } from '../../types';

describe('UI - Weather UI Functions', () => {
  let mockCurrentWeather: HTMLElement;
  let mockForecast: HTMLElement;
  let mockErrorContainer: HTMLElement;
  
  beforeEach(() => {
    // Setup DOM elements
    mockCurrentWeather = document.createElement('div');
    mockCurrentWeather.id = 'current-weather';
    
    mockForecast = document.createElement('div');
    mockForecast.id = 'forecast';
    
    mockErrorContainer = document.createElement('div');
    mockErrorContainer.id = 'error-container';
    
    document.body.innerHTML = '';
    document.body.appendChild(mockCurrentWeather);
    document.body.appendChild(mockForecast);
    document.body.appendChild(mockErrorContainer);
    
    // Spy on and mock getElementById
    jest.spyOn(document, 'getElementById').mockImplementation((id: string) => {
      if (id === 'current-weather') return mockCurrentWeather;
      if (id === 'forecast') return mockForecast;
      if (id === 'error-container') return mockErrorContainer;
      return null;
    });
  });
  
  afterEach(() => {
    jest.restoreAllMocks();
  });
  
  test('updateWeatherUI should update DOM with weather data', () => {
    const mockWeatherData: WeatherData = {
      location: 'London',
      region: 'Greater London',
      country: 'United Kingdom',
      temperature: 22,
      condition: 'Partly cloudy',
      conditionIcon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
      wind: 15,
      windDirection: 'WSW',
      humidity: 65,
      feelsLike: 23,
      uv: 5,
      lastUpdated: '2025-03-26 12:30',
      forecast: [
        {
          date: 'Wednesday, Mar 26',
          maxTemp: 25,
          minTemp: 18,
          condition: 'Partly cloudy',
          conditionIcon: '//cdn.weatherapi.com/weather/64x64/day/116.png'
        },
        {
          date: 'Thursday, Mar 27',
          maxTemp: 26,
          minTemp: 17,
          condition: 'Sunny',
          conditionIcon: '//cdn.weatherapi.com/weather/64x64/day/113.png'
        }
      ]
    };
    
    // Call the function
    updateWeatherUI(mockWeatherData);
    
    // Verify DOM was updated correctly
    expect(mockCurrentWeather.innerHTML).toContain('London');
    expect(mockCurrentWeather.innerHTML).toContain('Greater London');
    expect(mockCurrentWeather.innerHTML).toContain('United Kingdom');
    expect(mockCurrentWeather.innerHTML).toContain('22');
    expect(mockCurrentWeather.innerHTML).toContain('Partly cloudy');
    expect(mockCurrentWeather.innerHTML).toContain('15');
    expect(mockCurrentWeather.innerHTML).toContain('WSW');
    expect(mockCurrentWeather.innerHTML).toContain('65%');
    
    // Verify forecast was updated
    expect(mockForecast.innerHTML).toContain('Wednesday, Mar 26');
    expect(mockForecast.innerHTML).toContain('Thursday, Mar 27');
    expect(mockForecast.innerHTML).toContain('25');
    expect(mockForecast.innerHTML).toContain('18');
    expect(mockForecast.innerHTML).toContain('26');
    expect(mockForecast.innerHTML).toContain('17');
    expect(mockForecast.innerHTML).toContain('Sunny');
  });
  
  test('showError should display error message', () => {
    const mockError: ApiError = {
      message: 'Location not found',
      code: 404
    };
    
    // Call the function
    showError(mockError);
    
    // Verify error is displayed
    expect(mockErrorContainer.style.display).toBe('block');
    expect(mockErrorContainer.innerHTML).toContain('Location not found');
    expect(mockErrorContainer.innerHTML).toContain('404');
  });
  
  test('hideError should hide the error container', () => {
    // Setup
    mockErrorContainer.style.display = 'block';
    mockErrorContainer.innerHTML = 'Previous error';
    
    // Call the function
    hideError();
    
    // Verify error is hidden
    expect(mockErrorContainer.style.display).toBe('none');
    expect(mockErrorContainer.innerHTML).toBe('');
  });
  
  test('showLoading should display loading messages', () => {
    // Call the function
    showLoading();
    
    // Verify loading messages
    expect(mockCurrentWeather.innerHTML).toContain('Loading current weather data');
    expect(mockForecast.innerHTML).toContain('Loading forecast data');
  });
});