import React, { useState } from 'react';
import { DiscountTableHeader } from './DiscountTableHeader';
import { DiscountTableRow } from './DiscountTableRow';
import { RemiseItem, SortConfig } from '../../../types/remise';
import { CartActions } from './CartActions';
import { ImagePreview } from '../../../components/ui/ImagePreview';
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll';
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner';

interface DiscountTableProps {
  items: RemiseItem[];
  sortConfig: SortConfig;
  onSort: (key: keyof RemiseItem) => void;
}

export const DiscountTable: React.FC<DiscountTableProps> = ({
  items,
  sortConfig,
  onSort
}) => {
  const [previewImage, setPreviewImage] = useState<{ src: string; alt: string } | null>(null);
  const { displayedItems, hasMore } = useInfiniteScroll(items, { itemsPerPage: 50 });

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-700/50">
        <CartActions />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <DiscountTableHeader sortConfig={sortConfig} onSort={onSort} />
          <tbody className="divide-y divide-gray-700/50">
            {displayedItems.map((item, index) => (
              <DiscountTableRow 
                key={`${item.reference}-${index}`} 
                item={item}
                index={index}
                onImageClick={(src, alt) => setPreviewImage({ src, alt })}
              />
            ))}
          </tbody>
        </table>
      </div>

      {hasMore && <LoadingSpinner />}

      {previewImage && (
        <ImagePreview
          src={previewImage.src}
          alt={previewImage.alt}
          onClose={() => setPreviewImage(null)}
        />
      )}
    </div>
  );
};