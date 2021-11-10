import React, { useCallback } from 'react';
import { Divider, Typography } from '@material-ui/core';
import { Form, FormRenderProps } from 'react-final-form';
import { t, tHTML } from 'modules/i18n/utils/intl';
import { FormErrors } from 'modules/form/utils/FormErrors';
import { DepositAgreementForm } from './DepositAgreementForm';
import { DepositTitles } from '../DepositTitles';
import { AgreementFormFields, IDepositFormData } from './DepositTypes';
import { useDepositStyles } from './useDepositStyles';

const validate = (data: Partial<IDepositFormData>) => {
  const errors: FormErrors<IDepositFormData> = {};

  if (!data[AgreementFormFields.confirmed]) {
    errors[AgreementFormFields.confirmed] = t(
      'plan.deposit.validation.checkbox',
    );
  }

  return errors;
};

interface IDepositProps {
  onSubmit: (data: IDepositFormData) => void;
}

export const Deposit = ({ onSubmit }: IDepositProps) => {
  const classes = useDepositStyles();

  const renderForm = useCallback(
    ({ handleSubmit, form }: FormRenderProps<IDepositFormData>) => {
      const isAgreementFormConfirmed = form.getFieldState(
        AgreementFormFields.confirmed,
      )?.value;

      return (
        <form onSubmit={handleSubmit}>
          {/* isConfirmed prop is used for submit button disabling */}
          <DepositAgreementForm isConfirmed={isAgreementFormConfirmed} />
        </form>
      );
    },
    [],
  );

  return (
    <div className={classes.root}>
      <DepositTitles
        topTitle={t('plan.deposit.title')}
        bottomTitle={tHTML('plan.deposit.subtitle')}
        className={classes.left}
      />
      <div className={classes.right}>
        <div className={classes.top}>
          <Typography variant="h4" className={classes.info}>
            {tHTML('plan.deposit.advantages.private-endpoints')}
          </Typography>
          <Typography variant="h4" className={classes.info}>
            {tHTML('plan.deposit.advantages.prioritized-requests')}
          </Typography>
          <Typography variant="h4" className={classes.info}>
            {tHTML('plan.deposit.advantages.websockets')}
          </Typography>
        </div>
        <Divider className={classes.divider} />
        <Form
          onSubmit={onSubmit}
          render={renderForm}
          validate={validate}
          initialValues={{ [AgreementFormFields.confirmed]: false }}
        />
      </div>
    </div>
  );
};
