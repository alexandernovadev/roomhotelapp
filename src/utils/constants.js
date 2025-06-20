// Application constants
export const APP_NAME = 'Adventures App'
export const APP_VERSION = '1.0.0'

// Route names
export const ROUTES = {
  HOME: 'HomePage',
  SEARCH: 'SearchPage',
  CREATE_HOUSE: 'CreateHomePage',
  PROFILE: 'ProfilePage',
  HOUSES: 'HousesPages',
  NOT_FOUND: 'NotFoundPage'
}

// Form validation rules
export const VALIDATION_RULES = {
  NAME: {
    required: true,
    minLength: 2
  },
  EMAIL: {
    required: true,
    email: true
  },
  PASSWORD: {
    required: true,
    minLength: 6
  },
  PHONE: {
    pattern: /^[\+]?[1-9][\d]{0,15}$/,
    message: 'Número de teléfono inválido'
  }
}

// Modal sizes
export const MODAL_SIZES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
  FULL: 'full'
}

// Button variants
export const BUTTON_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SUCCESS: 'success',
  DANGER: 'danger',
  WARNING: 'warning',
  GHOST: 'ghost'
}

// Notification types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
}

// Default avatar
export const DEFAULT_AVATAR = 'https://ui-avatars.com/api/?name=User&background=0D9488&color=fff&size=128'

// Firebase collections
export const COLLECTIONS = {
  USERS: 'users',
  ROOMS: 'rooms',
  SERVICES: 'services'
}
