import { read, utils } from 'xlsx';
import { CategoryItem } from '../../types';
import { findColumnValue } from '../../../../utils/excel';
import { CATEGORY_EXCEL_COLUMNS } from './constants';
import { parsePrice } from '../../../../utils/price';
import { normalizeState, isValidState } from './stateMapping';
import { normalizeMaterial } from '../materialNormalizer';
import { normalizeColor } from '../colorNormalizer';
import { v4 as uuidv4 } from 'uuid';

export const parseCategoryExcel = async (files: FileList): Promise<CategoryItem[]> => {
  const allItems: CategoryItem[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const data = await file.arrayBuffer();
    const workbook = read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = utils.sheet_to_json(worksheet);

    const items = jsonData
      .map((row: any) => {
        const title = findColumnValue(row, CATEGORY_EXCEL_COLUMNS.title);
        if (!title) return null;

        const price = parsePrice(findColumnValue(row, CATEGORY_EXCEL_COLUMNS.price));
        if (price <= 0) return null;

        const rawState = findColumnValue(row, CATEGORY_EXCEL_COLUMNS.state);
        const normalizedState = normalizeState(rawState);
        if (!isValidState(normalizedState)) return null;

        // Normaliser la matière et la couleur
        const rawMaterial = findColumnValue(row, CATEGORY_EXCEL_COLUMNS.material);
        const normalizedMaterial = normalizeMaterial(rawMaterial);

        const rawColor = findColumnValue(row, CATEGORY_EXCEL_COLUMNS.color);
        const normalizedColor = normalizeColor(rawColor);

        return {
          id: uuidv4(),
          title: title.substring(0, 100),
          brand: findColumnValue(row, CATEGORY_EXCEL_COLUMNS.brand),
          state: normalizedState as CategoryItem['state'],
          material: normalizedMaterial,
          color: normalizedColor,
          price,
          link: findColumnValue(row, CATEGORY_EXCEL_COLUMNS.link) || null,
          status: findColumnValue(row, CATEGORY_EXCEL_COLUMNS.status) || null
        };
      })
      .filter((item): item is CategoryItem => item !== null);

    allItems.push(...items);
  }

  return allItems;
};