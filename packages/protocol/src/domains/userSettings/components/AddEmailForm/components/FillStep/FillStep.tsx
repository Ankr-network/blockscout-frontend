import { Button } from '@mui/material';
import { Field } from 'react-final-form';
import { t } from '@ankr.com/common';

import { InputField } from 'modules/form/components/InputField';
import { emailValidator } from 'modules/form/utils/validators/emailValidator';
import { ConnectButton } from 'domains/auth/components/ConnectButton';
import { useAuth } from 'domains/auth/hooks/useAuth';

import { AddEmailFormFields } from '../../types';
import { useStyles } from './FillStepStyles';

interface IFillStep {
  handleSubmit: () => void;
  isSubmitButtonDisabled?: boolean;
  formDisabled?: boolean;
}

export const FillStep = ({
  handleSubmit,
  isSubmitButtonDisabled,
  formDisabled,
}: IFillStep) => {
  const { classes } = useStyles();
  const { isWalletConnected } = useAuth();

  return (
    <form onSubmit={handleSubmit} className={classes.inputRow}>
      <div className={classes.emailTextfieldWrapper}>
        <Field
          name={AddEmailFormFields.email}
          type="email"
          validate={emailValidator}
          disabled={formDisabled}
          component={InputField}
          className={classes.emailTextfield}
          InputProps={{ classes: { root: classes.emailInputRoot } }}
          placeholder={t(
            'user-settings.email-banner.add-step.email-input-placeholder',
          )}
        />
      </div>
      {isWalletConnected ? (
        <Button
          className={classes.submitButton}
          size="large"
          type="submit"
          disabled={isSubmitButtonDisabled}
        >
          {t('common.submit')}
        </Button>
      ) : (
        <ConnectButton
          variant="contained"
          buttonText={t('common.submit')}
          onSuccess={handleSubmit}
        />
      )}
    </form>
  );
};
