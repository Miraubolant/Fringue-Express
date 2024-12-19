import React from 'react';
import { ShoppingBag, Store } from 'lucide-react';

const VENDOR_LOGOS: Record<string, React.ReactNode> = {
  'amazon': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.93 17.09c-2.71 2.05-6.66 3.14-10.05 3.14-4.76 0-9.03-1.76-12.27-4.69-.25-.23-.03-.54.28-.36 3.44 2 7.72 3.21 12.13 3.21 3.07 0 6.44-.64 9.54-1.96.47-.2.86.31.37.66z"/>
      <path d="M16.58 16.05c-.35-.45-2.31-.21-3.19-.11-.27.03-.31-.2-.07-.37 1.56-1.1 4.13-.78 4.43-.41.3.37-.08 2.93-1.54 4.16-.22.19-.44.09-.34-.16.33-.82 1.07-2.66.71-3.11z"/>
    </svg>
  ),
  'cdiscount': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
      <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
    </svg>
  ),
  'fnac': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 3v18h18V3H3zm16 16H5V5h14v14z"/>
      <path d="M7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z"/>
    </svg>
  )
};

export const getVendorLogo = (vendor: string): React.ReactNode => {
  const normalizedVendor = vendor.toLowerCase().trim();
  return VENDOR_LOGOS[normalizedVendor] || <Store className="w-6 h-6 text-gray-400" />;
};