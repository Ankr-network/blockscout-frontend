import { resetRequests } from '@redux-requests/core';
import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo, useState } from 'react';

import { AvailableWriteProviders } from '@ankr.com/provider';
import { FantomSDK } from '@ankr.com/staking-sdk';
import { t } from 'common';

import { trackStake } from 'modules/analytics/tracking-actions/trackStake';
import { useAuth } from 'modules/auth/common/hooks/useAuth';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getCommonData } from 'modules/stake-fantom/actions/getCommonData';
import { getStakeGasFee } from 'modules/stake-fantom/actions/getStakeGasFee';
import { stake } from 'modules/stake-fantom/actions/stake';
import { calcTotalAmount } from 'modules/stake-fantom/utils/calcTotalAmount';
import {
  IStakeFormPayload,
  IStakeSubmitPayload,
} from 'modules/stake/components/StakeForm';
import { useAppDispatch } from 'store/useAppDispatch';

import { TFtmSyntToken } from '../../../types/TFtmSyntToken';

import { useSelectedToken } from './useSelectedToken';

interface IUseStakeForm {
  aFTMcRatio: BigNumber;
  amount: BigNumber;
  balance?: BigNumber;
  certificateRatio: BigNumber;
  gasFee: BigNumber;
  isCommonDataLoading: boolean;
  isGasFeeLoading: boolean;
  isStakeLoading: boolean;
  loading: boolean;
  minAmount?: number;
  tokenIn: string;
  tokenOut: string;
  totalAmount: BigNumber;
  onChange?: (values: IStakeFormPayload, invalid: boolean) => void;
  onSubmit: (payload: IStakeSubmitPayload) => void;
  onTokenSelect: (token: TFtmSyntToken) => () => void;
}

export const useStakeForm = (): IUseStakeForm => {
  const [amount, setAmount] = useState(ZERO);
  const [isError, setIsError] = useState(false);
  const dispatch = useAppDispatch();

  const dispatchRequest = useDispatchRequest();
  const { loading: isStakeLoading } = useMutation({ type: stake });
  const { selectedToken, handleTokenSelect } = useSelectedToken();
  const { data, loading: isCommonDataLoading } = useQuery({
    type: getCommonData,
  });

  const { data: gasFee, loading: isGasFeeLoading } = useQuery({
    type: getStakeGasFee,
  });

  const { address, walletName } = useAuth(
    AvailableWriteProviders.ethCompatible,
  );

  const ftmBalance = data?.ftmBalance;
  const aFTMcRatio = data?.aFTMcRatio ?? ZERO;

  const tokenCertRatio = useMemo(
    () =>
      aFTMcRatio.isGreaterThan(0) ? new BigNumber(1).div(aFTMcRatio) : ZERO,
    [aFTMcRatio],
  );

  const totalAmount = useMemo(() => {
    if (isError || !ftmBalance || ftmBalance.isLessThan(amount)) {
      return ZERO;
    }

    return calcTotalAmount({
      selectedToken,
      amount,
      balance: ftmBalance,
      stakeGasFee: ZERO ?? undefined,
      aFTMcRatio,
    });
  }, [aFTMcRatio, amount, ftmBalance, selectedToken, isError]);

  const balance = data?.ftmBalance;
  const minAmount = data?.minStake.toNumber() ?? 0;

  const onChange = (values: IStakeFormPayload, invalid: boolean) => {
    // todo: https://ankrnetwork.atlassian.net/browse/STAKAN-1482
    setIsError(invalid);
    setAmount(values.amount ? new BigNumber(values.amount) : ZERO);

    if (invalid) {
      dispatch(resetRequests([getStakeGasFee.toString()]));
    } else if (values.amount) {
      const readyAmount = new BigNumber(values.amount);
      dispatch(getStakeGasFee(readyAmount, selectedToken));
    }
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

      const shouldUpdateGasFee = !totalAmount.isZero() && amount && !isError;
      if (shouldUpdateGasFee) {
        dispatch(getStakeGasFee(amount, token));
      }
    },
    [amount, dispatch, handleTokenSelect, isError, totalAmount],
  );

  return {
    aFTMcRatio: tokenCertRatio,
    amount,
    balance,
    certificateRatio: aFTMcRatio,
    gasFee: gasFee ?? ZERO,
    isCommonDataLoading,
    isGasFeeLoading,
    isStakeLoading: isCommonDataLoading,
    loading: isStakeLoading,
    minAmount,
    tokenIn: t('unit.ftm'),
    tokenOut: selectedToken,
    totalAmount,
    onChange,
    onSubmit,
    onTokenSelect,
  };
};
