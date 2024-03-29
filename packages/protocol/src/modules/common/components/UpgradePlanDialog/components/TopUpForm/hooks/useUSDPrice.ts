import { useUSDSubscriptionPrices } from 'domains/account/hooks/useUSDSubscriptionPrices';

import { TopUpCurrency } from '../types';
import { USDPriceSelectorProps } from '../components/USDPiceSelector';
import { isUSD as isUSDCurrency } from '../utils/isUSD';
import { useUSDPriceSelector } from './useUSDPriceSelector';

export interface USDPrice {
  fixedUSDAmount?: string;
  renderProps?: USDPriceSelectorProps;
  usdPrice?: string;
}

export const useUSDPrice = (currency: TopUpCurrency): USDPrice => {
  const isUSD = isUSDCurrency(currency);

  const { isLoading, prices } = useUSDSubscriptionPrices({
    skipFetching: !isUSD,
  });

  const renderProps = useUSDPriceSelector({ loading: isLoading, prices });

  const { value: usdPrice } = renderProps;

  return {
    fixedUSDAmount: prices.find(({ id }) => id === usdPrice)?.amount,
    renderProps: isUSD ? renderProps : undefined,
    usdPrice,
  };
};
