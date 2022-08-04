import { Box, Button, CircularProgress } from '@material-ui/core';

import { TopUpStep } from 'domains/account/actions/topUp/const';
import { t } from 'modules/i18n/utils/intl';
import { LoadingButton } from 'uiKit/LoadingButton';
import { ITopUpStepsProps } from '../TopUpStepsTypes';
import { useStyles } from './ButtonsStyles';
import { getButtonText } from './ButtonsUtils';

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

  return (
    <Box className={classes.root}>
      <LoadingButton
        className={classes.button}
        disabled={loading || isRejectAllowanceLoading}
        onClick={onConfirm}
        loading={isRejectAllowanceLoading ? false : loading}
      >
        {getButtonText(loading, step, hasCredentials, hasError)}
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
