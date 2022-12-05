import { resetRequests } from '@redux-requests/core';
import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useMemo, useState } from 'react';

import { AvailableWriteProviders } from '@ankr.com/provider';
import { PolygonOnEthereumSDK } from '@ankr.com/staking-sdk';

import { trackStake } from 'modules/analytics/tracking-actions/trackStake';
import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { calcTotalAmount } from 'modules/stake-matic/common/utils/calcTotalAmount';
import { approveMATICStake } from 'modules/stake-matic/eth/actions/approveMATICStake';
import {
  fetchStats,
  IFetchStatsResponseData,
} from 'modules/stake-matic/eth/actions/fetchStats';
import { getStakeGasFee } from 'modules/stake-matic/eth/actions/getStakeGasFee';
import { stake } from 'modules/stake-matic/eth/actions/stake';
import { getFAQ, IFAQItem } from 'modules/stake/actions/getFAQ';
import {
  IStakeFormPayload,
  IStakeSubmitPayload,
} from 'modules/stake/components/StakeForm';
import { useAppDispatch } from 'store/useAppDispatch';

interface IUseStakeFormData {
  aMATICcRatio: BigNumber;
  activeStep: number;
  amount: BigNumber;
  certificateRatio: BigNumber;
  faqItems: IFAQItem[];
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
}

export const useStakeForm = (): IUseStakeFormData => {
  const dispatch = useAppDispatch();
  const dispatchRequest = useDispatchRequest();

  const { address, walletName } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );

  const { loading: isStakeLoading } = useMutation({ type: stake });

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

  const { data: faqItems } = useQuery<IFAQItem[]>({
    defaultData: [],
    type: getFAQ,
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
          token: Token.aMATICc,
        }),
      );
    }
  };

  const totalAmount = useMemo(() => {
    if (isError || fetchStatsData?.maticBalance.isLessThan(amount)) {
      return ZERO;
    }

    return calcTotalAmount({
      selectedToken: Token.aMATICc,
      amount: new BigNumber(amount),
      balance: fetchStatsData?.maticBalance ?? ZERO,
      aMATICcRatio,
    });
  }, [aMATICcRatio, amount, fetchStatsData?.maticBalance, isError]);

  const sendAnalytics = async () => {
    const currentAmount = new BigNumber(amount);
    const polygonOnEthereumSDK = await PolygonOnEthereumSDK.getInstance();
    const synthBalance = await polygonOnEthereumSDK.getACBalance();

    trackStake({
      address,
      walletType: walletName,
      amount: currentAmount,
      willGetAmount: currentAmount,
      tokenIn: Token.MATIC,
      tokenOut: Token.aMATICc,
      prevStakedAmount: fetchStatsData?.maticBalance ?? ZERO,
      synthBalance,
    });
  };

  const handleSubmit = (values: IStakeSubmitPayload): void => {
    const val = new BigNumber(values.amount);

    if (isShouldBeApproved) {
      dispatchRequest(
        approveMATICStake({
          amount: val,
          token: Token.aMATICc,
        }),
      );

      return;
    }

    dispatchRequest(
      stake({
        amount: val,
        token: Token.aMATICc,
      }),
    ).then(({ error }) => {
      if (!error) {
        dispatch(resetRequests([approveMATICStake.toString()]));

        sendAnalytics();
      }
    });
  };

  return {
    aMATICcRatio: tokenCertRatio,
    activeStep,
    amount,
    certificateRatio: aMATICcRatio ?? ZERO,
    faqItems,
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
    tokenOut: Token.aMATICc,
    totalAmount,
    handleFormChange,
    handleSubmit,
  };
};
