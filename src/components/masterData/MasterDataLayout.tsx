import { FC, ReactNode } from 'react';
import { useParams } from 'next/navigation';
import { masterDataConfigs } from '@/app/masterSetupConfig/masterDataConfig';

interface MasterDataLayoutProps {
  children: ReactNode;
}

const MasterDataLayout: FC<MasterDataLayoutProps> = ({ children }) => {
  const params = useParams();
  const table = params?.table as string;
  const config = table ? masterDataConfigs[table] : null;

  if (!config) {
    return <div>Invalid table configuration</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <img src={config.icon} alt={config.label} className="w-6 h-6" />
        {config.label}
      </h1>
      {children}
    </div>
  );
};

export default MasterDataLayout;
