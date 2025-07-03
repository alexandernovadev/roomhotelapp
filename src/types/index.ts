// ============================================================================
// CORE TYPES
// ============================================================================

export type { User } from './core/user';
export type { Room, RoomMeta, RoomType } from './core/room';
export type { Amenity, AmenityType } from './core/amenity';
export type { Booking, Review, BookingStatus, PaymentStatus } from './core/booking';

// ============================================================================
// ENUM TYPES
// ============================================================================

export type RoomType =
  | 'Entire Guest Suite'
  | 'Private Room in Apartment'
  | 'Casa'
  | 'Apartamento'
  | 'Habitación Privada'
  | 'Suite'
  | 'Villa'
  | 'Cabaña';

export type AmenityType =
  | 'wifi'
  | 'kitchen'
  | 'parking'
  | 'ac'
  | 'tv'
  | 'washer'
  | 'pool'
  | 'gym'
  | 'breakfast'
  | 'cleaning'
  | 'security'
  | 'elevator'
  | 'balcony'
  | 'garden'
  | 'terrace'
  | 'fireplace'
  | 'hot_tub'
  | 'sauna'
  | 'tennis'
  | 'bike_rental';

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'cancelled'
  | 'completed'
  | 'refunded';

export type PaymentStatus =
  | 'pending'
  | 'paid'
  | 'failed'
  | 'refunded'
  | 'cancelled';

// ============================================================================
// FORM TYPES
// ============================================================================

export type { LoginCredentials, RegisterData } from './forms/auth';
export type { SearchFilters, RoomFormData } from './forms/search';

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export type { ApiResponse, PaginatedResponse } from './api/responses';

// ============================================================================
// STATE TYPES
// ============================================================================

export type { AppState, SearchState, BookingState } from './stores/state';

// ============================================================================
// COMPONENT PROPS TYPES
// ============================================================================

export type { BaseComponentProps, ButtonProps, InputProps, ModalProps } from './components/props';

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type { Optional, RequiredFields, DeepPartial, Nullable, AsyncReturnType } from './utils';
