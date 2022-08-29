import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useMemo, useState } from 'react';

import { AvailableWriteProviders } from '@ankr.com/provider';
import { MaticEthSDK } from '@ankr.com/staking-sdk';

import { trackStake } from 'modules/analytics/tracking-actions/trackStake';
import { useAuth } from 'modules/auth/common/hooks/useAuth';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { useStakableMaticInEth } from 'modules/dashboard/screens/Dashboard/components/StakableTokens/hooks/useStakableMaticInEth';
import { TMaticSyntToken } from 'modules/stake-matic/common/types';
import { calcTotalAmount } from 'modules/stake-matic/common/utils/calcTotalAmount';
import {
  fetchStats,
  IFetchStatsResponseData,
} from 'modules/stake-matic/eth/actions/fetchStats';
import { stake } from 'modules/stake-matic/eth/actions/stake';
import {
  IStakeFormPayload,
  IStakeSubmitPayload,
} from 'modules/stake/components/StakeForm';

import { useSelectedToken } from './useSelectedToken';

interface IUseStakeFormData {
  aMATICcRatio: BigNumber;
  amount: BigNumber;
  certificateRatio: BigNumber;
  fetchStatsData: IFetchStatsResponseData | null;
  fetchStatsError?: Error;
  isFetchStatsLoading: boolean;
  isStakeLoading: boolean;
  tokenIn: string;
  tokenOut: string;
  totalAmount: BigNumber;
  handleFormChange: (values: IStakeFormPayload, invalid: boolean) => void;
  handleSubmit: (values: IStakeSubmitPayload) => void;
  onTokenSelect: (token: TMaticSyntToken) => () => void;
}

export const useStakeForm = (): IUseStakeFormData => {
  const [amount, setAmount] = useState(ZERO);
  const [isError, setIsError] = useState(false);
  const { selectedToken, handleTokenSelect } = useSelectedToken();

  const dispatchRequest = useDispatchRequest();
  const { loading: isStakeLoading } = useMutation({ type: stake });
  const {
    data: fetchStatsData,
    loading: isFetchStatsLoading,
    error: fetchStatsError,
  } = useQuery({
    type: fetchStats,
  });

  const { address, walletName } = useAuth(
    AvailableWriteProviders.ethCompatible,
  );

  const stakableMATICData = useStakableMaticInEth();

  const aMATICcRatio = fetchStatsData?.aMATICcRatio;

  const tokenCertRatio = useMemo(
    () => (aMATICcRatio ? new BigNumber(1).div(aMATICcRatio) : ZERO),
    [aMATICcRatio],
  );

  const handleFormChange = (
    { amount: formAmount }: IStakeFormPayload,
    // TODO: https://ankrnetwork.atlassian.net/browse/STAKAN-1482
    invalid: boolean,
  ) => {
    setIsError(invalid);
    setAmount(formAmount ? new BigNumber(formAmount) : ZERO);
  };

  const totalAmount = useMemo(() => {
    if (isError || stakableMATICData.balance.isLessThan(amount)) {
      return ZERO;
    }

    return calcTotalAmount({
      selectedToken,
      amount: new BigNumber(amount),
      balance: stakableMATICData.balance,
      aMATICcRatio,
    });
  }, [aMATICcRatio, amount, selectedToken, stakableMATICData.balance, isError]);

  const sendAnalytics = async () => {
    const currentAmount = new BigNumber(amount);
    const maticEthSDK = await MaticEthSDK.getInstance();
    const synthBalance =
      selectedToken === Token.aMATICb
        ? await maticEthSDK.getABBalance()
        : await maticEthSDK.getACBalance();

    trackStake({
      address,
      walletType: walletName,
      amount: currentAmount,
      willGetAmount: currentAmount,
      tokenIn: Token.MATIC,
      tokenOut: selectedToken,
      prevStakedAmount: stakableMATICData.balance,
      synthBalance,
    });
  };

  const handleSubmit = (values: IStakeSubmitPayload): void => {
    dispatchRequest(
      stake({
        amount: new BigNumber(values.amount),
        token: selectedToken,
      }),
    ).then(({ error }) => {
      if (!error) {
        sendAnalytics();
      }
    });
  };

  const onTokenSelect = (token: TMaticSyntToken) => () => {
    handleTokenSelect(token);
  };

  return {
    aMATICcRatio: tokenCertRatio,
    amount,
    certificateRatio: aMATICcRatio ?? ZERO,
    fetchStatsData,
    fetchStatsError,
    isFetchStatsLoading,
    isStakeLoading,
    tokenIn: Token.MATIC,
    tokenOut: selectedToken,
    totalAmount,
    handleFormChange,
    handleSubmit,
    onTokenSelect,
  };
};
