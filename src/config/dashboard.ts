import { BarChart2, TrendingUp, Package, Users } from 'lucide-react';

export const dashboardStats = [
  { 
    name: 'Articles analysés', 
    value: '0',
    icon: Package, 
    change: 'Total', 
    changeType: 'neutral' as const
  },
  { 
    name: 'Prix moyen', 
    value: '---', 
    icon: BarChart2, 
    change: 'À venir', 
    changeType: 'neutral' as const
  },
  { 
    name: 'Marge moyenne', 
    value: '---', 
    icon: TrendingUp, 
    change: 'À venir', 
    changeType: 'neutral' as const
  },
  { 
    name: 'Vendeurs actifs', 
    value: '---', 
    icon: Users, 
    change: 'À venir', 
    changeType: 'neutral' as const
  }
];

export const dashboardFeatures = [
  {
    title: 'Tri par remise',
    description: 'Analysez vos produits en fonction des remises appliquées. Comparez les prix avec la concurrence et identifiez les meilleures opportunités.',
    icon: 'Percent',
    status: 'active' as const,
    link: '/discount',
    color: 'blue'
  },
  {
    title: 'Tri par catégorie',
    description: 'Organisez et analysez vos produits par catégorie pour une meilleure vue d\'ensemble de votre catalogue.',
    icon: 'Filter',
    status: 'active' as const,
    link: '/category',
    color: 'purple'
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