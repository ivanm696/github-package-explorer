import { useState, useEffect } from 'react';
import { Package, TrendingUp, Loader2 } from 'lucide-react';
import { GitHubPackage, SearchParams } from './types/package';
import { GitHubService } from './services/github';
import { SearchBar } from './components/SearchBar';
import { PackageCard } from './components/PackageCard';
import { PackageDetails } from './components/PackageDetails';

function App() {
  const [packages, setPackages] = useState<GitHubPackage[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<GitHubPackage | null>(null);
  const [view, setView] = useState<'trending' | 'search'>('trending');

  useEffect(() => {
    loadTrendingPackages();
  }, []);

  const loadTrendingPackages = async () => {
    setLoading(true);
    try {
      const trending = await GitHubService.getTrendingPackages();
      setPackages(trending);
      setView('trending');
    } catch (error) {
      console.error('Error loading trending packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string, sort: string, order: string) => {
    setLoading(true);
    try {
      const params: SearchParams = {
        query,
        sort: sort as 'stars' | 'forks' | 'updated',
        order: order as 'asc' | 'desc',
      };
      const results = await GitHubService.searchPackages(params);
      setPackages(results);
      setView('search');
    } catch (error) {
      console.error('Error searching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-600 p-3 rounded-lg">
              <Package className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">GitHub Package Downloader</h1>
              <p className="text-gray-600">Discover and download GitHub repositories</p>
            </div>
          </div>
          <SearchBar onSearch={handleSearch} />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            {view === 'trending' ? (
              <>
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Trending Packages</h2>
              </>
            ) : (
              <h2 className="text-2xl font-bold text-gray-900">Search Results</h2>
            )}
          </div>
          {view === 'search' && (
            <button
              onClick={loadTrendingPackages}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              View Trending
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          </div>
        ) : packages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                package={pkg}
                onViewDetails={setSelectedPackage}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No packages found</p>
          </div>
        )}
      </main>

      {selectedPackage && (
        <PackageDetails
          package={selectedPackage}
          onClose={() => setSelectedPackage(null)}
        />
      )}
    </div>
  );
}

export default App;
