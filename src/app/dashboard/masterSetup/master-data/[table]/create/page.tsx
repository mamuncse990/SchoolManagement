"use client";

import MasterDataLayout from '@/components/masterData/MasterDataLayout';
import MasterDataForm from '@/components/masterData/MasterDataForm';

export default function CreateMasterDataPage() {
  return (
    <MasterDataLayout>
      <h2 className="text-xl mb-4">Create New Record</h2>
      <MasterDataForm />
    </MasterDataLayout>
  );
}
