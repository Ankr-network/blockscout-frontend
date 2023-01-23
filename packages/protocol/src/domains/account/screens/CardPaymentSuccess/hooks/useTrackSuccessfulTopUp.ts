import { useOnMount } from 'modules/common/hooks/useOnMount';
import { useTopUpTrackingHandler } from 'domains/account/hooks/useTopUpTrackingHandler';

export const useTrackSuccessfulTopUp = () => {
  const trackTopUp = useTopUpTrackingHandler();

  useOnMount(() => trackTopUp({ isTopUpSuccessful: true }));
};
