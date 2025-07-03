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
  type: string;
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
