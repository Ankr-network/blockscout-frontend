import { useCallback, useMemo, useState } from 'react';

import {
  AddEmailFormContentState,
  IAddEmailFormData,
} from 'domains/userSettings/components/AddEmailForm/types';
import { IUseAddEmailFormProps } from 'domains/userSettings/components/AddEmailForm/useAddEmailForm';

export const useChangeEmailDialog = () => {
  const [submittedData, setSubmittedData] = useState<
    IAddEmailFormData | undefined
  >(undefined);

  const [contentState, setContentState] = useState<AddEmailFormContentState>(
    AddEmailFormContentState.ADD_EMAIL,
  );

  const onFormSubmit = useCallback((formData?: IAddEmailFormData) => {
    setSubmittedData(formData);
  }, []);

  const formProps = useMemo<IUseAddEmailFormProps>(
    () => ({
      contentState,
      submittedData,
      onFormStateChange: setContentState,
      onFormSubmit,
    }),
    [contentState, onFormSubmit, submittedData],
  );

  return {
    contentState,
    email: submittedData?.email,

    formProps,
  };
};
