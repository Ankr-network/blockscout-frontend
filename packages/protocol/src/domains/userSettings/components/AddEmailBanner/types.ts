import {
  AddEmailFormContentState,
  IAddEmailFormData,
} from '../AddEmailForm/types';

export interface IUseAddEmailBannerProps {
  asCard?: boolean;
  initialSubmittedData?: IAddEmailFormData;
  initialContentState?: AddEmailFormContentState;
}
