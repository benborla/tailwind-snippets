'use client';

import { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createSnippet } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import CodeEditor from './CodeEditor';

export default function CreateSnippetDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    code: '',
    category: '',
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsCreating(true);
      await createSnippet(formData);
      setFormData({
        title: '',
        description: '',
        code: '',
        category: '',
      });
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error('Error creating snippet:', error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
          <Plus className="h-5 w-5" />
          New Snippet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl bg-background border">
        <DialogHeader className="relative">
          <DialogTitle className="text-xl">Create New Snippet</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Add a new Tailwind CSS snippet to your collection. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  setFormData({ ...formData, title: e.target.value })
                }
                className="col-span-3"
                required
                disabled={isCreating}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => 
                  setFormData({ ...formData, description: e.target.value })
                }
                className="col-span-3"
                rows={3}
                disabled={isCreating}
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="code" className="text-right">
                Code
              </Label>
              <div className="col-span-3">
                <CodeEditor
                  onChange={(text: string) => setFormData({ ...formData, code: text })}
                  initialValue={formData.code}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  setFormData({ ...formData, category: e.target.value })
                }
                className="col-span-3"
                disabled={isCreating}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isCreating}>
              {isCreating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Snippet'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 