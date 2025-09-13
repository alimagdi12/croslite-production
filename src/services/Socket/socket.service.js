import { io } from 'socket.io-client';

let socket = null;
let isConnected = false;

export const connectSocket = () => {
  if (isConnected) return;

  // Use the correct port for your environment
  const socketUrl = 'https://api.croslite.com.eg:3002' 
    

  socket = io(socketUrl, {
    transports: ['websocket', 'polling'],
    withCredentials: true
  });

  socket.on('connect', () => {
    isConnected = true;
    console.log('Connected to server');
    
    // Send visitor information
    socket.emit('visitor-joined', {
      page: window.location.pathname,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      screen: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language,
      ip: '' // Will be populated by server
    });
  });

  socket.on('disconnect', () => {
    isConnected = false;
    console.log('Disconnected from server');
  });

  socket.on('connect_error', (error) => {
    console.error('Connection error:', error);
    isConnected = false;
  });

  // Activity tracking - send heartbeat every 30 seconds
  setInterval(() => {
    if (isConnected) {
      socket.emit('visitor-activity', {
        page: window.location.pathname
      });
    }
  }, 30000);

  // Track page changes
  let lastPathname = window.location.pathname;
  const observer = new MutationObserver(() => {
    if (window.location.pathname !== lastPathname && isConnected) {
      lastPathname = window.location.pathname;
      socket.emit('visitor-activity', {
        page: window.location.pathname
      });
    }
  });

  observer.observe(document, { subtree: true, childList: true });
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    isConnected = false;
  }
};

export const getSocketStatus = () => {
  return isConnected;
};