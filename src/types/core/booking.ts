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
