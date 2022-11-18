import { resetRequests } from '@redux-requests/core';
import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useMemo, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce/lib';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { trackStake } from 'modules/analytics/tracking-actions/trackStake';
import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getStakeGasFee } from 'modules/stake-avax/actions/getStakeGasFee';
import { stake } from 'modules/stake-avax/actions/stake';
import { TAvaxSyntToken } from 'modules/stake-avax/types';
import { calcTotalAmount } from 'modules/stake-avax/utils/calcTotalAmount';
import { getFAQ, IFAQItem } from 'modules/stake/actions/getFAQ';
import {
  IStakeFormPayload,
  IStakeSubmitPayload,
} from 'modules/stake/components/StakeForm';
import { INPUT_DEBOUNCE_TIME } from 'modules/stake/const';
import { useAppDispatch } from 'store/useAppDispatch';

import {
  IUseFetchStatsData,
  useFetchStats,
} from '../../../hooks/useFetchStats';

import { useSelectedToken } from './useSelectedToken';

interface IUseStakeFormData {
  aAVAXcRatio: BigNumber;
  amount: BigNumber;
  certificateRatio: BigNumber;
  faqItems: IFAQItem[];
  fetchStatsData: IUseFetchStatsData['stats'];
  fetchStatsError: Error | null;
  isFetchStatsLoading: boolean;
  isStakeGasLoading: boolean;
  isStakeLoading: boolean;
  stakeGasFee: BigNumber;
  tokenOut: string;
  totalAmount: BigNumber;
  handleFormChange: (values: IStakeFormPayload, invalid: boolean) => void;
  handleSubmit: (values: IStakeSubmitPayload) => void;
  onTokenSelect: (token: TAvaxSyntToken) => () => void;
}

export const useStakeForm = (): IUseStakeFormData => {
  const dispatch = useAppDispatch();
  const dispatchRequest = useDispatchRequest();
  const { selectedToken, handleTokenSelect } = useSelectedToken();

  const { loading: isStakeLoading } = useMutation({ type: stake });

  const { data: faqItems } = useQuery<IFAQItem[]>({
    defaultData: [],
    type: getFAQ,
  });

  const { data: stakeGasFeeData, loading: isStakeGasLoading } = useQuery({
    type: getStakeGasFee,
  });

  const {
    error: fetchStatsError,
    isLoading: isFetchStatsLoading,
    stats: fetchStatsData,
  } = useFetchStats();

  const { address, walletName } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );

  const [amount, setAmount] = useState(ZERO);

  const aAVAXcRatio = fetchStatsData?.aAVAXcRatio;

  const tokenCertRatio = useMemo(
    () => (aAVAXcRatio ? new BigNumber(1).div(aAVAXcRatio) : ZERO),
    [aAVAXcRatio],
  );

  const totalAmount = useMemo(() => {
    if (!fetchStatsData || fetchStatsData.avaxBalance.isLessThan(amount)) {
      return ZERO;
    }

    return calcTotalAmount({
      selectedToken,
      amount: new BigNumber(amount),
      balance: fetchStatsData.avaxBalance,
      aAVAXcRatio,
    });
  }, [fetchStatsData, amount, selectedToken, aAVAXcRatio]);

  const handleFormChange = (
    { amount: formAmount }: IStakeFormPayload,
    invalid: boolean,
  ): void => {
    if (invalid) {
      dispatch(resetRequests([getStakeGasFee.toString()]));
    } else if (formAmount) {
      const readyAmount = new BigNumber(formAmount);
      dispatch(
        getStakeGasFee({
          amount: readyAmount,
          token: selectedToken,
        }),
      );
    }

    setAmount(formAmount ? new BigNumber(formAmount) : ZERO);
  };

  const debouncedOnChange = useDebouncedCallback(
    handleFormChange,
    INPUT_DEBOUNCE_TIME,
  );

  const sendAnalytics = async () => {
    const currentAmount = new BigNumber(amount);

    trackStake({
      address,
      walletType: walletName,
      amount: currentAmount,
      willGetAmount: currentAmount,
      tokenIn: Token.AVAX,
      tokenOut: selectedToken,
      prevStakedAmount: fetchStatsData?.avaxBalance ?? ZERO,
      synthBalance:
        selectedToken === Token.aAVAXb
          ? fetchStatsData?.aAVAXbBalance ?? ZERO
          : fetchStatsData?.aAVAXcBalance ?? ZERO,
    });
  };

  const handleSubmit = (values: IStakeSubmitPayload): void => {
    const resultAmount = new BigNumber(values.amount);

    dispatchRequest(stake({ amount: resultAmount, token: selectedToken })).then(
      ({ error }) => {
        if (!error) {
          sendAnalytics();

          setAmount(ZERO);
        }
      },
    );
  };

  const onTokenSelect = (token: TAvaxSyntToken) => () => {
    handleTokenSelect(token);
  };

  return {
    aAVAXcRatio: tokenCertRatio,
    amount,
    certificateRatio: aAVAXcRatio ?? ZERO,
    faqItems,
    fetchStatsData,
    fetchStatsError,
    isFetchStatsLoading,
    isStakeGasLoading,
    isStakeLoading,
    stakeGasFee: stakeGasFeeData ?? ZERO,
    tokenOut: selectedToken,
    totalAmount,
    handleFormChange: debouncedOnChange,
    handleSubmit,
    onTokenSelect,
  };
};
