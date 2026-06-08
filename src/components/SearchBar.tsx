import { Search, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string, sort: string, order: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('stars');
  const [order, setOrder] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query, sort, order);
    }
  };

  return (
    <div className="w-full max-w-4xl">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search GitHub packages..."
              className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none text-gray-900 placeholder-gray-500"
            />
          </div>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
          >
            <SlidersHorizontal className="w-5 h-5 text-gray-700" />
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {showFilters && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-md border border-gray-200">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort by
              </label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="stars">Stars</option>
                <option value="forks">Forks</option>
                <option value="updated">Recently Updated</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order
              </label>
              <select
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
