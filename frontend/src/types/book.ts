export interface BookI {
  _id: string;
  title: string;
  author: string; 
  genre: string;
  publishedYear: number;
  isAvailable: boolean;
  ratings?: number[];
  createdAt: string;
}