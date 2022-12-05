import { useMemo } from 'react';
import { Form } from 'react-final-form';

import { useStyles } from './USDTopUpFormStyles';
import { AmountInputField, TopUpFormProps } from './USDTopUpFormTypes';
import { defaultAmountValue, useRenderForm } from './USDTopUpFormUtils';
import { ONE_TIME_PAYMENT_ID } from 'domains/account/actions/usdTopUp/fetchLinkForCardPayment';

export const USDTopUpForm = ({
  onSubmit,
  isLoading,
  shouldUseDefaultValue,
  hasRateBlock,
}: TopUpFormProps) => {
  const classes = useStyles();

  const renderForm = useRenderForm(
    classes,
    isLoading,
    shouldUseDefaultValue,
    hasRateBlock,
  );

  const initialValues = useMemo(
    () => ({
      [AmountInputField.amount]: shouldUseDefaultValue
        ? defaultAmountValue
        : '',
      [AmountInputField.id]: ONE_TIME_PAYMENT_ID,
    }),
    [shouldUseDefaultValue],
  );

  return (
    <Form
      onSubmit={onSubmit}
      render={renderForm}
      initialValues={initialValues}
    />
  );
};
