import { Box, Button, Typography } from '@mui/material';
import { Google as GoogleIcon, Warning as WarningIcon } from '@ankr.com/ui';
import { t, tHTML } from '@ankr.com/common';
import { Field, useForm } from 'react-final-form';
import { Variant } from '@mui/material/styles/createTypography';
import { useCallback } from 'react';

import { ReactComponent as EthereumIcon } from 'uiKit/Icons/eth.svg';
import { CheckboxField } from 'modules/form/components/CheckboxField';

import { useDefaultContentFormStyles } from './useDefaultContentFormStyles';
import {
  SignupDialogState,
  SignupFormErrors,
  SignupFormField,
} from '../SignupDialogDefaultContentTypes';

interface DefaultContentFormProps {
  handleSubmit: () => void;
}

export const DefaultContentForm = ({
  handleSubmit,
}: DefaultContentFormProps) => {
  const { classes } = useDefaultContentFormStyles();

  const { change, getState } = useForm();

  const { hasTerms: termsError } = getState().errors as SignupFormErrors;

  const setWeb2State = useCallback(() => {
    change('state', SignupDialogState.WEB2);
  }, [change]);

  const setWeb3State = useCallback(() => {
    change('state', SignupDialogState.WEB3);
  }, [change]);

  return (
    <form onSubmit={handleSubmit}>
      <Button
        fullWidth
        className={classes.button}
        variant="outlined"
        type="submit"
        onClick={setWeb2State}
        startIcon={<GoogleIcon />}
        disabled={Boolean(termsError)}
      >
        {t('signup-modal.web2.button')}
      </Button>
      <Button
        fullWidth
        className={classes.button}
        variant="outlined"
        type="submit"
        onClick={setWeb3State}
        startIcon={<EthereumIcon />}
        disabled={Boolean(termsError)}
      >
        {t('signup-modal.web3.button')}
      </Button>
      {termsError && (
        <Box className={classes.error}>
          <WarningIcon color="error" className={classes.icon} /> {termsError}
        </Box>
      )}
      <Field
        component={CheckboxField}
        name={SignupFormField.hasTerms}
        type="checkbox"
        shouldHideError
        className={classes.formLabel}
        subscription={{ value: true }}
        label={
          <Typography
            variant={'subtitle3' as Variant}
            className={classes.label}
          >
            {tHTML('signup-modal.form.terms-of-service')}
          </Typography>
        }
      />
      <Field
        component={CheckboxField}
        name={SignupFormField.hasMarketing}
        type="checkbox"
        className={classes.formLabel}
        label={
          <Typography
            variant={'subtitle3' as Variant}
            className={classes.label}
          >
            {tHTML('signup-modal.form.marketing-emails')}
          </Typography>
        }
      />
    </form>
  );
};
