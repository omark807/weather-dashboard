# Weather Dashboard

A TypeScript weather dashboard application that displays current weather information and forecasts for any location using the WeatherAPI.com service.

## Accessibility Features

This project includes several accessibility enhancements:

- **Accessibility Mode Toggle**: One-click toggle for enhanced readability
- **Increased Font Sizes**: Larger text for better readability
- **Enhanced Contrast**: Higher contrast ratios for text and UI elements
- **Keyboard Navigation**: Full keyboard support with visible focus indicators
- **Screen Reader Support**: Proper ARIA attributes and screen reader announcements
- **Semantic HTML**: Proper use of HTML5 semantic elements and ARIA roles
- **Preference Persistence**: User accessibility choices are remembered
- **System Preference Detection**: Respects user's system dark mode preferences

The accessibility toggle provides users with:

- Increased font sizes
- Enhanced color contrast
- Improved focus indicators
- Simplified layouts
- Screen reader announcements for important updates# Weather Dashboard

## Features

- Search for weather by city name
- Display current weather conditions including:
  - Temperature
  - Weather condition with icon
  - Wind speed and direction
  - Humidity
  - UV index
  - "Feels like" temperature
- Interactive weather map with multiple layers:
  - Precipitation radar
  - Satellite cloud coverage
  - Temperature map
- Three-day weather forecast
- Responsive design for all device sizes
- Dark mode toggle with user preference persistence
- Accessibility mode with enhanced readability and screen reader support
- Error handling for API requests
- TypeScript for type safety and better developer experience

## Technologies Used

- TypeScript
- Webpack for bundling
- Axios for API requests
- CSS for styling
- WeatherAPI.com for weather data

## Project Structure

The project follows a modular design pattern:

- `src/index.ts`: Main application entry point
- `src/api.ts`: Handles API communication
- `src/types.ts`: TypeScript interfaces and types
- `src/ui.ts`: UI update functions
- `src/utils.ts`: Utility functions for data formatting and manipulation

## Setup and Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/weather-dashboard.git
   cd weather-dashboard
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up API keys
   - Get a free API key from [WeatherAPI.com](https://www.weatherapi.com/)
   - Get a free API key from [OpenWeatherMap](https://openweathermap.org/) for the map features
   - Create a `.env` file based on the `.env.example` template
   ```bash
   cp .env.example .env
   ```
   - Add your API keys to the `.env` file:
   ```
   WEATHER_API_KEY=your_weatherapi_key
   OPENWEATHERMAP_API_KEY=your_openweathermap_key
   ```

4. Start the development server
   ```bash
   npm start
   ```

5. Build for production
   ```bash
   npm run build
   ```

## Testing

The project includes a comprehensive test suite using Jest:

- **Unit Tests**: Test individual functions and modules in isolation
- **Integration Tests**: Test how different modules work together
- **Mock Implementation**: Uses Jest's mocking capabilities to test API calls without making actual network requests

To run the tests:
```bash
npm test
```

To run tests in watch mode during development:
```bash
npm run test:watch
```

## Future Improvements

- Implement geolocation to get the user's current location
- Add options to switch between Celsius and Fahrenheit
- Integrate real-time weather alerts
- Add interactive zoom and pan controls to the weather map
- Add historical weather data and trends
- Implement advanced search with autocomplete
- Add weather data charts and graphs

## License

MIT

## Author

Your Name## Accessibility Features

This project includes several accessibility enhancements:

- **Accessibility Mode Toggle**: One-click toggle for enhanced readability
- **Increased Font Sizes**: Larger text for better readability
- **Enhanced Contrast**: Higher contrast ratios for text and UI elements
- **Keyboard Navigation**: Full keyboard support with visible focus indicators
- **Screen Reader Support**: Proper ARIA attributes and screen reader announcements
- **Semantic HTML**: Proper use of HTML5 semantic elements and ARIA roles
- **Preference Persistence**: User accessibility choices are remembered
- **System Preference Detection**: Respects user's system dark mode preferences

The accessibility toggle provides users with:

- Increased font sizes
- Enhanced color contrast
- Improved focus indicators
- Simplified layouts
- Screen reader announcements for important updates# Weather Dashboard

A TypeScript weather dashboard application that displays current weather information and forecasts for any location using the WeatherAPI.com service.

## Features

- Search for weather by city name
- Display current weather conditions including:
  - Temperature
  - Weather condition with icon
  - Wind speed and direction
  - Humidity
  - UV index
  - "Feels like" temperature
- Interactive weather map with multiple layers:
  - Precipitation radar
  - Satellite cloud coverage
  - Temperature map
- Three-day weather forecast
- Responsive design for all device sizes
- Dark mode toggle with user preference persistence
- Accessibility mode with enhanced readability and screen reader support
- Error handling for API requests
- TypeScript for type safety and better developer experience

## Technologies Used

- TypeScript
- Webpack for bundling
- Axios for API requests
- CSS for styling
- WeatherAPI.com for weather data

## Project Structure

The project follows a modular design pattern:

- `src/index.ts`: Main application entry point
- `src/api.ts`: Handles API communication
- `src/types.ts`: TypeScript interfaces and types
- `src/ui.ts`: UI update functions
- `src/utils.ts`: Utility functions for data formatting and manipulation

## Setup and Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/weather-dashboard.git
   cd weather-dashboard
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up API keys
   - Get a free API key from [WeatherAPI.com](https://www.weatherapi.com/)
   - Get a free API key from [OpenWeatherMap](https://openweathermap.org/) for the map features
   - Create a `.env` file based on the `.env.example` template
   ```bash
   cp .env.example .env
   ```
   - Add your API keys to the `.env` file:
   ```
   WEATHER_API_KEY=your_weatherapi_key
   OPENWEATHERMAP_API_KEY=your_openweathermap_key
   ```

4. Start the development server
   ```bash
   npm start
   ```

5. Build for production
   ```bash
   npm run build
   ```

## Testing

The project includes a comprehensive test suite using Jest:

- **Unit Tests**: Test individual functions and modules in isolation
- **Integration Tests**: Test how different modules work together
- **Mock Implementation**: Uses Jest's mocking capabilities to test API calls without making actual network requests

To run the tests:
```bash
npm test
```

To run tests in watch mode during development:
```bash
npm run test:watch
```

## Future Improvements

- Implement geolocation to get the user's current location
- Add options to switch between Celsius and Fahrenheit
- Integrate real-time weather alerts
- Add interactive zoom and pan controls to the weather map
- Add historical weather data and trends
- Implement advanced search with autocomplete
- Add weather data charts and graphs
