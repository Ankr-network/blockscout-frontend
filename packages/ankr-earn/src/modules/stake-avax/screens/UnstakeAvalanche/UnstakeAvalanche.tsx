import { Box, Typography } from '@material-ui/core';
import {
  abortRequests,
  resetRequests as resetReduxRequests,
} from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { useCallback } from 'react';
import { useHistory } from 'react-router';

import { t } from 'common';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { Token } from 'modules/common/types/token';
import { RoutesConfig as DashboardRoutes } from 'modules/dashboard/Routes';
import { fetchPendingValues } from 'modules/stake-avax/actions/fetchPendingValues';
import { getUnstakeDate } from 'modules/stake/actions/getUnstakeDate';
import { UnstakeDialog } from 'modules/stake/components/UnstakeDialog';
import { UNSTAKE_UPDATE_INTERVAL } from 'modules/stake/const';
import { useUnstakePendingTimestamp } from 'modules/stake/hooks/useUnstakePendingTimestamp';
import { useAppDispatch } from 'store/useAppDispatch';
import { Container } from 'uiKit/Container';
import { QueryLoadingCentered } from 'uiKit/QueryLoading';

import { fetchStats } from '../../actions/fetchStats';

import { useUnstakeAvalance } from './hooks/useUnstakeAvalance';
import { useUnstakeAvalancheStyles } from './useUnstakeAvalancheStyles';

const resetRequests = () =>
  resetReduxRequests([
    fetchPendingValues.toString(),
    fetchStats.toString(),
    getUnstakeDate.toString(),
  ]);

export const UnstakeAvalanche = (): JSX.Element => {
  const classes = useUnstakeAvalancheStyles();
  const dispatch = useAppDispatch();
  const history = useHistory();

  const {
    closeHref,
    isFetchStatsLoading,
    isUnstakeLoading,
    maxAmount,
    selectedToken,
    syntTokenBalance,
    calcTotalRecieve,
    onUnstakeSubmit,
  } = useUnstakeAvalance();

  const { label: unstakeLabel } = useUnstakePendingTimestamp({
    token: Token.AVAX,
  });

  const onClose = useCallback((): void => {
    history.push(DashboardRoutes.dashboard.generatePath());
  }, [history]);

  const onRenderFormFooter = (amount: BigNumber): JSX.Element => {
    const value = amount;
    const isInvalidAmount = value.isNaN() || value.isGreaterThan(maxAmount);
    const totalRecieve = isInvalidAmount ? '0' : calcTotalRecieve(amount);

    return (
      <Box display="flex" mt={2}>
        <Typography
          className={classes.infoItem}
          color="textPrimary"
          variant="body2"
        >
          {t('stake.you-will-get')}
        </Typography>

        <Box ml="auto" />

        <Typography
          className={classes.infoItem}
          color="textPrimary"
          variant="body2"
        >
          {t('unit.token-value', {
            value: totalRecieve,
            token: Token.AVAX,
          })}
        </Typography>
      </Box>
    );
  };

  useProviderEffect(() => {
    dispatch(resetRequests());

    dispatch(fetchPendingValues());
    dispatch(fetchStats());
    dispatch(getUnstakeDate({ poll: UNSTAKE_UPDATE_INTERVAL }));

    return () => {
      dispatch(abortRequests());
      dispatch(resetRequests());
    };
  }, [dispatch]);

  if (isFetchStatsLoading) {
    return (
      <Box mt={5}>
        <QueryLoadingCentered />
      </Box>
    );
  }

  return (
    <Box component="section" py={{ xs: 6, sm: 10 }}>
      <Container>
        <UnstakeDialog
          balance={syntTokenBalance}
          closeHref={closeHref}
          endText={unstakeLabel}
          isLoading={isUnstakeLoading}
          renderFormFooter={onRenderFormFooter}
          submitDisabled={isUnstakeLoading}
          token={selectedToken}
          onClose={onClose}
          onSubmit={onUnstakeSubmit}
        />
      </Container>
    </Box>
  );
};
