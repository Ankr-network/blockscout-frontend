import { useMemo } from 'react';

import { AddEmailFormContentState } from '../AddEmailForm/types';
import { IAddEmailBannerContentProps } from './components/AddEmailBannerContent';
import { useContent } from './hooks/useContent';
import { useDialogVisibility } from './hooks/useDialogVisibility';
import { IUseAddEmailBannerProps } from './types';

export const useAddEmailBanner = ({
  asCard = false,
  initialContentState = AddEmailFormContentState.ADD_EMAIL,
  initialSubmittedData,
  resetInviteEmail,
  formDisabled,
}: IUseAddEmailBannerProps) => {
  const { isDialogVisible, handleClose, handleDoNotShowAgain } =
    useDialogVisibility(asCard);

  const {
    title,
    contentState,
    setContentState,
    submittedData,
    onFormSubmit,
    onAddEmailSubmitSuccess,
  } = useContent({
    initialContentState,
    initialSubmittedData,
    resetInviteEmail,
  });

  const contentProps = useMemo<IAddEmailBannerContentProps>(
    () => ({
      formDisabled,
      handleDoNotShowAgain: asCard ? undefined : handleDoNotShowAgain,

      contentState,
      onFormStateChange: setContentState,

      submittedData,
      onFormSubmit,
      onAddEmailSubmitSuccess,
    }),
    [
      asCard,
      contentState,
      formDisabled,
      handleDoNotShowAgain,
      onFormSubmit,
      onAddEmailSubmitSuccess,
      setContentState,
      submittedData,
    ],
  );

  return {
    title,
    isDialogVisible,
    handleClose,
    contentProps,
  };
};
