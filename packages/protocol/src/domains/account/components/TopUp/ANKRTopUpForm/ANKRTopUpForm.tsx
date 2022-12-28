import { useCallback } from 'react';
import { Form } from 'react-final-form';

import { useStyles } from './ANKRTopUpFormStyles';
import { AmountInputField, TopUpFormProps } from './ANKRTopUpFormTypes';
import {
  useRenderDisabledForm,
  useRenderForm,
  useInitialValues,
} from './ANKRTopUpFormUtils';

export const ANKRTopUpForm = ({
  onSubmit,
  hasLoginStep,
  initialValues: defaultInitialValues,
  validateAmount,
  isWalletConnected,
}: TopUpFormProps) => {
  const classes = useStyles();

  const { isTopUpInProcess, initialValues } = useInitialValues(
    hasLoginStep,
    defaultInitialValues,
  );

  const renderForm = useRenderForm({
    classes,
    validateAmount,
    isWalletConnected,
  });
  const renderDisabledForm = useRenderDisabledForm(classes);

  const handleSubmit = useCallback(
    data => {
      const amountError = validateAmount?.(data?.amount);

      if (amountError) {
        return { [AmountInputField.amount]: amountError };
      }

      return onSubmit(data);
    },
    [onSubmit, validateAmount],
  );

  return (
    <Form
      onSubmit={handleSubmit}
      render={isTopUpInProcess ? renderDisabledForm : renderForm}
      initialValues={initialValues}
    />
  );
};
