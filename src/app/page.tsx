import { getSnippets } from '@/db';
import SnippetList from '@/components/SnippetList';
import CreateSnippetDialog from '@/components/CreateSnippetDialog';
import ModeToggle from '@/components/mode-toggle';

export default async function Home() {
  const snippets = await getSnippets();

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tailwind Snippets</h1>
            <p className="text-muted-foreground mt-2">A collection of reusable Tailwind CSS components</p>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <CreateSnippetDialog />
          </div>
        </div>
        <SnippetList snippets={snippets} />
      </div>
    </main>
  );
}
