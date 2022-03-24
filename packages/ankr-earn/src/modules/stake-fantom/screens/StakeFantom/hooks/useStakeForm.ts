import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { ReactText, useState } from 'react';

import { AvailableWriteProviders } from 'provider';

import { trackStake } from 'modules/analytics/tracking-actions/trackStake';
import { useAuth } from 'modules/auth/hooks/useAuth';
import { Token } from 'modules/common/types/token';
import { t } from 'modules/i18n/utils/intl';
import { getCommonData } from 'modules/stake-fantom/actions/getCommonData';
import { stake } from 'modules/stake-fantom/actions/stake';
import { FantomSDK } from 'modules/stake-fantom/api/sdk';
import {
  IStakeFormPayload,
  IStakeSubmitPayload,
} from 'modules/stake/components/StakeForm';

interface IUseStakeForm {
  loading: boolean;
  isCommonDataLoading: boolean;
  tokenIn: string;
  tokenOut: string;
  amount: ReactText;
  balance?: BigNumber;
  minAmount?: number;
  onSubmit: (payload: IStakeSubmitPayload) => void;
  onChange?: (values: IStakeFormPayload) => void;
}

export const useStakeForm = (openSuccessModal: () => void): IUseStakeForm => {
  const [amount, setAmount] = useState<ReactText>('');
  const dispatchRequest = useDispatchRequest();
  const { loading: isStakeLoading } = useMutation({ type: stake });

  const { data, loading: isCommonDataLoading } = useQuery({
    type: getCommonData,
  });

  const { address, walletName } = useAuth(
    AvailableWriteProviders.ethCompatible,
  );

  const balance = data?.ftmBalance;
  const minAmount = data?.minStake.toNumber() ?? 0;

  const onChange = (values: IStakeFormPayload) => {
    setAmount(values.amount || '');
  };

  const sendAnalytics = async () => {
    const currentAmount = new BigNumber(amount);
    const fantomSDK = await FantomSDK.getInstance();
    const aftmbBalance = await fantomSDK.getAftmbBalance();

    trackStake({
      address,
      walletType: walletName,
      amount: currentAmount,
      willGetAmount: currentAmount,
      tokenIn: Token.FTM,
      tokenOut: Token.aFTMb,
      prevStakedAmount: balance,
      synthBalance: aftmbBalance,
    });
  };

  const onSubmit = () => {
    const stakeAmount = new BigNumber(amount);

    dispatchRequest(stake(stakeAmount)).then(({ error }) => {
      if (!error) {
        sendAnalytics();
        openSuccessModal();
      }
    });
  };

  return {
    isCommonDataLoading,
    balance,
    minAmount,
    loading: isStakeLoading,
    tokenIn: t('unit.ftm'),
    tokenOut: t('unit.aftmb'),
    amount,
    onChange,
    onSubmit,
  };
};
