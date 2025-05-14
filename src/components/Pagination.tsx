"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginationProps {
  page: number;
  count: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

const Pagination = ({ page, count, pageSize = 10, onPageChange, onPageSizeChange }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPageSize = searchParams ? Number(searchParams.get('pageSize')) || pageSize : pageSize;
  const totalPages = Math.ceil(count / currentPageSize);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("page", newPage.toString());
    if (currentPageSize !== 10) {
      params.set("pageSize", currentPageSize.toString());
    }
    router.push(`${window.location.pathname}?${params.toString()}`);
    onPageChange?.(newPage);
  };

  const handlePageSizeChange = (newSize: number) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("pageSize", newSize.toString());
    params.set("page", "1"); // Reset to first page when changing page size
    router.push(`${window.location.pathname}?${params.toString()}`);
    onPageSizeChange?.(newSize);
  };

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
      <div className="flex items-center gap-4">
         <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Show:</span>
          <select
            value={currentPageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            className="text-sm border rounded-md px-2 py-1"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={count}>All</option>
          </select>
        </div>
        <div className="text-xs text-gray-500">
          Total: {count} rows
        </div>
      </div>
      
      {totalPages > 1 && (
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
      )}
    </div>
  );
};

export default Pagination;

