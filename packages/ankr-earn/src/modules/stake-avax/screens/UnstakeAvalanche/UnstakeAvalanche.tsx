import { Box, Typography } from '@material-ui/core';
import { useDispatchRequest, useMutation } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback } from 'react';
import { useHistory } from 'react-router';

import { useProviderEffect } from 'modules/auth/hooks/useProviderEffect';
import { DECIMAL_PLACES } from 'modules/common/const';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { RoutesConfig as DashboardRoutes } from 'modules/dashboard/Routes';
import { t } from 'modules/i18n/utils/intl';
import {
  IUnstakeFormValues,
  UnstakeDialog,
} from 'modules/stake/components/UnstakeDialog';
import { UnstakeSuccess } from 'modules/stake/components/UnstakeSuccess';
import { Container } from 'uiKit/Container';
import { QueryError } from 'uiKit/QueryError';
import { QueryLoadingCentered } from 'uiKit/QueryLoading';

import { fetchStats } from '../../actions/fetchStats';
import { fetchUnstakeEndDate } from '../../actions/fetchUnstakeEndDate';
import { unstake } from '../../actions/unstake';
import { useFetchStats } from '../../hooks/useFetchStats';

import { useUnstakeTimer } from './hooks/useUnstakeTimer';
import { useUnstakeAvalancheStyles } from './useUnstakeAvalancheStyles';

export const UnstakeAvalanche = (): JSX.Element => {
  const classes = useUnstakeAvalancheStyles();
  const dispatchRequest = useDispatchRequest();
  const history = useHistory();

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

  const { duration, isTimeOver } = useUnstakeTimer();

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

  const onUnstakeSubmit = ({ amount }: IUnstakeFormValues): void => {
    if (typeof amount !== 'string') {
      return;
    }

    const resultAmount = new BigNumber(amount);

    dispatchRequest(unstake(resultAmount)).then(({ error }) => {
      if (!error) {
        onSuccessOpen();
      }
    });
  };

  useProviderEffect(() => {
    dispatchRequest(fetchStats());
    dispatchRequest(fetchUnstakeEndDate());
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
              endText={
                isTimeOver
                  ? undefined
                  : t('stake-avax.unstake.timer', {
                      duration,
                    })
              }
              isLoading={isUnstakeLoading}
              renderFormFooter={onRenderFormFooter}
              submitDisabled={isUnstakeLoading}
              token={Token.aAVAXb}
              onClose={onClose}
              onSubmit={onUnstakeSubmit}
            />
          ) : (
            <UnstakeSuccess
              infoText={
                isTimeOver
                  ? t('stake-avax.unstake.timer-off')
                  : t('stake-avax.unstake.timer', {
                      duration,
                    })
              }
              onClose={onSuccessClose}
            />
          ))}
      </Container>
    </Box>
  );
};
