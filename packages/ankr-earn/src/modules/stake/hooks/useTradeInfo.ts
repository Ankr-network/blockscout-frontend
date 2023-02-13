import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import { ACTION_CACHE_SEC, ONE } from 'modules/common/const';

import { useGetTokenTradeAmountQuery } from '../actions/getTradeInfo';
import {
  getOpenOceanLink,
  TOpenOceanNetworks,
  TOpenOceanTokens,
} from '../api/getOpenOceanQuote';

import { useStakeTradeAnalytics } from './useTradeInfoAnalytics';

interface IUseTradeInfoProps {
  baseToken: TOpenOceanTokens;
  network: TOpenOceanNetworks;
  targetToken: TOpenOceanTokens;
  ratio?: BigNumber;
}

export interface IUseTradeInfo {
  discountPct?: BigNumber;
  link: string;
  token: string;
  onLinkClick: () => void;
}

export const useTradeInfo = ({
  baseToken,
  network,
  targetToken,
  ratio = ONE,
}: IUseTradeInfoProps): IUseTradeInfo => {
  const { data: tokenTradeAmount = 0 } = useGetTokenTradeAmountQuery(
    { baseToken, network, targetToken },
    { refetchOnMountOrArgChange: ACTION_CACHE_SEC },
  );

  const { onTrackGetSyntToken } = useStakeTradeAnalytics(
    baseToken,
    targetToken,
  );

  const discountPct = useMemo(
    () => calcDiscountPct(tokenTradeAmount, ratio),
    [ratio, tokenTradeAmount],
  );

  const link = getOpenOceanLink(network, baseToken, targetToken);

  return {
    discountPct,
    link,
    token: t(`unit.${targetToken.toLowerCase()}`),
    onLinkClick: onTrackGetSyntToken,
  };
};

/**
 * Calculate discount percentage from amount and token ratio
 *
 * @return  {BigNumber}  Discount percentage
 */
function calcDiscountPct(
  amount: BigNumber.Value,
  tokenRatio: BigNumber.Value,
): BigNumber {
  return new BigNumber(amount).minus(tokenRatio).multipliedBy(100);
}
