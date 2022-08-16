import { useCallback, useMemo, useState } from 'react';
import {
  AddEmailFormContentState,
  IAddEmailFormData,
} from '../../AddEmailForm/types';
import { stateToTitle } from '../const';

interface IUseContentParams {
  initialContentState: AddEmailFormContentState;
  initialSubmittedData?: IAddEmailFormData;
}

interface IUseContentResult {
  title: string;

  contentState: AddEmailFormContentState;
  setContentState: (state: AddEmailFormContentState) => void;

  submittedData?: IAddEmailFormData;
  onFormSubmit: (formData?: IAddEmailFormData) => void;
}

export const useContent = ({
  initialContentState,
  initialSubmittedData,
}: IUseContentParams): IUseContentResult => {
  const [submittedData, setSubmittedData] = useState<
    IAddEmailFormData | undefined
  >(initialSubmittedData);

  const [contentState, setContentState] =
    useState<AddEmailFormContentState>(initialContentState);

  const title = useMemo(() => stateToTitle[contentState], [contentState]);

  const onFormSubmit = useCallback((formData?: IAddEmailFormData) => {
    setSubmittedData(formData);
  }, []);

  return {
    title,

    contentState,
    setContentState,

    submittedData,
    onFormSubmit,
  };
};
