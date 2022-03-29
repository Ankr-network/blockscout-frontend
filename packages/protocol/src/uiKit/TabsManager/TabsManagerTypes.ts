import { ReactNode } from 'react';

export type TabID = string | number;

export interface Tab {
  content: ReactNode;
  id: TabID;
  isDisabled?: boolean;
  title: ReactNode;
}

export interface TabsManagerProps {
  additionalContent?: ReactNode;
  initialTabID?: TabID;
  onTabSelect?: (id: TabID) => void;
  tabs: Tab[];
  title?: ReactNode;
}
