import { DEFAULT_USD_VALUE_STRING } from 'domains/account/actions/usdTopUp/const';
import { useAnkrInitialAmount } from './useAnkrInitialAmount';

export interface InitialAmountParams {
  fixedUSDAmount?: string;
  isUSD: boolean;
}

export const useInitialAmount = ({
  fixedUSDAmount,
  isUSD,
}: InitialAmountParams) => {
  const ankrAmount = useAnkrInitialAmount();

  const usdAmount = fixedUSDAmount || DEFAULT_USD_VALUE_STRING;

  return isUSD ? usdAmount : ankrAmount;
};
