"use client";

import { useRouter } from "next/navigation";
import Filter from "./Filter";

const FilterWrapper = () => {
  const router = useRouter();

  return (
    <Filter
      onFilter={(filter) => {
        const params = new URLSearchParams(window.location.search);
        params.set("filter", filter);
        router.push(`${window.location.pathname}?${params.toString()}`);
      }}
      onSort={(sort) => {
        const params = new URLSearchParams(window.location.search);
        params.set("sort", sort);
        router.push(`${window.location.pathname}?${params.toString()}`);
      }}
    />
  );
};

export default FilterWrapper; 