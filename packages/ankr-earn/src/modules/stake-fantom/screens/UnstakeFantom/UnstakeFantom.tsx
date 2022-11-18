import { t } from '@ankr.com/common';
import { Box, ButtonBase, Divider, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import {
  abortRequests,
  resetRequests as resetReduxRequests,
} from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { useCallback } from 'react';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { featuresConfig, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getUnstakeDate } from 'modules/stake/actions/getUnstakeDate';
import { UnstakeDialog } from 'modules/stake/components/UnstakeDialog';
import { UNSTAKE_UPDATE_INTERVAL } from 'modules/stake/const';
import { useUnstakePendingTimestamp } from 'modules/stake/hooks/useUnstakePendingTimestamp';
import { useAppDispatch } from 'store/useAppDispatch';
import { Container } from 'uiKit/Container';
import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
import { Tooltip } from 'uiKit/Tooltip';

import { useUnstakeDialog } from './hooks/useUnstakeDialog';
import { useUnstakeFantomStyles } from './useUnstakeFantomStyles';

const resetRequests = () => resetReduxRequests([getUnstakeDate.toString()]);

export const UnstakeFantom = (): JSX.Element => {
  const classes = useUnstakeFantomStyles();
  const dispatch = useAppDispatch();

  const {
    balance,
    burnFee,
    closeHref,
    isBalanceLoading,
    isBurnFeeLoading,
    isDisabled,
    isLoading,
    selectedToken,
    calcTotalRecieve,
    onChange,
    onSubmit,
  } = useUnstakeDialog();

  const { label: unstakeLabel } = useUnstakePendingTimestamp({
    token: Token.FTM,
  });

  useProviderEffect(() => {
    dispatch(resetRequests());

    dispatch(getUnstakeDate({ poll: UNSTAKE_UPDATE_INTERVAL }));

    return () => {
      dispatch(abortRequests());
      dispatch(resetRequests());
    };
  }, [dispatch]);

  const renderFormFooter = useCallback(
    (amount: BigNumber, maxAmount: BigNumber) => {
      const calculateTotalAmount = (
        _amount: BigNumber,
        _burnFee: BigNumber,
      ) => {
        const test = calcTotalRecieve(_amount);

        const result = test.minus(_burnFee);
        return result.isLessThan(0) ? ZERO : result;
      };

      const totalAmount = !maxAmount.isLessThan(amount)
        ? calculateTotalAmount(amount, burnFee)
        : ZERO;

      return (
        <div className={classes.formFooter}>
          <Box alignItems="center" display="flex" mb={2}>
            <Typography
              className={classes.label}
              color="textPrimary"
              variant="body2"
            >
              {t('unstake-dialog.unstake-fee')}

              {featuresConfig.fantomUnstakeFeeTooltip && (
                <Tooltip title={t('stake-fantom.fee-tooltip')}>
                  <ButtonBase>
                    <QuestionIcon size="xs" />
                  </ButtonBase>
                </Tooltip>
              )}
            </Typography>

            <Box ml="auto" />

            <Typography
              className={classes.value}
              color="textPrimary"
              variant="body2"
            >
              {isBurnFeeLoading ? (
                <Skeleton width={50} />
              ) : (
                t('unit.token-value', {
                  token: Token.FTM,
                  value: burnFee.toFormat(),
                })
              )}
            </Typography>
          </Box>

          <Divider />

          <Box display="flex" mt={2}>
            <Typography
              className={classes.label}
              color="textPrimary"
              variant="body2"
            >
              {t('stake.you-will-get')}
            </Typography>

            <Box ml="auto" />

            <Typography
              className={classes.totalValue}
              color="textPrimary"
              variant="body2"
            >
              {isBurnFeeLoading ? (
                <Skeleton width={50} />
              ) : (
                t('unit.token-value', {
                  token: Token.FTM,
                  value: totalAmount.isNaN() ? '0' : totalAmount.toFormat(),
                })
              )}
            </Typography>
          </Box>
        </div>
      );
    },
    [burnFee, classes, isBurnFeeLoading, calcTotalRecieve],
  );

  return (
    <Box component="section" py={{ xs: 6, sm: 10 }}>
      <Container>
        <UnstakeDialog
          balance={balance}
          closeHref={closeHref}
          endText={unstakeLabel}
          isBalanceLoading={isBalanceLoading}
          isDisabled={isDisabled}
          isLoading={isLoading}
          renderFormFooter={renderFormFooter}
          token={selectedToken}
          onChange={onChange}
          onSubmit={onSubmit}
        />
      </Container>
    </Box>
  );
};
