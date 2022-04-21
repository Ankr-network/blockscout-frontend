import { resetRequests } from '@redux-requests/core';
import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo, useState } from 'react';
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
import { TBnbSyntToken } from 'modules/stake-bnb/types';
import { calcTotalAmount } from 'modules/stake-bnb/utils/calcTotalAmount';
import {
  IStakeFormPayload,
  IStakeSubmitPayload,
} from 'modules/stake/components/StakeForm';
import { useAppDispatch } from 'store/useAppDispatch';

import { useFetchAPY } from '../../../hooks/useFetchAPY';
import { useFetchStats } from '../../../hooks/useFetchStats';

import { useSelectedToken } from './useSelectedToken';

const DEBOUNCE_TIME: Milliseconds = 1_000;

interface IUseStakeFormData {
  amount: BigNumber;
  fetchAPYData: BigNumber;
  stakeGas: BigNumber;
  relayerFee: BigNumber;
  bnbBalance?: BigNumber;
  minimumStake?: BigNumber;
  tokenIn: string;
  tokenOut: string;
  aBNBcRatio: BigNumber;
  isStakeLoading: boolean;
  isStakeGasLoading: boolean;
  isFetchStatsLoading: boolean;
  totalAmount: BigNumber;
  handleFormChange: (values: IStakeFormPayload, invalid: boolean) => void;
  handleSubmit: (values: IStakeSubmitPayload) => void;
  onTokenSelect: (token: TBnbSyntToken) => () => void;
}

export const useStakeForm = (): IUseStakeFormData => {
  const dispatch = useAppDispatch();
  const dispatchRequest = useDispatchRequest();
  const [hasErrors, setHasErrors] = useState(false);
  const [amount, setAmount] = useState(ZERO);
  const { loading: isStakeLoading } = useMutation({ type: stake });
  const { selectedToken, handleTokenSelect } = useSelectedToken();

  const { isLoading: isFetchStatsLoading, stats: fetchStatsData } =
    useFetchStats();

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
    setHasErrors(invalid);
    setAmount(formAmount ? new BigNumber(formAmount) : ZERO);

    if (invalid) {
      dispatch(resetRequests([getStakeGasFee.toString()]));
    } else if (formAmount) {
      const readyAmount = new BigNumber(formAmount);
      dispatch(getStakeGasFee({ amount: readyAmount, token: selectedToken }));
    }
  };

  const debouncedOnChange = useDebouncedCallback(
    handleFormChange,
    DEBOUNCE_TIME,
  );

  const relayerFee = fetchStatsData?.relayerFee ?? ZERO;
  const bnbBalance = fetchStatsData?.bnbBalance;
  const aBNBcRatio = fetchStatsData?.aBNBcRatio;

  const totalAmount = useMemo(
    () =>
      calcTotalAmount({
        selectedToken,
        amount,
        relayerFee,
        balance: bnbBalance,
        stakeGasFee: stakeGasFee ?? undefined,
        aBNBcRatio,
      }),
    [aBNBcRatio, amount, bnbBalance, relayerFee, selectedToken, stakeGasFee],
  );

  const sendAnalytics = async () => {
    const currentAmount = new BigNumber(amount).plus(relayerFee);
    const binanceSDK = await BinanceSDK.getInstance();
    const abnbbBalance = await binanceSDK.getABBalance();

    trackStake({
      address,
      walletType: walletName,
      amount: currentAmount,
      willGetAmount: currentAmount,
      tokenIn: Token.BNB,
      tokenOut: selectedToken,
      prevStakedAmount: stakableBNBData.balance,
      synthBalance: abnbbBalance,
    });
  };

  const handleSubmit = ({ amount: formAmount }: IStakeSubmitPayload): void => {
    const stakeAmount = new BigNumber(formAmount);

    dispatchRequest(stake({ amount: stakeAmount, token: selectedToken })).then(
      ({ error }) => {
        if (!error) {
          sendAnalytics();
        }
      },
    );
  };

  const onTokenSelect = useCallback(
    (token: TBnbSyntToken) => () => {
      handleTokenSelect(token);

      const shouldUpdateGasFee = !totalAmount.isZero() && amount && !hasErrors;
      if (shouldUpdateGasFee) {
        dispatch(getStakeGasFee({ amount, token }));
      }
    },
    [amount, dispatch, handleTokenSelect, hasErrors, totalAmount],
  );

  const minimumStake = fetchStatsData
    ? fetchStatsData.minStake.plus(fetchStatsData.relayerFee)
    : undefined;

  return {
    amount,
    fetchAPYData,
    relayerFee,
    bnbBalance,
    minimumStake,
    tokenIn: Token.BNB,
    aBNBcRatio: aBNBcRatio ? new BigNumber(1).div(aBNBcRatio) : ZERO,
    tokenOut: selectedToken,
    isFetchStatsLoading,
    isStakeLoading,
    isStakeGasLoading,
    totalAmount,
    stakeGas: stakeGasFee ?? ZERO,
    handleFormChange: debouncedOnChange,
    handleSubmit,
    onTokenSelect,
  };
};
