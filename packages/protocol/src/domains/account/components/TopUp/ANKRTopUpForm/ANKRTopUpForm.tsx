import { Form } from 'react-final-form';

import { useStyles } from './ANKRTopUpFormStyles';
import { TopUpFormProps } from './ANKRTopUpFormTypes';
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

  return (
    <Form
      onSubmit={onSubmit}
      render={isTopUpInProcess ? renderDisabledForm : renderForm}
      initialValues={initialValues}
    />
  );
};
