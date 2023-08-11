import { Button } from '@mui/material';
import { TopUp } from '@ankr.com/ui';
import { t } from '@ankr.com/common';
import { useForm, useFormState } from 'react-final-form';

import { ConnectButton } from 'domains/auth/components/ConnectButton';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useConnectButton } from 'modules/common/components/UpgradePlanDialog/components/TopUpForm/hooks/useConnectButton';

import { FormValues } from '../../types';
import { useSubmitButtonStyles } from './SubmitButtonStyles';

export const SubmitButton = () => {
  const { isWalletConnected } = useAuth();

  const { submit } = useForm<FormValues>();
  const { validating } = useFormState<FormValues>();

  const { buttonText, hasConnectButton } = useConnectButton();

  const { classes } = useSubmitButtonStyles();

  if (hasConnectButton) {
    return (
      <ConnectButton
        buttonText={buttonText}
        className={classes.root}
        variant="contained"
      />
    );
  }

  if (isWalletConnected) {
    return (
      <Button
        className={classes.root}
        color="primary"
        disabled={validating}
        fullWidth
        startIcon={<TopUp />}
        type="submit"
      >
        {t('account.account-details.top-up.top-up')}
      </Button>
    );
  }

  return (
    <ConnectButton
      buttonText={t('common.submit')}
      className={classes.root}
      onSuccess={submit}
      variant="contained"
    />
  );
};
