import { TopUpAction, TopUpCurrency } from '../types';
import { isUSD as isUSDCurrency } from './isUSD';

export interface TopUpActionParams {
  currency: TopUpCurrency;
  fixedUSDAmount?: string;
  isAnkrTopUpInProcess: boolean;
}

export const getTopUpAction = ({
  currency,
  fixedUSDAmount,
  isAnkrTopUpInProcess,
}: TopUpActionParams) => {
  const isUSD = isUSDCurrency(currency);

  if (isUSD && fixedUSDAmount) {
    return TopUpAction.SUBSCRIBE;
  }

  if (!isUSD && isAnkrTopUpInProcess) {
    return TopUpAction.CONTINUE;
  }

  return TopUpAction.TOP_UP;
};
