export enum TextBoxType {
  Password = 'password',
  Number = 'number',
  Currency = 'currency',
  None = '',
}

export enum IconType {
  Trash = 'Trash',
  Plus = 'Plus',
  Minus = 'Minus',
  Check = 'Check',
  X = 'X',
  Edit = 'Edit',
  RightArrowShort = 'RightArrowShort',
  LeftArrowShort = 'LeftArrowShort',
  DownArrowShort = 'DownArrowShort',
  UpArrowShort = 'UpArrowShort',
}

export enum SidebarOption {
  // fill in here to use sidebar/header component
}

export type EventSchema = { [key: string]: 'S' | 'N' | 'D' | 'I' | 'B' | 'T' | { [key: string]: string } | string[] }; // string obj/array for select

export interface Toast {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  id: number;
  duration: number,
  active?: boolean;
}

// most of my sites use dynamo DB with id and clientId - feel free to modify
export interface DynamoItem {
    id: string,
    clientId: string,
}
