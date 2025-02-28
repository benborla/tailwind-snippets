import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow as gruvbox } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { cn } from '@/lib/utils';
import { Trash2, Loader2, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SnippetCardProps {
  title: string;
  description?: string | null;
  code: string;
  category?: string | null;
  id: number;
  onDeleteClick: (id: number) => void;
  isDeleting?: boolean;
  deletingId?: number | null;
}

type Tab = 'preview' | 'code';

const SnippetCard = ({
  title,
  description,
  code,
  category,
  id,
  onDeleteClick,
  isDeleting,
  deletingId,
}: SnippetCardProps) => {
  const [activeTab, setActiveTab] = useState<Tab>('preview');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="border bg-card text-card-foreground shadow-sm">
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={handleCopy}
            className="text-muted-foreground hover:text-primary"
            title="Copy code"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>

        <div className="mt-4 flex-grow">
          {/* Tabs */}
          <div className="border-b">
            <nav className="-mb-px flex gap-4" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('preview')}
                className={cn(
                  'py-2 text-sm font-medium transition-colors relative',
                  activeTab === 'preview'
                    ? 'text-foreground border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                Preview
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={cn(
                  'py-2 text-sm font-medium transition-colors relative',
                  activeTab === 'code'
                    ? 'text-foreground border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                Code
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="mt-4">
            {activeTab === 'preview' ? (
              <div className="rounded-md border bg-muted p-4">
                <div dangerouslySetInnerHTML={{ __html: code }} />
              </div>
            ) : (
              <div className="rounded-md overflow-hidden">
                <SyntaxHighlighter
                  language="html"
                  style={gruvbox}
                  customStyle={{
                    margin: 0,
                    borderRadius: '0.375rem',
                  }}
                >
                  {code}
                </SyntaxHighlighter>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 flex justify-between items-center">
          {category ? (
            <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
              {category}
            </span>
          ) : (
            <span /> /* Empty span to maintain layout when no category */
          )}
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onDeleteClick(id)}
            className="text-muted-foreground hover:text-destructive"
            title="Delete snippet"
            disabled={isDeleting && deletingId === id}
          >
            {isDeleting && deletingId === id ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SnippetCard; 