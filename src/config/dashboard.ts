import { Building, Filter, Database, Percent } from 'lucide-react';

export const dashboardStats = [
  { 
    name: 'Articles Vinted / Vestiaire Collectif', 
    value: '0', 
    icon: Filter, 
    change: 'Total', 
    changeType: 'neutral' as const
  },
  { 
    name: 'Articles Arlettie', 
    value: '0', 
    icon: Percent, 
    change: 'Total', 
    changeType: 'neutral' as const
  },
  { 
    name: 'Marques', 
    value: '0', 
    icon: Building, 
    change: 'Total', 
    changeType: 'neutral' as const
  }
];

export const dashboardFeatures = [
  {
    title: 'Articles Seconde Main',
    description: 'Organisez et analysez vos produits Vinted et Vestiaire Collectif.',
    icon: 'Filter',
    status: 'active' as const,
    link: '/category',
    color: 'purple',
    helpTitle: 'Format Excel requis',
    helpSections: [
      {
        title: 'Catégorisation',
        columns: [
          { name: 'Titre/Title', required: true },
          { name: 'Marque/Brand', required: true },
          { name: 'État/State', required: true },
          { name: 'Matière/Material', required: true },
          { name: 'Couleur/Color', required: true },
          { name: 'Prix/Price', required: true },
          { name: 'Statut/Status', required: true },
          { name: 'Lien/Link/URL', required: false }
        ]
      }
    ]
  },
  {
    title: 'Remise Arlettie',
    description: 'Analysez vos produits en fonction des remises et optimisez vos marges.',
    icon: 'Percent',
    status: 'active' as const,
    link: '/discount',
    color: 'blue',
    helpTitle: 'Format Excel requis',
    helpSections: [
      {
        title: 'Analyse des prix',
        columns: [
          { name: 'Reference/REF', required: true },
          { name: 'Titre/Title', required: true },
          { name: 'Marque/Brand', required: true },
          { name: 'Prix Arlettie', required: true },
          { name: 'Prix Marque', required: true }
        ]
      }
    ]
  },
  {
    title: 'Données brutes',
    description: 'Accédez à l\'ensemble de vos données d\'analyse pour des études plus approfondies.',
    icon: 'Database',
    status: 'active' as const,
    link: '/data',
    color: 'emerald'
  }
];