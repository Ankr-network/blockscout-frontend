import { Button } from '@material-ui/core';
import { Field, FormRenderProps, useForm } from 'react-final-form';

import { t } from '@ankr.com/common';
import { InputField } from 'modules/form/components/InputField';
import { emailValidator } from 'modules/form/utils/validators/emailValidator';
import { AddEmailFormFields, IAddEmailFormData } from '../../types';
import { useStyles } from './FillStepStyles';
import { ConnectButton } from 'domains/auth/components/ConnectButton';

interface IFillStep {
  handleSubmit: FormRenderProps<IAddEmailFormData>['handleSubmit'];
  hasValidationErrors: FormRenderProps<IAddEmailFormData>['hasValidationErrors'];
  validating: FormRenderProps<IAddEmailFormData>['validating'];
  formDisabled?: boolean;
  submittedData: IAddEmailFormData | undefined;
  isWalletConnected: boolean;
}

export const FillStep = ({
  handleSubmit,
  hasValidationErrors,
  validating,
  formDisabled,
  submittedData,
  isWalletConnected,
}: IFillStep) => {
  const classes = useStyles();

  const form = useForm();

  return (
    <form onSubmit={handleSubmit} className={classes.inputRow}>
      <div className={classes.emailTextfieldWrapper}>
        <Field
          name={AddEmailFormFields.email}
          type="email"
          validate={emailValidator}
          disabled={!!formDisabled}
          initialValue={submittedData?.[AddEmailFormFields.email]}
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
          disabled={validating || hasValidationErrors}
        >
          {t('common.submit')}
        </Button>
      ) : (
        <ConnectButton
          variant="contained"
          buttonText={t('common.submit')}
          onSuccess={form.submit}
        />
      )}
    </form>
  );
};
