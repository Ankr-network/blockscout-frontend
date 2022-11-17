import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useState } from 'react';

import { t } from 'common';

import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
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
  const { data: faqItems } = useQuery<IFAQItem[]>({
    defaultData: [],
    type: getFAQ,
  });

  return {
    ratio: ZERO,
    amount,
    balance: ZERO,
    faqItems,
    gasFee: ZERO,
    isCommonDataLoading: false,
    isGasFeeLoading: false,
    loading: false,
    minAmount: 0,
    tokenIn: t('unit.sui'),
    tokenOut: Token.aSUIc,
    totalAmount: ZERO,
    onChange: () => null,
    onSubmit: () => null,
  };
};
