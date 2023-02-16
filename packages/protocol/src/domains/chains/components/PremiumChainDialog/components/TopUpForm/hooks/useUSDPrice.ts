import { TopUpCurrency } from '../types';
import { USDPriceSelectorProps } from '../components/USDPiceSelector';
import { isUSD as isUSDCurrency } from '../utils/isUSD';
import { useUSDPriceSelector } from './useUSDPriceSelector';
import { useUSDPrices } from './useUSDPrices';

export interface USDPrice {
  fixedUSDAmount?: string;
  renderProps?: USDPriceSelectorProps;
  usdPrice?: string;
}

export const useUSDPrice = (currency: TopUpCurrency): USDPrice => {
  const isUSD = isUSDCurrency(currency);

  const { loading, prices = [] } = useUSDPrices(isUSD);

  const renderProps = useUSDPriceSelector({ loading, prices });

  const { value: usdPrice } = renderProps;

  return {
    fixedUSDAmount: prices.find(({ id }) => id === usdPrice)?.amount,
    renderProps: isUSD ? renderProps : undefined,
    usdPrice,
  };
};
