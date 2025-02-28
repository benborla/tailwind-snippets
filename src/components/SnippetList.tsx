'use client';

import { useState, useEffect } from 'react';
import type { snippets } from '@/db/schema';
import type { InferSelectModel } from 'drizzle-orm';
import { Copy, Check, Trash2, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { deleteSnippet } from '@/app/actions';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

type Snippet = InferSelectModel<typeof snippets>;

export default function SnippetList({ snippets }: { snippets: Snippet[] }) {
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
        setDeleteDialogOpen(false);
        router.refresh();
      }
    } catch (err) {
      console.error('Failed to delete:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!mounted) {
    return null;
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {snippets.map((snippet) => (
          <Card key={snippet.id} className="relative flex flex-col justify-between" data-list="test">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => handleCopy(snippet.code, snippet.id)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-primary"
              title="Copy code"
            >
              {copiedId === snippet.id ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
            <CardHeader className="space-y-1 pr-14">
              <div className="space-y-1">
                <CardTitle>{snippet.title}</CardTitle>
                {snippet.description && (
                  <CardDescription>{snippet.description}</CardDescription>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg overflow-hidden bg-muted">
                <div className="p-4" dangerouslySetInnerHTML={{ __html: snippet.code }} />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                {snippet.category || 'Uncategorized'}
              </span>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => {
                  setSnippetToDelete(snippet.id);
                  setDeleteDialogOpen(true);
                }}
                className="text-muted-foreground hover:text-destructive"
                title="Delete snippet"
                disabled={isDeleting && snippetToDelete === snippet.id}
              >
                {isDeleting && snippetToDelete === snippet.id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
} 