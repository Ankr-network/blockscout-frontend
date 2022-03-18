import BigNumber from 'bignumber.js';
import { ReactText, useCallback, useState } from 'react';

import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { ETokenVariant } from 'modules/stake-eth/const';
import {
  IStakeFormPayload,
  IStakeSubmitPayload,
} from 'modules/stake/components/StakeForm';

interface IUseStakeForm {
  balance: BigNumber;
  fee: BigNumber;
  minAmount: number;
  loading: boolean;
  isCommonDataLoading: boolean;
  isFeeLoading: boolean;
  isEthRatioLoading: boolean;
  tokenIn: string;
  tokenOut: string;
  amount: ReactText;
  ethRatio: ReactText;
  onSubmit: (payload: IStakeSubmitPayload) => void;
  onInputChange: (values: IStakeFormPayload) => void;
  onTokenSelect: (token: ETokenVariant) => () => void;
}

export const useStakeForm = (openSuccessModal: () => void): IUseStakeForm => {
  const [amount, setAmount] = useState<ReactText>('');
  const [selectedToken, setSelectedToken] = useState(ETokenVariant.aETHb);
  const isCommonDataLoading = false;
  const loading = false;
  const balance = ZERO;
  const minAmount = 0.1;
  const fee = ZERO;
  const isEthRatioLoading = false;
  const isFeeLoading = false;
  const ethRatio = 1.14;

  const onInputChange = (values: IStakeFormPayload) => {
    setAmount(values.amount || '');
  };

  const onSubmit = () => {
    openSuccessModal();
  };

  const onTokenSelect = useCallback(
    (token: ETokenVariant) => () => {
      setSelectedToken(token);
    },
    [],
  );

  return {
    isCommonDataLoading,
    isEthRatioLoading,
    isFeeLoading,
    amount,
    balance,
    fee,
    ethRatio,
    minAmount,
    loading,
    tokenIn: Token.ETH,
    tokenOut: selectedToken,
    onInputChange,
    onSubmit,
    onTokenSelect,
  };
};
