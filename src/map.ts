import { WeatherData } from './types';
import { announceForScreenReader } from './utils';

// Map types
type MapType = 'radar' | 'satellite' | 'temperature';

// Map API configuration
// We'll use OpenWeatherMap for the map tiles - free tier with limited usage
const MAP_API_KEY = 'fd6aadc66f0287155615a9e570d71885'
; // Replace with your OpenWeatherMap API key
const MAP_BASE_URL = 'https://tile.openweathermap.org/map';
const MAP_ZOOM = 10;
const MAP_SIZE = 9; // Size of the map (number of tiles in each direction)

/**
 * Initializes the weather map for a given location
 * @param data - Weather data including location information
 */
export function initializeWeatherMap(data: WeatherData): void {
  // Get map container
  const mapContainer = document.getElementById('weather-map');
  if (!mapContainer) return;
  
  // Set initial map type
  updateWeatherMap('radar', data);
  
  // Setup map type buttons
  setupMapButtons(data);
}

/**
 * Updates the weather map with the selected map type
 * @param mapType - Type of map to display (radar, satellite, temperature)
 * @param data - Weather data including location information
 */
export function updateWeatherMap(mapType: MapType, data: WeatherData): void {
  const mapContainer = document.getElementById('weather-map');
  if (!mapContainer) return;
  
  // Determine the map layer based on the type
  let mapLayer: string;
  let mapDescription: string;
  
  switch (mapType) {
    case 'satellite':
      mapLayer = 'clouds_new';
      mapDescription = 'Satellite cloud coverage map';
      break;
    case 'temperature':
      mapLayer = 'temp_new';
      mapDescription = 'Temperature map';
      break;
    case 'radar':
    default:
      mapLayer = 'precipitation_new';
      mapDescription = 'Precipitation radar map';
      break;
  }
  
  // Build the map URL
  // For demonstration purposes, we'll use the location coordinates
  // In a real app, you'd need to convert the city name to coordinates using a geocoding API
  // Let's simulate coordinates based on the location name for now
  const simulatedCoordinates = simulateCoordinates(data.location);
  
  // Create the map image URL
  const mapUrl = `${MAP_BASE_URL}/${mapLayer}/${MAP_ZOOM}/${simulatedCoordinates.x}/${simulatedCoordinates.y}.png?appid=${MAP_API_KEY}`;
  
  // Fallback for development/demo without an API key
  const fallbackMapUrl = `/api/placeholder/800/600`;
  
  // Update the map container with the map image
  mapContainer.innerHTML = `
    <img 
      src="${MAP_API_KEY !== 'fd6aadc66f0287155615a9e570d71885' ? mapUrl : fallbackMapUrl}" 
      alt="${mapDescription} for ${data.location}"
      aria-label="${mapDescription} for ${data.location}"
      class="weather-map-image"
    >
    <div class="map-overlay">
      <p class="map-location">${data.location}</p>
    </div>
  `;
  
  // Update active button
  updateActiveMapButton(mapType);
  
  // Announce map change to screen readers
  announceForScreenReader(`Displaying ${mapDescription} for ${data.location}`);
}

/**
 * Sets up map type buttons
 * @param data - Weather data including location information
 */
function setupMapButtons(data: WeatherData): void {
  const radarButton = document.getElementById('radar-button');
  const satelliteButton = document.getElementById('satellite-button');
  const temperatureButton = document.getElementById('temperature-button');
  
  if (radarButton) {
    radarButton.addEventListener('click', () => {
      updateWeatherMap('radar', data);
    });
  }
  
  if (satelliteButton) {
    satelliteButton.addEventListener('click', () => {
      updateWeatherMap('satellite', data);
    });
  }
  
  if (temperatureButton) {
    temperatureButton.addEventListener('click', () => {
      updateWeatherMap('temperature', data);
    });
  }
}

/**
 * Updates the active map button based on the current map type
 * @param mapType - Current map type
 */
function updateActiveMapButton(mapType: MapType): void {
  const radarButton = document.getElementById('radar-button');
  const satelliteButton = document.getElementById('satellite-button');
  const temperatureButton = document.getElementById('temperature-button');
  
  // Remove active class from all buttons
  radarButton?.classList.remove('active');
  satelliteButton?.classList.remove('active');
  temperatureButton?.classList.remove('active');
  
  // Add active class to the selected button
  switch (mapType) {
    case 'satellite':
      satelliteButton?.classList.add('active');
      break;
    case 'temperature':
      temperatureButton?.classList.add('active');
      break;
    case 'radar':
    default:
      radarButton?.classList.add('active');
      break;
  }
}

/**
 * Simulates coordinates based on location name
 * In a real app, you would use a geocoding API to get actual coordinates
 * @param location - Location name
 * @returns Simulated x and y coordinates for the map
 */
function simulateCoordinates(location: string): { x: number; y: number } {
  // This is a simple hash function to generate consistent but random-looking coordinates
  // In a real app, use a geocoding service to get actual coordinates
  const hash = Array.from(location).reduce(
    (hash, char) => ((hash << 5) - hash) + char.charCodeAt(0), 0
  );
  
  return {
    x: Math.abs(hash % 20) + 10, // Ensure positive values within a reasonable range
    y: Math.abs((hash >> 8) % 20) + 10
  };
}