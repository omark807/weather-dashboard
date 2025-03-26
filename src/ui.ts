import { WeatherData, ApiError } from './types';
import { getTemperatureColor, getUVDescription } from './utils';

/**
 * Updates the UI with the provided weather data
 * @param data - Weather data to display
 */
export function updateWeatherUI(data: WeatherData): void {
  // Clear any existing error messages
  hideError();
  
  // Update current weather section
  const currentWeatherElement = document.getElementById('current-weather');
  if (currentWeatherElement) {
    currentWeatherElement.innerHTML = `
      <div class="weather-header">
        <div>
          <h2>${data.location}</h2>
          <p>${data.region ? `${data.region}, ` : ''}${data.country}</p>
          <p>Last updated: ${data.lastUpdated}</p>
        </div>
        <div>
          <img class="weather-icon" src="https:${data.conditionIcon}" alt="${data.condition}">
          <h3>${data.condition}</h3>
        </div>
      </div>
      
      <div class="temperature">
        <h2 style="color: ${getTemperatureColor(data.temperature)}">${data.temperature.toFixed(1)}°C</h2>
        <p>Feels like: ${data.feelsLike.toFixed(1)}°C</p>
      </div>
      
      <div class="weather-details">
        <div class="weather-detail">
          <h4>Wind</h4>
          <p>${data.wind.toFixed(1)} km/h</p>
          <p>${data.windDirection}</p>
        </div>
        <div class="weather-detail">
          <h4>Humidity</h4>
          <p>${data.humidity}%</p>
        </div>
        <div class="weather-detail">
          <h4>UV Index</h4>
          <p style="color: ${getUVDescription(data.uv).color}">
            ${data.uv} (${getUVDescription(data.uv).text})
          </p>
        </div>
      </div>
    `;
  }
  
  // Update forecast section
  const forecastElement = document.getElementById('forecast');
  if (forecastElement) {
    forecastElement.innerHTML = data.forecast.map(day => `
      <div class="forecast-item">
        <h3>${day.date}</h3>
        <img src="https:${day.conditionIcon}" alt="${day.condition}">
        <p>${day.condition}</p>
        <p style="color: ${getTemperatureColor(day.maxTemp)}">
          High: ${day.maxTemp.toFixed(1)}°C
        </p>
        <p style="color: ${getTemperatureColor(day.minTemp)}">
          Low: ${day.minTemp.toFixed(1)}°C
        </p>
      </div>
    `).join('');
  }
}

/**
 * Displays an error message to the user
 * @param error - Error information
 */
export function showError(error: ApiError): void {
  const errorContainer = document.getElementById('error-container');
  if (errorContainer) {
    errorContainer.style.display = 'block';
    errorContainer.innerHTML = `
      <p><strong>Error:</strong> ${error.message}</p>
      ${error.code ? `<p>Status code: ${error.code}</p>` : ''}
    `;
  }
}

/**
 * Hides the error container
 */
export function hideError(): void {
  const errorContainer = document.getElementById('error-container');
  if (errorContainer) {
    errorContainer.style.display = 'none';
    errorContainer.innerHTML = '';
  }
}

/**
 * Shows a loading state in the UI
 */
export function showLoading(): void {
  const currentWeatherElement = document.getElementById('current-weather');
  const forecastElement = document.getElementById('forecast');
  
  if (currentWeatherElement) {
    currentWeatherElement.innerHTML = '<p>Loading current weather data...</p>';
  }
  
  if (forecastElement) {
    forecastElement.innerHTML = '<p>Loading forecast data...</p>';
  }
}