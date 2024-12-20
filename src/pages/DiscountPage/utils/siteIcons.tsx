import React from 'react';
import { Store, ShoppingBag, Package, Tag } from 'lucide-react';

export const getSiteIcon = (site: string): React.ReactNode => {
  const siteName = site.toLowerCase();

  if (siteName.includes('vinted')) {
    return <ShoppingBag className="w-5 h-5 text-teal-400" />;
  }
  
  if (siteName.includes('vestiaire')) {
    return <Package className="w-5 h-5 text-orange-400" />;
  }
  
  if (siteName.includes('videdressing')) {
    return <Tag className="w-5 h-5 text-purple-400" />;
  }

  return <Store className="w-5 h-5 text-gray-400" />;
};