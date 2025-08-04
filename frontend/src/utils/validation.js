// frontend/src/utils/validation.js

/**
 * Email validation regex
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Phone number validation regex (Indonesian format)
 */
const PHONE_REGEX = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;

/**
 * Password strength validation
 */
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {Object} Validation result
 */
export const validateEmail = (email) => {
  if (!email) {
    return { valid: false, message: 'Email is required' };
  }
  
  if (!EMAIL_REGEX.test(email)) {
    return { valid: false, message: 'Please enter a valid email address' };
  }
  
  return { valid: true };
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} Validation result
 */
export const validatePassword = (password) => {
  if (!password) {
    return { valid: false, message: 'Password is required' };
  }
  
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters long' };
  }
  
  if (!PASSWORD_REGEX.test(password)) {
    return { 
      valid: false, 
      message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number' 
    };
  }
  
  return { valid: true };
};

/**
 * Validate password confirmation
 * @param {string} password - Original password
 * @param {string} confirmPassword - Password confirmation
 * @returns {Object} Validation result
 */
export const validatePasswordConfirmation = (password, confirmPassword) => {
  if (!confirmPassword) {
    return { valid: false, message: 'Password confirmation is required' };
  }
  
  if (password !== confirmPassword) {
    return { valid: false, message: 'Passwords do not match' };
  }
  
  return { valid: true };
};

/**
 * Validate phone number
 * @param {string} phone - Phone number to validate
 * @returns {Object} Validation result
 */
export const validatePhone = (phone) => {
  if (!phone) {
    return { valid: false, message: 'Phone number is required' };
  }
  
  if (!PHONE_REGEX.test(phone)) {
    return { valid: false, message: 'Please enter a valid Indonesian phone number' };
  }
  
  return { valid: true };
};

/**
 * Validate required field
 * @param {string} value - Value to validate
 * @param {string} fieldName - Name of the field
 * @returns {Object} Validation result
 */
export const validateRequired = (value, fieldName = 'Field') => {
  if (!value || value.trim() === '') {
    return { valid: false, message: `${fieldName} is required` };
  }
  
  return { valid: true };
};

/**
 * Validate minimum length
 * @param {string} value - Value to validate
 * @param {number} minLength - Minimum length required
 * @param {string} fieldName - Name of the field
 * @returns {Object} Validation result
 */
export const validateMinLength = (value, minLength, fieldName = 'Field') => {
  if (!value || value.length < minLength) {
    return { 
      valid: false, 
      message: `${fieldName} must be at least ${minLength} characters long` 
    };
  }
  
  return { valid: true };
};

/**
 * Validate maximum length
 * @param {string} value - Value to validate
 * @param {number} maxLength - Maximum length allowed
 * @param {string} fieldName - Name of the field
 * @returns {Object} Validation result
 */
export const validateMaxLength = (value, maxLength, fieldName = 'Field') => {
  if (value && value.length > maxLength) {
    return { 
      valid: false, 
      message: `${fieldName} must not exceed ${maxLength} characters` 
    };
  }
  
  return { valid: true };
};

/**
 * Validate numeric value
 * @param {string|number} value - Value to validate
 * @param {string} fieldName - Name of the field
 * @returns {Object} Validation result
 */
export const validateNumber = (value, fieldName = 'Field') => {
  if (value === '' || value === null || value === undefined) {
    return { valid: false, message: `${fieldName} is required` };
  }
  
  if (isNaN(value) || isNaN(parseFloat(value))) {
    return { valid: false, message: `${fieldName} must be a valid number` };
  }
  
  return { valid: true };
};

/**
 * Validate positive number
 * @param {string|number} value - Value to validate
 * @param {string} fieldName - Name of the field
 * @returns {Object} Validation result
 */
export const validatePositiveNumber = (value, fieldName = 'Field') => {
  const numberValidation = validateNumber(value, fieldName);
  if (!numberValidation.valid) {
    return numberValidation;
  }
  
  if (parseFloat(value) <= 0) {
    return { valid: false, message: `${fieldName} must be greater than 0` };
  }
  
  return { valid: true };
};

/**
 * Validate file type
 * @param {File} file - File to validate
 * @param {Array} allowedTypes - Array of allowed MIME types
 * @returns {Object} Validation result
 */
export const validateFileType = (file, allowedTypes) => {
  if (!file) {
    return { valid: false, message: 'File is required' };
  }
  
  if (!allowedTypes.includes(file.type)) {
    return { 
      valid: false, 
      message: `File type not allowed. Allowed types: ${allowedTypes.join(', ')}` 
    };
  }
  
  return { valid: true };
};

/**
 * Validate file size
 * @param {File} file - File to validate
 * @param {number} maxSizeInMB - Maximum file size in MB
 * @returns {Object} Validation result
 */
export const validateFileSize = (file, maxSizeInMB) => {
  if (!file) {
    return { valid: false, message: 'File is required' };
  }
  
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  
  if (file.size > maxSizeInBytes) {
    return { 
      valid: false, 
      message: `File size must not exceed ${maxSizeInMB}MB` 
    };
  }
  
  return { valid: true };
};

/**
 * Validate form data
 * @param {Object} data - Form data to validate
 * @param {Object} rules - Validation rules
 * @returns {Object} Validation result with errors
 */
export const validateForm = (data, rules) => {
  const errors = {};
  let isValid = true;
  
  for (const field in rules) {
    const fieldRules = rules[field];
    const value = data[field];
    
    for (const rule of fieldRules) {
      const result = rule(value);
      if (!result.valid) {
        errors[field] = result.message;
        isValid = false;
        break; // Stop at first error for this field
      }
    }
  }
  
  return { isValid, errors };
};

/**
 * Product validation rules
 */
export const productValidationRules = {
  name: [
    (value) => validateRequired(value, 'Product name'),
    (value) => validateMinLength(value, 3, 'Product name'),
    (value) => validateMaxLength(value, 100, 'Product name')
  ],
  description: [
    (value) => validateRequired(value, 'Description'),
    (value) => validateMinLength(value, 10, 'Description'),
    (value) => validateMaxLength(value, 1000, 'Description')
  ],
  price: [
    (value) => validatePositiveNumber(value, 'Price')
  ],
  category: [
    (value) => validateRequired(value, 'Category')
  ]
};

/**
 * User registration validation rules
 */
export const registrationValidationRules = {
  name: [
    (value) => validateRequired(value, 'Full name'),
    (value) => validateMinLength(value, 2, 'Full name'),
    (value) => validateMaxLength(value, 50, 'Full name')
  ],
  email: [
    (value) => validateEmail(value)
  ],
  phone: [
    (value) => validatePhone(value)
  ],
  password: [
    (value) => validatePassword(value)
  ]
};

/**
 * Login validation rules
 */
export const loginValidationRules = {
  email: [
    (value) => validateEmail(value)
  ],
  password: [
    (value) => validateRequired(value, 'Password')
  ]
};
