import React from 'react';
import {
  Box,
  Button,
  CircularProgress,
  FormGroup,
  Typography,
} from '@material-ui/core';
import { tHTML } from 'modules/i18n/utils/intl';
import { Field } from 'react-final-form';
import { CheckboxField } from 'modules/form/components/CheckboxField/CheckboxField';
import { Mutation } from '@redux-requests/react';
import { deposit } from 'modules/auth/actions/deposit';
import { useDepositAgreementFormStyles } from './DepositAgreementFormStyles';
import { AgreementFormFields } from '../DepositTypes';

interface IDepositAgreementFormProps {
  isConfirmed?: boolean;
}

export const DepositAgreementForm = ({
  isConfirmed,
}: IDepositAgreementFormProps) => {
  const classes = useDepositAgreementFormStyles();

  return (
    <>
      <FormGroup row>
        <Field
          component={CheckboxField}
          type="checkbox"
          name={AgreementFormFields.confirmed}
          label={
            <Typography
              className={classes.agreementText}
              variant="caption"
              color="textSecondary"
            >
              {tHTML('plan.deposit.agreement.text')}
            </Typography>
          }
        />
      </FormGroup>
      <Box mt={2.5} className={classes.buttonWrapper}>
        <Mutation type={deposit}>
          {({ loading }) => (
            <Button
              color="primary"
              fullWidth
              type="submit"
              disabled={loading || !isConfirmed}
            >
              {loading ? (
                <CircularProgress size={14} />
              ) : (
                tHTML('plan.deposit.agreement.button')
              )}
            </Button>
          )}
        </Mutation>
      </Box>
    </>
  );
};
