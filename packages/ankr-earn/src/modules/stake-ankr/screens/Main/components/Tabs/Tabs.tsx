import { t } from 'common';

import { Tab, Tabs as BaseTabs } from 'modules/delegate-stake/components/Tabs';
import { Button } from 'uiKit/Button';

import { useTabsStyles } from './useTabsStyles';

interface ITabsProps {
  activeTab: string;
  isExistsUnstakingData: boolean;
  newUnstakingAmount: number;
  isShowingButton: boolean;
  onOpen: () => void;
  onChangeTab(newTab: string): void;
}

export const Tabs = ({
  activeTab,
  isExistsUnstakingData,
  newUnstakingAmount,
  isShowingButton,
  onOpen,
  onChangeTab,
}: ITabsProps): JSX.Element => {
  const classes = useTabsStyles();

  const activeStakingText = t('stake-ankr.tabs.active-staking');
  const unstakingText = t('stake-ankr.tabs.unstaking');
  const historyText = t('stake-ankr.tabs.history');

  return (
    <div className={classes.root}>
      <BaseTabs value={activeTab} onTabChange={onChangeTab}>
        <Tab
          key={activeStakingText}
          activeTab={activeTab}
          title={activeStakingText}
          value={activeStakingText}
        />

        {isExistsUnstakingData && (
          <Tab
            key={unstakingText}
            activeTab={activeTab}
            amount={newUnstakingAmount}
            title={unstakingText}
            value={unstakingText}
          />
        )}

        <Tab
          key={historyText}
          activeTab={activeTab}
          title={historyText}
          value={historyText}
        />
      </BaseTabs>

      {isShowingButton ? (
        <Button className={classes.btn} variant="text" onClick={onOpen}>
          {t('stake-ankr.tabs.claim-all')}
        </Button>
      ) : undefined}
    </div>
  );
};
