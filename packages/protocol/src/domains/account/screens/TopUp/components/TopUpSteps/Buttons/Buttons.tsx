import { useMemo } from 'react';
import { Box, Button, CircularProgress } from '@material-ui/core';

import { TopUpStep } from 'domains/account/actions/topUp/const';
import { t } from 'modules/i18n/utils/intl';
import { LoadingButton } from 'uiKit/LoadingButton';
import { ITopUpStepsProps } from '../TopUpStepsTypes';
import { useStyles } from './ButtonsStyles';
import { getButtonText } from './ButtonsUtils';
import { TransactionConfirmationButton } from './TransactionConfirmationButton';

interface IButtonProps extends Omit<ITopUpStepsProps, 'amount'> {}

export const Buttons = ({
  step,
  onConfirm,
  onReject,
  loading,
  hasCredentials,
  isRejectAllowanceLoading,
  hasError,
}: IButtonProps) => {
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
        if (loading) {
          return <TransactionConfirmationButton className={classes.button} />;
        }

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
    step,
    loading,
    isRejectAllowanceLoading,
    hasCredentials,
    hasError,
    classes.button,
    onConfirm,
    onReject,
  ]);

  return <Box className={classes.root}>{content}</Box>;
};
