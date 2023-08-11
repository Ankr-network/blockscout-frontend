import { OneTimePaymentIdType } from 'domains/account/actions/usdTopUp/fetchLinkForOneTimePayment';
import { TrackTopUpSubmit } from 'domains/account/types';

import { FormField } from './constants';

export type PriceId = string | OneTimePaymentIdType;

export interface FormValues {
  [FormField.Amount]: string;
  [FormField.PriceId]: PriceId;
}

export type OnChange = (priceId: PriceId, amount: string) => void;

export interface UsdFormProps {
  handleOpenEmailDialog: () => void;
  hasEmailBound: boolean;
  onBundleBannerClick: () => void;
  shouldUseDefaultValue?: boolean;
  trackSubmit: TrackTopUpSubmit;
  priceId?: PriceId;
}
