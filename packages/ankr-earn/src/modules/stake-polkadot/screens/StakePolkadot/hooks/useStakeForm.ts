import { t } from '@ankr.com/common';
import { abortRequests, resetRequests } from '@redux-requests/core';
import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useMemo, useState } from 'react';
import { Dispatch } from 'redux';

import { ZERO } from 'modules/common/const';
import { useDialog } from 'modules/common/hooks/useDialog';
import { ResponseData } from 'modules/common/types/ResponseData';
import { Token } from 'modules/common/types/token';
import { fetchPolkadotAccountMaxSafeBalance } from 'modules/stake-polkadot/actions/fetchPolkadotAccountMaxSafeBalance';
import { fetchStakeStats } from 'modules/stake-polkadot/actions/fetchStakeStats';
import { stake } from 'modules/stake-polkadot/actions/stake';
import { useETHPolkadotProvidersEffect } from 'modules/stake-polkadot/hooks/useETHPolkadotProvidersEffect';
import { useSuccessDialog } from 'modules/stake-polkadot/hooks/useSuccessDialog';
import {
  EPolkadotETHReverseMap,
  EPolkadotNetworks,
  TPolkadotETHToken,
  TPolkadotToken,
} from 'modules/stake-polkadot/types';
import { getPolkadotRequestKey } from 'modules/stake-polkadot/utils/getPolkadotRequestKey';
import { getPolkadotResetRequests } from 'modules/stake-polkadot/utils/getPolkadotResetRequests';
import { getFAQ, IFAQItem } from 'modules/stake/actions/getFAQ';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';
import {
  IStakeFormPayload,
  IStakeSubmitPayload,
} from 'modules/stake/components/StakeForm';
import { useAppDispatch } from 'store/useAppDispatch';

import { useAnalytics } from './useAnalytics';

interface IUseStakeFormData {
  amount: number;
  balanceLabel: string;
  ethToken: TPolkadotETHToken;
  faqItems: IFAQItem[];
  fetchStatsData: ResponseData<typeof fetchStakeStats> | null;
  fetchStatsError: Error | null;
  isActiveStakeClaimForm: boolean;
  isActiveStakeForm: boolean;
  isActiveSuccessForm: boolean;
  isFetchStatsLoading: boolean;
  isStakeLoading: boolean;
  metricsServiceName: EMetricsServiceName;
  polkadotBalance: BigNumber;
  polkadotToken: TPolkadotToken;
  onAddTokenClick: () => void;
  onStakeChange: (data: IStakeFormPayload) => void;
  onStakeClaimSubmit: () => void;
  onStakeSubmit: (data: IStakeSubmitPayload) => void;
  onSuccessClose: () => void;
}

const dispatchResetRequests = (dispatch: Dispatch): void => {
  dispatch(
    resetRequests(
      getPolkadotResetRequests([fetchPolkadotAccountMaxSafeBalance.toString()]),
    ),
  );

  dispatch(
    resetRequests([
      fetchStakeStats.toString(),
      getFAQ.toString(),
      getMetrics.toString(),
    ]),
  );
};

export const useStakeForm = (network: EPolkadotNetworks): IUseStakeFormData => {
  const dispatch = useAppDispatch();
  const dispatchRequest = useDispatchRequest();

  const [amount, setAmount] = useState(0);

  const {
    isOpened: isStakeClaimOpened,
    onClose: onStakeClaimClose,
    onOpen: onStakeClaimOpen,
  } = useDialog();

  const { loading: isStakeLoading } = useMutation({ type: stake });

  const { isSuccessOpened, onAddTokenClick, onSuccessClose, onSuccessOpen } =
    useSuccessDialog(network);

  const { data: rawPolkadotBalance } = useQuery({
    type: fetchPolkadotAccountMaxSafeBalance,
    requestKey: getPolkadotRequestKey(network),
  });

  const {
    data: fetchStatsData,
    error: fetchStatsError,
    loading: isFetchStatsLoading,
  } = useQuery({
    type: fetchStakeStats,
  });

  const { data: faqItems } = useQuery<IFAQItem[]>({
    defaultData: [],
    type: getFAQ,
  });

  const isActiveStakeForm = !isStakeClaimOpened && !isSuccessOpened;
  const isActiveStakeClaimForm = isStakeClaimOpened && !isSuccessOpened;
  const isActiveSuccessForm = !isStakeClaimOpened && isSuccessOpened;

  const balanceLabel = t('stake-polkadot.stake.balance-label');

  const metricsServiceName = useMemo(
    () => EMetricsServiceName[network],
    [network],
  );

  const ethToken = useMemo(
    () => EPolkadotETHReverseMap[network] as unknown as TPolkadotETHToken,
    [network],
  );

  const polkadotBalance = useMemo(
    () => (rawPolkadotBalance !== null ? rawPolkadotBalance : ZERO),
    [rawPolkadotBalance],
  );

  const polkadotToken = useMemo(() => Token[network], [network]);

  const { sendAnalytics } = useAnalytics({
    amount,
    polkadotToken,
    ethToken,
    network,
  });

  const onStakeChange = ({ amount: value }: IStakeFormPayload): void => {
    const rawAmount = new BigNumber(typeof value === 'string' ? value : '0');
    const resultVal = rawAmount.isNaN() ? 0 : rawAmount.toNumber();

    setAmount(resultVal);
  };

  const onStakeClaimSubmit = (): void => {
    setAmount(0);

    onStakeClaimClose();

    onSuccessOpen();
  };

  const onStakeSubmit = ({ amount: value }: IStakeSubmitPayload): void => {
    const resultAmount = new BigNumber(value);

    dispatchRequest(stake(network, resultAmount)).then(({ error }) => {
      if (!error) {
        onStakeClaimOpen();
        sendAnalytics();
      }
    });
  };

  useETHPolkadotProvidersEffect(() => {
    dispatchResetRequests(dispatch);

    dispatch(fetchPolkadotAccountMaxSafeBalance(network));
    dispatch(fetchStakeStats());
    dispatch(getFAQ(polkadotToken));
    dispatch(getMetrics());

    return () => {
      dispatch(abortRequests());
      dispatchResetRequests(dispatch);
    };
  }, [dispatch, network, polkadotToken]);

  return {
    amount,
    balanceLabel,
    ethToken,
    faqItems,
    fetchStatsData,
    fetchStatsError,
    isActiveStakeClaimForm,
    isActiveStakeForm,
    isActiveSuccessForm,
    isFetchStatsLoading,
    isStakeLoading,
    metricsServiceName,
    polkadotBalance,
    polkadotToken,
    onAddTokenClick,
    onStakeChange,
    onStakeClaimSubmit,
    onStakeSubmit,
    onSuccessClose,
  };
};
