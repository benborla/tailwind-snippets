import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface SnippetControlsProps {
  pageSize: number;
  category: string;
  searchQuery: string;
  onPageSizeChange: (size: number) => void;
  onCategoryChange: (category: string) => void;
  onSearchChange: (query: string) => void;
  categories: string[];
}

export default function SnippetControls({
  pageSize,
  category,
  searchQuery,
  onPageSizeChange,
  onCategoryChange,
  onSearchChange,
  categories,
}: SnippetControlsProps) {
  const pageSizeOptions = [5, 10, 15, 20];

  return (
    <div className="mb-6">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-end">
        {/* Search Input */}
        <div className="relative w-full sm:w-[280px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search snippets..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9"
            maxLength={50}
          />
        </div>
        {/* Category Filter */}
        <Select 
          value={category}
          onValueChange={onCategoryChange}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Items Per Page */}
        <Select
          value={pageSize.toString()}
          onValueChange={(value) => onPageSizeChange(Number(value))}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Items per page" />
          </SelectTrigger>
          <SelectContent>
            {pageSizeOptions.map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size} per page
              </SelectItem>
            ))}
          </SelectContent>
        </Select>


      </div>
    </div>
  );
} 