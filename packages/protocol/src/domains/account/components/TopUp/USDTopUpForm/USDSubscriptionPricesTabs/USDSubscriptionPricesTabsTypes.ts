import { OneTimePaymentIdType } from 'domains/account/actions/usdTopUp/fetchLinkForOneTimePayment';

export interface USDSubscriptionPricesTabsProps {
  className?: string;
  tabClassName: string;
  onChange: (value: string | OneTimePaymentIdType, id: string) => void;
}
