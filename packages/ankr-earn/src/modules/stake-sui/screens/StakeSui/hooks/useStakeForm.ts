import { t } from '@ankr.com/common';
import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useState } from 'react';

import { ACTION_CACHE_SEC, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { useGetSUICommonDataQuery } from 'modules/stake-sui/actions/getCommonData';
import { useStakeSUIMutation } from 'modules/stake-sui/actions/stake';
import { getFAQ, IFAQItem } from 'modules/stake/actions/getFAQ';
import {
  IStakeFormPayload,
  IStakeSubmitPayload,
} from 'modules/stake/components/StakeForm';

interface IUseStakeForm {
  ratio: BigNumber;
  amount: BigNumber;
  balance?: BigNumber;
  faqItems: IFAQItem[];
  gasFee: BigNumber;
  isCommonDataLoading: boolean;
  isGasFeeLoading: boolean;
  loading: boolean;
  minAmount?: number;
  tokenIn: string;
  tokenOut: string;
  totalAmount: BigNumber;
  onChange?: (values: IStakeFormPayload, invalid: boolean) => void;
  onSubmit: (payload: IStakeSubmitPayload) => void;
}

export const useStakeForm = (): IUseStakeForm => {
  const [amount] = useState(ZERO);

  const { data, isFetching: isCommonDataLoading } = useGetSUICommonDataQuery(
    undefined,
    {
      refetchOnMountOrArgChange: ACTION_CACHE_SEC,
    },
  );
  const [stake, { isLoading: isStakeLoading }] = useStakeSUIMutation();

  const { data: faqItems } = useQuery<IFAQItem[]>({
    defaultData: [],
    type: getFAQ,
  });

  const aSUIcRatio = data?.aSUIcRatio ?? ZERO;
  const balance = data?.suiBalance ?? ZERO;
  const minAmount = data?.minStake.toNumber() ?? 0;

  const onSubmit = () => {
    const stakeAmount = new BigNumber(amount);

    stake({ amount: stakeAmount });
  };

  return {
    ratio: aSUIcRatio,
    amount,
    balance,
    faqItems,
    gasFee: ZERO,
    isCommonDataLoading,
    isGasFeeLoading: false,
    loading: isStakeLoading,
    minAmount,
    tokenIn: t('unit.sui'),
    tokenOut: Token.aSUIc,
    totalAmount: ZERO,
    onChange: () => null,
    onSubmit,
  };
};
