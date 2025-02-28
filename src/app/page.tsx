'use client';

import { getSnippets } from '@/app/actions';
import SnippetList from '@/components/SnippetList';
import CreateSnippetDialog from '@/components/CreateSnippetDialog';
import SnippetControls from '@/components/SnippetControls';
import SnippetPagination from '@/components/SnippetPagination';
import Footer from '@/components/Footer';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import type { snippets } from '@/db/schema';
import type { InferSelectModel } from 'drizzle-orm';

type Snippet = InferSelectModel<typeof snippets>;

export default function Home() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [category, setCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSnippetCreated = () => {
    setIsLoading(true);
    fetchSnippets();
  };

  const handleSnippetDeleted = () => {
    setIsLoading(true);
    fetchSnippets();
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
    // console.log('Filtering snippets:', { 
    //   total: snippets.length, 
    //   category, 
    //   searchQuery 
    // });
    
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
    // console.log('Pagination:', { 
    //   total: filteredSnippets.length, 
    //   startIndex, 
    //   endIndex, 
    //   pageSize, 
    //   currentPage 
    // });
    
    return filteredSnippets.slice(startIndex, endIndex);
  }, [filteredSnippets, currentPage, pageSize]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [category, searchQuery, pageSize]);

  const fetchSnippets = async () => {
    try {
      setIsLoading(true);
      const data = await getSnippets();
      console.log('Fetched snippets:', data.length);
      setSnippets(data);
    } catch (error) {
      console.error('Error fetching snippets:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSnippets();
  }, []);

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
            pageSize={pageSize}
            category={category}
            searchQuery={searchQuery}
            onPageSizeChange={setPageSize}
            onCategoryChange={setCategory}
            onSearchChange={setSearchQuery}
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
