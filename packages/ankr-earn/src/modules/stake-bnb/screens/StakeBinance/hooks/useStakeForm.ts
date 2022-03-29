import { resetRequests } from '@redux-requests/core';
import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo, useState } from 'react';
import { useHistory } from 'react-router';
import { useDebouncedCallback } from 'use-debounce/lib';

import { AvailableWriteProviders } from 'provider';

import { trackStake } from 'modules/analytics/tracking-actions/trackStake';
import { useAuth } from 'modules/auth/hooks/useAuth';
import { featuresConfig, ZERO } from 'modules/common/const';
import { Milliseconds } from 'modules/common/types';
import { Token } from 'modules/common/types/token';
import { useStakableBnb } from 'modules/dashboard/screens/Dashboard/components/StakableTokens/hooks/useStakableBnb';
import { getStakeGasFee } from 'modules/stake-bnb/actions/getStakeGasFee';
import { stake } from 'modules/stake-bnb/actions/stake';
import { BinanceSDK } from 'modules/stake-bnb/api/BinanceSDK';
import { DEMO_ABNBC_RATE } from 'modules/stake-bnb/const';
import { RoutesConfig } from 'modules/stake-bnb/Routes';
import { TBnbSyntToken } from 'modules/stake-bnb/types';
import { calcTotalAmount } from 'modules/stake-bnb/utils/calcTotalAmount';
import { getValidSelectedToken } from 'modules/stake-bnb/utils/getValidSelectedToken';
import {
  IStakeFormPayload,
  IStakeSubmitPayload,
} from 'modules/stake/components/StakeForm';
import { useAppDispatch } from 'store/useAppDispatch';

import { useFetchAPY } from '../../../hooks/useFetchAPY';
import { useFetchStats } from '../../../hooks/useFetchStats';

const DEBOUNCE_TIME: Milliseconds = 1_000;

interface IUseStakeFormArgs {
  openSuccessModal: () => void;
}

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

export const useStakeForm = ({
  openSuccessModal,
}: IUseStakeFormArgs): IUseStakeFormData => {
  const dispatch = useAppDispatch();
  const dispatchRequest = useDispatchRequest();
  const [amount, setAmount] = useState(ZERO);
  const { loading: isStakeLoading } = useMutation({ type: stake });
  const { replace } = useHistory();

  const stakeParamsToken = RoutesConfig.stake.useParams().token;
  const selectedToken = featuresConfig.stakeAbnbc
    ? getValidSelectedToken(stakeParamsToken)
    : Token.aBNBb;

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
    DEBOUNCE_TIME,
  );

  const relayerFee = fetchStatsData?.relayerFee ?? ZERO;
  const bnbBalance = fetchStatsData?.bnbBalance;

  const totalAmount = useMemo(
    () =>
      calcTotalAmount({
        selectedToken,
        amount,
        relayerFee,
        balance: bnbBalance,
        stakeGasFee: stakeGasFee ?? undefined,
        aBNBcRatio: new BigNumber(DEMO_ABNBC_RATE),
      }),
    [amount, bnbBalance, relayerFee, selectedToken, stakeGasFee],
  );

  const sendAnalytics = async () => {
    const currentAmount = new BigNumber(amount).plus(relayerFee);
    const binanceSDK = await BinanceSDK.getInstance();
    const abnbbBalance = await binanceSDK.getABNBBBalance();

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

  const onTokenSelect = useCallback(
    (token: TBnbSyntToken) => () => {
      replace(RoutesConfig.stake.generatePath(token));
    },
    [replace],
  );

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
    relayerFee,
    bnbBalance,
    minimumStake: fetchStatsData?.minimumStake,
    tokenIn: Token.BNB,
    aBNBcRatio: DEMO_ABNBC_RATE ? new BigNumber(1).div(DEMO_ABNBC_RATE) : ZERO,
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
