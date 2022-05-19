import { Box, Typography } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { t } from 'modules/i18n/utils/intl';
import { UnstakeDialog } from 'modules/stake/components/UnstakeDialog';
import { UnstakeSuccess } from 'modules/stake/components/UnstakeSuccess';
import { Container } from 'uiKit/Container';

import { fetchStats } from '../../actions/fetchStats';

import { useUnstakeBnb } from './hooks/useUnstakeBnb';
import { useUnstakeBinanceStyles } from './useUnstakeBinanceStyles';

export const UnstakeBinance = (): JSX.Element => {
  const classes = useUnstakeBinanceStyles();

  const {
    isOpened: isSuccessOpened,
    onClose: onSuccessClose,
    onOpen: onSuccessOpen,
  } = useDialog();

  const {
    closeHref,
    isApproved,
    isApproveLoading,
    isFetchStatsLoading,
    isUnstakeLoading,
    isWithApprove,
    minAmount,
    redeemPeriod,
    redeemValue,
    selectedToken,
    syntTokenBalance,
    calcTotalRecieve,
    onExtraValidation,
    onUnstakeSubmit,
  } = useUnstakeBnb(onSuccessOpen);

  const dispatchRequest = useDispatchRequest();

  useProviderEffect(() => {
    dispatchRequest(fetchStats());
  }, [dispatchRequest]);

  const onRenderFormFooter = (amount: BigNumber): JSX.Element => {
    const value = amount;
    const isInvalidAmount = value.isNaN() || value.isLessThan(minAmount);
    const totalRecieve = isInvalidAmount ? '0' : calcTotalRecieve(amount);

    return (
      <Box alignItems="center" display="flex" mt={2}>
        <Typography
          className={classes.infoLabel}
          color="textPrimary"
          variant="body2"
        >
          {t('stake.you-will-get')}
        </Typography>

        <Box ml="auto" />

        <Typography
          className={classes.infoValue}
          color="textPrimary"
          variant="body2"
        >
          {t('unit.token-value', {
            value: totalRecieve,
            token: Token.BNB,
          })}
        </Typography>
      </Box>
    );
  };

  return (
    <Box component="section" py={{ xs: 6, sm: 10 }}>
      <Container>
        {!isSuccessOpened ? (
          <UnstakeDialog
            balance={syntTokenBalance}
            closeHref={closeHref}
            endText={t('stake-bnb.unstake.info', {
              value: redeemValue,
              period: redeemPeriod,
            })}
            extraValidation={onExtraValidation}
            isApproved={isApproved}
            isApproveLoading={isApproveLoading}
            isBalanceLoading={isFetchStatsLoading}
            isLoading={isUnstakeLoading}
            isWithApprove={isWithApprove}
            renderFormFooter={onRenderFormFooter}
            submitDisabled={isUnstakeLoading}
            token={selectedToken}
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
        )}
      </Container>
    </Box>
  );
};
