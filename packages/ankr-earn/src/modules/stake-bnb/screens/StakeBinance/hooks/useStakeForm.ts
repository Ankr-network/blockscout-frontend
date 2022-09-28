import { resetRequests } from '@redux-requests/core';
import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce/lib';

import { AvailableWriteProviders } from '@ankr.com/provider';
import { t } from 'common';

import { useAuth } from 'modules/auth/common/hooks/useAuth';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { showNotification } from 'modules/notifications';
import { fetchIsStakerExists } from 'modules/referrals/actions/fetchIsStakerExists';
import { getStakeGasFee } from 'modules/stake-bnb/actions/getStakeGasFee';
import { stake } from 'modules/stake-bnb/actions/stake';
import { TBnbSyntToken } from 'modules/stake-bnb/types';
import { calcTotalAmount } from 'modules/stake-bnb/utils/calcTotalAmount';
import {
  IStakeFormPayload,
  IStakeSubmitPayload,
} from 'modules/stake/components/StakeForm';
import { INPUT_DEBOUNCE_TIME } from 'modules/stake/const';
import { useAppDispatch } from 'store/useAppDispatch';

import { useFetchStats } from '../../../hooks/useFetchStats';

import { useAnalytics } from './useAnalytics';
import { useCheckPartnerCode } from './useCheckPartnerCode';
import { useSelectedToken } from './useSelectedToken';

interface IUseStakeFormData {
  aBNBcRatio: BigNumber;
  amount: BigNumber;
  address: string;
  bnbBalance?: BigNumber;
  certificateRatio: BigNumber;
  isFetchStatsLoading: boolean;
  isStakeGasLoading: boolean;
  isStakeLoading: boolean;
  minimumStake?: BigNumber;
  relayerFee: BigNumber;
  stakeGas: BigNumber;
  tokenIn: string;
  tokenOut: string;
  totalAmount: BigNumber;
  haveCode: boolean;
  isValidCode: boolean;
  isReferralUserExists: boolean;
  handleHaveCodeClick: () => void;
  handleFormChange: (values: IStakeFormPayload, invalid: boolean) => void;
  handleCodeChange: (values: IStakeFormPayload, invalid: boolean) => void;
  handleSubmit: (values: IStakeSubmitPayload) => void;
  onTokenSelect: (token: TBnbSyntToken) => () => void;
}

export const useStakeForm = (): IUseStakeFormData => {
  const dispatch = useAppDispatch();
  const dispatchRequest = useDispatchRequest();

  const [hasErrors, setHasErrors] = useState(false);
  const [amount, setAmount] = useState(ZERO);
  const [haveCode, setHaveCode] = useState(false);
  const [code, setCode] = useState('');

  const { address } = useAuth(AvailableWriteProviders.ethCompatible);

  const { loading: isStakeLoading } = useMutation({ type: stake });
  const { data: isReferralUserExistsData } = useQuery({
    type: fetchIsStakerExists,
  });
  const { data: stakeGasFee, loading: isStakeGasLoading } = useQuery({
    type: getStakeGasFee,
  });

  const { selectedToken, handleTokenSelect } = useSelectedToken();

  const { isValid: isValidCode, handleCheck } = useCheckPartnerCode();

  const handleHaveCodeClick = useCallback(() => setHaveCode(x => !x), []);

  const { isLoading: isFetchStatsLoading, stats: fetchStatsData } =
    useFetchStats();

  const relayerFee = fetchStatsData?.relayerFee ?? ZERO;
  const bnbBalance = fetchStatsData?.bnbBalance;
  const aBNBcRatio = fetchStatsData?.aBNBcRatio;

  const { sendAnalytics } = useAnalytics({
    amount,
    relayerFee,
    selectedToken,
  });

  const handleFormChange = (
    { amount: formAmount }: IStakeFormPayload,
    invalid: boolean,
  ): void => {
    setHasErrors(invalid);
    setAmount(formAmount ? new BigNumber(formAmount) : ZERO);

    if (invalid) {
      dispatch(resetRequests([getStakeGasFee.toString()]));
    } else if (formAmount) {
      const readyAmount = new BigNumber(formAmount);
      dispatch(getStakeGasFee({ amount: readyAmount, token: selectedToken }));
    }
  };

  const handleCodeChange = (
    { code: formCode }: IStakeFormPayload,
    invalid: boolean,
  ): void => {
    setHasErrors(invalid);
    handleCheck(formCode as string);
    setCode(formCode ? (formCode as string) : '');
  };

  const debouncedOnChange = useDebouncedCallback(
    handleFormChange,
    INPUT_DEBOUNCE_TIME,
  );

  const debouncedOnCodeChange = useDebouncedCallback(
    handleCodeChange,
    INPUT_DEBOUNCE_TIME / 5,
  );

  const tokenCertRatio = useMemo(
    () => (aBNBcRatio ? new BigNumber(1).div(aBNBcRatio) : ZERO),
    [aBNBcRatio],
  );

  const totalAmount = useMemo(() => {
    if (!stakeGasFee || bnbBalance?.isLessThan(amount)) {
      return ZERO;
    }

    return calcTotalAmount({
      selectedToken,
      amount,
      relayerFee,
      balance: bnbBalance,
      stakeGasFee: stakeGasFee ?? undefined,
      aBNBcRatio,
    });
  }, [aBNBcRatio, amount, bnbBalance, relayerFee, selectedToken, stakeGasFee]);

  const handleSubmit = ({ amount: formAmount }: IStakeSubmitPayload): void => {
    const stakeAmount = new BigNumber(formAmount);

    if (haveCode && !isValidCode) {
      dispatch(
        showNotification({
          message: t('referral.incorrect-code'),
          variant: 'error',
        }),
      );
      return;
    }

    if (!haveCode || isValidCode) {
      dispatchRequest(
        stake({ amount: stakeAmount, token: selectedToken, code }),
      ).then(({ error }) => {
        if (!error) {
          sendAnalytics();
        }
      });
    }
  };

  const onTokenSelect = useCallback(
    (token: TBnbSyntToken) => () => {
      handleTokenSelect(token);

      const shouldUpdateGasFee = !totalAmount.isZero() && amount && !hasErrors;
      if (shouldUpdateGasFee) {
        dispatch(getStakeGasFee({ amount, token }));
      }
    },
    [amount, dispatch, handleTokenSelect, hasErrors, totalAmount],
  );

  const minimumStake = fetchStatsData
    ? fetchStatsData.minStake.plus(fetchStatsData.relayerFee)
    : undefined;

  return {
    aBNBcRatio: tokenCertRatio,
    address: address ?? '',
    amount,
    bnbBalance,
    certificateRatio: aBNBcRatio ?? ZERO,
    isFetchStatsLoading,
    isStakeGasLoading,
    isStakeLoading,
    minimumStake,
    relayerFee,
    stakeGas: stakeGasFee ?? ZERO,
    tokenIn: Token.BNB,
    tokenOut: selectedToken,
    totalAmount,
    handleCodeChange: debouncedOnCodeChange,
    handleFormChange: debouncedOnChange,
    haveCode,
    isValidCode,
    isReferralUserExists: isReferralUserExistsData ?? false,
    handleHaveCodeClick,
    handleSubmit,
    onTokenSelect,
  };
};
