import { BundlePaymentPlan, ProductPrice } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import { ONE_TIME_PAYMENT_ID } from 'domains/account/actions/usdTopUp/fetchLinkForOneTimePayment';
import { Tab } from 'modules/common/hooks/useTabs';

import { BundleLabel } from '../components/BundleLabel';
import { OnChange } from '../../../types';
import { PriceTab } from '../components/PriceTab';

export interface USDPaymentTabsParams {
  bundles: BundlePaymentPlan[];
  onChange: OnChange;
  prices: ProductPrice[];
}

const getOneTimeTab = (onChange: OnChange): Tab<string> => ({
  id: ONE_TIME_PAYMENT_ID,
  onSelect: () => onChange(ONE_TIME_PAYMENT_ID, ''),
  title: (isSelected: boolean) => (
    <PriceTab
      isSelected={isSelected}
      label={t('account.account-details.top-up.usd-one-time')}
    />
  ),
});

const getSubscriptionTabs = (prices: ProductPrice[], onChange: OnChange) =>
  prices.map<Tab<string>>(({ id, amount, interval }) => ({
    id,
    onSelect: () => onChange(id, amount),
    title: (isSelected: boolean) => (
      <PriceTab
        isSelected={isSelected}
        label={`$${amount}/${interval?.substring(0, 2)}`}
      />
    ),
  }));

const getBundleTabs = (bundles: BundlePaymentPlan[], onChange: OnChange) =>
  bundles.map<Tab<string>>(({ price: { id, amount, interval } }) => ({
    id,
    onSelect: () => onChange(id, amount),
    title: (isSelected: boolean) => (
      <PriceTab
        isSelected={isSelected}
        label={
          <BundleLabel
            label={<span>{`$${amount}/${interval?.substring(0, 2)}`}</span>}
          />
        }
      />
    ),
  }));

export const getUSDPaymentTabs = ({
  bundles,
  prices,
  onChange,
}: USDPaymentTabsParams) => {
  if (prices.length === 0 || bundles.length === 0) {
    return [];
  }

  const oneTimeTab = getOneTimeTab(onChange);

  const subscriptionTabs = getSubscriptionTabs(prices, onChange);

  const bundleTabs = getBundleTabs(bundles, onChange);

  return [oneTimeTab, ...subscriptionTabs, ...bundleTabs];
};
