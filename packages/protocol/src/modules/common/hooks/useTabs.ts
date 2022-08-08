import { ReactNode, useCallback, useMemo, useState } from 'react';

export type DefaultTabID = string | number;
export type TabID<TI> = TI extends DefaultTabID ? TI : DefaultTabID;

export interface Tab<TI = DefaultTabID> {
  content?: ReactNode;
  id: TabID<TI>;
  isDisabled?: boolean;
  onSelect?: () => void;
  title: ReactNode;
}

export interface TabsParams<TI = DefaultTabID> {
  initialTabID?: TabID<TI>;
  onTabSelect?: (id: TabID<TI>) => void;
  tabs: Tab<TI>[];
}

export const useTabs = <TI = DefaultTabID>({
  initialTabID,
  onTabSelect,
  tabs,
}: TabsParams<TI>): [Tab<TI>[], Tab<TI> | undefined] => {
  const [selectedTabID, setSelectedTabID] = useState(
    initialTabID ?? tabs[0]?.id,
  );

  const getTabSelectHandler = useCallback(
    ({ id, isDisabled, onSelect }: Tab<TI>) =>
      () => {
        if (!isDisabled) {
          const handler = onSelect || onTabSelect;

          setSelectedTabID(id);

          if (handler) {
            handler(id);
          }
        }
      },
    [onTabSelect],
  );

  const processedTabs = useMemo(
    () =>
      tabs.map<Tab<TI>>(tab => ({
        ...tab,
        onSelect: getTabSelectHandler(tab),
      })),
    [getTabSelectHandler, tabs],
  );

  const selectedTab = processedTabs.find(({ id }) => id === selectedTabID);

  return [processedTabs, selectedTab];
};
