import { AvailableWriteProviders } from '@ankr.com/provider-core';
import {
  abortRequests,
  resetRequests as resetReduxRequests,
} from '@redux-requests/core';
import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useMemo, useState } from 'react';

import { EthereumSSV } from '@ankr.com/staking-sdk';
import { t } from 'common';

import { trackStake } from 'modules/analytics/tracking-actions/trackStake';
import { useAuth } from 'modules/auth/common/hooks/useAuth';
import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { FormErrors } from 'modules/common/types/FormErrors';
import { Token } from 'modules/common/types/token';
import { getStakeData } from 'modules/stake-ssv/actions/getStakeData';
import { getStakeGasFee } from 'modules/stake-ssv/actions/getStakeGasFee';
import { stake } from 'modules/stake-ssv/actions/stake';
import { getFAQ, IFAQItem } from 'modules/stake/actions/getFAQ';
import {
  IStakeFormPayload,
  IStakeSubmitPayload,
} from 'modules/stake/components/StakeForm';
import { useAppDispatch } from 'store/useAppDispatch';

interface IUseStakeFormData {
  amount: BigNumber;
  ethBalance: BigNumber;
  extraValidation: (
    data: Partial<IStakeFormPayload>,
    errors: FormErrors<IStakeFormPayload>,
  ) => FormErrors<IStakeFormPayload>;
  faqItems: IFAQItem[];
  gasFee: BigNumber;
  getStakeDataError?: Error;
  isGasFeeLoading: boolean;
  isStakeDataLoading: boolean;
  isStakeLoading: boolean;
  minAmount: BigNumber;
  tokenIn: Token;
  tokenOut: Token;
  totalAmount: BigNumber;
  onFormChange: (data: IStakeFormPayload, isInvalid: boolean) => void;
  onFormSubmit: (data: IStakeSubmitPayload) => void;
}

const TOKEN_IN = Token.ETH;
const TOKEN_OUT = Token.asETHc;

const resetGasFeeRequest = () =>
  resetReduxRequests([getStakeGasFee.toString()]);

const resetMainRequests = () =>
  resetReduxRequests([
    getFAQ.toString(),
    getStakeData.toString(),
    getStakeGasFee.toString(),
  ]);

export const useStakeForm = (): IUseStakeFormData => {
  const dispatch = useAppDispatch();

  const dispatchRequest = useDispatchRequest();

  const { address, walletName } = useAuth(
    AvailableWriteProviders.ethCompatible,
  );

  const { loading: isStakeLoading } = useMutation({ type: stake });

  const { data: faqItems } = useQuery<IFAQItem[]>({
    defaultData: [],
    type: getFAQ,
  });

  const {
    data: stakeData,
    error: stakeDataError,
    loading: isStakeDataLoading,
  } = useQuery({
    type: getStakeData,
  });

  const { data: gasFee, loading: isGasFeeLoading } = useQuery({
    type: getStakeGasFee,
  });

  const [amount, setAmount] = useState(ZERO);

  const [isError, setIsError] = useState(false);

  const asETHcBalance = stakeData?.asETHcBalance ?? ZERO;
  const asETHcRatio = stakeData?.asETHcRatio ?? ZERO;
  const ethBalance = stakeData?.ethBalance ?? ZERO;
  const minAmount = stakeData?.minStakeAmount ?? ZERO;

  const totalAmount = useMemo(() => {
    if (isError || !ethBalance || ethBalance.isLessThan(amount)) {
      return ZERO;
    }

    return amount.multipliedBy(asETHcRatio);
  }, [amount, asETHcRatio, ethBalance, isError]);

  const extraValidation = (
    { amount: userAmount }: Partial<IStakeFormPayload>,
    errors: FormErrors<IStakeFormPayload>,
  ): FormErrors<IStakeFormPayload> => {
    if (typeof userAmount === 'string') {
      const currAmount = new BigNumber(userAmount);

      const isInvalidAmount = !EthereumSSV.isValidAmount({
        amount: currAmount,
        minStakeAmount: minAmount,
      });

      if (isInvalidAmount) {
        errors.amount = t('validation.multiple-of', {
          value: minAmount,
        });
      }
    }

    return errors;
  };

  const sendAnalytics = (): void => {
    trackStake({
      address,
      amount,
      prevStakedAmount: ethBalance,
      synthBalance: asETHcBalance,
      tokenIn: TOKEN_IN,
      tokenOut: TOKEN_OUT,
      walletType: walletName,
      willGetAmount: amount,
    });
  };

  const onFormChange = (
    { amount: formAmount }: IStakeFormPayload,
    // TODO: https://ankrnetwork.atlassian.net/browse/STAKAN-1482
    isInvalid: boolean,
  ): void => {
    setIsError(isInvalid);

    setAmount(formAmount ? new BigNumber(formAmount) : ZERO);

    if (isInvalid) {
      dispatch(resetGasFeeRequest());
    } else if (formAmount) {
      const readyAmount = new BigNumber(formAmount);

      dispatch(
        getStakeGasFee({
          amount: readyAmount,
        }),
      );
    }
  };

  const onFormSubmit = async (data: IStakeSubmitPayload): Promise<void> => {
    const { data: resData, error: resErr } = await dispatchRequest(
      stake({
        amount: new BigNumber(data.amount),
        token: TOKEN_OUT,
      }),
    );

    if (!resData || resErr) {
      setAmount(ZERO);

      dispatch(resetGasFeeRequest());

      return;
    }

    sendAnalytics();
  };

  useProviderEffect(() => {
    dispatch(resetMainRequests());

    dispatch(getFAQ(Token.asETHc));
    dispatch(getStakeData());

    return () => {
      dispatch(abortRequests());
      dispatch(resetMainRequests());
    };
  }, [dispatch]);

  return {
    amount,
    ethBalance,
    extraValidation,
    faqItems,
    gasFee: gasFee ?? ZERO,
    getStakeDataError: stakeDataError,
    isGasFeeLoading,
    isStakeDataLoading,
    isStakeLoading,
    minAmount,
    tokenIn: TOKEN_IN,
    tokenOut: TOKEN_OUT,
    totalAmount,
    onFormChange,
    onFormSubmit,
  };
};
