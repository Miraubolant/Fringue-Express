import React from 'react';
import { FileSpreadsheet, ChevronDown } from 'lucide-react';

interface ColumnInfo {
  name: string;
  description: string;
  required: boolean;
}

interface ExcelSection {
  title: string;
  description: string;
  columns: ColumnInfo[];
}

const excelSections: ExcelSection[] = [
  {
    title: "Remise Arlettie",
    description: "Format pour l'analyse des prix",
    columns: [
      { name: "Reference/REF", description: "Référence unique du produit", required: true },
      { name: "Titre/Title", description: "Nom du produit", required: true },
      { name: "Marque/Brand", description: "Marque du produit", required: true },
      { name: "Prix Arlettie", description: "Prix de vente Arlettie", required: true },
      { name: "Prix Marque", description: "Prix public de la marque", required: true }
    ]
  },
  {
    title: "Articles Seconde Main",
    description: "Format pour la catégorisation",
    columns: [
      { name: "Titre/Title", description: "Nom du produit", required: true },
      { name: "Marque/Brand", description: "Marque du produit", required: true },
      { name: "État/State", description: "État du produit", required: true },
      { name: "Matière/Material", description: "Matière principale", required: true },
      { name: "Couleur/Color", description: "Couleur dominante", required: true },
      { name: "Prix/Price", description: "Prix de vente", required: true },
      { name: "Lien/Link/URL", description: "Lien vers le produit", required: false }
    ]
  }
];

export const ExcelHelpCard: React.FC = () => {
  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold text-white mb-4">Formats d'import Excel</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {excelSections.map((section) => (
          <details
            key={section.title}
            className="group bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden"
          >
            <summary className="flex items-center justify-between p-4 cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-emerald-500/10">
                  <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-white">{section.title}</h3>
                  <p className="text-sm text-gray-400">{section.description}</p>
                </div>
              </div>
              <ChevronDown className="w-5 h-5 text-gray-400 transform transition-transform group-open:rotate-180" />
            </summary>
            
            <div className="px-4 pb-4">
              <div className="mt-3 space-y-2">
                {section.columns.map((column) => (
                  <div 
                    key={column.name}
                    className="flex items-center justify-between p-2 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">
                        {column.name}
                      </span>
                      <span className="text-xs text-gray-400">
                        {column.description}
                      </span>
                    </div>
                    <span className={`
                      px-2 py-0.5 rounded-full text-xs font-medium
                      ${column.required 
                        ? 'bg-blue-500/10 text-blue-400' 
                        : 'bg-gray-500/10 text-gray-400'}
                    `}>
                      {column.required ? 'Requis' : 'Optionnel'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
};