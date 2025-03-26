// API Response Types
export interface WeatherResponse {
    current: CurrentWeather;
    forecast: {
      forecastday: ForecastDay[];
    };
    location: Location;
  }
  
  export interface CurrentWeather {
    temp_c: number;
    temp_f: number;
    condition: Condition;
    wind_kph: number;
    wind_dir: string;
    humidity: number;
    feelslike_c: number;
    uv: number;
    last_updated: string;
  }
  
  export interface Condition {
    text: string;
    icon: string;
    code: number;
  }
  
  export interface ForecastDay {
    date: string;
    date_epoch: number;
    day: {
      maxtemp_c: number;
      mintemp_c: number;
      avgtemp_c: number;
      condition: Condition;
      uv: number;
    };
    astro: {
      sunrise: string;
      sunset: string;
    };
  }
  
  export interface Location {
    name: string;
    region: string;
    country: string;
    localtime: string;
  }
  
  // Application Types
  export interface WeatherData {
    location: string;
    region: string;
    country: string;
    temperature: number;
    condition: string;
    conditionIcon: string;
    wind: number;
    windDirection: string;
    humidity: number;
    feelsLike: number;
    uv: number;
    lastUpdated: string;
    forecast: ForecastItem[];
  }
  
  export interface ForecastItem {
    date: string;
    maxTemp: number;
    minTemp: number;
    condition: string;
    conditionIcon: string;
  }
  
  // Error type
  export interface ApiError {
    message: string;
    code?: number;
  }