import axios from 'axios';

class TrackingService {
  constructor() {
    this.hasTracked = false;
    this.trackingTimeout = null;
    this.isInitialized = false;
  }

  // Initialize the service
  init() {
    if (this.isInitialized) return;
    this.isInitialized = true;
    
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      console.log('Not in browser environment, skipping tracking');
      return;
    }
    
    console.log('Tracking service initialized');
  }

  // Get user's real IP
  async getUserIP() {
    try {
      console.log('🟡 Getting user IP...');
      const response = await axios.get('https://api.ipify.org?format=json', {
        timeout: 5000
      });
      console.log('🟢 User IP:', response.data.ip);
      return response.data.ip;
    } catch (error) {
      console.error('🔴 Error getting IP:', error.message);
      return null;
    }
  }

  // Send IP to backend for tracking
  async trackVisit(ip) {
    try {
      console.log('🟡 Sending IP to backend:', ip);
      const response = await axios.post('https://api.croslite.com.eg:3001/api/track-visit', { 
        ip: ip 
      }, {
        withCredentials: true,
        timeout: 10000
      });
      
      console.log('🟢 Visit tracked successfully:', response.data);
      return true;
    } catch (error) {
      console.error('🔴 Error tracking visit:', error.message);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      }
      return false;
    }
  }

  // Check if user has been tracked recently
  hasBeenTracked() {
    if (typeof document === 'undefined') return false;
    
    const hasCookie = document.cookie.includes('hasVisited=true');
    if (hasCookie) {
      console.log('🟡 User already tracked (cookie found), skipping');
    }
    return hasCookie || this.hasTracked;
  }

  // Set tracking cookie
  setTrackingCookie() {
    if (typeof document === 'undefined') return;
    
    document.cookie = 'hasVisited=true; max-age=86400; path=/;';
    this.hasTracked = true;
    console.log('🟢 Tracking cookie set');
  }

  // Check if we should track (not localhost, not already tracked)
  shouldTrack() {
    // Skip if not in browser
    if (typeof window === 'undefined') {
      console.log('🟡 Not in browser, skipping tracking');
      return false;
    }

    // Skip if already tracked
    if (this.hasBeenTracked()) {
      return false;
    }

    // Skip if localhost (development)
    const isLocalhost = window.location.hostname === 'localhost' || 
                        window.location.hostname === '127.0.0.1' ||
                        window.location.hostname === '';
    
    if (isLocalhost) {
      console.log('🟡 Development environment, skipping tracking');
      return false;
    }

    return true;
  }

  // Main tracking function
  async trackUserVisit() {
    this.init();
    
    if (!this.shouldTrack()) {
      return;
    }

    try {
      const userIP = await this.getUserIP();
      if (userIP) {
        const success = await this.trackVisit(userIP);
        if (success) {
          this.setTrackingCookie();
        }
      }
    } catch (error) {
      console.error('🔴 Tracking failed:', error.message);
    }
  }

  // Delayed tracking (waits for page to load)
  trackWithDelay(delay = 1000) {
    this.init();
    
    // Clear any existing timeout
    if (this.trackingTimeout) {
      clearTimeout(this.trackingTimeout);
    }

    console.log(`🟡 Scheduling tracking with ${delay}ms delay`);
    
    this.trackingTimeout = setTimeout(() => {
      this.trackUserVisit();
    }, delay);
  }

  // Immediate tracking
  trackImmediately() {
    this.init();
    this.trackUserVisit();
  }

  // Reset tracking (for testing)
  resetTracking() {
    if (typeof document !== 'undefined') {
      document.cookie = 'hasVisited=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
    this.hasTracked = false;
    console.log('🟡 Tracking reset');
  }
}

// Create singleton instance
const trackingService = new TrackingService();

// Auto-initialize when imported in browser
if (typeof window !== 'undefined') {
  trackingService.init();
}

export default trackingService;