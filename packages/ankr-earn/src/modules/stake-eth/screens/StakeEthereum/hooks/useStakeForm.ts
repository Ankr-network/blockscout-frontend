import { resetRequests } from '@redux-requests/core';
import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce/lib';

import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getCommonData } from 'modules/stake-eth/actions/getCommonData';
import { getMinStake } from 'modules/stake-eth/actions/getMinStake';
import { getStakeGasFee } from 'modules/stake-eth/actions/getStakeGasFee';
import { stake } from 'modules/stake-eth/actions/stake';
import { getFAQ, IFAQItem } from 'modules/stake/actions/getFAQ';
import {
  IStakeFormPayload,
  IStakeSubmitPayload,
} from 'modules/stake/components/StakeForm';
import { INPUT_DEBOUNCE_TIME } from 'modules/stake/const';
import { useAppDispatch } from 'store/useAppDispatch';

import { useStakeEthAnalytics } from './useStakeEthAnalytics';

interface IUseStakeForm {
  amount?: BigNumber;
  balance?: BigNumber;
  certificateRatio: BigNumber;
  faqItems: IFAQItem[];
  fee: BigNumber;
  isCommonDataLoading: boolean;
  isFeeLoading: boolean;
  loading: boolean;
  minAmount?: BigNumber;
  tokenIn: string;
  tokenOut: string;
  onInputChange: (values: IStakeFormPayload, invalid: boolean) => void;
  onSubmit: (payload: IStakeSubmitPayload) => void;
}

export const useStakeForm = (): IUseStakeForm => {
  const dispatch = useAppDispatch();
  const dispatchRequest = useDispatchRequest();
  const [amount, setAmount] = useState(ZERO);

  const { data: commonData, loading: isCommonDataLoading } = useQuery({
    type: getCommonData,
  });

  const { data: minStake, loading: isMinStakingLoading } = useQuery({
    type: getMinStake,
  });

  const { data: faqItems } = useQuery<IFAQItem[]>({
    defaultData: [],
    type: getFAQ,
  });

  const { loading: isStakeLoading } = useMutation({
    type: stake,
  });

  const { data: stakeGasFee, loading: isFeeLoading } = useQuery({
    type: getStakeGasFee,
  });

  const { sendAnalytics } = useStakeEthAnalytics({ amount });

  const onSubmit = useCallback(() => {
    if (!amount) {
      return;
    }

    dispatchRequest(stake({ token: Token.aETHc, amount })).then(({ error }) => {
      if (!error) {
        sendAnalytics();
      }
    });
  }, [amount, dispatchRequest, sendAnalytics]);

  const handleFormChange = (
    { amount: formAmount }: IStakeFormPayload,
    invalid: boolean,
  ): void => {
    if (invalid) {
      dispatch(resetRequests([getStakeGasFee.toString()]));
    } else if (formAmount) {
      const readyAmount = new BigNumber(formAmount);
      dispatch(getStakeGasFee({ amount: readyAmount, token: Token.aETHc }));
    }

    setAmount(formAmount ? new BigNumber(formAmount) : ZERO);
  };

  const debouncedOnChange = useDebouncedCallback(
    handleFormChange,
    INPUT_DEBOUNCE_TIME,
    {
      leading: true,
      trailing: true,
    },
  );

  return {
    amount,
    balance: commonData?.ethBalance,
    certificateRatio: commonData?.aETHcRatio ?? ZERO,
    faqItems,
    fee: stakeGasFee ?? ZERO,
    isCommonDataLoading: isCommonDataLoading || isMinStakingLoading,
    isFeeLoading,
    loading: isCommonDataLoading || isStakeLoading || isMinStakingLoading,
    minAmount: minStake ?? ZERO,
    tokenIn: Token.ETH,
    tokenOut: Token.aETHc,
    onInputChange: debouncedOnChange,
    onSubmit,
  };
};
