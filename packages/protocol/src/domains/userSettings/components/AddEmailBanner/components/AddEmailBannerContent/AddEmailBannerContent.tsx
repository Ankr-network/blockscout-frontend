import { AddEmailForm } from 'domains/userSettings/components/AddEmailForm';
import {
  AddEmailFormContentState,
  IAddEmailFormData,
} from 'domains/userSettings/components/AddEmailForm/types';
import { useMemo } from 'react';
import { FillStep } from './components/FillStep';
import { SuccessStep } from './components/SuccessStep';

export interface IAddEmailBannerContentProps {
  contentState: AddEmailFormContentState;
  handleDoNotShowAgain?: () => void;
  onFormStateChange: (state: AddEmailFormContentState) => void;
  onFormSubmit: (data: IAddEmailFormData | undefined) => void;
  onAddEmailSubmitSuccess?: () => void;
  submittedData: IAddEmailFormData | undefined;
  formDisabled?: boolean;
}

export const AddEmailBannerContent = ({
  contentState,
  handleDoNotShowAgain,
  onFormStateChange,
  onFormSubmit,
  onAddEmailSubmitSuccess,
  submittedData,
  formDisabled,
}: IAddEmailBannerContentProps) => {
  const addEmailForm = useMemo(
    () => (
      <AddEmailForm
        formDisabled={formDisabled}
        contentState={contentState}
        onFormStateChange={onFormStateChange}
        onFormSubmit={onFormSubmit}
        onAddEmailSubmitSuccess={onAddEmailSubmitSuccess}
        submittedData={submittedData}
      />
    ),
    [
      contentState,
      formDisabled,
      onFormStateChange,
      onFormSubmit,
      onAddEmailSubmitSuccess,
      submittedData,
    ],
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
