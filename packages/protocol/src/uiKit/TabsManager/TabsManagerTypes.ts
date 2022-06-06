import { ReactNode } from 'react';

export type DefaultTabID = string | number;
export type TabID<TI> = TI extends DefaultTabID ? TI : DefaultTabID;

export interface Tab<TI = DefaultTabID> {
  content?: ReactNode;
  id: TabID<TI>;
  isDisabled?: boolean;
  title: ReactNode;
}

export interface TabsManagerProps<TI = DefaultTabID> {
  additionalContent?: ReactNode;
  initialTabID?: TabID<TI>;
  onTabSelect?: (id: TabID<TI>) => void;
  tabs: Tab<TI>[];
  title?: ReactNode;
  className?: string;
}
