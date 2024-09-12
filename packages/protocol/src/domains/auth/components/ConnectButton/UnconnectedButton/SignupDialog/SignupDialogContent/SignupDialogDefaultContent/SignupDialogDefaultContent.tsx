import { Form } from 'react-final-form';
import { useCallback } from 'react';
import { useLocation } from 'react-router';

import { isTeamInvitationQuery } from 'domains/userSettings/utils/isTeamInvitationQuery';
import { TEAM_INVITE_LINK_SEARCH_KEY } from 'modules/common/constants/const';

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
  description,
  hasAutoAgreement,
  hasOnlyGoogleAuth = false,
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
            TEAM_INVITE_LINK_SEARCH_KEY,
            window.location.search,
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
        description={description}
        handleSubmit={handleSubmit}
        hasAutoAgreement={hasAutoAgreement}
        hasOnlyGoogleAuth={hasOnlyGoogleAuth}
      />
    ),
    [description, hasAutoAgreement, hasOnlyGoogleAuth],
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
