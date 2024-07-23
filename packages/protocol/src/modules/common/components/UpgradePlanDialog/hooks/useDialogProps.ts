import { IDialogProps } from 'uiKit/Dialog';
import { SIGNUP_DIALOG_WIDTH } from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog';

import { ContentType } from '../types';
import { getContent } from '../utils/getContent';
import { useDialogTitle } from './useDialogTitle';

export interface DialogPropsParams {
  contentType: ContentType;
  defaultState?: ContentType;
  onClose: () => void;
  onSubmitContactForm: () => void;
}

export const useDialogProps = ({
  contentType,
  defaultState,
  onClose,
  onSubmitContactForm,
}: DialogPropsParams): Omit<IDialogProps, 'open'> => {
  const { resetTitle, title } = useDialogTitle(defaultState || contentType);

  return {
    children: getContent({
      contentType: defaultState ?? contentType,
      onClose,
      onSubmitContactForm,
      resetTitle,
    }),
    maxPxWidth: SIGNUP_DIALOG_WIDTH,
    onClose,
    title,
  };
};
