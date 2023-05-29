import { t } from '@ankr.com/common';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import {
  SignupFormErrors,
  SignupFormField,
  SignupFormValues,
} from './SignupDialogDefaultContentTypes';
import { useAppSelector } from 'store/useAppSelector';
import {
  selectSignupSettings,
  setSignupSettings,
} from 'domains/userSettings/store/userSettingsSlice';

export const validate = ({ hasTerms }: SignupFormValues): SignupFormErrors => {
  if (!hasTerms) {
    return {
      hasTerms: t('signup-modal.form.no-terms-error'),
    };
  }

  return {};
};

export const useInitialValues = (): SignupFormValues => {
  const { hasMarketing } = useAppSelector(selectSignupSettings);

  return {
    [SignupFormField.hasTerms]: true,
    [SignupFormField.hasMarketing]:
      typeof hasMarketing === 'boolean' ? hasMarketing : true,
  };
};

export const useSetSignupSettings = () => {
  const dispatch = useDispatch();

  return useCallback(
    hasMarketing => {
      dispatch(setSignupSettings({ hasMarketing }));
    },
    [dispatch],
  );
};
