import React from 'react';
import { Box, Button, CircularProgress } from '@material-ui/core';

import { useStyles } from './ButtonsStyles';
import { t } from 'modules/i18n/utils/intl';
import { getButtonText } from './ButtonsUtils';
import { TopUpStep } from 'domains/account/actions/topUp/const';
import { ITopUpStepsProps } from '../TopUpStepsTypes';
import { LoadingButton } from '../LoadingButton/LoadingButton';

interface IButtonProps extends Omit<ITopUpStepsProps, 'amount'> {}

export const Buttons = ({
  step,
  onConfirm,
  onReject,
  loading,
  hasCredentials,
  isRejectAllowanceLoading,
}: IButtonProps) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <LoadingButton
        className={classes.button}
        isDisabled={loading || isRejectAllowanceLoading}
        onClick={onConfirm}
        loading={isRejectAllowanceLoading ? false : loading}
      >
        {getButtonText(loading, step, hasCredentials)}
      </LoadingButton>
      {step === TopUpStep.deposit && (
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
      )}
    </Box>
  );
};
