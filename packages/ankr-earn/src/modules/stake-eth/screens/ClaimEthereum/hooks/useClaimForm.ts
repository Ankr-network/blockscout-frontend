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
  const { loading: isCommonDataLoading, data: commonData } = useQuery({
    type: getCommonData,
  });

  const { loading: isLoading } = useMutation({ type: claim });

  const balance = commonData?.claimableAETHB ?? ZERO;
  const aETHcRatio = commonData
    ? new BigNumber(1).div(commonData.aETHcRatio)
    : ZERO;

  const totalAmount = useMemo(() => {
    if (!commonData) {
      return ZERO;
    }

    if (selectedToken === Token.aETHc) {
      return commonData.claimableAETHC;
    }

    return commonData.claimableAETHB;
  }, [commonData, selectedToken]);

  const isDisabled =
    isLoading || !commonData || commonData.claimableAETHB.isZero();

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
  }, [dispatchRequest]);

  return {
    selectedToken,
    balance,
    totalAmount,
    aETHcRatio,
    isLoading,
    isBalanceLoading: isCommonDataLoading,
    isDisabled,
    closeHref: RoutesConfig.dashboard.generatePath(),
    onSubmit,
    onTokenSelect,
  };
};
