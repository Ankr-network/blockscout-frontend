import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useMemo, useState } from 'react';

import { ZERO } from 'modules/common/const';
import { ResponseData } from 'modules/common/types/ResponseData';
import { Token } from 'modules/common/types/token';
import { EMetricsServiceName } from 'modules/stake/api/metrics';
import {
  IStakeFormPayload,
  IStakeSubmitPayload,
} from 'modules/stake/components/StakeForm';

import { fetchPolkadotAccountMaxSafeBalance } from '../../../actions/fetchPolkadotAccountMaxSafeBalance';
import { fetchStakeStats } from '../../../actions/fetchStakeStats';
import { stake } from '../../../actions/stake';
import {
  EPolkadotETHReverseMap,
  EPolkadotNetworks,
  TPolkadotETHToken,
  TPolkadotToken,
} from '../../../types';

interface IUseStakeFormProps {
  network: EPolkadotNetworks;
  openSuccessModal: () => void;
}

interface IUseStakeFormData {
  amount: number;
  ethToken: TPolkadotETHToken;
  fetchStatsData: ResponseData<typeof fetchStakeStats> | null;
  fetchStatsError: Error | null;
  isFetchStatsLoading: boolean;
  isStakeLoading: boolean;
  metricsServiceName: EMetricsServiceName;
  polkadotBalance: BigNumber;
  polkadotToken: TPolkadotToken;
  onFormChange: (values: IStakeFormPayload) => void;
  onFormSubmit: (values: IStakeSubmitPayload) => void;
}

export const useStakeForm = ({
  network,
  openSuccessModal,
}: IUseStakeFormProps): IUseStakeFormData => {
  const dispatchRequest = useDispatchRequest();

  const { loading: isStakeLoading } = useMutation({ type: stake });

  const { data: rawPolkadotBalance } = useQuery({
    type: fetchPolkadotAccountMaxSafeBalance,
  });

  const {
    data: fetchStatsData,
    error: fetchStatsError,
    loading: isFetchStatsLoading,
  } = useQuery({
    type: fetchStakeStats,
  });

  const [amount, setAmount] = useState(0);

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

  const onFormChange = ({ amount: value }: IStakeFormPayload): void => {
    const rawAmount = new BigNumber(typeof value === 'string' ? value : '0');
    const resultVal = rawAmount.isNaN() ? 0 : rawAmount.toNumber();

    setAmount(resultVal);
  };

  const onFormSubmit = (values: IStakeSubmitPayload): void => {
    const resultAmount = new BigNumber(values.amount);

    dispatchRequest(stake(network, resultAmount)).then(({ error }) => {
      if (!error) {
        openSuccessModal();

        setAmount(0);
      }
    });
  };

  return {
    amount,
    ethToken,
    fetchStatsData,
    fetchStatsError,
    isFetchStatsLoading,
    isStakeLoading,
    metricsServiceName,
    polkadotBalance,
    polkadotToken,
    onFormChange,
    onFormSubmit,
  };
};
