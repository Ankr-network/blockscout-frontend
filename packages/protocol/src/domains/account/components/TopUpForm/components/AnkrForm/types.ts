import { TrackTopUpSubmit } from 'domains/account/types';

import { FormField } from './constants';

export type AmountValidator = (amount: string) => string | undefined;

export interface AnkrFormProps {
  handleOpenEmailDialog: () => void;
  hasEmailBound: boolean;
  onBundleBannerClick: () => void;
  shouldUseDefaultValue?: boolean;
  trackSubmit: TrackTopUpSubmit;
}

export interface FormValues {
  [FormField.Amount]: string;
}
