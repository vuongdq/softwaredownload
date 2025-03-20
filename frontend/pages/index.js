import { useState } from 'react';
import useSWR from 'swr';
import SoftwareCard from '../components/public/SoftwareCard';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const fetcher = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || 'API Error');
    }
    return data;
  } catch (error) {
    console.error('Fetch error:', error, 'URL:', url);
    throw error;
  }
};

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: categories, error: categoryError } = useSWR('/api/categories', fetcher);
  const { data: software, error: softwareError } = useSWR(
    `/api/software?category=${selectedCategory}&page=${currentPage}&search=${searchTerm}`,
    fetcher
  );

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  if (categoryError) {
    console.error('Category error:', categoryError);
    return <div className="text-center py-12 text-red-600">Error loading categories: {categoryError.message}</div>;
  }

  if (softwareError) {
    console.error('Software error:', softwareError);
    return <div className="text-center py-12 text-red-600">Error loading software: {softwareError.message}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Software Downloads</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Search and Filter */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <form onSubmit={handleSearch} className="md:col-span-2">
            <div className="flex">
              <input
                type="text"
                placeholder="Search software..."
                className="input rounded-r-none flex-1"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="btn btn-primary rounded-l-none"
              >
                Search
              </button>
            </div>
          </form>
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="input appearance-none pr-10 w-full"
            >
              <option value="">All Categories</option>
              {categories?.data?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Software Grid */}
        {software?.data?.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">
              No software found
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Try adjusting your search or filter to find what you're looking
              for.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {software?.data?.map((item) => (
              <SoftwareCard key={item._id} software={item} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {software?.total > 0 && (
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="btn btn-secondary"
              >
                Previous
              </button>
              <span className="px-4 py-2">
                Page {currentPage} of {Math.ceil(software.total / 10)}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((p) =>
                    Math.min(p + 1, Math.ceil(software.total / 10))
                  )
                }
                disabled={currentPage === Math.ceil(software.total / 10)}
                className="btn btn-secondary"
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </main>
    </div>
  );
} 