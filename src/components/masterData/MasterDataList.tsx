import { FC, useEffect, useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { masterDataConfigs } from "@/app/masterSetupConfig/masterDataConfig";
import { MasterDataItem } from "@/app/masterDataTypes/masterData";
import Image from "next/image";
import Pagination from "@/components/Pagination";

// Format date function
const formatDateTime = (dateStr: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }).replace(',', '');
};

// Calculate duration between two dates in HH:MM format
const calculateDuration = (startDate: string, endDate: string): string => {
  if (!startDate || !endDate) return '00:00';
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffInMinutes = Math.round((end.getTime() - start.getTime()) / (1000 * 60));
  const hours = Math.floor(diffInMinutes / 60);
  const minutes = diffInMinutes % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

interface TableSearchProps {
  value: string;
  onChange: (query: string) => void;
}

const TableSearch: FC<TableSearchProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search..."
      className="border px-2 py-1 rounded"
    />
  );
};

const MasterDataList: FC = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const table = params?.table as string;
  const [items, setItems] = useState<MasterDataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [take, setTake] = useState(5); // Change default to 5
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");
  const config = table ? masterDataConfigs[table as string] : null;

  // Add pageSize to URL params and state management
  useEffect(() => {
    if (config) {
      const currentPage = Number(searchParams?.get("page")) || 1;
      const searchQuery = searchParams?.get("q") || "";
      const pageSize = Number(searchParams?.get("pageSize")) || 5; // Change default to 5
      setPage(currentPage);
      setSearch(searchQuery);
      setTake(pageSize);
      fetchItems(currentPage, searchQuery, pageSize);
    }
  }, [config, searchParams]);

  // Update fetchItems to include pageSize
  const fetchItems = async (
    currentPage: number,
    query: string,
    pageSize: number
  ) => {
    try {
      setLoading(true);
      const response = await fetch(
        `/dashboard/masterSetup/api/master-data/${
          config?.tableName
        }?page=${currentPage}&take=${pageSize}&q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch data");
      }
      setItems(data.items);
      setCount(data.count);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update handlePageChange to include pageSize
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    params.set("page", newPage.toString());
    params.set("pageSize", take.toString());
    router.push(
      `/dashboard/masterSetup/master-data/${table}?${params.toString()}`
    );
  };

  // Add handler for page size changes
  const handlePageSizeChange = (newSize: number) => {
    setTake(newSize);
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    params.set("page", "1"); // Reset to first page when changing page size
    params.set("pageSize", newSize.toString());
    if (search) {
      params.set("q", search);
    }
    router.push(
      `/dashboard/masterSetup/master-data/${table}?${params.toString()}`
    );
  };

  // Update search handler to maintain page size
  const handleSearch = (query: string) => {
    const params = new URLSearchParams();
    params.set("page", "1");
    params.set("q", query);
    params.set("pageSize", take.toString());
    router.push(
      `/dashboard/masterSetup/master-data/${table}?${params.toString()}`
    );
  };

  const handleCreate = () => {
    router.push(`/dashboard/masterSetup/master-data/${table}/create`);
  };

  const handleEdit = (id: string) => {
    router.push(`/dashboard/masterSetup/master-data/${table}/${id}/edit`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(
        `/dashboard/masterSetup/api/master-data/${config?.tableName}/${id}`,
        {
          method: "DELETE",
        }
      );
      fetchItems(page, search, take);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  if (!config) return null;

  return (
    <div className="flex flex-col h-screen">
      <div className="p-4 lg:px-6 lg:py-6 flex-shrink-0">
        <div className="flex items-center justify-between mb-6">
          <h1 className="hidden md:flex items-center gap-2 text-lg font-semibold">
            <img src={config.icon} alt={config.label} className="w-6 h-6" />
            <span>{config?.label || "All Items"} List</span>
          </h1>
          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <TableSearch value={search} onChange={handleSearch} />
            <div className="flex items-center gap-4 self-end">
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                <Image src="/filter.png" alt="" width={14} height={14} />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                <Image src="/sort.png" alt="" width={14} height={14} />
              </button>
              <button
                onClick={handleCreate}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow"
              >
                <Image src="/create.png" alt="" width={14} height={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-hidden px-4 lg:px-6">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="h-full relative rounded-lg border border-gray-200 shadow-md">
            <div className="absolute inset-0">
              <div className="overflow-x-auto h-full">
                <table className="w-full text-sm text-left rtl:text-right">
                  <thead className="sticky top-0 bg-gray-50 z-10">
                    <tr>
                      {config.fields.map((field) => (
                        <th
                          key={field.name}
                          className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                        >
                          {field.label}
                        </th>
                      ))}
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {items.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
                      >
                        {config.fields.map((field) => (
                          <td
                            key={field.name}
                            className="px-6 py-4 whitespace-nowrap border-b border-gray-200"
                          >                            {field.type === 'datetime' ? 
                              formatDateTime(item[field.name]) :
                              field.name === 'duration' && item['startTime'] && item['endTime'] ?
                              calculateDuration(item['startTime'], item['endTime']) :
                              item[field.name]
                            }
                          </td>
                        ))}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEdit(item.id)}
                              className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky"
                            >
                              <Image
                                src="/update.png"
                                alt=""
                                width={14}
                                height={14}
                              />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple"
                            >
                              <Image
                                src="/delete.png"
                                alt=""
                                width={14}
                                height={14}
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="p-4 lg:px-6 flex-shrink-0">
        <Pagination
          page={page}
          count={count}
          pageSize={take}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>
    </div>
  );
};

export default MasterDataList;
