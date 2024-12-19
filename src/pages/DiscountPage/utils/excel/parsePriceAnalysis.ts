import { read, utils } from 'xlsx';
import { PriceAnalysis } from '../../types';
import { parsePrice } from '../priceParser';
import { findColumnValue } from './columnFinder';
import { PRICE_ANALYSIS_COLUMNS } from './constants';
import { calculateMargin } from '../calculations';

export const parsePriceAnalysis = async (file: File): Promise<PriceAnalysis[]> => {
  const data = await file.arrayBuffer();
  const workbook = read(data);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = utils.sheet_to_json(worksheet);

  return jsonData
    .map((row: any) => {
      const reference = findColumnValue(row, PRICE_ANALYSIS_COLUMNS.reference);
      if (!reference) return null;

      const priceArlettie = parsePrice(findColumnValue(row, PRICE_ANALYSIS_COLUMNS.priceArlettie));
      const priceBrand = parsePrice(findColumnValue(row, PRICE_ANALYSIS_COLUMNS.priceBrand));
      const googleAverage = parsePrice(findColumnValue(row, PRICE_ANALYSIS_COLUMNS.googleAverage));

      if (priceArlettie <= 0 || priceBrand <= 0) return null;

      return {
        reference,
        title: findColumnValue(row, PRICE_ANALYSIS_COLUMNS.title),
        brand: findColumnValue(row, PRICE_ANALYSIS_COLUMNS.brand),
        priceArlettie,
        priceBrand,
        googleAverage,
        margin: calculateMargin(priceBrand, priceArlettie, null),
        links: []
      };
    })
    .filter((item): item is PriceAnalysis => item !== null);
};