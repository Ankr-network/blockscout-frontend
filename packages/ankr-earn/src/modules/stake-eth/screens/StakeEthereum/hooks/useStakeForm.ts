import BigNumber from 'bignumber.js';
import { ReactText, useCallback, useState } from 'react';

import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { t } from 'modules/i18n/utils/intl';
import { ETokenVariant } from 'modules/stake-eth/const';
import {
  IStakeFormPayload,
  IStakeSubmitPayload,
} from 'modules/stake/components/StakeForm';

interface IUseStakeForm {
  balance: BigNumber;
  minAmount: number;
  loading: boolean;
  isCommonDataLoading: boolean;
  tokenIn: string;
  tokenOut: string;
  tokenTooltip: string;
  amount: ReactText;
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

  const tooltipsMap = useLocaleMemo(
    () => ({
      [ETokenVariant.aETHb]: t('aETHb tooltip'),
      [ETokenVariant.aETHc]: t('aETHc tooltip'),
    }),
    [],
  );

  return {
    isCommonDataLoading,
    amount,
    balance,
    minAmount,
    loading,
    tokenIn: Token.ETH,
    tokenOut: selectedToken,
    tokenTooltip: tooltipsMap[selectedToken],
    onInputChange,
    onSubmit,
    onTokenSelect,
  };
};
