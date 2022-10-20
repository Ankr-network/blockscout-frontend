import { ReactNode } from 'react';
import {
  AddEmailFormContentState,
  IAddEmailFormData,
} from '../AddEmailForm/types';

export interface IUseAddEmailBannerCardProps {
  initialContentState?: AddEmailFormContentState;
  initialSubmittedData?: IAddEmailFormData;
  resetInviteEmail?: () => void;
  formDisabled?: boolean;
  fillStepContent?: ReactNode;
}

export interface IUseAddEmailBannerDialogProps
  extends IUseAddEmailBannerCardProps {
  isOpened: boolean;
  onClose: () => void;
}
