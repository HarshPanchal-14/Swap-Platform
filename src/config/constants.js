// Application Constants
export const APP_CONFIG = {
  NAME: 'SkillSwap',
  VERSION: '1.0.0',
  DESCRIPTION: 'Connect with people who have the skills you need and share your expertise in return.',
  API_BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  WEBSOCKET_URL: process.env.REACT_APP_WS_URL || 'ws://localhost:3001',
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  SUPPORTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  PAGINATION_LIMIT: 12,
  SEARCH_DEBOUNCE_MS: 300,
  SESSION_TIMEOUT: 24 * 60 * 60 * 1000, // 24 hours
};

// User Roles
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  MODERATOR: 'moderator',
};

// User Status
export const USER_STATUS = {
  ACTIVE: 'active',
  BANNED: 'banned',
  INACTIVE: 'inactive',
  PENDING: 'pending',
};

// Skill Levels
export const SKILL_LEVELS = {
  BEGINNER: 'Beginner',
  INTERMEDIATE: 'Intermediate',
  ADVANCED: 'Advanced',
  ALL_LEVELS: 'All Levels',
};

// Skill Categories
export const SKILL_CATEGORIES = {
  PROGRAMMING: 'Programming',
  MUSIC: 'Music',
  LANGUAGE: 'Language',
  ARTS: 'Arts',
  CULINARY: 'Culinary',
  WELLNESS: 'Wellness',
  DESIGN: 'Design',
  COMMUNICATION: 'Communication',
};

// Swap Request Status
export const SWAP_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

// Message Types
export const MESSAGE_TYPES = {
  ANNOUNCEMENT: 'announcement',
  FEATURE: 'feature',
  MAINTENANCE: 'maintenance',
  ALERT: 'alert',
};

// Report Types
export const REPORT_TYPES = {
  INAPPROPRIATE_BEHAVIOR: 'inappropriate_behavior',
  SPAM: 'spam',
  HARASSMENT: 'harassment',
  FAKE_PROFILE: 'fake_profile',
  INAPPROPRIATE_CONTENT: 'inappropriate_content',
  OTHER: 'other',
};

// Validation Rules
export const VALIDATION_RULES = {
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    MIN_LENGTH: 5,
    MAX_LENGTH: 255,
  },
  PASSWORD: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 128,
    PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/,
  },
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
    PATTERN: /^[a-zA-Z\s'-]+$/,
  },
  BIO: {
    MAX_LENGTH: 500,
  },
  LOCATION: {
    MAX_LENGTH: 255,
  },
  SKILL_NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
  },
  MESSAGE: {
    MAX_LENGTH: 1000,
  },
};

// Error Messages
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  PASSWORD_TOO_SHORT: 'Password must be at least 6 characters long',
  PASSWORD_TOO_WEAK: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  NAME_TOO_SHORT: 'Name must be at least 2 characters long',
  NAME_INVALID: 'Name can only contain letters, spaces, hyphens, and apostrophes',
  BIO_TOO_LONG: 'Bio cannot exceed 500 characters',
  MESSAGE_TOO_LONG: 'Message cannot exceed 1000 characters',
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  FILE_TOO_LARGE: 'File size must be less than 5MB',
  UNSUPPORTED_FILE_TYPE: 'Only JPEG, PNG, and WebP files are supported',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Successfully logged in!',
  LOGOUT_SUCCESS: 'Successfully logged out!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  SKILL_ADDED: 'Skill added successfully!',
  SKILL_REMOVED: 'Skill removed successfully!',
  SWAP_REQUEST_SENT: 'Swap request sent successfully!',
  SWAP_REQUEST_ACCEPTED: 'Swap request accepted!',
  SWAP_REQUEST_REJECTED: 'Swap request rejected.',
  RATING_SUBMITTED: 'Rating submitted successfully!',
  MESSAGE_SENT: 'Message sent successfully!',
  USER_BANNED: 'User banned successfully!',
  USER_UNBANNED: 'User unbanned successfully!',
  SKILL_APPROVED: 'Skill approved successfully!',
  SKILL_REJECTED: 'Skill rejected successfully!',
};

