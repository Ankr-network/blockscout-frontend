import React, { useCallback } from 'react';
import { Box, Divider, LinearProgress, Typography } from '@material-ui/core';
import { t, tHTML } from 'modules/i18n/utils/intl';
import { DepositAgreementForm } from './DepositAgreementForm';
import { DepositTitles } from '../DepositTitles';
import { useStyles } from './useStyles';
import { Form, FormRenderProps } from 'react-final-form';
import { FormErrors } from '../../../../../../modules/form/utils/FormErrors';
import { fetchCredentialsStatus } from '../../../../../../modules/auth/actions/fetchCredentialsStatus';
import { Query } from '@redux-requests/react';

const CREATE_ACCOUNT_BLOCKS_COUNT = 12;

interface IDepositFormData {
  confirmed: boolean;
}

const validate = (data: Partial<IDepositFormData>) => {
  const errors: FormErrors<IDepositFormData> = {};

  if (!data.confirmed) {
    errors.confirmed = t('validation.required');
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

        <Query
          type={fetchCredentialsStatus.toString()}
          action={fetchCredentialsStatus}
          showLoaderDuringRefetch={false}
        >
          {({ data }) => {
            if (data?.isReady || typeof data.remainingBlocks === 'undefined') {
              return null;
            }

            return (
              <Box mt={3}>
                <LinearProgress
                  variant="determinate"
                  value={
                    data.remainingBlocks === 12
                      ? 4
                      : ((CREATE_ACCOUNT_BLOCKS_COUNT - data.remainingBlocks) /
                          CREATE_ACCOUNT_BLOCKS_COUNT) *
                        100
                  }
                />
              </Box>
            );
          }}
        </Query>
      </div>
    </div>
  );
};
