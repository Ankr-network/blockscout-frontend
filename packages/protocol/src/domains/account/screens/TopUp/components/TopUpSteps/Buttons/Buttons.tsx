import { useMemo } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import { t } from '@ankr.com/common';

import { TopUpStep } from 'domains/account/actions/topUp/const';
import { LoadingButton } from 'uiKit/LoadingButton';
import { ITopUpStepsProps } from '../TopUpStepsTypes';
import { TransactionConfirmationButton } from './TransactionConfirmationButton';
import { getButtonText } from './ButtonsUtils';
import { topUpFetchTransactionConfirmationStatus } from 'domains/account/actions/topUp/fetchTransactionConfirmationStatus';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { useStyles } from './ButtonsStyles';

interface IButtonProps
  extends Omit<ITopUpStepsProps, 'amount' | 'walletMeta'> {}

export const Buttons = ({
  hasPrivateAccess,
  hasError,
  isRejectAllowanceLoading,
  loading,
  loadingWaitTransactionConfirming,
  onConfirm,
  onReject,
  step,
}: IButtonProps) => {
  const { classes } = useStyles();

  const [, { data: confirmationStatus }] = useQueryEndpoint(
    topUpFetchTransactionConfirmationStatus,
  );

  const content = useMemo(() => {
    switch (step) {
      case TopUpStep.deposit: {
        return (
          <>
            <LoadingButton
              className={classes.button}
              disabled={loading || isRejectAllowanceLoading}
              onClick={onConfirm}
              loading={isRejectAllowanceLoading ? false : loading}
            >
              {getButtonText(loading, step, hasPrivateAccess, hasError)}
            </LoadingButton>
            <Button
              fullWidth
              disabled={loading || isRejectAllowanceLoading}
              onClick={onReject}
              variant="outlined"
              startIcon={
                isRejectAllowanceLoading ? (
                  <CircularProgress size={18} color="inherit" />
                ) : null
              }
            >
              {t(`top-up-steps.button.reject`)}
            </Button>
          </>
        );
      }

      case TopUpStep.waitTransactionConfirming: {
        if (loadingWaitTransactionConfirming && confirmationStatus) {
          return <TransactionConfirmationButton className={classes.button} />;
        }

        return (
          <LoadingButton
            className={classes.button}
            disabled={loading || isRejectAllowanceLoading}
            loading={isRejectAllowanceLoading ? false : loading}
            onClick={onConfirm}
          >
            {getButtonText(loading, step, hasPrivateAccess, hasError)}
          </LoadingButton>
        );
      }

      case TopUpStep.start:
      case TopUpStep.allowance:
      case TopUpStep.login:
      default:
        return (
          <LoadingButton
            className={classes.button}
            disabled={loading || isRejectAllowanceLoading}
            onClick={onConfirm}
            loading={isRejectAllowanceLoading ? false : loading}
          >
            {getButtonText(loading, step, hasPrivateAccess, hasError)}
          </LoadingButton>
        );
    }
  }, [
    classes.button,
    confirmationStatus,
    hasPrivateAccess,
    hasError,
    isRejectAllowanceLoading,
    loading,
    loadingWaitTransactionConfirming,
    onConfirm,
    onReject,
    step,
  ]);

  return <Box className={classes.root}>{content}</Box>;
};
