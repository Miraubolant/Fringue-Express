import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { AnalysisResult } from '../types';

export function exportToExcel(results: AnalysisResult[]) {
  const exportData = results.map(result => ({
    Référence: result.item.reference,
    Titre: result.item.title,
    'Prix Arlettie': result.item.arlettiePrice,
    'Prix Marque': result.item.brandPrice,
    'Prix Moyen': result.item.averageShoppingPrice,
    'Marge (%)': result.profitMargin.toFixed(2),
    'Nombre de revendeurs': result.shoppingLinks?.length || 0
  }));

  const ws = XLSX.utils.json_to_sheet(exportData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Analyse");
  
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
  saveAs(data, `analyse_prix_${new Date().toISOString().split('T')[0]}.xlsx`);
}