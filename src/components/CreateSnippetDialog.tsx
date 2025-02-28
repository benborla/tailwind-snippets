'use client';

import { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createSnippet } from '@/app/actions';
import { useRouter } from 'next/navigation';
import CodeEditor from './CodeEditor';
import { trackSnippetEvent } from './providers/posthog-provider';

interface CreateSnippetDialogProps {
  onSnippetCreated: () => void;
}

export default function CreateSnippetDialog({ onSnippetCreated }: CreateSnippetDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      code: code,
      category: formData.get('category') as string,
    };

    try {
      const result = await createSnippet(data);
      if (result.success && result.id) {
        trackSnippetEvent('create', result.id.toString(), {
          title: data.title,
          category: data.category,
          has_description: !!data.description,
        });
      }
      setOpen(false);
      onSnippetCreated();
      e.currentTarget.reset();
      setCode('');
    } catch (error) {
      console.error('Failed to create snippet:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          New Snippet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Snippet</DialogTitle>
            <DialogDescription>
              Add a new Tailwind CSS snippet to your collection.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Button with icon"
                required
                className="col-span-3"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                placeholder="buttons"
                className="col-span-3"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                placeholder="A beautiful button with an icon..."
                className="col-span-3"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="code">Code</Label>
              <CodeEditor
                onChange={setCode}
                initialValue={code}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !code.trim()}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 