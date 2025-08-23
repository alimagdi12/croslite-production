import axios from 'axios';

class TrackingService {
  constructor() {
    this.hasTracked = false;
    this.trackingTimeout = null;
    this.isInitialized = false;
    this.ipServices = [
      'https://api.ipify.org?format=json',
      'https://ipinfo.io/json',
      'https://api.myip.com',
      'https://ipapi.co/json/',
      'https://worldtimeapi.org/api/ip',
      'https://httpbin.org/ip'
    ];
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


  // Try multiple IP services with fallbacks
  async getUserIP() {
    console.log('🟡 Trying to get user IP from multiple services...');
    
    // Try each service sequentially
    for (const service of this.ipServices) {
      try {
        console.log(`🟡 Trying service: ${service}`);
        const response = await axios.get(service, { timeout: 3000 });
        
        let ip;
        if (service.includes('ipify')) {
          ip = response.data.ip;
        } else if (service.includes('ipinfo')) {
          ip = response.data.ip;
        } else if (service.includes('myip')) {
          ip = response.data.ip;
        } else if (service.includes('ipapi')) {
          ip = response.data.ip;
        } else if (service.includes('worldtime')) {
          ip = response.data.client_ip;
        } else if (service.includes('httpbin')) {
          ip = response.data.origin;
        }
        
        if (ip && this.isValidIP(ip)) {
          console.log(`🟢 Got IP from ${service}: ${ip}`);
          return ip;
        }
      } catch (error) {
        console.log(`🔴 Failed with ${service}:`, error.message);
        continue;
      }
    }
    
    console.log('🔴 All IP services failed');
    return null;
  }

  // Validate IP address format
  isValidIP(ip) {
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    return ipRegex.test(ip) || ipv6Regex.test(ip);
  }

  // ... rest of the methods remain the same as previous version
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