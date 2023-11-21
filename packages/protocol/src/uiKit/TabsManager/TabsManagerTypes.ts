import { Orientation } from '@mui/material';
import { ReactNode, RefObject } from 'react';

export type DefaultTabID = string | number;
export type TabID<TI> = TI extends DefaultTabID ? TI : DefaultTabID;

export interface Tab<TI = DefaultTabID> {
  content?: ReactNode;
  id: TabID<TI>;
  isDisabled?: boolean;
  onSelect?: () => void;
  title?: ReactNode;
}

export interface TabsManagerProps<TI = DefaultTabID> {
  additionalContent?: ReactNode;
  allowSingleTab?: boolean;
  className?: string;
  selectedTab?: Tab<TI>;
  tabs: Tab<TI>[];
  title?: ReactNode;
  orientation?: Orientation;
  classNameTabsWrapper?: string;
  classNameTab?: string;
  classNameTabsInner?: string;
  refTabsInner?: RefObject<HTMLDivElement>;
  refTabsScrollWrapper?: RefObject<HTMLDivElement>;
  scrollBackBtn?: ReactNode;
  onScrollTabsInner?: () => void;
}
