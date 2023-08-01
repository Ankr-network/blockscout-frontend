import { Form } from 'react-final-form';

import { TopUpFormProps } from './USDTopUpFormTypes';
import { useInitialValues, useRenderForm } from './USDTopUpFormUtils';

export const USDTopUpForm = ({
  isLoading,
  onSubmit,
  shouldUseDefaultValue,
  trackSubmit,
  usdPriceId,
}: TopUpFormProps) => {
  const renderForm = useRenderForm({
    isLoading,
    shouldUseDefaultValue,
    trackSubmit,
    usdPriceId,
  });

  const initialValues = useInitialValues(usdPriceId, shouldUseDefaultValue);

  return (
    <Form
      onSubmit={onSubmit}
      render={renderForm}
      initialValues={initialValues}
    />
  );
};
