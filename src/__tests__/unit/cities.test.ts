import { WORLDWIDE_CITIES, City } from '../../cities';

describe('Cities List', () => {
  test('should have cities defined', () => {
    expect(WORLDWIDE_CITIES).toBeDefined();
    expect(Array.isArray(WORLDWIDE_CITIES)).toBe(true);
    expect(WORLDWIDE_CITIES.length).toBeGreaterThan(0);
  });

  test('each city should have required properties', () => {
    WORLDWIDE_CITIES.forEach((city: City) => {
      expect(city).toHaveProperty('name');
      expect(city).toHaveProperty('country');
      expect(city).toHaveProperty('displayName');
      expect(typeof city.name).toBe('string');
      expect(typeof city.country).toBe('string');
      expect(typeof city.displayName).toBe('string');
      expect(city.name.length).toBeGreaterThan(0);
      expect(city.country.length).toBeGreaterThan(0);
      expect(city.displayName.length).toBeGreaterThan(0);
    });
  });

  test('should include major cities from different continents', () => {
    const cityNames = WORLDWIDE_CITIES.map(city => city.name);
    
    // North America
    expect(cityNames).toContain('New York');
    expect(cityNames).toContain('Toronto');
    
    // South America
    expect(cityNames).toContain('São Paulo');
    expect(cityNames).toContain('Buenos Aires');
    
    // Europe
    expect(cityNames).toContain('London');
    expect(cityNames).toContain('Paris');
    
    // Asia
    expect(cityNames).toContain('Tokyo');
    expect(cityNames).toContain('Singapore');
    
    // Africa
    expect(cityNames).toContain('Cairo');
    expect(cityNames).toContain('Lagos');
    
    // Oceania
    expect(cityNames).toContain('Sydney');
    expect(cityNames).toContain('Auckland');
  });

  test('display names should include country information', () => {
    WORLDWIDE_CITIES.forEach((city: City) => {
      expect(city.displayName).toContain(city.name);
    });
  });

  test('should not have duplicate city names', () => {
    const cityNames = WORLDWIDE_CITIES.map(city => city.name);
    const uniqueCityNames = new Set(cityNames);
    expect(cityNames.length).toBe(uniqueCityNames.size);
  });

  test('should have at least 50 cities for worldwide coverage', () => {
    expect(WORLDWIDE_CITIES.length).toBeGreaterThanOrEqual(50);
  });
});
