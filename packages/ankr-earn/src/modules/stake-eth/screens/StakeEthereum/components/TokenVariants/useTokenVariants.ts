import { useMutation, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { TEthToken } from 'modules/api/EthSDK';
import { ZERO } from 'modules/common/const';
import { getCommonData } from 'modules/stake-eth/actions/getCommonData';
import { stake } from 'modules/stake-eth/actions/stake';

import { useSelectedToken } from '../../hooks/useSelectedToken';

interface IUseTokenVariants {
  tokenOut: TEthToken;
  isDisabled: boolean;
  ethRatio: BigNumber;
  isEthRatioLoading: boolean;
  onTokenSelect: (token: TEthToken) => () => void;
}

export const useTokenVariants = (): IUseTokenVariants => {
  const { selectedToken, handleTokenSelect } = useSelectedToken();

  const { data: commonData, loading: isCommonDataLoading } = useQuery({
    type: getCommonData,
  });

  const { loading: isStakeLoading } = useMutation({
    type: stake,
  });

  const onTokenSelect = (token: TEthToken) => () => {
    handleTokenSelect(token);
  };

  return {
    tokenOut: selectedToken,
    isDisabled: isStakeLoading,
    ethRatio: commonData ? new BigNumber(1).div(commonData.aETHcRatio) : ZERO,
    isEthRatioLoading: isCommonDataLoading,
    onTokenSelect,
  };
};
