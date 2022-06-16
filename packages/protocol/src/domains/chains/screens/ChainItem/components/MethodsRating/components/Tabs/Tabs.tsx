import React, { useCallback } from 'react';

import { ChainType } from 'domains/chains/types';
import { ChainTypeTab } from 'modules/common/components/ChainTypeTab';
import { Tab, TabsManager } from 'uiKit/TabsManager';
import { tabTitlesMap } from './const';

export interface TabsProps {
  setChainType: (type: ChainType) => void;
}

const titleRenderFn = (isSelected: boolean, _: boolean, id: ChainType) => (
  <ChainTypeTab content={tabTitlesMap[id]} isSelected={isSelected} />
);

export const Tabs = ({ setChainType }: TabsProps) => {
  const tabs: Tab<ChainType>[] = [
    {
      id: ChainType.Mainnet,
      title: titleRenderFn,
    },
    {
      id: ChainType.Testnet,
      title: titleRenderFn,
    },
  ];

  const onTabSelect = useCallback(
    (id: ChainType) => {
      setChainType(id);
    },
    [setChainType],
  );

  return <TabsManager<ChainType> onTabSelect={onTabSelect} tabs={tabs} />;
};
