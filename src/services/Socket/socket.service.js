import { io } from 'socket.io-client';

let socket = null;
let isConnected = false;

export const connectSocket = () => {
  if (isConnected) return;

  socket = io('https://api.croslite.com.eg:3001', {
    transports: ['websocket', 'polling']
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
      language: navigator.language
    });
  });

  socket.on('disconnect', () => {
    isConnected = false;
    console.log('Disconnected from server');
  });

  // Activity tracking - send heartbeat every 30 seconds
  setInterval(() => {
    if (isConnected) {
      socket.emit('visitor-activity');
    }
  }, 30000);

  // Track page changes
  let lastPathname = window.location.pathname;
  setInterval(() => {
    if (window.location.pathname !== lastPathname && isConnected) {
      lastPathname = window.location.pathname;
      socket.emit('visitor-activity', {
        page: window.location.pathname
      });
    }
  }, 1000);
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