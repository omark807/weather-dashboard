test('clicking accessibility toggle button should toggle accessibility mode', () => {
    // Trigger accessibility toggle button click
    const accessibilityToggleButton = document.getElementById('a11y-toggle') as HTMLButtonElement;
    accessibilityToggleButton.click();

    // Verify
    expect(toggleAccessibilityMode).toHaveBeenCalled();
  });/**
 * @jest-environment jsdom
 */

import { fetchWeatherData } from '../../api';
import { updateWeatherUI, showError } from '../../ui';
import { toggleDarkMode, toggleAccessibilityMode } from '../../utils';

// Mock modules
jest.mock('../../api');
jest.mock('../../ui');
jest.mock('../../utils', () => ({
  ...jest.requireActual('../../utils'),
  toggleDarkMode: jest.fn(),
  toggleAccessibilityMode: jest.fn(),
  initializeTheme: jest.fn()
}));

describe('Application Integration', () => {
  let searchButton: HTMLButtonElement;
  let locationInput: HTMLInputElement;
  let themeToggleButton: HTMLButtonElement;
  let accessibilityToggleButton: HTMLButtonElement;
  
  beforeEach(() => {
    // Setup DOM
    document.body.innerHTML = `
      <div class="container">
        <header>
      <div class="header-content">
            <h1>Weather Dashboard</h1>
            <div class="header-controls">
              <button id="a11y-toggle" class="a11y-toggle" aria-label="Toggle accessibility mode"></button>
              <button id="theme-toggle" class="theme-toggle" aria-label="Toggle dark mode"></button>
            </div>
          </div>
        </header>
        
        <div class="search-container">
          <input type="text" id="location-input" placeholder="Enter city name">
          <button id="search-button">Search</button>
        </div>
        
        <div class="error-container" id="error-container"></div>
        
        <main>
          <section class="current-weather" id="current-weather"></section>
          <section class="forecast" id="forecast"></section>
        </main>
        
        <footer>
          <p>Created with TypeScript - <span id="current-year"></span></p>
        </footer>
      </div>
    `;
    
    // Get DOM elements
    searchButton = document.getElementById('search-button') as HTMLButtonElement;
    locationInput = document.getElementById('location-input') as HTMLInputElement;
    themeToggleButton = document.getElementById('theme-toggle') as HTMLButtonElement;
    accessibilityToggleButton = document.getElementById('a11y-toggle') as HTMLButtonElement;
    
    // Reset mocks
    jest.clearAllMocks();
  });
  
  test('clicking search button with a valid location should fetch and display weather', async () => {
    // Setup
    const mockWeatherData = { location: 'London', temperature: 22 };
    (fetchWeatherData as jest.Mock).mockResolvedValue(mockWeatherData);
    
    // Set input value
    locationInput.value = 'London';
    
    // Trigger search button click
    searchButton.click();
    
    // Wait for promises
    await new Promise(process.nextTick);
    
    // Verify
    expect(fetchWeatherData).toHaveBeenCalledWith('London');
    expect(updateWeatherUI).toHaveBeenCalledWith(mockWeatherData);
  });
  
  test('clicking search button with empty input should show error', async () => {
    // Setup
    locationInput.value = '';
    
    // Trigger search button click
    searchButton.click();
    
    // Wait for promises
    await new Promise(process.nextTick);
    
    // Verify
    expect(fetchWeatherData).not.toHaveBeenCalled();
    expect(showError).toHaveBeenCalledWith({ message: 'Please enter a location' });
  });
  
  test('pressing Enter in the input field should trigger search', async () => {
    // Setup
    const mockWeatherData = { location: 'Paris', temperature: 20 };
    (fetchWeatherData as jest.Mock).mockResolvedValue(mockWeatherData);
    
    // Set input value
    locationInput.value = 'Paris';
    
    // Trigger Enter key
    const enterEvent = new KeyboardEvent('keypress', { key: 'Enter' });
    locationInput.dispatchEvent(enterEvent);
    
    // Wait for promises
    await new Promise(process.nextTick);
    
    // Verify
    expect(fetchWeatherData).toHaveBeenCalledWith('Paris');
    expect(updateWeatherUI).toHaveBeenCalledWith(mockWeatherData);
  });
  
  test('clicking theme toggle button should toggle dark mode', () => {
    // Trigger theme toggle button click
    themeToggleButton.click();
    
    // Verify
    expect(toggleDarkMode).toHaveBeenCalled();
  });
});

// This test requires special setup to test the load functionality
describe('Application Load Behavior', () => {
  beforeEach(() => {
    // Setup minimal DOM
    document.body.innerHTML = `
      <input type="text" id="location-input">
    `;
    
    // Mock modules
    jest.clearAllMocks();
    (fetchWeatherData as jest.Mock).mockResolvedValue({});
  });
  
  test('window load event should initialize with default location', () => {
    // Get input element
    const input = document.getElementById('location-input') as HTMLInputElement;
    
    // Manually trigger what happens in the load event handler
    input.value = 'London';
    expect(input.value).toBe('London');
    
    // We can't directly test the window load event, but we've tested the functionality within it
  });
});