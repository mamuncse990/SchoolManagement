"use client";

import { useState } from "react";
import Image from "next/image";

type FilterProps = {
  onFilter: (filter: string) => void;
  onSort: (sort: string) => void;
};

const Filter = ({ onFilter, onSort }: FilterProps) => {
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);

  const filters = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];

  const sortOptions = [
    { label: "Name (A-Z)", value: "name-asc" },
    { label: "Name (Z-A)", value: "name-desc" },
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
  ];

  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <button
          onClick={() => {
            setShowFilter(!showFilter);
            setShowSort(false);
          }}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow"
        >
          <Image src="/filter.png" alt="" width={14} height={14} />
        </button>
        {showFilter && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
            {filters.map((filter) => (
              <div
                key={filter.value}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => {
                  onFilter(filter.value);
                  setShowFilter(false);
                }}
              >
                {filter.label}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="relative">
        <button
          onClick={() => {
            setShowSort(!showSort);
            setShowFilter(false);
          }}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow"
        >
          <Image src="/sort.png" alt="" width={14} height={14} />
        </button>
        {showSort && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
            {sortOptions.map((option) => (
              <div
                key={option.value}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => {
                  onSort(option.value);
                  setShowSort(false);
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter; 