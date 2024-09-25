import { useCallback } from 'react';
import { useForm } from 'react-final-form';

import {
  OauthLoginType,
  SignupDialogState,
  SignupFormErrors,
  SignupFormField,
} from '../../SignupDialogDefaultContentTypes';

export const useDefaultContentForm = () => {
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

  return {
    setGithubLoginType,
    setGoogleLoginType,
    setWeb3LoginType,
    termsError,
  };
};
