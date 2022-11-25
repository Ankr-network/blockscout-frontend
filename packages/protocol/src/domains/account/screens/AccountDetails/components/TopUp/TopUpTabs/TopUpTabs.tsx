import { useTopUpTabs } from './TopUpTabsUtils';
import { TabsManager } from 'uiKit/TabsManager';
import { useTopUpTabsStyles } from './TopUpTabsStyles';

interface ITopUpTabsProps {
  canPayOnlyByCard: boolean;
}

export const TopUpTabs = ({ canPayOnlyByCard }: ITopUpTabsProps) => {
  const classes = useTopUpTabsStyles({ canPayOnlyByCard });

  const [tabs, selectedTab] = useTopUpTabs(canPayOnlyByCard);

  return (
    <TabsManager
      selectedTab={selectedTab}
      tabs={tabs}
      className={classes.root}
      allowSingleTab={false}
    />
  );
};
