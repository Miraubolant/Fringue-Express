import { read, utils } from 'xlsx';
import { RemiseItem, CompetitorLink } from '../../../types/remise';
import { DISCOUNT_EXCEL_COLUMNS } from './constants';
import { findColumnValue } from '../../../../utils/excel';
import { parsePrice } from '../../../../utils/price';

export const parseDiscountExcel = async (file: File): Promise<RemiseItem[]> => {
  const data = await file.arrayBuffer();
  const workbook = read(data);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = utils.sheet_to_json(worksheet);

  return jsonData
    .map((row: any) => {
      const reference = findColumnValue(row, DISCOUNT_EXCEL_COLUMNS.reference);
      if (!reference) return null;

      const priceArlettie = parsePrice(findColumnValue(row, DISCOUNT_EXCEL_COLUMNS.priceArlettie));
      const priceBrand = parsePrice(findColumnValue(row, DISCOUNT_EXCEL_COLUMNS.priceBrand));
      if (priceArlettie <= 0 || priceBrand <= 0) return null;

      const competitorLinks: CompetitorLink[] = [];

      // Premier lien concurrent
      const site1 = findColumnValue(row, DISCOUNT_EXCEL_COLUMNS.site1);
      const title1 = findColumnValue(row, DISCOUNT_EXCEL_COLUMNS.title1);
      const price1 = parsePrice(findColumnValue(row, DISCOUNT_EXCEL_COLUMNS.price1));
      const link1 = findColumnValue(row, DISCOUNT_EXCEL_COLUMNS.link1);

      if (site1 && link1) {
        competitorLinks.push({
          site: site1,
          title: title1,
          price: price1,
          url: link1
        });
      }

      // Deuxième lien concurrent
      const site2 = findColumnValue(row, DISCOUNT_EXCEL_COLUMNS.site2);
      const title2 = findColumnValue(row, DISCOUNT_EXCEL_COLUMNS.title2);
      const price2 = parsePrice(findColumnValue(row, DISCOUNT_EXCEL_COLUMNS.price2));
      const link2 = findColumnValue(row, DISCOUNT_EXCEL_COLUMNS.link2);

      if (site2 && link2) {
        competitorLinks.push({
          site: site2,
          title: title2,
          price: price2,
          url: link2
        });
      }

      return {
        reference,
        title: findColumnValue(row, DISCOUNT_EXCEL_COLUMNS.title),
        brand: findColumnValue(row, DISCOUNT_EXCEL_COLUMNS.brand),
        category: findColumnValue(row, DISCOUNT_EXCEL_COLUMNS.category),
        priceArlettie,
        priceBrand,
        competitorLinks
      };
    })
    .filter((item): item is RemiseItem => item !== null);
};