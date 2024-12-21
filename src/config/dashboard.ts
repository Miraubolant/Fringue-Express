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
    description: 'Analysez et gérez vos articles Vinted et Vestiaire Collectif. Importez vos données, filtrez par marque, état, matière et couleur. Suivez les prix et les tendances du marché de la seconde main.',
    icon: 'Filter',
    status: 'active' as const,
    link: '/category',
    color: 'purple'
  },
  {
    title: 'Remise Arlettie',
    description: 'Optimisez vos marges en analysant les prix Arlettie. Simulez différents pourcentages de remise, comparez avec les prix marque et identifiez les meilleures opportunités de vente.',
    icon: 'Percent',
    status: 'active' as const,
    link: '/discount',
    color: 'blue'
  },
  {
    title: 'Données brutes',
    description: 'Accédez à l\'ensemble de vos données d\'analyse pour des études plus approfondies. Exportez vos données, créez des rapports personnalisés et suivez l\'évolution de vos performances.',
    icon: 'Database',
    status: 'active' as const,
    link: '/data',
    color: 'emerald'
  }
];