export interface Movie {
  id: string;
  title: string;
  duration?: number;
  mood: string;
  description?: string;
  rate: number;
  seen: boolean;
  posterUrl?: string;
}
