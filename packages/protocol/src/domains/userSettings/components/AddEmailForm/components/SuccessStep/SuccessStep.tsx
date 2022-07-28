import { Button } from '@material-ui/core';

import { t } from 'common';
import { FieldError } from 'modules/form/components/FieldError';
import { useStyles } from './SuccessStepStyles';

interface ISuccessStepProps {
  isResendEmailDisabled?: boolean;
  onResendEmail: () => void;
  resendEmailErrorMessage?: string;

  isChangeEmailDisabled?: boolean;
  onChangeEmail?: () => void;
}

export const SuccessStep = ({
  isResendEmailDisabled = false,
  onResendEmail,
  resendEmailErrorMessage,
  isChangeEmailDisabled = false,
  onChangeEmail,
}: ISuccessStepProps) => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.buttonContainer}>
        <Button
          className={classes.button}
          size="large"
          variant="outlined"
          disabled={isResendEmailDisabled}
          onClick={onResendEmail}
        >
          {t('user-settings.email-banner.success-step.resend-email-button')}
        </Button>

        {onChangeEmail && (
          <Button
            className={classes.button}
            size="large"
            variant="outlined"
            disabled={isChangeEmailDisabled}
            onClick={onChangeEmail}
          >
            {t('user-settings.email-banner.success-step.change-email-button')}
          </Button>
        )}
      </div>

      {resendEmailErrorMessage && (
        <FieldError>{resendEmailErrorMessage}</FieldError>
      )}
    </div>
  );
};
