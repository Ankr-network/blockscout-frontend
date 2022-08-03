import { Tabs, Tab, Chip, Typography } from '@material-ui/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

import { t } from 'common';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { getUnstakingData } from 'modules/stake-ankr/actions/getUnstakingData';
import { Button } from 'uiKit/Button';

import { ActiveStakingTable } from '../ActiveStakingTable';
import { ClaimAllUnstakesDialog } from '../ClaimAllUnstakesDialog';
import { HistoryTable } from '../HistoryTable';
import { UnstakingTable } from '../UnstakingTable';

import { useClaim } from './useClaim';
import { useStakingInfoStyles } from './useStakingInfoStyles';

export const StakingInfo = (): JSX.Element => {
  const classes = useStakingInfoStyles();

  const dispatchRequest = useDispatchRequest();
  const { data: unstakingData } = useQuery({
    type: getUnstakingData,
  });

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

  const activeStakingText = t('stake-ankr.tabs.active-staking');
  const unstakingText = t('stake-ankr.tabs.unstaking');
  const historyText = t('stake-ankr.tabs.history');

  const [newUnstakingAmount, setUnstakingAmount] = useState(
    unstakingData?.length ?? 0,
  );
  const [currentTab, setCurrentTab] = useState<string>(activeStakingText);

  useProviderEffect(() => {
    dispatchRequest(getUnstakingData());
    setUnstakingAmount(unstakingData?.length ?? 0);
  }, [dispatchRequest]);

  useEffect(() => {
    setUnstakingAmount(unstakingData?.length ?? 0);
  }, [unstakingData]);

  const handleChangeTab = (newTab: string) => setCurrentTab(newTab);
  const isActiveUnstakingTab = currentTab === unstakingText;

  const isShowingButton =
    isActiveUnstakingTab && !loading && !!data && data.length >= 1;

  const isExistsUnstakingData = !!unstakingData && unstakingData.length > 0;

  return (
    <div>
      <div className={classes.root}>
        <Tabs
          className={classes.tabs}
          indicatorColor="secondary"
          scrollButtons="auto"
          value={currentTab}
          variant="scrollable"
          onChange={(_, value) => handleChangeTab(value)}
        >
          <Tab
            key={activeStakingText}
            classes={{ root: classes.tabArea, selected: classes.tabSelected }}
            className={classes.tabArea}
            label={
              <div className={classes.itemWrapper}>
                <Typography
                  className={classNames(classes.tabText, {
                    [classes.tabActive]: currentTab === activeStakingText,
                  })}
                  color={
                    currentTab === activeStakingText
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
                      [classes.tabActive]: currentTab === unstakingText,
                    })}
                    color={
                      currentTab === unstakingText
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
                    [classes.tabActive]: currentTab === historyText,
                  })}
                  color={
                    currentTab === historyText ? 'textPrimary' : 'textSecondary'
                  }
                  variant="h3"
                >
                  {historyText}
                </Typography>
              </div>
            }
            value={historyText}
          />
        </Tabs>

        {isShowingButton ? (
          <Button className={classes.btn} variant="text" onClick={onOpen}>
            {t('stake-ankr.tabs.claim-all')}
          </Button>
        ) : undefined}
      </div>

      {currentTab === activeStakingText && <ActiveStakingTable />}

      {currentTab === unstakingText && <UnstakingTable />}

      {currentTab === historyText && <HistoryTable />}

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
