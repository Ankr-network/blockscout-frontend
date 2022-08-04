import { AddEmailForm } from 'domains/userSettings/components/AddEmailForm';
import {
  AddEmailFormContentState,
  IAddEmailFormData,
} from 'domains/userSettings/components/AddEmailForm/types';
import { useMemo } from 'react';
import { FillStep } from './components/FillStep';
import { SuccessStep } from './components/SuccessStep';

export interface IAddEmailBannerContentProps {
  submittedData: IAddEmailFormData | undefined;
  contentState: AddEmailFormContentState;
  handleDoNotShowAgain?: () => void;
  onFormStateChange: (state: AddEmailFormContentState) => void;
  onFormSubmit: (data: IAddEmailFormData | undefined) => void;
}

export const AddEmailBannerContent = ({
  submittedData,
  contentState,
  handleDoNotShowAgain,
  onFormStateChange,
  onFormSubmit,
}: IAddEmailBannerContentProps) => {
  const addEmailForm = useMemo(
    () => (
      <AddEmailForm
        submittedData={submittedData}
        contentState={contentState}
        onFormStateChange={onFormStateChange}
        onFormSubmit={onFormSubmit}
      />
    ),
    [contentState, onFormStateChange, onFormSubmit, submittedData],
  );

  switch (contentState) {
    case AddEmailFormContentState.ADD_EMAIL:
    case AddEmailFormContentState.CHANGE_EMAIL:
      return (
        <FillStep handleDoNotShowAgain={handleDoNotShowAgain}>
          {addEmailForm}
        </FillStep>
      );

    case AddEmailFormContentState.SUCCESS:
      return (
        <SuccessStep email={submittedData?.email}>{addEmailForm}</SuccessStep>
      );

    default:
      return null;
  }
};
