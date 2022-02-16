import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { fetchStats } from 'modules/stake-polygon/actions/fetchStats';
import { stake } from 'modules/stake-polygon/actions/stake';
import {
  IStakeFormPayload,
  IStakeSubmitPayload,
} from 'modules/stake/components/StakeForm';
import { ReactText, useState } from 'react';

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
