export interface websitesDataConfig {  tableName: string;
  label: string;
  icon: string;
  path?: string;
  hasSubmenu: boolean;
  fields: any[];
  submenu: {
    tableName: string;
    label: string;
    path?: string;
    icon: string;
    fields: Array<{
      name: string;
      label: string;
      type: string;
      placeholder: string;
      required: boolean;
    }>;
  }[];
}

export interface WebsitesDataField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'date'|'time' | 'select' | 'textarea' | 'checkbox' | 'radio' | 'file' | 'image' | 'email' | 'url'| 'password' | 'color' | 'tel' | 'time' | 'datetime-local' | 'month' | 'week' | 'search' | 'hidden' |'multiple';
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string | number }[];
}

export interface WebsitesDataItem {
  id: string;
  [key: string]: any;
  createdAt?: Date;
  updatedAt?: Date;
}
