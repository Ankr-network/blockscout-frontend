import { useMemo } from 'react';
import { Form } from 'react-final-form';

import { useStyles } from './USDTopUpFormStyles';
import { AmountInputField, TopUpFormProps } from './USDTopUpFormTypes';
import { useRenderForm } from './USDTopUpFormUtils';
import { ONE_TIME_PAYMENT_ID } from 'domains/account/actions/usdTopUp/fetchLinkForCardPayment';
import { DEFAULT_USD_VALUE_STRING } from 'domains/account/actions/usdTopUp/const';

export const USDTopUpForm = ({
  onSubmit,
  isLoading,
  shouldUseDefaultValue,
}: TopUpFormProps) => {
  const classes = useStyles();

  const renderForm = useRenderForm(classes, isLoading, shouldUseDefaultValue);

  const initialValues = useMemo(
    () => ({
      [AmountInputField.amount]: shouldUseDefaultValue
        ? DEFAULT_USD_VALUE_STRING
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
