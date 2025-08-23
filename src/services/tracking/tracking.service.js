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

  // Validate IP address format
  isValidIP(ip) {
    if (!ip || typeof ip !== 'string') return false;
    
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    const ipv6ShortRegex = /^::([0-9a-fA-F]{1,4}:){0,5}[0-9a-fA-F]{1,4}$/;
    
    return ipv4Regex.test(ip) || ipv6Regex.test(ip) || ipv6ShortRegex.test(ip);
  }

  // ========== IP DETECTION METHODS ========== //

  // Method 1: WebRTC (Most reliable - works without external APIs)
  getIPFromWebRTC() {
    return new Promise((resolve) => {
      try {
        const RTCPeerConnection = window.RTCPeerConnection || 
                                  window.mozRTCPeerConnection || 
                                  window.webkitRTCPeerConnection;
        
        if (!RTCPeerConnection) {
          resolve(null);
          return;
        }

        const pc = new RTCPeerConnection({ iceServers: [] });
        pc.createDataChannel('');
        
        pc.createOffer()
          .then(offer => pc.setLocalDescription(offer))
          .catch(error => {
            console.log('WebRTC createOffer failed:', error);
            resolve(null);
          });

        pc.onicecandidate = (ice) => {
          if (!ice || !ice.candidate || !ice.candidate.candidate) return;
          
          const candidate = ice.candidate.candidate;
          console.log('WebRTC candidate:', candidate);
          
          // Match IPv4 and IPv6 addresses
          const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/;
          const match = candidate.match(ipRegex);
          
          if (match && this.isValidIP(match[1])) {
            pc.onicecandidate = () => {};
            pc.close();
            resolve(match[1]);
          }
        };

        // Timeout after 3 seconds
        setTimeout(() => {
          pc.onicecandidate = () => {};
          pc.close();
          resolve(null);
        }, 3000);

      } catch (error) {
        console.log('WebRTC method failed:', error);
        resolve(null);
      }
    });
  }

  // Method 2: Multiple external API services with fallbacks
  async getIPFromExternalServices() {
    const services = [
      // JSON services
      { url: 'https://api.ipify.org?format=json', getIP: (data) => data.ip },
      { url: 'https://api64.ipify.org?format=json', getIP: (data) => data.ip },
      { url: 'https://ipinfo.io/json', getIP: (data) => data.ip },
      { url: 'https://api.myip.com', getIP: (data) => data.ip },
      { url: 'https://ipapi.co/json/', getIP: (data) => data.ip },
      { url: 'https://jsonip.com', getIP: (data) => data.ip },
      { url: 'https://api.db-ip.com/v2/free/self', getIP: (data) => data.ipAddress },
      
      // Plain text services
      { url: 'https://icanhazip.com/', getIP: (data) => data.trim(), text: true },
      { url: 'https://checkip.amazonaws.com/', getIP: (data) => data.trim(), text: true },
      { url: 'https://ident.me/', getIP: (data) => data.trim(), text: true },
      { url: 'https://myip.wtf/text', getIP: (data) => data.trim(), text: true },
      { url: 'https://ipecho.net/plain', getIP: (data) => data.trim(), text: true },
      
      // Other services
      { url: 'https://httpbin.org/ip', getIP: (data) => data.origin },
      { url: 'https://worldtimeapi.org/api/ip', getIP: (data) => data.client_ip }
    ];

    for (const service of services) {
      try {
        console.log(`🟡 Trying service: ${service.url}`);
        
        let response;
        if (service.text) {
          // Plain text response
          response = await axios.get(service.url, { 
            timeout: 3000,
            transformResponse: [data => data]
          });
        } else {
          // JSON response
          response = await axios.get(service.url, { timeout: 3000 });
        }
        
        const ip = service.getIP(response.data);
        if (ip && this.isValidIP(ip)) {
          console.log(`🟢 Got IP from ${service.url}: ${ip}`);
          return ip;
        }
      } catch (error) {
        console.log(`🔴 Failed with ${service.url}:`, error.message);
        continue;
      }
    }
    
    return null;
  }

  // Method 3: DNS resolution through iframe (creative approach)
  getIPFromDNS() {
    return new Promise((resolve) => {
      try {
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = 'https://www.google.com'; // Any reliable site
        
        iframe.onload = () => {
          try {
            // This might give us some network info
            const performanceEntries = performance.getEntriesByType('resource');
            for (const entry of performanceEntries) {
              if (entry.name.includes('google')) {
                console.log('DNS performance entry:', entry);
                // Extract IP from initiatorType or other properties
              }
            }
          } catch (e) {
            console.log('DNS method error:', e);
          }
          document.body.removeChild(iframe);
          resolve(null);
        };
        
        document.body.appendChild(iframe);
        
        // Timeout
        setTimeout(() => {
          if (document.body.contains(iframe)) {
            document.body.removeChild(iframe);
          }
          resolve(null);
        }, 2000);
        
      } catch (error) {
        console.log('DNS method failed:', error);
        resolve(null);
      }
    });
  }

  // Method 4: Browser performance API (limited but sometimes works)
  getIPFromPerformanceAPI() {
    try {
      const performanceEntries = performance.getEntriesByType('resource');
      for (const entry of performanceEntries) {
        if (entry.name && entry.name.includes('http')) {
          // Try to extract IP from the entry
          console.log('Performance entry:', entry);
        }
      }
      return null;
    } catch (error) {
      console.log('Performance API method failed:', error);
      return null;
    }
  }

  // Method 5: Error-based detection (when external requests fail)
  async getIPFromError() {
    try {
      // Make a request that will likely fail but might reveal IP in error
      await axios.get('https://invalid-domain-that-does-not-exist-12345.com', {
        timeout: 1000
      });
      return null;
    } catch (error) {
      // Sometimes the error message contains the IP
      const errorString = error.toString();
      const ipMatch = errorString.match(/(\d+\.\d+\.\d+\.\d+)/);
      if (ipMatch && this.isValidIP(ipMatch[1])) {
        return ipMatch[1];
      }
      return null;
    }
  }

  // Method 6: Your own backend endpoint (most reliable fallback)
  async getIPFromBackend() {
    try {
      const response = await axios.get('https://api.croslite.com.eg:3001/api/client-ip', { 
        timeout: 5000,
        withCredentials: true 
      });
      
      if (response.data && response.data.ip && this.isValidIP(response.data.ip)) {
        console.log('🟢 Got IP from backend:', response.data.ip);
        return response.data.ip;
      }
      return null;
    } catch (error) {
      console.log('Backend IP method failed:', error.message);
      return null;
    }
  }

  // Main IP detection method that tries all approaches
  async getUserIP() {
    console.log('🟡 Starting IP detection with all available methods...');
    
    const methods = [
      { name: 'WebRTC', method: this.getIPFromWebRTC.bind(this) },
      { name: 'Backend', method: this.getIPFromBackend.bind(this) },
      { name: 'External APIs', method: this.getIPFromExternalServices.bind(this) },
      { name: 'Error-based', method: this.getIPFromError.bind(this) },
      { name: 'Performance API', method: this.getIPFromPerformanceAPI.bind(this) },
      { name: 'DNS', method: this.getIPFromDNS.bind(this) }
    ];

    // Run methods in sequence until we get a valid IP
    for (const { name, method } of methods) {
      try {
        console.log(`🟡 Trying ${name} method...`);
        const ip = await method();
        
        if (ip && this.isValidIP(ip)) {
          console.log(`🟢 Success with ${name} method: ${ip}`);
          return ip;
        }
        
        if (ip) {
          console.log(`🟡 ${name} returned invalid IP: ${ip}`);
        }
      } catch (error) {
        console.log(`🔴 ${name} method failed:`, error.message);
        continue;
      }
    }

    // Ultimate fallback: Try to extract from window.location or use default
    try {
      // If we have a hostname that's not localhost, use it (though this is not the public IP)
      if (window.location.hostname && !['localhost', '127.0.0.1', ''].includes(window.location.hostname)) {
        console.log('⚠️ Using hostname as fallback:', window.location.hostname);
        return window.location.hostname;
      }
    } catch (error) {
      console.log(error,'Hostname fallback failed');
    }

    console.log('🔴 All IP detection methods failed');
    return null;
  }

  // ========== TRACKING METHODS ========== //

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
    
    document.cookie = 'hasVisited=true; max-age=86400; path=/; secure; samesite=lax';
    this.hasTracked = true;
    console.log('🟢 Tracking cookie set');
  }

  // Check if we should track
  shouldTrack() {
    if (typeof window === 'undefined') {
      console.log('🟡 Not in browser, skipping tracking');
      return false;
    }

    if (this.hasBeenTracked()) {
      return false;
    }

    // Allow tracking in development for testing
    const isLocalhost = window.location.hostname === 'localhost' || 
                        window.location.hostname === '127.0.0.1' ||
                        window.location.hostname === '';
    
    if (isLocalhost) {
      console.log('🟡 Development environment, but tracking allowed for testing');
      // return false; // Uncomment to disable tracking in development
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
      } else {
        console.log('⚠️ No IP detected, skipping tracking');
      }
    } catch (error) {
      console.error('🔴 Tracking failed:', error.message);
    }
  }

  // Delayed tracking
  trackWithDelay(delay = 1000) {
    this.init();
    
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

  // Reset tracking
  resetTracking() {
    if (typeof document !== 'undefined') {
      document.cookie = 'hasVisited=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
    this.hasTracked = false;
    console.log('🟡 Tracking reset');
  }

  // Get current tracking status
  getStatus() {
    return {
      hasTracked: this.hasTracked,
      hasCookie: this.hasBeenTracked(),
      isInitialized: this.isInitialized
    };
  }
}

// Create singleton instance
const trackingService = new TrackingService();

// Auto-initialize when imported in browser
if (typeof window !== 'undefined') {
  trackingService.init();
}

export default trackingService;