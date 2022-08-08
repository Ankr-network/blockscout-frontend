import { ReactNode } from 'react';

export type DefaultTabID = string | number;
export type TabID<TI> = TI extends DefaultTabID ? TI : DefaultTabID;

export interface Tab<TI = DefaultTabID> {
  content?: ReactNode;
  id: TabID<TI>;
  isDisabled?: boolean;
  onSelect?: () => void;
  title: ReactNode;
}

export interface TabsManagerProps<TI = DefaultTabID> {
  additionalContent?: ReactNode;
  className?: string;
  selectedTab?: Tab<TI>;
  tabs: Tab<TI>[];
  title?: ReactNode;
}
