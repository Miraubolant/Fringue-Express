import React from 'react';
import { Truck, Tag, Calendar } from 'lucide-react';
import { PriceLink } from '../../types';
import { formatPrice } from '../../../../utils/format';
import { getVendorLogo } from '../../utils/vendorLogos';
import { LinkButton } from '../../../../components/ui/LinkButton';

interface ExpandedDetailsProps {
  links: PriceLink[];
}

export const ExpandedDetails: React.FC<ExpandedDetailsProps> = ({ links }) => {
  return (
    <div className="grid gap-2 grid-cols-1 lg:grid-cols-2">
      {links.map((link, index) => (
        <div 
          key={index}
          className="flex items-center gap-3 bg-gray-700/30 rounded-lg p-3 hover:bg-gray-700/40 transition-colors duration-200"
        >
          {/* Logo */}
          <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-gray-600/50 p-2 flex items-center justify-center">
            {getVendorLogo(link.source)}
          </div>

          {/* Informations */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-3 mb-1.5">
              <h4 className="text-sm font-medium text-gray-200 truncate">
                {link.source}
              </h4>
              <LinkButton href={link.url} />
            </div>

            {/* Prix et détails */}
            <div className="flex flex-wrap gap-2 text-sm">
              {link.price && (
                <div className="flex items-center gap-1.5">
                  <Tag className="h-3.5 w-3.5 text-blue-400" />
                  <span className="font-medium text-white">
                    {formatPrice(link.price)}
                  </span>
                  {link.originalPrice && link.originalPrice > link.price && (
                    <>
                      <span className="text-gray-400 line-through ml-1">
                        {formatPrice(link.originalPrice)}
                      </span>
                      <span className="text-xs px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-400 ml-1">
                        -{Math.round((1 - link.price / link.originalPrice) * 100)}%
                      </span>
                    </>
                  )}
                </div>
              )}

              {link.shipping && (
                <div className="flex items-center gap-1.5">
                  <Truck className={`h-3.5 w-3.5 ${link.isFreeShipping ? 'text-green-400' : 'text-gray-400'}`} />
                  <span className={link.isFreeShipping ? 'text-green-400' : 'text-gray-300'}>
                    {link.isFreeShipping ? 'Gratuite' : (
                      link.shippingCost ? `+${formatPrice(link.shippingCost)}` : link.shipping
                    )}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};