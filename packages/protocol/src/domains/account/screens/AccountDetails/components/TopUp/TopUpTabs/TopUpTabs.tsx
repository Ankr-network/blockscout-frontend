import { useTopUpTabs } from './TopUpTabsUtils';
import { TabsManager } from 'uiKit/TabsManager';
import { useTopUpTabsStyles } from './TopUpTabsStyles';

interface ITopUpTabsProps {
  canPayByCard: boolean;
}

export const TopUpTabs = ({ canPayByCard }: ITopUpTabsProps) => {
  const classes = useTopUpTabsStyles();

  const [tabs, selectedTab] = useTopUpTabs(canPayByCard);

  return (
    <TabsManager
      selectedTab={selectedTab}
      tabs={tabs}
      className={classes.root}
    />
  );
};