// UI Constants
export const UI_CONFIG = {
  ANIMATION_DURATION: 300,
  TOAST_DURATION: 5000,
  LOADING_DELAY: 1000,
  DEBOUNCE_DELAY: 300,
  INFINITE_SCROLL_THRESHOLD: 100,
  MODAL_BACKDROP_OPACITY: 0.5,
  MAX_TAGS_DISPLAY: 3,
  MAX_SKILLS_DISPLAY: 8,
  RATING_STARS: 5,
};

// Color Scheme
export const COLORS = {
  PRIMARY: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    900: '#1e3a8a',
  },
  SUCCESS: {
    50: '#f0fdf4',
    100: '#dcfce7',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
  },
  WARNING: {
    50: '#fffbeb',
    100: '#fef3c7',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
  },
  ERROR: {
    50: '#fef2f2',
    100: '#fee2e2',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
  },
  GRAY: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'skillswap_auth_token',
  USER_DATA: 'skillswap_user_data',
  THEME: 'skillswap_theme',
  LANGUAGE: 'skillswap_language',
  SEARCH_HISTORY: 'skillswap_search_history',
  FAVORITES: 'skillswap_favorites',
  NOTIFICATIONS: 'skillswap_notifications',
  CACHE_PREFIX: 'skillswap_cache',
};

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    VERIFY: '/auth/verify',
  },
  USERS: {
    PROFILE: '/users/profile',
    UPDATE: '/users/update',
    DELETE: '/users/delete',
    BAN: '/users/ban',
    UNBAN: '/users/unban',
    SEARCH: '/users/search',
  },
  SKILLS: {
    LIST: '/skills',
    CREATE: '/skills',
    UPDATE: '/skills/:id',
    DELETE: '/skills/:id',
    SEARCH: '/skills/search',
    MODERATE: '/skills/moderate',
  },
  SWAPS: {
    LIST: '/swaps',
    CREATE: '/swaps',
    UPDATE: '/swaps/:id',
    DELETE: '/swaps/:id',
    ACCEPT: '/swaps/:id/accept',
    REJECT: '/swaps/:id/reject',
    COMPLETE: '/swaps/:id/complete',
  },
  RATINGS: {
    CREATE: '/ratings',
    UPDATE: '/ratings/:id',
    DELETE: '/ratings/:id',
  },
  MESSAGES: {
    LIST: '/messages',
    CREATE: '/messages',
    SEND: '/messages/send',
  },
  REPORTS: {
    LIST: '/reports',
    CREATE: '/reports',
    UPDATE: '/reports/:id',
  },
  ANALYTICS: {
    DASHBOARD: '/analytics/dashboard',
    USERS: '/analytics/users',
    SWAPS: '/analytics/swaps',
    EXPORT: '/analytics/export',
  },
};

// WebSocket Events
export const WS_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  SWAP_REQUEST: 'swap_request',
  SWAP_UPDATE: 'swap_update',
  MESSAGE: 'message',
  NOTIFICATION: 'notification',
  USER_ONLINE: 'user_online',
  USER_OFFLINE: 'user_offline',
};

// Feature Flags
export const FEATURE_FLAGS = {
  REAL_TIME_CHAT: process.env.REACT_APP_ENABLE_CHAT === 'true',
  VIDEO_CALLS: process.env.REACT_APP_ENABLE_VIDEO === 'true',
  ADVANCED_SEARCH: process.env.REACT_APP_ENABLE_ADVANCED_SEARCH === 'true',
  AI_MATCHING: process.env.REACT_APP_ENABLE_AI_MATCHING === 'true',
  MULTI_LANGUAGE: process.env.REACT_APP_ENABLE_MULTI_LANGUAGE === 'true',
};

// Performance Configuration
export const PERFORMANCE_CONFIG = {
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
  DEBOUNCE_DELAY: 300,
  THROTTLE_DELAY: 1000,
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
  IMAGE_LAZY_LOADING: true,
  VIRTUAL_SCROLLING: true,
};


