import { VALIDATION_RULES, ERROR_MESSAGES } from '../config/constants';

/**
 * Validates email format
 * @param {string} email - Email to validate
 * @returns {object} - Validation result with isValid and error message
 */
export const validateEmail = (email) => {
  if (!email) {
    return { isValid: false, error: ERROR_MESSAGES.REQUIRED_FIELD };
  }

  if (email.length < VALIDATION_RULES.EMAIL.MIN_LENGTH) {
    return { isValid: false, error: ERROR_MESSAGES.INVALID_EMAIL };
  }

  if (email.length > VALIDATION_RULES.EMAIL.MAX_LENGTH) {
    return { isValid: false, error: ERROR_MESSAGES.INVALID_EMAIL };
  }

  if (!VALIDATION_RULES.EMAIL.PATTERN.test(email)) {
    return { isValid: false, error: ERROR_MESSAGES.INVALID_EMAIL };
  }

  return { isValid: true, error: null };
};

/**
 * Validates password strength
 * @param {string} password - Password to validate
 * @returns {object} - Validation result with isValid and error message
 */
export const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, error: ERROR_MESSAGES.REQUIRED_FIELD };
  }

  if (password.length < VALIDATION_RULES.PASSWORD.MIN_LENGTH) {
    return { isValid: false, error: ERROR_MESSAGES.PASSWORD_TOO_SHORT };
  }

  if (password.length > VALIDATION_RULES.PASSWORD.MAX_LENGTH) {
    return { isValid: false, error: 'Password is too long' };
  }

  if (!VALIDATION_RULES.PASSWORD.PATTERN.test(password)) {
    return { isValid: false, error: ERROR_MESSAGES.PASSWORD_TOO_WEAK };
  }

  return { isValid: true, error: null };
};

/**
 * Validates name format
 * @param {string} name - Name to validate
 * @returns {object} - Validation result with isValid and error message
 */
export const validateName = (name) => {
  if (!name) {
    return { isValid: false, error: ERROR_MESSAGES.REQUIRED_FIELD };
  }

  if (name.length < VALIDATION_RULES.NAME.MIN_LENGTH) {
    return { isValid: false, error: ERROR_MESSAGES.NAME_TOO_SHORT };
  }

  if (name.length > VALIDATION_RULES.NAME.MAX_LENGTH) {
    return { isValid: false, error: 'Name is too long' };
  }

  if (!VALIDATION_RULES.NAME.PATTERN.test(name)) {
    return { isValid: false, error: ERROR_MESSAGES.NAME_INVALID };
  }

  return { isValid: true, error: null };
};

/**
 * Validates bio length
 * @param {string} bio - Bio to validate
 * @returns {object} - Validation result with isValid and error message
 */
export const validateBio = (bio) => {
  if (bio && bio.length > VALIDATION_RULES.BIO.MAX_LENGTH) {
    return { isValid: false, error: ERROR_MESSAGES.BIO_TOO_LONG };
  }

  return { isValid: true, error: null };
};

/**
 * Validates location length
 * @param {string} location - Location to validate
 * @returns {object} - Validation result with isValid and error message
 */
export const validateLocation = (location) => {
  if (location && location.length > VALIDATION_RULES.LOCATION.MAX_LENGTH) {
    return { isValid: false, error: 'Location is too long' };
  }

  return { isValid: true, error: null };
};

/**
 * Validates skill name
 * @param {string} skillName - Skill name to validate
 * @returns {object} - Validation result with isValid and error message
 */
export const validateSkillName = (skillName) => {
  if (!skillName) {
    return { isValid: false, error: ERROR_MESSAGES.REQUIRED_FIELD };
  }

  if (skillName.length < VALIDATION_RULES.SKILL_NAME.MIN_LENGTH) {
    return { isValid: false, error: 'Skill name is too short' };
  }

  if (skillName.length > VALIDATION_RULES.SKILL_NAME.MAX_LENGTH) {
    return { isValid: false, error: 'Skill name is too long' };
  }

  return { isValid: true, error: null };
};

/**
 * Validates message length
 * @param {string} message - Message to validate
 * @returns {object} - Validation result with isValid and error message
 */
