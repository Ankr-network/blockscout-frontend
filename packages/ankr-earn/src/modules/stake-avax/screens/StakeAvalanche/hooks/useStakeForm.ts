import { useDispatchRequest, useMutation } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useState } from 'react';

import { ZERO } from 'modules/common/const';
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
import { getAmountData } from '../../../utils/getAmountData';

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
    let rawAmount = new BigNumber(typeof value === 'string' ? value : '0');

    rawAmount = rawAmount.isNaN() ? ZERO : rawAmount;

    const relayerFee = fetchStatsData?.relayerFee ?? ZERO;
    const { amount: resultAmount, isLessThanOrEqualToZero } = getAmountData(
      rawAmount,
      relayerFee,
    );
    const resultVal = isLessThanOrEqualToZero ? 0 : resultAmount.toNumber();

    setAmount(resultVal);
  };

  const handleSubmit = (values: IStakeSubmitPayload): void => {
    const resultAmount = new BigNumber(values.amount);

    dispatchRequest(stake(resultAmount)).then(({ error }) => {
      if (!error) {
        openSuccessModal();
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
