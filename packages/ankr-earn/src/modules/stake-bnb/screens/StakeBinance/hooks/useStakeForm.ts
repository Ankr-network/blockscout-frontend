import { resetRequests } from '@redux-requests/core';
import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce/lib';

import { AvailableWriteProviders } from '@ankr.com/provider';
import { BinanceSDK } from '@ankr.com/staking-sdk';

import { trackStake } from 'modules/analytics/tracking-actions/trackStake';
import { useAuth } from 'modules/auth/common/hooks/useAuth';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { useStakableBnb } from 'modules/dashboard/screens/Dashboard/components/StakableTokens/hooks/useStakableBnb';
import { getStakeGasFee } from 'modules/stake-bnb/actions/getStakeGasFee';
import { stake } from 'modules/stake-bnb/actions/stake';
import { TBnbSyntToken } from 'modules/stake-bnb/types';
import { calcTotalAmount } from 'modules/stake-bnb/utils/calcTotalAmount';
import {
  IStakeFormPayload,
  IStakeSubmitPayload,
} from 'modules/stake/components/StakeForm';
import { INPUT_DEBOUNCE_TIME } from 'modules/stake/const';
import { useAppDispatch } from 'store/useAppDispatch';

import { useFetchStats } from '../../../hooks/useFetchStats';

import { useSelectedToken } from './useSelectedToken';

interface IUseStakeFormData {
  aBNBcRatio: BigNumber;
  amount: BigNumber;
  bnbBalance?: BigNumber;
  certificateRatio: BigNumber;
  isFetchStatsLoading: boolean;
  isStakeGasLoading: boolean;
  isStakeLoading: boolean;
  minimumStake?: BigNumber;
  relayerFee: BigNumber;
  stakeGas: BigNumber;
  tokenIn: string;
  tokenOut: string;
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
    INPUT_DEBOUNCE_TIME,
  );

  const relayerFee = fetchStatsData?.relayerFee ?? ZERO;
  const bnbBalance = fetchStatsData?.bnbBalance;
  const aBNBcRatio = fetchStatsData?.aBNBcRatio;

  const tokenCertRatio = useMemo(
    () => (aBNBcRatio ? new BigNumber(1).div(aBNBcRatio) : ZERO),
    [aBNBcRatio],
  );

  const totalAmount = useMemo(() => {
    if (!stakeGasFee) {
      return ZERO;
    }

    return calcTotalAmount({
      selectedToken,
      amount,
      relayerFee,
      balance: bnbBalance,
      stakeGasFee: stakeGasFee ?? undefined,
      aBNBcRatio,
    });
  }, [aBNBcRatio, amount, bnbBalance, relayerFee, selectedToken, stakeGasFee]);

  const sendAnalytics = async () => {
    const currentAmount = new BigNumber(amount).plus(relayerFee);
    const binanceSDK = await BinanceSDK.getInstance();
    const abnbbBalance = await binanceSDK.getABBalance();
    const abnbcBalance = await binanceSDK.getACBalance();

    trackStake({
      address,
      walletType: walletName,
      amount: currentAmount,
      willGetAmount: currentAmount,
      tokenIn: Token.BNB,
      tokenOut: selectedToken,
      prevStakedAmount: stakableBNBData.balance,
      synthBalance: selectedToken === Token.aBNBb ? abnbbBalance : abnbcBalance,
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
    aBNBcRatio: tokenCertRatio,
    amount,
    bnbBalance,
    certificateRatio: aBNBcRatio ?? ZERO,
    isFetchStatsLoading,
    isStakeGasLoading,
    isStakeLoading,
    minimumStake,
    relayerFee,
    stakeGas: stakeGasFee ?? ZERO,
    tokenIn: Token.BNB,
    tokenOut: selectedToken,
    totalAmount,
    handleFormChange: debouncedOnChange,
    handleSubmit,
    onTokenSelect,
  };
};
