"use client";

import { useEffect, useState } from 'react';
import MasterDataLayout from '@/components/masterData/MasterDataLayout';
import MasterDataForm from '@/components/masterData/MasterDataForm';

export default function EditMasterDataPage({ params }: { params: { id: string, table: string } }) {
  const [initialData, setInitialData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/master-data/${params.table}/${params.id}`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setInitialData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.id, params.table]);

  if (isLoading) return (
    <MasterDataLayout>
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    </MasterDataLayout>
  );

  return (
    <MasterDataLayout>
      <h2 className="text-xl mb-4">Edit Record</h2>
      <MasterDataForm id={params.id} initialData={initialData} table={params.table} />
    </MasterDataLayout>
  );
}
