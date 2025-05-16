export interface MasterDataConfig {
  tableName: string;
  label: string;
  icon: string;
  fields: MasterDataField[];
}

export interface MasterDataField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'date'|'time' | 'select' | 'textarea' | 'checkbox' | 'radio' | 'file' | 'image' | 'email' | 'url'| 'password' | 'color' | 'tel' | 'time' | 'datetime-local' | 'month' | 'week' | 'search' | 'hidden';
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string | number }[];
}

export interface MasterDataItem {
  id: string;
  [key: string]: any;
  createdAt?: Date;
  updatedAt?: Date;
}
