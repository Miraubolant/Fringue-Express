export interface CompetitorLink {
  title: string;
  price: number;
  url: string;
  site: string;
}

export interface RemiseItem {
  id?: string;
  reference: string;
  title: string;
  brand: string;
  priceArlettie: number;
  priceBrand: number;
  imageUrl: string | null; // Changed from optional to nullable
  competitorLinks: CompetitorLink[];
  createdAt?: any;
  updatedAt?: any;
}