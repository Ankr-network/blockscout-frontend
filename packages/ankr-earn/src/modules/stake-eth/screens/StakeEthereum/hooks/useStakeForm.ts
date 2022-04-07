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

import { TEthToken } from 'modules/api/EthSDK';
import { ZERO } from 'modules/common/const';
import { Milliseconds } from 'modules/common/types';
import { Token } from 'modules/common/types/token';
import { getCommonData } from 'modules/stake-eth/actions/getCommonData';
import { getStakeGasFee } from 'modules/stake-eth/actions/getStakeGasFee';
import { stake } from 'modules/stake-eth/actions/stake';
import { RoutesConfig } from 'modules/stake-eth/Routes';
import { calcTotalAmount } from 'modules/stake-eth/utils/calcTotalAmount';
import { getValidSelectedToken } from 'modules/stake-eth/utils/getValidSelectedToken';
import {
  IStakeFormPayload,
  IStakeSubmitPayload,
} from 'modules/stake/components/StakeForm';
import { useAppDispatch } from 'store/useAppDispatch';

import { useStakeEthAnalytics } from './useStakeEthAnalytics';

const DEBOUNCE_TIME: Milliseconds = 1_000;

interface IUseStakeForm {
  balance?: BigNumber;
  fee: BigNumber;
  loading: boolean;
  isCommonDataLoading: boolean;
  isFeeLoading: boolean;
  isEthRatioLoading: boolean;
  isTokenVariantDisabled: boolean;
  tokenIn: string;
  tokenOut: string;
  amount?: BigNumber;
  minAmount?: BigNumber;
  ethRatio: BigNumber;
  totalAmount: BigNumber;
  onSubmit: (payload: IStakeSubmitPayload) => void;
  onInputChange: (values: IStakeFormPayload, invalid: boolean) => void;
  onTokenSelect: (token: TEthToken) => () => void;
}

export const useStakeForm = (onSuccessStake: () => void): IUseStakeForm => {
  const dispatch = useAppDispatch();
  const dispatchRequest = useDispatchRequest();
  const [amount, setAmount] = useState(ZERO);
  const { replace } = useHistory();

  const stakeParamsToken = RoutesConfig.stake.useParams().token;
  const selectedToken = getValidSelectedToken(stakeParamsToken);

  const { data: commonData, loading: isCommonDataLoading } = useQuery({
    type: getCommonData,
  });

  const { loading: isStakeLoading } = useMutation({
    type: stake,
  });

  const { data: stakeGasFee, loading: isFeeLoading } = useQuery({
    type: getStakeGasFee,
  });

  const totalAmount = useMemo(
    () =>
      commonData && stakeGasFee
        ? calcTotalAmount({
            selectedToken,
            stakeGasFee,
            amount,
            ethBalance: commonData?.ethBalance,
            aETHcRatio: commonData?.aETHcRatio,
          })
        : ZERO,
    [amount, commonData, selectedToken, stakeGasFee],
  );

  const { sendAnalytics } = useStakeEthAnalytics({
    amount,
    willGetAmount: totalAmount,
    tokenOut: selectedToken,
  });

  const onSubmit = useCallback(() => {
    if (!amount) {
      return;
    }

    dispatchRequest(stake({ token: selectedToken, amount })).then(
      ({ error }) => {
        if (!error) {
          onSuccessStake();
          sendAnalytics();
        }
      },
    );
  }, [amount, dispatchRequest, onSuccessStake, selectedToken, sendAnalytics]);

  const onTokenSelect = useCallback(
    (token: TEthToken) => () => {
      replace(RoutesConfig.stake.generatePath(token));

      if (!totalAmount.isZero() && amount) {
        dispatch(getStakeGasFee({ amount, token }));
      }
    },
    [amount, dispatch, replace, totalAmount],
  );

  const handleFormChange = (
    { amount: formAmount }: IStakeFormPayload,
    invalid: boolean,
  ): void => {
    if (invalid) {
      dispatch(resetRequests([getStakeGasFee.toString()]));
    } else if (formAmount) {
      const readyAmount = new BigNumber(formAmount);
      dispatch(getStakeGasFee({ amount: readyAmount, token: selectedToken }));
    }

    setAmount(formAmount ? new BigNumber(formAmount) : ZERO);
  };

  const debouncedOnChange = useDebouncedCallback(
    handleFormChange,
    DEBOUNCE_TIME,
  );

  return {
    amount,
    balance: commonData?.ethBalance,
    ethRatio: commonData ? new BigNumber(1).div(commonData.aETHcRatio) : ZERO,
    fee: stakeGasFee ?? ZERO,
    isCommonDataLoading,
    isEthRatioLoading: isCommonDataLoading,
    isFeeLoading,
    isTokenVariantDisabled: isStakeLoading,
    loading: isCommonDataLoading || isStakeLoading,
    minAmount: commonData?.minStake,
    totalAmount,
    tokenIn: Token.ETH,
    tokenOut: selectedToken,
    onInputChange: debouncedOnChange,
    onSubmit,
    onTokenSelect,
  };
};
