import { fetchWeatherData } from './api';
import { updateWeatherUI, showError, showLoading } from './ui';
import { initializeWeatherMap } from './map';
import { debounce, toggleDarkMode, toggleAccessibilityMode, initializeTheme } from './utils';

// DOM elements
const searchButton = document.getElementById('search-button') as HTMLButtonElement;
const locationInput = document.getElementById('location-input') as HTMLInputElement;
const currentYearElement = document.getElementById('current-year');
const themeToggleButton = document.getElementById('theme-toggle') as HTMLButtonElement;
const accessibilityToggleButton = document.getElementById('a11y-toggle') as HTMLButtonElement;

// Set current year in footer
if (currentYearElement) {
  currentYearElement.textContent = new Date().getFullYear().toString();
}

/**
 * Searches for weather data based on the input value
 */
async function searchWeather(): Promise<void> {
  const location = locationInput.value.trim();
  
  if (!location) {
    showError({ message: 'Please enter a location' });
    return;
  }
  
  try {
    // Show loading state
    showLoading();
    
    // Fetch and display weather data
    const weatherData = await fetchWeatherData(location);
    updateWeatherUI(weatherData);
    
    // Initialize weather map with the location data
    initializeWeatherMap(weatherData);
  } catch (error) {
    showError(error as any);
  }
}

// Event listener for search button
if (searchButton) {
  searchButton.addEventListener('click', searchWeather);
}

// Event listener for Enter key in the input field
if (locationInput) {
  locationInput.addEventListener('keypress', (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      searchWeather();
    }
  });
  
  // Add input event with debounce for suggestions (could be expanded)
  locationInput.addEventListener('input', debounce(() => {
    // This could be used for implementing location suggestions
    // Not implemented in this basic version
  }, 300));
}

// Event listener for theme toggle button
if (themeToggleButton) {
  themeToggleButton.addEventListener('click', toggleDarkMode);
}

// Event listener for accessibility toggle button
if (accessibilityToggleButton) {
  accessibilityToggleButton.addEventListener('click', toggleAccessibilityMode);
}

// Load default location on page load and initialize theme
window.addEventListener('load', () => {
  // Initialize theme based on saved preference
  initializeTheme();
  
  // Load default weather data
  locationInput.value = 'London';
  searchWeather();
});