import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo, useState } from 'react';

import { TEthToken } from '@ankr.com/staking-sdk';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { RoutesConfig } from 'modules/dashboard/Routes';
import { claim } from 'modules/stake-eth/actions/claim';
import { getClaimableData } from 'modules/stake-eth/actions/getClaimableData';
import { getCommonData } from 'modules/stake-eth/actions/getCommonData';

const DEFAULT_SELECTED_TOKEN = Token.aETHb;

interface IUseClaimForm {
  selectedToken: TEthToken;
  balance: BigNumber;
  totalAmount: BigNumber;
  aETHcRatio: BigNumber;
  isLoading: boolean;
  isBalanceLoading: boolean;
  isDisabled: boolean;
  closeHref: string;
  onTokenSelect: (token: TEthToken) => () => void;
  onSubmit: () => void;
}

export const useClaimForm = (): IUseClaimForm => {
  const [selectedToken, setSelectedToken] = useState<TEthToken>(
    DEFAULT_SELECTED_TOKEN,
  );
  const dispatchRequest = useDispatchRequest();
  const { data: commonData, loading: isCommonDataLoading } = useQuery({
    type: getCommonData,
  });
  const { data: claimableData, loading: isClaimableDataLoading } = useQuery({
    type: getClaimableData,
  });

  const { loading: isLoading } = useMutation({ type: claim });

  const balance = claimableData?.claimableAETHB ?? ZERO;
  const aETHcRatio = commonData
    ? new BigNumber(1).div(commonData.aETHcRatio)
    : ZERO;

  const totalAmount = useMemo(() => {
    if (!claimableData) {
      return ZERO;
    }

    if (selectedToken === Token.aETHc) {
      return claimableData.claimableAETHC;
    }

    return claimableData.claimableAETHB;
  }, [claimableData, selectedToken]);

  const isDisabled =
    isLoading ||
    isClaimableDataLoading ||
    !claimableData ||
    claimableData.claimableAETHB.isZero();

  const onTokenSelect = useCallback(
    (token: TEthToken) => () => {
      setSelectedToken(token);
    },
    [],
  );

  const onSubmit = () => {
    dispatchRequest(claim(selectedToken));
  };

  useProviderEffect(() => {
    dispatchRequest(getCommonData());
    dispatchRequest(getClaimableData());
  }, [dispatchRequest]);

  return {
    selectedToken,
    balance,
    totalAmount,
    aETHcRatio,
    isLoading: isLoading || isClaimableDataLoading,
    isBalanceLoading: isCommonDataLoading,
    isDisabled,
    closeHref: RoutesConfig.dashboard.generatePath(),
    onSubmit,
    onTokenSelect,
  };
};
