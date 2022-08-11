import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

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

const getSelectedTabID = <TI>(tabs: Tab<TI>[], initialTabID?: TabID<TI>) =>
  initialTabID ?? tabs[0]?.id;

export type Tabs<TI = DefaultTabID> = [
  Tab<TI>[],
  Tab<TI> | undefined,
  (id: TabID<TI>) => void,
];

export const useTabs = <TI = DefaultTabID>({
  initialTabID,
  onTabSelect,
  tabs,
}: TabsParams<TI>): Tabs<TI> => {
  const [selectedTabID, setSelectedTabID] = useState(
    getSelectedTabID(tabs, initialTabID),
  );

  useEffect(() => {
    setSelectedTabID(getSelectedTabID(tabs, initialTabID));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabs]);

  const selectTab = useCallback((id: TabID<TI>) => {
    setSelectedTabID(id);
  }, []);

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

  return [processedTabs, selectedTab, selectTab];
};
