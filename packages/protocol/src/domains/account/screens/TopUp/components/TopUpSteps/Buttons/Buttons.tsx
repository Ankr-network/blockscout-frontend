import { Box, Button, CircularProgress } from '@material-ui/core';
import { useMemo } from 'react';

import { ITopUpStepsProps } from '../TopUpStepsTypes';
import { LoadingButton } from 'uiKit/LoadingButton';
import { TopUpStep } from 'domains/account/actions/topUp/const';
import { TransactionConfirmationButton } from './TransactionConfirmationButton';
import { getButtonText } from './ButtonsUtils';
import { t } from 'modules/i18n/utils/intl';
import { topUpFetchTransactionConfirmationStatus } from 'domains/account/actions/topUp/fetchTransactionConfirmationStatus';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { useStyles } from './ButtonsStyles';

interface IButtonProps
  extends Omit<ITopUpStepsProps, 'amount' | 'walletMeta'> {}

export const Buttons = ({
  hasCredentials,
  hasError,
  isRejectAllowanceLoading,
  loading,
  loadingWaitTransactionConfirming,
  onConfirm,
  onReject,
  step,
}: IButtonProps) => {
  const [, { data: confirmationStatus }] = useQueryEndpoint(
    topUpFetchTransactionConfirmationStatus,
  );

  const classes = useStyles();

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
              {getButtonText(loading, step, hasCredentials, hasError)}
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
            {getButtonText(loading, step, hasCredentials, hasError)}
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
            {getButtonText(loading, step, hasCredentials, hasError)}
          </LoadingButton>
        );
    }
  }, [
    classes.button,
    confirmationStatus,
    hasCredentials,
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
