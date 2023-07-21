import { useCallback, useEffect, useMemo, useState } from 'react';

import { useLazyUserSettingsGetEmailBindingsQuery } from 'domains/userSettings/actions/email/getEmailBindings';

import {
  AddEmailFormContentState,
  IAddEmailFormData,
} from '../../AddEmailForm/types';
import { stateToTitle } from '../const';

interface IUseContentParams {
  initialContentState: AddEmailFormContentState;
  initialSubmittedData?: IAddEmailFormData;
  resetInviteEmail?: () => void;
  onSuccess?: () => void;
}

interface IUseContentResult {
  title: string;

  contentState: AddEmailFormContentState;
  setContentState: (state: AddEmailFormContentState) => void;

  submittedEmail?: string;
  onFormSubmit: (formData?: IAddEmailFormData) => void;
  onAddEmailSubmitSuccess: () => void;
}

export const useContent = ({
  initialContentState,
  initialSubmittedData,
  resetInviteEmail,
}: IUseContentParams): IUseContentResult => {
  const [getEmailBindings] = useLazyUserSettingsGetEmailBindingsQuery();

  const [submittedEmail, setSubmittedEmail] = useState<string | undefined>(
    initialSubmittedData?.email,
  );

  const [contentState, setContentState] =
    useState<AddEmailFormContentState>(initialContentState);

  const title = useMemo(() => stateToTitle[contentState], [contentState]);

  const onFormSubmit = useCallback((formData?: IAddEmailFormData) => {
    setSubmittedEmail(formData?.email);
  }, []);

  const onAddEmailSubmitSuccess = useCallback(() => {
    getEmailBindings(undefined);

    resetInviteEmail?.();
  }, [getEmailBindings, resetInviteEmail]);

  useEffect(() => {
    setContentState(initialContentState);
  }, [initialContentState]);

  useEffect(() => {
    setSubmittedEmail(initialSubmittedData?.email);
  }, [initialSubmittedData]);

  return {
    title,

    contentState,
    setContentState,

    submittedEmail,
    onFormSubmit,
    onAddEmailSubmitSuccess,
  };
};
