import { useQuery } from '@redux-requests/react';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import BigNumber from 'bignumber.js';
import { useMemo, useState } from 'react';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { trackStake } from 'modules/analytics/tracking-actions/trackStake';
import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ACTION_CACHE_SEC, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { calcTotalAmount } from 'modules/stake-matic/common/utils/calcTotalAmount';
import { useGetMaticOnEthStakeStatsQuery } from 'modules/stake-matic/eth/actions/useGetMaticOnEthStakeStatsQuery';
import { useGetMaticOnEthStatsQuery } from 'modules/stake-matic/eth/actions/useGetMaticOnEthStatsQuery';
import { useLazyApproveMaticOnEthStakeQuery } from 'modules/stake-matic/eth/actions/useLazyApproveMaticOnEthStakeQuery';
import { useLazyGetMaticOnEthStakeGasFeeQuery } from 'modules/stake-matic/eth/actions/useLazyGetMaticOnEthStakeGasFeeQueryv';
import { useStakeMaticOnEthMutation } from 'modules/stake-matic/eth/actions/useStakeMaticOnEthMutation';
import { getPolygonOnEthereumSDK } from 'modules/stake-matic/eth/utils/getPolygonOnEthereumSDK';
import { getFAQ, IFAQItem } from 'modules/stake/actions/getFAQ';
import {
  IStakeFormPayload,
  IStakeSubmitPayload,
} from 'modules/stake/components/StakeForm';

interface IUseStakeFormData {
  syntheticTokenPrice: BigNumber;
  activeStep: number;
  amount: BigNumber;
  certificateRatio: BigNumber;
  faqItems: IFAQItem[];
  maticBalance?: BigNumber;
  minimumStake?: BigNumber;
  fetchStatsError?: FetchBaseQueryError | SerializedError;
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
}

export const useStakeForm = (): IUseStakeFormData => {
  const { address, walletName } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );

  const [stake, { isLoading: isStakeLoading }] = useStakeMaticOnEthMutation();

  const [
    approveMATICStake,
    { data: approveData, isLoading: isApproveLoading },
  ] = useLazyApproveMaticOnEthStakeQuery();

  const {
    data: statsData,
    isFetching: isStatsLoading,
    error: statsError,
    refetch: getMATICETHStatsRefetch,
  } = useGetMaticOnEthStatsQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE_SEC,
  });
  const {
    data: stakeStatsData,
    isFetching: isStakeStatsLoading,
    error: stakeStatsError,
    refetch: getMATICETHStakeStatsRefetch,
  } = useGetMaticOnEthStakeStatsQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE_SEC,
  });

  const { data: faqItems } = useQuery<IFAQItem[]>({
    defaultData: [],
    type: getFAQ,
  });

  const [getStakeGasFee, { data: gasFee, isFetching: isGasFeeLoading }] =
    useLazyGetMaticOnEthStakeGasFeeQuery();

  const [amount, setAmount] = useState(ZERO);

  const [isError, setIsError] = useState(false);

  const isApproved = !!approveData;

  const isShouldBeApproved = !isApproved;

  const isShowGasFee =
    !isGasFeeLoading && gasFee !== null && (gasFee?.isGreaterThan(0) || false);

  const activeStep = isApproved ? 1 : 0;

  const aMATICcRatio = statsData?.aMATICcRatio;

  const syntheticTokenPrice = useMemo(
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

    if (formAmount && !isInvalid) {
      const readyAmount = new BigNumber(formAmount);

      getStakeGasFee({
        amount: readyAmount,
        token: Token.aMATICc,
      });
    }
  };

  const totalAmount = useMemo(() => {
    if (isError || statsData?.maticBalance.isLessThan(amount)) {
      return ZERO;
    }

    return calcTotalAmount({
      selectedToken: Token.aMATICc,
      amount: new BigNumber(amount),
      balance: statsData?.maticBalance ?? ZERO,
      aMATICcRatio,
    });
  }, [aMATICcRatio, amount, statsData?.maticBalance, isError]);

  const sendAnalytics = async () => {
    const currentAmount = new BigNumber(amount);
    const polygonOnEthereumSDK = await getPolygonOnEthereumSDK();
    const synthBalance = await polygonOnEthereumSDK.getACBalance();

    trackStake({
      address,
      walletType: walletName,
      amount: currentAmount,
      willGetAmount: currentAmount,
      tokenIn: Token.MATIC,
      tokenOut: Token.aMATICc,
      prevStakedAmount: statsData?.maticBalance ?? ZERO,
      synthBalance,
    });
  };

  const handleSubmit = (values: IStakeSubmitPayload): void => {
    const val = new BigNumber(values.amount);

    if (isShouldBeApproved) {
      approveMATICStake({
        amount: val,
        token: Token.aMATICc,
      })
        .unwrap()
        .then(() => {
          getStakeGasFee({
            amount: val,
            token: Token.aMATICc,
          });
        });

      return;
    }

    stake({
      amount: val,
      token: Token.aMATICc,
    }).then(() => {
      sendAnalytics();
    });
  };

  useProviderEffect(() => {
    getMATICETHStatsRefetch();
    getMATICETHStakeStatsRefetch();
  }, []);

  return {
    syntheticTokenPrice,
    activeStep,
    amount,
    certificateRatio: aMATICcRatio ?? ZERO,
    faqItems,
    maticBalance: statsData?.maticBalance,
    minimumStake: stakeStatsData?.minimumStake,
    fetchStatsError: statsError || stakeStatsError,
    gasFee: gasFee ?? ZERO,
    isApproveLoading,
    isApproved,
    isFetchStatsLoading: isStatsLoading || isStakeStatsLoading,
    isShouldBeApproved,
    isShowGasFee,
    isStakeLoading,
    tokenIn: Token.MATIC,
    tokenOut: Token.aMATICc,
    totalAmount,
    handleFormChange,
    handleSubmit,
  };
};
