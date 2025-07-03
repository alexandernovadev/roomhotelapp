import type { User } from '../core/user';
import type { Room } from '../core/room';
import type { Booking } from '../core/booking';

export interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface SearchState {
  filters: {
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
  };
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
