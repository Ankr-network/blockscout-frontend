import React from 'react';
import { Form } from 'react-final-form';
import BigNumber from 'bignumber.js';

import { useStyles } from './TopUpFormStyles';
import { TopUpFormFields, TopUpFormProps } from './TopUpFormTypes';
import { useAppSelector } from 'store/useAppSelector';
import { selectTransaction } from 'domains/account/store/accountTopUpSlice';
import { useRenderDisabledForm, useRenderForm } from './TopUpFormUtils';

export const TopUpForm = ({ onSubmit }: TopUpFormProps) => {
  const classes = useStyles();

  const transaction = useAppSelector(selectTransaction);

  const isTopUpInProcess = Boolean(
    transaction?.allowanceTransactionHash || transaction?.topUpTransactionHash,
  );

  const renderForm = useRenderForm(classes);
  const renderDisabledForm = useRenderDisabledForm(classes);

  return (
    <Form
      onSubmit={onSubmit}
      render={isTopUpInProcess ? renderDisabledForm : renderForm}
      initialValues={
        isTopUpInProcess
          ? {
              [TopUpFormFields.amount]: new BigNumber(
                transaction?.amount ?? 0,
              ).toNumber(),
            }
          : undefined
      }
    />
  );
};
