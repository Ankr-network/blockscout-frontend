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
}: IUseAddEmailBannerProps) => {
  const { isDialogVisible, handleClose, handleDoNotShowAgain } =
    useDialogVisibility(asCard);

  const { title, contentState, setContentState, submittedData, onFormSubmit } =
    useContent({ initialContentState, initialSubmittedData });

  const contentProps = useMemo<IAddEmailBannerContentProps>(
    () => ({
      handleDoNotShowAgain: asCard ? undefined : handleDoNotShowAgain,

      contentState,
      onFormStateChange: setContentState,

      submittedData,
      onFormSubmit,
    }),
    [
      asCard,
      contentState,
      handleDoNotShowAgain,
      onFormSubmit,
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
