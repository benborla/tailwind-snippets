'use client';

import { useState, useEffect } from 'react';
import type { snippets } from '@/db/schema';
import type { InferSelectModel } from 'drizzle-orm';
import { Copy, Check, Trash2, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { deleteSnippet } from '@/app/actions';
import SnippetSkeleton from './SnippetSkeleton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import SnippetCard from './SnippetCard';
import { trackSnippetEvent } from './providers/posthog-provider';

interface SnippetListProps {
  snippets: InferSelectModel<typeof snippets>[];
  isLoading: boolean;
  onSnippetDeleted: () => void;
}

export default function SnippetList({ snippets, isLoading, onSnippetDeleted }: SnippetListProps) {
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [snippetToDelete, setSnippetToDelete] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopy = async (code: string, id: number) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDelete = async () => {
    if (!snippetToDelete) return;
    
    try {
      setIsDeleting(true);
      const result = await deleteSnippet(snippetToDelete);
      if (result.success) {
        trackSnippetEvent('delete', snippetToDelete.toString());
        setDeleteDialogOpen(false);
        onSnippetDeleted();
      }
    } catch (err) {
      console.error('Failed to delete:', err);
    } finally {
      setIsDeleting(false);
      setSnippetToDelete(null);
    }
  };

  const handleDeleteClick = (id: number) => {
    setSnippetToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleView = (id: number) => {
    trackSnippetEvent('view', id.toString());
  };

  if (!mounted) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <SnippetSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (snippets.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No snippets found</p>
      </div>
    );
  }

  return (
    <>
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Snippet</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this snippet? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setDeleteDialogOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {snippets.map((snippet) => (
          <SnippetCard
            key={snippet.id}
            id={snippet.id}
            title={snippet.title}
            description={snippet.description}
            code={snippet.code}
            category={snippet.category}
            onDeleteClick={handleDeleteClick}
            isDeleting={isDeleting}
            deletingId={snippetToDelete}
            onView={() => handleView(snippet.id)}
          />
        ))}
      </div>
    </>
  );
} 