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