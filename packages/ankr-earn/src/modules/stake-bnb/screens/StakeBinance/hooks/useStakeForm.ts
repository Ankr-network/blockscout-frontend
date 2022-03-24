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
import { useAuth } from 'modules/auth/hooks/useAuth';
import { ZERO } from 'modules/common/const';
import { Milliseconds } from 'modules/common/types';
import { Token } from 'modules/common/types/token';
import { useStakableBnb } from 'modules/dashboard/screens/Dashboard/components/StakableTokens/hooks/useStakableBnb';
import { getStakeGasFee } from 'modules/stake-bnb/actions/getStakeGasFee';
import { stake } from 'modules/stake-bnb/actions/stake';
import { BinanceSDK } from 'modules/stake-bnb/api/BinanceSDK';
import { calcTotalAmount } from 'modules/stake-bnb/utils/calcTotalAmount';
import {
  IStakeFormPayload,
  IStakeSubmitPayload,
} from 'modules/stake/components/StakeForm';
import { useAppDispatch } from 'store/useAppDispatch';

import { useFetchAPY } from '../../../hooks/useFetchAPY';
import {
  IUseFetchStatsData,
  useFetchStats,
} from '../../../hooks/useFetchStats';

const DEBOUNCE_TIME: Milliseconds = 1_000;

interface IUseStakeFormArgs {
  openSuccessModal: () => void;
}

interface IUseStakeFormData {
  amount: string;
  fetchAPYData: BigNumber;
  stakeGas: BigNumber;
  fetchStatsData: IUseFetchStatsData['stats'];
  fetchStatsError: Error | null;
  isStakeLoading: boolean;
  isStakeGasLoading: boolean;
  isFetchStatsLoading: boolean;
  totalAmount: BigNumber;
  handleFormChange: (values: IStakeFormPayload, invalid: boolean) => void;
  handleSubmit: (values: IStakeSubmitPayload) => void;
}

export const useStakeForm = ({
  openSuccessModal,
}: IUseStakeFormArgs): IUseStakeFormData => {
  const dispatch = useAppDispatch();
  const dispatchRequest = useDispatchRequest();
  const [amount, setAmount] = useState('0');
  const { loading: isStakeLoading } = useMutation({ type: stake });

  const {
    error: fetchStatsError,
    isLoading: isFetchStatsLoading,
    stats: fetchStatsData,
  } = useFetchStats();

  const { data: stakeGasFee, loading: isStakeGasLoading } = useQuery({
    type: getStakeGasFee,
  });

  const fetchAPYData = useFetchAPY();

  const { address, walletName } = useAuth(
    AvailableWriteProviders.ethCompatible,
  );

  const stakableBNBData = useStakableBnb();

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

    setAmount(formAmount ? `${formAmount}` : '');
  };

  const debouncedOnChange = useDebouncedCallback(
    handleFormChange,
    DEBOUNCE_TIME,
  );

  const totalAmount = useMemo(
    () =>
      fetchStatsData && stakeGasFee
        ? calcTotalAmount({
            amount: new BigNumber(amount),
            relayerFee: fetchStatsData.relayerFee,
            balance: fetchStatsData.bnbBalance,
            stakeGasFee,
          })
        : ZERO,
    [amount, fetchStatsData, stakeGasFee],
  );

  const sendAnalytics = async () => {
    const currentAmount = new BigNumber(amount).plus(
      fetchStatsData?.relayerFee ?? ZERO,
    );
    const binanceSDK = await BinanceSDK.getInstance();
    const abnbbBalance = await binanceSDK.getABNBBBalance();

    trackStake({
      address,
      walletType: walletName,
      amount: currentAmount,
      willGetAmount: currentAmount,
      tokenIn: Token.BNB,
      tokenOut: Token.aBNBb,
      prevStakedAmount: stakableBNBData.balance,
      synthBalance: abnbbBalance,
    });
  };

  const handleSubmit = ({ amount: formAmount }: IStakeSubmitPayload): void => {
    const stakeAmount = new BigNumber(formAmount);

    dispatchRequest(stake(stakeAmount)).then(({ error }) => {
      if (!error) {
        sendAnalytics();
        openSuccessModal();
      }
    });
  };

  return {
    amount,
    fetchAPYData,
    fetchStatsData,
    fetchStatsError,
    isFetchStatsLoading,
    isStakeLoading,
    isStakeGasLoading,
    totalAmount,
    stakeGas: stakeGasFee ?? ZERO,
    handleFormChange: debouncedOnChange,
    handleSubmit,
  };
};
