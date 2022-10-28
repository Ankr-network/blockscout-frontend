import { useInterval } from 'modules/common/utils/useInterval';
import { useGetLatestBlockNumberQuery } from 'modules/stake-ankr/actions/getLatestBlockNumber';

const TIMER_UPDATE_TIME = 3_000;

export const TimerWorker = (): null => {
  const { refetch } = useGetLatestBlockNumberQuery();

  useInterval(() => {
    refetch();
  }, TIMER_UPDATE_TIME);

  return null;
};
