import { Box, Button, Typography } from '@mui/material';
import {
  Github,
  Google as GoogleIcon,
  Warning as WarningIcon,
} from '@ankr.com/ui';
import { t, tHTML } from '@ankr.com/common';
import { Field, useForm } from 'react-final-form';
import { useCallback } from 'react';

import { ReactComponent as EthereumIcon } from 'uiKit/Icons/eth.svg';
import { CheckboxField } from 'modules/form/components/CheckboxField';

import { useDefaultContentFormStyles } from './useDefaultContentFormStyles';
import {
  SignupDialogState,
  SignupFormErrors,
  SignupFormField,
  OauthLoginType,
} from '../SignupDialogDefaultContentTypes';

interface DefaultContentFormProps {
  description?: string;
  handleSubmit: () => void;
  hasAutoAgreement?: boolean;
  hasOnlyGoogleAuth?: boolean;
}

export const DefaultContentForm = ({
  description,
  handleSubmit,
  hasAutoAgreement = false,
  hasOnlyGoogleAuth = false,
}: DefaultContentFormProps) => {
  const { classes } = useDefaultContentFormStyles();

  const { change, getState } = useForm();

  const { hasTerms: termsError } = getState().errors as SignupFormErrors;

  const setGoogleLoginType = useCallback(() => {
    change(SignupFormField.loginType, OauthLoginType.Google);
  }, [change]);

  const setGithubLoginType = useCallback(() => {
    change(SignupFormField.loginType, OauthLoginType.Github);
  }, [change]);

  const setWeb3LoginType = useCallback(() => {
    change(SignupFormField.loginType, SignupDialogState.WEB3);
  }, [change]);

  const agreementCheckboxes = (
    <div className={classes.checkboxes}>
      <Field
        component={CheckboxField}
        name={SignupFormField.hasTerms}
        type="checkbox"
        shouldHideError
        className={classes.formLabel}
        subscription={{ value: true }}
        label={
          <Typography variant="subtitle3" className={classes.label}>
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
          <Typography variant="subtitle3" className={classes.label}>
            {tHTML('signup-modal.form.marketing-emails')}
          </Typography>
        }
      />
    </div>
  );

  const autoAgreementMessage = (
    <Typography
      className={classes.agreementMessage}
      component="p"
      variant="body3"
    >
      {tHTML('signup-modal.form.auto-agreement-message')}
    </Typography>
  );

  return (
    <>
      {description && (
        <Typography className={classes.description} variant="body2">
          {description}
        </Typography>
      )}
      <form onSubmit={handleSubmit} className={classes.form}>
        <Button
          fullWidth
          className={classes.button}
          variant="outlined"
          type="submit"
          onClick={setGoogleLoginType}
          startIcon={<GoogleIcon className={classes.loginIcon} />}
          disabled={Boolean(termsError)}
        >
          {t('signup-modal.web2.google')}
        </Button>
        {!hasOnlyGoogleAuth && (
          <>
            <Button
              fullWidth
              className={classes.button}
              variant="outlined"
              type="submit"
              onClick={setGithubLoginType}
              startIcon={<Github className={classes.loginIcon} />}
              disabled={Boolean(termsError)}
            >
              {t('signup-modal.web2.github')}
            </Button>

            <Typography
              variant="subtitle3"
              className={classes.or}
              component="div"
            >
              {t('signup-modal.web2.or')}
            </Typography>

            <Button
              fullWidth
              className={classes.button}
              variant="outlined"
              type="submit"
              onClick={setWeb3LoginType}
              startIcon={<EthereumIcon />}
              disabled={Boolean(termsError)}
            >
              {t('signup-modal.web3.button')}
            </Button>
          </>
        )}
        {termsError && (
          <Box className={classes.error}>
            <WarningIcon color="error" className={classes.icon} /> {termsError}
          </Box>
        )}
        {hasAutoAgreement ? autoAgreementMessage : agreementCheckboxes}
      </form>
    </>
  );
};
