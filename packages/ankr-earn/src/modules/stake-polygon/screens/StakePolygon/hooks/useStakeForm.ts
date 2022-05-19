import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useMemo, useState } from 'react';

import { AvailableWriteProviders } from 'provider';

import { trackStake } from 'modules/analytics/tracking-actions/trackStake';
import { useAuth } from 'modules/auth/common/hooks/useAuth';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { useStakableMatic } from 'modules/dashboard/screens/Dashboard/components/StakableTokens/hooks/useStakableMatic';
import { fetchAPY } from 'modules/stake-polygon/actions/fetchAPY';
import {
  fetchStats,
  IFetchStatsResponseData,
} from 'modules/stake-polygon/actions/fetchStats';
import { stake } from 'modules/stake-polygon/actions/stake';
import { PolygonSDK } from 'modules/stake-polygon/api/PolygonSDK';
import { TMaticSyntToken } from 'modules/stake-polygon/types';
import { calcTotalAmount } from 'modules/stake-polygon/utils/calcTotalAmount';
import {
  IStakeFormPayload,
  IStakeSubmitPayload,
} from 'modules/stake/components/StakeForm';

import { useSelectedToken } from './useSelectedToken';

interface IUseStakeFormData {
  amount: BigNumber;
  totalAmount: BigNumber;
  apy: BigNumber;
  isStakeLoading: boolean;
  isFetchStatsLoading: boolean;
  fetchStatsData: IFetchStatsResponseData | null;
  fetchStatsError?: Error;
  tokenIn: string;
  tokenOut: string;
  aMATICcRatio: BigNumber;
  handleFormChange: (values: IStakeFormPayload) => void;
  handleSubmit: (values: IStakeSubmitPayload) => void;
  onTokenSelect: (token: TMaticSyntToken) => () => void;
}

export const useStakeForm = (): IUseStakeFormData => {
  const [amount, setAmount] = useState(ZERO);
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
  const { data: apyData } = useQuery({ type: fetchAPY });

  const { address, walletName } = useAuth(
    AvailableWriteProviders.ethCompatible,
  );

  const stakableMATICData = useStakableMatic();

  const aMATICcRatio = fetchStatsData?.aMATICcRatio;

  const handleFormChange = ({ amount: formAmount }: IStakeFormPayload) => {
    setAmount(formAmount ? new BigNumber(formAmount) : ZERO);
  };

  const totalAmount = useMemo(
    () =>
      calcTotalAmount({
        selectedToken,
        amount: new BigNumber(amount),
        balance: stakableMATICData.balance,
        aMATICcRatio,
      }),
    [aMATICcRatio, amount, selectedToken, stakableMATICData.balance],
  );

  const sendAnalytics = async () => {
    const currentAmount = new BigNumber(amount);
    const polygonSDK = await PolygonSDK.getInstance();
    const amaticbBalance = await polygonSDK.getABBalance();

    trackStake({
      address,
      walletType: walletName,
      amount: currentAmount,
      willGetAmount: currentAmount,
      tokenIn: Token.MATIC,
      tokenOut: Token.aMATICb,
      prevStakedAmount: stakableMATICData.balance,
      synthBalance: amaticbBalance,
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
    amount,
    totalAmount,
    apy: apyData ?? ZERO,
    handleFormChange,
    handleSubmit,
    onTokenSelect,
    isStakeLoading,
    isFetchStatsLoading,
    fetchStatsData,
    fetchStatsError,
    tokenIn: Token.MATIC,
    tokenOut: selectedToken,
    aMATICcRatio: aMATICcRatio ? new BigNumber(1).div(aMATICcRatio) : ZERO,
  };
};
