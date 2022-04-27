import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { ReactText, useState } from 'react';

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
import {
  IStakeFormPayload,
  IStakeSubmitPayload,
} from 'modules/stake/components/StakeForm';

interface IUseStakeFormData {
  amount: ReactText;
  apy: BigNumber;
  isStakeLoading: boolean;
  isFetchStatsLoading: boolean;
  fetchStatsData: IFetchStatsResponseData | null;
  fetchStatsError?: Error;
  handleFormChange: (values: IStakeFormPayload) => void;
  handleSubmit: (values: IStakeSubmitPayload) => void;
}

export const useStakeForm = (): IUseStakeFormData => {
  const [amount, setAmount] = useState<ReactText>('');

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

  const handleFormChange = (values: IStakeFormPayload) => {
    setAmount(values.amount || '');
  };

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
    dispatchRequest(stake({ amount: new BigNumber(values.amount) })).then(
      ({ error }) => {
        if (!error) {
          sendAnalytics();
        }
      },
    );
  };

  return {
    amount,
    apy: apyData ?? ZERO,
    handleFormChange,
    handleSubmit,
    isStakeLoading,
    isFetchStatsLoading,
    fetchStatsData,
    fetchStatsError,
  };
};
