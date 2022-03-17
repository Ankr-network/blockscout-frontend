import { resetRequests } from '@redux-requests/core';
import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useState, useMemo } from 'react';
import { useDebouncedCallback } from 'use-debounce/lib';

import { ZERO } from 'modules/common/const';
import { Milliseconds } from 'modules/common/types';
import { getStakeGasFee } from 'modules/stake-bnb/actions/getStakeGasFee';
import { stake } from 'modules/stake-bnb/actions/stake';
import {
  IStakeFormPayload,
  IStakeSubmitPayload,
} from 'modules/stake/components/StakeForm';
import { useAppDispatch } from 'store/useAppDispatch';

import { useFetchAPY } from '../../../hooks/useFetchAPY';
import {
  IUseFetchStatsData,
  useFetchStats,
} from '../../../hooks/useFetchStats';

const DEBOUNCE_TIME: Milliseconds = 1_000;

interface IUseStakeFormArgs {
  openSuccessModal: () => void;
}

interface IUseStakeFormData {
  amount: string;
  fetchAPYData: BigNumber;
  stakeGas: BigNumber;
  fetchStatsData: IUseFetchStatsData['stats'];
  fetchStatsError: Error | null;
  isStakeLoading: boolean;
  isStakeGasLoading: boolean;
  isFetchStatsLoading: boolean;
  totalAmount: BigNumber;
  handleFormChange: (values: IStakeFormPayload, invalid: boolean) => void;
  handleSubmit: (values: IStakeSubmitPayload) => void;
}

export const useStakeForm = ({
  openSuccessModal,
}: IUseStakeFormArgs): IUseStakeFormData => {
  const dispatch = useAppDispatch();
  const dispatchRequest = useDispatchRequest();
  const [amount, setAmount] = useState('0');
  const { loading: isStakeLoading } = useMutation({ type: stake });

  const {
    error: fetchStatsError,
    isLoading: isFetchStatsLoading,
    stats: fetchStatsData,
  } = useFetchStats();

  const { data: stakeGasFee, loading: isStakeGasLoading } = useQuery({
    type: getStakeGasFee,
  });

  const fetchAPYData = useFetchAPY();

  const handleFormChange = (
    { amount: formAmount }: IStakeFormPayload,
    invalid: boolean,
  ): void => {
    if (invalid) {
      dispatch(resetRequests([getStakeGasFee.toString()]));
    } else if (formAmount) {
      const readyAmount = new BigNumber(formAmount);
      dispatch(getStakeGasFee(readyAmount));
    }

    setAmount(formAmount ? `${formAmount}` : '');
  };

  const debouncedOnChange = useDebouncedCallback(
    handleFormChange,
    DEBOUNCE_TIME,
  );

  const totalAmount = useMemo(
    () =>
      fetchStatsData && stakeGasFee
        ? calcTotalAmount(
            new BigNumber(amount),
            fetchStatsData.relayerFee,
            stakeGasFee,
          )
        : ZERO,
    [amount, fetchStatsData, stakeGasFee],
  );

  const handleSubmit = ({ amount: formAmount }: IStakeSubmitPayload): void => {
    const stakeAmount = new BigNumber(formAmount);

    dispatchRequest(stake(stakeAmount)).then(({ error }) => {
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
    handleFormChange: debouncedOnChange,
    isFetchStatsLoading,
    isStakeLoading,
    isStakeGasLoading,
    totalAmount,
    stakeGas: stakeGasFee ?? ZERO,
    handleSubmit,
  };
};

function calcTotalAmount(
  amount: BigNumber,
  relayerFee: BigNumber,
  methodGasFee: BigNumber,
): BigNumber {
  const result = amount.minus(relayerFee).minus(methodGasFee);
  return result.isLessThan(0) ? ZERO : result;
}
