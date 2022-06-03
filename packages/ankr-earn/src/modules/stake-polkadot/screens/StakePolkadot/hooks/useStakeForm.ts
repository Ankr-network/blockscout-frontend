import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useMemo, useState } from 'react';

import { IFaqItem } from 'modules/common/components/Faq';
import { ZERO } from 'modules/common/const';
import { useDialog } from 'modules/common/hooks/useDialog';
import { ResponseData } from 'modules/common/types/ResponseData';
import { Token } from 'modules/common/types/token';
import { fetchPolkadotAccountMaxSafeBalance } from 'modules/stake-polkadot/actions/fetchPolkadotAccountMaxSafeBalance';
import { fetchStakeStats } from 'modules/stake-polkadot/actions/fetchStakeStats';
import { stake } from 'modules/stake-polkadot/actions/stake';
import { useETHPolkadotProvidersEffect } from 'modules/stake-polkadot/hooks/useETHPolkadotProvidersEffect';
import {
  EPolkadotETHReverseMap,
  EPolkadotNetworks,
  TPolkadotETHToken,
  TPolkadotToken,
} from 'modules/stake-polkadot/types';
import { getPolkadotRequestKey } from 'modules/stake-polkadot/utils/getPolkadotRequestKey';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';
import {
  IStakeFormPayload,
  IStakeSubmitPayload,
} from 'modules/stake/components/StakeForm';

import { useFaq } from './useFaq';
import { useSuccessDialog } from './useSuccessDialog';

interface IUseStakeFormData {
  amount: number;
  ethToken: TPolkadotETHToken;
  faqItems: IFaqItem[];
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

export const useStakeForm = (network: EPolkadotNetworks): IUseStakeFormData => {
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

  const isActiveStakeForm = !isStakeClaimOpened && !isSuccessOpened;
  const isActiveStakeClaimForm = isStakeClaimOpened && !isSuccessOpened;
  const isActiveSuccessForm = !isStakeClaimOpened && isSuccessOpened;

  const metricsServiceName = useMemo(
    // Note: This is unsafe type conversion. Please be carefully
    () => network.toLowerCase() as EMetricsServiceName,
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

  const faqItems = useFaq({
    ethToken,
    network,
    polkadotToken,
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
      }
    });
  };

  useETHPolkadotProvidersEffect(() => {
    dispatchRequest(
      fetchPolkadotAccountMaxSafeBalance({
        network,
      }),
    );
    dispatchRequest(fetchStakeStats());
    dispatchRequest(getMetrics());
  }, [
    dispatchRequest,
    fetchPolkadotAccountMaxSafeBalance,
    fetchStakeStats,
    getMetrics,
    network,
  ]);

  return {
    amount,
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
