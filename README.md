# Weather Dashboard

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
- Three-day weather forecast
- Responsive design for all device sizes
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

3. Get an API key from [WeatherAPI.com](https://www.weatherapi.com/) (free tier available)

4. Update the API key in `src/api.ts`
   ```typescript
   const API_KEY = 'YOUR_API_KEY';
   ```

5. Start the development server
   ```bash
   npm start
   ```

6. Build for production
   ```bash
   npm run build
   ```

## Future Improvements

- Add unit tests
- Implement geolocation to get the user's current location
- Add options to switch between Celsius and Fahrenheit
- Add more detailed forecast information
- Implement location auto-suggestions
- Add weather maps
- Add weather alerts
