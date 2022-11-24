import { PRICING_PATH } from 'domains/pricing/Routes';
import { useMemo } from 'react';
import { Form } from 'react-final-form';
import { useHistory } from 'react-router';

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
  isWalletConnected,
}: TopUpFormProps) => {
  const classes = useStyles();

  const { isTopUpInProcess, initialValues } = useInitialValues(
    hasLoginStep,
    defaultInitialValues,
  );

  const { location } = useHistory();
  const isPricingPage = useMemo(
    () => location.pathname === PRICING_PATH,
    [location.pathname],
  );

  const renderForm = useRenderForm({
    classes,
    validateAmount,
    isAccountPage,
    isPricingPage,
    isWalletConnected,
    balance,
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
