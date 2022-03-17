export type TabID = string | number;

export interface Tab {
  content: React.ReactNode;
  id: TabID;
  isDisabled?: boolean;
  title: React.ReactNode;
}

export enum TabsManagerGapSize {
  DEFAULT,
}

export interface TabsManagerProps {
  additionalContent?: React.ReactNode;
  gapSize?: TabsManagerGapSize;
  initialTabID?: TabID;
  onTabSelect?: (id: TabID) => void;
  tabs: Tab[];
  title?: React.ReactNode;
}

export interface TabsManagerStylesProps {
  gapSize: TabsManagerGapSize;
}
