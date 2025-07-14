import { io } from 'socket.io-client';

import { APP_CONFIG, WS_EVENTS, STORAGE_KEYS } from '../config/constants';

class WebSocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 1000;
    this.eventListeners = new Map();
    this.connectionPromise = null;
  }

  /**
   * Initialize WebSocket connection
   * @param {string} token - Authentication token
   * @returns {Promise} - Connection promise
   */
  connect(token = null) {
    if (this.socket && this.isConnected) {
      return Promise.resolve(this.socket);
    }

    if (this.connectionPromise) {
      return this.connectionPromise;
    }

    this.connectionPromise = new Promise((resolve, reject) => {
      try {
        // Get token from localStorage if not provided
        const authToken = token || localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);

        this.socket = io(APP_CONFIG.WEBSOCKET_URL, {
          auth: {
            token: authToken,
          },
          transports: ['websocket', 'polling'],
          timeout: 20000,
          reconnection: true,
          reconnectionAttempts: this.maxReconnectAttempts,
          reconnectionDelay: this.reconnectDelay,
          reconnectionDelayMax: 5000,
          maxReconnectionAttempts: this.maxReconnectAttempts,
        });

        this.setupEventListeners(resolve, reject);
      } catch (error) {
        console.error('WebSocket connection error:', error);
        reject(error);
      }
    });

    return this.connectionPromise;
  }

  /**
   * Setup WebSocket event listeners
   * @param {Function} resolve - Promise resolve function
   * @param {Function} reject - Promise reject function
   */
  setupEventListeners(resolve, reject) {
    this.socket.on(WS_EVENTS.CONNECT, () => {
      console.log('WebSocket connected');
      this.isConnected = true;
      this.reconnectAttempts = 0;
      resolve(this.socket);
    });

    this.socket.on(WS_EVENTS.DISCONNECT, (reason) => {
      console.log('WebSocket disconnected:', reason);
      this.isConnected = false;

      if (reason === 'io server disconnect') {
        // Server disconnected, try to reconnect
        this.socket.connect();
      }
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      this.isConnected = false;
      this.reconnectAttempts++;

      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        reject(error);
      }
    });

    this.socket.on('reconnect', (attemptNumber) => {
      console.log('WebSocket reconnected after', attemptNumber, 'attempts');
      this.isConnected = true;
      this.reconnectAttempts = 0;
    });

    this.socket.on('reconnect_error', (error) => {
      console.error('WebSocket reconnection error:', error);
    });

    this.socket.on('reconnect_failed', () => {
      console.error('WebSocket reconnection failed');
      this.isConnected = false;
    });

    // Handle custom events
    this.socket.on(WS_EVENTS.SWAP_REQUEST, (data) => {
      this.emitEvent(WS_EVENTS.SWAP_REQUEST, data);
    });

    this.socket.on(WS_EVENTS.SWAP_UPDATE, (data) => {
      this.emitEvent(WS_EVENTS.SWAP_UPDATE, data);
    });

    this.socket.on(WS_EVENTS.MESSAGE, (data) => {
      this.emitEvent(WS_EVENTS.MESSAGE, data);
    });

    this.socket.on(WS_EVENTS.NOTIFICATION, (data) => {
      this.emitEvent(WS_EVENTS.NOTIFICATION, data);
    });

    this.socket.on(WS_EVENTS.USER_ONLINE, (data) => {
      this.emitEvent(WS_EVENTS.USER_ONLINE, data);
    });

    this.socket.on(WS_EVENTS.USER_OFFLINE, (data) => {
      this.emitEvent(WS_EVENTS.USER_OFFLINE, data);
    });
  }

  /**
   * Disconnect WebSocket
   */
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      this.connectionPromise = null;
      this.eventListeners.clear();
    }
  }

  /**
   * Emit event to server
   * @param {string} event - Event name
   * @param {any} data - Event data
   * @returns {Promise} - Emit promise
   */
  emit(event, data) {
    return new Promise((resolve, reject) => {
      if (!this.socket || !this.isConnected) {
        reject(new Error('WebSocket not connected'));
        return;
      }

      this.socket.emit(event, data, (response) => {
        if (response && response.error) {
          reject(new Error(response.error));
        } else {
          resolve(response);
        }
      });
    });
  }

  /**
   * Listen to events
   * @param {string} event - Event name
   * @param {Function} callback - Event callback
   */
  on(event, callback) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event).push(callback);
  }

  /**
   * Remove event listener
   * @param {string} event - Event name
   * @param {Function} callback - Event callback
   */
  off(event, callback) {
    if (this.eventListeners.has(event)) {
      const listeners = this.eventListeners.get(event);
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  /**
   * Emit event to local listeners
   * @param {string} event - Event name
   * @param {any} data - Event data
   */
  emitEvent(event, data) {
    if (this.eventListeners.has(event)) {
      this.eventListeners.get(event).forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error('Error in event listener:', error);
        }
      });
    }
  }

  /**
   * Get connection status
   * @returns {boolean} - Connection status
   */
  getConnectionStatus() {
    return this.isConnected;
  }

  /**
   * Send swap request
   * @param {Object} swapData - Swap request data
   * @returns {Promise} - Send promise
   */
  sendSwapRequest(swapData) {
    return this.emit('swap_request', swapData);
  }

  /**
   * Update swap status
   * @param {string} swapId - Swap ID
   * @param {string} status - New status
   * @returns {Promise} - Update promise
   */
  updateSwapStatus(swapId, status) {
    return this.emit('swap_update', { swapId, status });
  }

  /**
   * Send message
   * @param {Object} messageData - Message data
   * @returns {Promise} - Send promise
   */
  sendMessage(messageData) {
    return this.emit('message', messageData);
  }

  /**
   * Join user room
   * @param {string} userId - User ID
   * @returns {Promise} - Join promise
   */
  joinUserRoom(userId) {
    return this.emit('join_room', { userId });
  }

  /**
   * Leave user room
   * @param {string} userId - User ID
   * @returns {Promise} - Leave promise
   */
  leaveUserRoom(userId) {
    return this.emit('leave_room', { userId });
  }

  /**
   * Update user status
   * @param {string} status - User status
   * @returns {Promise} - Update promise
   */
  updateUserStatus(status) {
    return this.emit('user_status', { status });
  }

  /**
   * Ping server
   * @returns {Promise} - Ping promise
   */
  ping() {
    return this.emit('ping');
  }
}

// Create singleton instance
const webSocketService = new WebSocketService();

export default webSocketService;
