import { ReactNode, useMemo } from 'react';

import { AddEmailForm } from 'domains/userSettings/components/AddEmailForm';
import {
  AddEmailFormContentState,
  IAddEmailFormData,
} from 'domains/userSettings/components/AddEmailForm/types';
import { FillStep } from './components/FillStep';
import { SuccessStep } from './components/SuccessStep';

export interface IAddEmailBannerContentProps {
  contentState: AddEmailFormContentState;
  onFormStateChange: (state: AddEmailFormContentState) => void;
  onFormSubmit: (data: IAddEmailFormData | undefined) => void;
  onAddEmailSubmitSuccess?: () => void;
  submittedData: IAddEmailFormData | undefined;
  formDisabled?: boolean;
  fillStepContent?: ReactNode;
}

export const AddEmailBannerContent = ({
  contentState,
  onFormStateChange,
  onFormSubmit,
  onAddEmailSubmitSuccess,
  submittedData,
  formDisabled,
  fillStepContent,
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
      return <FillStep content={fillStepContent}>{addEmailForm}</FillStep>;

    case AddEmailFormContentState.SUCCESS:
      return (
        <SuccessStep email={submittedData?.email}>{addEmailForm}</SuccessStep>
      );

    default:
      return null;
  }
};
