import { IChainItemDetails } from 'domains/chains/actions/fetchChain';
import { EndpointGroup } from 'modules/endpoints/types';
import { TabsManager } from 'uiKit/TabsManager';
import { useStyles } from './ChainItemTabsStyles';
import { useChainItemTabs } from './hooks/useChainItemTabs';

export interface IChainItemTabsProps {
  data: IChainItemDetails;
  group: EndpointGroup;
}

export const ChainItemTabs = ({ data, group }: IChainItemTabsProps) => {
  const [tabs, selectedTab] = useChainItemTabs({ data, group });

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TabsManager
        className={classes.tabs}
        selectedTab={selectedTab}
        tabs={tabs}
      />
    </div>
  );
};
