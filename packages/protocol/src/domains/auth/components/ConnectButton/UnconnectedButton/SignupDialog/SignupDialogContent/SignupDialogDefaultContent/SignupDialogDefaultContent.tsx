import { Form } from 'react-final-form';
import { useCallback } from 'react';
import { useLocation } from 'react-router';

import { isTeamInvitationQuery } from 'domains/userSettings/utils/isTeamInvitationQuery';
import { TEAM_INVITE_LINK_KEY } from 'modules/common/constants/const';

import {
  useSetSignupSettings,
  useInitialValues,
  validate,
} from './SignupDialogDefaultContentUtils';
import { DefaultContentForm } from './DefaultContentForm';
import {
  SignupDialogDefaultContentProps,
  SignupFormValues,
  OauthLoginType,
} from './SignupDialogDefaultContentTypes';

export const SignupDialogDefaultContent = ({
  canProcessReferralCode,
  description,
  extraContent,
  hasAutoAgreement,
  hasOnlyGoogleAuth = false,
  isReferralCodeBoxDisabled,
  onGithubButtonClick,
  onGoogleButtonClick,
  setWeb3State,
  shouldSaveTeamInvitationLink = true,
}: SignupDialogDefaultContentProps) => {
  const handleSetSignupSettings = useSetSignupSettings();
  const location = useLocation();

  const onSubmit = useCallback(
    ({ hasMarketing, loginType }: SignupFormValues) => {
      handleSetSignupSettings(Boolean(hasMarketing));

      if (loginType === OauthLoginType.Google) {
        const isTeamInvitation = isTeamInvitationQuery(location?.search ?? '');

        if (isTeamInvitation && shouldSaveTeamInvitationLink) {
          window.localStorage.setItem(
            TEAM_INVITE_LINK_KEY,
            window.location.href,
          );
        }

        onGoogleButtonClick();
      } else if (loginType === OauthLoginType.Github) {
        onGithubButtonClick();
      } else {
        setWeb3State();
      }
    },
    [
      handleSetSignupSettings,
      location,
      onGoogleButtonClick,
      onGithubButtonClick,
      setWeb3State,
      shouldSaveTeamInvitationLink,
    ],
  );

  const initialValues = useInitialValues();

  const renderForm = useCallback(
    ({ handleSubmit }) => (
      <DefaultContentForm
        canProcessReferralCode={canProcessReferralCode}
        description={description}
        extraContent={extraContent}
        handleSubmit={handleSubmit}
        hasAutoAgreement={hasAutoAgreement}
        hasOnlyGoogleAuth={hasOnlyGoogleAuth}
        isReferralCodeBoxDisabled={isReferralCodeBoxDisabled}
      />
    ),
    [
      canProcessReferralCode,
      description,
      extraContent,
      hasAutoAgreement,
      hasOnlyGoogleAuth,
      isReferralCodeBoxDisabled,
    ],
  );

  return (
    <Form<SignupFormValues>
      onSubmit={onSubmit}
      initialValues={initialValues}
      validate={validate}
      render={renderForm}
    />
  );
};
