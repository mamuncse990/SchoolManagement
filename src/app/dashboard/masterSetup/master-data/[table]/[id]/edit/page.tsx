"use client";

import MasterDataLayout from '@/components/masterData/MasterDataLayout';
import MasterDataForm from '@/components/masterData/MasterDataForm';

export default function EditMasterDataPage({ params }: { params: { id: string } }) {
  return (
    <MasterDataLayout>
      <h2 className="text-xl mb-4">Edit Record</h2>
      <MasterDataForm id={params.id} />
    </MasterDataLayout>
  );
}
