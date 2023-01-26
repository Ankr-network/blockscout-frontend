import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce/lib';

import { ACTION_CACHE_SEC, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { useGetETHCommonDataQuery } from 'modules/stake-eth/actions/getCommonData';
import { useLazyGetETHStakeGasFeeQuery } from 'modules/stake-eth/actions/getStakeGasFee';
import { useStakeETHMutation } from 'modules/stake-eth/actions/stake';
import { useGetETHMinStakeQuery } from 'modules/stake-eth/actions/useGetETHMinStakeQuery';
import { getFAQ, IFAQItem } from 'modules/stake/actions/getFAQ';
import {
  IStakeFormPayload,
  IStakeSubmitPayload,
} from 'modules/stake/components/StakeForm';
import { INPUT_DEBOUNCE_TIME } from 'modules/stake/const';

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
  isInvalidAmount: boolean;
  onInputChange: (values: IStakeFormPayload, invalid: boolean) => void;
  onSubmit: (payload: IStakeSubmitPayload) => void;
}

export const useStakeForm = (): IUseStakeForm => {
  const [amount, setAmount] = useState(ZERO);
  const [isError, setIsError] = useState(false);

  const { data: commonData, isFetching: isCommonDataLoading } =
    useGetETHCommonDataQuery(undefined, {
      refetchOnMountOrArgChange: ACTION_CACHE_SEC,
    });

  const { data: minStake, isFetching: isMinStakingLoading } =
    useGetETHMinStakeQuery(undefined, {
      refetchOnMountOrArgChange: ACTION_CACHE_SEC,
    });

  const { data: faqItems } = useQuery<IFAQItem[]>({
    defaultData: [],
    type: getFAQ,
  });

  const [stake, { isLoading: isStakeLoading }] = useStakeETHMutation();

  const [getETHStakeGasFee, { data: stakeGasFee, isFetching: isFeeLoading }] =
    useLazyGetETHStakeGasFeeQuery();

  const { sendAnalytics } = useStakeEthAnalytics({
    amount,
    fee: stakeGasFee ?? ZERO,
  });

  const onSubmit = useCallback(() => {
    if (!amount) {
      return;
    }

    stake({ token: Token.aETHc, amount })
      .unwrap()
      .then(() => {
        sendAnalytics();
      });
  }, [amount, sendAnalytics, stake]);

  const handleFormChange = (
    { amount: formAmount }: IStakeFormPayload,
    invalid: boolean,
  ): void => {
    if (formAmount && !invalid) {
      const readyAmount = new BigNumber(formAmount);
      getETHStakeGasFee({ amount: readyAmount, token: Token.aETHc });
    }

    setIsError(invalid);
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
    isInvalidAmount: isError,
    onInputChange: debouncedOnChange,
    onSubmit,
  };
};
