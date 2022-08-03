import { Typography, Tabs as BaseTabs, Tab, Chip } from '@material-ui/core';
import classNames from 'classnames';

import { t } from 'common';

import { useTabsStyles } from './useTabsStyles';

interface ITabProps {
  activeTab: string;
  isExistsUnstakingData: boolean;
  newUnstakingAmount: number;
  onChangeTab(newTab: string): void;
}

export const Tabs = ({
  activeTab,
  isExistsUnstakingData,
  newUnstakingAmount,
  onChangeTab,
}: ITabProps): JSX.Element => {
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
            <div className={classes.itemWrapper}>
              <Typography
                className={classNames(classes.tabText, {
                  [classes.tabActive]: activeTab === activeStakingText,
                })}
                color={
                  activeTab === activeStakingText
                    ? 'textPrimary'
                    : 'textSecondary'
                }
                variant="h3"
              >
                {activeStakingText}
              </Typography>
            </div>
          }
          value={activeStakingText}
        />

        {isExistsUnstakingData && (
          <Tab
            key={unstakingText}
            classes={{ root: classes.tabArea, selected: classes.tabSelected }}
            className={classes.tabArea}
            label={
              <div className={classes.itemWrapper}>
                <Typography
                  className={classNames(classes.tabText, {
                    [classes.tabActive]: activeTab === unstakingText,
                  })}
                  color={
                    activeTab === unstakingText
                      ? 'textPrimary'
                      : 'textSecondary'
                  }
                  variant="h3"
                >
                  {unstakingText}
                </Typography>

                {!!newUnstakingAmount && (
                  <Chip
                    classes={{ label: classes.chipLabel }}
                    className={classes.chip}
                    color="primary"
                    label={newUnstakingAmount}
                    size="small"
                  />
                )}
              </div>
            }
            value={unstakingText}
          />
        )}

        <Tab
          key={historyText}
          classes={{ root: classes.tabArea, selected: classes.tabSelected }}
          className={classes.tabArea}
          label={
            <div className={classes.itemWrapper}>
              <Typography
                className={classNames(classes.tabText, {
                  [classes.tabActive]: activeTab === historyText,
                })}
                color={
                  activeTab === historyText ? 'textPrimary' : 'textSecondary'
                }
                variant="h3"
              >
                {historyText}
              </Typography>
            </div>
          }
          value={historyText}
        />
      </BaseTabs>
    </div>
  );
};
