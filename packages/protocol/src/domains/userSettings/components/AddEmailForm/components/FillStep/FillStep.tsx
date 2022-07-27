import { Button } from '@material-ui/core';
import { Field, FormRenderProps } from 'react-final-form';

import { t } from 'common';
import { InputField } from 'modules/form/components/InputField';
import { emailValidator } from 'modules/form/utils/validators/emailValidator';
import { AddEmailFormFields, IAddEmailFormData } from '../../types';
import { useStyles } from './FillStepStyles';

interface IFillStep {
  handleSubmit: FormRenderProps<IAddEmailFormData>['handleSubmit'];
  validating: FormRenderProps<IAddEmailFormData>['validating'];
  hasValidationErrors: FormRenderProps<IAddEmailFormData>['hasValidationErrors'];
}

export const FillStep = ({
  handleSubmit,
  hasValidationErrors,
  validating,
}: IFillStep) => {
  const classes = useStyles();

  return (
    <form onSubmit={handleSubmit} className={classes.inputRow}>
      <div className={classes.emailTextfieldWrapper}>
        <Field
          name={AddEmailFormFields.email}
          type="email"
          validate={emailValidator}
          component={InputField}
          className={classes.emailTextfield}
          InputProps={{ classes: { root: classes.emailInputRoot } }}
          placeholder={t(
            'user-settings.email-banner.add-step.email-input-placeholder',
          )}
        />
      </div>

      <Button
        className={classes.submitButton}
        size="large"
        type="submit"
        disabled={validating || hasValidationErrors}
      >
        {t('common.submit')}
      </Button>
    </form>
  );
};
