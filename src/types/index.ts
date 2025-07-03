// ============================================================================
// CORE TYPES
// ============================================================================

export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  bio?: string;
  username: string;
  phone?: string;
  registeredAt: number;
  lastVisitAt?: number;
  rooms?: Record<string, string>;
  favorites?: Record<string, string>;
}

export interface Room {
  id: string;
  title: string;
  description: string;
  featured_image: string;
  images?: string[];
  type: RoomType;
  location: string;
  address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  price: number;
  currency?: string;
  meta: RoomMeta;
  amenities: Record<string, string>;
  userId: string;
  publishedAt: number;
  isAvailable?: boolean;
  rating?: number;
  reviewCount?: number;
}

export interface RoomMeta {
  guests: number;
  bedrooms: number;
  beds: number;
  baths: number;
  likes: number;
  size?: number; // in square meters
  floor?: number;
}

export interface Amenity {
  id: string;
  slug: AmenityType;
  name: string;
  icon?: string;
  category?: string;
}

export interface Booking {
  id: string;
  roomId: string;
  userId: string;
  hostId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: BookingStatus;
  createdAt: number;
  updatedAt: number;
  paymentStatus: PaymentStatus;
  specialRequests?: string;
}

export interface Review {
  id: string;
  roomId: string;
  userId: string;
  bookingId: string;
  rating: number;
  comment: string;
  createdAt: number;
  updatedAt?: number;
  isPublic: boolean;
}

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

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone?: string;
  avatar?: string;
}

export interface SearchFilters {
  location?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  priceRange?: string;
  roomTypes?: string[];
  amenities?: string[];
  rating?: number;
  sortBy?: 'price' | 'rating' | 'date' | 'relevance';
  sortOrder?: 'asc' | 'desc';
}

export interface RoomFormData {
  title: string;
  description: string;
  type: RoomType;
  location: string;
  address?: string;
  price: number;
  guests: number;
  bedrooms: number;
  beds: number;
  baths: number;
  amenities: Record<string, boolean>;
  images: File[];
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// ============================================================================
// STATE TYPES
// ============================================================================

export interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface SearchState {
  filters: SearchFilters;
  results: Room[];
  totalResults: number;
  isLoading: boolean;
  hasMore: boolean;
}

export interface BookingState {
  bookings: Booking[];
  currentBooking: Booking | null;
  isLoading: boolean;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// ============================================================================
// COMPONENT PROPS TYPES
// ============================================================================

export interface BaseComponentProps {
  class?: string;
  id?: string;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export interface InputProps extends BaseComponentProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'date' | 'search';
  placeholder?: string;
  value?: string | number;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  label?: string;
  icon?: string;
}

export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
}
