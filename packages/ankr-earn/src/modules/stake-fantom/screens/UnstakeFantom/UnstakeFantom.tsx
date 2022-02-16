import { Box, ButtonBase, Divider, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { resetRequests } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { ZERO } from 'modules/common/const';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { t } from 'modules/i18n/utils/intl';
import { getBurnFee } from 'modules/stake-fantom/actions/getBurnFee';
import { getCommonData } from 'modules/stake-fantom/actions/getCommonData';
import { UnstakeDialog } from 'modules/stake/components/UnstakeDialog';
import { UnstakeSuccess } from 'modules/stake/components/UnstakeSuccess';
import { useCallback, useEffect } from 'react';
import { useAppDispatch } from 'store/useAppDispatch';
import { Container } from 'uiKit/Container';
import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
import { Tooltip } from 'uiKit/Tooltip';
import { useUnstakeDialog } from './hooks/useUnstakeDialog';
import { useUnstakeFantomStyles } from './useUnstakeFantomStyles';

// todo: remove when actual translation will be added
const isFeeTooltipActual = false;

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
    balance,
    burnFee,
    closeHref,
    onSubmit,
    onChange,
  } = useUnstakeDialog(onSuccessOpen);

  useEffect(() => {
    dispatch(getCommonData());

    return function reset() {
      dispatch(resetRequests([getBurnFee.toString()]));
    };
  }, [dispatch]);

  const renderFormFooter = useCallback(
    (amount: BigNumber, maxAmount: BigNumber) => {
      const totalAmount = maxAmount.isLessThan(amount)
        ? calcTotalAmount(maxAmount, burnFee)
        : calcTotalAmount(amount, burnFee);

      return (
        <div className={classes.formFooter}>
          <Box mb={2} display="flex" alignItems="center">
            <Typography
              variant="body2"
              color="textPrimary"
              className={classes.label}
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
              variant="body2"
              color="textPrimary"
              className={classes.value}
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

          <Box mt={2} display="flex">
            <Typography
              variant="body2"
              color="textPrimary"
              className={classes.label}
            >
              {t('stake.you-will-get')}
            </Typography>

            <Box ml="auto" />

            <Typography
              variant="body2"
              color="textPrimary"
              className={classes.totalValue}
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
            submitDisabled={submitDisabled}
            isBalanceLoading={isBalanceLoading}
            isLoading={isLoading}
            balance={balance}
            endText={t('unstake-dialog.eta', {
              token: Token.FTM,
              period: t('stake-fantom.unstake-period'),
            })}
            token={Token.aFTMb}
            closeHref={closeHref}
            onSubmit={onSubmit}
            renderFormFooter={renderFormFooter}
            onChange={onChange}
          />
        ) : (
          <UnstakeSuccess
            tokenName={Token.FTM}
            period={t('stake-fantom.unstake-period')}
            onClose={onSuccessClose}
          />
        )}
      </Container>
    </Box>
  );
};

const calcTotalAmount = (amount: BigNumber, burnFee: BigNumber) => {
  const result = amount.minus(burnFee);
  return result.isLessThan(0) ? ZERO : result;
};
