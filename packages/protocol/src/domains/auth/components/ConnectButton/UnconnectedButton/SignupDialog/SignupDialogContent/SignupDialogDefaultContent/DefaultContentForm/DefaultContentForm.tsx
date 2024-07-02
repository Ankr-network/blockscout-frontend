import { Box, Button, Typography } from '@mui/material';
import {
  Github,
  Google as GoogleIcon,
  Warning as WarningIcon,
} from '@ankr.com/ui';
import { Field } from 'react-final-form';
import { ReactNode } from 'react';
import { t, tHTML } from '@ankr.com/common';

import { CheckboxField } from 'modules/form/components/CheckboxField';
import { ReactComponent as EthereumIcon } from 'uiKit/Icons/eth.svg';

import { SignupFormField } from '../SignupDialogDefaultContentTypes';
import { useDefaultContentForm } from './hooks/useDefaultContentForm';
import { useDefaultContentFormStyles } from './useDefaultContentFormStyles';

interface DefaultContentFormProps {
  description?: string;
  extraContent?: ReactNode;
  handleSubmit: () => void;
  hasAutoAgreement?: boolean;
  hasOnlyGoogleAuth?: boolean;
}

export const DefaultContentForm = ({
  description,
  extraContent,
  handleSubmit,
  hasAutoAgreement = false,
  hasOnlyGoogleAuth = false,
}: DefaultContentFormProps) => {
  const {
    setGithubLoginType,
    setGoogleLoginType,
    setWeb3LoginType,
    termsError,
  } = useDefaultContentForm();

  const { classes } = useDefaultContentFormStyles();

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
        {Boolean(extraContent) && (
          <div className={classes.extraContent}>{extraContent}</div>
        )}
      </form>
    </>
  );
};
