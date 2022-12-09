import { t } from '@ankr.com/common';
import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useMemo, useState } from 'react';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ACTION_CACHE_SEC, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { useGetFTMCommonDataQuery } from 'modules/stake-fantom/actions/getCommonData';
import { useLazyGetFTMStakeGasFeeQuery } from 'modules/stake-fantom/actions/getStakeGasFee';
import { useStakeFTMMutation } from 'modules/stake-fantom/actions/stake';
import { calcTotalAmount } from 'modules/stake-fantom/utils/calcTotalAmount';
import { getFAQ, IFAQItem } from 'modules/stake/actions/getFAQ';
import {
  IStakeFormPayload,
  IStakeSubmitPayload,
} from 'modules/stake/components/StakeForm';

import { useAnalytics } from './useAnalytics';

interface IUseStakeForm {
  aFTMcRatio: BigNumber;
  amount: BigNumber;
  balance?: BigNumber;
  certificateRatio: BigNumber;
  faqItems: IFAQItem[];
  gasFee: BigNumber;
  isCommonDataLoading: boolean;
  isGasFeeLoading: boolean;
  isStakeLoading: boolean;
  loading: boolean;
  minAmount?: number;
  tokenIn: string;
  tokenOut: string;
  totalAmount: BigNumber;
  onChange?: (values: IStakeFormPayload, invalid: boolean) => void;
  onSubmit: (payload: IStakeSubmitPayload) => void;
}

export const useStakeForm = (): IUseStakeForm => {
  const [amount, setAmount] = useState(ZERO);
  const [isError, setIsError] = useState(false);

  const [stake, { isLoading: isStakeLoading }] = useStakeFTMMutation();
  const {
    data,
    isFetching: isCommonDataLoading,
    refetch,
  } = useGetFTMCommonDataQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE_SEC,
  });

  const { data: faqItems } = useQuery<IFAQItem[]>({
    defaultData: [],
    type: getFAQ,
  });

  const [getAVAXStakeGasFee, { data: gasFee, isFetching: isGasFeeLoading }] =
    useLazyGetFTMStakeGasFeeQuery();

  const aFTMcRatio = data?.aFTMcRatio ?? ZERO;
  const balance = data?.ftmBalance ?? ZERO;
  const synthBalance = data?.aFTMcBalance ?? ZERO;
  const minAmount = data?.minStake.toNumber() ?? 0;

  const { sendAnalytics } = useAnalytics({
    amount,
    balance,
    selectedToken: Token.aFTMc,
    synthBalance,
  });

  const tokenCertRatio = useMemo(
    () =>
      aFTMcRatio.isGreaterThan(0) ? new BigNumber(1).div(aFTMcRatio) : ZERO,
    [aFTMcRatio],
  );

  const totalAmount = useMemo(() => {
    if (isError || !balance || balance.isLessThan(amount)) {
      return ZERO;
    }

    return calcTotalAmount({
      selectedToken: Token.aFTMc,
      amount,
      balance,
      stakeGasFee: ZERO ?? undefined,
      aFTMcRatio,
    });
  }, [aFTMcRatio, amount, balance, isError]);

  useProviderEffect(() => {
    refetch();
  }, []);

  const onChange = (values: IStakeFormPayload, invalid: boolean) => {
    // todo: https://ankrnetwork.atlassian.net/browse/STAKAN-1482
    setIsError(invalid);
    setAmount(values.amount ? new BigNumber(values.amount) : ZERO);

    if (!invalid && values.amount) {
      const readyAmount = new BigNumber(values.amount);
      getAVAXStakeGasFee({
        amount: readyAmount,
        token: Token.aFTMc,
      });
    }
  };

  const onSubmit = () => {
    const stakeAmount = new BigNumber(amount);

    stake({ amount: stakeAmount, token: Token.aFTMc })
      .unwrap()
      .then(() => {
        sendAnalytics();
      });
  };

  return {
    aFTMcRatio: tokenCertRatio,
    amount,
    balance,
    certificateRatio: aFTMcRatio,
    faqItems,
    gasFee: gasFee ?? ZERO,
    isCommonDataLoading,
    isGasFeeLoading,
    isStakeLoading: isCommonDataLoading,
    loading: isStakeLoading,
    minAmount,
    tokenIn: t('unit.ftm'),
    tokenOut: Token.aFTMc,
    totalAmount,
    onChange,
    onSubmit,
  };
};
