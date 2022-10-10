import { useMemo } from 'react';
import { Form } from 'react-final-form';
import BigNumber from 'bignumber.js';

import { useStyles } from './TopUpFormStyles';
import { AmountInputField, TopUpFormProps } from './TopUpFormTypes';
import { useRenderDisabledForm, useRenderForm } from './TopUpFormUtils';
import { useSelectTopUpTransaction } from 'domains/account/hooks/useSelectTopUpTransaction';

export const TopUpForm = ({ onSubmit, hasLoginStep }: TopUpFormProps) => {
  const classes = useStyles();
  const transaction = useSelectTopUpTransaction();

  const isTopUpInProcess = Boolean(
    transaction?.allowanceTransactionHash ||
      transaction?.topUpTransactionHash ||
      hasLoginStep,
  );

  const renderForm = useRenderForm(classes);
  const renderDisabledForm = useRenderDisabledForm(classes);

  const initialValues = useMemo(() => {
    return isTopUpInProcess
      ? {
          [AmountInputField.amount]: new BigNumber(
            transaction?.amount ?? 0,
          ).toString(10),
        }
      : {};
  }, [transaction?.amount, isTopUpInProcess]);

  return (
    <Form
      onSubmit={onSubmit}
      render={isTopUpInProcess ? renderDisabledForm : renderForm}
      initialValues={initialValues}
    />
  );
};
