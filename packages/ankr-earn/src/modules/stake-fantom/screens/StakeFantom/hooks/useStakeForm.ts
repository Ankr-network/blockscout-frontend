import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo, useState } from 'react';

import { t } from 'common';
import { AvailableWriteProviders } from 'provider';

import { trackStake } from 'modules/analytics/tracking-actions/trackStake';
import { useAuth } from 'modules/auth/common/hooks/useAuth';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getAPY } from 'modules/stake-fantom/actions/getAPY';
import { getBurnFee } from 'modules/stake-fantom/actions/getBurnFee';
import { getCommonData } from 'modules/stake-fantom/actions/getCommonData';
import { stake } from 'modules/stake-fantom/actions/stake';
import { FantomSDK } from 'modules/stake-fantom/api/sdk';
import { calcTotalAmount } from 'modules/stake-fantom/utils/calcTotalAmount';
import {
  IStakeFormPayload,
  IStakeSubmitPayload,
} from 'modules/stake/components/StakeForm';
import { useAppDispatch } from 'store/useAppDispatch';

import { TFtmSyntToken } from '../../../types/TFtmSyntToken';

import { useSelectedToken } from './useSelectedToken';

interface IUseStakeForm {
  loading: boolean;
  isCommonDataLoading: boolean;
  isStakeLoading: boolean;
  tokenIn: string;
  tokenOut: string;
  amount: BigNumber;
  aFTMcRatio: BigNumber;
  balance?: BigNumber;
  minAmount?: number;
  apy: BigNumber;
  onSubmit: (payload: IStakeSubmitPayload) => void;
  onChange?: (values: IStakeFormPayload) => void;
  onTokenSelect: (token: TFtmSyntToken) => () => void;
}

export const useStakeForm = (): IUseStakeForm => {
  const [amount, setAmount] = useState(ZERO);
  const dispatch = useAppDispatch();

  const dispatchRequest = useDispatchRequest();
  const { loading: isStakeLoading } = useMutation({ type: stake });
  const { selectedToken, handleTokenSelect } = useSelectedToken();
  const { data, loading: isCommonDataLoading } = useQuery({
    type: getCommonData,
  });
  const { data: apy } = useQuery({ type: getAPY });

  const { address, walletName } = useAuth(
    AvailableWriteProviders.ethCompatible,
  );

  const ftmBalance = data?.ftmBalance;
  const aFTMcRatio = data?.aFTMcRatio ?? ZERO;

  const totalAmount = useMemo(
    () =>
      calcTotalAmount({
        selectedToken,
        amount,
        balance: ftmBalance,
        stakeGasFee: ZERO ?? undefined,
        aFTMcRatio,
      }),
    [aFTMcRatio, amount, ftmBalance, selectedToken],
  );

  const balance = data?.ftmBalance;
  const minAmount = data?.minStake.toNumber() ?? 0;

  const onChange = (values: IStakeFormPayload) => {
    setAmount(values.amount ? new BigNumber(values.amount) : ZERO);
  };

  const sendAnalytics = async () => {
    const currentAmount = new BigNumber(amount);
    const fantomSDK = await FantomSDK.getInstance();
    const aftmbBalance = await fantomSDK.getABBalance();

    trackStake({
      address,
      walletType: walletName,
      amount: currentAmount,
      willGetAmount: currentAmount,
      tokenIn: Token.FTM,
      tokenOut: selectedToken,
      prevStakedAmount: balance,
      synthBalance: aftmbBalance,
    });
  };

  const onSubmit = () => {
    const stakeAmount = new BigNumber(amount);

    dispatchRequest(stake({ amount: stakeAmount, token: selectedToken })).then(
      ({ error }) => {
        if (!error) {
          sendAnalytics();
        }
      },
    );
  };

  const onTokenSelect = useCallback(
    (token: TFtmSyntToken) => () => {
      handleTokenSelect(token);

      const shouldUpdateGasFee = !totalAmount.isZero() && amount;
      if (shouldUpdateGasFee) {
        dispatch(getBurnFee(amount));
      }
    },
    [amount, dispatch, handleTokenSelect, totalAmount],
  );

  return {
    isCommonDataLoading,
    isStakeLoading: isCommonDataLoading,
    balance,
    minAmount,
    loading: isStakeLoading,
    tokenIn: t('unit.ftm'),
    tokenOut: selectedToken,
    amount,
    aFTMcRatio,
    apy: apy ?? ZERO,
    onChange,
    onSubmit,
    onTokenSelect,
  };
};
