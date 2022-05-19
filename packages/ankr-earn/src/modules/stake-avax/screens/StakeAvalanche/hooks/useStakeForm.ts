import { useDispatchRequest, useMutation } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useState } from 'react';

import { AvailableWriteProviders } from 'provider';

import { trackStake } from 'modules/analytics/tracking-actions/trackStake';
import { useAuth } from 'modules/auth/common/hooks/useAuth';
import { Token } from 'modules/common/types/token';
import { useStakableAvax } from 'modules/dashboard/screens/Dashboard/components/StakableTokens/hooks/useStakableAvax';
import { AvalancheSDK } from 'modules/stake-avax/api/AvalancheSDK';
import {
  IStakeFormPayload,
  IStakeSubmitPayload,
} from 'modules/stake/components/StakeForm';

import { stake } from '../../../actions/stake';
import { useFetchAPY } from '../../../hooks/useFetchAPY';
import {
  IUseFetchStatsData,
  useFetchStats,
} from '../../../hooks/useFetchStats';

interface IUseStakeFormArgs {
  openSuccessModal: () => void;
}

interface IUseStakeFormData {
  amount: number;
  fetchAPYData: BigNumber;
  fetchStatsData: IUseFetchStatsData['stats'];
  fetchStatsError: Error | null;
  isStakeLoading: boolean;
  isFetchStatsLoading: boolean;
  handleFormChange: (values: IStakeFormPayload) => void;
  handleSubmit: (values: IStakeSubmitPayload) => void;
}

export const useStakeForm = ({
  openSuccessModal,
}: IUseStakeFormArgs): IUseStakeFormData => {
  const dispatchRequest = useDispatchRequest();

  const { loading: isStakeLoading } = useMutation({ type: stake });

  const {
    error: fetchStatsError,
    isLoading: isFetchStatsLoading,
    stats: fetchStatsData,
  } = useFetchStats();

  const fetchAPYData = useFetchAPY();

  const { address, walletName } = useAuth(
    AvailableWriteProviders.ethCompatible,
  );

  const stakableAVAXData = useStakableAvax();
  const [amount, setAmount] = useState(0);

  const handleFormChange = ({ amount: value }: IStakeFormPayload): void => {
    const rawAmount = new BigNumber(typeof value === 'string' ? value : '0');
    const resultVal = rawAmount.isNaN() ? 0 : rawAmount.toNumber();

    setAmount(resultVal);
  };

  const sendAnalytics = async () => {
    const currentAmount = new BigNumber(amount);
    const avalancheSDK = await AvalancheSDK.getInstance();
    const aavaxbBalance = await avalancheSDK.getAAVAXBBalance();

    trackStake({
      address,
      walletType: walletName,
      amount: currentAmount,
      willGetAmount: currentAmount,
      tokenIn: Token.AVAX,
      tokenOut: Token.aAVAXb,
      prevStakedAmount: stakableAVAXData.balance,
      synthBalance: aavaxbBalance,
    });
  };

  const handleSubmit = (values: IStakeSubmitPayload): void => {
    const resultAmount = new BigNumber(values.amount);

    dispatchRequest(stake(resultAmount)).then(({ error }) => {
      if (!error) {
        sendAnalytics();
        openSuccessModal();

        setAmount(0);
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
    handleFormChange,
    handleSubmit,
  };
};
