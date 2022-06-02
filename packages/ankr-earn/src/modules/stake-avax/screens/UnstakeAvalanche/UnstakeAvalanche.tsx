import { Box, Typography } from '@material-ui/core';
import { useDispatchRequest, useMutation } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback } from 'react';
import { useHistory } from 'react-router';

import { t } from 'common';
import { AvailableWriteProviders } from 'provider';

import { trackUnstake } from 'modules/analytics/tracking-actions/trackUnstake';
import { useAuth } from 'modules/auth/common/hooks/useAuth';
import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { DECIMAL_PLACES, ZERO } from 'modules/common/const';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { RoutesConfig as DashboardRoutes } from 'modules/dashboard/Routes';
import { useStakedAVAXData } from 'modules/dashboard/screens/Dashboard/components/StakedTokens/hooks/AVAX/useStakedAVAXData';
import {
  IUnstakeFormValues,
  UnstakeDialog,
} from 'modules/stake/components/UnstakeDialog';
import { UnstakeSuccess } from 'modules/stake/components/UnstakeSuccess';
import { useUnstakePendingTimestamp } from 'modules/stake/hooks/useUnstakePendingTimestamp';
import { Container } from 'uiKit/Container';
import { QueryError } from 'uiKit/QueryError';
import { QueryLoadingCentered } from 'uiKit/QueryLoading';

import { fetchStats } from '../../actions/fetchStats';
import { unstake } from '../../actions/unstake';
import { useFetchStats } from '../../hooks/useFetchStats';

import { useUnstakeAvalancheStyles } from './useUnstakeAvalancheStyles';

export const UnstakeAvalanche = (): JSX.Element => {
  const classes = useUnstakeAvalancheStyles();
  const dispatchRequest = useDispatchRequest();
  const history = useHistory();
  const stakedAVAXData = useStakedAVAXData();

  const {
    isOpened: isSuccessOpened,
    onClose: onSuccessClose,
    onOpen: onSuccessOpen,
  } = useDialog();

  const {
    isLoading: isFetchStatsLoading,
    error: fetchStatsError,
    stats: fetchStatsData,
  } = useFetchStats();

  const { loading: isUnstakeLoading } = useMutation({ type: unstake });

  const { label: unstakeLabel } = useUnstakePendingTimestamp({
    token: Token.AVAX,
  });

  const onClose = useCallback((): void => {
    history.push(DashboardRoutes.dashboard.generatePath());
  }, [history]);

  const onRenderFormFooter = (amount: BigNumber): JSX.Element => (
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
          value: amount.isNaN() ? 0 : amount.decimalPlaces(DECIMAL_PLACES),
          token: Token.AVAX,
        })}
      </Typography>
    </Box>
  );

  const { address, walletName } = useAuth(
    AvailableWriteProviders.ethCompatible,
  );

  const onUnstakeSubmit = ({ amount }: IUnstakeFormValues): void => {
    if (typeof amount !== 'string') {
      return;
    }

    const resultAmount = new BigNumber(amount);

    dispatchRequest(unstake(resultAmount)).then(({ error }) => {
      if (!error) {
        onSuccessOpen();

        trackUnstake({
          address,
          name: walletName,
          amount: resultAmount,
          stakeToken: Token.AVAX,
          syntheticToken: Token.aAVAXb,
          newTokenBalance: fetchStatsData?.avaxBalance ?? ZERO,
          newStakedBalance: stakedAVAXData.amount,
          newSynthTokens: fetchStatsData?.aAVAXbBalance ?? ZERO,
        });
      }
    });
  };

  useProviderEffect(() => {
    dispatchRequest(fetchStats());
  }, [dispatchRequest]);

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
        {fetchStatsError !== null && <QueryError error={fetchStatsError} />}

        {fetchStatsError === null &&
          fetchStatsData !== null &&
          (!isSuccessOpened ? (
            <UnstakeDialog
              balance={fetchStatsData.aAVAXbBalance}
              endText={unstakeLabel}
              isLoading={isUnstakeLoading}
              renderFormFooter={onRenderFormFooter}
              submitDisabled={isUnstakeLoading}
              token={Token.aAVAXb}
              onClose={onClose}
              onSubmit={onUnstakeSubmit}
            />
          ) : (
            <UnstakeSuccess infoText={unstakeLabel} onClose={onSuccessClose} />
          ))}
      </Container>
    </Box>
  );
};
