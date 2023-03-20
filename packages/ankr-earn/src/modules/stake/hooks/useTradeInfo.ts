import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import { ACTION_CACHE_SEC, ONE, ZERO } from 'modules/common/const';
import { tokenRenameMap } from 'modules/common/const/tokenRenameMap';
import { Token } from 'modules/common/types/token';

import { useGetTokenTradeAmountQuery } from '../actions/getTradeInfo';
import { getOpenOceanLink } from '../api/getOpenOceanQuote';
import { TOpenOceanChains } from '../api/getOpenOceanQuote/types';

import { useStakeTradeAnalytics } from './useTradeInfoAnalytics';

interface IUseTradeInfoProps {
  baseToken: Token;
  network: TOpenOceanChains;
  targetToken: Token;
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
  const { data: tokenTradeAmount = ZERO } = useGetTokenTradeAmountQuery(
    { baseToken, network, targetToken },
    { refetchOnMountOrArgChange: ACTION_CACHE_SEC },
  );

  const { onTrackGetSyntToken } = useStakeTradeAnalytics(
    tokenRenameMap[baseToken],
    tokenRenameMap[targetToken],
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
