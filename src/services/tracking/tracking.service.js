import axios from 'axios';

class TrackingService {
  constructor() {
    this.hasTracked = false;
    this.trackingTimeout = null;
  }

  // Get user's real IP
  async getUserIP() {
    try {
      const response = await axios.get('https://api.ipify.org?format=json');
      return response.data.ip;
    } catch (error) {
      console.error('Error getting IP:', error);
      return null;
    }
  }

  // Send IP to backend for tracking
  async trackVisit(ip) {
    try {
      const response = await axios.post('https://api.croslite.com.eg:3001/api/track-visit', { 
        ip: ip 
      }, {
        withCredentials: true,
        timeout: 5000 // 5 second timeout
      });
      
      console.log('Visit tracked successfully:', response.data);
      return true;
    } catch (error) {
      console.error('Error tracking visit:', error);
      return false;
    }
  }

  // Check if user has been tracked recently
  hasBeenTracked() {
    return document.cookie.includes('hasVisited=true') || this.hasTracked;
  }

  // Set tracking cookie
  setTrackingCookie() {
    document.cookie = 'hasVisited=true; max-age=86400; path=/;';
    this.hasTracked = true;
  }

  // Main tracking function
  async trackUserVisit() {
    // Don't track if already tracked
    if (this.hasBeenTracked()) {
      console.log('User already tracked, skipping');
      return;
    }

    // Don't track if in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log('Development environment, skipping tracking');
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
      console.error('Tracking failed:', error);
    }
  }

  // Delayed tracking (waits for page to load)
  trackWithDelay(delay = 2000) {
    // Clear any existing timeout
    if (this.trackingTimeout) {
      clearTimeout(this.trackingTimeout);
    }

    this.trackingTimeout = setTimeout(() => {
      this.trackUserVisit();
    }, delay);
  }

  // Immediate tracking
  trackImmediately() {
    this.trackUserVisit();
  }

  // Reset tracking (for testing)
  resetTracking() {
    document.cookie = 'hasVisited=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    this.hasTracked = false;
  }
}

// Create singleton instance
const trackingService = new TrackingService();

export default trackingService;