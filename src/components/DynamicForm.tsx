'use client';

import { useState, useEffect } from 'react';
import { websitesDataConfig } from '@/app/websitesDataTypes/websitesData';
import Table from '@/components/Table';

interface DynamicFormProps {
  config: websitesDataConfig;
  initialData?: any;
}

const DynamicForm = ({ config, initialData }: DynamicFormProps) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>(initialData || {});
  const [tableData, setTableData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTableData();
  }, [config.tableName]);

  const fetchTableData = async () => {
    try {
      const response = await fetch(`/api/websites/${config.tableName}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTableData(Array.isArray(data) ? data : data.data || []);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = initialData ? 'PUT' : 'POST';
      const url = initialData 
        ? `/api/websites/${config.tableName}/${initialData.id}` 
        : `/api/websites/${config.tableName}`;
        
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Data saved successfully!');
        setFormData({});
        fetchTableData(); // Refresh the table data after successful submission
      } else {
        throw new Error('Failed to save data');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Failed to save data. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Define columns based on the form fields
  const columns = config.fields.map(field => ({
    header: field.label,
    accessor: field.name,
  }));

  const renderRow = (item: any) => (
    <tr key={item.id || item._id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
      {columns.map(column => (
        <td key={column.accessor} className="p-4">
          {item[column.accessor]}
        </td>
      ))}
    </tr>
  );

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        {config.fields.map((field) => (
          <div key={field.name} className="flex flex-col">
            <label htmlFor={field.name} className="text-sm font-medium mb-1">
              {field.label}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                id={field.name}
                name={field.name}
                placeholder={field.placeholder}
                required={field.required}
                value={formData[field.name] || ''}
                onChange={handleChange}
                className="p-2 border rounded-md min-h-[100px]"
              />
            ) : (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                placeholder={field.placeholder}
                required={field.required}
                value={formData[field.name] || ''}
                onChange={handleChange}
                className="p-2 border rounded-md"
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default DynamicForm;
