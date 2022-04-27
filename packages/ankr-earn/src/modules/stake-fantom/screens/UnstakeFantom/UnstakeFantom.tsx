import { Box, ButtonBase, Divider, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { resetRequests } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { useCallback } from 'react';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { t } from 'modules/i18n/utils/intl';
import { getBurnFee } from 'modules/stake-fantom/actions/getBurnFee';
import { getCommonData } from 'modules/stake-fantom/actions/getCommonData';
import { FANTOM_UNSTAKE_PERIOD } from 'modules/stake-fantom/const';
import { UnstakeDialog } from 'modules/stake/components/UnstakeDialog';
import { UnstakeSuccess } from 'modules/stake/components/UnstakeSuccess';
import { useAppDispatch } from 'store/useAppDispatch';
import { Container } from 'uiKit/Container';
import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
import { Tooltip } from 'uiKit/Tooltip';

import { useUnstakeDialog } from './hooks/useUnstakeDialog';
import { useUnstakeFantomStyles } from './useUnstakeFantomStyles';

// todo: remove when actual translation will be added
const isFeeTooltipActual = false;

const calculateTotalAmount = (amount: BigNumber, burnFee: BigNumber) => {
  const result = amount.minus(burnFee);
  return result.isLessThan(0) ? ZERO : result;
};

export const UnstakeFantom = (): JSX.Element => {
  const classes = useUnstakeFantomStyles();
  const dispatch = useAppDispatch();

  const {
    isOpened: isSuccessOpened,
    onClose: onSuccessClose,
    onOpen: onSuccessOpen,
  } = useDialog();

  const {
    submitDisabled,
    isBalanceLoading,
    isBurnFeeLoading,
    isLoading,
    isApproved,
    isApproveLoading,
    isWithApprove,
    balance,
    burnFee,
    closeHref,
    selectedToken,
    onSubmit,
    onChange,
  } = useUnstakeDialog(onSuccessOpen);

  useProviderEffect(() => {
    dispatch(getCommonData());

    return function reset() {
      dispatch(resetRequests([getBurnFee.toString()]));
    };
  }, [dispatch]);

  const renderFormFooter = useCallback(
    (amount: BigNumber, maxAmount: BigNumber) => {
      const totalAmount = maxAmount.isLessThan(amount)
        ? calculateTotalAmount(maxAmount, burnFee)
        : calculateTotalAmount(amount, burnFee);

      return (
        <div className={classes.formFooter}>
          <Box alignItems="center" display="flex" mb={2}>
            <Typography
              className={classes.label}
              color="textPrimary"
              variant="body2"
            >
              {t('unstake-dialog.unstake-fee')}

              {isFeeTooltipActual && (
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
    [burnFee, classes, isBurnFeeLoading],
  );

  return (
    <Box component="section" py={{ xs: 6, sm: 10 }}>
      <Container>
        {!isSuccessOpened ? (
          <UnstakeDialog
            balance={balance}
            closeHref={closeHref}
            endText={t('unstake-dialog.eta', {
              token: Token.FTM,
              period: t('stake-fantom.unstake-period', {
                days: FANTOM_UNSTAKE_PERIOD,
              }),
            })}
            isApproved={isApproved}
            isApproveLoading={isApproveLoading}
            isBalanceLoading={isBalanceLoading}
            isLoading={isLoading}
            isWithApprove={isWithApprove}
            renderFormFooter={renderFormFooter}
            submitDisabled={submitDisabled}
            token={selectedToken}
            onChange={onChange}
            onSubmit={onSubmit}
          />
        ) : (
          <UnstakeSuccess
            period={t('stake-fantom.unstake-period', {
              days: FANTOM_UNSTAKE_PERIOD,
            })}
            tokenName={Token.FTM}
            onClose={onSuccessClose}
          />
        )}
      </Container>
    </Box>
  );
};
