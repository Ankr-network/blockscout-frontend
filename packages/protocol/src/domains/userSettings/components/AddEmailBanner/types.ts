import {
  AddEmailFormContentState,
  IAddEmailFormData,
} from '../AddEmailForm/types';

export interface IUseAddEmailBannerProps {
  asCard?: boolean;
  initialContentState?: AddEmailFormContentState;
  initialSubmittedData?: IAddEmailFormData;
  resetInviteEmail?: () => void;
  formDisabled?: boolean;
}
