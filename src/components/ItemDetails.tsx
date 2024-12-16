import React from 'react';
import { ExternalLink, X, Tag, Truck, Calendar } from 'lucide-react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { AnalysisResult } from '../types';
import { formatPrice } from '../utils/formatters';

interface ItemDetailsProps {
  result: AnalysisResult;
  onClose: () => void;
}

export function ItemDetails({ result, onClose }: ItemDetailsProps) {
  if (!result.shoppingLinks) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-xl">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <div>
            <Badge className="mb-2">{result.item.reference}</Badge>
            <h2 className="text-2xl font-bold text-gray-900">{result.item.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-200 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid gap-4">
            {result.shoppingLinks.map((link, index) => (
              <Card key={index} className="p-4 hover:shadow-md transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-gray-400" />
                      <h3 className="font-medium text-gray-900">{link.merchant}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{link.googleTitle}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Truck className="h-4 w-4" />
                        <span>{link.shipping}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(link.scrapingDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <p className="text-2xl font-bold text-gray-900">
                      {formatPrice(link.price)}
                    </p>
                    <a
                      href={link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                    >
                      Voir l'article
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}