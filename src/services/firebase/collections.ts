import { collection } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export const COLLECTIONS = {
  PRICE_ANALYSIS: 'price_analysis',
  PRICE_LINKS: 'price_links'
} as const;

export const getCollection = (name: string) => collection(db, name);

export const priceAnalysisCollection = getCollection(COLLECTIONS.PRICE_ANALYSIS);
export const priceLinksCollection = getCollection(COLLECTIONS.PRICE_LINKS);