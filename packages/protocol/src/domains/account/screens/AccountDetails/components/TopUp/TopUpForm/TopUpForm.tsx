import { Form } from 'react-final-form';

import { useStyles } from './TopUpFormStyles';
import { TopUpFormProps } from './TopUpFormTypes';
import {
  useRenderDisabledForm,
  useRenderForm,
  useInitialValues,
} from './TopUpFormUtils';

export const TopUpForm = ({
  onSubmit,
  hasLoginStep,
  initialValues: defaultInitialValues,
  validateAmount,
  isAccountPage,
  balance,
}: TopUpFormProps) => {
  const classes = useStyles();

  const { isTopUpInProcess, initialValues } = useInitialValues(
    hasLoginStep,
    defaultInitialValues,
  );

  const renderForm = useRenderForm(
    classes,
    validateAmount,
    isAccountPage,
    balance,
  );
  const renderDisabledForm = useRenderDisabledForm(classes);

  return (
    <Form
      onSubmit={onSubmit}
      render={isTopUpInProcess ? renderDisabledForm : renderForm}
      initialValues={initialValues}
    />
  );
};
