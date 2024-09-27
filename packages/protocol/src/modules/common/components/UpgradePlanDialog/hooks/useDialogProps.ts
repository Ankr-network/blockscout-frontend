import { IDialogProps } from 'uiKit/Dialog';
import { SIGNUP_DIALOG_WIDTH } from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog';

import { ContentType } from '../types';
import { getContent } from '../utils/getContent';
import { useDialogTitle } from './useDialogTitle';

export interface DialogPropsParams {
  contentType: ContentType;
  defaultState?: ContentType;
  onClose: () => void;
}

const TOP_UP_DIALOG_WIDTH = 620;

export const useDialogProps = ({
  contentType,
  defaultState,
  onClose,
}: DialogPropsParams): Omit<IDialogProps, 'open'> => {
  const { resetTitle, title } = useDialogTitle(defaultState || contentType);

  const maxPxWidth =
    contentType === ContentType.SIGN_UP
      ? SIGNUP_DIALOG_WIDTH
      : TOP_UP_DIALOG_WIDTH;

  return {
    children: getContent({
      contentType: defaultState || contentType,
      onClose,
      resetTitle,
    }),
    maxPxWidth,
    onClose,
    title,
  };
};
