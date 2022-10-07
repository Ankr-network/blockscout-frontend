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
import { getStakeGasFee } from 'modules/stake-eth/actions/getStakeGasFee';
import { stake } from 'modules/stake-eth/actions/stake';
import { getFAQ, IFAQItem } from 'modules/stake/actions/getFAQ';
import {
  IStakeFormPayload,
  IStakeSubmitPayload,
} from 'modules/stake/components/StakeForm';
import { INPUT_DEBOUNCE_TIME } from 'modules/stake/const';
import { useAppDispatch } from 'store/useAppDispatch';

import { useSelectedToken } from './useSelectedToken';
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
  const { selectedToken } = useSelectedToken();

  const { data: commonData, loading: isCommonDataLoading } = useQuery({
    type: getCommonData,
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

    dispatchRequest(stake({ token: selectedToken, amount })).then(
      ({ error }) => {
        if (!error) {
          sendAnalytics();
        }
      },
    );
  }, [amount, dispatchRequest, selectedToken, sendAnalytics]);

  const handleFormChange = (
    { amount: formAmount }: IStakeFormPayload,
    invalid: boolean,
  ): void => {
    if (invalid) {
      dispatch(resetRequests([getStakeGasFee.toString()]));
    } else if (formAmount) {
      const readyAmount = new BigNumber(formAmount);
      dispatch(getStakeGasFee({ amount: readyAmount, token: selectedToken }));
    }

    setAmount(formAmount ? new BigNumber(formAmount) : ZERO);
  };

  const debouncedOnChange = useDebouncedCallback(
    handleFormChange,
    INPUT_DEBOUNCE_TIME,
  );

  return {
    amount,
    balance: commonData?.ethBalance,
    certificateRatio: commonData?.aETHcRatio ?? ZERO,
    faqItems,
    fee: stakeGasFee ?? ZERO,
    isCommonDataLoading,
    isFeeLoading,
    loading: isCommonDataLoading || isStakeLoading,
    minAmount: commonData?.minStake,
    tokenIn: Token.ETH,
    tokenOut: selectedToken,
    onInputChange: debouncedOnChange,
    onSubmit,
  };
};
