'use client';

import { getSnippets } from '@/app/actions';
import SnippetList from '@/components/SnippetList';
import CreateSnippetDialog from '@/components/CreateSnippetDialog';
import SnippetControls from '@/components/SnippetControls';
import SnippetPagination from '@/components/SnippetPagination';
import Footer from '@/components/Footer';
import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { snippets } from '@/db/schema';
import type { InferSelectModel } from 'drizzle-orm';
import { useQuery } from '@tanstack/react-query';

type Snippet = InferSelectModel<typeof snippets>;

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [category, setCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  // Use TanStack Query for data fetching
  const { data: snippets = [], isLoading, error, refetch } = useQuery({
    queryKey: ['snippets'],
    queryFn: async () => {
      try {
        const data = await getSnippets();
        if (!data) {
          return [];
        }
        return data;
      } catch (error) {
        console.error('Error fetching snippets:', error);
        return [];
      }
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    retry: 3,
  });

  // Log query state changes
  useEffect(() => {
    if (error) {
      console.error('Query error:', error);
    }
    console.log('Current snippets:', snippets);
    console.log('Loading state:', isLoading);
  }, [snippets, isLoading, error]);

  const handleSnippetCreated = () => {
    refetch();
  };

  const handleSnippetDeleted = () => {
    refetch();
  };

  // Get unique categories from snippets
  const categories = useMemo(() => {
    const uniqueCategories = new Set(
      snippets
        .map(s => s.category)
        .filter((category): category is string => category !== null && category !== '')
    );
    return Array.from(uniqueCategories);
  }, [snippets]);

  // Filter snippets based on category and search query
  const filteredSnippets = useMemo(() => {
    return snippets.filter(snippet => {
      const matchesCategory = category === 'all' || snippet.category === category;
      const matchesSearch = !searchQuery || 
        snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (snippet.description?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        snippet.code.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [snippets, category, searchQuery]);

  // Get current page snippets
  const currentSnippets = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredSnippets.slice(startIndex, endIndex);
  }, [filteredSnippets, currentPage, pageSize]);

  // Reset to first page when filters change
  const handleFiltersChange = (newCategory: string) => {
    setCurrentPage(1);
    setCategory(newCategory);
  };

  const handleSearchChange = (query: string) => {
    setCurrentPage(1);
    setSearchQuery(query);
  };

  const handlePageSizeChange = (size: number) => {
    setCurrentPage(1);
    setPageSize(size);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 px-4 py-8 md:px-8">
        <div className="container max-w-6xl mx-auto flex flex-col min-h-[calc(100vh-8rem)] space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Tailwind Snippets</h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-2">A collection of reusable Tailwind CSS components</p>
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto justify-center sm:justify-end">
              <CreateSnippetDialog onSnippetCreated={handleSnippetCreated} />
            </div>
          </div>

          <SnippetControls
            total={filteredSnippets.length}
            pageSize={pageSize}
            currentPage={currentPage}
            startIndex={(currentPage - 1) * pageSize}
            endIndex={Math.min((currentPage - 1) * pageSize + pageSize, filteredSnippets.length)}
            onPageChange={setCurrentPage}
            onPageSizeChange={handlePageSizeChange}
            category={category}
            onCategoryChange={handleFiltersChange}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            categories={categories}
          />

          <div className="flex-grow">
            <SnippetList 
              snippets={currentSnippets} 
              isLoading={isLoading} 
              onSnippetDeleted={handleSnippetDeleted}
            />
          </div>

          <SnippetPagination
            totalSnippets={filteredSnippets.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
