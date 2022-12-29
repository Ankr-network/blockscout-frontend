import { OneTimePaymentIdType } from 'domains/account/actions/usdTopUp/fetchLinkForCardPayment';

export interface USDSubscriptionPricesTabsProps {
  className?: string;
  onChange: (value: string | OneTimePaymentIdType, id: string) => void;
}
