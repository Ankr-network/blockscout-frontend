import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { floor } from 'modules/common/utils/floor';
import { fetchStats } from 'modules/stake-bnb/actions/fetchStats';
import { stake } from 'modules/stake-bnb/actions/stake';
import { BNB_STAKING_AMOUNT_STEP } from 'modules/stake-bnb/const';
import {
  IStakeFormPayload,
  IStakeSubmitPayload,
} from 'modules/stake/components/StakeForm';
import { ReactText, useEffect, useState } from 'react';

interface IUseStakeFormArgs {
  openSuccessModal: () => void;
}

export const useStakeForm = ({ openSuccessModal }: IUseStakeFormArgs) => {
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
          openSuccessModal();
        }
      },
    );
  };

  useEffect(() => {
    if (!fetchStatsData) {
      return;
    }
    const { minimumStake, bnbBalance } = fetchStatsData;

    const initAmount = bnbBalance.isGreaterThan(minimumStake)
      ? floor(bnbBalance.toNumber(), BNB_STAKING_AMOUNT_STEP)
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
