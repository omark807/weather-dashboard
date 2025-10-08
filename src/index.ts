import { fetchWeatherData } from './api';
import { updateWeatherUI, showError, showLoading } from './ui';
import { initializeWeatherMap } from './map';
import { debounce, toggleDarkMode, toggleAccessibilityMode, initializeTheme } from './utils';
import { WORLDWIDE_CITIES } from './cities';

// DOM elements
const searchButton = document.getElementById('search-button') as HTMLButtonElement;
const locationInput = document.getElementById('location-input') as HTMLInputElement;
const cityDropdown = document.getElementById('city-dropdown') as HTMLSelectElement;
const currentYearElement = document.getElementById('current-year');
const themeToggleButton = document.getElementById('theme-toggle') as HTMLButtonElement;
const accessibilityToggleButton = document.getElementById('a11y-toggle') as HTMLButtonElement;

// Set current year in footer
if (currentYearElement) {
  currentYearElement.textContent = new Date().getFullYear().toString();
}

// Populate city dropdown with worldwide cities
if (cityDropdown) {
  WORLDWIDE_CITIES.forEach(city => {
    const option = document.createElement('option');
    option.value = city.name;
    option.textContent = city.displayName;
    cityDropdown.appendChild(option);
  });
}

/**
 * Searches for weather data based on the input value or dropdown selection
 */
async function searchWeather(): Promise<void> {
  // Get location from dropdown first, fall back to text input
  let location = '';
  
  if (cityDropdown && cityDropdown.value) {
    location = cityDropdown.value;
  } else if (locationInput) {
    location = locationInput.value.trim();
  }
  
  if (!location) {
    showError({ message: 'Please select a city or enter a location' });
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

// Event listener for city dropdown
if (cityDropdown) {
  cityDropdown.addEventListener('change', () => {
    if (cityDropdown.value) {
      // Clear text input when dropdown is selected
      if (locationInput) {
        locationInput.value = '';
      }
      searchWeather();
    }
  });
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
  
  // Clear dropdown when typing in text input
  locationInput.addEventListener('input', debounce(() => {
    if (locationInput.value && cityDropdown) {
      cityDropdown.value = '';
    }
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
  
  // Load default weather data for London
  if (cityDropdown) {
    cityDropdown.value = 'London';
    searchWeather();
  }
});