import { BundlePaymentPlan, ProductPrice } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import { BUNDLE_500$_PRICE_ID } from 'domains/account/actions/bundles/const';
import { BundleLabel } from '../components/BundleLabel';
import { ONE_TIME_PAYMENT_ID } from 'domains/account/actions/usdTopUp/fetchLinkForCardPayment';
import { SecondaryTab } from 'domains/chains/screens/ChainItem/components/SecondaryTab';
import { Tab } from 'modules/common/hooks/useTabs';
import { USDSubscriptionPricesTabsProps } from '../USDSubscriptionPricesTabsTypes';

type OnChange = USDSubscriptionPricesTabsProps['onChange'];

export interface USDPaymentTabsParams {
  bundles: BundlePaymentPlan[];
  onChange: OnChange;
  prices: ProductPrice[];
  tabClassName: string;
}

const getOneTimeTab = (onChange: OnChange, className: string): Tab<string> => ({
  id: ONE_TIME_PAYMENT_ID,
  onSelect: () => onChange(ONE_TIME_PAYMENT_ID, ''),
  title: (isSelected: boolean) => (
    <SecondaryTab
      className={className}
      isSelected={isSelected}
      label={t('account.account-details.top-up.usd-one-time')}
    />
  ),
});

const getSubscriptionTabs = (
  prices: ProductPrice[],
  onChange: OnChange,
  className: string,
) =>
  prices.map<Tab<string>>(({ id, amount, interval }) => ({
    id,
    onSelect: () => onChange(id, amount),
    title: (isSelected: boolean) => (
      <SecondaryTab
        className={className}
        isSelected={isSelected}
        label={`$${amount}/${interval?.substring(0, 2)}`}
      />
    ),
  }));

const getBundleTabs = (
  bundles: BundlePaymentPlan[],
  onChange: OnChange,
  className: string,
) =>
  bundles.map<Tab<string>>(({ price: { id, amount, interval } }) => ({
    id,
    onSelect: () => onChange(id, amount),
    title: (isSelected: boolean) => {
      const text = `$${amount}/${interval?.substring(0, 2)}`;

      const label =
        id === BUNDLE_500$_PRICE_ID ? <BundleLabel label={text} /> : text;

      return (
        <SecondaryTab
          className={className}
          isSelected={isSelected}
          label={label}
        />
      );
    },
  }));

export const getUSDPaymentTabs = ({
  bundles,
  prices,
  onChange,
  tabClassName,
}: USDPaymentTabsParams) => {
  if (prices.length === 0 || bundles.length === 0) {
    return [];
  }

  const oneTimeTab = getOneTimeTab(onChange, tabClassName);

  const subscriptionTabs = getSubscriptionTabs(prices, onChange, tabClassName);

  const bundleTabs = getBundleTabs(bundles, onChange, tabClassName);

  return [oneTimeTab, ...subscriptionTabs, ...bundleTabs];
};
