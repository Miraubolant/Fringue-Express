import { read, utils } from 'xlsx';
import { PriceLink } from '../../types';
import { parsePrice, parseShippingCost, isShippingFree } from '../priceParser';
import { findColumnValue } from './columnFinder';
import { PRICE_LINKS_COLUMNS } from './constants';

export const parsePriceLinks = async (file: File): Promise<PriceLink[]> => {
  const data = await file.arrayBuffer();
  const workbook = read(data);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = utils.sheet_to_json(worksheet);

  return jsonData
    .map((row: any) => {
      const reference = findColumnValue(row, PRICE_LINKS_COLUMNS.reference);
      const url = findColumnValue(row, PRICE_LINKS_COLUMNS.url);
      const shippingInfo = findColumnValue(row, PRICE_LINKS_COLUMNS.shipping);
      
      if (!reference || !url) return null;

      const price = parsePrice(findColumnValue(row, PRICE_LINKS_COLUMNS.price));
      const shippingCost = parseShippingCost(shippingInfo);
      const isFreeShipping = isShippingFree(shippingInfo);

      return {
        reference,
        title: findColumnValue(row, PRICE_LINKS_COLUMNS.title),
        source: findColumnValue(row, PRICE_LINKS_COLUMNS.brand),
        url,
        price,
        shipping: shippingInfo,
        shippingCost,
        isFreeShipping,
        scrapedAt: findColumnValue(row, PRICE_LINKS_COLUMNS.date)
      };
    })
    .filter((item): item is PriceLink => item !== null);
};