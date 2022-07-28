import { Button } from '@material-ui/core';

import { t } from 'common';
import { FieldError } from 'modules/form/components/FieldError';
import { useStyles } from './LinkExpiredActionSlotStyles';

interface ILinkExpiredActionSlotProps {
  resendEmailErrorMessage?: string;
  isResendEmailDisabled?: boolean;
  onChangeEmail?: () => void;
  onResendEmail: () => void;
}

export const LinkExpiredActionSlot = ({
  resendEmailErrorMessage,
  isResendEmailDisabled = false,
  onChangeEmail,
  onResendEmail,
}: ILinkExpiredActionSlotProps) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.buttonContainer}>
        <Button onClick={onResendEmail} disabled={isResendEmailDisabled}>
          {t('user-settings.link-expired-card.resend-email-button')}
        </Button>

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
