interface SnippetPaginationProps {
  totalSnippets: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function SnippetPagination({
  totalSnippets,
  pageSize,
  currentPage,
  onPageChange,
}: SnippetPaginationProps) {
  const totalPages = Math.ceil(totalSnippets / pageSize);
  const hasSnippets = totalSnippets > 0;

  return (
    <div className="w-full mt-8 flex flex-col items-center gap-4 pb-8">
      <p className="text-sm text-muted-foreground">
        {hasSnippets ? (
          <>
            Showing {Math.min((currentPage - 1) * pageSize + 1, totalSnippets)} to{" "}
            {Math.min(currentPage * pageSize, totalSnippets)} of {totalSnippets} snippets
          </>
        ) : (
          "No snippets found"
        )}
      </p>
      <div className="flex justify-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || !hasSnippets}
          className="px-3 py-1 rounded-md border bg-background hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || !hasSnippets}
          className="px-3 py-1 rounded-md border bg-background hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
} 