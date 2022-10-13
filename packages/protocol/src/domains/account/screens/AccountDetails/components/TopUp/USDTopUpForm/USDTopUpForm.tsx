import React, { useMemo } from 'react';
import { Form } from 'react-final-form';
import BigNumber from 'bignumber.js';

import { useStyles } from './USDTopUpFormStyles';
import { AmountInputField, TopUpFormProps } from './USDTopUpFormTypes';
import { useRenderForm } from './USDTopUpFormUtils';
import { DEFAULT_USD_VALUE } from '../../const';

export const USDTopUpForm = ({
  onSubmit,
  isLoading,
  isDisabled,
  hasRateBlock,
}: TopUpFormProps) => {
  const classes = useStyles();

  const renderForm = useRenderForm(
    classes,
    isLoading,
    isDisabled,
    hasRateBlock,
  );

  const initialValues = useMemo(
    () => ({
      [AmountInputField.amount]: isDisabled
        ? new BigNumber(DEFAULT_USD_VALUE).toString(10)
        : '',
    }),
    [isDisabled],
  );

  return (
    <Form
      onSubmit={onSubmit}
      render={renderForm}
      initialValues={initialValues}
    />
  );
};
