import { useMemo } from 'react';

import { SecondaryTab } from 'domains/chains/screens/ChainItem/components/SecondaryTab';
import { Tab, useTabs } from 'modules/common/hooks/useTabs';
import { ProductPrice } from 'multirpc-sdk';
import { t } from 'modules/i18n/utils/intl';
import { ONE_TIME_PAYMENT_ID } from 'domains/account/actions/usdTopUp/fetchLinkForCardPayment';
import { USDSubscriptionPricesTabsProps } from './USDSubscriptionPricesTabsTypes';

export const useUSDPaymentPricesTabs = (
  prices: ProductPrice[],
  onChange: USDSubscriptionPricesTabsProps['onChange'],
) => {
  const rawTabs: Tab<string>[] = useMemo(() => {
    const oneTimeTab = {
      id: ONE_TIME_PAYMENT_ID,
      onSelect: () => onChange(ONE_TIME_PAYMENT_ID, ''),
      title: (isSelected: boolean) => (
        <SecondaryTab
          isSelected={isSelected}
          label={t('account.account-details.top-up.usd-one-time')}
        />
      ),
    };

    if (!prices?.length) return [];

    const editedTabs = prices.map(item => {
      const { id, amount, interval } = item;

      return {
        id,
        onSelect: () => onChange(id, amount),
        title: (isSelected: boolean) => (
          <SecondaryTab
            isSelected={isSelected}
            label={`$${amount?.toString()}/${interval?.substring(0, 2)}`}
          />
        ),
      };
    });

    return [oneTimeTab, ...editedTabs];
  }, [prices, onChange]);

  return useTabs({
    initialTabID: ONE_TIME_PAYMENT_ID,
    tabs: rawTabs,
  });
};
