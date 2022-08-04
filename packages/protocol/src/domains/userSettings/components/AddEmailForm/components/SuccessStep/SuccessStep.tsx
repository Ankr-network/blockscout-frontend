import { Button } from '@material-ui/core';

import { t } from 'common';
import { FieldError } from 'modules/form/components/FieldError';
import { AnimatedButton } from 'uiKit/AnimatedButton';
import { useStyles } from './SuccessStepStyles';

export interface ISuccessStepProps {
  onResendEmail: () => void;
  resendEmailData: any;
  resendEmailLoading: boolean;
  resendEmailErrorMessage?: string;

  onChangeEmail?: () => void;
}

export const SuccessStep = ({
  onResendEmail,
  resendEmailData,
  resendEmailLoading,
  resendEmailErrorMessage,
  onChangeEmail,
}: ISuccessStepProps) => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.buttonContainer}>
        <AnimatedButton
          className={classes.button}
          size="large"
          variant="outlined"
          onClick={onResendEmail}
          data={resendEmailData}
          loading={resendEmailLoading}
          width={150}
        >
          {isSuccess =>
            isSuccess
              ? t(
                  'user-settings.email-banner.success-step.resend-email-button-sent',
                )
              : t('user-settings.email-banner.success-step.resend-email-button')
          }
        </AnimatedButton>

        {onChangeEmail && (
          <Button
            className={classes.button}
            size="large"
            variant="outlined"
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
