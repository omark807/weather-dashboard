import { initializeWeatherMap, updateWeatherMap } from '../../map';
import { WeatherData } from '../../types';
import { announceForScreenReader } from '../../utils';

// Mock the utils module
jest.mock('../../utils', () => ({
  announceForScreenReader: jest.fn()
}));

describe('Map - Weather Map Functions', () => {
  let mockWeatherMap: HTMLElement;
  let mockRadarButton: HTMLElement;
  let mockSatelliteButton: HTMLElement;
  let mockTemperatureButton: HTMLElement;
  
  beforeEach(() => {
    // Setup DOM elements
    document.body.innerHTML = `
      <div id="weather-map"></div>
      <div class="map-controls">
        <button id="radar-button" class="map-button">Radar</button>
        <button id="satellite-button" class="map-button">Satellite</button>
        <button id="temperature-button" class="map-button">Temperature</button>
      </div>
    `;
    
    mockWeatherMap = document.getElementById('weather-map') as HTMLElement;
    mockRadarButton = document.getElementById('radar-button') as HTMLElement;
    mockSatelliteButton = document.getElementById('satellite-button') as HTMLElement;
    mockTemperatureButton = document.getElementById('temperature-button') as HTMLElement;
    
    // Clear mocks
    jest.clearAllMocks();
  });
  
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
    forecast: []
  };
  
  test('initializeWeatherMap should setup map and buttons', () => {
    // Call the function
    initializeWeatherMap(mockWeatherData);
    
    // Verify map was initialized
    expect(mockWeatherMap.innerHTML).toContain('img');
    expect(mockWeatherMap.innerHTML).toContain('London');
    
    // Verify radar button is active by default
    expect(mockRadarButton.classList.contains('active')).toBe(true);
    
    // Verify announcement to screen reader
    expect(announceForScreenReader).toHaveBeenCalledWith(
      expect.stringContaining('Displaying')
    );
  });
  
  test('updateWeatherMap should update map for satellite view', () => {
    // Call the function
    updateWeatherMap('satellite', mockWeatherData);
    
    // Verify map was updated
    expect(mockWeatherMap.innerHTML).toContain('img');
    expect(mockWeatherMap.innerHTML).toContain('London');
    expect(mockWeatherMap.innerHTML).toContain('Satellite cloud coverage map');
    
    // Verify satellite button is active
    expect(mockRadarButton.classList.contains('active')).toBe(false);
    expect(mockSatelliteButton.classList.contains('active')).toBe(true);
    expect(mockTemperatureButton.classList.contains('active')).toBe(false);
    
    // Verify announcement to screen reader
    expect(announceForScreenReader).toHaveBeenCalledWith(
      expect.stringContaining('Satellite')
    );
  });
  
  test('updateWeatherMap should update map for temperature view', () => {
    // Call the function
    updateWeatherMap('temperature', mockWeatherData);
    
    // Verify map was updated
    expect(mockWeatherMap.innerHTML).toContain('img');
    expect(mockWeatherMap.innerHTML).toContain('London');
    expect(mockWeatherMap.innerHTML).toContain('Temperature map');
    
    // Verify temperature button is active
    expect(mockRadarButton.classList.contains('active')).toBe(false);
    expect(mockSatelliteButton.classList.contains('active')).toBe(false);
    expect(mockTemperatureButton.classList.contains('active')).toBe(true);
    
    // Verify announcement to screen reader
    expect(announceForScreenReader).toHaveBeenCalledWith(
      expect.stringContaining('Temperature')
    );
  });
  
  test('map buttons should trigger map updates when clicked', () => {
    // Initialize the map
    initializeWeatherMap(mockWeatherData);
    
    // Clear mocks after initialization
    jest.clearAllMocks();
    
    // Simulate clicking satellite button
    mockSatelliteButton.click();
    
    // Verify satellite map was displayed
    expect(mockWeatherMap.innerHTML).toContain('Satellite cloud coverage map');
    expect(mockSatelliteButton.classList.contains('active')).toBe(true);
    
    // Clear mocks again
    jest.clearAllMocks();
    
    // Simulate clicking temperature button
    mockTemperatureButton.click();
    
    // Verify temperature map was displayed
    expect(mockWeatherMap.innerHTML).toContain('Temperature map');
    expect(mockTemperatureButton.classList.contains('active')).toBe(true);
    
    // Clear mocks again
    jest.clearAllMocks();
    
    // Simulate clicking radar button
    mockRadarButton.click();
    
    // Verify radar map was displayed
    expect(mockWeatherMap.innerHTML).toContain('Precipitation radar map');
    expect(mockRadarButton.classList.contains('active')).toBe(true);
  });
  
  test('should handle missing DOM elements gracefully', () => {
    // Remove map element
    document.body.innerHTML = '';
    
    // This should not throw any errors
    expect(() => {
      initializeWeatherMap(mockWeatherData);
      updateWeatherMap('radar', mockWeatherData);
    }).not.toThrow();
  });
});