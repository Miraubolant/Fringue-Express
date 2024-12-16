import { read, utils } from 'xlsx';
import { ClothingItem, ShoppingLink } from '../types';

export async function parseExcelFiles(analysisFile: File, linksFile: File): Promise<{
  items: ClothingItem[];
  links: Record<string, ShoppingLink[]>;
}> {
  const [analysisData, linksData] = await Promise.all([
    parseFile(analysisFile),
    parseFile(linksFile)
  ]);

  const items = parseAnalysisData(analysisData);
  const links = parseLinksData(linksData);

  return { items, links };
}

async function parseFile(file: File): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = utils.sheet_to_json(worksheet);
        resolve(jsonData);
      } catch (error) {
        reject(new Error('Erreur lors de la lecture du fichier Excel'));
      }
    };
    
    reader.onerror = () => reject(new Error('Erreur lors de la lecture du fichier'));
    reader.readAsArrayBuffer(file);
  });
}

function parseAnalysisData(data: any[]): ClothingItem[] {
  return data.map(row => ({
    reference: row.Reference,
    title: row.Titre,
    arlettiePrice: Number(row['PRIX ARLETTIE']),
    brandPrice: Number(row['PRIX MARQUE']),
    averageShoppingPrice: Number(row['Moyenne Google Shopping']) || 0
  }));
}

function parseLinksData(data: any[]): Record<string, ShoppingLink[]> {
  const linksByReference: Record<string, ShoppingLink[]> = {};
  
  data.forEach(row => {
    const link: ShoppingLink = {
      reference: row.Reference,
      originalTitle: row['Titre Original'],
      googleTitle: row['Titre Google Shopping'],
      merchant: row.Merchant,
      price: Number(row.Price),
      shipping: row.Shipping,
      link: row.Link,
      scrapingDate: row['Date Scraping']
    };

    if (!linksByReference[link.reference]) {
      linksByReference[link.reference] = [];
    }
    linksByReference[link.reference].push(link);
  });

  return linksByReference;
}