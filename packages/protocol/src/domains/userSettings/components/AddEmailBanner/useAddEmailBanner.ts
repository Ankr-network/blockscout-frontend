import { AddEmailFormContentState } from '../AddEmailForm/types';
import { useContent } from './hooks/useContent';
import { IUseAddEmailBannerCardProps } from './types';

export const useAddEmailBanner = ({
  initialContentState = AddEmailFormContentState.ADD_EMAIL,
  initialSubmittedData,
  resetInviteEmail,
  formDisabled,
  fillStepContent,
}: IUseAddEmailBannerCardProps) => {
  const {
    title,
    contentState,
    setContentState,
    submittedEmail,
    onFormSubmit,
    onAddEmailSubmitSuccess,
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
