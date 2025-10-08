/**
 * List of major cities worldwide for the dropdown selector
 */
export interface City {
  name: string;
  country: string;
  displayName: string;
}

export const WORLDWIDE_CITIES: City[] = [
  // North America
  { name: 'New York', country: 'USA', displayName: 'New York, USA' },
  { name: 'Los Angeles', country: 'USA', displayName: 'Los Angeles, USA' },
  { name: 'Chicago', country: 'USA', displayName: 'Chicago, USA' },
  { name: 'Toronto', country: 'Canada', displayName: 'Toronto, Canada' },
  { name: 'Vancouver', country: 'Canada', displayName: 'Vancouver, Canada' },
  { name: 'Mexico City', country: 'Mexico', displayName: 'Mexico City, Mexico' },
  
  // South America
  { name: 'São Paulo', country: 'Brazil', displayName: 'São Paulo, Brazil' },
  { name: 'Rio de Janeiro', country: 'Brazil', displayName: 'Rio de Janeiro, Brazil' },
  { name: 'Buenos Aires', country: 'Argentina', displayName: 'Buenos Aires, Argentina' },
  { name: 'Lima', country: 'Peru', displayName: 'Lima, Peru' },
  { name: 'Bogotá', country: 'Colombia', displayName: 'Bogotá, Colombia' },
  
  // Europe
  { name: 'London', country: 'UK', displayName: 'London, UK' },
  { name: 'Paris', country: 'France', displayName: 'Paris, France' },
  { name: 'Berlin', country: 'Germany', displayName: 'Berlin, Germany' },
  { name: 'Madrid', country: 'Spain', displayName: 'Madrid, Spain' },
  { name: 'Rome', country: 'Italy', displayName: 'Rome, Italy' },
  { name: 'Amsterdam', country: 'Netherlands', displayName: 'Amsterdam, Netherlands' },
  { name: 'Stockholm', country: 'Sweden', displayName: 'Stockholm, Sweden' },
  { name: 'Copenhagen', country: 'Denmark', displayName: 'Copenhagen, Denmark' },
  { name: 'Moscow', country: 'Russia', displayName: 'Moscow, Russia' },
  { name: 'Istanbul', country: 'Turkey', displayName: 'Istanbul, Turkey' },
  
  // Asia
  { name: 'Tokyo', country: 'Japan', displayName: 'Tokyo, Japan' },
  { name: 'Beijing', country: 'China', displayName: 'Beijing, China' },
  { name: 'Shanghai', country: 'China', displayName: 'Shanghai, China' },
  { name: 'Hong Kong', country: 'Hong Kong', displayName: 'Hong Kong' },
  { name: 'Singapore', country: 'Singapore', displayName: 'Singapore' },
  { name: 'Seoul', country: 'South Korea', displayName: 'Seoul, South Korea' },
  { name: 'Mumbai', country: 'India', displayName: 'Mumbai, India' },
  { name: 'Delhi', country: 'India', displayName: 'Delhi, India' },
  { name: 'Bangalore', country: 'India', displayName: 'Bangalore, India' },
  { name: 'Bangkok', country: 'Thailand', displayName: 'Bangkok, Thailand' },
  { name: 'Dubai', country: 'UAE', displayName: 'Dubai, UAE' },
  { name: 'Kuala Lumpur', country: 'Malaysia', displayName: 'Kuala Lumpur, Malaysia' },
  { name: 'Jakarta', country: 'Indonesia', displayName: 'Jakarta, Indonesia' },
  { name: 'Manila', country: 'Philippines', displayName: 'Manila, Philippines' },
  { name: 'Ho Chi Minh City', country: 'Vietnam', displayName: 'Ho Chi Minh City, Vietnam' },
  { name: 'Taipei', country: 'Taiwan', displayName: 'Taipei, Taiwan' },
  
  // Africa
  { name: 'Cairo', country: 'Egypt', displayName: 'Cairo, Egypt' },
  { name: 'Lagos', country: 'Nigeria', displayName: 'Lagos, Nigeria' },
  { name: 'Johannesburg', country: 'South Africa', displayName: 'Johannesburg, South Africa' },
  { name: 'Nairobi', country: 'Kenya', displayName: 'Nairobi, Kenya' },
  { name: 'Cape Town', country: 'South Africa', displayName: 'Cape Town, South Africa' },
  { name: 'Casablanca', country: 'Morocco', displayName: 'Casablanca, Morocco' },
  { name: 'Accra', country: 'Ghana', displayName: 'Accra, Ghana' },
  
  // Oceania
  { name: 'Sydney', country: 'Australia', displayName: 'Sydney, Australia' },
  { name: 'Melbourne', country: 'Australia', displayName: 'Melbourne, Australia' },
  { name: 'Brisbane', country: 'Australia', displayName: 'Brisbane, Australia' },
  { name: 'Perth', country: 'Australia', displayName: 'Perth, Australia' },
  { name: 'Auckland', country: 'New Zealand', displayName: 'Auckland, New Zealand' },
  { name: 'Wellington', country: 'New Zealand', displayName: 'Wellington, New Zealand' }
];
