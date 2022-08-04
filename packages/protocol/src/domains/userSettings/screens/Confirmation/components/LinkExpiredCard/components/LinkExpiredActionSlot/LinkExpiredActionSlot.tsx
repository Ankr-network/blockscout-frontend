import { Button } from '@material-ui/core';

import { t } from 'common';
import { FieldError } from 'modules/form/components/FieldError';
import { AnimatedButton } from 'uiKit/AnimatedButton';
import { useStyles } from './LinkExpiredActionSlotStyles';

export interface ILinkExpiredActionSlotProps {
  onChangeEmail?: () => void;
  resendEmailData: any;
  resendEmailLoading: boolean;
  resendEmailErrorMessage?: string;

  onResendEmail: () => void;
}

export const LinkExpiredActionSlot = ({
  onChangeEmail,
  resendEmailData,
  resendEmailLoading,
  resendEmailErrorMessage,
  onResendEmail,
}: ILinkExpiredActionSlotProps) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.buttonContainer}>
        <AnimatedButton
          onClick={onResendEmail}
          width={150}
          data={resendEmailData}
          loading={resendEmailLoading}
        >
          {isSuccess =>
            isSuccess
              ? t('user-settings.link-expired-card.resend-email-button-sent')
              : t('user-settings.link-expired-card.resend-email-button')
          }
        </AnimatedButton>

        {onChangeEmail && (
          <Button variant="outlined" onClick={onChangeEmail}>
            {t('user-settings.link-expired-card.change-email-button')}
          </Button>
        )}
      </div>

      {resendEmailErrorMessage && (
        <FieldError>{resendEmailErrorMessage}</FieldError>
      )}
    </>
  );
};
