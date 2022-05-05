import React from 'react';
import { Form } from 'react-final-form';

import { useStyles } from './TopUpFormStyles';
import { TopUpFormFields, TopUpFormProps } from './TopUpFormTypes';
import { useAppSelector } from 'store/useAppSelector';
import { selectAccount } from 'domains/account/store/accountSlice';
import { useRenderDisabledForm, useRenderForm } from './TopUpFormUtils';

export const TopUpForm = ({ onSubmit }: TopUpFormProps) => {
  const classes = useStyles();

  const { allowanceTransaction, topUpTransaction, amount } =
    useAppSelector(selectAccount);

  const isTopUpInProcess = Boolean(allowanceTransaction || topUpTransaction);

  const renderForm = useRenderForm(classes);
  const renderDisabledForm = useRenderDisabledForm(classes);

  return (
    <Form
      onSubmit={onSubmit}
      render={isTopUpInProcess ? renderDisabledForm : renderForm}
      initialValues={
        isTopUpInProcess
          ? { [TopUpFormFields.amount]: amount.toNumber() }
          : undefined
      }
    />
  );
};
