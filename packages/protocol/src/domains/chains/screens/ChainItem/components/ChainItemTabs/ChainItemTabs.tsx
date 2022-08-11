import { EndpointGroup } from 'modules/endpoints/types';
import { IChainItemDetails } from 'domains/chains/actions/fetchChain';
import { TabsManager } from 'uiKit/TabsManager';
import { useChainItemTabs } from './hooks/useChainItemTabs';
import { useStyles } from './ChainItemTabsStyles';

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
