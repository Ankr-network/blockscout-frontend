import React, { useCallback } from 'react';
import { Divider, Typography } from '@material-ui/core';
import { t, tHTML } from 'modules/i18n/utils/intl';
import { DepositAgreementForm } from './DepositAgreementForm';
import { DepositTitles } from '../DepositTitles';
import { useStyles } from './useStyles';
import { Form, FormRenderProps } from 'react-final-form';
import { FormErrors } from '../../../../../../modules/form/utils/FormErrors';

interface IDepositFormData {
  confirmed: boolean;
}

const validate = (data: Partial<IDepositFormData>) => {
  const errors: FormErrors<IDepositFormData> = {};

  if (!data.confirmed) {
    errors.confirmed = t('plan.deposit.validation.checkbox');
  }

  return errors;
};

interface IDepositProps {
  onSubmit: (data: IDepositFormData) => void;
}

export const Deposit = ({ onSubmit }: IDepositProps) => {
  const classes = useStyles();

  const renderForm = useCallback(
    ({ handleSubmit }: FormRenderProps<IDepositFormData>) => {
      return (
        <form onSubmit={handleSubmit}>
          <DepositAgreementForm />
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
          initialValues={{ confirmed: false }}
        />
      </div>
    </div>
  );
};
