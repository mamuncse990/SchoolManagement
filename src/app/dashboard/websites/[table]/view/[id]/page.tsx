import React from 'react';
import { websitesMenuConfig } from '@/app/websitesSetupConfig/websitesMenuConfig';
import { websitesDataConfig } from '@/app/websitesDataTypes/websitesData';
import DynamicForm from '@/components/DynamicForm';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  params: {
    table: string;
    id: string;
  };
}

const WebsitesViewPage = async ({ params }: Props) => {
  const findConfig = (table: string): websitesDataConfig | null => {
    for (const key in websitesMenuConfig) {
      if (websitesMenuConfig[key].tableName === table) {
        return websitesMenuConfig[key];
      }
      if (websitesMenuConfig[key].submenu) {
        const submenuItem = websitesMenuConfig[key].submenu.find(
          (item) => item.tableName === table
        );
        if (submenuItem) {
          return {
            ...submenuItem,
            hasSubmenu: false,
            submenu: [],
          };
        }
      }
    }
    return null;
  };

  const config = findConfig(params.table);
  
  if (!config) {
    return <div>Invalid table configuration</div>;
  }
  // Fetch the item data for viewing
  let itemData = null;
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/websites/${params.table}/${params.id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }
    itemData = data;
  } catch (error) {
    console.error('Error fetching item data:', error);
  }

  if (!itemData) {
    return <div>Item not found</div>;
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">View {config.label}</h1>
        <Link 
          href={`/dashboard/websites/${params.table}`}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow"
        >
          <Image src="/expand-menu.png" alt="Back" width={16} height={16} />
        </Link>
      </div>
      <DynamicForm config={config} initialData={itemData} isViewMode={true} />
    </div>
  );
};

export default WebsitesViewPage;
