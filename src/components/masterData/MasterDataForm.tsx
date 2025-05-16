import { FC, useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { masterDataConfigs } from '@/app/masterSetupConfig/masterDataConfig';
import { MasterDataItem } from '@/app/masterDataTypes/masterData';

interface MasterDataFormProps {
  id?: string;
}

const MasterDataForm: FC<MasterDataFormProps> = ({ id }) => {
  const router = useRouter();
  const params = useParams();
  const table = params?.table as string;
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const config = table ? masterDataConfigs[table as string] : null;

  useEffect(() => {
    if (id && config) {
      fetchItem();
    }
  }, [id, config]);

  const fetchItem = async () => {
    try {      const response = await fetch(`/api/master-data/${config?.tableName}/${id}`);
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error('Error fetching item:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = id
        ? `/api/master-data/${config?.tableName}/${id}`
        : `/api/master-data/${config?.tableName}`;
      
      const response = await fetch(url, {
        method: id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push(`/dashboard/masterSetup/master-data/${table}`);
      }
    } catch (error) {
      console.error('Error saving item:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (!config) return null;

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      {config.fields.map((field) => (
        <div key={field.name} className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {field.label}
          </label>
          {field.type === 'textarea' ? (
            <textarea
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              required={field.required}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          ) : field.type === 'select' ? (
            <select
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              required={field.required}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select {field.label}</option>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              required={field.required}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          )}
        </div>
      ))}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Saving...' : id ? 'Update' : 'Create'}
        </button>
        <button
          type="button"
          onClick={() => router.push(`/dashboard/masterSetup/master-data/${table}`)}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default MasterDataForm;
