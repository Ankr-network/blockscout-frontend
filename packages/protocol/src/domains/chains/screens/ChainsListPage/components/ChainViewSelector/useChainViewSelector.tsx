import React, { useEffect, useMemo } from 'react';
import { CardViewIcon, TableViewIcon } from '@ankr.com/ui';

import { ChainTypeTab } from 'modules/common/components/ChainTypeTab';
import { useTabs } from 'modules/common/hooks/useTabs';
import { useIsSMDown } from 'uiKit/Theme/useTheme';

import { useChainViewSelectorStyles } from './useChainViewSelectorStyles';

export enum EChainView {
  List = 'list',
  Cards = 'cards',
}

const chainViewTabsContent = [
  {
    id: EChainView.List,
    icon: <TableViewIcon />,
  },
  {
    id: EChainView.Cards,
    icon: <CardViewIcon />,
  },
];

export const useChainViewSelector = () => {
  const { classes, cx } = useChainViewSelectorStyles();

  const chainsViewTabsData = useMemo(() => {
    return chainViewTabsContent.map(tab => ({
      id: tab.id,
      title: (isSelected: boolean) => (
        <ChainTypeTab
          className={classes.chainViewTabWrapper}
          content={
            <div
              className={cx(classes.chainViewTab, {
                [classes.chainViewTabSelected]: isSelected,
              })}
            >
              {tab.icon}
            </div>
          }
          isSelected={isSelected}
        />
      ),
      size: 'small',
    }));
  }, [
    classes.chainViewTab,
    classes.chainViewTabSelected,
    classes.chainViewTabWrapper,
    cx,
  ]);

  const isMobile = useIsSMDown();

  const [chainsViewTabs, selectedChainsViewTab, selectTab] =
    useTabs<EChainView>({
      tabs: chainsViewTabsData,
      initialTabID: EChainView.List,
    });

  useEffect(() => {
    if (isMobile) {
      // set cards view for mobile devices
      // will be reworked in the task https://ankrnetwork.atlassian.net/browse/MRPC-5272
      selectTab(EChainView.List);
    }
  }, [chainsViewTabs, isMobile, selectTab, selectedChainsViewTab]);

  return {
    chainsViewTabs,
    selectedChainsViewTab,
  };
};
