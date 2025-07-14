import { PERFORMANCE_CONFIG, STORAGE_KEYS } from '../config/constants';

class CacheService {
  constructor() {
    this.memoryCache = new Map();
    this.storageCache = new Map();
    this.cacheStats = {
      hits: 0,
      misses: 0,
      sets: 0,
      deletes: 0,
    };
  }

  /**
   * Set cache item in memory
   * @param {string} key - Cache key
   * @param {any} value - Cache value
   * @param {number} ttl - Time to live in milliseconds
   */
  setMemory(key, value, ttl = PERFORMANCE_CONFIG.CACHE_DURATION) {
    const expiry = Date.now() + ttl;
    this.memoryCache.set(key, {
      value,
      expiry,
      timestamp: Date.now(),
    });
    this.cacheStats.sets++;
  }

  /**
   * Get cache item from memory
   * @param {string} key - Cache key
   * @returns {any} - Cached value or null
   */
  getMemory(key) {
    const item = this.memoryCache.get(key);

    if (!item) {
      this.cacheStats.misses++;
      return null;
    }

    if (Date.now() > item.expiry) {
      this.memoryCache.delete(key);
      this.cacheStats.misses++;
      return null;
    }

    this.cacheStats.hits++;
    return item.value;
  }

  /**
   * Set cache item in localStorage
   * @param {string} key - Cache key
   * @param {any} value - Cache value
   * @param {number} ttl - Time to live in milliseconds
   */
  setStorage(key, value, ttl = PERFORMANCE_CONFIG.CACHE_DURATION) {
    try {
      const cacheKey = `${STORAGE_KEYS.CACHE_PREFIX}_${key}`;
      const cacheItem = {
        value,
        expiry: Date.now() + ttl,
        timestamp: Date.now(),
      };

      localStorage.setItem(cacheKey, JSON.stringify(cacheItem));
      this.storageCache.set(key, cacheItem);
      this.cacheStats.sets++;
    } catch (error) {
      console.warn('Failed to set storage cache:', error);
    }
  }

  /**
   * Get cache item from localStorage
   * @param {string} key - Cache key
   * @returns {any} - Cached value or null
   */
  getStorage(key) {
    try {
      const cacheKey = `${STORAGE_KEYS.CACHE_PREFIX}_${key}`;
      const cached = localStorage.getItem(cacheKey);

      if (!cached) {
        this.cacheStats.misses++;
        return null;
      }

      const item = JSON.parse(cached);

      if (Date.now() > item.expiry) {
        localStorage.removeItem(cacheKey);
        this.storageCache.delete(key);
        this.cacheStats.misses++;
        return null;
      }

      this.cacheStats.hits++;
      return item.value;
    } catch (error) {
      console.warn('Failed to get storage cache:', error);
      this.cacheStats.misses++;
      return null;
    }
  }

  /**
   * Set cache item (tries memory first, then storage)
   * @param {string} key - Cache key
   * @param {any} value - Cache value
   * @param {Object} options - Cache options
   */
  set(key, value, options = {}) {
    const { ttl = PERFORMANCE_CONFIG.CACHE_DURATION, persistent = false } = options;

    // Always set in memory for fast access
    this.setMemory(key, value, ttl);

    // Set in storage if persistent
    if (persistent) {
      this.setStorage(key, value, ttl);
    }
  }

  /**
   * Get cache item (tries memory first, then storage)
   * @param {string} key - Cache key
   * @param {boolean} persistent - Whether to check storage cache
   * @returns {any} - Cached value or null
   */
  get(key, persistent = false) {
    // Try memory cache first
    let value = this.getMemory(key);

    if (value !== null) {
      return value;
    }

    // Try storage cache if persistent
    if (persistent) {
      value = this.getStorage(key);
      if (value !== null) {
        // Update memory cache with storage value
        this.setMemory(key, value);
        return value;
      }
    }

    return null;
  }

  /**
   * Delete cache item
   * @param {string} key - Cache key
   * @param {boolean} persistent - Whether to delete from storage
   */
  delete(key, persistent = false) {
    this.memoryCache.delete(key);

    if (persistent) {
      try {
        const cacheKey = `${STORAGE_KEYS.CACHE_PREFIX}_${key}`;
        localStorage.removeItem(cacheKey);
        this.storageCache.delete(key);
      } catch (error) {
        console.warn('Failed to delete storage cache:', error);
      }
    }

    this.cacheStats.deletes++;
  }

