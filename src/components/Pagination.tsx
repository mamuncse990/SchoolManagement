"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginationProps {
  page: number;
  count: number;
  onPageChange?: (page: number) => void;
}

const Pagination = ({ page, count, onPageChange }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(count / 10);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("page", newPage.toString());
    router.push(`${window.location.pathname}?${params.toString()}`);
    onPageChange?.(newPage);
  };

  if (totalPages <= 1) return null;

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 4) {
      // Show all pages if 4 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let start = 1;
      let end = 3;
      if (page > 2) {
        start = page - 1;
        end = page + 1;
        if (end > totalPages - 1) {
          end = totalPages - 1;
          start = end - 2;
        }
      }
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (end < totalPages - 1) {
        pages.push('...');
      }
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-col items-center gap-2 mt-4">
      <div className="text-xs text-gray-500">
        Total: {count} rows
      </div>
      <div className="flex items-center justify-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => handlePageChange(1)}
          disabled={page === 1}
          className="h-8 w-8 flex items-center justify-center"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="h-8 w-8 flex items-center justify-center"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        {getPageNumbers().map((pageNum, index) => (
          pageNum === '...' ? (
            <span key={`ellipsis-${index}`} className="px-2">...</span>
          ) : (
            <Button
              key={pageNum}
              variant={pageNum === page ? "default" : "outline"}
              size="sm"
              onClick={() => handlePageChange(pageNum as number)}
              className={`h-8 w-8 ${
                pageNum === page ? "bg-primary text-primary-foreground" : ""
              }`}
            >
              {pageNum}
            </Button>
          )
        ))}
        
        <Button
          variant="outline"
          size="icon"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="h-8 w-8 flex items-center justify-center"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handlePageChange(totalPages)}
          disabled={page === totalPages}
          className="h-8 w-8 flex items-center justify-center"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;

