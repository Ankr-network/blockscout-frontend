import { Box, Typography } from '@material-ui/core';
import { useDispatchRequest, useMutation } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useHistory } from 'react-router';

import { AvailableWriteProviders } from 'provider';

import { trackUnstake } from 'modules/analytics/tracking-actions/trackUnstake';
import { useAuth } from 'modules/auth/hooks/useAuth';
import { useProviderEffect } from 'modules/auth/hooks/useProviderEffect';
import { DECIMAL_PLACES, ZERO } from 'modules/common/const';
import { useDialog } from 'modules/common/hooks/useDialog';
import { FormErrors } from 'modules/common/types/FormErrors';
import { Token } from 'modules/common/types/token';
import { RoutesConfig as DashboardRoutes } from 'modules/dashboard/Routes';
import { useStakedABNBBData } from 'modules/dashboard/screens/Dashboard/components/StakedTokens/hooks/useStakedABNBBData';
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
import { unstake } from '../../actions/unstake';
import { useFetchStats } from '../../hooks/useFetchStats';
import { useRedeemData } from '../../hooks/useRedeemData';

import { useUnstakeBinanceStyles } from './useUnstakeBinanceStyles';

export const UnstakeBinance = (): JSX.Element => {
  const classes = useUnstakeBinanceStyles();
  const dispatchRequest = useDispatchRequest();
  const history = useHistory();
  const stakedBNBData = useStakedABNBBData();

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

  const { redeemPeriod, redeemValue } = useRedeemData();

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
      const value = amount;
      const isInvalidAmount = value.isNaN() || value.isLessThan(minAmount);

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
              value: isInvalidAmount ? 0 : value.decimalPlaces(DECIMAL_PLACES),
              token: Token.BNB,
            })}
          </Typography>
        </Box>
      );
    };

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
          stakeToken: Token.BNB,
          syntheticToken: Token.aBNBb,
          newTokenBalance: fetchStatsData?.bnbBalance ?? ZERO,
          newStakedBalance: stakedBNBData.amount,
          newSynthTokens: fetchStatsData?.aBNBbBalance ?? ZERO,
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
              balance={fetchStatsData.aBNBbBalance}
              endText={t('stake-bnb.unstake.info', {
                value: redeemValue,
                period: redeemPeriod,
              })}
              extraValidation={onExtraValidation(fetchStatsData.minimumUnstake)}
              isLoading={isUnstakeLoading}
              renderFormFooter={onRenderFormFooter(
                fetchStatsData.minimumUnstake,
              )}
              submitDisabled={isUnstakeLoading}
              token={Token.aBNBb}
              onClose={onClose}
              onSubmit={onUnstakeSubmit}
            />
          ) : (
            <UnstakeSuccess
              period={t('stake-bnb.unstake.period', {
                value: redeemValue,
                period: redeemPeriod,
              })}
              tokenName={Token.BNB}
              onClose={onSuccessClose}
            />
          ))}
      </Container>
    </Box>
  );
};
