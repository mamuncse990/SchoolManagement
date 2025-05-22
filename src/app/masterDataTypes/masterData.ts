export interface MasterDataConfig {
  tableName: string;
  label: string;
  icon: string;
  fields: MasterDataField[];
}

export interface MasterDataField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'date'|'time' | 'select' | 'textarea' | 'checkbox' | 'radio' | 'file' | 'image' | 'email' | 'url'| 'password' | 'color' | 'tel' | 'time' | 'datetime-local' | 'month' | 'week' | 'search' | 'hidden' |'multiple' |'datetime' |'format';
  placeholder?: string;
  required?: boolean;
  format?: string;
  readOnly?: boolean;
  onCalculate?: (item: MasterDataItem) => string | number | Date;
  onChange?: (item: MasterDataItem) => void;
  options?: { label: string; value: string | number }[];
}

export interface MasterDataItem {
  id: string;
  [key: string]: any;
  createdAt?: Date;
  updatedAt?: Date;
}
