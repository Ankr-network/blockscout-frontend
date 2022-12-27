import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  AddEmailFormContentState,
  IAddEmailFormData,
} from '../../AddEmailForm/types';
import { stateToTitle } from '../const';
import { useLazyUserSettingsGetEmailBindingsQuery } from 'domains/userSettings/actions/email/getEmailBindings';

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

  submittedData?: IAddEmailFormData;
  onFormSubmit: (formData?: IAddEmailFormData) => void;
  onAddEmailSubmitSuccess: () => void;
}

export const useContent = ({
  initialContentState,
  initialSubmittedData,
  resetInviteEmail,
}: IUseContentParams): IUseContentResult => {
  const [getEmailBindings] = useLazyUserSettingsGetEmailBindingsQuery();

  const [submittedData, setSubmittedData] = useState<
    IAddEmailFormData | undefined
  >(initialSubmittedData);

  const [contentState, setContentState] =
    useState<AddEmailFormContentState>(initialContentState);

  const title = useMemo(() => stateToTitle[contentState], [contentState]);

  const onFormSubmit = useCallback((formData?: IAddEmailFormData) => {
    setSubmittedData(formData);
  }, []);

  const onAddEmailSubmitSuccess = useCallback(() => {
    getEmailBindings(undefined);

    resetInviteEmail?.();
  }, [getEmailBindings, resetInviteEmail]);

  useEffect(() => {
    setContentState(initialContentState);
  }, [initialContentState]);

  useEffect(() => {
    setSubmittedData(initialSubmittedData);
  }, [initialSubmittedData]);

  return {
    title,

    contentState,
    setContentState,

    submittedData,
    onFormSubmit,
    onAddEmailSubmitSuccess,
  };
};
