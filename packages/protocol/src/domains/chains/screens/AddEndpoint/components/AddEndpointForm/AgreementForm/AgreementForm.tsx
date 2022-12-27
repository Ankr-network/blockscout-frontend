import React from 'react';
import { Box, Button, CircularProgress, Typography } from '@material-ui/core';
import { Field, useForm } from 'react-final-form';

import { tHTML } from 'modules/i18n/utils/intl';
import { CheckboxField } from 'modules/form/components/CheckboxField/CheckboxField';
import { useStyles } from './AgreementFormStyles';
import { AddEndpointFormFields } from '../AddEndpointFormTypes';
import { useLazyInfrastructureApiAddPrivateEndpointQuery } from 'domains/infrastructure/actions/addPrivateEndpoint';

const HAS_CHECKBOX = false;

export const AgreementForm = () => {
  const classes = useStyles();
  const form = useForm();
  const [, { isLoading }] = useLazyInfrastructureApiAddPrivateEndpointQuery();

  return (
    <div className={classes.root}>
      {HAS_CHECKBOX && (
        <div className={classes.checkbox}>
          <Field
            component={CheckboxField}
            type="checkbox"
            name={AddEndpointFormFields.confirmed}
            label={
              <Typography
                className={classes.agreementText}
                variant="caption"
                color="textSecondary"
              >
                {tHTML('providers.add-endpoint.agreement.text')}
              </Typography>
            }
          />
        </div>
      )}

      <Box className={classes.buttonWrapper}>
        <Button
          color="primary"
          fullWidth
          type="submit"
          disabled={form.getState().validating || isLoading}
          className={classes.button}
        >
          {form.getState().validating || isLoading ? (
            <CircularProgress size={14} />
          ) : (
            tHTML('providers.add-endpoint.agreement.button')
          )}
        </Button>
      </Box>
    </div>
  );
};
