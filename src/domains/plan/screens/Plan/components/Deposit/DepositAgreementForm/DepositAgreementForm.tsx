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
import { CheckboxField } from '../../../../../../../modules/form/components/CheckboxField/CheckboxField';
import { Mutation } from '@redux-requests/react';
import { deposit } from '../../../../../../../modules/auth/actions/deposit';

export const DepositAgreementForm = () => {
  return (
    <>
      <FormGroup row>
        <Field
          component={CheckboxField}
          type="checkbox"
          name="confirmed"
          label={
            <Box ml={2}>
              <Typography variant="caption" color="textSecondary">
                {tHTML('plan.deposit.agreement.text')}
              </Typography>
            </Box>
          }
        />
      </FormGroup>
      <Box mt={2.5} maxWidth={210}>
        <Mutation type={deposit}>
          {({ loading }) => (
            <Button color="primary" fullWidth type="submit" disabled={loading}>
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
