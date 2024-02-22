import { useCallback, useState } from 'react';

import {
  AddEmailFormContentState,
  IAddEmailFormData,
} from 'domains/userSettings/components/AddEmailForm/types';

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

  return {
    contentState,
    email: submittedData?.email,

    formProps: {
      contentState,
      submittedEmail: submittedData?.email,
      onFormStateChange: setContentState,
      onFormSubmit,
    },
  };
};
