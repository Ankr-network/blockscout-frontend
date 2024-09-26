import { Field } from 'react-final-form';
import { ReactNode } from 'react';
import { Typography } from '@mui/material';
import { tHTML } from '@ankr.com/common';

import { CheckboxField } from 'modules/form/components/CheckboxField';

import { ButtonsSeparator } from './components/ButtonsSeparator';
import { OAuthButtons } from './components/OauthButtons';
import {
  ReferralCodeBox,
  useReferralCodeBox,
} from './components/ReferralCodeBox';
import { SignupFormField } from '../SignupDialogDefaultContentTypes';
import { TermsError } from './components/TermsError';
import { Web3Buttons } from './components/Web3Buttons';
import { useDefaultContentForm } from './hooks/useDefaultContentForm';
import { useDefaultContentFormStyles } from './useDefaultContentFormStyles';

export interface IDefaultContentFormProps {
  canProcessReferralCode?: boolean;
  description?: string;
  extraContent?: ReactNode;
  handleSubmit: () => void;
  hasAutoAgreement?: boolean;
  hasOnlyGoogleAuth?: boolean;
  isReferralCodeBoxDisabled?: boolean;
}

export const DefaultContentForm = ({
  canProcessReferralCode,
  description,
  extraContent,
  handleSubmit,
  hasAutoAgreement = false,
  hasOnlyGoogleAuth = false,
  isReferralCodeBoxDisabled = false,
}: IDefaultContentFormProps) => {
  const {
    setGithubLoginType,
    setGoogleLoginType,
    setWeb3LoginType,
    termsError,
  } = useDefaultContentForm();

  const referralCodeBoxProps = useReferralCodeBox({
    isDisabled: isReferralCodeBoxDisabled,
  });

  const {
    inputProps: { error: referralCodeError },
  } = referralCodeBoxProps;

  const { classes } = useDefaultContentFormStyles();

  const agreementCheckboxes = (
    <div className={classes.checkboxes}>
      <Field
        className={classes.formLabel}
        component={CheckboxField}
        label={
          <Typography className={classes.label} variant="body3">
            {tHTML('signup-modal.form.terms-of-service')}
          </Typography>
        }
        name={SignupFormField.hasTerms}
        shouldHideError
        subscription={{ value: true }}
        type="checkbox"
      />
      <Field
        className={classes.formLabel}
        component={CheckboxField}
        label={
          <Typography className={classes.label} variant="body3">
            {tHTML('signup-modal.form.marketing-emails')}
          </Typography>
        }
        name={SignupFormField.hasMarketing}
        type="checkbox"
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

  const hasError = Boolean(termsError || referralCodeError);

  return (
    <>
      {description && (
        <Typography className={classes.description} variant="body2">
          {description}
        </Typography>
      )}
      <form onSubmit={handleSubmit} className={classes.form}>
        <OAuthButtons
          onGithubButtonClick={setGithubLoginType}
          onGoogleButtonClick={setGoogleLoginType}
          hasError={hasError}
          hasGoogleAuthOnly={hasOnlyGoogleAuth}
        />
        {!hasOnlyGoogleAuth && (
          <>
            <ButtonsSeparator />
            <Web3Buttons
              hasError={hasError}
              onEthButtonClick={setWeb3LoginType}
            />
          </>
        )}
        {canProcessReferralCode && (
          <ReferralCodeBox {...referralCodeBoxProps} />
        )}
        <TermsError error={termsError} />
        {hasAutoAgreement ? autoAgreementMessage : agreementCheckboxes}
        {Boolean(extraContent) && (
          <div className={classes.extraContent}>{extraContent}</div>
        )}
      </form>
    </>
  );
};
