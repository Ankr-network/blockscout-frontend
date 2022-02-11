import { Box, Typography } from '@material-ui/core';
import { useDispatchRequest, useMutation } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useProviderEffect } from 'modules/auth/hooks/useProviderEffect';
import { DECIMAL_PLACES, isMainnet, ZERO } from 'modules/common/const';
import { FormErrors } from 'modules/common/types/FormErrors';
import { Token } from 'modules/common/types/token';
import { RoutesConfig as DashboardRoutes } from 'modules/dashboard/Routes';
import { t } from 'modules/i18n/utils/intl';
import {
  IUnstakeFormValues,
  UnstakeDialog,
} from 'modules/stake/components/UnstakeDialog';
import React from 'react';
import { useHistory } from 'react-router';
import { Container } from 'uiKit/Container';
import { QueryError } from 'uiKit/QueryError';
import { QueryLoadingCentered } from 'uiKit/QueryLoading';
import { fetchStats } from '../../actions/fetchStats';
import { unstake } from '../../actions/unstake';
import { BNB_REDEEM_PERIOD } from '../../const';
import { useFetchStats } from '../../hooks/useFetchStats';
import { useUnstakeBinanceStyles } from './useUnstakeBinanceStyles';

export const UnstakeBinance = () => {
  const classes = useUnstakeBinanceStyles();
  const dispatchRequest = useDispatchRequest();
  const history = useHistory();

  const { loading: isUnstakeLoading } = useMutation({ type: unstake });

  const {
    error: fetchStatsError,
    isLoading: isFetchStatsLoading,
    stats: fetchStatsData,
  } = useFetchStats();

  const onClose = (): void => {
    history.push(DashboardRoutes.dashboard.generatePath());
  };

  const onExtraValidation =
    (minAmount: BigNumber) =>
    (
      { amount }: Partial<IUnstakeFormValues>,
      errors: FormErrors<IUnstakeFormValues>,
    ): FormErrors<IUnstakeFormValues> => {
      const currAmount = new BigNumber(
        typeof amount === 'string' && amount.length ? amount : NaN,
      );

      if (currAmount.isGreaterThan(ZERO) && currAmount.isLessThan(minAmount)) {
        errors.amount = t('validation.greater-or-equal', {
          value: minAmount,
        });
      }

      return errors;
    };

  const onRenderFormFooter =
    (minAmount: BigNumber) =>
    (amount: BigNumber): JSX.Element => {
      const isInvalidAmount = amount.isNaN() || amount.isLessThan(minAmount);

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
            {t(isInvalidAmount ? 'unit.token-value' : 'unit.~token-value', {
              value: isInvalidAmount ? 0 : amount.decimalPlaces(DECIMAL_PLACES),
              token: Token.BNB,
            })}
          </Typography>
        </Box>
      );
    };

  const onUnstakeSubmit = ({ amount }: IUnstakeFormValues): void => {
    if (typeof amount !== 'string') {
      return;
    }

    const resultAmount = new BigNumber(amount);

    dispatchRequest(unstake(resultAmount)).then(({ error }) => {
      if (!error) {
        onClose();
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

        {fetchStatsError === null && fetchStatsData !== null && (
          <UnstakeDialog
            balance={fetchStatsData.aBNBbBalance}
            endText={t('stake-bnb-dashboard.unstake-info', {
              value: BNB_REDEEM_PERIOD,
              period: isMainnet ? t('unit.days') : t('unit.hours'),
            })}
            extraValidation={onExtraValidation(fetchStatsData.minimumStake)}
            isLoading={isUnstakeLoading}
            renderFormFooter={onRenderFormFooter(fetchStatsData.minimumStake)}
            submitDisabled={isUnstakeLoading}
            token={Token.aBNBb}
            onClose={onClose}
            onSubmit={onUnstakeSubmit}
          />
        )}
      </Container>
    </Box>
  );
};
