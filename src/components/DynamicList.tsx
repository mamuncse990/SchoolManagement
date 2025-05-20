"use client";

import { useState, useEffect } from "react";
import { websitesDataConfig } from "@/app/websitesDataTypes/websitesData";
import Table from "@/components/Table";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface DynamicListProps {
  config: websitesDataConfig;
}

const DynamicList = ({ config }: DynamicListProps) => {
  const [tableData, setTableData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchTableData();
  }, [config.tableName]);

  const fetchTableData = async () => {
    try {
      const response = await fetch(`/api/websites/${config.tableName}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTableData(Array.isArray(data) ? data : data.data || []);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Define columns based on the form fields
  const columns = config.fields.map((field) => ({
    header: field.label,
    accessor: field.name,
  }));

  const renderRow = (item: any) => (
    <tr
      key={item.id || item._id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      {columns.map((column) => (
        <td key={column.accessor} className="p-4">
          {item[column.accessor]}
        </td>
      ))}
      <td className="p-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleEdit(item)}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky"
          >
            <Image src="/view.png" alt="Edit" width={16} height={16} />
          </button>
          <button
            onClick={() => handleDelete(item.id || item._id)}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple"
          >
            <Image src="/delete.png" alt="Delete" width={16} height={16} />
          </button>
        </div>
      </td>
    </tr>
  );
  const handleAdd = () => {
    router.push(`/dashboard/websites/${config.tableName}/add`);
  };
  const handleEdit = (item: any) => {
    router.push(
      `/dashboard/websites/${config.tableName}/edit/${item.id || item._id}`
    );
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) {
      return;
    }

    try {
      const response = await fetch(`/api/websites/${config.tableName}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchTableData(); // Refresh the table after deletion
      } else {
        throw new Error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item. Please try again.");
    }
  };

  const filteredData = tableData.filter((item) => {
    return Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border rounded-md w-64"
          />
        </div>
        <button
          onClick={handleAdd}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow"
        >
          <Image src="/create.png" alt="" width={14} height={14} />
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-4">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <Table
            data={filteredData}
            columns={[...columns, { header: "Actions", accessor: "actions" }]}
            renderRow={renderRow}
          />
        </div>
      )}
    </div>
  );
};

export default DynamicList;
