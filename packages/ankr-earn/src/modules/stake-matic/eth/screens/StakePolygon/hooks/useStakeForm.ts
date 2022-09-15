import { resetRequests } from '@redux-requests/core';
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
import { approveMATICStake } from 'modules/stake-matic/eth/actions/approveMATICStake';
import {
  fetchStats,
  IFetchStatsResponseData,
} from 'modules/stake-matic/eth/actions/fetchStats';
import { getStakeGasFee } from 'modules/stake-matic/eth/actions/getStakeGasFee';
import { stake } from 'modules/stake-matic/eth/actions/stake';
import {
  IStakeFormPayload,
  IStakeSubmitPayload,
} from 'modules/stake/components/StakeForm';
import { useAppDispatch } from 'store/useAppDispatch';

import { useSelectedToken } from './useSelectedToken';

interface IUseStakeFormData {
  aMATICcRatio: BigNumber;
  activeStep: number;
  amount: BigNumber;
  certificateRatio: BigNumber;
  fetchStatsData: IFetchStatsResponseData | null;
  fetchStatsError?: Error;
  gasFee: BigNumber;
  isApproveLoading: boolean;
  isApproved: boolean;
  isFetchStatsLoading: boolean;
  isShouldBeApproved: boolean;
  isShowGasFee: boolean;
  isStakeLoading: boolean;
  tokenIn: string;
  tokenOut: string;
  totalAmount: BigNumber;
  handleFormChange: (values: IStakeFormPayload, isInvalid: boolean) => void;
  handleSubmit: (values: IStakeSubmitPayload) => void;
  onTokenSelect: (token: TMaticSyntToken) => () => void;
}

export const useStakeForm = (): IUseStakeFormData => {
  const dispatch = useAppDispatch();
  const dispatchRequest = useDispatchRequest();

  const { address, walletName } = useAuth(
    AvailableWriteProviders.ethCompatible,
  );

  const { loading: isStakeLoading } = useMutation({ type: stake });

  const { selectedToken, handleTokenSelect } = useSelectedToken();

  const stakableMATICData = useStakableMaticInEth();

  const { data: approveData, loading: isApproveLoading } = useQuery({
    type: approveMATICStake,
  });

  const {
    data: fetchStatsData,
    loading: isFetchStatsLoading,
    error: fetchStatsError,
  } = useQuery({
    type: fetchStats,
  });

  const { data: gasFee, loading: isGasFeeLoading } = useQuery({
    type: getStakeGasFee,
  });

  const [amount, setAmount] = useState(ZERO);

  const [isError, setIsError] = useState(false);

  const isApproved = !!approveData;

  const isShouldBeApproved = !isApproved;

  const isShowGasFee =
    !isGasFeeLoading && gasFee !== null && gasFee.isGreaterThan(0);

  const activeStep = isApproved ? 1 : 0;

  const aMATICcRatio = fetchStatsData?.aMATICcRatio;

  const tokenCertRatio = useMemo(
    () => (aMATICcRatio ? new BigNumber(1).div(aMATICcRatio) : ZERO),
    [aMATICcRatio],
  );

  const handleFormChange = (
    { amount: formAmount }: IStakeFormPayload,
    // TODO: https://ankrnetwork.atlassian.net/browse/STAKAN-1482
    isInvalid: boolean,
  ) => {
    setIsError(isInvalid);

    setAmount(formAmount ? new BigNumber(formAmount) : ZERO);

    if (isInvalid) {
      dispatch(resetRequests([getStakeGasFee.toString()]));
    } else if (formAmount) {
      const readyAmount = new BigNumber(formAmount);

      dispatch(
        getStakeGasFee({
          amount: readyAmount,
          token: selectedToken,
        }),
      );
    }
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
    const val = new BigNumber(values.amount);

    if (isShouldBeApproved) {
      dispatchRequest(
        approveMATICStake({
          amount: val,
          token: selectedToken,
        }),
      );

      return;
    }

    dispatchRequest(
      stake({
        amount: val,
        token: selectedToken,
      }),
    ).then(({ error }) => {
      if (!error) {
        dispatch(resetRequests([approveMATICStake.toString()]));

        sendAnalytics();
      }
    });
  };

  const onTokenSelect = (token: TMaticSyntToken) => () => {
    handleTokenSelect(token);

    const isUpdateGasFee = !totalAmount.isZero() && !isError;

    if (isUpdateGasFee) {
      dispatch(
        getStakeGasFee({
          amount,
          token,
        }),
      );
    }
  };

  return {
    aMATICcRatio: tokenCertRatio,
    activeStep,
    amount,
    certificateRatio: aMATICcRatio ?? ZERO,
    fetchStatsData,
    fetchStatsError,
    gasFee: gasFee ?? ZERO,
    isApproveLoading,
    isApproved,
    isFetchStatsLoading,
    isShouldBeApproved,
    isShowGasFee,
    isStakeLoading,
    tokenIn: Token.MATIC,
    tokenOut: selectedToken,
    totalAmount,
    handleFormChange,
    handleSubmit,
    onTokenSelect,
  };
};
