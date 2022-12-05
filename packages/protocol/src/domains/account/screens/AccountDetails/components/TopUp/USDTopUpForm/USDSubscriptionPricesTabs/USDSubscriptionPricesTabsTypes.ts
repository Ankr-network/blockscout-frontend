import { OneTimePaymentIdType } from 'domains/account/actions/usdTopUp/fetchLinkForCardPayment';

export interface USDSubscriptionPricesTabsProps {
  onChange: (value: string | OneTimePaymentIdType, id: string) => void;
}
