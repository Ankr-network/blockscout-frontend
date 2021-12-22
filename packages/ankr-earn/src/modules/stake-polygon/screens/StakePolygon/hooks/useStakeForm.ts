import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { fetchStats } from 'modules/stake-polygon/actions/fetchStats';
import { stake } from 'modules/stake-polygon/actions/stake';
import { RoutesConfig } from 'modules/stake-polygon/Routes';
import {
  IStakeFormPayload,
  IStakeSubmitPayload,
} from 'modules/stake/components/StakeForm';
import { ReactText, useState } from 'react';
import { useHistory } from 'react-router';

export const useStakeForm = () => {
  const dispatchRequest = useDispatchRequest();
  const { push } = useHistory();
  const { loading: isStakeLoading } = useMutation({ type: stake });
  const { data: fetchStatsData } = useQuery({
    type: fetchStats,
  });

  const [amount, setAmount] = useState<ReactText>(
    fetchStatsData?.minimumStake.toNumber() || '',
  );

  const handleFormChange = (values: IStakeFormPayload) => {
    setAmount(values.amount || '');
  };

  const handleSubmit = ({ amount }: IStakeSubmitPayload): void => {
    dispatchRequest(stake({ amount: new BigNumber(amount) })).then(
      ({ error }) => {
        if (!error) {
          push(RoutesConfig.dashboard.generatePath());
        }
      },
    );
  };

  return {
    amount,
    handleFormChange,
    handleSubmit,
    isStakeLoading,
  };
};
