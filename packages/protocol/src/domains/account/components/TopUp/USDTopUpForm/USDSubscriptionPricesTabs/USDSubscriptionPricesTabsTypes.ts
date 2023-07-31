import { OneTimePaymentIdType } from 'domains/account/actions/usdTopUp/fetchLinkForOneTimePayment';

export interface USDSubscriptionPricesTabsProps {
  className?: string;
  initialTabID?: string | OneTimePaymentIdType;
  onChange: (value: string | OneTimePaymentIdType, id: string) => void;
  tabClassName: string;
}
