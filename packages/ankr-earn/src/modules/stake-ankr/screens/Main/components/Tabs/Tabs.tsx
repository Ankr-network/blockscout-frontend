import { Chip, Typography, Tab, Tabs as BaseTabs } from '@material-ui/core';
import classNames from 'classnames';
import { ReactNode } from 'react';

import { t } from 'common';

import { Button } from 'uiKit/Button';

import { ClaimAllUnstakesDialog } from '../ClaimAllUnstakesDialog';

import { useClaim } from './useClaim';
import { useTabsStyles } from './useTabsStyles';

export interface ITabItem {
  title: string;
  showAmount: boolean;
}

interface ITabProps {
  tabs: ITabItem[];
  activeTab: string;
  unstakingAmount?: number;
  claimAllLink?: string;
  handleChangeTab(newTab: string): void;
}

export const Tabs = ({
  tabs,
  activeTab,
  unstakingAmount,
  claimAllLink,
  handleChangeTab,
}: ITabProps): JSX.Element => {
  const classes = useTabsStyles();

  const {
    isFewClaims,
    isSingleClaim,
    data,
    isClaimsLoading,
    loading,
    total,
    totalUSD,
    isOpened,
    onClose,
    onOpen,
    onClaim,
  } = useClaim();

  return (
    <div className={classes.root}>
      <BaseTabs
        className={classes.tabs}
        indicatorColor="secondary"
        scrollButtons="auto"
        value={activeTab}
        variant="scrollable"
        onChange={(_, value) => handleChangeTab(value)}
      >
        {tabs.map(({ title, showAmount }: ITabItem): ReactNode => {
          const isActiveTab = title === activeTab;

          return (
            <Tab
              key={title}
              classes={{ root: classes.tabArea, selected: classes.tabSelected }}
              className={classes.tabArea}
              label={
                <div className={classes.itemWrapper}>
                  <Typography
                    className={classNames(classes.tabText, {
                      [classes.tabActive]: isActiveTab,
                    })}
                    color={isActiveTab ? 'initial' : 'textSecondary'}
                    variant="h3"
                  >
                    {title}
                  </Typography>

                  {!!unstakingAmount && showAmount && (
                    <Chip
                      classes={{ label: classes.chipLabel }}
                      className={classes.chip}
                      color="primary"
                      label={unstakingAmount}
                      size="small"
                    />
                  )}
                </div>
              }
              value={title}
            />
          );
        })}
      </BaseTabs>

      {claimAllLink && !loading && !!data && data.length >= 1 && (
        <Button className={classes.btn} variant="text" onClick={onOpen}>
          {t('stake-ankr.tabs.claim-all')}
        </Button>
      )}

      <ClaimAllUnstakesDialog
        data={data}
        isClaimsLoading={isClaimsLoading}
        isFewClaims={isFewClaims}
        isSingleClaim={isSingleClaim}
        loading={loading}
        open={isOpened}
        total={total}
        totalUSD={totalUSD}
        onClaim={onClaim}
        onClose={onClose}
      />
    </div>
  );
};
