export default function SnippetSkeleton() {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm animate-pulse">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-5 w-32 bg-muted rounded" />
            <div className="h-4 w-48 bg-muted rounded" />
          </div>
          <div className="h-6 w-16 bg-primary/10 rounded-md" />
        </div>

        <div className="mt-4">
          {/* Tabs */}
          <div className="border-b">
            <div className="-mb-px flex gap-4">
              <div className="h-8 w-16 bg-muted rounded" />
              <div className="h-8 w-16 bg-muted rounded" />
            </div>
          </div>

          {/* Content */}
          <div className="mt-4">
            <div className="rounded-md border bg-muted aspect-video" />
          </div>
        </div>
      </div>
    </div>
  );
} 