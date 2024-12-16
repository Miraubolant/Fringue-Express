import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { DropZone } from './components/DropZone';
import { AnalysisTable } from './components/AnalysisTable';
import { FilterBar } from './components/analysis/FilterBar';
import { CartModal } from './components/cart/CartModal';
import { parseExcelFiles } from './utils/excelParser';
import { useCart } from './hooks/useCart';
import { AnalysisResult } from './types';

function App() {
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDropZone, setShowDropZone] = useState(true);
  const [arlettieDiscount, setArlettieDiscount] = useState(0);
  const [filters, setFilters] = useState({
    price: '',
    sort: 'margin-desc',
    search: ''
  });

  const { 
    items: cartItems, 
    isCartOpen, 
    addToCart, 
    removeFromCart, 
    updatePrices,
    toggleCart, 
    closeCart 
  } = useCart();

  // Mettre à jour les prix du panier quand la réduction change
  useEffect(() => {
    updatePrices(arlettieDiscount);
  }, [arlettieDiscount]);

  const handleFiles = async (files: File[]) => {
    if (files.length !== 2) {
      setError('Veuillez sélectionner deux fichiers Excel');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const analysisFile = files.find(f => f.name.includes('analyse_prix'));
      const linksFile = files.find(f => f.name.includes('liens_shopping'));
      
      if (!analysisFile || !linksFile) {
        throw new Error('Veuillez fournir les fichiers "analyse_prix" et "liens_shopping"');
      }

      const { items, links } = await parseExcelFiles(analysisFile, linksFile);
      
      const analysisResults: AnalysisResult[] = items.map(item => ({
        item,
        profitMargin: ((item.averageShoppingPrice - item.arlettiePrice) / item.arlettiePrice) * 100,
        shoppingLinks: links[item.reference] || []
      }));

      setResults(analysisResults);
      setShowDropZone(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (type: string, value: string) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  const handleSortChange = (sort: string) => {
    setFilters(prev => ({ ...prev, sort }));
  };

  const handleSearchChange = (search: string) => {
    setFilters(prev => ({ ...prev, search }));
  };

  const handleDiscountChange = (discount: number) => {
    setArlettieDiscount(discount);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-navy-900 transition-colors">
      <Header />
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {showDropZone ? (
            <DropZone
              onFilesAccepted={handleFiles}
              multiple={true}
              accept={{
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
                'application/vnd.ms-excel': ['.xls']
              }}
            />
          ) : (
            <>
              <FilterBar 
                onFilterChange={handleFilterChange}
                onSortChange={handleSortChange}
                onSearchChange={handleSearchChange}
                arlettieDiscount={arlettieDiscount}
                onDiscountChange={handleDiscountChange}
                cartItemCount={cartItems.length}
                onCartClick={toggleCart}
                filters={filters}
              />
              <AnalysisTable 
                results={results}
                arlettieDiscount={arlettieDiscount}
                filters={filters}
                onAddToCart={addToCart}
                onRemoveFromCart={removeFromCart}
                cartItems={cartItems}
              />
            </>
          )}
          
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600 mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Analyse en cours...</p>
            </div>
          )}

          {error && (
            <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 border border-red-200 dark:border-red-800">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}
        </div>
      </main>

      <CartModal
        isOpen={isCartOpen}
        onClose={closeCart}
        items={cartItems}
        onRemoveItem={removeFromCart}
      />
    </div>
  );
}

export default App;