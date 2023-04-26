import { useMemo } from 'react';
import { useRadioGroup } from '@ankr.com/ui';

import { SubscriptionPrice } from 'domains/account/actions/usdTopUp/fetchUSDSubscriptionPrices';
import { USDPriceSelectorProps } from '../components/USDPiceSelector';
import { getUSDPricesItems } from '../utils/getUSDPricesItems';
import { useThemes } from 'uiKit/Theme/hook/useThemes';

export interface USDPiceSelectorParams {
  loading: boolean;
  prices: SubscriptionPrice[];
}

export const useUSDPriceSelector = ({
  loading,
  prices,
}: USDPiceSelectorParams): USDPriceSelectorProps => {
  const { isLightTheme } = useThemes();
  const items = useMemo(
    () => getUSDPricesItems(prices, isLightTheme),
    [prices, isLightTheme],
  );

  const props = useRadioGroup({ items, row: true });

  return { loading, ...props };
};
