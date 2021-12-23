import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { floor } from 'modules/common/utils/floor';
import { fetchStats } from 'modules/stake-polygon/actions/fetchStats';
import { stake } from 'modules/stake-polygon/actions/stake';
import { MATIC_STAKING_AMOUNT_STEP } from 'modules/stake-polygon/const';
import {
  IStakeFormPayload,
  IStakeSubmitPayload,
} from 'modules/stake/components/StakeForm';
import { ReactText, useEffect, useState } from 'react';

export const useStakeForm = () => {
  const dispatchRequest = useDispatchRequest();
  const { loading: isStakeLoading } = useMutation({ type: stake });
  const {
    data: fetchStatsData,
    loading: isFetchStatsLoading,
    error: fetchStatsError,
  } = useQuery({
    type: fetchStats,
  });

  const [amount, setAmount] = useState<ReactText>('');

  const handleFormChange = (values: IStakeFormPayload) => {
    setAmount(values.amount || '');
  };

  const handleSubmit = ({ amount }: IStakeSubmitPayload): void => {
    dispatchRequest(stake({ amount: new BigNumber(amount) })).then(
      ({ error }) => {
        if (!error) {
          // todo: show success modal
        }
      },
    );
  };

  useEffect(() => {
    if (!fetchStatsData) {
      return;
    }
    const { minimumStake, maticBalance } = fetchStatsData;

    const initAmount = maticBalance.isGreaterThan(minimumStake)
      ? floor(maticBalance.toNumber(), MATIC_STAKING_AMOUNT_STEP)
      : minimumStake.toNumber();

    setAmount(initAmount);
  }, [fetchStatsData]);

  return {
    amount,
    handleFormChange,
    handleSubmit,
    isStakeLoading,
    isFetchStatsLoading,
    fetchStatsData,
    fetchStatsError,
  };
};
