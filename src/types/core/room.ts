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

export type RoomType =
  | 'Entire Guest Suite'
  | 'Private Room in Apartment'
  | 'Casa'
  | 'Apartamento'
  | 'Habitación Privada'
  | 'Suite'
  | 'Villa'
  | 'Cabaña';
