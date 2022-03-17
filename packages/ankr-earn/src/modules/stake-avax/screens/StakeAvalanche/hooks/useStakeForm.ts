import { useDispatchRequest, useMutation } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useState } from 'react';

import {
  IStakeFormPayload,
  IStakeSubmitPayload,
} from 'modules/stake/components/StakeForm';

import { stake } from '../../../actions/stake';
import { useFetchAPY } from '../../../hooks/useFetchAPY';
import {
  useFetchStats,
  IUseFetchStatsData,
} from '../../../hooks/useFetchStats';

interface IUseStakeFormArgs {
  openSuccessModal: () => void;
}

interface IUseStakeFormData {
  amount: number;
  fetchAPYData: BigNumber;
  fetchStatsData: IUseFetchStatsData['stats'];
  fetchStatsError: Error | null;
  isStakeLoading: boolean;
  isFetchStatsLoading: boolean;
  handleFormChange: (values: IStakeFormPayload) => void;
  handleSubmit: (values: IStakeSubmitPayload) => void;
}

export const useStakeForm = ({
  openSuccessModal,
}: IUseStakeFormArgs): IUseStakeFormData => {
  const dispatchRequest = useDispatchRequest();

  const { loading: isStakeLoading } = useMutation({ type: stake });

  const {
    error: fetchStatsError,
    isLoading: isFetchStatsLoading,
    stats: fetchStatsData,
  } = useFetchStats();

  const fetchAPYData = useFetchAPY();

  const [amount, setAmount] = useState(0);

  const handleFormChange = ({ amount: value }: IStakeFormPayload): void => {
    const rawAmount = new BigNumber(typeof value === 'string' ? value : '0');
    const resultVal = rawAmount.isNaN() ? 0 : rawAmount.toNumber();

    setAmount(resultVal);
  };

  const handleSubmit = (values: IStakeSubmitPayload): void => {
    const resultAmount = new BigNumber(values.amount);

    dispatchRequest(stake(resultAmount)).then(({ error }) => {
      if (!error) {
        openSuccessModal();

        setAmount(0);
      }
    });
  };

  return {
    amount,
    fetchAPYData,
    fetchStatsData,
    fetchStatsError,
    isFetchStatsLoading,
    isStakeLoading,
    handleFormChange,
    handleSubmit,
  };
};
