import React from 'react';
import { ExternalLink, ShoppingBag } from 'lucide-react';
import { ShoppingLink } from '../../../types';
import { formatPrice } from '../../../utils/formatters';
import { cn } from '../../../utils/styles';

interface ShoppingLinksProps {
  links: ShoppingLink[];
}

// Logos des marchands principaux
const MERCHANT_LOGOS: Record<string, string> = {
  'amazon': 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg',
  '24S' : 'https://media.licdn.com/dms/image/v2/D4E0BAQG6lotN231RpA/company-logo_200_200/company-logo_200_200/0/1681982955348/24s_logo?e=2147483647&v=beta&t=FFL7t1fDCYURMDLWJrv53K0fa6ap_rDv1vZXSZCWlp4',
  'zalando': 'https://upload.wikimedia.org/commons/0/0b/Zalando_logo.svg',
  'asos': 'https://upload.wikimedia.org/commons/a/a8/ASOS_logo.svg',
  'galeries-lafayette': 'https://www.galerieslafayette.com/assets/images/logo.svg',
  'printemps.com': 'https://assets-prod.groupe-printemps.com/cdn/ff/Eu0oKzZ3UCT0sKli1uUKFVKhK5RdH_fn_8pu-3qLApc/1728652238/:relative:/themes/custom/printemps/logo.svg',
  'soeur': 'https://www.soeur.fr/cdn/shop/files/soeur.svg?v=1705681689&width=90',
  'maje': 'https://www.maje.com/on/demandware.static/Sites-Maje-FR-Site/-/default/dw4c7f1f31/images/logo.svg',
  'sandro': 'https://www.sandro-paris.com/on/demandware.static/-/Sites/default/dw2c27e901/logo/logo-sandro.svg',
  'claudie-pierlot': 'https://www.claudiepierlot.com/on/demandware.static/-/Sites/default/dw8e7ab635/logo/logo-cp.svg',
  'ba&sh': 'https://www.ba-sh.com/on/demandware.static/-/Sites/default/dw6a4e2f9d/logo/logo-bash.svg',
  'The Village Outlet': 'https://thevillageoutlet.com/build/theVillageOutlet/images/cityLogo.svg',
  'printemps': 'https://assets-prod.groupe-printemps.com/cdn/ff/Eu0oKzZ3UCT0sKli1uUKFVKhK5RdH_fn_8pu-3qLApc/1728652238/:relative:/themes/custom/printemps/logo.svg'
};

function getMerchantLogo(merchant: string): string | null {
  const normalizedMerchant = merchant.toLowerCase().replace(/\s+/g, '-');
  return MERCHANT_LOGOS[normalizedMerchant] || null;
}

export function ShoppingLinks({ links }: ShoppingLinksProps) {
  return (
    <div className="space-y-3 p-1">
      {links.map((link, index) => (
        <div 
          key={index} 
          className={cn(
            "bg-white dark:bg-navy-800/80 rounded-xl p-4",
            "border border-navy-200 dark:border-navy-700",
            "hover:shadow-lg hover:border-navy-300 dark:hover:border-navy-600",
            "transition-all duration-200"
          )}
        >
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-navy-50 dark:bg-navy-700 
                            flex items-center justify-center overflow-hidden p-2">
                {getMerchantLogo(link.merchant) ? (
                  <img 
                    src={getMerchantLogo(link.merchant)} 
                    alt={link.merchant}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <ShoppingBag className="w-6 h-6 text-navy-400 dark:text-navy-300" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-navy-900 dark:text-navy-100 truncate">
                    {link.merchant}
                  </span>
                  <span className={cn(
                    "px-2 py-0.5 text-xs rounded-full",
                    "bg-navy-50 dark:bg-navy-700/50",
                    "text-navy-600 dark:text-navy-300",
                    "border border-navy-200 dark:border-navy-600"
                  )}>
                    {link.shipping === 'Livraison gratuite' ? 'Gratuit' : link.shipping}
                  </span>
                </div>
                <div className="text-sm text-navy-500 dark:text-navy-400">
                  {new Date(link.scrapingDate).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-lg font-bold text-navy-900 dark:text-navy-100">
                  {formatPrice(link.price)}
                </div>
              </div>
              
              <a
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg",
                  "bg-navy-50 hover:bg-navy-100 dark:bg-navy-700/50 dark:hover:bg-navy-600/50",
                  "text-navy-600 dark:text-navy-300",
                  "transition-colors duration-200",
                  "border border-navy-200 dark:border-navy-600"
                )}
                onClick={(e) => e.stopPropagation()}
              >
                <span className="text-sm font-medium">Voir</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}