export const validateMessage = (message) => {
  if (message && message.length > VALIDATION_RULES.MESSAGE.MAX_LENGTH) {
    return { isValid: false, error: ERROR_MESSAGES.MESSAGE_TOO_LONG };
  }

  return { isValid: true, error: null };
};

/**
 * Validates file upload
 * @param {File} file - File to validate
 * @param {Array} allowedTypes - Allowed MIME types
 * @param {number} maxSize - Maximum file size in bytes
 * @returns {object} - Validation result with isValid and error message
 */
export const validateFile = (file, allowedTypes, maxSize) => {
  if (!file) {
    return { isValid: false, error: ERROR_MESSAGES.REQUIRED_FIELD };
  }

  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: ERROR_MESSAGES.UNSUPPORTED_FILE_TYPE };
  }

  if (file.size > maxSize) {
    return { isValid: false, error: ERROR_MESSAGES.FILE_TOO_LARGE };
  }

  return { isValid: true, error: null };
};

/**
 * Validates form data object
 * @param {object} formData - Form data to validate
 * @param {object} validationRules - Validation rules for each field
 * @returns {object} - Validation result with isValid and errors object
 */
export const validateForm = (formData, validationRules) => {
  const errors = {};
  let isValid = true;

  Object.keys(validationRules).forEach(field => {
    const value = formData[field];
    const rule = validationRules[field];

    if (rule.required && !value) {
      errors[field] = ERROR_MESSAGES.REQUIRED_FIELD;
      isValid = false;
      return;
    }

    if (value) {
      let fieldValidation;

      switch (rule.type) {
      case 'email':
        fieldValidation = validateEmail(value);
        break;
      case 'password':
        fieldValidation = validatePassword(value);
        break;
      case 'name':
        fieldValidation = validateName(value);
        break;
      case 'bio':
        fieldValidation = validateBio(value);
        break;
      case 'location':
        fieldValidation = validateLocation(value);
        break;
      case 'skillName':
        fieldValidation = validateSkillName(value);
        break;
      case 'message':
        fieldValidation = validateMessage(value);
        break;
      case 'file':
        fieldValidation = validateFile(value, rule.allowedTypes, rule.maxSize);
        break;
      case 'custom':
        fieldValidation = rule.validator(value);
        break;
      default:
        fieldValidation = { isValid: true, error: null };
      }

      if (!fieldValidation.isValid) {
        errors[field] = fieldValidation.error;
        isValid = false;
      }
    }
  });

  return { isValid, errors };
};

/**
 * Sanitizes user input to prevent XSS attacks
 * @param {string} input - Input string to sanitize
 * @returns {string} - Sanitized string
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') {
    return input;
  }

  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Truncates text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @param {string} suffix - Suffix to add when truncated
 * @returns {string} - Truncated text
 */
export const truncateText = (text, maxLength, suffix = '...') => {
  if (!text || text.length <= maxLength) {
    return text;
  }

  return text.substring(0, maxLength - suffix.length) + suffix;
};

/**
 * Formats date to readable string
 * @param {string|Date} date - Date to format
 * @param {string} locale - Locale for formatting
 * @returns {string} - Formatted date string
 */
export const formatDate = (date, locale = 'en-US') => {
  if (!date) return '';

  const dateObj = new Date(date);

  if (isNaN(dateObj.getTime())) {
    return '';
  }

  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Formats date to relative time (e.g., "2 hours ago")
 * @param {string|Date} date - Date to format
 * @returns {string} - Relative time string
 */
export const formatRelativeTime = (date) => {
  if (!date) return '';

  const dateObj = new Date(date);
  const now = new Date();
  const diffInSeconds = Math.floor((now - dateObj) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
  }

  return formatDate(date);
};

/**
 * Validates URL format
 * @param {string} url - URL to validate
 * @returns {boolean} - Whether URL is valid
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validates phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - Whether phone number is valid
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};

/**
 * Generates a random string of specified length
 * @param {number} length - Length of string to generate
 * @returns {string} - Random string
 */
export const generateRandomString = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Debounces a function call
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

/**
 * Throttles a function call
 * @param {Function} func - Function to throttle
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - Throttled function
 */
export const throttle = (func, delay) => {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func.apply(null, args);
    }
  };
};
