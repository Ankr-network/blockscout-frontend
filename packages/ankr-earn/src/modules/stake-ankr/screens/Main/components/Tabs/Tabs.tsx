import { Tabs as BaseTabs, Tab } from '@material-ui/core';

import { t } from 'common';

import { TabContent } from 'modules/delegate-stake/components/TabContent';
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
      <BaseTabs
        className={classes.tabs}
        indicatorColor="secondary"
        scrollButtons="auto"
        value={activeTab}
        variant="scrollable"
        onChange={(_, value) => onChangeTab(value)}
      >
        <Tab
          key={activeStakingText}
          classes={{ root: classes.tabArea, selected: classes.tabSelected }}
          className={classes.tabArea}
          label={
            <TabContent
              activeTab={activeTab}
              title={activeStakingText}
              value={activeStakingText}
            />
          }
          value={activeStakingText}
        />

        {isExistsUnstakingData && (
          <Tab
            key={unstakingText}
            classes={{ root: classes.tabArea, selected: classes.tabSelected }}
            className={classes.tabArea}
            label={
              <TabContent
                activeTab={activeTab}
                amount={newUnstakingAmount}
                title={unstakingText}
                value={unstakingText}
              />
            }
            value={unstakingText}
          />
        )}

        <Tab
          key={historyText}
          classes={{ root: classes.tabArea, selected: classes.tabSelected }}
          className={classes.tabArea}
          label={
            <TabContent
              activeTab={activeTab}
              title={historyText}
              value={historyText}
            />
          }
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
