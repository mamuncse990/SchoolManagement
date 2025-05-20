import React from 'react';
import { websitesMenuConfig } from '@/app/websitesSetupConfig/websitesMenuConfig';
import { websitesDataConfig } from '@/app/websitesDataTypes/websitesData';
import DynamicList from '@/components/DynamicList';

interface Props {
  params: {
    table: string;
  };
}

const WebsitesPage = ({ params }: Props) => {
  // Find the menu item either in main menu or submenu
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
          // Return submenu item with default hasSubmenu and submenu properties
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
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{config.label}</h1>
      <DynamicList config={config} />
    </div>
  );
};

export default WebsitesPage;
