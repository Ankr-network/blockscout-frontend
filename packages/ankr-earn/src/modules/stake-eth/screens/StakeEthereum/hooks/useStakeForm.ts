import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { ReactText, useCallback, useMemo, useState } from 'react';

import { TEthToken } from 'modules/api/EthSDK';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getCommonData } from 'modules/stake-eth/actions/getCommonData';
import { stake } from 'modules/stake-eth/actions/stake';
import { MAX_ETH_STAKE_AMOUNT } from 'modules/stake-eth/const';
import {
  IStakeFormPayload,
  IStakeSubmitPayload,
} from 'modules/stake/components/StakeForm';

interface IUseStakeForm {
  balance?: BigNumber;
  fee: BigNumber;
  loading: boolean;
  isCommonDataLoading: boolean;
  isFeeLoading: boolean;
  isEthRatioLoading: boolean;
  isTokenVariantDisabled: boolean;
  tokenIn: string;
  tokenOut: string;
  amount: ReactText;
  minAmount?: BigNumber;
  maxAmount: BigNumber;
  ethRatio: BigNumber;
  resultAmount: BigNumber;
  onSubmit: (payload: IStakeSubmitPayload) => void;
  onInputChange: (values: IStakeFormPayload) => void;
  onTokenSelect: (token: TEthToken) => () => void;
}

export const useStakeForm = (openSuccessModal: () => void): IUseStakeForm => {
  const dispatchRequest = useDispatchRequest();
  const [amount, setAmount] = useState<ReactText>('');
  const [selectedToken, setSelectedToken] = useState<TEthToken>(Token.aETHb);

  const { data: commonData, loading: isCommonDataLoading } = useQuery({
    type: getCommonData,
  });

  const { loading: isStakeLoading } = useMutation({
    type: stake,
  });

  // todo: actual fee
  const fee = ZERO;

  const onInputChange = (values: IStakeFormPayload) => {
    setAmount(values.amount || '');
  };

  const onSubmit = () => {
    dispatchRequest(
      stake({ token: selectedToken, amount: new BigNumber(amount) }),
    ).then(({ error }) => {
      if (!error) {
        openSuccessModal();
      }
    });
  };

  const onTokenSelect = useCallback(
    (token: TEthToken) => () => {
      setSelectedToken(token);
    },
    [],
  );

  const resultAmount = useMemo(() => {
    if (!amount) {
      return ZERO;
    }

    let readyAmount = new BigNumber(amount);
    if (selectedToken === Token.aETHc) {
      readyAmount = commonData
        ? readyAmount.multipliedBy(commonData.aETHcRatio)
        : ZERO;
    }

    return readyAmount.minus(fee);
  }, [amount, commonData, fee, selectedToken]);

  return {
    amount,
    balance: commonData?.ethBalance,
    ethRatio: commonData ? new BigNumber(1).div(commonData.aETHcRatio) : ZERO,
    fee,
    isCommonDataLoading,
    isEthRatioLoading: isCommonDataLoading,
    // todo: actual isFeeLoading
    isFeeLoading: false,
    isTokenVariantDisabled: isStakeLoading,
    loading: isCommonDataLoading || isStakeLoading,
    maxAmount: new BigNumber(MAX_ETH_STAKE_AMOUNT),
    minAmount: commonData?.minStake,
    resultAmount,
    tokenIn: Token.ETH,
    tokenOut: selectedToken,
    onInputChange,
    onSubmit,
    onTokenSelect,
  };
};
