export interface Amenity {
  id: string;
  slug: AmenityType;
  name: string;
  icon?: string;
  category?: string;
}

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
