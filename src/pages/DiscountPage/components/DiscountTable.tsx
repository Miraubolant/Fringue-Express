import React, { useState } from 'react';
import { DiscountTableHeader } from './DiscountTableHeader';
import { DiscountTableRow } from './DiscountTableRow';
import { RemiseItem, SortConfig } from '../../../types/remise';
import { CartActions } from './CartActions';
import { Pagination } from '../../../components/ui/Pagination';
import { usePagination } from '../../../hooks/usePagination';
import { ImagePreview } from '../../../components/ui/ImagePreview';

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
  
  const {
    currentPage,
    totalPages,
    paginatedItems,
    setPage
  } = usePagination(items, { itemsPerPage: 50 });

  return (
    <>
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-700/50">
          <CartActions />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <DiscountTableHeader sortConfig={sortConfig} onSort={onSort} />
            <tbody className="divide-y divide-gray-700/50">
              {paginatedItems.map((item, index) => (
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

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <ImagePreview
          src={previewImage.src}
          alt={previewImage.alt}
          onClose={() => setPreviewImage(null)}
        />
      )}
    </>
  );
};