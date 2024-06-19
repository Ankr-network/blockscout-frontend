import { AddEmailFormContentState } from '../AddEmailForm/types';
import { useContent } from './hooks/useContent';
import { IUseAddEmailBannerCardProps } from './types';

export const useAddEmailBanner = ({
  fillStepContent,
  formDisabled,
  initialContentState = AddEmailFormContentState.ADD_EMAIL,
  initialSubmittedData,
  resetInviteEmail,
}: IUseAddEmailBannerCardProps) => {
  const {
    contentState,
    onAddEmailSubmitSuccess,
    onFormSubmit,
    setContentState,
    submittedEmail,
    title,
  } = useContent({
    initialContentState,
    initialSubmittedData,
    resetInviteEmail,
  });

  return {
    title,
    contentProps: {
      formDisabled,
      contentState,
      onFormStateChange: setContentState,
      submittedEmail,
      onFormSubmit,
      onAddEmailSubmitSuccess,
      fillStepContent,
    },
  };
};
