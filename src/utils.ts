/**
 * Formats a date string from YYYY-MM-DD to a more readable format
 * @param dateString - Date in YYYY-MM-DD format
 * @returns Formatted date string (e.g., "Monday, Jan 1")
 */
export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });
  }
  
  /**
   * Debounces a function call
   * @param func - Function to debounce
   * @param delay - Delay in milliseconds
   * @returns Debounced function
   */
  export function debounce<T extends (...args: any[]) => void>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout>;
    
    return function(...args: Parameters<T>) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }
  
  /**
   * Gets a temperature color based on the value
   * @param temp - Temperature in Celsius
   * @returns CSS color string
   */
  export function getTemperatureColor(temp: number): string {
    if (temp <= 0) return '#00ffff'; // Cyan for freezing
    if (temp <= 10) return '#007bff'; // Blue for cold
    if (temp <= 20) return '#28a745'; // Green for mild
    if (temp <= 30) return '#ffc107'; // Yellow for warm
    return '#dc3545'; // Red for hot
  }
  
  /**
   * Gets a UV index description based on the value
   * @param uv - UV index value
   * @returns Description and color as an object
   */
  export function getUVDescription(uv: number): { text: string; color: string } {
    if (uv <= 2) return { text: 'Low', color: '#28a745' };
    if (uv <= 5) return { text: 'Moderate', color: '#ffc107' };
    if (uv <= 7) return { text: 'High', color: '#fd7e14' };
    if (uv <= 10) return { text: 'Very High', color: '#dc3545' };
    return { text: 'Extreme', color: '#6f42c1' };
  }