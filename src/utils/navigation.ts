interface PageInfo {
  title: string;
  subtitle: string;
}

export const getPageTitle = (pathname: string): PageInfo => {
  switch (pathname) {
    case '/dashboard':
      return {
        title: '✨ Tableau de bord',
        subtitle: "Vue d'ensemble de vos analyses et statistiques"
      };
    case '/discount':
      return {
        title: '🎯 Remise Arlettie',
        subtitle: 'Optimisez vos marges et maximisez vos profits'
      };
    case '/category':
      return {
        title: '📊 Articles Seconde Main',
        subtitle: 'Analysez vos articles Vinted et Vestiaire Collectif'
      };
    case '/data':
      return {
        title: '📈 Données & Analyses',
        subtitle: 'Explorez et exportez vos données brutes'
      };
    default:
      return {
        title: '',
        subtitle: ''
      };
  }
};