  /**
   * Clear all cache
   * @param {boolean} persistent - Whether to clear storage cache
   */
  clear(persistent = false) {
    this.memoryCache.clear();

    if (persistent) {
      try {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
          if (key.startsWith(STORAGE_KEYS.CACHE_PREFIX)) {
            localStorage.removeItem(key);
          }
        });
        this.storageCache.clear();
      } catch (error) {
        console.warn('Failed to clear storage cache:', error);
      }
    }
  }

  /**
   * Clean expired cache items
   */
  cleanup() {
    const now = Date.now();

    // Clean memory cache
    for (const [key, item] of this.memoryCache.entries()) {
      if (now > item.expiry) {
        this.memoryCache.delete(key);
      }
    }

    // Clean storage cache
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(STORAGE_KEYS.CACHE_PREFIX)) {
          try {
            const cached = localStorage.getItem(key);
            if (cached) {
              const item = JSON.parse(cached);
              if (now > item.expiry) {
                localStorage.removeItem(key);
                const cacheKey = key.replace(`${STORAGE_KEYS.CACHE_PREFIX}_`, '');
                this.storageCache.delete(cacheKey);
              }
            }
          } catch (error) {
            // Remove invalid cache items
            localStorage.removeItem(key);
          }
        }
      });
    } catch (error) {
      console.warn('Failed to cleanup storage cache:', error);
    }
  }

  /**
   * Get cache statistics
   * @returns {Object} - Cache statistics
   */
  getStats() {
    const total = this.cacheStats.hits + this.cacheStats.misses;
    const hitRate = total > 0 ? (this.cacheStats.hits / total * 100).toFixed(2) : 0;

    return {
      ...this.cacheStats,
      hitRate: `${hitRate}%`,
      memorySize: this.memoryCache.size,
      storageSize: this.storageCache.size,
    };
  }

  /**
   * Cache API response with automatic key generation
   * @param {string} url - API URL
   * @param {Object} params - Request parameters
   * @param {any} data - Response data
   * @param {Object} options - Cache options
   */
  cacheApiResponse(url, params = {}, data, options = {}) {
    const cacheKey = this.generateApiCacheKey(url, params);
    this.set(cacheKey, data, options);
  }

  /**
   * Get cached API response
   * @param {string} url - API URL
   * @param {Object} params - Request parameters
   * @param {boolean} persistent - Whether to check storage cache
   * @returns {any} - Cached response or null
   */
  getCachedApiResponse(url, params = {}, persistent = false) {
    const cacheKey = this.generateApiCacheKey(url, params);
    return this.get(cacheKey, persistent);
  }

  /**
   * Generate cache key for API requests
   * @param {string} url - API URL
   * @param {Object} params - Request parameters
   * @returns {string} - Cache key
   */
  generateApiCacheKey(url, params = {}) {
    const sortedParams = Object.keys(params)
      .sort()
      .map(key => `${key}=${params[key]}`)
      .join('&');

    return `api_${url}${sortedParams ? `?${sortedParams}` : ''}`;
  }

  /**
   * Cache user data
   * @param {string} userId - User ID
   * @param {Object} userData - User data
   * @param {Object} options - Cache options
   */
  cacheUserData(userId, userData, options = {}) {
    const cacheKey = `user_${userId}`;
    this.set(cacheKey, userData, { ...options, persistent: true });
  }

  /**
   * Get cached user data
   * @param {string} userId - User ID
   * @returns {Object} - Cached user data or null
   */
  getCachedUserData(userId) {
    const cacheKey = `user_${userId}`;
    return this.get(cacheKey, true);
  }

  /**
   * Cache search results
   * @param {string} query - Search query
   * @param {Array} results - Search results
   * @param {Object} options - Cache options
   */
  cacheSearchResults(query, results, options = {}) {
    const cacheKey = `search_${query.toLowerCase().replace(/\s+/g, '_')}`;
    this.set(cacheKey, results, options);
  }

  /**
   * Get cached search results
   * @param {string} query - Search query
   * @returns {Array} - Cached search results or null
   */
  getCachedSearchResults(query) {
    const cacheKey = `search_${query.toLowerCase().replace(/\s+/g, '_')}`;
    return this.get(cacheKey);
  }
}

// Create singleton instance
const cacheService = new CacheService();

// Setup periodic cleanup
setInterval(() => {
  cacheService.cleanup();
}, 5 * 60 * 1000); // Cleanup every 5 minutes

export default cacheService;
