import { read, utils } from 'xlsx';
import { CategoryItem } from '../../types';
import { findColumnValue } from '../../../../utils/excel';
import { CATEGORY_EXCEL_COLUMNS } from './constants';
import { parsePrice } from '../../../../utils/price';
import { normalizeState, isValidState } from './stateMapping';
import { v4 as uuidv4 } from 'uuid';

export const parseCategoryExcel = async (file: File): Promise<CategoryItem[]> => {
  const data = await file.arrayBuffer();
  const workbook = read(data);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = utils.sheet_to_json(worksheet);

  return jsonData
    .map((row: any) => {
      const title = findColumnValue(row, CATEGORY_EXCEL_COLUMNS.title);
      if (!title) return null;

      const price = parsePrice(findColumnValue(row, CATEGORY_EXCEL_COLUMNS.price));
      if (price <= 0) return null;

      const rawState = findColumnValue(row, CATEGORY_EXCEL_COLUMNS.state);
      const normalizedState = normalizeState(rawState);
      if (!isValidState(normalizedState)) return null;

      return {
        id: uuidv4(),
        title: title.substring(0, 30), // Limiter à 30 caractères
        brand: findColumnValue(row, CATEGORY_EXCEL_COLUMNS.brand),
        state: normalizedState as CategoryItem['state'],
        material: findColumnValue(row, CATEGORY_EXCEL_COLUMNS.material),
        color: findColumnValue(row, CATEGORY_EXCEL_COLUMNS.color),
        price,
        link: findColumnValue(row, CATEGORY_EXCEL_COLUMNS.link) || null
      };
    })
    .filter((item): item is CategoryItem => item !== null);
};