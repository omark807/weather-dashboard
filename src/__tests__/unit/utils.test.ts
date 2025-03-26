describe('Utils - toggleAccessibilityMode', () => {
    test('should toggle accessibility mode class on root element', () => {
      // Setup
      document.documentElement.classList.remove('a11y-mode');
      
      // Toggle accessibility mode (to enable)
      toggleAccessibilityMode();
      expect(document.documentElement.classList.contains('a11y-mode')).toBe(true);
      expect(localStorage.setItem).toHaveBeenCalledWith('a11yMode', 'enabled');
      
      // Toggle accessibility mode again (to disable)
      toggleAccessibilityMode();
      expect(document.documentElement.classList.contains('a11y-mode')).toBe(false);
      expect(localStorage.setItem).toHaveBeenCalledWith('a11yMode', 'disabled');
    });
  });
  
  describe('Utils - announceForScreenReader', () => {
    test('should create an announcer element if it does not exist', () => {
      // Setup
      document.body.innerHTML = '';
      
      // Call the function
      announceForScreenReader('Test announcement');
      
      // Verify announcer was created
      const announcer = document.getElementById('sr-announcer');
      expect(announcer).not.toBeNull();
      expect(announcer?.getAttribute('aria-live')).toBe('polite');
      expect(announcer?.className).toBe('sr-only');
      expect(announcer?.textContent).toBe('Test announcement');
    });
    
    test('should use existing announcer if it exists', () => {
      // Setup
      document.body.innerHTML = '<div id="sr-announcer" aria-live="polite" class="sr-only">Previous message</div>';
      
      // Call the function
      announceForScreenReader('New announcement');
      
      // Verify message was updated
      const announcer = document.getElementById('sr-announcer');
      expect(announcer?.textContent).toBe('New announcement');
    });
    
    test('should clear message after timeout', () => {
      // Setup
      jest.useFakeTimers();
      document.body.innerHTML = '';
      
      // Call the function
      announceForScreenReader('Test message');
      
      // Verify initial state
      const announcer = document.getElementById('sr-announcer');
      expect(announcer?.textContent).toBe('Test message');
      
      // Fast-forward time
      jest.advanceTimersByTime(3000);
      
      // Verify cleared state
      expect(announcer?.textContent).toBe('');
      
      jest.useRealTimers();
    });
  });import { formatDate, debounce, getTemperatureColor, getUVDescription, toggleDarkMode, toggleAccessibilityMode, announceForScreenReader, initializeTheme } from '../../utils';
  
  describe('Utils - formatDate', () => {
    test('should format date correctly', () => {
      // Mock Date constructor to return a consistent date for testing
      const mockDate = new Date(2025, 0, 15); // January 15, 2025
      const spy = jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
      
      expect(formatDate('2025-01-15')).toBe('Wednesday, Jan 15');
      
      spy.mockRestore();
    });
  });
  
  describe('Utils - debounce', () => {
    jest.useFakeTimers();
    
    test('should debounce function calls', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 1000);
      
      // Call debounced function multiple times
      debouncedFn();
      debouncedFn();
      debouncedFn();
      
      // Function should not have been called yet
      expect(mockFn).not.toHaveBeenCalled();
      
      // Fast-forward time
      jest.runAllTimers();
      
      // Function should have been called once
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });
  
  describe('Utils - getTemperatureColor', () => {
    test('should return correct color for freezing temperatures', () => {
      expect(getTemperatureColor(-5)).toBe('#00ffff');
      expect(getTemperatureColor(0)).toBe('#00ffff');
    });
    
    test('should return correct color for cold temperatures', () => {
      expect(getTemperatureColor(5)).toBe('#007bff');
      expect(getTemperatureColor(10)).toBe('#007bff');
    });
    
    test('should return correct color for mild temperatures', () => {
      expect(getTemperatureColor(15)).toBe('#28a745');
      expect(getTemperatureColor(20)).toBe('#28a745');
    });
    
    test('should return correct color for warm temperatures', () => {
      expect(getTemperatureColor(25)).toBe('#ffc107');
      expect(getTemperatureColor(30)).toBe('#ffc107');
    });
    
    test('should return correct color for hot temperatures', () => {
      expect(getTemperatureColor(35)).toBe('#dc3545');
    });
  });
  
  describe('Utils - getUVDescription', () => {
    test('should return correct description for UV index', () => {
      expect(getUVDescription(1)).toEqual({ text: 'Low', color: '#28a745' });
      expect(getUVDescription(3)).toEqual({ text: 'Moderate', color: '#ffc107' });
      expect(getUVDescription(6)).toEqual({ text: 'High', color: '#fd7e14' });
      expect(getUVDescription(8)).toEqual({ text: 'Very High', color: '#dc3545' });
      expect(getUVDescription(11)).toEqual({ text: 'Extreme', color: '#6f42c1' });
    });
  });
  
  describe('Utils - toggleDarkMode', () => {
    test('should toggle dark theme class on root element', () => {
      // Setup
      document.documentElement.classList.remove('dark-theme');
      
      // Toggle dark mode (to dark)
      toggleDarkMode();
      expect(document.documentElement.classList.contains('dark-theme')).toBe(true);
      expect(localStorage.setItem).toHaveBeenCalledWith('darkMode', 'enabled');
      
      // Toggle dark mode again (to light)
      toggleDarkMode();
      expect(document.documentElement.classList.contains('dark-theme')).toBe(false);
      expect(localStorage.setItem).toHaveBeenCalledWith('darkMode', 'disabled');
    });
  });
  
  describe('Utils - initializeTheme', () => {
    test('should add dark theme if preference is saved', () => {
      // Setup
      document.documentElement.classList.remove('dark-theme');
      document.documentElement.classList.remove('a11y-mode');
      (localStorage.getItem as jest.Mock).mockImplementation((key) => {
        if (key === 'darkMode') return 'enabled';
        if (key === 'a11yMode') return null;
        return null;
      });
      
      // Initialize theme
      initializeTheme();
      
      // Verify
      expect(document.documentElement.classList.contains('dark-theme')).toBe(true);
      expect(document.documentElement.classList.contains('a11y-mode')).toBe(false);
    });
    
    test('should add a11y mode if preference is saved', () => {
      // Setup
      document.documentElement.classList.remove('dark-theme');
      document.documentElement.classList.remove('a11y-mode');
      (localStorage.getItem as jest.Mock).mockImplementation((key) => {
        if (key === 'darkMode') return null;
        if (key === 'a11yMode') return 'enabled';
        return null;
      });
      
      // Initialize theme
      initializeTheme();
      
      // Verify
      expect(document.documentElement.classList.contains('dark-theme')).toBe(false);
      expect(document.documentElement.classList.contains('a11y-mode')).toBe(true);
    });
    
    test('should add both modes if both preferences are saved', () => {
      // Setup
      document.documentElement.classList.remove('dark-theme');
      document.documentElement.classList.remove('a11y-mode');
      (localStorage.getItem as jest.Mock).mockImplementation((key) => {
        if (key === 'darkMode') return 'enabled';
        if (key === 'a11yMode') return 'enabled';
        return null;
      });
      
      // Initialize theme
      initializeTheme();
      
      // Verify
      expect(document.documentElement.classList.contains('dark-theme')).toBe(true);
      expect(document.documentElement.classList.contains('a11y-mode')).toBe(true);
    });
    
    test('should not add dark theme if disabled is saved', () => {
      // Setup
      document.documentElement.classList.remove('dark-theme');
      (localStorage.getItem as jest.Mock).mockReturnValue('disabled');
      
      // Initialize theme
      initializeTheme();
      
      // Verify
      expect(document.documentElement.classList.contains('dark-theme')).toBe(false);
    });
    
    test('should respect system preference if no preference is saved', () => {
      // Setup
      document.documentElement.classList.remove('dark-theme');
      (localStorage.getItem as jest.Mock).mockReturnValue(null);
      
      // Test with system preference for dark mode
      (window.matchMedia as jest.Mock).mockImplementation(() => ({
        matches: true,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn()
      }));
      
      // Initialize theme
      initializeTheme();
      
      // Verify
      expect(document.documentElement.classList.contains('dark-theme')).toBe(true);
      
      // Reset and test with system preference for light mode
      document.documentElement.classList.remove('dark-theme');
      (window.matchMedia as jest.Mock).mockImplementation(() => ({
        matches: false,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn()
      }));
      
      // Initialize theme again
      initializeTheme();
      
      // Verify
      expect(document.documentElement.classList.contains('dark-theme')).toBe(false);
    });
  });