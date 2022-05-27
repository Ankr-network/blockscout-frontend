import { resetRequests } from '@redux-requests/core';
import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useMemo, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce/lib';

import { AvailableWriteProviders } from 'provider';

import { trackStake } from 'modules/analytics/tracking-actions/trackStake';
import { useAuth } from 'modules/auth/common/hooks/useAuth';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { useStakableAvax } from 'modules/dashboard/screens/Dashboard/components/StakableTokens/hooks/useStakableAvax';
import { getStakeGasFee } from 'modules/stake-avax/actions/getStakeGasFee';
import {
  IStakeFormPayload,
  IStakeSubmitPayload,
} from 'modules/stake/components/StakeForm';
import { INPUT_DEBOUNCE_TIME } from 'modules/stake/const';
import { useAppDispatch } from 'store/useAppDispatch';

import { stake } from '../../../actions/stake';
import {
  IUseFetchStatsData,
  useFetchStats,
} from '../../../hooks/useFetchStats';

interface IUseStakeFormArgs {
  openSuccessModal: () => void;
}

interface IUseStakeFormData {
  amount: BigNumber;
  stakeGasFee: BigNumber;
  totalAmount: BigNumber;
  fetchStatsData: IUseFetchStatsData['stats'];
  fetchStatsError: Error | null;
  isStakeLoading: boolean;
  isFetchStatsLoading: boolean;
  isStakeGasLoading: boolean;
  handleFormChange: (values: IStakeFormPayload, invalid: boolean) => void;
  handleSubmit: (values: IStakeSubmitPayload) => void;
}

export const useStakeForm = ({
  openSuccessModal,
}: IUseStakeFormArgs): IUseStakeFormData => {
  const dispatch = useAppDispatch();
  const dispatchRequest = useDispatchRequest();

  const { loading: isStakeLoading } = useMutation({ type: stake });

  const { data: stakeGasFeeData, loading: isStakeGasLoading } = useQuery({
    type: getStakeGasFee,
  });

  const {
    error: fetchStatsError,
    isLoading: isFetchStatsLoading,
    stats: fetchStatsData,
  } = useFetchStats();

  const { address, walletName } = useAuth(
    AvailableWriteProviders.ethCompatible,
  );

  const stakableAVAXData = useStakableAvax();
  const [amount, setAmount] = useState(ZERO);

  const totalAmount = useMemo(() => {
    if (!fetchStatsData || fetchStatsData.avaxBalance.isLessThan(amount)) {
      return ZERO;
    }

    return new BigNumber(amount);
  }, [fetchStatsData, amount]);

  const handleFormChange = (
    { amount: formAmount }: IStakeFormPayload,
    invalid: boolean,
  ): void => {
    if (invalid) {
      dispatch(resetRequests([getStakeGasFee.toString()]));
    } else if (formAmount) {
      const readyAmount = new BigNumber(formAmount);
      dispatch(getStakeGasFee(readyAmount));
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
      tokenOut: Token.aAVAXb,
      prevStakedAmount: stakableAVAXData.balance,
      synthBalance: fetchStatsData?.aAVAXbBalance ?? ZERO,
    });
  };

  const handleSubmit = (values: IStakeSubmitPayload): void => {
    const resultAmount = new BigNumber(values.amount);

    dispatchRequest(stake(resultAmount)).then(({ error }) => {
      if (!error) {
        sendAnalytics();
        openSuccessModal();

        setAmount(ZERO);
      }
    });
  };

  return {
    amount,
    totalAmount,
    fetchStatsData,
    fetchStatsError,
    isFetchStatsLoading,
    isStakeLoading,
    handleFormChange: debouncedOnChange,
    stakeGasFee: stakeGasFeeData ?? ZERO,
    isStakeGasLoading,
    handleSubmit,
  };
};
